---
title: Manage Monorepo with pnpm
date: 2022-02-22
---

[pnpm](http://web.archive.org/web/20220222094957/https://pnpm.io/) is my go-to package manager for javascript projects, if you're already using pnpm, you most likely would also like to use it for monorepo: codebases containing multiple projects.

There're a lot of benefits of putting everything in one single workspace, but it also increases complexity. Thankfully [pnpm has great workspace support](http://web.archive.org/web/20220222094957/https://pnpm.io/workspaces).

## Problem: run scripts in topological order

Let's say that you have a monorepo, where you have three packages:

```
- packages/web
- packages/components
- packages/mobile
```

All of them have an npm script called `build` which creates a production build for themselves.

The relation is both `web` and `mobile` depend on the `components` package, if you want to build `web`, you want the `build` script of `components` to be executed first.

This is how you do it in pnpm:

```bash
pnpm build --filter web...
```

Here it uses the [`--filter`](http://web.archive.org/web/20220222094957/https://pnpm.io/filtering#--filter-package_name-1) flag with a package name followed by three dots to tell pnpm to run the build script of `web` 's dependencies first, and then run `web` 's own build script.

## Problem: Long-running processes

If you change the command above to run `dev` script (which builds the package and watch fiiles to rerun on changes):

```bash
pnpm dev --filter web...
```

Bad news, it will get stuck in the `dev` script of `components`, because it will never finish and pnpm awaits each command to finish before running the next!

Now you need the [`--parallel`](http://web.archive.org/web/20220222094957/https://pnpm.io/cli/exec#--parallel) flag to disregard the topological order of dependencies and simply run all the scripts in parallel:

```bash
pnpm dev --filter web... --parallel
```

But this creates another problem:

## Problem: the first run of `pnpm dev` fails!

When `components` package has a build step, for example one that bundles `src/index.ts` to `dist/index.js`, chances are the `dev` script will fail because scripts are running in parallel and `components/dist/index.js` might not exist at the point when `web#dev` starts running.

The simple solution is to run `build` script once before the `dev` script:

```bash
pnpm build --filter web... # or just pnpm buil --filter components
pnpm dev --filter web... --parallel
```

Alternatively, I have a package called [`lets-run`](http://web.archive.org/web/20220222094957/https://github.com/egoist/lets-run) which you can use to run a command only if a certain file exist (otherwise keep trying until it exists):

```bash
pnpm i -D lets-run

lets-run "vite build --watch" --on-path-exists ../packages/components/dist/index.js
```

You can also just import the `src` files from the `components` package and configure `web` to compile the files imported from packages in this monorepo, but the configuration would vary in different projects, so I'm not going to talk about this.

## Caching

Now this is what pnpm doesn't do, you need a build system that has cache support by design for this.

And I don't have a package for this 😜, because tools like [Turborepo](http://web.archive.org/web/20220222094957/https://turborepo.org/) or [NX](http://web.archive.org/web/20220222094957/https://nx.dev/) already does it beautifully. Personally I prefer Turborepo because it's simpler and requires much less configuration. The build command above can be converted to using Turborepo like this:

```bash
# pnpm
pnpm build --filter web...

# turbo
turbo run build --scope=web
# or (excluding packages depending on `web`, none in this case)
turbo run build --scope=web --no-deps
```

You can continue using pnpm to run dev scripts since you don't really need caching there.
