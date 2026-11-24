export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const MAX_MESSAGES = 12;
export const MAX_CONTENT_LENGTH = 800;
export const MAX_BODY_BYTES = 16_384;

export type BoundedJsonResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; status: 400 | 413 | 415; error: string };

/**
 * Ensures browser requests come from the same origin (or configured site origin).
 * Non-same-origin browser requests are rejected to stop third-party sites from
 * piggybacking on /api/chat.
 */
export const isAllowedOrigin = (
  request: Request,
  configuredSite?: string | URL
): boolean => {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return true;

  let origin: string;
  try {
    origin = new URL(originHeader).origin;
  } catch {
    return false;
  }

  const allowed = new Set<string>();
  try {
    allowed.add(new URL(request.url).origin);
  } catch {
    // ignore malformed request URL
  }
  if (configuredSite) {
    try {
      allowed.add(new URL(configuredSite).origin);
    } catch {
      // ignore malformed site URL
    }
  }

  return allowed.has(origin);
};

/**
 * Reads a JSON request body with a strict byte ceiling, defending against
 * missing or spoofed Content-Length headers.
 */
export const readBoundedJson = async (
  request: Request,
  maxBytes = MAX_BODY_BYTES
): Promise<BoundedJsonResult> => {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, status: 415, error: "unsupported_media_type" };
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, error: "payload_too_large" };
  }

  if (!request.body) {
    return { ok: false, status: 400, error: "invalid_json" };
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel().catch(() => {});
        return { ok: false, status: 413, error: "payload_too_large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, status: 400, error: "invalid_json" };
  }

  const combined = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(combined));
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { ok: false, status: 400, error: "invalid_json" };
    }
    return { ok: true, data: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, status: 400, error: "invalid_json" };
  }
};

/**
 * Validates and normalizes chat messages:
 * - Only accepts `user` / `assistant` roles with non-empty string content.
 * - Drops leading `assistant` turns and collapses invalid consecutive `assistant` turns
 *   to reduce multi-turn prompt-injection / few-shot steering.
 * - Requires the final turn to be from `user`.
 */
export const sanitizeMessages = (raw: unknown): ChatMessage[] | null => {
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const cleaned: ChatMessage[] = [];

  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;
    const candidate = item as { role?: unknown; content?: unknown };
    if (candidate.role !== "user" && candidate.role !== "assistant") continue;
    if (typeof candidate.content !== "string") continue;

    const content = candidate.content.trim().slice(0, MAX_CONTENT_LENGTH);
    if (!content) continue;

    // Never allow a conversation to start with a forged assistant turn,
    // and never accept consecutive assistant turns without a user prompt.
    if (candidate.role === "assistant") {
      if (cleaned.length === 0 || cleaned[cleaned.length - 1].role === "assistant") {
        continue;
      }
    }

    cleaned.push({ role: candidate.role, content });
  }

  let bounded = cleaned.slice(-MAX_MESSAGES);
  while (bounded.length > 0 && bounded[0].role === "assistant") {
    bounded = bounded.slice(1);
  }

  if (bounded.length === 0 || bounded[bounded.length - 1].role !== "user") {
    return null;
  }

  return bounded;
};
