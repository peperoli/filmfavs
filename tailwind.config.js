/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--sono-font)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    extend: {},
    container: {
      center: true,
    },
  },
  plugins: [],
}
