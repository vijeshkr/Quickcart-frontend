/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primaryColor :'#f43f5e',
        bgRose : '#ffe4e6',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',  // for Internet Explorer and Edge
          'scrollbar-width': 'none',     // for Firefox
        },
        '.scrollbar-none::-webkit-scrollbar': {
          'display': 'none',             // for Chrome, Safari, and Opera
        },
      })
    }
  ],
}