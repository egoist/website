<template>
  <default-layout :page="page">
    <slot></slot>
    <section class="section">
      <div class="section-title">Blog Posts</div>
      <div class="posts">
        <div class="box post" v-for="post in page.posts" :key="post.permalink">
          <a class="post-title" :href="post.permalink">
            <h2>{{ post.title }}</h2>
          </a>
        </div>
      </div>
    </section>
  </default-layout>
</template>

<script>
import Vue from 'vue'
import DefaultLayout from './default.vue'

export default Vue.extend({
  components: {
    DefaultLayout
  },

  props: ['page']
})
</script>

<style scoped>
.post-title h2 {
  font-size: 1rem;
}
</style>