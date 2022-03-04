import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql"
import { nanoid } from "nanoid"
import { type Context, GqlContext } from "../decorators"
import { getGuard } from "../guard"
import { prisma } from "../prisma"
import {
  CreatePageArgs,
  GetPageArgs,
  GetPagesArgs,
  Page,
  UpdatePageArgs,
} from "./page.types"
import { ApolloError } from "apollo-server-core"
import MarkdownIt from "markdown-it"
import { isUUID } from "~/lib/is"
import dayjs from "dayjs"
import { formatDate } from "~/lib/date"
import { DateFormattedArgs } from "./shared.types"
import { renderMarkdown } from "~/lib/markdown"

@Resolver((of) => Page)
export default class PostResolver {
  @Query((returns) => [Page])
  async getPages(@GqlContext() ctx: Context, @Args() args: GetPagesArgs) {
    const guard = getGuard(ctx)

    const includeDrafts = args.includeDrafts && guard.hasEditorPermission()

    return prisma.page.findMany({
      where: {
        published: includeDrafts ? undefined : true,
        type: args.type,
      },
      orderBy: {
        publishedAt: args.order,
      },
    })
  }

  @Query((returns) => Page)
  async getPage(@GqlContext() ctx: Context, @Args() args: GetPageArgs) {
    const guard = getGuard(ctx)
    const where = isUUID(args.slugOrId)
      ? { id: args.slugOrId }
      : { slug: args.slugOrId }
    const page = await prisma.page.findUnique({
      where,
    })
    if (!page) {
      throw new ApolloError("Page not found")
    }
    if (!page.published && !guard.hasEditorPermission()) {
      throw new ApolloError("not authorized")
    }
    return page
  }

  @Mutation((returns) => Page)
  async createPage(@GqlContext() ctx: Context, @Args() args: CreatePageArgs) {
    const guard = getGuard(ctx, { requireAuth: true })

    if (!guard.hasEditorPermission()) {
      throw new ApolloError("not authorized")
    }

    const slug = args.slug || nanoid()
    const page = await prisma.page.create({
      data: {
        type: args.type,
        title: args.title,
        content: args.content,
        slug,
        published: args.published,
        publishedAt: args.publishedAt ? new Date(args.publishedAt) : new Date(),
        user: {
          connect: {
            id: guard.user.id,
          },
        },
      },
    })

    return page
  }

  @Mutation((returns) => Page)
  async updatePage(@GqlContext() ctx: Context, @Args() args: UpdatePageArgs) {
    const guard = getGuard(ctx, { requireAuth: true })

    const page = await prisma.page.findUnique({
      where: {
        id: args.id,
      },
    })

    if (!page) {
      throw new ApolloError("Post not found")
    }

    if (!guard.hasEditorPermission()) {
      throw new ApolloError("not authorized")
    }

    const updated = await prisma.page.update({
      where: {
        id: page.id,
      },
      data: {
        title: args.title,
        content: args.content,
        slug: args.slug,
        published: args.published,
        publishedAt: args.publishedAt && new Date(args.publishedAt),
      },
    })

    return updated
  }

  @FieldResolver((returns) => String)
  contentHTML(@Root() page: Page) {
    return renderMarkdown(page.content)
  }

  @FieldResolver((returns) => String)
  dateFormatted(@Root() page: Page, @Args() args: DateFormattedArgs) {
    if (!(args.field in page)) {
      throw new ApolloError(`${args.field} not found`)
    }
    // @ts-expect-error
    const str = page[args.field]
    return formatDate(str, args.format)
  }
}
