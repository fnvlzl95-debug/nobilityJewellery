<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/baby-ring-production-time'
const pageTitle = '돌반지 주문제작 기간, 일정 맞추는 가장 확실한 방법 | 귀족'
const pageDescription = '디자인, 각인 여부에 따라 돌반지 제작 기간이 달라져요. 돌잔치 일정에 맞추는 방법을 알려드립니다.'
const ogImage = `${siteConfig.url}/Image/ring/SB0102.webp`
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
        { name: '돌반지 주문제작 기간', path: pagePath },
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
    category="기간"
    keyword="돌반지 주문제작 기간"
    title="돌반지 주문제작 기간, 일정 맞추는 가장 확실한 방법"
    lead="돌반지 제작은 디자인과 각인에 따라 걸리는 시간이 달라요. 받으실 날짜를 먼저 알려주시면 거기에 맞춰서 안내드릴 수 있습니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/ring/SB0102.webp`"
    hero-alt="돌반지 주문제작 기간 상담"
    :quick-answers="[
      '제작 기간은 디자인, 무게, 각인 작업 수에 따라 달라져요.',
      '일정이 촉박하시면 상담 때 받으실 날짜를 먼저 말씀해주세요.',
      '돌잔치 날짜가 정해져 있다면 여유 있게 상담을 시작하시는 게 좋아요.'
    ]"
    :sections="[
      {
        title: '제작 기간이 달라지는 이유',
        paragraphs: ['돌반지는 기성품과 달리 주문 후 만들기 때문에 작업 내용에 따라 기간이 달라져요. 어떤 작업이 들어가는지 미리 알아두시면 일정 잡기가 쉽습니다.'],
        bullets: ['디자인이 복잡할수록 시간이 더 걸려요', '각인 문구가 길거나 특수하면 추가 시간이 필요해요', '마감·검수 과정도 기간에 포함됩니다']
      },
      {
        title: '상담할 때 이 순서로 말씀해주세요',
        paragraphs: ['제품 정보보다 일정을 먼저 알려주시는 게 더 효율적이에요. 날짜에 맞춰서 가능한 옵션을 안내드릴 수 있거든요.'],
        bullets: ['받으실 날짜를 먼저 알려주세요', '꼭 필요한 조건(무게, 각인)부터 정해주세요', '나머지 디자인 옵션은 그 안에서 조절 가능해요']
      },
      {
        title: '돌잔치가 정해져 있다면',
        paragraphs: ['행사 날짜가 있으면 여유 있게 준비하시는 게 가장 중요해요. 제작이 끝난 뒤 검수하고 수령하는 시간도 따로 생각해두세요.'],
        bullets: ['행사 전 넉넉한 여유 기간을 두세요', '받으시는 방법(방문 or 택배)도 미리 정해주세요', '최종 확인 일정을 함께 잡아두면 안심이에요']
      }
    ]"
    :cautions="[
      '제작 중에 사양을 변경하시면 수령일이 늦어질 수 있어요.',
      '행사 직전에 주문하시면 선택 가능한 디자인이 제한될 수 있습니다.'
    ]"
    :related-links="[
      { to: '/baby-gold', label: '돌반지 보러가기', description: '제품 종류와 제작 과정' },
      { to: '/custom', label: '주문제작 안내', description: '맞춤 제작은 이렇게 진행돼요' },
      { to: '/contact', label: '문의하기', description: '일정 상담을 원하시면' }
    ]"
  />
</template>
