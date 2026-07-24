<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-bracelet-chain-repair'
const pageTitle = '목걸이 끊어짐·팔찌 잠금장식 수리, 종로에서 맡기기 전 체크 | 귀족'
const pageDescription = '목걸이 끊어짐, 팔찌 체인 수리, 잠금장식 교체를 맡기기 전 확인할 손상 부위, 부속, 일정 상담 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/necklace/NC0301.webp`
const publishedAt = '2026-05-28'
const faqItems = [
  {
    question: '목걸이가 끊어졌는데 사진만으로 상담할 수 있나요?',
    answer: '끊어진 위치와 체인 형태가 보이는 사진이면 1차 상담이 가능합니다. 정확한 작업 범위는 실물 확인 후 안내됩니다.',
  },
  {
    question: '팔찌 잠금장식만 교체할 수 있나요?',
    answer: '가능한 경우가 많습니다. 다만 기존 체인 굵기와 맞는 부속이 필요하므로 잠금장식과 연결 고리 사진을 함께 보내주세요.',
  },
  {
    question: '수리할 때 세척이나 광택도 같이 맡길 수 있나요?',
    answer: '상담 가능합니다. 수리만 필요한지, 세척·광택까지 원하는지 처음에 알려주시면 일정 안내가 더 정확해집니다.',
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
        { name: '목걸이·팔찌 체인 수리', path: pagePath },
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
    category="수리"
    keyword="목걸이 끊어짐 팔찌 잠금장식 수리"
    inquiry-type="repair"
    inquiry-topic="목걸이·팔찌 체인 수리"
    title="목걸이 끊어짐·팔찌 잠금장식 수리, 종로에서 맡기기 전 체크"
    lead="목걸이나 팔찌가 끊어졌을 때는 끊어진 위치, 체인 형태, 잠금장식 상태에 따라 상담 내용이 달라집니다. 방문 전에 어떤 사진과 정보를 준비하면 좋은지 정리했습니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/necklace/NC0301.webp`"
    hero-alt="목걸이 체인 수리 상담"
    :quick-answers="[
      '체인 끊어짐은 손상 위치와 보강 필요 여부를 먼저 확인합니다.',
      '잠금장식 교체는 체인 굵기와 연결 고리 형태가 중요합니다.',
      '사진을 카톡으로 보내주시면 방문 전 상담이 빨라집니다.'
    ]"
    :sections="[
      {
        title: '끊어진 위치를 먼저 확인하세요',
        paragraphs: ['같은 목걸이 끊어짐이라도 체인 중간이 끊어진 경우와 잠금장식 근처가 끊어진 경우는 작업 방식이 달라질 수 있습니다. 사진을 찍을 때는 끊어진 부위 주변까지 넓게 보여주는 것이 좋습니다.'],
        bullets: ['체인 중간 끊어짐', '잠금장식 연결 부위 손상', '고리 벌어짐 또는 변형', '펜던트 연결부 손상']
      },
      {
        title: '팔찌 잠금장식은 부속 확인이 중요합니다',
        paragraphs: ['팔찌는 손목에서 계속 움직이는 제품이라 잠금장식과 연결 고리 상태가 중요합니다. 기존 부속과 맞는 형태를 확인해야 자연스럽게 수리할 수 있습니다.'],
        bullets: ['잠금장식 전체 사진', '체인 굵기와 연결 고리 사진', '잠금이 헐거운지 완전히 파손됐는지', '분실된 부속이 있는지']
      },
      {
        title: '상담 전에 정리할 내용',
        paragraphs: ['급한 일정이 있거나 선물용 제품이라면 처음 상담 때 일정과 사용 목적을 함께 알려주세요. 수리만 할지, 세척과 광택까지 함께 맡길지도 미리 정하면 좋습니다.'],
        bullets: ['수령 희망일', '수리만 필요한지 광택까지 원하는지', '제품 소재를 알고 있는지', '이전에 수리한 적이 있는지']
      }
    ]"
    :cautions="[
      '체인이 많이 닳아 있는 경우 단순 연결보다 추가 보강 상담이 필요할 수 있습니다.',
      '부속 분실 여부에 따라 최종 작업 방식은 실물 확인 후 달라질 수 있습니다.'
    ]"
    :faq-items="faqItems"
    :related-links="[
      { to: '/guide/necklace-untangling-guide', label: '엉킨 목걸이 푸는 법', description: '매듭과 체인 손상 줄이는 순서' },
      { to: '/repair', label: '수리·AS 안내', description: '체인 외 수리 가능 항목 보기' },
      { to: '/guide/gold-necklace-repair-time', label: '금목걸이 수리 기간', description: '수리 일정 기준 확인' },
      { to: '/contact', label: '문의하기', description: '사진으로 체인 수리 상담' }
    ]"
  />
</template>
