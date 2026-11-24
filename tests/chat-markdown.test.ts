import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "../src/lib/chat/markdown.ts";

describe("renderMarkdown", () => {
  it("renders bold, italic, inline code, and bare URLs cleanly", () => {
    const input = [
      "**1. Luna News** – A multilingual site.",
      "*Stack:* `React`, Next.js.",
      "Demo: https://luna-news.appwrite.network/en.",
    ].join("\n");

    const html = renderMarkdown(input);
    assert.match(html, /<strong>1\. Luna News<\/strong>/);
    assert.match(html, /<em>Stack:<\/em>/);
    assert.match(html, /<code>React<\/code>/);
    assert.match(
      html,
      /<a href="https:\/\/luna-news\.appwrite\.network\/en" target="_blank" rel="noopener noreferrer">https:\/\/luna-news\.appwrite\.network\/en<\/a>\./
    );
  });

  it("renders markdown links and bare emails safely", () => {
    const html = renderMarkdown(
      "Visit [GitHub](https://github.com/Albert0Luna) or email albertorl1002@gmail.com."
    );
    assert.match(
      html,
      /<a href="https:\/\/github\.com\/Albert0Luna" target="_blank" rel="noopener noreferrer">GitHub<\/a>/
    );
    assert.match(
      html,
      /<a href="mailto:albertorl1002@gmail\.com">albertorl1002@gmail\.com<\/a>/
    );
  });

  it("renders unordered lists, ordered lists, headings, and fenced code blocks", () => {
    const input = [
      "### Projects",
      "",
      "- Luna News",
      "- UniMart",
      "",
      "1. First",
      "2. Second",
      "",
      "```ts",
      "const x = 1 < 2;",
      "```",
    ].join("\n");

    const html = renderMarkdown(input);
    assert.match(html, /<p class="ai-md-heading">Projects<\/p>/);
    assert.match(html, /<ul><li>Luna News<\/li><li>UniMart<\/li><\/ul>/);
    assert.match(html, /<ol><li>First<\/li><li>Second<\/li><\/ol>/);
    assert.match(html, /<pre><code>const x = 1 &lt; 2;<\/code><\/pre>/);
  });

  it("neutralizes XSS attempts in raw HTML and javascript: links", () => {
    const input =
      '<script>alert(1)</script><img src=x onerror=alert(1)> [click](javascript:alert(1))';
    const html = renderMarkdown(input);
    assert.doesNotMatch(html, /<script/i);
    assert.doesNotMatch(html, /<img/i);
    assert.doesNotMatch(html, /href="javascript:/i);
    assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  });
});
