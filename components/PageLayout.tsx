import { RenderableTreeNode } from "@markdoc/markdoc"
import React from "react"
import { Layout } from "./Layout"
import { MarkdocContent } from "./Markdoc"
import { TweetButton } from "./TweetButton"


export const PageLayout: React.FC<{
  page: {
    type: string
    title: string
    description?: string
    date?: string
    cover?: string
  }
  content: RenderableTreeNode
  tweetButton?: {
    url: string
    text: string
  }
}> = ({ page, tweetButton, content }) => {
  return (
    <Layout
      title={page.title}
      description={page.description}
      cover={page.cover}
    >
      <header className="">
        {page.date && page.type !== "page" && (
          <div className="mb-2">
            <span className="text-zinc-400 text-lg">{page.date}</span>
          </div>
        )}
        <h2 className="page-title">{page.title}</h2>
      </header>

      {page.cover && (
        <div className="my-8">
          <img alt="cover image" src={page.cover} className="rounded-xl" />
        </div>
      )}
      <MarkdocContent content={content} />
      {tweetButton && (
        <div className="mt-10">
          <TweetButton text={tweetButton.text} url={tweetButton.url} />
        </div>
      )}
    </Layout>
  )
}
