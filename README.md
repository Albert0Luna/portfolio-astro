<div align="center">

# 🚀 Gustavo Luna — Portfolio

A modern, bilingual (EN/ES) personal portfolio built with **Astro 7**, **Tailwind CSS 4**, and an embedded streaming AI assistant (**Luna AI**) powered by **Groq** — showcasing full-stack engineering and applied AI work.

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=fff)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwind-css&logoColor=fff)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![i18n](https://img.shields.io/badge/i18n-EN%20%2F%20ES-2563eb)](#-internationalization)

</div>

---

## ✨ Highlights

- ⚡ **Static-first + Hybrid SSR** — `/` and `/es` are statically prerendered; `/api/chat` runs on demand via `@astrojs/node` standalone
- 🤖 **Luna AI Assistant** — floating streaming chat widget backed by Groq (`openai/gpt-oss-120b`), grounded in the portfolio's typed config + deep context, protected with rate limiting, bounded JSON parsing, origin checks, and upstream timeouts
- 🌐 **Bilingual (EN / ES)** — powered by Astro i18n (`Astro.currentLocale`), localized metadata, canonical & `hreflang` links
- 🎨 **Neural Elegance design system** — custom Tailwind v4 theme, interactive canvas neural background, glass surfaces, and progressive `animation-timeline: view()` reveals
- 🌓 **Class-based dark mode** — flash-free inline initialization, persisted in `localStorage`
- 🧩 **Single source of truth** — all copy, experience, projects, certifications, and AI prompt context derive from [`src/config/index.ts`](src/config/index.ts)
- 🛡️ **Strictly typed & tested** — `astro check` + native `node:test` unit suite for chat validation, rate limiting, and SSE streaming

---

## 📸 Preview

> Open the [live demo](https://portfolio-gustavo-luna.appwrite.network/) and toggle the language switcher or open **Luna AI**.

---

## 🧰 Tech Stack

| Layer            | Choice                                                                          |
| ---------------- | ------------------------------------------------------------------------------- |
| **Framework**    | [Astro 7](https://astro.build) + `@astrojs/node` (standalone)                   |
| **Styling**      | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`               |
| **AI Backend**   | [Groq API](https://console.groq.com/) (`openai/gpt-oss-120b`, SSE streaming)    |
| **Icons**        | [Lucide](https://lucide.dev) — tree-shaken SVGs                                 |
| **Fonts**        | [Fontsource](https://fontsource.org) — Be Vietnam Pro, Space Grotesk, JetBrains Mono |
| **Language**     | TypeScript (strict)                                                             |
| **Testing**      | Node built-in `node:test` + `@astrojs/check`                                    |
| **Package mgr**  | pnpm                                                                            |

---

## 🗂️ Project Structure

```text
portfolio-astro/
├── public/                       # Unhashed static assets (favicon, og:image)
│   ├── favicon.svg
│   └── profile-photo.webp
├── src/
│   ├── assets/                   # Build-time optimized images (Sharp)
│   ├── components/               # UI building blocks (.astro)
│   │   ├── About.astro            # Unified bilingual About section
│   │   ├── AIChat.astro           # Streaming Luna AI chat widget
│   │   ├── Experience.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── NeuralBackground.astro # Optimized interactive canvas network
│   │   ├── Projects.astro
│   │   ├── Section.astro
│   │   └── TechBadge.astro
│   ├── config/
│   │   ├── index.ts               # Single source of truth (EN + ES)
│   │   └── ai-context.ts          # Deep technical context for Luna AI
│   ├── icons/
│   │   └── Menu.astro
│   ├── layouts/
│   │   └── Layout.astro           # <head>, canonical/hreflang, OG tags, theme
│   ├── lib/
│   │   ├── badges.ts              # Tech -> dot color map (DOT_COLORS)
│   │   ├── i18n.ts                # Locale helper around Astro.currentLocale
│   │   └── chat/                  # Rate limiting, validation, prompt, SSE parser
│   ├── middleware.ts              # HTTP security headers
│   ├── pages/
│   │   ├── index.astro            # / (EN, default locale)
│   │   ├── es/index.astro         # /es
│   │   └── api/chat.ts            # POST /api/chat (prerender = false)
│   ├── styles/
│   │   └── global.css             # Tailwind import, @theme tokens, animations
│   └── types/
│       └── index.d.ts             # Shared TypeScript interfaces
├── tests/                         # Unit tests (node:test)
├── astro.config.mjs               # site, Node adapter, astro:env schema, i18n
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.json
```

---

## 🌐 Internationalization

Astro's built-in i18n is configured with two locales:

| Locale | URL     | Source data       |
| ------ | ------- | ----------------- |
| `en`   | `/`     | `SITE_CONTENT_EN` |
| `es`   | `/es/`  | `SITE_CONTENT_ES` |

All components resolve the active locale via [`getLang(Astro.currentLocale)`](src/lib/i18n.ts).

---

## ✏️ Content Editing

All copy and structured facts live in [`src/config/index.ts`](src/config/index.ts). To add a tech badge dot color, extend `DOT_COLORS` in [`src/lib/badges.ts`](src/lib/badges.ts) using full Tailwind color literals.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22 (Node 24 recommended for native TypeScript test execution)
- **pnpm** ≥ 10

### Environment

Copy `.env.example` to `.env` and set your Groq API key to enable `/api/chat`:

```bash
cp .env.example .env
```

### Install & run

```bash
pnpm install
pnpm dev
```

The dev server starts at **http://localhost:4321**.

---

## 📜 Available Scripts

| Script         | Description                                     |
| -------------- | ----------------------------------------------- |
| `pnpm dev`     | Start the local dev server with HMR             |
| `pnpm build`   | Build the hybrid static/Node app to `./dist`    |
| `pnpm preview` | Preview the production build locally            |
| `pnpm check`   | Run `astro check` (TypeScript + Astro templates)|
| `pnpm test`    | Run the `node:test` unit test suite             |
| `pnpm astro`   | Run any Astro CLI command                       |

---

## 👤 Author

**Gustavo Alberto Robles Luna** — *Full-Stack & AI Engineer*

- 🌐 Portfolio: [https://portfolio-gustavo-luna.appwrite.network/](https://portfolio-gustavo-luna.appwrite.network/)
- 💼 LinkedIn: [@gustavo-alberto-r](https://www.linkedin.com/in/gustavo-alberto-r-a202b2231/)
- 🐙 GitHub: [@Albert0Luna](https://github.com/Albert0Luna)
- 📧 Email: albertorl1002@gmail.com
