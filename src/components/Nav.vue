<script setup lang="ts">
import { siteConfig } from 'saber/config'
import { isLang } from '$src/hooks/isLang'

const isZH = isLang('zh')

const links = [
  {
    href: isZH.value ? '/' : '/zh',
    text: isZH.value ? 'English' : '中文博客',
  },
  {
    href: isZH.value ? '/zh/thanks' : '/thanks',
    text: isZH.value ? '赞助' : 'Supporters',
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
          <saber-link :to="isZH ? '/zh' : '/'" class="hover:text-white">{{
            siteConfig.title
          }}</saber-link>
        </h1>
        <ul class="text-sm h-full flex items-center space-x-3 md:space-x-6">
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
