/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-aboreto)",
        body: "var(--font-poppins)",
      },
      colors: {
        blue: {
          950: "#020f4b",
        },
        red: {
          960: "#f50109",
          950: "#440d22",
        },
      },
    },
  },
  plugins: [],
};
