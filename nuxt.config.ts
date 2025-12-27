// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // Server-only (환경변수에서 읽어옴)
    resendApiKey: process.env.RESEND_API_KEY || '',
  },

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
        { name: 'description', content: '서울 종로 귀금속 도매 전문점 귀족. 금반지, 돌반지, 커플링, 예물, 결혼반지 주문제작. 14K 18K 24K 순금 도매, 수리·세공. 종로3가 금은방, 귀금속 도매상.' },
        { property: 'og:title', content: '귀족 | 종로 귀금속 도매' },
        { property: 'og:description', content: '서울 종로 귀금속 도매 전문. 금반지, 돌반지, 커플링, 예물 주문제작. 종로3가 금은방' },
        { property: 'og:type', content: 'website' },
        // Google Search Console
        { name: 'google-site-verification', content: 'ZsI2VVbWEPqgSNZ8BntW5Fod0faTHbhJ6SUF3Z470SY' },
        // Naver Search Advisor
        { name: 'naver-site-verification', content: '982a858996de4d87d4f5cf7376fab0dc528d2f56' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
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
      script: process.env.NODE_ENV === 'production' ? [
        // Google Analytics 4
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-RKK8E5CB6G', async: true },
        { innerHTML: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-RKK8E5CB6G');" },
        // Naver Analytics
        { innerHTML: "if(!window.wcs_add) window.wcs_add = {}; wcs_add['wa'] = '9582151f2a151'; var _nasa={}; if(window.wcs) wcs.inflow('noblessegold.com');" },
        { src: 'https://wcs.pstatic.net/wcslog.js', async: true },
        { innerHTML: "(function check(){if(window.wcs){wcs.inflow('noblessegold.com');wcs_do(_nasa);}else{setTimeout(check,100);}})();" },
      ] : [],
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
