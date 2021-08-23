module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xxs: ["11px", "11.88px"],
      },
      colors: {
        basement: {
          light: "#1D1D1D",
          gray: "#999999",
          dark: "#151515",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
