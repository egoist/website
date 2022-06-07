import { Layout } from "./Layout"
import { TweetButton } from "./TweetButton"

export const PageLayout: React.FC<{
  page: {
    type: string
    title: string
    description?: string
    createdAt?: string
    contentHTML: string
    cover?: string
  }
  tweetButton?: {
    url: string
    text: string
  }
}> = ({ page, tweetButton }) => {
  return (
    <Layout
      title={page.title}
      description={page.description}
      cover={page.cover}
    >
      <h2 className="page-title">{page.title}</h2>
      {page.createdAt && (
        <div>
          <span className="italic text-zinc-400">{page.createdAt}</span>
        </div>
      )}
      {page.cover && (
        <div className="my-8">
          <img alt="cover image" src={page.cover} className="rounded-xl" />
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
    </Layout>
  )
}
