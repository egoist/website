const dayjs = require('dayjs')

/**
 * @param {Date} date
 * @return {string}
 */
const formateDate = date => {
  return dayjs(date).format('MMM DD')
}

const groupPostsByYear = posts => {
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

exports.onCreatePages = async function() {
  const posts = [...this.pages.values()]
    .filter(page => page.type === 'post')
    .sort((a, b) => {
      return a.createdAt - b.createdAt
    })
  const firstFivePosts = posts.slice(0, 5).map(post => ({
    title: post.title,
    date: formateDate(post.createdAt),
    permalink: post.permalink
  }))

  let homePage
  let blogPage
  for (const page of this.pages.values()) {
    page.formatedDate = dayjs(page.createdAt).format('MMM DD, YYYY')
    if (page.permalink === '/') {
      homePage = page
    } else if (page.permalink === '/blog') {
      blogPage = page
    }
  }

  if (!homePage) {
    homePage = {
      type: 'page',
      internal: {
        id: 'internal__egoist__home'
      },
      permalink: '/'
    }
  }
  homePage.layout = 'home'
  homePage.posts = firstFivePosts
  homePage.totalPostsCount = posts.length
  this.pages.createPage(homePage)

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
