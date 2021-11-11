---
title: Deploy A Ghost Blog on Fly.io
createdAt: 2021-11-11T09:19:44.050Z
layout: post
type: post
---

[Fly.io](https://fly.io) is a platform allowing you to serve your apps closer to your user, for example you can use it to host a Ghost blog as it allows you to deploy from a Docker image, you can think of it as a "Serverless Container". You can read more about Fly's architecture design [here](https://fly.io/docs/reference/architecture/).

Back to business, to start deploying, you need the [Fly CLI](https://fly.io/docs/getting-started/installing-flyctl/) installed first. On macOS, you can install it with Homebrew:

```bash
brew install superfly/tap/flyctl
```

Then create a new project:

```bash
mkdir my-site
cd my-site
```

Now you can use Fly to initialize the project with a config file `fly.toml`, or just grab the file I use to deploy Ghost below:

```toml {highlightLines:[1,'7-15'],lineNumbers:true}
app = "ghost-fly"

kill_signal = "SIGINT"
kill_timeout = 5
processes = []

[build]
  image = "ghost:4-alpine"

[mounts]
  source="ghost_content"
  destination="/var/lib/ghost/content"

[env]
  url="https://[app-name].fly.dev"

[experimental]
  allowed_public_ports = []
  auto_rollback = true

[[services]]
  http_checks = []
  internal_port = 2368
  processes = ["app"]
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20
    type = "connections"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

```

You need to tweak the highlighted part to suit your needs:

- Change the `app` name to something unique.
- By default we use the `ghost:4-alpine` docker image.
- We mount `/var/lib/ghost/content` to `ghost_content` [volume](https://fly.io/docs/reference/volumes/) to persistent data, `/var/lib/ghost/content` is the directory to store Ghost database (SQLite), themes and uploaded images, etc.
- The `url` should be your production website URL, you can add custom domain on [Fly.io dashboard](https://fly.io/apps/).

## Persistent Data

In order to create a [volume](https://fly.io/docs/reference/volumes/) to persist data in `/var/lib/ghost/content`, you can use Fly CLI:

```bash
# Create a 10G volume (default) in the nrt (tokyo) region
fly volumes create ghost_content --region nrt
```

There's many other [regions](https://fly.io/docs/reference/regions/) you can choose too.

## Deploy

To actually deploy the project, run `fly deploy` in the project directory. After that, you should be able to access your Ghost blog at `https://[app-name].fly.dev/ghost` or your custom domain name.

## Using MySQL

By default this docker image uses SQLite as the database, it's perfectly fine for our use case (heavy-read, low-write), but if you want to use MySQL, you can use [Fly Secrets](https://fly.io/docs/reference/secrets/) to do so:

```bash
fly secrets set \
  database__client=mysql \
  database__connection__host: db \
  database__connection__user: root \
  database__connection__password: example \
  database__connection__database: ghost
```

These secrets will be available as environment variables at runtime.

To get a MySQL database, check out [PlanetScale](https://planetscale.com/), they offer a generous free plan for developers.
