import './css/global.css'

export default ({ rootOptions }) => {
  rootOptions.head = function () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Open+Sans'
        }
      ]
    }
  }
}