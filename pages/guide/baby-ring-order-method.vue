<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/baby-ring-order-method'
const pageTitle = '돌반지 주문 방법, 처음 문의할 때 이렇게 준비하세요 | 귀족'
const pageDescription = '돌반지 주문은 예산, 무게, 각인, 수령일만 미리 정리해도 상담이 훨씬 빨라져요. 실제 주문 흐름을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/SB0104.webp`
const publishedAt = '2026-03-30'
const faqItems = [
  {
    question: '돌반지 주문할 때 무게를 정확히 몰라도 되나요?',
    answer: '정확한 무게를 몰라도 괜찮아요. 예산 범위와 원하는 느낌을 먼저 알려주시면 그 안에서 적절한 무게와 디자인을 함께 안내드립니다.',
  },
  {
    question: '사진만 보내도 주문 상담이 가능한가요?',
    answer: '가능합니다. 참고 사진이 있으면 디자인 방향을 빠르게 맞출 수 있어요. 다만 정확한 견적은 무게와 각인 조건 확인 후 확정됩니다.',
  },
  {
    question: '돌잔치 일정이 가까우면 어떻게 문의해야 하나요?',
    answer: '일정이 촉박할수록 수령 희망일을 가장 먼저 알려주셔야 해요. 가능한 디자인과 제작 방식부터 우선 안내드릴 수 있습니다.',
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
        { name: '돌반지 주문 방법', path: pagePath },
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
    category="주문"
    keyword="돌반지 주문 방법"
    title="돌반지 주문 방법, 처음 문의할 때 이렇게 준비하세요"
    lead="돌반지 주문은 복잡해 보이지만, 실제로는 예산과 무게, 각인 여부, 수령일 이 네 가지만 먼저 정해도 상담이 훨씬 빨라집니다. 처음 문의할 때 어떤 순서로 정리하면 좋은지 실제 흐름대로 안내드릴게요."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/ring/SB0104.webp`"
    hero-alt="돌반지 주문 상담"
    :quick-answers="[
      '예산, 무게, 각인, 수령일을 먼저 정하면 주문이 빨라져요.',
      '참고 사진이 있으면 디자인 방향을 더 쉽게 맞출 수 있어요.',
      '일정이 급하면 돌잔치 날짜를 가장 먼저 알려주셔야 합니다.'
    ]"
    :sections="[
      {
        title: '주문 전에 먼저 정할 네 가지',
        paragraphs: ['처음부터 디자인을 완벽하게 정해둘 필요는 없어요. 다만 아래 네 가지가 정리되어 있으면 상담 속도와 정확도가 크게 달라집니다.'],
        bullets: ['예산 범위 — 어느 정도까지 가능한지', '원하는 무게나 크기감 — 가볍게 할지 존재감 있게 할지', '각인 여부 — 이름, 날짜, 짧은 문구를 넣을지', '수령 희망일 — 돌잔치나 선물 일정이 언제인지']
      },
      {
        title: '상담부터 주문 확정까지 순서',
        paragraphs: ['실제 주문은 보통 원하는 느낌을 공유하고, 가능한 무게와 디자인을 좁힌 뒤, 마지막에 각인과 일정까지 확정하는 순서로 진행됩니다. 참고 사진이 있으면 상담 시간이 더 짧아져요.'],
        bullets: ['원하는 스타일이나 사진 공유', '예산 안에서 가능한 무게와 디자인 안내', '각인 문구와 수령일 최종 확인', '견적 확정 후 제작 또는 준비 진행']
      },
      {
        title: '실수 줄이는 체크포인트',
        paragraphs: ['주문할 때 가장 많이 놓치는 부분은 일정과 각인 내용이에요. 특히 돌잔치 시즌에는 비슷한 시기에 문의가 몰리기 때문에 이 부분을 먼저 체크하시는 것이 안전합니다.'],
        bullets: ['각인 철자와 날짜를 한 번 더 확인할 것', '택배 수령인지 방문 수령인지 미리 정할 것', '케이스 포함 여부나 포장도 함께 확인할 것']
      }
    ]"
    :cautions="[
      '가격은 상담 당일 금 시세와 실제 무게에 따라 최종 확정됩니다.',
      '각인 내용이 늦게 확정되면 전체 일정이 함께 밀릴 수 있어요.'
    ]"
    :faq-items="faqItems"
    :related-links="[
      { to: '/guide/baby-ring-price', label: '돌반지 가격 가이드', description: '가격이 정해지는 기준을 확인하세요' },
      { to: '/guide/baby-ring-production-time', label: '돌반지 제작 기간', description: '일정 맞추는 방법을 함께 보세요' },
      { to: '/contact', label: '문의하기', description: '주문 상담과 일정 확인' }
    ]"
  />
</template>
