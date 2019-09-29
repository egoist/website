import 'modern-normalize/modern-normalize.css'
import './css/global.css'

export default ({ setHead }) => {
  setHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Rubik&display=swap'
      }
    ]
  })
}