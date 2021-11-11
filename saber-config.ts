import { defineConfig } from 'saber'
import shiki from 'saber-plugin-shiki'
import { getSponsors } from './scripts/get-sponsors'

export default defineConfig({
  siteConfig: {
    title: 'EGOIST',
    description: `The coolest anime fan`,
    twitter: '_egoistlily',
  },
  permalinks(page) {
    if (page.type === 'post') {
      return `/${page.slug}`
    }
  },
  plugins: [
    shiki(),
    {
      name: 'custom',
      async createPages({ api }) {
        const posts = api.pages
          .find()
          .filter((page) => page.type === 'post' && page.published !== false)
        for (const page of api.pages.find()) {
          if (page.permalink === '/') {
            page.posts = posts.map((post) => ({
              title: post.title,
              permalink: post.permalink,
              createdAt: post.createdAt,
            }))
          } else if (page.permalink === '/thanks') {
            page.groupedSponsors = await getSponsors()
          }
        }
      },
    },
  ],
})
