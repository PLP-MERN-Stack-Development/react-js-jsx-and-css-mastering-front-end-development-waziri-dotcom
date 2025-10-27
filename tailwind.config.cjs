module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class', // theme switcher uses class strategy
  theme: {
    extend: {
      // example custom color
      colors: {
        brand: {
          DEFAULT: '#0ea5a4',
        }
      },
    },
  },
  plugins: [],
}
