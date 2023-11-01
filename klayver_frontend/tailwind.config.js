/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Orange: "#FFA500",
      },
      backgroundImage: (theme) => ({
        "gradient-radial":
          "radial-gradient(ellipse at center, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
        "gradient-linear":
          "linear-gradient(90deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
      }),
    },
  },
  plugins: [],
};
