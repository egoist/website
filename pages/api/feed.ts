import { NextApiHandler } from "next"
import { Feed } from "feed"
import { site } from "~/config"
import { contentbase } from "~/lib/contentbase"

const handler: NextApiHandler = async (req, res) => {
  const feed = new Feed({
    id: site.url,
    title: site.title,
    copyright: `${site.title} © ${new Date().getFullYear()}`,
    author: {
      name: site.author,
      link: site.url,
    },
  })

  const pages = await contentbase().fetchPages()
  const posts = pages.filter((page) => page.type === "post")

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      content: `<a href="${site.url}/${post.slug}">Read more</a>`,
      link: `${site.url}/${post.slug}`,
      date: new Date(post.createdAt),
    })
  }

  res.setHeader("Content-Type", "application/json")
  res.end(feed.json1())
}

export default handler
