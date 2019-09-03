<template>
  <div class="app">
    <div class="container">
      <Header />
      <main class="box">
        <div class="page-content">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
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
.page-content > *:last-child {
  margin-bottom: 0;
}

.page-content > *:first-child {
  margin-top: 0;
}
</style>