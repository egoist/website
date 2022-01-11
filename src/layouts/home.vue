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
    <section class="section border-dashed border-border">
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
  </DefaultLayout>
</template>
