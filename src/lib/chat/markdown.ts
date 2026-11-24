const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isSafeUrl = (rawUrl: string): boolean => {
  const trimmed = rawUrl.trim();
  if (/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(trimmed)) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

const buildAnchor = (href: string, labelHtml: string): string => {
  const safeHref = escapeHtml(href.trim());
  const isMailto = /^mailto:/i.test(href.trim());
  const attrs = isMailto
    ? `href="${safeHref}"`
    : `href="${safeHref}" target="_blank" rel="noopener noreferrer"`;
  return `<a ${attrs}>${labelHtml}</a>`;
};

const formatTextFormatting = (escaped: string): string => {
  // Bold (**text** or __text__)
  let out = escaped.replace(/\*\*(?!\s)([\s\S]+?)(?<!\s)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<![\w])__(?!\s)([\s\S]+?)(?<!\s)__(?![\w])/g, "<strong>$1</strong>");

  // Italic (*text*)
  out = out.replace(/(?<!\*)\*(?!\s)([^*\n]+?)(?<!\s)\*(?!\*)/g, "<em>$1</em>");
  return out;
};

const renderInline = (raw: string): string => {
  const tokens: string[] = [];
  const stash = (html: string): string => {
    const idx = tokens.push(html) - 1;
    return `\u0000TOK${idx}\u0000`;
  };

  let text = escapeHtml(raw);

  // 1. Inline code spans (`code`)
  text = text.replace(/`([^`\n]+)`/g, (_m, code: string) =>
    stash(`<code>${code}</code>`)
  );

  // 2. Markdown links: [label](url)
  text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (full, label: string, url: string) => {
    // Unescape &amp; in query strings for URL validation; buildAnchor re-escapes safely.
    const rawUrl = url.replace(/&amp;/g, "&");
    if (!isSafeUrl(rawUrl)) return full;
    return stash(buildAnchor(rawUrl, formatTextFormatting(label)));
  });

  // 3. Bare HTTP(S) URLs (strip trailing sentence punctuation)
  text = text.replace(/\bhttps?:\/\/[^\s<]+/gi, (match) => {
    let url = match;
    let trailing = "";
    while (/[.,;:!?)]$/.test(url)) {
      trailing = url.slice(-1) + trailing;
      url = url.slice(0, -1);
    }
    const rawUrl = url.replace(/&amp;/g, "&");
    if (!isSafeUrl(rawUrl)) return match;
    return stash(buildAnchor(rawUrl, url)) + trailing;
  });

  // 4. Bare email addresses
  text = text.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    (email) => stash(buildAnchor(`mailto:${email}`, email))
  );

  // 5. Bold and italic
  text = formatTextFormatting(text);

  // 6. Restore stashed HTML tokens
  return text.replace(/\u0000TOK(\d+)\u0000/g, (_m, idx: string) => tokens[Number(idx)] ?? "");
};

/**
 * Renders a safe subset of Markdown (headings, bold, italic, inline code,
 * fenced code blocks, ordered/unordered lists, links, and bare URLs/emails)
 * to sanitized HTML suitable for LLM chat responses.
 */
export const renderMarkdown = (markdown: string): string => {
  const normalized = markdown.replace(/\r\n?/g, "\n").trim();
  if (!normalized) return "";

  const lines = normalized.split("\n");
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines between blocks
    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced code block (```lang ... ```)
    if (/^\s*```/.test(line)) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // consume closing fence
      blocks.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
      continue;
    }

    // Headings (#, ##, ###) rendered as styled strong paragraphs inside chat bubbles
    const headingMatch = line.match(/^\s*#{1,3}\s+(.+)$/);
    if (headingMatch) {
      blocks.push(`<p class="ai-md-heading">${renderInline(headingMatch[1])}</p>`);
      i++;
      continue;
    }

    // Unordered list (-, *, •)
    if (/^\s*(?:[-*•])\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*(?:[-*•])\s+/.test(lines[i])) {
        const content = lines[i].replace(/^\s*(?:[-*•])\s+/, "");
        items.push(`<li>${renderInline(content)}</li>`);
        i++;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    // Ordered list (1. item)
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const content = lines[i].replace(/^\s*\d+\.\s+/, "");
        items.push(`<li>${renderInline(content)}</li>`);
        i++;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    // Paragraph (consecutive non-empty plain lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^\s*```/.test(lines[i]) &&
      !/^\s*#{1,3}\s+/.test(lines[i]) &&
      !/^\s*(?:[-*•])\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      paraLines.push(renderInline(lines[i]));
      i++;
    }
    blocks.push(`<p>${paraLines.join("<br />")}</p>`);
  }

  return blocks.join("");
};
