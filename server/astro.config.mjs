import path from "node:path";
import url from "node:url";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  output: "server",
  adapter: vercel({ webAnalytics: true, speedInsights: true }),
});
