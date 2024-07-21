/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ErrorTimeLine: {
          '0%': { width: '100%' },
          '100%': { width: "0%" }
        }
      },
      animation: {
        ErrorTimeLine: "ErrorTimeLine 3s ease infinite"
      }
    },

    screens: {
      'phone': { 'max': '1024px' },
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'Max650':{'max':'650px'},
      'Min650':'651px'

    },
  },
  plugins: [],
};
