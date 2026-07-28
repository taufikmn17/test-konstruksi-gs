/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js" // <-- Pastikan baris ini ada agar navbar.js terpindai
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}