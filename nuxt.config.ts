import { siteConfig } from './config/site'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // Server-only (환경변수에서 읽어옴)
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFrom: process.env.RESEND_FROM || '',
    inquiryTo: process.env.INQUIRY_TO || siteConfig.mail.to,
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
    url: siteConfig.url,
    name: `${siteConfig.name} | 종로 귀금속 도매`,
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },

  app: {
    head: {
      title: `${siteConfig.name} | 종로 귀금속 도매`,
      htmlAttrs: {
        lang: 'ko',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: siteConfig.description },
        { property: 'og:title', content: `${siteConfig.name} | 종로 귀금속 도매` },
        { property: 'og:description', content: '서울 종로 귀금속 도매 전문. 금반지, 돌반지, 커플링, 예물 주문제작. 종로3가 금은방' },
        { property: 'og:type', content: 'website' },
        // Google Search Console
        { name: 'google-site-verification', content: siteConfig.verification.google },
        // Naver Search Advisor
        { name: 'naver-site-verification', content: siteConfig.verification.naver },
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
        { src: `https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4}`, async: true },
        { innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${siteConfig.analytics.ga4}');` },
        // Naver Analytics
        { innerHTML: `if(!window.wcs_add) window.wcs_add = {}; wcs_add['wa'] = '${siteConfig.analytics.naver}'; var _nasa={}; if(window.wcs) wcs.inflow('${siteConfig.domain}');` },
        { src: 'https://wcs.pstatic.net/wcslog.js', async: true },
        { innerHTML: `(function check(){if(window.wcs){wcs.inflow('${siteConfig.domain}');wcs_do(_nasa);}else{setTimeout(check,100);}})();` },
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
