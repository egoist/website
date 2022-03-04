/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/atom.xml",
        destination: "/api/feed",
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
}
