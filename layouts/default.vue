<template>
  <div class="app">
    <div class="container">
      <Header />
      <Nav />
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
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Header,
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