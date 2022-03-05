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
}
