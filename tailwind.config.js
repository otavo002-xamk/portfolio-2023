/** @type {import('tailwindcss').Config} */
const twTextShadow = require("tailwindcss-textshadow");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      lg: "1024px",
      tablet: "400px",
    },
    textShadow: {
      default: "1px 1px 1px black",
      white: "1px 1px 1px white",
      active: "1px 1px 1px #f87171",
      hover: "1px 1px 1px #fca5a5",
    },
    extend: {
      boxShadow: {
        header: "0 2px 8px #f87171",
        navbar: "2px 2px 8px black",
        darkNavbar: "2px 2px 8px white",
        burger: "1px 1px 2px white",
        darkBurger: "1px 1px 2px black",
        closeBurger: "1px 1px 2px #f87171",
        footer: "0 -2px 8px #881337",
        mathBox: "1px 1px 2px black",
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
