import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { Layout } from "~/components/Layout"
import {
  GetPostsForListingDocument,
  GetPostsForListingQuery,
  GetPostsForListingQueryVariables,
} from "~/generated/graphql"
import { executeSchema, getGraphqlContext } from "~/server/graphql-schema"

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const context = await getGraphqlContext(req, res)
  const posts = await executeSchema<
    GetPostsForListingQuery,
    GetPostsForListingQueryVariables
  >(context, GetPostsForListingDocument, {})
  if (!posts.data) {
    throw new Error(
      (posts.errors && posts.errors[0].message) || "graphql error"
    )
  }
  return {
    props: {
      posts: posts.data.getPages,
    },
  }
}

export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <section className="">
        <h2 className="text-2xl font-medium mb-5">Posts</h2>
        <div>
          <div className="space-y-1 text-lg">
            {posts.map((post) => {
              return (
                <div key={post.id}>
                  <h3>
                    <span className="text-zinc-500 mr-3">{post.createdAt}</span>
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
