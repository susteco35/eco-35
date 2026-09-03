/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep Royal Navy / Obsidian Blue
        navy: {
          50: '#eef2f9',
          100: '#d6deef',
          200: '#adbedf',
          300: '#7e96c4',
          400: '#5470a5',
          500: '#3a5285',
          600: '#2a3d68',
          700: '#1e2d4e', // rich slate surface
          800: '#0f172a', // primary dark
          900: '#090d16', // obsidian
          950: '#05080f',
        },
        // Slate / Dark Indigo surfaces
        slatey: {
          50: '#f1f5f9',
          100: '#e2e8f0',
          200: '#cbd5e1',
          300: '#94a3b8', // warm silver text
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b', // secondary surface
          800: '#111827', // dark indigo
          900: '#0b0f1a',
        },
        // Warm Luxury Gold / Champagne Gold
        gold: {
          50: '#fdf8ed',
          100: '#faedcf',
          200: '#f5d99b',
          300: '#efc467',
          400: '#e9a938',
          500: '#d97706', // primary gold
          600: '#b45c04',
          700: '#8f4606',
          800: '#6b350a',
          900: '#4a2507',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fadeIn 1.1s ease both',
        'slow-zoom': 'slowZoom 18s ease-out both',
        'shimmer': 'shimmer 2.4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.16)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
