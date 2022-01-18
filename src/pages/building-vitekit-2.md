---
title: Building ViteKit in 14 Days (2)
type: post
layout: post
createdAt: 2022-01-18T14:33:05.871Z
---

Second day in building ViteKit, starting to feel a bit pressure! Especially because today my [Vercel](https://vercel.com/) account exploded:

![vercel account blocked](https://cdn.jsdelivr.net/gh/egoist-bot/images@main/uPic/CleanShot%202022-01-18%20at%2022.35.59%402x.png)

One of [my serverless function](https://github.com/egoist/gh-pinned-repos) received 284K requests in the last 7 days and I've no idea how this happened:

![vercel usage](https://cdn.jsdelivr.net/gh/egoist-bot/images@main/uPic/CleanShot%202022-01-18%20at%2022.44.57@2x.png)

As a result all my projects hosted on Vercel are down now, I have temporarily moved this and a few other sites from Vercel to Cloudflare Pages.

---

Back to ViteKit, I have made some basic stuff working:

## Routes

I can now add routes (like `about.vue`) to `app/routes` directory and they will work as expected:

- (implemented) Dynamic routing: `user/$user.vue` -> `/user/:user`
- (implemented) Catch-all routes: `posts/$.vue` -> `/posts/*`

SSR has also been implemented, however I haven't implemented client-side hydration.

And Remix-style nested routing won't be added in ViteKit, at least in the short term.

## Special Files

- `app/document.ts`: (implemented) Used to generate `<html>` markup. Note that this is different from Next.js' `_document.tsx`:

  ```ts
  import html from 'vitekit/html'

  export default () => {
    return html`<html>
      <head>
        ${html.head}
      </head>
      <body>
        ${html.main} ${html.scripts}
      </body>
    </html> `
  }
  ```

  It returns a `<html>` markup string directly. `html.head` and `html.main` are placeholders, ViteKit will automatically replace them with the corresponding HTML.

- `app/error.{vue,tsx,jsx}`: (not yet implemented) Error page.
- `app/404.{vue,tsx,jsx}`: (not yet implemented) 404 page.
- `app/root.{vue,tsx,jsx}`: (not yet implemented) Root component, used to render corresponding page component:
  ```vue
  <template>
    <Outlet />
  </template>
  ```

---

Tomorrow I'll be focusing on client-side hydration and passing `loader` and `action` data to the client-side app via `useLoaderData` and `useActionData` hooks (i.e. Vue Composition API). Maybe I'll also try to make 404 and error page work.
