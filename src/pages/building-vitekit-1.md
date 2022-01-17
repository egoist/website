---
title: Building ViteKit in 14 Days (1)
type: post
layout: post
createdAt: 2022-01-17T15:55:10.487Z
---

Yesterday is the first day of my [Building ViteKit in 14 Days](/building-vitekit-0) journey, my main work was to overhaul the project structure and plan the features.

## Project Structure

```
.
├── README.md
├── package.json
├── packages
│   ├── adapter-node
│   ├── framework-vue
│   └── vitekit
├── playground
│   └── simple
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── scripts
│   ├── build.ts
│   ├── dev.ts
│   ├── package.json
│   ├── release.ts
│   └── rollup.ts
└── tsconfig.json
```

- **pnpm**: Using pnpm to manage dependencies and the monorepo.
- **build and dev script**: I wrote a custom build script `scripts/build.ts` using Rollup to build each package, adding a build step makes monorepos significantly harder to manage, but that's what I have to do here. `scripts/dev.ts` simply prompt you to select the packages you want to run `pnpm dev`.
- **release script**: The release script is simply copied from Vite, not used yet. All the packages will be published as ESM-only packages. I need to figure out the release process later.
- **adapter-node** and **framework-vue**: They are ViteKit plugins, will be prefixed with `@vitekit/` when published on npm, just like Vite plugins you need to add these _ViteKit_ plugins to `vitekit.config.ts` to make them work.

## Features Overview

- **File-system based routing**. I will use `routes` directory instead of `pages`. Vue SFCs and files with a default export in `routes` directory will become _pages_, files exporting a `loader` function or an `action` function will become _endpoints_, `loader` and `action` will be used for handling GET requests and other requests respectively. Basically [Remix](https://remix.run/docs/en/v1/guides/data-loading).
- **Server-side rendering**, I won't add SSG for the first version simply because I don't have enough time, that can always come later.
- **Router**. I choose Vue as a start becuase we have `vue-router` which is optimized for SSR and is easy to extend, and Vue also has better support for SSR (including code splitting) than React 16 with less efforts. I tried React Router in one of my experiments but I ended up creating my own router. Btw I can also reuse my [@vueuse/head](https://github.com/vueuse/head) package for `<head/>` management.
- **Plugins**. To add Vue support you install the plugin `@vitekit/framework-vue`, to deploy to Vercel you install `@vitekit/adapter-vercel`.

I will make the Vue and Node.js support work nicely first, Vercel support will be added before I open source this project, Cloudflare Workers and React support come later.

I'm also considering whether to make ViteKit a [sponsorware](https://github.com/sponsorware/docs).

## Plugins

Plugins will be named `@vitekit/plugin-foo` or `vitekit-plugin-foo` in general, those for Vercel, Node.js and other platforms support will be prefixed `@vitekit/adapter-` instead for clarity, but they function the same as normal plugins. Same goes for framework plugins,for example the Vue plugin will be `@vitekit/framework-vue`.

The `vitekit` package itself almost does nothing for your runtime, i.e. it's not its job to render your Vue or React app into an HTML string. Instead, this functionality is provided by plugins, in a Vue app `@vitekit/framework-vue` will provide a file that exposes a function called `renderApp` that does this for you. Likewise, `@vitekit/adapter-node` will help transforming Node.js' `http.IncomingMessage` into a web [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request), since all your ViteKit app endpoints (`loader` and `action`) will use standard web `Request` instead of the Node.js HTTP API.

Plugins might also inject helpers to the `vitekit` and `vitekit/server` package, so you can import them in your code, for instance `@vitekit/framework-vue` injects `useRouter` to the `vitekit` package so you can use it like this:

```ts
// In a Vue component
import { useRouter } from 'vitekit'

const router = useRouter()

router.push(`/users/kevin`)
```

Helpers and files exposed by plugins will be generated to `node_modules/.vitekit-runtime/`, and `vitekit`, `vitekit/server` will re-export files in this directory, inspired by how [Prisma](https://prisma.io/) works.

---

That's roughly what I did yesterday, I also fixed a bug in `@vueuse/head` and watched the new episode of Attack on Titan. Tomorrow I'll share what I'm doing today.
