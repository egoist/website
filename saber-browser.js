import Vue from 'vue'
import 'tippy.js/themes/light.css'
import 'prismjs/themes/prism.css'
import './css/global.css'
import './css/markdown.css'

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

  const store = Vue.observable({
    homeSection: null
  })

  Vue.mixin({
    beforeCreate() {
      this.$store = store
    }
  })
}