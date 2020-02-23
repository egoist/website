module.exports = {
  siteConfig: {
    title: 'EGOIST'
  },
  permalinks: {
    page: '/:slug',
    post: '/:slug'
  },
  plugins: [
    {
      resolve: 'saber-plugin-google-analytics',
      options: {
        trackId: 'UA-54857209-17'
      }
    }
  ]
}