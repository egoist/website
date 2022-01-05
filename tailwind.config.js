module.exports = {
  content: ['./src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        fg: 'var(--fg)',
        link: 'var(--link-color)',
      },
      borderColor: {
        border: 'var(--border-color)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
