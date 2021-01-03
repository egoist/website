<template>
  <default-layout :page="page">
    <main>
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="post-date">{{ page.formatedDate }}</div>
      <div class="page-content">
        <slot></slot>
      </div>
    </main>
  </default-layout>
</template>

<script>
import DefaultLayout from './default'

export default {
  components: {
    DefaultLayout
  },

  props: ['page'],

  head() {
    return {
      title: this.page.title
        ? `${this.page.title} - ${this.$siteConfig.title}`
        : this.$siteConfig.title
    }
  }
}
</script>

<style scoped>
.post-date {
  font-weight: 500;
  font-size: 0.875rem;
  font-style: italic;
  color: var(--secondary-fg);
}

.page-content {
  padding: 20px 0;
}
</style>
