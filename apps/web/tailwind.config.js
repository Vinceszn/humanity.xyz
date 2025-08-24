/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4F46E5', // indigo-600
          50: '#EEF2FF',
          100: '#EDEBFF',
          200: '#C7C9FF',
          400: '#7C3AED',
          600: '#4F46E5',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          600: '#7C3AED'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        'soft-xl': '0 10px 30px rgba(16,24,40,0.08), 0 4px 8px rgba(16,24,40,0.04)'
      },
      fontFamily: {
        audiowide: ['var(--font-audiowide)', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
