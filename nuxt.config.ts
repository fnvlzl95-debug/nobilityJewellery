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
        // Preconnect for Naver Analytics (LCP 개선)
        { rel: 'preconnect', href: 'https://nam.veta.naver.com' },
        { rel: 'preconnect', href: 'https://ssl.pstatic.net' },
        // Preconnect for Google
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://maps.googleapis.com' },
      ],
      script: [
        // Google Analytics 4
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-LRYTQT8C69', async: true, defer: true },
        { innerHTML: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-LRYTQT8C69');", defer: true },
        // Naver Analytics (defer for performance)
        { src: 'https://wcs.pstatic.net/wcslog.js', defer: true },
        { innerHTML: "if(typeof wcs_add === 'undefined') var wcs_add = {}; wcs_add['wa'] = '9582151f2a151'; if(typeof wcs !== 'undefined' && wcs) { wcs_do(); }", defer: true },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-12-01',

  nitro: {
    preset: 'cloudflare-pages',
    routeRules: {
      // 정적 자산 캐시 (1년)
      '/Image/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/favicon.ico': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },
})
