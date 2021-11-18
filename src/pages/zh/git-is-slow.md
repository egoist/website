---
title: 解决 Git 速度慢的问题
createdAt: 2019-08-15T00:00:00.000Z
type: post
layout: post
---

Git 支持两种网络传输协议，即 HTTP 和 SSH 协议，于是你只需要在 Google 搜索 _Git 如何配置 HTTP 代理和 SSH 代理_ 就行了，当然也可以继续阅读，参考我用的配置。

## 配置 HTTP 代理

如果你 `git clone` 时用的是 `http` 开头的地址，那就得配置 http 代理:

```bash
git config --global http.proxy http://127.0.0.1:1087
# 或者 Socks5 代理
git config --global http.proxy socks5://127.0.0.1:1086
```

## 配置 SSH 代理

如果你 `git clone` 时用的是 `ssh` 开头的地址，那就得配置 SSH 代理。

对 macOS 用户，你可以使用 [`connect`](https://bitbucket.org/gotoh/connect/wiki/Home)，这是一个让 SSH 支持 SOCKS/HTTPS 代理的工具，这里我们用 [homebrew](https://brew.sh) 来安装:

```bash
brew install connect
```

然后编辑你的 `~/.ssh/config` 文件，加入以下代码:

```ssh-config
Host *
  User git
  ProxyCommand connect -S 127.0.0.1:1086 %h %p
```

这样 SSH 连接时就会使用位于 `127.0.0.1:1086` 的代理。
