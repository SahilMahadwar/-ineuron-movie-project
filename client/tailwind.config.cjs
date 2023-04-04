const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "background-pattern": "url('https://i.ibb.co/N9657LW/bg-1c9b34b.png')",
      },

      colors: {
        brand: colors.violet,
        "bg-primary": "#121829",
      },
    },
    fontFamily: {
      display: ["InterVariable, -apple-system, system-ui, sans-serif"],
      body: ["InterVariable, -apple-system, system-ui, sans-serif"],
    },
  },
  plugins: [],
};
