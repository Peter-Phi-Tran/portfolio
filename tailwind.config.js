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
      },
      colors: {
        'text-primary': '#1a1a1a',
        'text-secondary': '#6b7280',
        'text-muted': '#9ca3af',
      },
      letterSpacing: {
        'extra-wide': '0.2em',
      }
    },
  },
  plugins: [],
}