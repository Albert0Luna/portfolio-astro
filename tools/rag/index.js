import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const DIFF_PATH = path.join(WORKSPACE_ROOT, "git.diff");
const INDEX_PATH = path.join(WORKSPACE_ROOT, "tools", "rag", "index.json");
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const EMBED_MODEL = process.env.EMBED_MODEL || "nomic-embed-text";

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

  const entries = [];
  for (const chunk of chunks) {
    const embedding = await embed(chunk.content);
    entries.push({
      file: chunk.file,
      content: chunk.content,
      embedding
    });
  }

  const payload = {
    createdAt: new Date().toISOString(),
    model: EMBED_MODEL,
    entries
  };

  await fs.writeFile(INDEX_PATH, JSON.stringify(payload, null, 2));
  console.log(`Indexed ${entries.length} chunks -> ${INDEX_PATH}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
