import Markdoc, {
  Config,
  ValidateError,
  Schema,
  RenderableTreeNode,
} from "@markdoc/markdoc"
import {
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPathsResult,
} from "next"
import superjson from "superjson"
import { PageLayout } from "~/components/PageLayout"
import { site } from "~/config"
import dayjs from "dayjs"
import { contentbase, PageType } from "~/lib/contentbase"
import Prism from "prismjs"
import loadLanguages from "prismjs/components/index"

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

  const ast = Markdoc.parse(page.content)
  ast.attributes.class = "prose text-lg"

  const linkTag: Schema = {
    render: "UniLink",
    attributes: {
      href: {
        type: String,
      },
    },
  }
  const fenceTag: Schema = {
    attributes: {
      language: {
        type: String,
      },
      content: {
        type: String,
      },
    },
    transform(node) {
      const language = node.attributes.language || "markup"
      const grammer = Prism.languages[language] || Prism.languages.markup
      const code = Prism.highlight(node.attributes.content, grammer, language)
      return new Markdoc.Tag(
        "CodeBlock",
        {
          code,
          language,
        },
        []
      )
    },
  }
  const calloutTag: Schema = {
    render: "Callout",
  }

  const tableTag: Schema = {
    render: "Table",
  }

  const config: Config = {
    nodes: {
      link: linkTag,
      fence: fenceTag,
      table: tableTag,
    },
    tags: {
      span: {
        render: "span",
      },
      div: {
        render: "div",
      },
      link: linkTag,
      callout: calloutTag,
    },
    variables: {
      site,
    },
    functions: {
      join: {
        transform(parameters, config) {
          return parameters[0].join(parameters[1] || "")
        },
      },
    },
  }
  const errors = Markdoc.validate(ast, config)

  if (errors.length > 0) {
    return {
      props: {
        _: superjson.stringify({
          errors,
        }),
      },
    }
  }

  const content = Markdoc.transform(ast, config)

  return {
    props: {
      _: superjson.stringify({
        content: content,
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
