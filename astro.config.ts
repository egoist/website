import { defineConfig } from "astro/config"
import fs from "fs"
import mdx from "@astrojs/mdx"
import { rehypeTable } from "./src/lib/rehype-table"
import { rehypeExternalLink } from "./src/lib/rehype-external-link"
import expressiveCode from "astro-expressive-code"
import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import opengraphImages, { type SatoriFontOptions } from "astro-opengraph-images"
import { simpleBlog } from "./og-template"

const fonts = ([400, 700] as const).map(
  (weight) =>
    ({
      name: "Noto Sans SC",
      weight,
      style: "normal" as const,
      data: fs.readFileSync(
        `node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-${weight}-normal.woff`,
      ),
    }) satisfies SatoriFontOptions,
)

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
    opengraphImages({
      options: {
        fonts: fonts as any,
      },
      render: simpleBlog,
    }),
  ],
})
