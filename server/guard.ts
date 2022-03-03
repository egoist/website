import { ApolloError } from "apollo-server-core"
import { Context } from "./decorators"
import { Viewer } from "./auth"

export const getGuard = <TRequireAuth extends boolean>(
  ctx: Context,
  { requireAuth }: { requireAuth?: TRequireAuth } = {}
) => {
  if (requireAuth && !ctx.user) {
    throw new ApolloError("login required")
  }

  /** Allow to edit pages or posts */
  const hasEditorPermission = () => {
    return ctx.user && ["admin", "editor"].includes(ctx.user.role)
  }

  return {
    user: ctx.user as TRequireAuth extends true
      ? Viewer
      : Viewer | null | undefined,
    hasEditorPermission,
  }
}
