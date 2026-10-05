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
  // /guide는 Worker가 그리고, /admin은 로그인해야 쓰는 화면이라 정적 파일로 굽지 않는다.
  ...getPrerenderRoutes().filter(route => route !== '/guide' && !route.startsWith('/admin')),
  ...galleryItems.map((item) => `/gallery/${item.slug}`),
]

const seoUpdatedAt = '2026-08-25'
// All gallery detail pages received design-specific consultation guidance.
const galleryTemplateUpdatedAt = '2026-10-03'
const consultationPagesUpdatedAt = '2026-09-05'
const revisedServicePaths = new Set(['/wedding', '/buy-gold', '/custom', '/repair', '/couple-ring'])
const serviceLastmod = (path: string) => revisedServicePaths.has(path) ? '2026-10-03' : consultationPagesUpdatedAt
const sitemapUrls = [
  ...guidePosts.map((guide) => ({
    loc: guide.path,
    lastmod: guide.updatedAt || guide.publishedAt,
  })),
  ...galleryItems.map((item) => ({
    loc: `/gallery/${item.slug}`,
    lastmod: galleryTemplateUpdatedAt,
  })),
  { loc: '/guide', lastmod: seoUpdatedAt },
  { loc: '/gallery', lastmod: seoUpdatedAt },
  { loc: '/wedding', lastmod: serviceLastmod('/wedding') },
  ...['/', '/custom', '/repair', '/baby-gold', '/couple-ring', '/buy-gold', '/privacy'].map(loc => ({ loc, lastmod: serviceLastmod(loc) })),
  { loc: '/contact', lastmod: consultationPagesUpdatedAt },
  { loc: '/wholesale', lastmod: '2026-08-29' },
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  // First paint should not wait for small global/component CSS requests.
  features: { inlineStyles: true },

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
    provider: 'ipxStatic',  // Cloudflare has no Node image server; ship generated variants.
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
    // 1대1 주문서와 관리 페이지는 검색 대상이 아니다 (응답에도 noindex 헤더를 붙인다).
    exclude: ['/order/**', '/admin', '/admin/**'],
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
        // First-party subset preserves the existing typeface with fewer font requests.
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/noblesse-ui-home.woff2', crossorigin: '' },
      ],
      script: [
        // .reveal 등 JS 의존 스타일의 게이트 클래스 — JS 미실행 시 콘텐츠가 숨지 않도록
        { innerHTML: 'document.documentElement.classList.add("js-enabled")' },
      ],
    },
  },

  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

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
            ...new Set(guidePosts.map(post => `/guide/${post.slug[0]}*`)),
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
      ignore: ['/admin', '/order'],
    },
    routeRules: {
      '/guide': { prerender: false, headers: { 'cache-control': 'no-cache' } },
      // 1대1 주문서: 주소가 곧 비밀이라 캐시·검색·리퍼러로 새어 나가지 않게 한다.
      '/order/**': { prerender: false, headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow', 'referrer-policy': 'no-referrer' } },
      '/api/order/**': { headers: { 'cache-control': 'no-store' } },
      // 관리 페이지: 로그인 상태에 따라 브라우저에서만 그린다. 응답 헤더는 진입 키를 확인한 뒤
      // server/middleware/admin-gate.ts가 붙인다 — 여기서 붙이면 404 응답에도 실려 페이지가 있다는 표가 난다.
      '/admin': { ssr: false, prerender: false },
      // 정적 자산 캐시 (1년)
      '/Image/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/favicon.ico': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },
})
