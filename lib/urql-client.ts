import { useMemo } from "react"
import {
  Client,
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "urql"

export const createUrqlClient = () => {
  const ssr = ssrExchange({
    isClient: process.browser,
  })
  return createClient({
    url: `/api/graphql`,
    fetchOptions: {
      credentials: "same-origin",
    },
    requestPolicy: "cache-and-network",
    exchanges: [dedupExchange, cacheExchange, ssr, fetchExchange],
  })
}

let urqlClient: Client | undefined

const initializeUrqlClient = () => {
  const client = urqlClient ?? createUrqlClient()
  if (!process.browser) {
    return client
  }
  if (!urqlClient) {
    urqlClient = client
  }
  return client
}

export const useUrqlClient = () => {
  return useMemo(() => initializeUrqlClient(), [])
}
