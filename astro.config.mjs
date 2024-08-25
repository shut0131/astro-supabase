import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-supabase-auth.vercel.app",
  output: "server",
  adapter: cloudflare(),
  integrations: [tailwind(), react()],
  vite: {
    plugins: [react()],
  },
});