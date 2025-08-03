/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': {
          500: '#3B82F6',
          600: '#2563EB',
          '500/20': 'rgba(59, 130, 246, 0.2)',
        },
        'custom-purple': {
          500: '#8B5CF6',
          600: '#7C3AED',
          '600/20': 'rgba(124, 58, 237, 0.2)',
        },
      },
    },
  },
  plugins: [],
};