<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from 'saber/app'
import { siteConfig } from 'saber/config'
import Nav from '$src/components/Nav.vue'

const { title, description } = defineProps({
  title: String,
  description: String,
})

const getDesc = (str = '') => str.replace(/<[^>]*>/g, '').slice(0, 100) + '...'

useHead({
  title: computed(() => title),
  meta: computed(() => {
    const desc = getDesc(description)
    return [
      {
        name: 'description',
        content: desc,
      },
      {
        name: 'twitter:description',
        content: desc,
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
