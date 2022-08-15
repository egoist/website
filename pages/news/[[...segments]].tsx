import clsx from "clsx"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import { autoUpdate, useFloating } from "@floating-ui/react-dom"
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

const Screenshot: React.FC<{ url: string }> = ({ url }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  useEffect(() => {
    fetch(`/api/screenshot`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((res) => {
        setImageUrl(res.screenshot)
      })
  }, [])
  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          className="max-w-[400px] "
          width="1280"
          height="760"
          alt="screenshot"
        />
      ) : (
        <div className="bg-zinc-200 animate-pulse w-[400px] aspect-[16/9]"></div>
      )}
    </div>
  )
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])
  return matches
}

const Item: React.FC<{ item: Item; isMobile: boolean }> = ({
  item,
  isMobile,
}) => {
  const { x, y, reference, floating, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
  })
  const isExternal = /^https?\:/.test(item.url)
  const [showScreenshot, setShowScreenshot] = useState(false)
  const href = isExternal ? item.url : `${HACKERNEWS_URL}/${item.url}`

  return (
    <div className="p-3 rounded-lg hover:bg-zinc-50">
      <h3>
        <UniLink
          ref={reference}
          href={href}
          className="text-lg text-zinc-600 hover:text-indigo-500 hover:underline"
          onMouseEnter={() => setShowScreenshot(true)}
          onMouseLeave={() => setShowScreenshot(false)}
        >
          {item.title}
        </UniLink>
      </h3>
      {showScreenshot && !isMobile && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="shadow-lg ring-1 ring-zinc-200 rounded-lg overflow-hidden bg-white"
        >
          <Screenshot url={href} />
        </div>
      )}
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
  const isMobile = useMediaQuery("(max-width: 768px)")
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
          return <Item key={item.id} item={item} isMobile={isMobile} />
        })}
      </div>
    </Layout>
  )
}
