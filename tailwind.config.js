/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // This enables dark mode using class-based switching
  theme: {
    extend: {
      // You can extend your theme here (like colors, spacing, etc.)
    },
  },
  plugins: [],
}
