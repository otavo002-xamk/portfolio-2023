/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{js,jsx,ts,tsx}"],
  theme: {
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
  plugins: [],
};
