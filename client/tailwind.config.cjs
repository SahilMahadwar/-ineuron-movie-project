const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: colors.violet,
      },
    },
    fontFamily: {
      display: ["InterVariable, -apple-system, system-ui, sans-serif"],
      body: ["InterVariable, -apple-system, system-ui, sans-serif"],
    },
  },
  plugins: [],
};
