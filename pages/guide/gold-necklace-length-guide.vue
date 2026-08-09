<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-necklace-length-guide'
const pageTitle = '남자·여자 목걸이 길이 추천: 42·45·50cm 비교 | 귀족'
const pageDescription = '금목걸이 길이 추천 기준을 42cm, 45cm, 50cm 중심으로 정리했습니다. 체형, 펜던트 크기, 체인 굵기, 선물용 상담 전 확인할 내용을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-length-guide-hero.webp`
const publishedAt = '2026-07-07'
const updatedAt = '2026-08-09'

const faqItems = [
  {
    "question": "여자 금목걸이는 42cm와 45cm 중 어느 길이가 좋나요?",
    "answer": "목선에 가까운 착용감을 원하면 42cm를, 조금 더 여유 있는 착용감을 원하면 45cm를 먼저 비교할 수 있습니다. 목둘레와 펜던트 크기에 따라 실제 위치가 달라지므로 착용 사진이나 기존 목걸이 길이를 함께 확인하는 것이 좋습니다."
  },
  {
    "question": "남자 금목걸이는 50cm가 무난한가요?",
    "answer": "50cm를 우선 비교할 수 있지만 남성 목걸이의 적정 길이를 하나로 정할 수는 없습니다. 목둘레, 체격, 펜던트 크기, 셔츠나 니트 위 착용 여부에 따라 더 짧거나 긴 길이를 상담할 수 있습니다."
  },
  {
    "question": "선물용 금목걸이 길이는 어떻게 확인하나요?",
    "answer": "받는 분이 자주 착용하는 목걸이의 전체 길이를 측정하고, 평소 착용 사진과 펜던트 선호도를 확인해 보세요. 기존 제품이 없다면 원하는 목 위치와 옷차림 정보를 준비해 상담하는 방법이 좋습니다."
  },
  {
    "question": "금목걸이 길이를 나중에 늘리거나 줄일 수 있나요?",
    "answer": "체인 구조, 잠금장치, 연결 장식, 같은 체인 부품의 확보 여부에 따라 달라집니다. 실물 확인 없이 가능 여부를 단정하기 어려우므로 현재 길이와 원하는 길이를 정리해 상담해야 합니다."
  },
  {
    "question": "금목걸이를 고를 때 길이 외에 무엇을 확인해야 하나요?",
    "answer": "체인 굵기와 구조, 펜던트 구성, 금 순도 표시, 순도 표시를 보증하는 제조자 또는 사업자 표시를 함께 확인하세요. 금 순도와 제품 구성은 길이와 별도의 구매 확인 항목입니다."
  }
]

const quickAnswers = [
  "금목걸이 길이는 42cm, 45cm, 50cm를 기준으로 체형과 펜던트 크기를 함께 비교하는 것이 좋습니다.",
  "여성 데일리 목걸이는 42cm와 45cm를, 남성 목걸이는 50cm 전후를 먼저 비교할 수 있지만 목둘레와 취향에 따라 달라집니다.",
  "선물용이라면 기존 목걸이 길이, 평소 입는 옷, 펜던트 크기를 확인해 상담할 때 전달하면 선택 범위를 좁히는 데 도움이 됩니다."
]

