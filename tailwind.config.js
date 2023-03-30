/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/images/hero.svg')"
      },
      dropShadow: {
        'logo': "0 5px 10px #000",
        'logo-hover': "0 5px 15px #000"
      }
    },
  },
  plugins: [],
}
