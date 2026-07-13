<div align="center">

# 🚀 Alberto Luna — Portfolio

A modern, bilingual (EN/ES) personal portfolio built with **Astro 5** and **Tailwind CSS 4** — showcasing full-stack work, AI side-projects, and a deep focus on clean, accessible UI.

[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro&logoColor=fff)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?logo=tailwind-css&logoColor=fff)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![i18n](https://img.shields.io/badge/i18n-EN%20%2F%20ES-2563eb)](#-internationalization)

</div>

---

## ✨ Highlights

- ⚡ **Static-first** — ships zero JS by default, lightning-fast TTFB
- 🌐 **Bilingual** — full English / Spanish support with smart URL routing
- 🎨 **Design system** — custom Tailwind theme, serif/sans pairing, motion via `animation-timeline: view()`
- 🌓 **Class-based dark mode** — no FOUC, system preference detection, persisted in `localStorage`
- 🧩 **Content-driven** — all copy, projects and experience live in a single typed config file
- 📱 **Fully responsive** — mobile menu, sticky nav, IntersectionObserver-driven section highlighting
- 🛡️ **Strictly typed** — shared TypeScript interfaces for every component prop

---

## 📸 Preview

> Open the [live demo](https://your-domain.com) and toggle the language switcher to see the EN ↔ ES experience.

---

## 🧰 Tech Stack

| Layer            | Choice                                                                  |
| ---------------- | ----------------------------------------------------------------------- |
| **Framework**    | [Astro 5](https://astro.build) (static, island-less)                    |
| **Styling**      | [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`       |
| **Icons**        | [Lucide](https://lucide.dev) — tree-shaken SVGs                         |
| **Fonts**        | [Fontsource](https://fontsource.org) — self-hosted Gabarito + Be Vietnam Pro |
| **Language**     | TypeScript (strict)                                                     |
| **Package mgr**  | pnpm                                                                    |

---

## 🗂️ Project Structure

```text
portfolio-astro/
├── public/                       # Static assets served as-is
│   ├── favicon.svg
│   ├── profile-photo.webp
│   ├── foto-web.webp
│   ├── ecliptica.webp
│   ├── luna-news.webp
│   └── unimart.webp
├── src/
│   ├── assets/                   # Decorative SVGs
│   ├── components/               # UI building blocks (.astro)
│   │   ├── Hero.astro
│   │   ├── AboutEn.astro          # EN about section
│   │   ├── AboutEs.astro          # ES about section
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── TechBadge.astro        # Reusable colored tech chip
│   │   ├── Header.astro           # Sticky nav + theme/lang switchers
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro
│   │   └── Section.astro          # Generic section wrapper
│   ├── config/
│   │   └── index.ts               # ⭐ Single source of truth (EN + ES)
│   ├── icons/
│   │   └── Menu.astro
│   ├── layouts/
│   │   └── Layout.astro           # <head>, OG tags, Header & Footer
│   ├── lib/
│   │   └── badges.ts              # Tech → Tailwind class registry
│   ├── pages/
│   │   ├── index.astro            # / (EN, default locale)
│   │   └── es/
│   │       └── index.astro        # /es
│   ├── styles/
│   │   └── global.css             # Tailwind import + @theme tokens + animations
│   └── types/
│       └── index.d.ts             # SiteConfig, SiteContent, HeroProps, …
├── astro.config.mjs               # i18n + Tailwind Vite plugin
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## 🌐 Internationalization

Astro's built-in i18n is configured with two locales:

| Locale | URL     | Source data         |
| ------ | ------- | ------------------- |
| `en`   | `/`     | `SITE_CONTENT_EN`   |
| `es`   | `/es`   | `SITE_CONTENT_ES`   |

The `LanguageSwitcher` resolves the alternate URL via `getRelativeLocaleUrl()` and re-navigates without a full reload. Every section title carries both `text` and `textEs`, picked at render time by reading `Astro.url.pathname`.

---

## 🎨 Design System

Defined in `src/styles/global.css` under `@theme`:

- **Colors** — `primary` (#2563eb), `neutral` (#94a3b8), plus an opinionated black/white pair tuned for OLED.
- **Type scale** — custom `text-xs` … `text-9xl` with hand-tuned line-heights.
- **Fonts** — `font-sans` (Be Vietnam Pro) and `font-serif` (Gabarito Variable).
- **Dark mode** — class-based via `@custom-variant dark`; theme is resolved inline in `<head>` to prevent flash.
- **Motion** — scroll-driven animations using modern CSS `animation-timeline: view()` for sections, project cards, and the about photo. Smooth cross-fade when toggling themes.

---

## ✏️ Content Editing

All copy is centralized in [`src/config/index.ts`](src/config/index.ts):

```ts
export const SITE_CONTENT_EN: SiteContent = {
  hero: { name, specialty, summary, email, buttonText, projectsButtonText },
  projects:  [ { name, summary, date, stack, image, linkPreview, linkSource } ],
  experience:[ { company, position, startDate, endDate, summary, link } ],
  about:     { image },
};
```

To add a tech badge, extend the `BADGE_STYLES` map in [`src/lib/badges.ts`](src/lib/badges.ts) — strings are full Tailwind literals so the JIT scanner picks them up automatically.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 9 (or your favorite package manager)

### Install & run

```bash
pnpm install
pnpm dev
```

The dev server starts at **http://localhost:4321**.

### Build & preview

```bash
pnpm build       # outputs to ./dist
pnpm preview     # serve the production build locally
```

---

## 📜 Available Scripts

| Script           | Description                                  |
| ---------------- | -------------------------------------------- |
| `pnpm dev`       | Start the local dev server with HMR          |
| `pnpm build`     | Build the static site to `./dist`            |
| `pnpm preview`   | Preview the production build                 |
| `pnpm astro`     | Run any Astro CLI command (e.g. `astro add`) |

---

## ♿ Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<footer>`)
- `aria-expanded` / `aria-controls` on the mobile menu
- Theme & language toggles expose `aria-label`
- Respects `prefers-reduced-motion` through scroll-driven animation ranges
- Smooth scroll anchored to `scroll-pt-16` for sticky-header offset

---

## 🤝 Contributing

This is a personal portfolio, but suggestions and PRs are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/amazing-thing`
3. Commit your changes: `git commit -m "feat: add amazing thing"`
4. Push the branch: `git push origin feat/amazing-thing`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author

**Gustavo Alberto Robles Luna** — *Full Stack Developer*

- 🌐 Portfolio: [your-domain.com](https://your-domain.com)
- 💼 LinkedIn: [@gustavo-alberto-r](https://www.linkedin.com/in/gustavo-alberto-r-a202b2231/)
- 🐙 GitHub: [@Albert0Luna](https://github.com/Albert0Luna)
- 📧 Email: albertorl1002@gmail.com

---

<div align="center">
  <sub>Built with ☕ + ⚡ from <strong>Querétaro, México</strong>.</sub>
</div>
