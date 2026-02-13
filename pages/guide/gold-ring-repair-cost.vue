<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-ring-repair-cost'
const pageTitle = '금반지 수리 비용: 작업별로 달라지는 기준 | 귀족'
const pageDescription = '금반지 수리 비용은 사이즈 조절, 땜, 재세팅 등 작업마다 달라져요. 맡기기 전에 확인해두면 좋은 점을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/pexels-leah-newhouse-50725-691046.webp`
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
        { name: '금반지 수리 비용', path: pagePath },
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
    category="비용"
    keyword="금반지 수리 비용"
    title="금반지 수리 비용: 작업별로 달라지는 기준"
    lead="금반지 수리라고 해서 비용이 다 같지는 않아요. 어떤 작업이 필요한지, 손상이 어느 정도인지에 따라 비용과 기간이 달라집니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/ring/pexels-leah-newhouse-50725-691046.webp`"
    hero-alt="금반지 수리 작업"
    :quick-answers="[
      '비용은 작업 종류(사이즈 조절, 땜, 재세팅)에 따라 달라져요.',
      '손상이 클수록 재료와 작업이 추가되어 비용이 올라갑니다.',
      '정확한 금액은 실물을 보고 안내드려요.'
    ]"
    :sections="[
      {
        title: '수리 종류에 따라 비용이 달라요',
        paragraphs: ['같은 금반지라도 어떤 수리를 하느냐에 따라 작업 과정이 완전히 달라져요. 비용을 비교하실 때는 어떤 작업이 포함되는지부터 확인해보세요.'],
        bullets: ['사이즈 조절 — 몇 호나 줄이고 늘리는지에 따라 달라요', '땜·연결 수리 — 끊어진 부위와 보강 범위에 따라 달라요', '보석 재세팅 — 세팅 틀 상태와 보석 컨디션에 따라 달라요']
      },
      {
        title: '기간은 얼마나 걸리나요',
        paragraphs: ['비용과 함께 기간도 미리 확인해두시면 일정 잡기가 편해요.'],
        bullets: ['당일 처리가 가능한 작업인지', '부속이나 재료를 따로 준비해야 하는지', '세척·광택 마감까지 포함되는지']
      },
      {
        title: '전화할 때 이것만 알려주세요',
        paragraphs: ['전화로 상태를 미리 알려주시면 방문했을 때 훨씬 빠르게 진행할 수 있어요.'],
        bullets: ['손상 부위 사진 (찍어서 카톡으로 보내주셔도 돼요)', '언제까지 받으셔야 하는지', '이전에 수리한 적이 있는지']
      }
    ]"
    :cautions="[
      '인터넷에서 보신 평균 금액은 참고용이에요. 실제 비용은 실물 상태에 따라 달라집니다.',
      '보석이 세팅된 반지는 단순 사이즈 수리보다 작업이 더 들어갈 수 있어요.'
    ]"
    :related-links="[
      { to: '/repair', label: '수리·AS 안내', description: '어떤 수리가 가능한지 확인하세요' },
      { to: '/faq', label: '자주 묻는 질문', description: '수리 관련 궁금증 모음' },
      { to: '/contact', label: '문의하기', description: '수리 상담을 원하시면' }
    ]"
  />
</template>
