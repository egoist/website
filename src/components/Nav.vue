<script setup lang="ts">
import { siteConfig } from 'saber/config'

const links = [
  {
    href: '/thanks',
    text: 'Supporters',
  },
]
</script>

<template>
  <nav
    class="
      nav
      border-b border-border
      fixed
      left-0
      right-0
      top-0
      backdrop-blur-lg
      z-20
    "
  >
    <div class="container">
      <div class="flex justify-between h-12 items-center">
        <h1 class="">
          <saber-link to="/" class="hover:text-white">{{
            siteConfig.title
          }}</saber-link>
        </h1>
        <ul class="text-sm h-full">
          <li :key="link.text" v-for="link in links" class="h-full">
            <saber-link
              :to="link.href"
              :class="[
                `flex items-center h-full border-b-2 border-transparent`,
                $route.path === link.href
                  ? `border-yellow-500 cursor-default`
                  : `hover:text-white`,
              ]"
            >
              {{ link.text }}
            </saber-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
