const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        ...colors,
      },
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
