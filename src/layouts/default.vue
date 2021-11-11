<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from 'saber/app'
import { siteConfig } from 'saber/config'
import Nav from '$src/components/Nav.vue'

const { title, description } = defineProps({
  title: String,
  description: String,
})

useHead({
  title: computed(() => title),
  meta: computed(() => {
    return [
      {
        name: 'description',
        content: description,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: siteConfig.twitter,
      },
    ]
  }),
})
</script>

<template>
  <div class="app">
    <Nav />
    <div class="container">
      <main>
        <div class="page-content"><slot></slot></div>
      </main>
    </div>
  </div>
</template>
