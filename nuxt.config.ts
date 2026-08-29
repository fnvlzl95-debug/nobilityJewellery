import { siteConfig } from './config/site'
import { galleryItems } from './data/gallery-items'
import { guidePosts } from './data/guide-posts'
import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const pagesDir = join(process.cwd(), 'pages')

const getPrerenderRoutes = (dir = pagesDir): string[] => {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = join(dir, entry)
    const stats = statSync(fullPath)

    if (stats.isDirectory()) {
      return getPrerenderRoutes(fullPath)
    }

    if (!entry.endsWith('.vue')) {
      return []
    }

    // 동적 라우트(pages/gallery/[slug].vue)는 파일명 그대로 프리렌더하면 안 된다.
    // 실제 slug 목록은 아래 buildPrerenderRoutes()에서 주입한다.
    if (entry.includes('[')) {
      return []
    }

    const route = `/${relative(pagesDir, fullPath)
      .replace(/\\/g, '/')
      .replace(/\.vue$/, '')
      .replace(/\/index$/, '')
      .replace(/^index$/, '')}`

    return route === '/' ? '/' : route
  })
}

// 정적 라우트 + 제품 상세 라우트
const buildPrerenderRoutes = (): string[] => [
  ...getPrerenderRoutes(),
  ...galleryItems.map((item) => `/gallery/${item.slug}`),
]

const seoUpdatedAt = '2026-08-25'
const consultationPagesUpdatedAt = '2026-08-29'
const sitemapUrls = [
  ...guidePosts.map((guide) => ({
    loc: guide.path,
    lastmod: guide.updatedAt || guide.publishedAt,
  })),
  ...galleryItems.map((item) => ({
    loc: `/gallery/${item.slug}`,
    lastmod: seoUpdatedAt,
  })),
  { loc: '/guide', lastmod: seoUpdatedAt },
  { loc: '/gallery', lastmod: seoUpdatedAt },
  { loc: '/wedding', lastmod: consultationPagesUpdatedAt },
  { loc: '/buy-gold', lastmod: seoUpdatedAt },
  { loc: '/contact', lastmod: consultationPagesUpdatedAt },
  { loc: '/wholesale', lastmod: consultationPagesUpdatedAt },
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'production' },

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
    quality: 85,  // 모바일 전송량 절감 — 갤러리 상세 원본(raw img)은 영향 없음
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
    urls: sitemapUrls,
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
        // Pretendard (본문 가독성용 고딕 — 동적 서브셋)
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css' },
        // Preconnect for Naver Analytics (LCP 개선)
        { rel: 'preconnect', href: 'https://nam.veta.naver.com' },
        { rel: 'preconnect', href: 'https://ssl.pstatic.net' },
        // Preconnect for Google
        { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
        { rel: 'preconnect', href: 'https://maps.googleapis.com' },
        // Preconnect for Meta Pixel
        { rel: 'preconnect', href: 'https://connect.facebook.net', crossorigin: '' },
      ],
      script: [
        // .reveal 등 JS 의존 스타일의 게이트 클래스 — JS 미실행 시 콘텐츠가 숨지 않도록
        { innerHTML: 'document.documentElement.classList.add("js-enabled")' },
        ...(process.env.NODE_ENV === 'production' ? [
        // Google Analytics 4
        { src: `https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4}`, async: true },
        { innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${siteConfig.analytics.ga4}');` },
        // Naver Analytics
        { innerHTML: `if(!window.wcs_add) window.wcs_add = {}; wcs_add['wa'] = '${siteConfig.analytics.naver}'; var _nasa={}; if(window.wcs) wcs.inflow('${siteConfig.domain}');` },
        { src: 'https://wcs.pstatic.net/wcslog.js', async: true },
        { innerHTML: `(function check(){if(window.wcs){wcs.inflow('${siteConfig.domain}');wcs_do(_nasa);}else{setTimeout(check,100);}})();` },
        // Meta Pixel
        {
          key: 'meta-pixel',
          innerHTML: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${siteConfig.analytics.metaPixel}');fbq('track','PageView');`,
        },
      ] : []),
      ],
      noscript: process.env.NODE_ENV === 'production' ? [
        {
          key: 'meta-pixel-noscript',
          innerHTML: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${siteConfig.analytics.metaPixel}&ev=PageView&noscript=1" alt="">`,
          tagPosition: 'bodyOpen',
        },
      ] : [],
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-12-01',

  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      pages: {
        routes: {
          // Cloudflare Pages는 _routes.json 규칙을 최대 100개까지만 허용.
          // 개별 경로 나열 대신 와일드카드로 정적 자산·가이드 전체를 워커 밖으로 뺀다.
          exclude: [
            '/_nuxt/*',
            '/_ipx/*',
            '/Image/*',
            '/guide/*',
            '/gallery/*',
            '/favicon.svg',
            '/favicon.ico',
            '/robots.txt',
            '/sitemap.xml',
          ],
        },
      },
    },
    prerender: {
      // canonical·sitemap·내부링크의 무슬래시 URL과 Cloudflare Pages 응답을 일치시킨다.
      // /buy-gold/index.html 대신 /buy-gold.html을 생성해 /buy-gold를 200으로 제공한다.
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: buildPrerenderRoutes(),
    },
    routeRules: {
      // 정적 자산 캐시 (1년)
      '/Image/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/favicon.ico': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },
})
