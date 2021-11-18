import { defineConfig } from 'saber'
import shiki from 'saber-plugin-shiki'
import { getSponsors } from './scripts/get-sponsors'

export default defineConfig({
  siteConfig: {
    title: 'EGOIST',
    description: `The coolest anime fan`,
    twitter: '_egoistlily',
    url: 'https://egoist.sh',
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
        const isZH = (page: any) => page.slug.startsWith('zh/')
        const posts = api.pages
          .find()
          .filter((page) => page.type === 'post' && page.published !== false)
        const groupedSponsors = await getSponsors()
        for (const page of api.pages.find()) {
          if (page.permalink === '/') {
            page.posts = posts
              .filter((post) => !isZH(post))
              .map((post) => ({
                title: post.title,
                permalink: post.permalink,
                createdAt: post.createdAt,
              }))
              .sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : 1
              })
          } else if (page.permalink === '/zh') {
            page.posts = posts
              .filter((post) => isZH(post))
              .map((post) => ({
                title: post.title,
                permalink: post.permalink,
                createdAt: post.createdAt,
              }))
              .sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : 1
              })
          } else if (
            page.permalink === '/thanks' ||
            page.permalink === '/zh/thanks'
          ) {
            page.groupedSponsors = groupedSponsors
          }
        }
      },
    },
  ],
})
