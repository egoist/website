<script lang="ts" setup>
import Nav from './Nav.vue'
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
