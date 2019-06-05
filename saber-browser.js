import Vue from 'vue'
import 'typeface-frank-ruhl-libre/index.css'
import 'typeface-open-sans/index.css'
import 'tippy.js/themes/light.css'
import 'prismjs/themes/prism.css'
import './css/global.css'
import './css/markdown.css'

export default ({ rootOptions }) => {
  const store = Vue.observable({
    homeSection: null
  })

  Vue.mixin({
    beforeCreate() {
      this.$store = store
    }
  })
}