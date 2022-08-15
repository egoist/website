import clsx from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { Layout } from "~/components/Layout"
import { UniLink } from "~/components/UniLink"

type Item = {
  id: number
  title: string
  points: number
  user: string
  time: number
  time_ago: string
  comments_count: number
  type: "ask" | "link"
  url: string
  domain: string
}

type Data = {
  type: "new" | "top" | "show"
  items: Item[]
}

type Props = { data: Data }

const HACKERNEWS_URL = "https://news.ycombinator.com"

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const segments = (params!.segments || []) as string[]

  const type =
    segments[0] === "show" ? "show" : segments[0] === "new" ? "new" : "top"

  const getItems = async (page: number) => {
    const items: Item[] = await fetch(
      `https://api.hnpwa.com/v0/${
        type === "new" ? "newest" : type === "top" ? "news" : type
      }/${page}.json`
    )
      .then((res) => res.json())
      .then((items) => items.filter((item: any) => item.type !== "job"))
    return items
  }

  const items = await Promise.all([getItems(1), getItems(2)]).then(
    ([items1, items2]) => [...items1, ...items2]
  )

  return {
    props: {
      data: {
        type,
        items,
      },
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          segments: [],
        },
      },
      {
        params: {
          segments: ["new"],
        },
      },
      {
        params: {
          segments: ["show"],
        },
      },
    ],
    fallback: false,
  }
}

const Item: React.FC<{ item: Item }> = ({ item }) => {
  const isExternal = /^https?\:/.test(item.url)
  const href = isExternal ? item.url : `${HACKERNEWS_URL}/${item.url}`

  return (
    <div className="p-3 rounded-lg hover:bg-zinc-50">
      <h3>
        <UniLink
          href={href}
          className="text-lg text-zinc-600 hover:text-indigo-500 hover:underline visited:text-zinc-300"
        >
          {item.title}
        </UniLink>
      </h3>
      <div className="text-xs text-zinc-400 mt-1 flex items-center space-x-4">
        <span className="inline-flex items-center space-x-1">
          <span className="i-mdi:triangle text-zinc-300"></span>
          <span>{item.points}</span>
        </span>
        <span>
          by{" "}
          <UniLink
            href={`https://news.ycombinator.com/user?id=${item.user}`}
            className="hover:underline"
          >
            {item.user}
          </UniLink>
        </span>
        <span>{item.time_ago}</span>
      </div>
    </div>
  )
}

export default function Page({ data }: Props) {
  const tabs = [
    { type: "top", label: "Top" },
    { type: "new", label: "New" },
    { type: "show", label: "Show" },
  ]
  const router = useRouter()
  return (
    <Layout title="Hacker News">
      <div className="flex items-center text-xs mb-5 space-x-1 bg-zinc-200/50 rounded-lg p-3 sticky top-5 backdrop-blur-lg">
        {tabs.map((tab) => {
          const href = `/news${tab.type === "top" ? "" : `/${tab.type}`}`
          const active = href === router.asPath
          return (
            <UniLink
              href={href}
              key={tab.type}
              className={clsx(
                `h-6 flex px-3 items-center rounded-lg font-bold transition-colors`,
                active
                  ? `shadow bg-white`
                  : `hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600`
              )}
            >
              {tab.label}
            </UniLink>
          )
        })}
      </div>
      <div className="space-y-2 -mx-3">
        {data.items.map((item) => {
          return <Item key={item.id} item={item} />
        })}
      </div>
    </Layout>
  )
}
