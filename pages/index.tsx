import dayjs from "dayjs"
import { GetStaticPropsResult } from "next"
import { Layout } from "~/components/Layout"
import { UniLink } from "~/components/UniLink"
import { contentbase, PageType } from "~/lib/contentbase"

const transformPage = (page: PageType) => {
  return {
    ...page,
    year: dayjs(page.createdAt).format("YYYY"),
    date: dayjs(page.createdAt).format("MM/DD"),
    href: `/${page.slug}`,
    content: null,
  }
}

type TransformedPage = ReturnType<typeof transformPage>

type Props = {
  groupedPosts: {
    [year in string]: TransformedPage[]
  }
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const pages = await contentbase()
    .fetchPages()
    .then((pages) => pages.map(transformPage))
  const posts = pages.filter((page) => page.type !== "page")
  return {
    props: {
      groupedPosts: posts.reduce<Props["groupedPosts"]>((result, post) => {
        result[post.year] = result[post.year] || []
        result[post.year].push(post)
        return {
          ...result,
        }
      }, {}),
    },
  }
}

function Home({ groupedPosts }: Props) {
  return (
    <Layout>
      <div className="space-y-2">
        <div className="space-y-8">
          {Object.keys(groupedPosts)
            .sort()
            .reverse()
            .map((year) => {
              const posts = groupedPosts[year]
              return (
                <div key={year} className="">
                  <div className="font-medium text-xl text-zinc-300 mb-3">
                    {year}
                  </div>
                  {posts.map((post) => {
                    return (
                      <div key={post.slug} className="group text-xl flex">
                        <span className="mr-2 md:mr-4 text-zinc-300 group-hover:text-zinc-400 flex-shrink-0">
                          {post.date}
                        </span>
                        <UniLink
                          href={post.href}
                          className="hover:text-primary font-medium"
                        >
                          {post.title}
                        </UniLink>
                      </div>
                    )
                  })}
                </div>
              )
            })}
        </div>
      </div>
    </Layout>
  )
}

export default Home
