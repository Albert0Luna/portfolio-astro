import type { APIRoute } from "astro";
import { setDefaultResultOrder } from "node:dns";
import { SITE_CONTENT_EN } from "../../config/index";
import { AI_DEEP_CONTEXT } from "../../config/ai-context";

export const prerender = false;

// Some container/serverless hosts advertise IPv6 without a working outbound
// route: Node's fetch tries the AAAA record first (Happy Eyeballs), the
// packet silently vanishes, and the request hangs forever with no error
// instead of failing fast. Forcing IPv4 first avoids that black hole.
setDefaultResultOrder("ipv4first");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const MAX_MESSAGES = 12;
const MAX_CONTENT_LENGTH = 800;

/**
 * The CV digest is built from the same config that renders the site,
 * so the assistant never drifts from what the portfolio actually says.
 */
const buildSystemPrompt = (lang: string): string => {
  const { hero, experience, projects } = SITE_CONTENT_EN;

  const experienceDigest = experience
    .map(
      (e) =>
        `- ${e.position} @ ${e.company} (${e.startDate} — ${e.endDate}): ${
          Array.isArray(e.summary) ? e.summary.join(" ") : e.summary
        } [Skills: ${e.skills?.join(", ") ?? "n/a"}]`
    )
    .join("\n");

  const projectsDigest = projects
    .map(
      (p) =>
        `- ${p.name}: ${p.summary} [Stack: ${p.stack.join(", ")}]${
          p.linkPreview ? ` Demo: ${p.linkPreview}` : ""
        }`
    )
    .join("\n");

  return `You are "Luna AI", the friendly assistant embedded in the portfolio website of ${hero.name}, a ${hero.specialty} based in Querétaro, México.

Your ONLY job is to answer visitors' questions about Gustavo: his experience, skills, projects, education and how to contact him.

## Facts you can use (do not invent anything beyond these)
Summary: ${hero.summary}
Email: ${hero.email}
Education: Computer Systems Engineering, UVEG, GPA 9.0.
Languages: Spanish (native), English (B2), French (A2).
Age: 24
Experience: 1 year
Certifications: Intermediate SQL (DataCamp), MongoDB Node.js Developer Path, MongoDB Advanced Schema Design, GitHub Foundations, AWS Cloud Practitioner.
GitHub: https://github.com/Albert0Luna
LinkedIn: https://www.linkedin.com/in/gustavo-alberto-r-a202b2231/

## Experience
${experienceDigest}

## Projects
${projectsDigest}

${AI_DEEP_CONTEXT}

## Rules
- Be warm, concise and professional. 2-4 short sentences per answer unless asked for detail.
- ${lang === "es" ? "Answer in Spanish by default" : "Answer in English by default"}, but mirror the visitor's language if they switch.
- NEVER invent facts, dates, employers or skills that are not listed above. If you don't know, say so and suggest emailing ${hero.email}.
- If asked about hiring or collaboration, be enthusiastic and point to the email or LinkedIn.
- Politely decline any topic unrelated to Gustavo's professional profile.`;
};

type ChatMessage = { role: string; content: string };

const sanitizeMessages = (raw: unknown): ChatMessage[] | null => {
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages = raw
    .filter(
      (m): m is ChatMessage =>
        typeof m === "object" &&
        m !== null &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }));

  return messages.length > 0 ? messages : null;
};

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "chat_unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { messages?: unknown; lang?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages = sanitizeMessages(body.messages);
  if (!messages) {
    return new Response(JSON.stringify({ error: "invalid_messages" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const lang = body.lang === "es" ? "es" : "en";

  const upstream = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.6,
      // Reasoning tokens are billed against this budget before a single word
      // of the answer is emitted, so it has to sit well above the ~512 an
      // answer alone needs. "low" effort keeps latency down: this is grounded
      // Q&A over a CV, not a problem that rewards deliberation.
      max_tokens: 1536,
      reasoning_effort: "low",
      messages: [
        { role: "system", content: buildSystemPrompt(lang) },
        ...messages,
      ],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    return new Response(JSON.stringify({ error: "upstream_error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Re-emit Groq's SSE stream as plain text chunks the widget can render.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstream.body.getReader();

  const emitLine = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    line: string
  ) => {
    const data = line.replace(/^data: /, "").trim();
    if (!data || data === "[DONE]") return;
    try {
      // Reasoning models also stream a `reasoning` field; only `content` is
      // the answer, so the model's scratchpad never reaches the visitor.
      const delta = JSON.parse(data).choices?.[0]?.delta?.content;
      if (delta) controller.enqueue(encoder.encode(delta));
    } catch {
      // A frame that is complete but still unparseable is malformed; skipping
      // it is correct, unlike skipping a merely-incomplete one.
    }
  };

  // Pumped from start() rather than pull(): a reasoning model emits long runs
  // of frames that enqueue nothing, and a pull-driven stream stalls on those
  // instead of reading on.
  const stream = new ReadableStream({
    async start(controller) {
      // Network chunks don't respect SSE frame boundaries: a chunk regularly
      // ends mid-JSON. Whatever follows the last newline waits here for the
      // rest of its frame — parsing it eagerly drops those tokens and mangles
      // the answer mid-word.
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? ""; // keep the trailing partial frame
          for (const line of lines) emitLine(controller, line);
        }

        // Flush whatever trailing frame the stream ended on.
        buffer += decoder.decode();
        if (buffer.trim()) emitLine(controller, buffer);
      } finally {
        controller.close();
      }
    },
    cancel() {
      reader.cancel();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};
