---
title: My Mac Setup
date: 2021-01-03T15:06:21.697Z
layout: post
---

So I've recently got a new M1-chip Mac mini, thanks to the generous \$1000 donation from [Storyblok](https://storyblok.com), they've been contributing a lot to the open-source community as well, definitely check them out if you need a new headless CMS, it's free for single-developer projects.

## Break the wall

As someone living in China, the first thing I do after receiving a new Mac, is to install a VPN app to access the actual internet. [Surge](https://nssurge.com/) is probably the most powerful and well-designed app for this area, but it's really expensive ($49 for a single device). As the M1 powered Macs now support iPhone and iPad apps, I reckon some iOS VPN apps might just work as well, and they are way cheaper. I tried [ShadowRocket](https://apps.apple.com/us/app/shadowrocket/id932747118) which costs only $2.99 without device limitation, and it works perfectly on my Mac. The tool I use to install iOS apps on Mac is called [iMazing](https://imazing.com/), you can use it to export app as `.ipa` file and double-click the file to install on your Mac.

One downside of running iOS apps on Mac is that you have to Force Quit (Command-Option-Escape) to actually exit the app, otherwise they will continue to run in the background even if you quit (Command-Q) them.

## The Browser

Safari is extremely fast now, actually a lot faster than Chromium-based browsers according to [Speedometer score](https://browserbench.org/Speedometer2.0/), so it is naturally my first choice for general web browsing, however I don't really enjoy the experience of Safari devtools, and Chrome devtools is arguably the best developer tool for web developers, that's why I also use the Chromium-based Microsft Edge to develop web apps, it also feels a bit faster than Google Chrome.

## The Editor

There were many choices 4 years ago, like VS Code, Atom or Sublime Text, but as of today, VS Code has been my go-to editor for almost everything, it's incredibly fast and versatile, almost making me forget that it's Electron-based!

This year [Panic](https://panic.com) released their long-awaited native Mac editor: [Nova](https://nova.app/), but to be honest, performance-wise it doesn't seem to be superior to VS Code, despite the fact it's a native Mac app. DX-wise VS Code has best-in-class TypeScript support and many more official plugins for other languages, so I'm not sure about the selling points of this new editor. Not to mention that VS Code supports Remote Development using SSH, and the editor is cross-platform and open-source.

## Messaging

I use two messaging apps, Wechat and Telegram. I use Wechat because I live in China, everyone else uses it, as for Telegram, it's what Wechat should have been.

## Terminal

Honestly I've forgot why I'm using [iTerm2](https://iterm2.com/) instead of the default Terminal.app, but it's so good that I have no complaints.

I also use [Fish](https://fishshell.com/) shell instead of Zsh which comes by default with macOS. Fish is probably the king of auto-completion in shells, I can't find any Zsh plugin that could perfectly replicate its features in Zsh.

As for shell prompt, I use [starship.rs](https://starship.rs/), it's written in Rust and the interface is intuitive and clean. There's no prebuilt binary available for M1 yet, so you have to build from source: `brew install -s starship`

## Email Client

I used to use Gmail web client a lot with the [Simplify Gmail](https://simpl.fyi/) extension. But recently I discovered a native Mac email client called [MimeStream](<[https://mimestream.com/](https://mimestream.com/)>) which is a nice Gmail-focused Mail.app alternative, it's really fast and easy to use.

## Some Other Apps I Use

- [Bartender](https://www.macbartender.com/): To hide some less-used apps from the menubar
- [iStat Menus](https://bjango.com/mac/istatmenus/): To display memory usage in the menubar, here's also an open-source alternative: [https://github.com/gao-sun/eul](https://github.com/gao-sun/eul)
- [Moom](https://manytricks.com/moom/): Window management
- Slack & Discord: Group chat
- [Postico](https://eggerapps.at/postico/): Postgres GUI client.
- [Skitch](https://evernote.com/products/skitch): Quickly adding some annotations to an image.
- [Raindrop.io](https://raindrop.io/): Web bookmark manager.
- [1Password](https://1password.com/): A password manager I can't live without.
