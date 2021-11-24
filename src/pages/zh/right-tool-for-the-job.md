---
title: 用合适的语言做合适的事
createdAt: 2021-11-24T11:19:43.007Z
type: post
layout: post
---

最近用 Go 和 Rust 写了两个小工具，分别是 [Aho](https://github.com/egoist/aho) 和 [Dum](https://github.com/egoist/dum):

- Aho 是一个脚手架工具，可以下载 GitHub 项目来生成一个新项目
- Dum 则可以用来替代 `npm run`，由于 Rust 和 Node.js 的区别，用 `dum` 的启动时间可以快 200ms ~ 300ms

写这些东西主要目的是帮助我学习 Go 和 Rust，非得用 Go 和 Rust 吗? 当然不是。不过从我仅有的几天体验来看，我以后应该会更多使用这两个语言。

- Node.js (TypeScript): 主要是前端的生态都基于 Node.js，而我主要用 Next.js 和 Nuxt.js 以及 [Prisma](https://prisma.io/)，我也会写一些适合或只能用 JS 写的 CLI
- Deno: 用来写脚本，替代 Bash。Deno 的 API 都是基于 Web，标准库比 Node.js 强，自带 TypeScript 支持，而且引用第三方库不需要包管理器，所以很适合用来快速写脚本
- Go: 写 CLI，可以用 [GoReleaser](https://goreleaser.com/) 很方便地发布无依赖的可执行文件到 GitHub Release 和 Homebrew
- Rust: 适合用来写给其它语言调用的库，比如给 Node.js 写一个 CSS Parser 然后通过 [NAPI-RS](https://napi.rs/) 调用，Go 由于有 GC 并且生成的文件比较大不如 Rust 适合。而且都吹 Rust 的 [borrow checker](https://doc.rust-lang.org/1.8.0/book/references-and-borrowing.html) 和内存安全如何卓越，虽然我只用它写了一个项目，不过还真不错，一般我只要编译通过了运行时就不会出错。

此外，我还调研了 [Zig](https://ziglang.org/) 这个很新的语言，不过由于需要完全手动内存管理目前还不是我需求的东西。
