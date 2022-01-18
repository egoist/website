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
    'data-theme': 'light',
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
      <h1 class="page-title">
        <span>{{ page.title }}</span>
      </h1>
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
      <div
        v-if="page.next || page.prev"
        class="flex items-center justify-between mt-14 my-8"
      >
        <saber-link
          v-if="page.next"
          :to="page.next.permalink"
          class="group relative inline-flex items-center border px-2 py-1 rounded-lg hover:bg-zinc-50"
        >
          <span
            class="group-hover:block hidden absolute text-xs -top-6 left-4 text-zinc-400 italic"
            >Newer Post</span
          >
          <svg
            class="w-4 h-4 text-zinc-500 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path></svg
          >{{ page.next.title }}</saber-link
        >
        <span v-else></span>
        <saber-link
          v-if="page.prev"
          :to="page.prev.permalink"
          class="group relative inline-flex items-center border px-2 py-1 rounded-lg hover:bg-zinc-50"
        >
          <span
            class="group-hover:block hidden absolute text-xs -top-6 right-4 text-zinc-400 italic"
            >Older Post</span
          >
          {{ page.prev.title
          }}<svg
            class="w-4 h-4 text-zinc-500 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path></svg
        ></saber-link>
        <span v-else></span>
      </div>
      <section
        v-if="isPost"
        class="border-t border-border border-dashed mt-20 pt-5"
        ref="commentsSection"
      ></section>
    </main>
  </DefaultLayout>
</template>
