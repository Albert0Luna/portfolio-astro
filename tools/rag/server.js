import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import url, { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const INDEX_PATH = path.join(WORKSPACE_ROOT, "tools", "rag", "index.json");
const PORT = Number(process.env.RAG_PORT || 8787);

function cosineSimilarity(a, b) {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function loadIndex() {
  const raw = await fs.readFile(INDEX_PATH, "utf8");
  return JSON.parse(raw);
}

async function embed(query) {
  const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
  const embedModel = process.env.EMBED_MODEL || "nomic-embed-text";

  const res = await fetch(`${ollamaUrl}/api/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: embedModel, prompt: query })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Ollama embeddings failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return data.embedding;
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);

  if (parsed.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (parsed.pathname !== "/search") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not Found" }));
    return;
  }

  const query = parsed.query.q || "";
  const k = Math.max(1, Math.min(12, Number(parsed.query.k || 6)));

  if (!query) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing q" }));
    return;
  }

  try {
    const index = await loadIndex();
    const queryEmbedding = await embed(String(query));

    const scored = index.entries.map((entry) => ({
      score: cosineSimilarity(queryEmbedding, entry.embedding),
      file: entry.file,
      content: entry.content
    }));

    scored.sort((a, b) => b.score - a.score);
    const results = scored.slice(0, k);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ results }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(PORT, () => {
  console.log(`RAG search API listening on http://localhost:${PORT}`);
});
