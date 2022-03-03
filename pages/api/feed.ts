import { NextApiHandler } from "next"
import { Feed } from "feed"
import {
  GetPostsForFeedDocument,
  GetPostsForFeedQuery,
  GetPostsForFeedQueryVariables,
} from "~/generated/graphql"
import { executeSchema, getGraphqlContext } from "~/server/graphql-schema"
import { site } from "~/config"

const handler: NextApiHandler = async (req, res) => {
  const context = await getGraphqlContext(req, res)
  const getPosts = await executeSchema<
    GetPostsForFeedQuery,
    GetPostsForFeedQueryVariables
  >(context, GetPostsForFeedDocument, {})

  if (getPosts.errors) {
    return res.status(500).json(getPosts.errors)
  }

  const feed = new Feed({
    id: site.url,
    title: site.title,
    description: site.description,
    author: {
      name: site.author,
      email: site.email,
      link: site.url,
    },
    copyright: `${site.author} © ${new Date().getFullYear()}`,
  })

  for (const post of getPosts.data!.getPages) {
    feed.addItem({
      title: post.title,
      link: `${site.url}/${post.slug}`,
      content: post.contentHTML,
      date: new Date(post.createdAt),
    })
  }

  res.setHeader("Content-Type", "application/xml")
  res.end(feed.atom1())
}

export default handler
