import {
  ValidateError,
  RenderableTreeNode,
} from "@markdoc/markdoc"
import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPathsResult,
} from "next"
import superjson from "superjson"
import { PageLayout } from "~/components/PageLayout"
import dayjs from "dayjs"
import { contentbase, PageType } from "~/lib/contentbase"
import loadLanguages from "prismjs/components/index"
import { renderMarkdown } from "~/lib/markdown"

const transformPage = (page: PageType) => {
  return {
    title: page.title,
    slug: page.slug,
    date: dayjs(page.createdAt).format("MMM DD, YYYY"),
    type: page.type || "post",
    description: page.description,
  }
}

type TransformedPage = ReturnType<typeof transformPage>

type Data = {
  content?: RenderableTreeNode
  page?: TransformedPage
  errors?: ValidateError[]
}

type Props = {
  _: string
}

export async function getStaticProps(
  ctx: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  loadLanguages()

  const page = await contentbase().fetchPage(ctx.params?.page as string)
  if (!page) {
    return {
      notFound: true,
    }
  }

  const { errors, node } = renderMarkdown(page.content)

  if (errors && errors.length > 0) {
    return {
      props: {
        _: superjson.stringify({
          errors,
        }),
      },
    }
  }

  return {
    props: {
      _: superjson.stringify({
        content: node,
        page: transformPage(page),
      }),
    },
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const pages = await contentbase().fetchPages()
  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: page.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default function Page({ _ }: Props) {
  const { errors, content, page } = superjson.parse(_) as Data
  if (errors) {
    return (
      <div>
        {errors.map((error, index) => {
          return <div key={index}>{error.error.message}</div>
        })}
      </div>
    )
  }
  return <PageLayout content={content!} page={page!}></PageLayout>
}
