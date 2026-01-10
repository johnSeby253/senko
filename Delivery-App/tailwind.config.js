/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ], theme: {
    extend: {
      screens: {
        'square': { 'max': '639px' },
        'watch': { 'max': '350px' },
      },
      colors: {
        "primary": "#022941",
        "headcolor":'#06576d'
      },
      height: {
        "headerh": "80px",
        '60vh':'60vh',
        '70vh':'70vh',
        '500px':'500px',
        '80%':'80%'
      },
      width:{
        "95%":'95%',
        "80%":"80%"
      },
      borderRadius:{
        '1000px':'1000px'
      }


    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

