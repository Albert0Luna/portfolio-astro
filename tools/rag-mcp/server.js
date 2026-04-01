import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { z } from "zod";

const API_URL = process.env.RAG_API_URL || "http://localhost:8787";
const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || process.cwd();

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
      const shortHash = (item.commitHash || "unknown").slice(0, 7);
      const heading = `#${index + 1} ${item.file} [${shortHash}] (score ${item.score.toFixed(3)})`;
      const commitLine = item.commitTitle
        ? `commit: ${item.commitTitle}`
        : "commit: (sin titulo)";
      const dateLine = item.commitDate ? `date: ${item.commitDate}` : "";
      return `${heading}\n${commitLine}${dateLine ? `\n${dateLine}` : ""}\n${item.content}`;
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

server.registerTool(
  "generate_client_pdf",
  {
    description: "Generate a non-technical client PDF summary from git.diff RAG results",
    inputSchema: z.object({
      query: z.string().min(1),
      k: z.number().int().min(1).max(12).optional(),
      outputPath: z.string().min(1).optional(),
      title: z.string().min(1).optional()
    })
  },
  async ({ query, k, outputPath, title }) => {
    const params = new URLSearchParams({
      q: query,
      k: String(k || 8)
    });

    const res = await fetch(`${API_URL}/search?${params.toString()}`);

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`RAG API error: ${res.status} ${body}`);
    }

    const data = await res.json();
    const results = Array.isArray(data.results) ? data.results : [];

    const unique = [];
    const seen = new Set();
    for (const item of results) {
      const key = `${item.file}::${item.content}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(item);
    }

    const files = [...new Set(unique.map((r) => r.file))];
    const changes = unique.map((r) => {
      const added = (r.content.match(/^\+/gm) || []).length;
      const removed = (r.content.match(/^-/gm) || []).length;
      return { file: r.file, added, removed };
    });

    const docTitle = title || "Resumen de Cambios para Cliente";
    const reportDir = path.join(WORKSPACE_ROOT, "reports");
    const finalOutputPath = outputPath
      ? path.isAbsolute(outputPath)
        ? outputPath
        : path.join(WORKSPACE_ROOT, outputPath)
      : path.join(reportDir, "diff-client-report.pdf");

    fs.mkdirSync(path.dirname(finalOutputPath), { recursive: true });

    await new Promise((resolve, reject) => {
      const pdf = new PDFDocument({ margin: 48 });
      const stream = fs.createWriteStream(finalOutputPath);

      stream.on("finish", resolve);
      stream.on("error", reject);
      pdf.pipe(stream);

      pdf.fontSize(20).text(docTitle);
      pdf.moveDown(0.5);
      pdf.fontSize(11).fillColor("#555555").text(`Consulta: ${query}`);
      pdf.text(`Fecha: ${new Date().toISOString()}`);
      pdf.moveDown(1);

      pdf.fillColor("#000000").fontSize(14).text("1) Que mejoro para el usuario");
      pdf.moveDown(0.4);
      if (files.length === 0) {
        pdf.fontSize(11).text("- No se encontraron cambios relevantes en el indice para esta consulta.");
      } else {
        pdf.fontSize(11).text(`- Se actualizaron ${files.length} archivo(s) relacionados con esta consulta.`);
        for (const file of files.slice(0, 8)) {
          pdf.text(`- Ajustes en ${file}.`);
        }
      }

      pdf.moveDown(0.8);
      pdf.fontSize(14).text("2) Impacto en negocio");
      pdf.moveDown(0.4);
      pdf.fontSize(11).text("- Los cambios mejoran claridad, consistencia y/o comunicacion del producto en las areas modificadas.");
      pdf.text("- Se facilita mantenimiento y evolucion de funcionalidades relacionadas.");

      pdf.moveDown(0.8);
      pdf.fontSize(14).text("3) Riesgos o limitaciones");
      pdf.moveDown(0.4);
      pdf.fontSize(11).text("- Este reporte usa solo el contexto del diff indexado; no evalua comportamiento en runtime.");
      pdf.text("- Se recomienda validacion funcional y visual antes de despliegue.");

      pdf.moveDown(0.8);
      pdf.fontSize(14).text("4) Proximos pasos recomendados");
      pdf.moveDown(0.4);
      pdf.fontSize(11).text("- Revisar cambios en ambiente de pruebas con stakeholders.");
      pdf.text("- Confirmar criterios de aceptacion y documentar aprobacion.");
      pdf.text("- Publicar nota de version para usuarios finales.");

      pdf.moveDown(1);
      pdf.fontSize(12).text("Anexo tecnico breve (interno)");
      pdf.moveDown(0.3);
      pdf.fontSize(10);
      for (const item of changes.slice(0, 12)) {
        pdf.text(`- ${item.file}: +${item.added} / -${item.removed}`);
      }

      pdf.end();
    });

    return {
      content: [
        {
          type: "text",
          text: `PDF generado en: ${finalOutputPath}`
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
