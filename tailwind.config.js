module.exports = {
  content: ["./**/**.{md,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: `Roboto,sans-serif`,
        mono: `"Roboto Mono",monospace`,
      },
      colors: {
        primary: "#563bda",
        dark: "#010509",
        rss: "#ee802f",
      },
      backgroundColor: {
        header: "#f7f5ff",
      },
      spacing: {
        sidebar: "var(--sidebar-width)",
      },
    },
  },
  plugins: [],
}
