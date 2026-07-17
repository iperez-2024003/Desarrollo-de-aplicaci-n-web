/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Premium Dark Mode Palette (legacy, not used in light mode)
        background: {
          DEFAULT: '#0B0F17',
          card: '#131B2E',
          cardHover: '#1A2336',
          input: '#1A2336',
        },
        border: {
          DEFAULT: '#1E293B',
          subtle: '#2D3B4E',
        },
        // Neon Accents (legacy, not used in light mode)
        neon: {
          teal: {
            DEFAULT: '#14B8A6',
            glow: 'rgba(20, 184, 166, 0.3)',
            light: '#2DD4BF',
          },
          orange: {
            DEFAULT: '#F97316',
            glow: 'rgba(249, 115, 22, 0.3)',
            light: '#FB923C',
          },
          green: {
            DEFAULT: '#22C55E',
            glow: 'rgba(34, 197, 94, 0.3)',
            light: '#4ADE80',
          },
          red: {
            DEFAULT: '#EF4444',
            glow: 'rgba(239, 68, 68, 0.3)',
            light: '#F87171',
          },
        },
        // Text Colors (legacy, not used in light mode)
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8',
          muted: '#64748B',
        },
      },
      boxShadow: {
        'neon-teal': '0 0 20px rgba(20, 184, 166, 0.3)',
        'neon-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
        'neon-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'neon-red': '0 0 20px rgba(239, 68, 68, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
