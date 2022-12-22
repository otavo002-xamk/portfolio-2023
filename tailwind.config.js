/** @type {import('tailwindcss').Config} */
const twTextShadow = require("tailwindcss-textshadow");

module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    textShadow: {
      default: "1px 1px 1px #7f1d1d",
      dark: "1px 1px 1px #f87171",
      menu: "1px 1px 1px #f87171",
      darkmenu: "1px 1px 1px #7f1d1d",
    },
    extend: {
      backgroundImage: {
        header: "url('./pictures/jarvi.jpg')",
        // leftNavBar: "url('./pictures/WP_20191220_324.jpg')",
      },
    },
    fontFamily: {
      serif: ["Times New Roman"],
    },
  },
  plugins: [twTextShadow],
};
