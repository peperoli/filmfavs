/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--sono-font)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    color: {
      black: '#000',
      white: '#FFF',
      gray: {
        80: '#2D2D2D',
        90: '#1A1A1A',
      },
      transparent: 'transparent',
      current: 'currentColor',
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
