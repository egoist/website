import path from "path"
import fs from "fs"
import yaml from "js-yaml"
import { z } from "zod"

const DefaultSchema = z.object({
  type: z.string().optional(),
  slug: z.string(),
  createdAt: z.date().transform((v) => v.toISOString()),
  content: z.string(),
})

const UserSchema = {
  title: z.string(),
  description: z.string().optional(),
  type: z.enum(["page", "post"]).default("post"),
}

const MergedSchema = DefaultSchema.extend(UserSchema)

export type PageType = z.infer<typeof MergedSchema>

function parseFronmatter(source: string) {
  source = source.replace(/^-{3}\n*/, "")
  const sep = source.indexOf("---")
  const frontmatter = source.slice(0, sep)
  const content = source.slice(sep + 3)
  return {
    frontmatter: yaml.load(frontmatter) as any,
    content: content,
  }
}

export function contentbase(options: { contentDir?: string } = {}) {
  const contentDir = path.resolve(options.contentDir || "content")

  function parseFile(file: string) {
    const absoluteFile = path.join(contentDir, file)
    if (!fs.existsSync(absoluteFile)) return null
    const source = fs.readFileSync(absoluteFile, "utf8")
    const { frontmatter, content } = parseFronmatter(source)
    const result = DefaultSchema.extend(UserSchema).safeParse({
      slug: file.replace(/\.[a-z]+$/, ""),
      createdAt:
        frontmatter.date || fs.statSync(path.join(contentDir, file)).ctime,
      content,
      ...frontmatter,
    })
    if (result.success) {
      return result.data
    }
    throw new Error(
      `validation failed at ${path.join(contentDir, file)}, ${JSON.stringify(
        result.error.issues,
        null,
        2
      )}`
    )
  }

  return {
    async fetchPage(slug: string) {
      const file = `${slug}.md`
      return parseFile(file)
    },
    async fetchPages(): Promise<PageType[]> {
      const files = fs.readdirSync(contentDir)
      const pages = files
        .map((file) => {
          return parseFile(file)!
        })
        .sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1
        })

      return pages
    },
  }
}
