import { GetServerSideProps } from "next"
import Link from "next/link"
import { useMemo } from "react"
import { LanguageTabs } from "~/components/LanguageTabs"
import { Layout } from "~/components/Layout"
import {
  GetPostsForListingDocument,
  GetPostsForListingQuery,
  GetPostsForListingQueryVariables,
  useGetPostsForListingQuery,
} from "~/generated/graphql"
import { createUrqlClient, withUrql } from "~/lib/urql-client"
import { setCacheHeader } from "~/server/utils"

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const lang = (query.lang || "") as string
  const { client, ssrCache } = createUrqlClient()
  await client
    .query<GetPostsForListingQuery, GetPostsForListingQueryVariables>(
      GetPostsForListingDocument,
      { language: lang }
    )
    .toPromise()
  setCacheHeader(res)
  return {
    props: {
      urqlState: ssrCache.extractData(),
      lang,
    },
  }
}

function Home({ lang }: { lang: string }) {
  const [getPostsResult] = useGetPostsForListingQuery({
    variables: { language: lang },
  })

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
  }, [lang])

  return (
    <Layout>
      <section className="">
        <div>
          <div className="mb-8 -mt-3">
            <LanguageTabs />
          </div>
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
