import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_URL = process.env.RAG_API_URL || "http://localhost:8787";

const server = new McpServer({
  name: "diff-rag",
  version: "0.1.0"
});

server.registerTool(
  "search_diff",
  {
    description: "Search git.diff chunks using RAG",
    inputSchema: z.object({
      query: z.string().min(1),
      k: z.number().int().min(1).max(12).optional()
    })
  },
  async ({ query, k }) => {
  const params = new URLSearchParams({
    q: query,
    k: String(k || 6)
  });

  const res = await fetch(`${API_URL}/search?${params.toString()}`);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`RAG API error: ${res.status} ${body}`);
  }

  const data = await res.json();

  const text = data.results
    .map((item, index) => {
      const heading = `#${index + 1} ${item.file} (score ${item.score.toFixed(3)})`;
      return `${heading}\n${item.content}`;
    })
    .join("\n\n");

  return {
    content: [
      {
        type: "text",
        text
      }
    ]
  };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
