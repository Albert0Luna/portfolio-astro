import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createGroqTextStream,
  parseSseDelta,
} from "../src/lib/chat/sse.ts";

describe("parseSseDelta", () => {
  it("extracts delta.content and ignores reasoning or [DONE] frames", () => {
    assert.equal(
      parseSseDelta('data: {"choices":[{"delta":{"reasoning":"thinking..."}}]}'),
      null
    );
    assert.equal(
      parseSseDelta('data: {"choices":[{"delta":{"content":"Hola"}}]}'),
      "Hola"
    );
    assert.equal(parseSseDelta("data: [DONE]"), null);
    assert.equal(parseSseDelta("data: {malformed"), null);
    assert.equal(parseSseDelta(": keepalive"), null);
  });
});

describe("createGroqTextStream", () => {
  it("reassembles split JSON SSE frames and multi-byte UTF-8 characters cleanly", async () => {
    const encoder = new TextEncoder();
    const frame1 = 'data: {"choices":[{"delta":{"reasoning":"secret"}}]}\n\n';
    const frame2 = 'data: {"choices":[{"delta":{"content":"¡Hola, "}}]}\n';
    const frame3 = 'data: {"choices":[{"delta":{"content":"Querétaro! 🚀"}}]}\n';
    const frame4 = "data: [DONE]\n";
    const fullBytes = encoder.encode(frame1 + frame2 + frame3 + frame4);

    // Slice right through mid-JSON and mid-UTF-8 sequences.
    const chunkSizes = [17, 25, 19, 13, 21, 9, 1000];
    const upstream = new ReadableStream<Uint8Array>({
      start(controller) {
        let offset = 0;
        for (const size of chunkSizes) {
          if (offset >= fullBytes.length) break;
          controller.enqueue(fullBytes.slice(offset, offset + size));
          offset += size;
        }
        controller.close();
      },
    });

    const out = createGroqTextStream(upstream);
    const text = await new Response(out).text();
    assert.equal(text, "¡Hola, Querétaro! 🚀");
  });
});
