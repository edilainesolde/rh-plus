/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        senai: {
          light: '#e0f2fe',
          brand: '#0284c7',
          dark: '#0369a1',
          navy: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
};