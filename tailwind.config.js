/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Geist Mono', 'monospace'],
        'work': ['Work Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}