import type { Config } from 'tailwindcss'

// 디자인 토큰의 단일 소스는 assets/css/main.css의 CSS 변수(--gold 등).
// Tailwind 팔레트는 그 값을 그대로 참조만 한다.
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './data/**/*.ts',
    './composables/**/*.ts',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0a0a0a',
          light: '#111111',
          lighter: '#1a1a1a',
        },
        gold: {
          light: '#d4b44a',
          DEFAULT: '#c9a227',
          dark: '#a68820',
        },
        white: {
          DEFAULT: '#fafafa',
        },
      },
      fontFamily: {
        display: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
        body: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
