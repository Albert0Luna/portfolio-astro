import type { APIRoute } from "astro";
import { GROQ_API_KEY } from "astro:env/server";
import { setDefaultResultOrder } from "node:dns";
import { getSystemPrompt } from "../../lib/chat/prompt";
import {
  SlidingWindowRateLimiter,
  extractClientIp,
} from "../../lib/chat/rate-limit";
import { createGroqTextStream } from "../../lib/chat/sse";
import {
  isAllowedOrigin,
  readBoundedJson,
  sanitizeMessages,
} from "../../lib/chat/validation";

export const prerender = false;

// Some container/serverless hosts advertise IPv6 without a working outbound
// route: Node's fetch tries the AAAA record first (Happy Eyeballs), the
// packet silently vanishes, and the request hangs forever with no error
// instead of failing fast. Forcing IPv4 first avoids that black hole.
setDefaultResultOrder("ipv4first");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";
const UPSTREAM_TIMEOUT_MS = 25_000;

const rateLimiter = new SlidingWindowRateLimiter({
  maxRequests: 15,
  windowMs: 10 * 60 * 1000,
});

const jsonError = (
  error: string,
  status: number,
  extraHeaders?: Record<string, string>
): Response =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });

export const POST: APIRoute = async ({ request, clientAddress, site }) => {
  if (!isAllowedOrigin(request, site)) {
    return jsonError("forbidden_origin", 403);
  }

  const clientIp = extractClientIp(request, clientAddress);
  const limit = rateLimiter.check(clientIp);
  if (!limit.allowed) {
    return jsonError("rate_limited", 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const apiKey = GROQ_API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey) {
    return jsonError("chat_unavailable", 503);
  }

  const bodyResult = await readBoundedJson(request);
  if (!bodyResult.ok) {
    return jsonError(bodyResult.error, bodyResult.status);
  }

  const messages = sanitizeMessages(bodyResult.data.messages);
  if (!messages) {
    return jsonError("invalid_messages", 400);
  }

  const lang = bodyResult.data.lang === "es" ? "es" : "en";

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
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
          { role: "system", content: getSystemPrompt(lang) },
          ...messages,
        ],
      }),
    });
  } catch (err) {
    const isTimeout =
      err instanceof Error &&
      (err.name === "TimeoutError" || err.name === "AbortError");
    return jsonError(isTimeout ? "upstream_timeout" : "upstream_error", isTimeout ? 504 : 502);
  }

  if (!upstream.ok || !upstream.body) {
    return jsonError("upstream_error", 502);
  }

  const stream = createGroqTextStream(upstream.body);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};
