---
title: How Do I Install PNPM
createdAt: 2021-11-07T04:10:40.000Z
layout: post
type: post
description: Here's my solution to switching Node.js version without losing globally installed packages.
---

If you use a Node.js version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm), the npm packages you installed globally using npm or [pnpm](https://pnpm.io/) will be missing when you switch Node versions, you can use nvm's `-reinstall-packages-from` flag to reinstall globally installed npm packages from the previous Node version, but fnm requires you to write your own script to do this.

The reason for this is that global modules installed by npm and pnpm are located in the same directory as the `node` executable, which is not a problem if you are using Yarn, whose global modules are installed in the `~/.yarn` directory.

I don't want to have to reinstall the global module every time I switch Node versions, so the solution I found was to change the directory where pnpm installs the global module (and the global directory for binary files), which can be done with npm config:

```bash
npm config set global-bin-dir $HOME/.pnpm/bin
npm config set global-dir $HOME/.pnpm/global-modules
```

These two configurations only work for pnpm, npm doesn't care, and since the npm documentation sucks, I could not find out how to configure npm the same way. Hopefully, I won't be using npm in the future.

Since the installation directory of npm can't be changed, I can't use it to install pnpm here, because then `pnpm` will still be installed in `node` directory. Fortunately, there is another way to install pnpm itself with pnpm:

```bash
curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
```

How this command works: `curl` downloads the bundled `pnpm` file, and then `node` reads the `stdout` of the previous command from `stdin` to execute it, and `-` can be followed by the CLI arguments to execute the script.

After the installation you will see that the `pnpm` executable appears in `$HOME/.pnpm/bin/pnpm`.

Finally you need to add `$HOME/.pnpm/bin` to the system's `$PATH`.

```bash
export PATH="$PATH:$HOME/.pnpm/bin"
```