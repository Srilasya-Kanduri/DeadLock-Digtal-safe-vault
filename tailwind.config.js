/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF8F4',
        stone: {
          50: '#FAF8F4',
          100: '#F2EEE7',
          200: '#E8E2D8',
          300: '#DCD5C8',
        },
        platinum: {
          200: '#E4E2DC',
          300: '#D2CFC7',
          400: '#B9B5AB',
        },
        graphite: {
          400: '#8A8478',
          500: '#6B6558',
          600: '#4A453C',
          700: '#332F29',
          800: '#242119',
        },
        steel: {
          50: '#EEF3F6',
          100: '#DCE7EC',
          300: '#9FB9C7',
          500: '#5C7A8E',
          600: '#4A6577',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(51, 47, 41, 0.04), 0 8px 24px -8px rgba(51, 47, 41, 0.10)',
        card: '0 1px 1px rgba(51, 47, 41, 0.03), 0 2px 12px -4px rgba(51, 47, 41, 0.08)',
        vault: '0 20px 60px -15px rgba(36, 33, 25, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      letterSpacing: {
        tightest2: '-0.03em',
      },
    },
  },
  plugins: [],
};
