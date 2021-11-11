<script setup lang="ts">
import { siteConfig } from 'saber/config'
import DefaultLayout from './default.vue'

defineProps({
  Component: null,
  page: null,
})
</script>

<template>
  <DefaultLayout
    :title="siteConfig.title"
    :description="siteConfig.description"
  >
    <component :is="Component" />
    <section class="section border-t border-dashed border-border mt-10">
      <div class="text-sm mt-8 mb-3 text-gray-400">Recent Posts</div>
      <div class="posts">
        <div v-for="post in page.posts" :key="post.slug" class="box post">
          <saber-link :to="post.permalink" class="text-link hover:underline">
            <h2>{{ post.title }}</h2>
          </saber-link>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>
