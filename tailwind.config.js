/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {boxShadow: {
      primary: "0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 2px 4px -4px rgba(0, 0, 0, 0.1)"},
      colors: {
        customred :"#ff7110",
  },
 }
  },
  plugins: [],
}

