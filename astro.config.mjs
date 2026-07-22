// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // Pages stay fully static; the adapter only powers the on-demand
  // /api/chat endpoint (prerender = false) behind the AI chat widget.
  // Node standalone is what Appwrite Sites runs to serve the SSR routes.
  adapter: node({ mode: "standalone" }),
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
