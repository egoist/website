<template>
  <div class="page mx-auto">
    <h2 class="text-4xl mt-2 md:mt-20 font-bold">{{ page.attributes.title }}</h2>
    <div class="mt-3 md:mt-10 markdown-body">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['page'],

  head() {
    return {
      title: `${this.page.attributes.title} - EGOIST`
    }
  }
}
</script>

<style scoped>
.page {
  max-width: 50rem;
  @apply px-5;
}

a {
  color: rgba(22, 146, 90, 0.8);

  &:hover {
    color: rgba(22, 146, 90, 1);
  }
}

.markdown-body {
  & h2 {
    @apply mt-16;
  }
}
</style>
