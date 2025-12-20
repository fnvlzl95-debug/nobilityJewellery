import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - refined luxury
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F2ED',
          300: '#EDE9E2',
        },
        charcoal: {
          700: '#3D3D3D',
          800: '#2A2A2A',
          900: '#1A1A1A',
        },
        gold: {
          light: '#D4B978',
          DEFAULT: '#C9A962',
          dark: '#A88B4A',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Noto Sans KR', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography
        'display-xl': 'clamp(3rem, 8vw, 7rem)',
        'display-lg': 'clamp(2.5rem, 6vw, 5rem)',
        'display-md': 'clamp(1.75rem, 4vw, 3rem)',
        'body-lg': 'clamp(1.125rem, 1.5vw, 1.375rem)',
        'body-md': 'clamp(1rem, 1.25vw, 1.125rem)',
        'body-sm': 'clamp(0.875rem, 1vw, 1rem)',
        'caption': 'clamp(0.75rem, 0.9vw, 0.875rem)',
      },
      spacing: {
        'section': 'clamp(6rem, 15vh, 12rem)',
        'section-sm': 'clamp(4rem, 10vh, 8rem)',
      },
      letterSpacing: {
        'display': '0.02em',
        'wide-kr': '0.05em',
        'wider-kr': '0.1em',
      },
      lineHeight: {
        'display': '1.1',
        'relaxed-kr': '1.8',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        'light-sweep': 'lightSweep 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%) rotate(15deg)' },
          '50%': { transform: 'translateX(100%) rotate(15deg)' },
          '100%': { transform: 'translateX(100%) rotate(15deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
