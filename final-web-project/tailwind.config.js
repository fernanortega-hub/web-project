module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        theRevenant: {
          lightBlueGray: '#93afbf',
          blueGreen: '#025863',
          blueGray: '#508aa6',
          darkBlue: '#0f3e54',
          orange: '#DD8B32',
          darkOrange: '#c25928',
          greenBlue: '#025863'
        }
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}