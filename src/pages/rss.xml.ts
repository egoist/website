import type { APIRoute } from "astro"
import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { site } from "~/config"
import { sortByDate } from "~/lib/utils"

export const GET: APIRoute = async (context) => {
  const allPosts = await getCollection(
    "blog",
    (item) => !item.data.is_page && item.data.date,
  )

  return rss({
    // `<title>` field in output xml
    title: site.title,
    // `<description>` field in output xml
    description: site.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site!,

    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: sortByDate(allPosts).map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.date!,
        description: post.data.description || post.data.ai_summary,
        link: `/${post.slug}`,
      }
    }),
  })
}
