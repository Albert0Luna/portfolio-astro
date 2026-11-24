/**
 * Extracts only the visible answer delta from a single Groq SSE line.
 * Reasoning models also stream a `reasoning` field; ignoring it guarantees
 * the model's scratchpad never reaches the visitor.
 */
export const parseSseDelta = (line: string): string | null => {
  const trimmed = line.trim();
  if (!trimmed.startsWith("data:")) return null;

  const data = trimmed.slice(5).trim();
  if (!data || data === "[DONE]") return null;

  try {
    const parsed = JSON.parse(data) as {
      choices?: Array<{ delta?: { content?: unknown } }>;
    };
    const content = parsed.choices?.[0]?.delta?.content;
    return typeof content === "string" && content.length > 0 ? content : null;
  } catch {
    return null;
  }
};

/**
 * Re-emits Groq's SSE stream as plain UTF-8 text chunks.
 * Pumped from start() rather than pull() so reasoning frames that emit no
 * visible content do not stall the stream.
 */
export const createGroqTextStream = (
  upstreamBody: ReadableStream<Uint8Array>
): ReadableStream<Uint8Array> => {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = upstreamBody.getReader();
  let closed = false;

  const safeClose = (controller: ReadableStreamDefaultController<Uint8Array>) => {
    if (closed) return;
    closed = true;
    try {
      controller.close();
    } catch {
      // Stream already closed or errored by client disconnect.
    }
  };

  const emitLine = (
    controller: ReadableStreamDefaultController<Uint8Array>,
    line: string
  ) => {
    if (closed) return;
    const delta = parseSseDelta(line);
    if (delta) {
      controller.enqueue(encoder.encode(delta));
    }
  };

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";

      try {
        while (!closed) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) emitLine(controller, line);
        }

        buffer += decoder.decode();
        if (buffer.trim()) emitLine(controller, buffer);
      } catch {
        // Swallow mid-stream disconnects cleanly rather than throwing unhandled rejections.
      } finally {
        reader.releaseLock();
        safeClose(controller);
      }
    },
    async cancel() {
      closed = true;
      try {
        await reader.cancel();
      } catch {
        // Ignore cancellation errors if the upstream reader is already closed.
      }
    },
  });
};
