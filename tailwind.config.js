/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#007AFF',
          purple: '#AF52DE',
          pink: '#FF2D55',
          orange: '#FF9500',
          yellow: '#FFCC00',
          green: '#34C759',
        }
      }
    },
  },
  plugins: [],
}
