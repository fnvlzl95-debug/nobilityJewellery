<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/silver-necklace-repair-possible'
const pageTitle = '은목걸이 수리 가능 여부, 끊어짐·잠금장치·변색별로 정리 | 귀족'
const pageDescription = '은목걸이는 끊어짐, 잠금장치 문제, 변색 정도에 따라 수리 가능 범위가 달라져요. 맡기기 전 확인할 점을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/necklace/pexels-coppertist-wu-16124724.webp`
const publishedAt = '2026-04-08'
const faqItems = [
  {
    question: '끊어진 은목걸이는 대부분 수리가 가능한가요?',
    answer: '단순 끊어짐은 수리가 가능한 경우가 많습니다. 다만 체인 마디 손상이 심하거나 여러 군데 약해져 있으면 보강 범위에 따라 작업이 달라질 수 있어요.',
  },
  {
    question: '변색만 심한 은목걸이도 맡길 수 있나요?',
    answer: '네. 변색은 세척과 광택으로 개선되는 경우가 많습니다. 다만 도금이 벗겨졌거나 표면 손상이 있으면 추가 마감이 필요할 수 있습니다.',
  },
  {
    question: '잠금장치가 자꾸 풀리는데 이것도 수리 대상인가요?',
    answer: '가능합니다. 잠금장치 자체 문제인지, 연결 부위 마모인지에 따라 교체 또는 보강 방식이 달라질 수 있어요.',
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
        { name: '은목걸이 수리 가능 여부', path: pagePath },
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
    category="방법"
    keyword="은목걸이 수리 가능 여부"
    inquiry-type="repair"
    inquiry-topic="은목걸이 수리"
    title="은목걸이 수리 가능 여부, 끊어짐·잠금장치·변색별로 정리"
    lead="은목걸이는 금목걸이보다 변색이나 얇은 체인 끊어짐 문의가 많은 편입니다. 다만 모든 제품이 똑같이 수리되는 것은 아니고, 끊어진 위치와 잠금장치 상태, 도금 여부에 따라 작업 범위가 달라집니다. 맡기기 전에 어떤 점을 먼저 보면 좋은지 정리했습니다."
    :published-at="publishedAt"
    :hero-image="`${siteConfig.url}/Image/necklace/pexels-coppertist-wu-16124724.webp`"
    hero-alt="은목걸이 체인 수리 가능 여부 안내 이미지"
    :quick-answers="[
      '단순 끊어짐과 잠금장치 문제는 수리가 가능한 경우가 많아요.',
      '변색은 세척과 광택으로 개선될 수 있지만 표면 손상 여부를 같이 봐야 합니다.',
      '정확한 수리 가능 범위는 체인 상태와 도금 여부 확인 후 안내드려요.'
    ]"
    :sections="[
      {
        title: '수리 가능 여부를 가르는 대표 조건',
        paragraphs: ['은목걸이는 같은 끊어짐처럼 보여도 실제 상태가 다를 수 있어요. 한 군데만 벌어진 것인지, 여러 마디가 약해진 것인지에 따라 단순 연결로 끝날지 보강까지 필요한지가 달라집니다.'],
        bullets: ['끊어진 위치가 한 군데인지 여러 군데인지', '잠금장치만 문제인지 체인 마디까지 손상됐는지', '도금 제품인지 일반 실버 제품인지', '펜던트와 연결 부위까지 영향을 받았는지']
      },
      {
        title: '증상별로 많이 묻는 수리 유형',
        paragraphs: ['문의가 많은 은목걸이 증상은 크게 끊어짐, 잠금장치 문제, 변색 세 가지로 나뉩니다. 각각 필요한 작업이 달라서 처음 상담 때 증상을 구분해서 알려주시는 편이 좋아요.'],
        bullets: ['끊어짐 — 연결과 보강 작업 여부 확인', '잠금장치 헐거움 — 교체 또는 연결 부위 보강 가능성 확인', '변색 — 세척·광택 또는 재도금 필요 여부 확인', '체인 늘어짐 — 전체 강도와 추가 손상 여부 확인']
      },
      {
        title: '방문 전 사진으로 확인하면 좋은 점',
        paragraphs: ['실물 확인이 가장 정확하지만, 사진만으로도 대략적인 방향은 먼저 잡을 수 있습니다. 특히 수령 희망일이 있거나 이미 다른 곳에서 수리한 이력이 있으면 꼭 같이 알려주셔야 해요.'],
        bullets: ['끊어진 부위가 잘 보이는 근접 사진', '잠금장치 부분 확대 사진', '전체 길이와 체인 타입이 보이는 사진', '예전 수리 이력이나 도금 여부']
      },
      {
        title: '수리보다 교체가 나은 경우도 있어요',
        paragraphs: ['체인이 여러 곳에서 약해졌거나 너무 얇아 반복적으로 끊어지는 상태라면 수리만으로 오래 쓰기 어려울 수 있습니다. 이런 경우는 단순 연결보다 전체 교체나 다른 방식 제안이 더 현실적일 때도 있습니다.'],
        bullets: ['체인 마디가 전반적으로 많이 닳은 경우', '이전에 같은 부위를 여러 번 수리한 경우', '도금 손상과 구조 손상이 함께 있는 경우', '착용 중 다시 끊어질 위험이 큰 경우']
      }
    ]"
    :cautions="[
      '은목걸이 수리는 겉보기보다 체인 강도와 도금 상태가 더 중요할 수 있습니다.',
      '잠금장치 문제처럼 보여도 연결 부위 전체 점검이 필요한 경우가 있어요.'
    ]"
    :faq-items="faqItems"
    :related-links="[
      { to: '/guide/gold-necklace-repair-time', label: '금목걸이 수리 기간', description: '목걸이 수리 일정 기준을 함께 보세요' },
      { to: '/repair', label: '수리·AS 안내', description: '가능한 작업 범위를 확인하세요' },
      { to: '/contact', label: '문의하기', description: '사진 기준으로 수리 가능 여부 상담' }
    ]"
  />
</template>
