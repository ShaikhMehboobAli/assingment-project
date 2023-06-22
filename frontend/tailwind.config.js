/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        bounce400: "bounce 1s infinite 400ms",
      },
      colors: {
        gray: {
          150: "#E5E5E5",
        },
        green: {
          150: "#142a32",
          750: "#224957",
        }
      },
      fontFamily: {
        "poppins-light": ["Poppins-Light", "Segoe-UI-light", "sans-serif"],
        "poppins-regular": ["Poppins-Black", "Segoe-UI", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "Segoe-UI-bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
