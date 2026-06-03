<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/cubic-moissanite-diamond-difference'
const pageTitle = '큐빅·모이사나이트·다이아 차이, 예물 메인스톤 고르는 법 | 귀족'
const pageDescription = '큐빅, 모이사나이트, 다이아몬드는 겉보기엔 비슷해도 가격·단단함·반짝임이 달라요. 예산과 착용 목적에 맞게 예물 메인스톤을 고르는 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/gemstone-comparison.webp`
const publishedAt = '2026-06-03'
const faqItems = [
  {
    question: '겉으로 봐서 큐빅과 다이아를 구분할 수 있나요?',
    answer: '일반인 눈으로는 구분이 어렵습니다. 다만 단단함과 반짝임의 결, 시간이 지난 뒤의 상태에서 차이가 나요.',
  },
  {
    question: '모이사나이트는 가짜 다이아인가요?',
    answer: '가짜라기보단 다이아와 비슷하게 만든 별개의 인조 스톤이에요. 반짝임이 화려하고 가격이 합리적이라 예물로도 많이 찾으십니다.',
  },
  {
    question: '예물엔 꼭 다이아여야 하나요?',
    answer: '정해진 답은 없어요. 예산과 가치 보존을 중시하면 다이아, 합리적인 선택을 원하면 모이사나이트도 좋은 대안입니다.',
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
        { name: '큐빅 모이사나이트 다이아 차이', path: pagePath },
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
    category="가격"
    keyword="큐빅 모이사나이트 다이아 차이"
    inquiry-type="custom"
    inquiry-topic="예물 메인스톤 상담"
    title="큐빅·모이사나이트·다이아 차이, 예물 메인스톤 고르는 법"
    lead="예물 반지 중앙에 들어가는 스톤은 큐빅, 모이사나이트, 다이아몬드 중에 고르는 경우가 많아요. 겉보기엔 비슷해도 가격·단단함·반짝임이 달라서, 예산과 용도에 맞게 고르는 기준을 정리했습니다."
    :published-at="publishedAt"
    hero-image="/Image/guide/gemstone-comparison.webp"
    hero-alt="큐빅·모이사나이트·다이아몬드 비교"
    :quick-answers="[
      '큐빅 < 모이사나이트 < 다이아 순으로 가격이 올라가요.',
      '데일리·패션용은 큐빅, 가성비 예물은 모이사나이트, 정통 예물은 다이아를 많이 골라요.',
      '예산과 착용 목적을 정하면 추천이 훨씬 쉬워집니다.'
    ]"
    :sections="[
      {
        title: '세 가지 스톤, 무엇이 다를까',
        paragraphs: ['셋 다 투명하게 반짝이지만 본질이 달라요. 큐빅은 인조 보석, 모이사나이트는 다이아와 비슷한 인조 스톤, 다이아몬드는 천연(또는 랩그로운) 보석입니다.'],
        bullets: ['큐빅(CZ) — 인조 보석으로 저렴하고 가벼운 데일리용', '모이사나이트 — 다이아급 반짝임에 합리적인 가격', '다이아몬드 — 천연/랩그로운, 가장 단단하고 가치 보존']
      },
      {
        title: '단단함과 반짝임',
        paragraphs: ['오래 끼는 예물이라면 단단함(긁힘 저항)이 중요해요. 다이아가 가장 단단하고, 모이사나이트도 꽤 단단해 데일리로 무난합니다. 큐빅은 상대적으로 무르고 시간이 지나면 광이 줄 수 있어요.'],
        bullets: ['경도 — 다이아 > 모이사나이트 > 큐빅', '반짝임 — 모이사나이트는 무지갯빛으로 화려, 다이아는 맑고 깊은 광', '변화 — 큐빅은 오래되면 뿌예질 수 있어요']
      },
      {
        title: '예산·용도별 선택 기준',
        paragraphs: ['매일 끼는 데일리나 패션 반지라면 큐빅으로 부담 없이, 예물인데 예산을 아끼고 싶다면 모이사나이트, 평생 예물·가치 보존을 원하면 다이아를 권해드려요. 감정서가 필요한지도 미리 정하면 좋습니다.'],
        bullets: ['데일리·패션 — 큐빅', '가성비 예물 — 모이사나이트', '정통 예물·가치 보존 — 다이아몬드(감정서 포함 가능)']
      }
    ]"
    :cautions="[
      '같은 크기여도 스톤 종류·등급·세팅에 따라 가격 차이가 큽니다.',
      '다이아는 4C 등급과 감정서에 따라 가격대가 폭넓게 나뉘어요.'
    ]"
    :faq-items="faqItems"
    :related-links="[
      { to: '/wedding', label: '예물 안내', description: '예물 세트 구성 보기' },
      { to: '/custom', label: '주문제작 안내', description: '메인스톤 맞춤 상담' },
      { to: '/contact', label: '문의하기', description: '스톤·예산 상담' }
    ]"
  />
</template>
