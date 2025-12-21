// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  image: {
    format: ['webp', 'png', 'jpg'],
    quality: 95,  // 고화질 유지
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1920,
    },
  },

  site: {
    url: 'https://noblessegold.com',
    name: '귀족 | 종로 귀금속 도매',
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  app: {
    head: {
      title: '귀족 | 종로 귀금속 도매',
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '종로 귀금속 도매 · 빠르고 단정한 거래. 도매 상담, 주문 제작, 수리·세공, 납품까지.' },
        { property: 'og:title', content: '귀족 | 종로 귀금속 도매' },
        { property: 'og:description', content: '종로 귀금속 도매 · 빠르고 단정한 거래' },
        { property: 'og:type', content: 'website' },
        // Google Search Console
        { name: 'google-site-verification', content: 'ZsI2VVbWEPqgSNZ8BntW5Fod0faTHbhJ6SUF3Z470SY' },
        // Naver Search Advisor
        { name: 'naver-site-verification', content: '982a858996de4d87d4f5cf7376fab0dc528d2f56' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Preconnect for font CDN
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-12-01',

  nitro: {
    preset: 'cloudflare-pages',
  },
})
