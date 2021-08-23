module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        basement: {
          light: "#1D1D1D",
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
