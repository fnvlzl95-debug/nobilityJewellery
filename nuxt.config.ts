// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      'Playfair+Display': {
        wght: [400, 500, 600],
        ital: [400, 500],
      },
      'Outfit': [300, 400, 500, 600],
      'Cormorant': {
        wght: [300, 400, 500],
        ital: [300, 400],
      },
    },
    display: 'swap',
    preload: true,
    prefetch: true,
    download: true,
    fontsDir: 'fonts',
    stylePath: 'css/fonts.css',
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
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-12-01',
})
