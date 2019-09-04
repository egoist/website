module.exports = {
  siteConfig: {
    title: 'EGOIST'
  },
  permalinks: {
    page: '/:slug'
  },
  plugins: [
    {
      resolve: 'saber-plugin-google-analytics',
      options: {
        trackId: 'UA-54857209-17'
      }
    },
    {
      resolve: 'saber-plugin-image'
    }
  ]
}