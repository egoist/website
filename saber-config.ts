import fs from 'fs'
import { defineConfig } from 'saber'
import shiki from 'saber-plugin-shiki'
import { Feed } from 'feed'
import dayjs from 'dayjs'
import { getSponsors } from './scripts/get-sponsors'
import { getVideos } from './scripts/get-videos'

const sortPages = (a: any, b: any) => {
  return a.createdAt > b.createdAt ? -1 : 1
}

const setPrevAndNextPost = (posts: any[]) => {
  const selectFields = (post: any) => {
    return {
      title: post.title,
      permalink: post.permalink,
    }
  }
  for (const [index, post] of posts.entries()) {
    if (index > 0) {
      post.next = selectFields(posts[index - 1])
    }
    if (index < posts.length - 1) {
      post.prev = selectFields(posts[index + 1])
    }
  }
}

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
    shiki({
      theme: 'github-light',
    }),
    {
      name: 'custom',
      async createPages({ api }) {
        const isZH = (page: any) => page.slug.startsWith('zh/')
        const posts = api.pages
          .find()
          .filter((page) => page.type === 'post' && page.published !== false)
          .sort(sortPages)
        const groupedSponsors = await getSponsors()
        const videos = await getVideos()

        const enPosts = posts.filter((post) => !isZH(post))
        const zhPosts = posts.filter((post) => isZH(post))

        setPrevAndNextPost(enPosts)
        setPrevAndNextPost(zhPosts)

        for (const page of api.pages.find()) {
          if (page.permalink === '/') {
            page.posts = enPosts.map((post) => ({
              title: post.title,
              permalink: post.permalink,
              createdAt: post.createdAt,
              date: dayjs(post.createdAt).format('YYYY-MM-DD'),
            }))
            page.videos = videos
          } else if (page.permalink === '/zh') {
            page.posts = zhPosts.map((post) => ({
              title: post.title,
              permalink: post.permalink,
              createdAt: post.createdAt,
              date: dayjs(post.createdAt).format('YYYY-MM-DD'),
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
          .sort(sortPages)
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
          title: 'EGOIST 中文博客',
          copyright: '© EGOIST',
          author: {
            name: 'EGOIST',
            email: '0x142857@gmail.com',
          },
          generator: 'Saber',
        })
        for (const post of posts) {
          const permalink = url + post.permalink
          if (isZH(post)) {
            zh_feed.addItem({
              title: post.title,
              link: permalink,
              date: post.createdAt,
              content: permalink,
            })
          } else {
            en_feed.addItem({
              title: post.title,
              link: permalink,
              date: post.createdAt,
              content: permalink,
            })
          }
        }
        await fs.promises.writeFile('./out/atom.xml', en_feed.atom1())
        await fs.promises.writeFile('./out/zh/atom.xml', zh_feed.atom1())
      },
    },
  ],
})
