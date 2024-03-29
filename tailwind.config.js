/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#dAE5d7",
        secondary: "#30483D",
        tertiary: "#ee2f53",
      },
    },
  },
  plugins: [],
};
