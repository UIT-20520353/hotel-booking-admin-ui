/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-white": {
          1: "#F5F7FA",
          2: "#DFEAF2",
        },
      },
    },
  },
  plugins: [],
};
