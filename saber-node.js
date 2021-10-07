const dayjs = require('dayjs')
const fetch = require('node-fetch')
const _ = require('lodash')
const StoryblokClient = require('storyblok-js-client')

// init with access token
/** @type {StoryblokClient.default} */
const sb = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

/**
 * @param {Date} date
 * @return {string}
 */
const formateDate = (date) => {
  return dayjs(date).format('MMM DD')
}

const groupPostsByYear = (posts) => {
  const result = {}
  for (const post of posts) {
    const date = new Date(post.createdAt)
    const year = date.getFullYear()
    if (!result[year]) {
      result[year] = []
    }
    result[year].push(post)
  }
  return result
}

const fetchSponsors = async () => {
  const data = await fetch(`https://api.github.com/graphql`, {
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
    method: 'POST',
    body: JSON.stringify({
      query: `query { 
        viewer { 
          sponsorshipsAsMaintainer (first: 100) {
            nodes {
              tier {
                monthlyPriceInDollars
              }
              sponsorEntity {
                ... on User {
                  login
                  avatarUrl
                  bio
                }
                ... on Organization {
                  login
                  avatarUrl
                  description
                }
              }
            }
          }
        }
      }`,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(
      (res) => {
        if (res.errors) {
          throw new Error(res.errors[0].message)
        }
        return res.data.viewer.sponsorshipsAsMaintainer.nodes
      },
      (err) => {
        console.error(err)
        process.exit(1)
      }
    )
  return data
}

exports.onCreatePages = async function () {
  // Fetching posts from Storyblok
  const stories = await sb
    .get('cdn/stories', {
      starts_with: 'posts/',
      per_page: 100,
      cv: `${Date.now()}`,
    })
    .then((res) => res.data.stories)
  for (const story of stories) {
    this.pages.createPage({
      title: story.name,
      createdAt: new Date(story.first_published_at),
      updatedAt: new Date(story.published_at),
      formatedDate: dayjs(story.first_published_at).format('MMM DD, YYYY'),
      slug: story.slug,
      layout: 'post',
      type: 'post',
      permalink: `/${story.slug}`,
      contentType: 'markdown',
      content: story.content.content,
      // TODO: fix this in Saber, it should be optional
      excerpt: '',
      internal: {
        id: story.uuid,
      },
    })
  }

  const posts = [...this.pages.values()]
    .filter((page) => page.type === 'post')
    .sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1
    })
  const firstFivePosts = posts.slice(0, 5).map((post) => ({
    title: post.title,
    date: formateDate(post.createdAt),
    permalink: post.permalink,
  }))

  let homePage
  let blogPage
  let thanksPage
  for (const page of this.pages.values()) {
    page.formatedDate = dayjs(page.createdAt).format('MMM DD, YYYY')
    if (page.permalink === '/') {
      homePage = page
    } else if (page.permalink === '/blog') {
      blogPage = page
    } else if (page.permalink === '/thanks') {
      thanksPage = page
    }
  }

  if (!homePage) {
    homePage = {
      type: 'page',
      internal: {
        id: 'internal__egoist__home',
      },
      permalink: '/',
    }
  }
  homePage.layout = 'home'
  homePage.posts = firstFivePosts
  homePage.totalPostsCount = posts.length

  const sponsors = process.env.GITHUB_TOKEN ? await fetchSponsors() : []
  let groupedSponsors = _.groupBy(sponsors, 'tier.monthlyPriceInDollars')

  groupedSponsors = Object.keys(groupedSponsors)
    .map((v) => Number(v))
    .sort((a, b) => (a > b ? -1 : 1))
    .map((key) => {
      return {
        tier: key,
        sponsors: groupedSponsors[key],
      }
    }, {})

  this.pages.createPage(homePage)

  if (thanksPage) {
    thanksPage.groupedSponsors = groupedSponsors
  }

  // TODO: create a /blog page to show all posts by year
  // if (!blogPage) {
  //   blogPage = {
  //     type: 'page',
  //     internal: {
  //       id: 'internal__egoist_blog'
  //     },
  //     permalink: '/blog'
  //   }
  // }
  // blogPage.layout = 'blog'
  // blogPage.posts = groupPostsByYear(posts)
  // this.pages.createPage(blogPage)
}
