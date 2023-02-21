import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkGfm from "remark-gfm";
import preact from "@astrojs/preact";

import rehypePrettyCode, { Options } from "rehype-pretty-code";
import { rehypeTable } from "./src/lib/rehype-table";
import { rehypeExternalLink } from "./src/lib/rehype-external-link";

const prettyCodeOptions: Partial<Options> = {
  // Use one of Shiki's packaged themes
  theme: "solarized-light",

  // Keep the background or use a custom background color?
  keepBackground: true,

  // Callback hooks to add custom logic to nodes when visiting
  // them.
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    // Each line node by default has `class="line"`.
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    // Each word node has no className by default.
    node.properties.className = ["word"];
  },
};

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
  integrations: [mdx({}), preact({ compat: true })],
});
