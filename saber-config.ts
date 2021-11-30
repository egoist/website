import fs from 'fs'
import { defineConfig } from 'saber'
import shiki from 'saber-plugin-shiki'
import { Feed } from 'feed'
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
          .sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1
          })
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
          } else if (page.permalink === '/zh') {
            page.posts = posts
              .filter((post) => isZH(post))
              .map((post) => ({
                title: post.title,
                permalink: post.permalink,
                createdAt: post.createdAt,
              }))
          } else if (
            page.permalink === '/thanks' ||
            page.permalink === '/zh/thanks'
          ) {
            page.groupedSponsors = groupedSponsors
          }
        }
      },
      async buildEnd({ api }) {
        const isZH = (page: any) => page.slug.startsWith('zh/')
        const posts = api.pages
          .find()
          .filter((page) => page.type === 'post' && page.published !== false)
          .sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : 1
          })
        const url = 'https://egoist.sh'
        const en_feed = new Feed({
          id: url,
          title: 'EGOIST',
          copyright: '© EGOIST',
          author: {
            name: 'EGOIST',
            email: '0x142857@gmail.com',
          },
          generator: 'Saber',
        })
        const zh_feed = new Feed({
          id: url + '/zh',
          title: 'EGOIST 张文博客',
          copyright: '© EGOIST',
          author: {
            name: 'EGOIST',
            email: '0x142857@gmail.com',
          },
          generator: 'Saber',
        })
        for (const post of posts) {
          if (isZH(post)) {
            zh_feed.addItem({
              title: post.title,
              link: url + post.permalink,
              date: post.createdAt,
            })
          } else {
            en_feed.addItem({
              title: post.title,
              link: url + post.permalink,
              date: post.createdAt,
            })
          }
        }
        await fs.promises.writeFile('./out/atom.xml', en_feed.atom1())
        await fs.promises.writeFile('./out/zh/atom.xml', zh_feed.atom1())
      },
    },
  ],
})
