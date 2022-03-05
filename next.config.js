/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/atom.xml",
        destination: "/api/feed",
      },
      {
        source: "/zh/atom.xml",
        destination: "/api/feed?lang=chinese",
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/295fnbyBY5",
        permanent: false,
      },
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
}
