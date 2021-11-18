<script setup lang="ts">
import dayjs from 'dayjs'
import { siteConfig } from 'saber/config'
import { onMounted, ref, computed } from 'vue'
import TweetButton from '$src/components/TweetButton.vue'
import DefaultLayout from './default.vue'

const { page, Component } = defineProps({
  page: null,
  Component: null,
})

const isPost = page.type === 'post'

const commentsSection = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!commentsSection.value) return
  const attrs = {
    repo: 'egoist/website',
    'issue-term': 'pathname',
    label: 'comment',
    theme: 'preferred-color-scheme',
    crossorigin: 'anonymous',
  }
  const script = document.createElement('script')
  script.src = `https://utteranc.es/client.js`
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
