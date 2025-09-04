const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{mdx,md,tsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
        mono: ["Geist Mono Variable", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: "#563bda",
        dark: "#010509",
        rss: "#ee802f",
      },
      boxShadow: {
        popover:
          "0 0 0 1px #8898aa1a, 0 15px 35px #31315d1a, 0 5px 15px #00000014",
      },
      backgroundColor: {
        header: "#f7f5ff",
      },
      spacing: {
        sidebar: "var(--sidebar-width)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@egoist/tailwindcss-icons").iconsPlugin({
      collections: require("@egoist/tailwindcss-icons").getIconCollections([
        "lucide",
        "tabler",
        "ri",
        "ic",
        "heroicons",
      ]),
    }),
  ],
}
