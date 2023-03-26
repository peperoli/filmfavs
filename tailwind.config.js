/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--sono-font)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {
      aspectRatio: {
        '2/3': '2 / 3',
      }
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
