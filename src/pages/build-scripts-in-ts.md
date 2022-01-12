---
title: Writing build scripts using TypeScript
createdAt: 2022-01-12T06:57:26.719Z
type: post
layout: post
---

Just a few years ago I was fighting a tough battle with the typescript compiler, but now I can't live without it!

## Rollup Config

Now I write everything in typescript, including the project's build scripts, and some of my Node.js project's build system use rollup, which fortunately supports configuration files written in typescript:

```ts
// rollup.config.ts
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
	input: ['./src/index.ts'],
	output: {
		format: 'esm',
		dir: './dist'
	},
  plugins: [esbuild()]
})
```

Install `esbuild`:

```bash
npm i esbuild rollup-plugin-esbuild -D
```

You can use rollup plugins to transpile its own config file too, since we're already using esbuild to compile the project files, why not use it to compile the rollup configuration files as well? It's possible thanks to the [`--configPlugin`](https://rollupjs.org/guide/en/#--configplugin-plugin) flag:

```bash
rollup -c rollup.config.ts --configPlugin esbuild
```

## Custom Scripts

For more advanced usages, you may use Rollup's Node.js API or other bundlers like [esbuild](https://esbuild.github.io) to write a custom build script. In this case, you can use `esbuild-register` to run your build script.

This is an example build script, `build.ts`:

```ts
import { rollup, RollupOptions, watch } from 'rollup'

type Options = {
  //...
}

const createMultipleConfigs = (options: Options[]): RollupOptions[] => {
  return [
    {
      //...
    }
  ]
}

const main = async () => {
  const configs = createMultipleConfigs({})
  await Promise.all(configs.map(async config => {
    if (process.env.argv.includes('--watch')) {
      watch(createConfig).on('...')
    } else {
      const bundle = await rollup(config)
      await bundle.write(config.output)
    }
  }))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
```

Install `esbuild-register`:

```bash
npm i esbuild-register esbuild -D
```

And run:

```bash
node -r esbuild-register ./build.ts
```

You can also use `sucrase-register`, `@swc/register` or other utilites that hijack the `require` function to replace `esbuild-register`.

## Monorepo

In a monorepo, you can make your build script a dev dependency of the packages that use it, for example, I usually have a pnpm workspace config like this:

```yaml
packages:
  - packages/*
  - playground/*
  - scripts
```

The `scripts` package is used to group all dev / build scripts, for example, it usually has a `release.ts` and `build.ts` for releasing packages and build packages respectively.

In `scripts/package.json`, I will expose those scripts in the `bin` file:

```ts
{
  "name": "scripts",
  "bin": {
    "release": "./release.ts",
    "build": "./build.ts"
  }
}
```

In order to make these TypeScript scripts executable, I add a hashbang to the top of those files:

```ts
#!/usr/bin/env node -r esbuild-register
```

Now you can add the `scripts` package to other workspace packages using the `workspace:*` specifier in `package.json`:

```json
{
  "name": "some-package-you-want-to-use-scripts",
  "version": "0.0.0",
  "scripts": {
    "build": "build",
    "release": "release"
  },
  "devDependencies": {
    "scripts": "workspace:*"
  }
}
```

As your organization grow, when it reaches a point where these scripts can be used in other repos too, you can even publish the `scripts` package as well.

## How to write good build / release scripts

Read other people's code! For example, large projects like React, Vue or Vite, projects you are interested in or projects similar to the one you are building!
