import "reflect-metadata"
import { ServerResponse, IncomingMessage } from "http"
import { DocumentNode, execute, ExecutionResult } from "graphql"
import { buildSchema } from "type-graphql"
import { singletonAsync } from "./singleton"
import type { Context } from "./decorators"
import { getAuthUser } from "./auth"

export const schema = singletonAsync(
  "graphq-schema",
  async () => {
    const resolvers: any = []
    // @ts-expect-error
    const r = require.context("./resolvers", false, /\.resolver\.ts$/)

    for (const key of r.keys()) {
      const mod = await r(key)
      resolvers.push(mod.default)
    }

    const schema = await buildSchema({
      resolvers,
    })

    return schema
  },
  // Always rebuild schema on each request in development
  process.env.NODE_ENV === "production"
)

export const getGraphqlContext = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const user = await getAuthUser(req)
  return {
    req,
    res,
    user,
  }
}

export const executeSchema = async <TData, TVariables>(
  context: Context,
  doc: DocumentNode,
  variables?: TVariables
) => {
  await schema.wait
  return execute(schema.value, doc, null, context, variables) as Promise<
    ExecutionResult<TData>
  >
}
