import { Giscus } from "@giscus/react"
import { Layout } from "./Layout"
import { TweetButton } from "./TweetButton"

export const PageLayout: React.FC<{
  page: {
    type: string
    title: string
    description?: string
    createdAt?: string
    contentHTML: string
  }
  tweetButton?: {
    url: string
    text: string
  }
}> = ({ page, tweetButton }) => {
  return (
    <Layout title={page.title} description={page.description}>
      <h2 className="page-title">
        <span>{page.title}</span>
      </h2>
      {page.createdAt && (
        <div>
          <span className="italic text-zinc-500">{page.createdAt}</span>
        </div>
      )}
      <div
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: page.contentHTML }}
      ></div>
      {tweetButton && (
        <div className="mt-10">
          <TweetButton text={tweetButton.text} url={tweetButton.url} />
        </div>
      )}
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
