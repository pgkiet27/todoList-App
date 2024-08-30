/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'oswald': ['Oswald', 'sans-serif'], // Add the new font
          'fira': ['Fira Sans', 'san-serif'],
          'poppins': ['Poppins', 'san-serif'],
          'inter': ['Inter', 'san-serif']
        },
        keyframes: {
          'slide-border': {
            '0%': { width: '0%' },
            '100%': { width: '100%' },
          },
        },
        animation: {
          'slide-border': 'slide-border 1s ease-in-out forwards',
        },
      },
    },
    plugins: [
      
    ],
  }