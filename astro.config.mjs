// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio-gustavo-luna.appwrite.network/",
  // Pages stay fully static; the adapter only powers the on-demand
  // /api/chat endpoint (prerender = false) behind the AI chat widget.
  // Node standalone is what Appwrite Sites runs to serve the SSR routes.
  adapter: node({ mode: "standalone" }),
  env: {
    schema: {
      GROQ_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "en",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
