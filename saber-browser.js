import Vue from 'vue'
import 'tippy.js/themes/light.css'
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

  const store = Vue.observable({
    homeSection: null
  })

  Vue.mixin({
    beforeCreate() {
      this.$store = store
    }
  })
}