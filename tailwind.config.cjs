/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a456f0',
        dark: '#12071f',
      },
      animation: {
        blinking: 'blinker 1s linear infinite',
      },
      keyframes: {
        blinker: {
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
