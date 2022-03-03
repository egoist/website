import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { Giscus } from "@giscus/react"

import { Layout } from "~/components/Layout"
import {
  GetPageDocument,
  GetPageQuery,
  GetPageQueryVariables,
} from "~/generated/graphql"
import { executeSchema, getGraphqlContext } from "~/server/graphql-schema"
import { TweetButton } from "~/components/TweetButton"
import { site } from "~/config"
import { useMemo } from "react"

export const getServerSideProps = async ({
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const context = await getGraphqlContext(req, res)
  const getPageResult = await executeSchema<
    GetPageQuery,
    GetPageQueryVariables
  >(context, GetPageDocument, {
    slugOrId: query.page as string,
  })
  if (getPageResult.errors) {
    throw new Error(getPageResult.errors[0].message)
  }
  const page = getPageResult.data?.getPage!
  return {
    props: {
      page,
    },
  }
}

const getDesc = (str = "") => str.replace(/<[^>]*>/g, "").slice(0, 100) + "..."

export default function Page({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const description = getDesc(page.contentHTML)

  const tweetText = useMemo(
    () => `Check out "${page.title}" by @${site.twitter}`,
    [page.title]
  )

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
