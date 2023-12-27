import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { rehypeTable } from "./src/lib/rehype-table";
import { rehypeExternalLink } from "./src/lib/rehype-external-link";

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "solarized-light",
    },
    rehypePlugins: [rehypeTable, rehypeExternalLink],
    gfm: true,
  },
  vite: {
    ssr: {
      noExternal: ["use-onclickoutside"],
    },
  },
  integrations: [mdx({})],
});
