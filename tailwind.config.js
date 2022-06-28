module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#00bcd4",
          "primary-light": "#b3e5fc",
          secondary: "#b3e5fc",
        },
      },
      fontFamily: {
        heading: "Montserrat",
        body: "Montserrat",
      },
      fontSize: {
        xs: ["14px", { lineHeight: "24px", letterSpacing: "-0.03em" }],
        sm: ["16px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
        lg: ["18px", { lineHeight: "28px", letterSpacing: "-0.03em" }],
        xl: ["24px", { lineHeight: "36px", letterSpacing: "-0.03em" }],
        "3xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.032em" }],
        "4xl": ["56px", { lineHeight: "64px", letterSpacing: "-0.032em" }],
        "5xl": ["80px", { lineHeight: "80px", letterSpacing: "-0.032em" }],
        "2xl": ["36px", { lineHeight: "48px", letterSpacing: "-0.032em" }],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
