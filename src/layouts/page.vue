<script setup lang="ts">
import dayjs from 'dayjs'
import { siteConfig } from 'saber/config'
import { onMounted, ref, computed } from 'vue'
import TweetButton from '$src/components/TweetButton.vue'
import DefaultLayout from './default.vue'
import { isLang } from '$src/hooks/isLang'

const { page, Component } = defineProps({
  page: null,
  Component: null,
})

const isPost = page.type === 'post'

const commentsSection = ref<HTMLDivElement | null>(null)

const isZH = isLang('zh')

onMounted(() => {
  if (!commentsSection.value) return
  const attrs = {
    'data-repo': 'egoist/website',
    'data-repo-id': 'MDEwOlJlcG9zaXRvcnkxNTQ0OTcyNDQ=',
    // 'data-category': 'Announcements',
    'data-category-id': 'DIC_kwDOCTVw3M4CAX6w',
    'data-mapping': 'pathname',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-theme': 'dark',
    'data-lang': isZH.value ? 'zh-CN' : 'en',
    crossorigin: 'anonymous',
  }
  const script = document.createElement('script')
  script.src = `https://giscus.app/client.js`
  script.async = true
  for (const key of Object.keys(attrs)) {
    script.setAttribute(key, attrs[key])
  }
  commentsSection.value.append(script)
})

const tweetText = computed(
  () => `Check out "${page.title}" by @${siteConfig.twitter}`
)
</script>

<template>
  <DefaultLayout
    :title="`${page.title} - ${siteConfig.title}`"
    :description="page.excerpt"
  >
    <main>
      <h1 class="page-title">{{ page.title }}</h1>
      <div v-if="isPost" class="text-gray-500 text-sm italic">
        {{ dayjs(page.createdAt).format('MMM DD, YYYY') }}
      </div>
      <div class="mt-5">
        <div
          v-if="page.translatedFrom"
          class="mb-10 bg-yellow-300 bg-opacity-20 rounded-lg p-5"
        >
          本文译自
          <a
            target="_blank"
            rel="nofollow noopener"
            class="underline"
            :href="page.translatedFrom"
            >{{ page.translatedFrom }}</a
          >, 所有版权归原作者所有。
        </div>
        <component :is="Component" />
        <div v-if="isPost" class="mt-10">
          <TweetButton
            :url="`${siteConfig.url}${page.permalink}`"
            :text="tweetText"
          />
        </div>
      </div>
      <section
        v-if="isPost"
        class="border-t border-border border-dashed mt-20 pt-5"
        ref="commentsSection"
      ></section>
    </main>
  </DefaultLayout>
</template>
