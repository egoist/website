import { IncomingMessage, ServerResponse } from "http"
import { createParamDecorator } from "type-graphql"
import { Viewer } from "./auth"

export type Context = {
  req: IncomingMessage
  res: ServerResponse
  user?: Viewer | null
}

export function GqlContext() {
  return createParamDecorator<Context>(({ context }) => context)
}
