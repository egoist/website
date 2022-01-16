---
title: Building ViteKit in 14 Days (0)
type: post
layout: post
createdAt: 2022-01-16T09:41:29.085Z
---

I'm going to try building ViteKit in public in 14 days, what is ViteKit? you may ask. I'll give you a brief introduction:

> It's a framework for building web apps with React and Vue that run on Vercel, Cloudflare Workers, Node.js etc, it's built on top of Vite, since that's apparently what everything is built on nowadays.

**Wait, isn't that Remix?** Yes in a sense! I've been wanting something like Remix for quite some time, I'm amazed by its `loader` and `action` API when I first saw it in its early days, I had some similar ideas ever since Next.js introduced `getServerSideProps`, I can't stop thinking about what if we can also suport `POST` and other types of requests in pages? Besides Remix I also draw insprations from Inertia.js, I was blown away by how it allows you to build single-page apps **without building an API.**

Well, my initial idea might be similar to what Remix does, but Remix went much furthur than that, it also heavily adopted web standards in its API design, I won't go deeper into that since this is not Remix marketing post, in short, I like it.

Despite how much I like Remix, there're things I don't quite enjoy (not that it's bad tho, just personal perferences, I'm sure it's there because of careful design choices):

- **It's React only**. It's possible for Remix to add Vue or Svelte support in the future, but it seems like a distant future.
- **It's built with esbuild.** While everyone know I'm a huge fan of esbuild, I want to use Vite in this case, esbuild doesn't support hot reloading and there isn't a full featured plugin API.
- **Remix is different**. Remix is kinda different from the frontend tooling you've been using since webpack, its dev experience is more closer to traditional "full-stack" frameworks like Rails than to Next.js or Vite, for instance, it's full page reloading instead of hot reloading, you need to start a Node process to compile CSS with PostCSS separately, etc.

There's also SvelteKit, which I think sharing a similar goal even though their implementations, conventions and dev experiences are not. I stole the "kit" from SvelteKit and added it to Vite and that's how I got "ViteKit".  So why a new tool instead of contributing to SvelteKit? People will ask surely, and I'll answer in advance:

- It's Svelte only. Duh!
- I can't resist the idea of having `getServideSideProps`, `loader` and `action` directly in pages, SvelteKit doesn't have plan to add that.
- I always wanted to build my own "full-stack" framework since the first release of Next.js. And now for the Edge as well!
- Vue is my first love. I have to confess my love for React and Svelte as well, that's why I try to make it framework agnostic.

If you like Next.js, Remix or SvelteKit, continue using it and contributing to it, what I'm making is NOT better than them, in fact, no framework is better than another, it's all perferences and trade-offs.

I actually started some work of ViteKit in early 2021 but it was so ambious that I was burned out and it was never released. This time I will start small, with Vue and Vercel / Cloudflare Workers support coming first, if it goes well, I'm sure the the open source community can help make it better. If not, well, I'm infamous for making half-baked open source projects.

I'll share my progress with new posts every day here for 14 days. Stay tuned for the next one!
