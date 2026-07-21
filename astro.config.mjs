// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // Pages stay fully static; the adapter only powers the on-demand
  // /api/chat endpoint (prerender = false) behind the AI chat widget.
  adapter: vercel(),
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
