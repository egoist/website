const dayjs = require('dayjs')
const fetch = require('node-fetch')
const _ = require('lodash')

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
              sponsor {
                login
                name
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
  const posts = [...this.pages.values()]
    .filter((page) => page.type === 'post')
    .sort((a, b) => {
      return a.createdAt - b.createdAt
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

  const sponsors = await fetchSponsors()
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
