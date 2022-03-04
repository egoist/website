import { GetServerSideProps } from "next"
import {
  GetPageDocument,
  GetPageQuery,
  GetPageQueryVariables,
  useGetPageQuery,
} from "~/generated/graphql"
import { site } from "~/config"
import { useRouter } from "next/router"
import { createUrqlClient, withUrql } from "~/lib/urql-client"
import { setCacheHeader } from "~/server/utils"
import { PageLayout } from "~/components/PageLayout"

const getDesc = (str = "") => str.replace(/<[^>]*>/g, "").slice(0, 100) + "..."

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const slug = params!.page as string
  const { client, ssrCache } = createUrqlClient()
  await client
    .query<GetPageQuery, GetPageQueryVariables>(GetPageDocument, {
      slugOrId: slug,
    })
    .toPromise()
  setCacheHeader(res)
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
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

  const tweetText = `Check out "${page?.title}" by @${site.twitter}`
  const tweetUrl = `${site.url}/${page?.slug}`

  if (!page) return null
  return (
    <PageLayout
      page={{ ...page, description }}
      tweetButton={{ text: tweetText, url: tweetUrl }}
    />
  )
}

export default withUrql(Page)
