---
title: Building a Multi-Tenant Web App with Next.js
date: 2022-05-21
---

Next.js has excellent built-in support for building multi-tenant apps, allowing every customer to use a subdomain of your application or even bring their own top-level domains.

## Rewrites

The basic idea is to rewrite incoming requests to different pages based on the `Host` header, the best place to do this is in `pages/_middleware.ts`:

```ts
import { NextRequest, NextResponse } from "next/server"

const OUR_DOMAIN =
  process.env.NODE_ENV === "production" ? "acme.com" : "localhost:3000"

export default (req: NextRequest) => {
  const host = req.headers.get("host")

  if (host.endsWith(`.${OUR_DOMAIN}`)) {
    const subdomain = host.replace(`.${OUR_DOMAIN}`, "")
    const url = req.nextUrl.clone()
    url.pathname = `_tenant/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}
```

The above code basically:

1. Check if `host` is a subdomain
2. Rewrite to `_tenant/$subdomain/$originalPath` if it is

The logic for supporting a custom domain is very similar.

> TIP:
> you can use `*.localhost:3000` to test subdomains in local development, for example `egoist.localhost:3000`.

## What about Remix and SvelteKit

File-system based routing is good in many ways, but it's actually the reason why this feature was not added until recently I suppose, you genuinely don't have complete control over how a URL maps to a page in a framework like Next.js, Remix, or SvelteKit unless they have it built-in or make the routing more flexible.

I'm closely watching SvelteKit cause it seems to offer a degree of flexibility: https://kit.svelte.dev/docs/hooks The hooks API is a great example.

So for now, in order to achieve multi-tenancy in Remix or SvelteKit, you can conditionally render different components in the same route, based on the `host` header:

```svelte
<script>
import AppHome from './components/AppHome.svelte'
import UserHome from './components/UserHome.svelte'

// Add a page endpoint to get following props
// https://kit.svelte.dev/docs/routing#endpoints-page-endpoints
export let subdomain
export let propsForUser
export let propsForApp
</script>

{#if subdomain}
   <UserHome {...propsForUser} />
{:else}
  <AppHome  {...propsForApp}  />
{/if}
```

As your project grows, the code will get much more complex and confusing, so I really hope SvelteKit would have this feature by default some day.

## SSL

Now you have a multi-tenant app, it's easy to issue SSL for custom domains if you're using Vercel, Fly.io or Cloudflare, the best part about using a PaaS is it usually comes with a CDN by default.

The major differences among the three:

|         | Cloudflare                      | Vercel               | Fly.io                         |
| ------- | ------------------------------- | -------------------- | ------------------------------ |
| Pricing | first 100 free, $0.1 each after | $20/month, unlimited | first 10 free, $0.1 each after |
| CDN     | Full                            | Proxy, Caching       | Proxy, Caching                 |

I don't know what black magic Vercel is using, but adding domains on Vercel almost always takes effect immediately, while on Fly.io it's sometimes a struggle, probably because of DNS cache.

## Read More

Check out this [Vercel Platform Kit](https://github.com/vercel/platforms) for a demonstration.
