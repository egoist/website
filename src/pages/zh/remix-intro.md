---
title: Remix - SSR 界的 Rails
createdAt: 2021-11-28T09:20:33.399Z
type: post
layout: post
---

[Remix](https://remix.run/), 本质上和 [Next.js](https://nextjs.org/) 一样都是基于 React 的 SSR 框架，不过它的一些特性让它看起来非常与众不同却又似曾相识。

下面是 Remix 官网首页上的示例代码，展示了一个 route 页面的实现:

```tsx
// 1️⃣
export async function loader({ request }) {
  return getProjects();
}

// 2️⃣
export async function action({ request }) {
  let form = await request.formData();
  return createProject({ title: form.get("title") });
}

// 3️⃣
export default function Projects() {
  let projects = useLoaderData();
  let { state } = useTransition();
  let busy = state === "submitting";

  return (
    <div>
      {projects.map((project) => (
        <Link to={project.slug}>{project.title}</Link>
      ))}

      {/** 4️⃣ */}
      <Form method="post">
        <input name="title" />
        <button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create New Project"}
        </button>
      </Form>
    </div>
  );
}
```

- 1️⃣  `loader` 负责在服务器端加载页面的数据，类似 Next.js 的 `getServerSideProps`，你可以调用服务器端的库，直接读取数据库等等，不过它的 API 基于 web 标准，这里的 `request` 是 Web 的 [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) 对象，而返回的值也应该是一个 Web 标准的 [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)  对象。
- 2️⃣  `action` 负责接受 `GET` 以外的发送到这个页面的请求，就像把 Next.js 的 API routes 也搬到了你的前端页面中。
- 3️⃣  一个常规的 React 页面组件，这其中用到了 `useLoaderData` 来获取 `loader` 返回的数据，而 `useTransition` 可以获取 4️⃣ 这里的 `<Form>` 请求的状态。这里值得说明的是，就算把 `<Form>` 改为常规的 `<form>` 标签这里的功能仍然可以正常工作，只不过是回退到浏览器默认的提交请求时会刷新整个页面的方式。

这样一来，一个 "full-stack" 的页面就完成了，不需要单独写一个 API 服务器。值得一提的是，如果这里把 `export default ...` 去掉了，它就变成了一个没有前端的 API 页面。 

Remix 的 `action` API 可以让你渐进式地编写应用，也就是说 starts small，你可以从一个简单的 HTML 原生 `<form>`开始，添加 `action` 便能接受其提交的请求，而一旦你有时间优化用户体验了，可以很方便的切换到 `<Form>` 组件和 `useTransition` 的组合。

你可以在[这里](https://remix.run/docs/en/v1/guides/philosophy)了解 Remix 详细的设计理念和更多的功能。



