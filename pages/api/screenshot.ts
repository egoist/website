import { NextApiHandler } from "next"
import { Browserku } from "browserku"

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end()

  const browserku = new Browserku(process.env.BROWSERKU_APIKEY, fetch)

  const { result } = await browserku.scrape({
    url: req.body.url as string,
    screenshot: true,
  })

  res.json({
    screenshot: result.screenshot.url,
  })
}

export default handler
