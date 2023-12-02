/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        current: "#f59e0b",
        primary: "#f59e0b",
        dark: "#94a3b8",
        light_dark: "#334155",
        salert: "#dcfce7",
      },
      fontFamily: {
        space: "'Space Grotesk', sans-serif",
      },
      width: {
        mbtn: "70%",
        lbtn: "23%",
      },
    },
  },
  plugins: [],
};
