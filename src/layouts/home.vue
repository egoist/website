<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from 'saber/app'
import { siteConfig } from 'saber/config'
import DefaultLayout from './default.vue'
import { isLang } from '$src/hooks/isLang'

defineProps({
  Component: null,
  page: null,
})

const isZH = isLang('zh')

useHead({
  link: [
    {
      rel: 'alternate',
      type: 'application/atom+xml',
      href: '/atom.xml',
      title: `EGOIST's Blog`,
    },
    {
      rel: 'alternate',
      type: 'application/atom+xml',
      href: '/zh/atom.xml',
      title: `EGOIST 的中文博客`,
    },
  ],
})
</script>

<template>
  <DefaultLayout
    :title="page.title || siteConfig.title"
    :description="siteConfig.description"
  >
    <component :is="Component" />
    <section class="section">
      <h3 class="text-xl font-bold mb-5">Posts</h3>
      <div class="posts space-y-2">
        <div v-for="post in page.posts" :key="post.permalink" class="box post">
          <h2 class="flex flex-col md:flex-row">
            <span class="mr-2 text-zinc-500 flex-shrink-0">{{
              post.date
            }}</span>
            <div class="">
              <saber-link
                :to="post.permalink"
                class="text-pink-500 hover:underline"
                >{{ post.title }}</saber-link
              >
            </div>
          </h2>
        </div>
      </div>
    </section>
    <section v-if="page.videos" class="section mt-10">
      <h3 class="text-xl font-bold mb-5">Videos</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
        <saber-link
          :to="video.url"
          class="group"
          v-for="video in page.videos"
          :key="video.url"
        >
          <div class="shadow inline-block relative">
            <img
              :alt="video.title"
              :src="video.thumbnail.url"
              :width="video.thumbnail.width"
              :height="video.thumbnail.height"
            />
            <span
              class="absolute bottom-1 right-1 bg-black bg-opacity-75 inline-flex items-center h-5 px-1 rounded text-white text-xs font-sans font-semibold"
              >{{ video.duration }}</span
            >
          </div>
          <h4
            class="font-semibold text-sm text-zinc-600 group-hover:text-pink-500"
          >
            {{ video.title }}
          </h4>
        </saber-link>
      </div>
      <div class="mt-6">
        <saber-link
          class="text-zinc-500 inline-flex items-center text-sm space-x-2 hover:text-red-600"
          to="https://www.youtube.com/channel/UCKhaJ86HV7zsklPaCRxD_4A"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            class="text-red-600"
            width="1.2em"
            height="1.2em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73z"
              fill="currentColor"
            ></path></svg
          ><span>More from My Youtube Channel</span></saber-link
        >
      </div>
    </section>
  </DefaultLayout>
</template>
