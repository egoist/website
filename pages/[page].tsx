import { GetStaticPaths, GetStaticProps } from "next"
import { Giscus } from "@giscus/react"
import { Layout } from "~/components/Layout"
import {
  GetPageDocument,
  GetPageQuery,
  GetPageQueryVariables,
  useGetPageQuery,
} from "~/generated/graphql"
import { TweetButton } from "~/components/TweetButton"
import { site } from "~/config"
import { useMemo } from "react"
import { useRouter } from "next/router"
import { createUrqlClient, withUrql } from "~/lib/urql-client"

const getDesc = (str = "") => str.replace(/<[^>]*>/g, "").slice(0, 100) + "..."

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.page as string
  const { client, ssrCache } = createUrqlClient()
  await client
    .query<GetPageQuery, GetPageQueryVariables>(GetPageDocument, {
      slugOrId: slug,
    })
    .toPromise()
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  }
}

function Page() {
  const router = useRouter()
  const slug = router.query.page as string | undefined
  const [getPageResult] = useGetPageQuery({
    variables: {
      slugOrId: slug!,
    },
    pause: !slug,
  })
  const page = getPageResult.data?.getPage
  const description = page && getDesc(page.contentHTML)

  const tweetText = useMemo(
    () => `Check out "${page?.title}" by @${site.twitter}`,
    [page?.title]
  )

  if (!page) return null
  return (
    <Layout title={page.title} description={description}>
      <h2 className="page-title">
        <span>{page.title}</span>
      </h2>
      <div>
        <span className="italic text-zinc-500">{page.createdAt}</span>
      </div>
      <div
        className="prose mt-6"
        dangerouslySetInnerHTML={{ __html: page.contentHTML }}
      ></div>
      <div className="mt-10">
        <TweetButton text={tweetText} url={`${site.url}/${page.slug}`} />
      </div>
      {page.type === "post" && (
        <div className="mt-20 pt-8 border-t border-dotted">
          <Giscus
            repo="egoist/website"
            repoId="MDEwOlJlcG9zaXRvcnkxNTQ0OTcyNDQ="
            categoryId="DIC_kwDOCTVw3M4CAX6w"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            theme="light"
            lang="en"
          />
        </div>
      )}
    </Layout>
  )
}

export default withUrql(Page)
