module.exports = {
  css: {
    extract: process.env.NODE_ENV === 'production'
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