import { initUrqlClient, withUrqlClient } from "next-urql"
import React from "react"
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from "urql"

const GRAPHQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:3000/api/graphql"

export const withUrql = (
  Component: React.FC<any>,
  { ssr }: { ssr?: boolean } = {}
) => {
  return withUrqlClient(
    () => {
      return {
        url: GRAPHQL_URL,
        requestPolicy: "cache-and-network",
      }
    },
    {
      ssr,
    }
  )(Component)
}

export const createUrqlClient = () => {
  const ssrCache = ssrExchange({ isClient: false })
  const client = initUrqlClient(
    {
      url: GRAPHQL_URL,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  )

  return { client: client!, ssrCache }
}
