/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './views/**/*.ejs',
  ],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
