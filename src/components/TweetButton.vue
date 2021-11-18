<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const url = computed(
  () =>
    `https://twitter.com/intent/tweet?${new URLSearchParams([
      ['url', props.url],
      ['text', props.text],
    ]).toString()}`
)
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="nofollow noopener"
    class="
      bg-[#1d9bf0]
      text-white
      inline-flex
      items-center
      space-x-1
      rounded-md
      px-3
      text-sm
      py-1
    "
  >
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
      shape-rendering="geometricPrecision"
      style="fill: white; margin-right: 6px; color: currentcolor"
    >
      <path
        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
      ></path>
    </svg>
    <span>Tweet</span></a
  >
</template>
