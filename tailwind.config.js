// const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar-hide")],
};
