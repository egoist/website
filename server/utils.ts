import { ServerResponse } from "http"

export const setCacheHeader = (res: ServerResponse) => {
  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate")
}
