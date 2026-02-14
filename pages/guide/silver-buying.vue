<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/silver-buying'
const pageTitle = '은매입 가격은 어떻게 정해질까? 방문 전 체크리스트 | 귀족'
const pageDescription = '은매입 가격은 순도, 무게, 당일 시세로 정해져요. 방문 전에 챙기면 좋은 것들을 알려드립니다.'
const ogImage = `${siteConfig.url}/Image/ring/NN0801.webp`
const publishedAt = '2026-02-14'
const faqItems = [
  {
    question: '변색된 은제품도 매입이 되나요?',
    answer: '가능합니다. 외관보다는 순도와 무게가 기준이므로 상태가 좋지 않아도 상담이 가능합니다.',
  },
  {
    question: '은수저나 은화도 매입 가능한가요?',
    answer: '가능합니다. 품목별 순도와 무게 확인 후 당일 시세 기준으로 안내드립니다.',
  },
  {
    question: '은매입도 신분증이 필요한가요?',
    answer: '네, 거래 시 본인 확인을 위해 신분증이 필요합니다. 방문 전에 꼭 지참해주세요.',
  },
]

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: `${siteConfig.url}${pagePath}` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: `${siteConfig.url}${pagePath}` },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: ogImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '귀금속 가이드', path: '/guide' },
        { name: '은매입', path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: ogImage,
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', name: siteConfig.name },
        publisher: { '@type': 'Organization', name: siteConfig.name },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }),
    },
  ],
})
</script>

<template>
  <GuideArticleView
    category="비용"
    keyword="은매입"
    title="은매입 가격은 어떻게 정해질까? 방문 전 체크리스트"
    lead="은매입은 겉모습보다 순도와 실제 무게, 그날 시세가 핵심이에요. 오시기 전에 품목을 간단히 정리해 오시면 감정도 상담도 훨씬 빨라집니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/ring/NN0801.webp`"
    hero-alt="은매입 상담"
    :quick-answers="[
      '매입가는 순도 + 무게 + 당일 시세로 정해져요.',
      '광택이나 겉모습보다 실제 무게와 순도가 더 중요해요.',
      '품목별로 나눠서 가져오시면 감정이 빨라집니다.'
    ]"
    :sections="[
      {
        title: '매입가는 이렇게 정해져요',
        paragraphs: ['은매입에서 가장 먼저 확인하는 건 순도와 무게예요. 생김새가 비슷해도 순도와 실제 무게가 다르면 매입가도 달라집니다.'],
        bullets: ['순도 — 제품에 표기된 정보 또는 감정 결과 기준', '무게 — 장식이나 부속을 제외한 실중량', '시세 — 방문하신 날의 당일 시세 적용']
      },
      {
        title: '오시기 전에 이것만 준비해주세요',
        paragraphs: ['품목별로 미리 나눠두시면 상담이 훨씬 수월해요.'],
        bullets: ['목걸이, 반지 등 종류별로 분리', '팔 것과 보관할 것을 구분', '신분증을 챙겨주세요 (거래 시 필요)']
      },
      {
        title: '이런 것도 매입되나요?',
        paragraphs: ['오래되거나 변색된 은제품도 매입 상담이 가능해요. 다만 최종 금액은 순도와 무게를 직접 확인한 뒤에 안내드립니다.'],
        bullets: ['상태가 안 좋아도 상담은 가능해요', '최종 금액은 현장 감정 후에 확정됩니다', '당일 시세에 따라 금액이 변동될 수 있어요']
      }
    ]"
    :cautions="[
      '전화나 온라인으로 안내드린 금액은 참고용이에요. 최종 금액은 실물 확인 후 확정됩니다.',
      '보석이나 장식 부품은 매입 대상에서 제외될 수 있어요.'
    ]"
    :faq-items="faqItems"
    :related-links="[
      { to: '/buy-gold', label: '금·은 매입 안내', description: '매입 가능한 품목과 절차' },
      { to: '/faq', label: '자주 묻는 질문', description: '거래 전 궁금한 점 모음' },
      { to: '/contact', label: '문의하기', description: '매입 상담을 원하시면' }
    ]"
  />
</template>
