import { GetServerSideProps } from "next"
import Link from "next/link"
import { useMemo } from "react"
import { Layout } from "~/components/Layout"
import {
  GetPostsForListingDocument,
  useGetPostsForListingQuery,
} from "~/generated/graphql"
import { createUrqlClient, withUrql } from "~/lib/urql-client"
import { setCacheHeader } from "~/server/utils"

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { client, ssrCache } = createUrqlClient()
  await client.query(GetPostsForListingDocument).toPromise()
  setCacheHeader(res)
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  }
}

function Home() {
  const [getPostsResult] = useGetPostsForListingQuery()
  console.log(getPostsResult)
  const groupedPosts = useMemo(() => {
    const groupedPosts: Map<
      string,
      { title: string; slug: string; id: string; date: string }[]
    > = new Map()
    const posts = getPostsResult.data?.getPages
    if (posts) {
      for (const post of posts) {
        const items = groupedPosts.get(post.year) || []
        items.push(post)
        groupedPosts.set(post.year, items)
      }
    }
    return groupedPosts
  }, [])

  return (
    <Layout>
      <section className="">
        <div>
          <div className="text-lg space-y-6">
            {[...groupedPosts.keys()].map((year) => {
              const posts = groupedPosts.get(year)!
              return (
                <div key={year}>
                  <div className="font-semibold mb-2">{year}</div>
                  {posts.map((post) => {
                    return (
                      <Link key={post.id} href={`/${post.slug}`}>
                        <a className="-mx-2 flex justify-between text-pink-500 hover:bg-zinc-50 p-1 px-2 rounded-lg">
                          <h3>{post.title}</h3>
                          <span className="text-zinc-400 flex-shrink-0">
                            {post.date}
                          </span>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default withUrql(Home)
