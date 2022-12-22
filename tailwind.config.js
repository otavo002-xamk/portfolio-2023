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
      boxShadow: {
        headerShadow: "0 2px 8px #f87171",
        navbarShadow: "2px 2px 8px black",
        darkNavbar: "2px 2px 8px white",
        burgerShadow: "1px 1px 2px white",
        darkBurger: "1px 1px 2px black",
        closeBurger: "1px 1px 2px #f87171",
        footerShadow: "0 -2px 8px #881337",
      },
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
