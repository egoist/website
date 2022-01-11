<script setup lang="ts">
const links = [
  {
    href: '/',
    text: 'Home',
  },
  { href: 'https://twitter.com/_egoistlily', text: 'Twitter' },
  { href: 'https://github.com/egoist', text: 'GitHub' },
  {
    href: '/thanks',
    text: 'Supporters',
  },
]
</script>

<template>
  <nav class="nav left-0 right-0 top-0 backdrop-blur-lg z-20">
    <div class="container">
      <h1 class="font-bold italic text-2xl md:text-4xl mt-10">
        <saber-link to="/">egoist.sh</saber-link>
      </h1>
      <div class="flex justify-between mt-5 items-center text-zinc-500">
        <ul class="h-full flex items-center space-x-3 md:space-x-6">
          <li :key="link.text" v-for="link in links" class="h-full">
            <saber-link
              :to="link.href"
              :class="[
                `flex items-center h-full border-b-2 border-transparent hover:underline`,
                link.href === $route.path && 'text-black',
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
