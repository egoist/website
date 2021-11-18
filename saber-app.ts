import 'saber-code-css/default.css'
import '$src/css/tailwind.css'
import '$src/css/global.css'
import '$src/css/page.css'
import { computed } from 'vue'
import { Bootstrap, useHead, useRoute } from 'saber/app'

export const bootstrap: Bootstrap = ({ useRootSetup }) => {
  useRootSetup(() => {
    const route = useRoute()
    useHead({
      htmlAttrs: {
        lang: computed(() =>
          route.path === '/zh' || route.path.startsWith('/zh/')
            ? 'zh-CN'
            : 'en-US'
        ),
      },
    })
  })
}
