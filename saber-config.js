module.exports = {
  siteConfig: {
    title: 'EGOIST'
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