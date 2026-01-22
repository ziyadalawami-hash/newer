/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Use double quotes inside single quotes because of the space
        // If you want it to be your main font, change 'serif' to 'sans'
        sans: ['"Markazi Text"', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};