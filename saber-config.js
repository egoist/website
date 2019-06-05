module.exports = {
  build: {
    extractCSS: process.env.NODE_ENV === 'production'
  },
  plugins: [
    {
      resolve: 'saber-plugin-prismjs'
    },
    {
      resolve: 'saber-plugin-google-analytics',
      options: {
        trackId: 'UA-54857209-17'
      }
    }
  ]
}