const sections = [
  {
    "title": "42cm·45cm·50cm를 먼저 비교하는 방법",
    "paragraphs": [
      "목선에 비교적 가깝게 올라오는 길이를 원한다면 42cm를 검토할 수 있습니다. 45cm는 조금 더 여유 있는 기본 길이로 비교하기 좋고, 50cm는 목에서 더 내려오는 착용감이나 셔츠와 니트 위 착용을 원할 때 후보가 될 수 있습니다.",
      "Jewelers of America는 국제 주얼리 업계 기관으로, 목걸이를 칼라, 초커, 프린세스, 마티네, 오페라, 로프 등의 길이로 나누어 각 구간을 인치로 안내합니다. 그중 17~19인치 프린세스 길이는 목뼈 아래에 놓이는 길이로 소개되므로, 쇄골 부근 착용을 원할 때 참고할 수 있습니다."
    ],
    "bullets": [
      "42cm: 목선에 가까운 짧은 길이를 원할 때 비교",
      "45cm: 답답함과 여유 사이의 균형을 비교할 때 적합한 후보",
      "50cm: 더 여유 있는 착용감이나 옷 위 착용을 원할 때 비교",
      "실제 위치는 목둘레와 체형에 따라 달라질 수 있음"
    ]
  },
  {
    "title": "펜던트 크기와 착용 위치를 함께 보기",
    "paragraphs": [
      "체인 자체의 위치와 목 주변의 답답함은 펜던트가 없을 때 길이 선택에 크게 영향을 줍니다. 펜던트가 있는 경우에는 장식의 세로 길이와 무게에 따라 시선이 머무는 위치가 달라질 수 있으므로, 체인 길이와 함께 확인해야 합니다.",
      "우선 작은 펜던트는 42cm와 45cm를 비교해 볼 수 있습니다. 세로로 긴 펜던트나 존재감 있는 장식은 45cm와 50cm를 함께 대보는 방식이 실용적입니다. 최종 어울림은 펜던트의 실제 크기와 체인 구조까지 확인한 뒤 판단해야 합니다."
    ],
    "bullets": [
      "작은 펜던트: 42cm와 45cm를 함께 비교",
      "세로로 긴 펜던트: 45cm 이상을 우선 검토",
      "큰 펜던트: 목걸이 길이와 체인 굵기를 함께 확인",
      "겹쳐 착용할 때는 서로 다른 길이를 비교해 장식이 겹치는지 확인"
    ],
    "image": {
      "src": "/Image/guide/gold-necklace-length-guide-section-2.webp",
      "alt": "펜던트 크기에 따라 금목걸이 길이를 비교하는 모습",
      "caption": "펜던트의 크기와 세로 길이에 따라 같은 체인의 적정 착용 위치가 달라질 수 있습니다."
    }
  },
  {
    "title": "체인 굵기와 소재 표시 확인하기",
    "paragraphs": [
      "체인 굵기와 펜던트 구성은 길이를 정할 때 함께 확인해야 하는 항목입니다. 길이가 같아도 체인 구조와 굵기에 따라 보이는 느낌과 착용감이 달라질 수 있습니다. 중량과 상담 금액 역시 제품 구성에 따라 달라질 수 있습니다.",
      "금목걸이를 구매할 때는 금 순도 표시와 그 표시를 보증하는 제조자 또는 사업자 표시를 확인해야 합니다. 14K, 18K와 같은 순도 표시는 길이와 별개의 구매 확인 항목입니다. 따라서 제품 설명과 실물을 함께 살펴봐야 합니다."
    ],
    "bullets": [
      "길이와 체인 굵기를 함께 비교",
      "펜던트와 잠금장치가 포함되는지 확인",
      "14K, 18K 등 금 순도 표시 확인",
      "순도 표시를 보증하는 제조자 또는 사업자 표시 확인"
    ]
  },
  {
    "title": "선물용 주문 전에 준비할 정보",
    "paragraphs": [
      "받는 사람의 목둘레를 직접 재기 어려울 수 있어 선물용 금목걸이의 길이를 정할 때는 다른 방법으로 확인해야 합니다. 평소 편하게 착용하는 목걸이가 있다면 잠금장치를 포함한 전체 길이를 펼쳐 측정할 수 있습니다. 착용 사진이나 원하는 목 위치도 함께 확인하는 것이 좋습니다.",
      "상담 전에는 평소 셔츠나 니트를 자주 입는지 정리해 두는 것이 좋습니다. 펜던트를 함께 착용하는지도 확인해야 합니다. 목에 붙는 느낌과 여유 있는 느낌 중 어느 쪽을 선호하는지 정리하면 상담에 도움이 됩니다."
    ],
    "bullets": [
      "기존 목걸이의 전체 길이",
      "평소 목걸이를 착용하는 위치",
      "펜던트의 유무와 대략적인 크기",
      "평소 입는 옷과 원하는 착용감",
      "원하는 금 순도 표시와 디자인"
    ],
    "image": {
      "src": "/Image/guide/gold-necklace-length-guide-section-4.webp",
      "alt": "선물용 주문 전에 준비할 정보 예시 이미지",
      "caption": "선물용 주문 전에 준비할 정보에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "기존 목걸이의 길이 조절을 상담할 때",
    "paragraphs": [
      "이미 가진 금목걸이가 짧거나 길다면 먼저 체인 구조와 잠금장치 상태를 확인해야 합니다. 줄이기나 늘리기의 작업 방식과 결과는 제품 구조와 연결 부위, 같은 체인 확보 여부에 따라 달라질 수 있으므로 실물 상담을 받아야 합니다.",
      "상담 전에는 목걸이 전체 사진과 잠금장치 주변 사진을 준비해야 합니다. 현재 길이와 원하는 길이도 함께 확인해 두어야 합니다. 연장 부품을 사용할지는 제품의 외관과 착용 목적을 함께 살펴본 뒤 결정해야 합니다."
    ],
    "bullets": [
      "현재 목걸이의 전체 길이 측정",
      "체인 중간과 잠금장치 주변 사진 준비",
      "원하는 길이와 늘리거나 줄일 길이 정리",
      "같은 체인 확보 여부와 연결 부위 확인"
    ]
  }
]

const cautions = [
  "42cm, 45cm, 50cm는 비교를 위한 기준일 뿐이며 목둘레와 체형에 따라 실제 착용 위치가 달라질 수 있습니다.",
  "금액과 중량은 금 순도, 체인 굵기, 펜던트와 잠금장치 구성에 따라 상담 시점과 제품별로 달라질 수 있습니다.",
  "길이 조절은 체인 구조와 부품 확보 여부에 따라 작업 방식과 가능 여부가 달라질 수 있어 실물 확인이 필요합니다."
]

const relatedLinks = [
  {
    "to": "/guide/gold-anklet-size-guide",
    "label": "금발찌 길이 재는 법, 발목둘레와 여유 길이 주문 기준",
    "description": "신체 둘레와 원하는 착용 여유를 기준으로 길이를 확인하는 방법을 정리했습니다."
  },
  {
    "to": "/guide/gold-necklace-repair-time",
    "label": "금목걸이 수리 기간, 맡기기 전에 꼭 확인할 것",
    "description": "목걸이 수리 상담 전에 끊어진 위치와 잠금장치 상태를 확인하는 방법을 안내합니다."
  },
  {
    "to": "/guide/mother-necklace-price",
    "label": "어머니 금목걸이, 예산별 선택 방법",
    "description": "소재와 체인 및 펜던트 구성을 비교해 선물용 금목걸이를 고르는 방법을 정리했습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '남자·여자 목걸이 길이 추천: 42·45·50cm 비교'
const gmArticleLead = '금목걸이 길이는 42cm, 45cm, 50cm처럼 숫자만으로 정하기보다 목둘레와 착용 위치를 먼저 살펴보고, 펜던트 크기와 체인 굵기도 함께 비교해야 합니다. 남자와 여자의 기본 길이를 하나로 정하기보다는 평소 목걸이와 원하는 착용감을 기준으로 상담해 보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '금목걸이 길이 추천'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '금목걸이 길이 상담'
const gmHeroAlt = '42cm, 45cm, 50cm 길이의 금목걸이를 비교하는 모습'
const gmSourceNote = '목걸이 길이 분류와 착용 위치는 Jewelers of America 자료를 참고했으며, 금 순도 표시 확인 항목은 Federal Trade Commission의 소비자 안내를 참고했습니다. 42cm, 45cm, 50cm는 상담 시 비교하기 위한 실용적인 기준이며 개인별 착용 위치를 보장하는 수치는 아닙니다.'
const gmSources = [
  {
    "label": "Jewelers of America — Necklaces",
    "url": "https://www.jewelers.org/buying-jewelry/jewelry-styles/necklaces",
    "note": "목걸이 길이별 명칭과 일반적인 인치 범위, 목과 가슴에서의 착용 위치를 제시하는 국제 주얼리 업계 공식 기관 자료입니다."
  },
  {
    "label": "Federal Trade Commission — Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "금목걸이를 구매할 때 금 순도 표시와 품질 표시를 확인해야 한다는 미국 연방기관의 소비자 안내입니다."
  }
]
// guide-manager:data:end

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
        { name: '금목걸이 길이 추천', path: pagePath },
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
        dateModified: updatedAt,
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
    :category="gmArticleCategory"
    :keyword="gmArticleKeyword"
    :inquiry-type="gmInquiryType"
    :inquiry-topic="gmInquiryTopic"
    :title="gmArticleTitle"
    :lead="gmArticleLead"
    :published-at="publishedAt"
    :updated-at="updatedAt || undefined"
    :hero-image="ogImage"
    :hero-alt="gmHeroAlt"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
