<template>
  <default-layout :page="page">
    <slot></slot>
  </default-layout>
</template>

<script>
import DefaultLayout from './default.vue'

export default {
  components: {
    DefaultLayout
  },

  props: ['page']
}
</script>