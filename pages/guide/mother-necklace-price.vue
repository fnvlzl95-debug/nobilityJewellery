<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/mother-necklace-price'
const pageTitle = '어머니 금목걸이, 예산별 선택 방법 | 귀족'
const pageDescription = '어머니 금목걸이는 소재, 무게, 체인·펜던트 구성에 따라 가격이 달라져요. 예산에 맞게 고르는 방법을 알려드립니다.'
const ogImage = `${siteConfig.url}/Image/necklace/pexels-pixabay-248077.webp`
const publishedAt = '2026-02-14'
const faqItems = [
  {
    question: '어머니 금목걸이는 14K와 18K 중 어떤 게 좋나요?',
    answer: '예산과 착용 목적에 따라 선택하시면 됩니다. 일상 착용은 내구성과 예산 균형, 선물 가치는 18K 선호가 많은 편입니다.',
  },
  {
    question: '예산을 먼저 말해도 되나요?',
    answer: '예산을 먼저 알려주시면 그 범위에서 가능한 무게와 디자인을 빠르게 추천해드릴 수 있습니다.',
  },
  {
    question: '체인과 펜던트를 따로 맞춰도 되나요?',
    answer: '가능합니다. 체인 단독, 펜던트 추가, 세트 구성 중 원하시는 방식으로 상담해드립니다.',
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
        { name: '어머니 금목걸이 가격', path: pagePath },
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
    keyword="어머니 금목걸이 가격"
    title="어머니 금목걸이, 예산별 선택 방법"
    lead="어머니께 드릴 금목걸이, 14K인지 18K인지, 체인 무게, 펜던트 포함 여부에 따라 가격이 달라져요. 예산을 먼저 정해두시면 디자인 고르기가 훨씬 쉬워집니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/necklace/pexels-pixabay-248077.webp`"
    hero-alt="어머니 금목걸이 상담"
    :quick-answers="[
      '가격은 소재(14K/18K)와 무게가 가장 크게 좌우해요.',
      '체인만인지, 펜던트까지 포함인지에 따라 가격 차이가 커요.',
      '예산과 착용 목적(평소용/행사용)을 먼저 정하시면 고르기 쉬워져요.'
    ]"
    :sections="[
      {
        title: '가격이 달라지는 세 가지',
        paragraphs: ['같은 금목걸이라도 소재, 무게, 구성에 따라 가격이 꽤 달라져요. 이 세 가지를 먼저 정해두시면 비교하기가 훨씬 편합니다.'],
        bullets: ['소재 — 14K와 18K 중 어떤 것으로 할지', '무게 — 체인 굵기와 길이에 따라 달라져요', '구성 — 체인만 할지, 펜던트까지 포함할지']
      },
      {
        title: '예산이 정해져 있다면 이렇게 물어보세요',
        paragraphs: ['처음부터 디자인을 딱 정하기보다, 예산 안에서 중요한 것부터 정하는 게 효율적이에요.'],
        bullets: ['평소에 자주 하실 건지, 특별한 날에만 하실 건지', '길이와 착용감이 편한지', '나중에 체인이나 잠금장치 수리가 가능한지']
      },
      {
        title: '선물로 준비하신다면',
        paragraphs: ['선물이시면 디자인뿐 아니라 실제로 편하게 착용할 수 있는지, 관리가 쉬운지도 함께 생각해보세요.'],
        bullets: ['피부가 민감하신 분인지 (알레르기 여부)', '잠금장치가 쉽게 열고 닫을 수 있는 타입인지', '보관이나 세척 방법을 안내받을 수 있는지']
      }
    ]"
    :cautions="[
      '다른 곳과 비교하실 때는 무게 기준이 같은지 먼저 확인해보세요.',
      '펜던트 포함 여부를 빼놓으면 가격 비교가 정확하지 않아요.'
    ]"
    :faq-items="faqItems"
    :related-links="[
      { to: '/wedding', label: '예물 안내', description: '선물·예물 구성이 궁금하시면' },
      { to: '/custom', label: '주문제작 안내', description: '원하는 디자인으로 맞추고 싶다면' },
      { to: '/contact', label: '문의하기', description: '예산에 맞는 상담을 원하시면' }
    ]"
  />
</template>
