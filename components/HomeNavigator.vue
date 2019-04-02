<template>
  <div class="dots" ref="dots">
    <span
      class="dot"
      :class="{active: section.id === $store.homeSection}"
      @click="jump(section.id)"
      v-for="section in sections"
      :key="section.id"
      :data-tippy-content="section.title"
    ></span>
  </div>
</template>

<script>
import tippy from 'tippy.js'
import { jumpTo } from '../utils'

export default {
  data() {
    return {
      sections: [
        { id: 'welcome', title: 'Home' },
        { id: 'repos', title: 'Repos' },
        { id: 'supporters', title: 'Supporters' },
        { id: 'links', title: 'Links' }
      ]
    }
  },

  methods: {
    jump(id) {
      this.$router.push(`#${id}`)
      jumpTo(`#${id}`)
    }
  },

  mounted() {
    this.tips = tippy(this.$refs.dots.querySelectorAll('.dot'), {
      placement: 'right',
      distance: 20,
      arrow: true,
      theme: 'light'
    })
  },

  beforeDestroy() {
    this.tips.destroy()
  }
}
</script>

<style scoped>
.dots {
  display: none;

  @screen md {
    @apply flex;
    @apply flex-col;
    @apply fixed;
    @apply opacity-50;

    left: 20px;
    top: 50%;
    transform: translate(-50%, -50%);

    &:hover {
      @apply opacity-100;
    }
  }
}

.dot {
  @apply w-3;
  @apply h-3;
  @apply bg-gray-300;
  @apply flex;
  @apply rounded-full;
  @apply mb-1;
  @apply relative;
  @apply items-center;
  @apply justify-center;
  @apply cursor-pointer;

  &.active {
    &:after {
      content: '';
      @apply w-1;
      @apply h-1;
      @apply rounded-full;
      @apply bg-gray-600;
      @apply absolute;
    }
  }
}
</style>
