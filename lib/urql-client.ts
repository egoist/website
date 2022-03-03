import { withUrqlClient } from "next-urql"
import React from "react"

export const withUrql = (
  Component: React.FC,
  { ssr }: { ssr?: boolean } = {}
) => {
  return withUrqlClient(
    () => {
      return {
        url:
          process.env.NEXT_PUBLIC_GRAPHQL_API ||
          "http://localhost:3000/api/graphql",
        requestPolicy: "cache-and-network",
      }
    },
    { ssr }
  )(Component)
}
