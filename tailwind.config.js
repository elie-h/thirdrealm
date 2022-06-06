module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00bcd4",
          light: "#b3e5fc",
          dark: "#00acc1",
        },
      },
      fontFamily: {
        headline: "Poppins, sans-serif",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
