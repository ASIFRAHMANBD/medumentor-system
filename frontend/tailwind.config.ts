import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#F63049',
        },
        charcoal: {
          DEFAULT: '#111F35'
        },
        brand: {
          primary: '#F63049',
          secondary: '#D02752',
          deep: '#8A244B',
          base: '#111F35'
        }
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        subtlePulse: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1px)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 400ms ease-out both',
        'fade-in-up': 'fadeInUp 500ms ease-out both',
        'subtle-pulse': 'subtlePulse 2000ms ease-in-out infinite'
      }
    },
  },
}

export default config