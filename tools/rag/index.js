import { execSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const DIFF_PATH = path.join(WORKSPACE_ROOT, "git.diff");
const INDEX_PATH = path.join(WORKSPACE_ROOT, "tools", "rag", "index.json");
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const EMBED_MODEL = process.env.EMBED_MODEL || "nomic-embed-text";

function sha1(input) {
  return crypto.createHash("sha1").update(input).digest("hex");
}

function getCurrentCommitMeta() {
  try {
    const hash = execSync("git rev-parse HEAD", { cwd: WORKSPACE_ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    const title = execSync("git log -1 --pretty=%s", { cwd: WORKSPACE_ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    const date = execSync("git log -1 --pretty=%cI", { cwd: WORKSPACE_ROOT, stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();

    return { hash, title, date };
  } catch {
    return {
      hash: "working-tree",
      title: "Working tree snapshot",
      date: new Date().toISOString()
    };
  }
}

async function readExistingIndex() {
  try {
    const raw = await fs.readFile(INDEX_PATH, "utf8");
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed.entries)) {
      return { createdAt: new Date().toISOString(), model: EMBED_MODEL, entries: [] };
    }

    return parsed;
  } catch {
    return { createdAt: new Date().toISOString(), model: EMBED_MODEL, entries: [] };
  }
}

function splitDiff(diffText) {
  const lines = diffText.split("\n");
  const chunks = [];
  let currentFile = null;
  let currentHunk = [];

  function flushChunk() {
    if (!currentFile) return;
    if (currentHunk.length === 0) return;
    chunks.push({
      file: currentFile,
      content: currentHunk.join("\n")
    });
    currentHunk = [];
  }

  for (const line of lines) {
    if (line.startsWith("diff --git ")) {
      flushChunk();
      const match = line.match(/^diff --git a\/(.+?) b\//);
      currentFile = match ? match[1] : "unknown";
      currentHunk = [line];
      continue;
    }

    if (line.startsWith("@@")) {
      flushChunk();
      currentHunk = [line];
      continue;
    }

    if (currentFile) {
      currentHunk.push(line);
    }
  }

  flushChunk();
  return chunks;
}

async function embed(text) {
  const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: EMBED_MODEL, prompt: text })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ollama embeddings failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return data.embedding;
}

async function main() {
  const diffText = await fs.readFile(DIFF_PATH, "utf8");
  const chunks = splitDiff(diffText);

  if (chunks.length === 0) {
    throw new Error("No chunks found in git.diff");
  }

  const commit = getCurrentCommitMeta();
  const index = await readExistingIndex();
  const existingIds = new Set(index.entries.map((entry) => entry.id).filter(Boolean));
  const newEntries = [];

  for (const chunk of chunks) {
    const id = sha1(`${commit.hash}:${chunk.file}:${chunk.content}`);

    if (existingIds.has(id)) {
      continue;
    }

    const embedding = await embed(chunk.content);
    newEntries.push({
      id,
      commitHash: commit.hash,
      commitTitle: commit.title,
      commitDate: commit.date,
      file: chunk.file,
      content: chunk.content,
      embedding
    });
  }

  const entries = [...index.entries, ...newEntries];

  const payload = {
    createdAt: index.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    model: EMBED_MODEL,
    commitsIndexed: Array.from(new Set(entries.map((entry) => entry.commitHash).filter(Boolean))).length,
    entries
  };

  await fs.writeFile(INDEX_PATH, JSON.stringify(payload, null, 2));
  console.log(
    `Indexed ${newEntries.length} new chunks for ${commit.hash.slice(0, 7)} (total: ${entries.length}) -> ${INDEX_PATH}`
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
