import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import { rehypeTable } from "./src/lib/rehype-table"
import { rehypeExternalLink } from "./src/lib/rehype-external-link"
import expressiveCode from "astro-expressive-code"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {},
    rehypePlugins: [rehypeTable, rehypeExternalLink, rehypeHeadingIds],
    gfm: true,
  },
  vite: {
    ssr: {
      noExternal: ["use-onclickoutside"],
    },
  },
  site: "https://egoist.dev",
  integrations: [
    expressiveCode({
      themes: ["solarized-light"],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        codeFontSize: "0.95rem",
        frames: {
          shadowColor: "transparent",
        },
      },
    }),
    mdx({}),
  ],
})
