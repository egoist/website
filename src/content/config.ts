// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content"

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    ai_summary: z.string().optional(),
    is_page: z.boolean().optional(),
    headings: z
      .array(
        z.object({
          depth: z.number(),
          slug: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
  }),
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blog: blogCollection,
}
