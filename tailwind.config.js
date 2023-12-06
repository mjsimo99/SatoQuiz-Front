/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'antiquewhite': 'antiquewhite',
      },
      textColor: {
        'antiquewhite': 'antiquewhite',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]}

