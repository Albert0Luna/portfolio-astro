import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SlidingWindowRateLimiter,
  extractClientIp,
} from "../src/lib/chat/rate-limit.ts";

describe("SlidingWindowRateLimiter", () => {
  it("allows requests up to maxRequests and blocks subsequent ones with retryAfterSeconds", () => {
    const limiter = new SlidingWindowRateLimiter({
      maxRequests: 3,
      windowMs: 60_000,
    });

    const t0 = 1_000_000;
    assert.equal(limiter.check("1.2.3.4", t0).allowed, true);
    assert.equal(limiter.check("1.2.3.4", t0 + 1000).allowed, true);
    assert.equal(limiter.check("1.2.3.4", t0 + 2000).allowed, true);

    const blocked = limiter.check("1.2.3.4", t0 + 3000);
    assert.equal(blocked.allowed, false);
    assert.equal(blocked.remaining, 0);
    assert.ok(blocked.retryAfterSeconds >= 57);
  });

  it("allows traffic again after the window elapses", () => {
    const limiter = new SlidingWindowRateLimiter({
      maxRequests: 2,
      windowMs: 10_000,
    });

    assert.equal(limiter.check("9.9.9.9", 1000).allowed, true);
    assert.equal(limiter.check("9.9.9.9", 2000).allowed, true);
    assert.equal(limiter.check("9.9.9.9", 3000).allowed, false);
    assert.equal(limiter.check("9.9.9.9", 11_500).allowed, true);
  });

  it("bounds memory when many unique IPs hit the limiter", () => {
    const limiter = new SlidingWindowRateLimiter({
      maxRequests: 5,
      windowMs: 60_000,
      maxEntries: 5,
    });

    for (let i = 0; i < 20; i++) {
      assert.equal(limiter.check(`10.0.0.${i}`, 1000 + i).allowed, true);
    }
  });
});

describe("extractClientIp", () => {
  it("prefers the first x-forwarded-for IP when present", () => {
    const req = new Request("https://example.com/api/chat", {
      headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
    });
    assert.equal(extractClientIp(req, "127.0.0.1"), "203.0.113.10");
  });

  it("falls back to clientAddress when forwarding headers are absent", () => {
    const req = new Request("https://example.com/api/chat");
    assert.equal(extractClientIp(req, "198.51.100.7"), "198.51.100.7");
  });
});
