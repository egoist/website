const defaultTheme = require("tailwindcss/defaultTheme")

const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

module.exports = {
  content: ["./src/**/*.{mdx,md,tsx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [`"Inter Variable"`, ...defaultTheme.fontFamily.sans],
        mono: [`"Geist Mono Variable"`, ...defaultTheme.fontFamily.mono],
      },
      colors: {
        bg: token("bg"),
        fg: token("fg"),
        muted: token("muted"),
        faint: token("faint"),
        line: token("line"),
        subtle: token("subtle"),
        card: token("card"),
      },
      borderColor: {
        DEFAULT: token("line"),
      },
      maxWidth: {
        page: "36rem",
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
