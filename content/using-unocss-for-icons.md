---
title: Using UnoCSS to Add SVG Icons
date: 2022-05-27
---

[UnoCSS](https://github.com/unocss/unocss) is a utility-first CSS framework, much like TailwindCSS, but much more pluggable.

It's so modular that you can UnoCSS's `@unocss/preset-icons` preset alone to handle icons only, and I was impressed by it, I mean, look at this, using SVG icons in pure CSS, only bundle what I use, how cool is that?

```html
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-ph-anchor-simple-thin" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large Vue logo -->
<div class="i-logos-vue text-3xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
<!-- Twemoji of laugh, turns to tear on hovering -->
<div
  class="i-twemoji-grinning-face-with-smiling-eyes hover:i-twemoji-face-with-tears-of-joy"
/>
```

![unocss icons preset in action](https://cdn.jsdelivr.net/gh/egoist-bot/images@main/uPic/9uwSWa.gif)

It's incredibly cool, but I'm not yet ready to fully ditch TailwindCSS to migrate to UnoCSS, I'll start with the icons.

Another good thing about this is that I no longer need to inline SVG icons in my React component, currently, I'm just manually copying whatever SVG icons I want from https://icones.js.org as JSX into the app, it's somewhat a bad practice:

[![tweet from developit about svg](https://cdn.jsdelivr.net/gh/egoist-bot/images@main/upic/owNiVG.jpg)](https://twitter.com/_developit/status/1382838799420514317)

## Adding UnoCSS to my Next.js app

Install the dependencies:

```bash
npm i @unocss/cli unocss @unocss/preset-icons -D

# any extra icon sets from iconify
# here use material design icons as an example
npm i @iconify-json/mdi -D
```

Configure `uno.config.ts`:

```ts
import { defineConfig } from "unocss"
import presetIcons from "@unocss/preset-icons"

export default defineConfig({
  presets: [presetIcons()],
})
```

Then create an npm script to generate CSS using UnoCSS's CLI:

```json
"uno-generate": "unocss \"src/**/*.{ts,tsx}\" -o src/generated/uno.css"
```

I'm using Next.js, so I need to import the generated CSS in my `src/pages/_app.tsx`

```ts
import "../generated/uno.css"
```

To automate the `uno-generate` script, I created a webpack plugin and added it to `next.config.js`:

```js
const spawn = require("cross-spawn")

class UnoCSS {
  /**
   * @param {import('webpack').Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.beforeRun.tapPromise("unocss", async () => {
      spawn.sync("pnpm", ["uno-generate"], { stdio: "inherit" })
    })
    let watching = false
    compiler.hooks.watchRun.tap("unocss", () => {
      if (watching) return
      watching = true
      spawn("pnpm", ["uno-generate", "--watch"], { stdio: "inherit" })
    })
  }
}

module.exports = {
  webpack(config) {
    config.plugins.push(new UnoCSS())
    return config
  },
}
```

This plugin will make webpack run `pnpm uno-generate` before compiling your app, in development, it also runs in watch mode.

That's about it, I think I'll gradually move to UnoCSS, and replace my TailwindCSS `@apply` rules with [UnoCSS shortcuts](https://github.com/unocss/unocss#shortcuts) when I get some time.
