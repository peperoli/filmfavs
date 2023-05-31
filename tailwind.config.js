/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--sono-font)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    colors: {
      black: '#000',
      white: '#FFF',
      gray: {
        800: '#2D2D2D',
        900: '#1A1A1A',
      },
      aqua: {
        300: '#61F2C2',
      },
      yellow: {
        400: '#F2F230',
      },
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      spacing: {
        112: '28rem',
        128: '32rem',
      },
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
