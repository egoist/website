import { computed } from 'vue'
import { useRoute } from 'saber/app'

export const isLang = (lang: 'zh') => {
  const route = useRoute()
  return computed(() => {
    const path = route.path
    return path === `/${lang}` || path.startsWith(`/${lang}/`)
  })
}
