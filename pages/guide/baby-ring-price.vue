<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/baby-ring-price'
const pageTitle = '돌반지 가격 문의 전에 꼭 확인할 3가지 | 귀족'
const pageDescription = '순금 시세, 중량, 각인에 따라 돌반지 가격이 달라져요. 상담 전에 미리 알아두면 좋은 것들을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/SB0101.webp`
const publishedAt = '2026-02-14'

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
        { name: '돌반지 가격 문의', path: pagePath },
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
  ],
})
</script>

<template>
  <GuideArticleView
    category="가격"
    keyword="돌반지 가격 문의"
    title="돌반지 가격 문의 전에 꼭 확인할 3가지"
    lead="돌반지 가격은 '한 개에 얼마'로 딱 정해져 있지 않아요. 금 시세, 무게, 각인 디자인에 따라 달라지기 때문에 이 세 가지를 먼저 알아두시면 상담이 훨씬 수월합니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/ring/SB0101.webp`"
    hero-alt="24K 순금 돌반지"
    :quick-answers="[
      '가격은 금 시세 + 무게 + 제작 난이도로 정해져요.',
      '예산과 수령일을 먼저 정해두시면 상담이 훨씬 빨라집니다.',
      '정확한 금액은 상담 당일 시세 기준으로 안내드려요.'
    ]"
    :sections="[
      {
        title: '가격이 달라지는 세 가지 이유',
        paragraphs: ['디자인만 보고 가격이 정해진다고 생각하시는 분들이 많은데, 사실은 금 시세와 무게가 더 큰 비중을 차지해요.'],
        bullets: ['금 시세 — 상담하시는 날의 시세가 반영돼요', '무게 — 1돈 기준으로 가격대가 달라져요', '작업비 — 각인이나 디테일이 많을수록 추가돼요']
      },
      {
        title: '상담 전에 이것만 정해두세요',
        paragraphs: ['아래 네 가지만 미리 정리해 오시면 견적도 빠르고 정확해져요. 돌잔치 날짜가 정해져 있다면 꼭 먼저 알려주세요.'],
        bullets: ['대략적인 예산 범위', '원하시는 무게(또는 사이즈)', '각인 문구를 넣을지 여부', '받으실 날짜']
      },
      {
        title: '다른 곳과 비교하실 때',
        paragraphs: ['가격만 단순 비교하면 포함된 항목이 달라서 오히려 헷갈릴 수 있어요. 같은 조건으로 맞춰서 비교해보세요.'],
        bullets: ['각인 비용이 포함된 가격인지', '케이스나 보증서가 함께 제공되는지', '추가 작업비가 별도로 붙는 조건은 없는지']
      }
    ]"
    :cautions="[
      '전화로 안내드린 대략적인 견적과 최종 금액은 다를 수 있어요.',
      '무게나 각인 조건이 바뀌면 가격도 함께 달라집니다.'
    ]"
    :related-links="[
      { to: '/baby-gold', label: '돌반지 보러가기', description: '제품과 제작 과정을 확인하세요' },
      { to: '/custom', label: '주문제작 안내', description: '맞춤 디자인으로 만들고 싶다면' },
      { to: '/contact', label: '문의하기', description: '견적이나 일정 상담' }
    ]"
  />
</template>
