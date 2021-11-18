---
title: Extending globalThis, window, process.env etc in TypeScript
createdAt: 2021-11-18T04:09:38.959Z
layout: post
--

Based on TypeScript 4.5

## Extending `globalThis`, `global`, `window`

Declaration:

```ts
declare var var_name: string
```

Use it:

```ts
globalThis.var_name
global.var_name
window.var_name
var_name
```

## Extending `process` and  `process.env`

Declaration:

```ts
declare namespace NodeJS {
  interface Process {
    some_key: string
  }
  interface ProcessEnv {
    DATABASE_URL: string
  }
}
```

Use it:

```ts
process.some_key
process.env.DATABASE_URL
```

## Extending `import.meta`

Declaration:

```ts
declare interface ImportMeta {
  env: {
    DEV: boolean
  }
}
```

Use it:

```ts
import.meta.env.DEV
```
