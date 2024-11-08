/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'ui-sans-serif', 'system-ui'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'como': '#517761',
        'dark': '#3D424A',
        'titleColor': "#F5F5DC",
        'light': '#fcf6ef44',
      },
    },
  },
  plugins: [],
}

