<template>
  <div class="app">
    <div class="container">
      <Nav />
      <main>
        <div class="page-content">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav
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