import { GetServerSideProps } from "next"
import Link from "next/link"
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
  const posts = getPostsResult.data?.getPages
  return (
    <Layout>
      <section className="">
        <h2 className="text-2xl font-medium mb-5">Posts</h2>
        <div>
          <div className="space-y-1 text-lg">
            {posts &&
              posts.map((post) => {
                return (
                  <div key={post.id}>
                    <h3>
                      <span className="text-zinc-500 mr-3">
                        {post.publishedAt}
                      </span>
                      <Link href={`/${post.slug}`}>
                        <a className="text-pink-500 hover:underline">
                          {post.title}
                        </a>
                      </Link>
                    </h3>
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
