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
  plugins: [],
}