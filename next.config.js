const oldPosts = [
  "/deploy-ghost-on-fly",
  "/pnpm-monorepo",
  "/poor-man-backup",
  "/build-scripts-in-ts",
  "/extend-ts",
]

/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/295fnbyBY5",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      ...oldPosts.map((post) => {
        return {
          source: post,
          destination: `https://egoist.proselog.com${post}`,
          permanent: true,
        }
      }),
    ]
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
  webpack(config, { dev, isServer }) {
    // Replace React with Preact in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      })
    }

    return config
  },
  images: {
    domains: ["cdn.jsdelivr.net", "avatars.githubusercontent.com"],
  },
}
