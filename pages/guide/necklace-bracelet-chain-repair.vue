<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-bracelet-chain-repair'
const pageTitle = '목걸이 끊어짐 수리 전 확인할 곳 | 팔찌 체인·잠금장식 상담 | 귀족'
const pageDescription = '목걸이·팔찌가 끊어졌다면 먼저 체인 중간, 잠금장식 연결부, 고리와 분실 부속을 확인하세요. 사진으로 1차 상담할 때 필요한 촬영 범위와 실물 확인 전 점검 순서를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-bracelet-chain-repair-hero.webp`
const publishedAt = '2026-05-28'
const updatedAt = '2026-08-05'
const faqItems = [
  {
    "question": "목걸이가 끊어졌는데 사진만으로 상담할 수 있나요?",
    "answer": "제품 전체와 끊어진 위치, 체인 형태, 잠금장식과 연결 고리가 보이는 사진으로 1차 상담을 요청할 수 있습니다. 정확한 작업 범위와 일정은 실물 확인 후 안내받으세요."
  },
  {
    "question": "팔찌 잠금장식만 교체할 수 있나요?",
    "answer": "잠금장식 교체 여부는 기존 체인 굵기, 연결 고리 형태, 부속 수급 가능 여부와 제품 상태를 확인한 뒤 판단합니다."
  },
  {
    "question": "체인 중간이 끊어진 경우 어떤 방식으로 수리하나요?",
    "answer": "손상된 링크를 확인하고 필요한 경우 손상 부위를 정리한 뒤 건전한 링크를 연결하고 납땜하는 방식이 사용될 수 있습니다. 체인 구조와 상태에 따른 최종 방식은 실물 확인이 필요합니다."
  },
  {
    "question": "수리할 때 세척이나 광택도 같이 맡길 수 있나요?",
    "answer": "세척·광택을 함께 원하는 경우 상담할 때 요청할 수 있지만, 제공 여부와 작업 범위는 제품 상태와 매장 정책을 확인한 뒤 안내받아야 합니다."
  }
]

const quickAnswers = [
  "목걸이와 팔찌의 수리 방식은 끊어진 위치, 체인 형태, 잠금장식 상태와 분실 부속 여부를 실물로 확인해 정합니다.",
  "사진 상담은 끊어진 부위만 확대하지 말고 제품 전체, 손상 부위 주변, 잠금장식과 연결 고리가 함께 보이게 촬영하면 좋습니다.",
  "수령 희망일·세척 또는 광택 희망 여부는 상담 때 전달하되, 작업 가능 범위와 일정은 제품 상태를 확인한 뒤 안내받으세요."
]

const sections = [
  {
    "title": "제품 전체와 손상 부위를 함께 촬영하세요",
    "paragraphs": [
      "사진으로 1차 상담을 준비할 때에는 끊어진 부분만 가까이 촬영하지 말고 제품 전체와 손상 부위 주변을 함께 촬영합니다. 상담에 필요한 정보는 체인 구조와 손상 위치를 함께 확인할 수 있어야 더 잘 전달됩니다."
    ],
    "bullets": [
      "제품 전체가 보이는 사진",
      "끊어진 부위와 주변 링크를 확대한 사진",
      "잠금장식과 연결 고리가 보이는 사진",
      "분실되었거나 따로 보관 중인 부속 사진"
    ],
    "image": {
      "src": "/Image/guide/necklace-bracelet-chain-repair-section-1.webp",
      "alt": "목걸이 전체와 끊어진 체인 주변을 함께 촬영하는 모습",
      "caption": ""
    }
  },
  {
    "title": "체인 중간·연결 고리·잠금장식으로 위치를 구분하세요",
    "paragraphs": [
      "같은 끊어짐이라도 손상된 위치가 체인 중간인지, 잠금장식 연결부인지, 고리인지, 펜던트 연결부인지에 따라 확인할 내용이 달라질 수 있습니다. 가는 체인은 손상된 링크 상태를 먼저 살핀 뒤, 필요한 경우 손상 부위를 정리합니다. 이후 건전한 링크를 다시 연결하고 납땜하는 방식이 사용될 수 있습니다."
    ],
    "bullets": [
      "체인 중간의 링크가 끊어졌는지 확인",
      "잠금장식과 체인을 잇는 고리가 벌어지거나 변형되었는지 확인",
      "펜던트 연결부의 고리와 체인 손상을 구분",
      "체인 링크의 형태와 손상 부위 주변 상태 확인"
    ],
    "image": {
      "src": "/Image/guide/necklace-bracelet-chain-repair-section-2.webp",
      "alt": "체인 중간과 잠금장식 연결 고리의 손상 위치를 비교하는 모습",
      "caption": ""
    }
  },
  {
    "title": "팔찌 잠금장식은 체인과 부속을 함께 확인하세요",
    "paragraphs": [
      "팔찌 잠금장식의 교체 여부는 기존 체인 굵기와 연결 고리 형태, 분실 부속 여부 및 제품 상태를 확인한 뒤 판단합니다. 상담에는 잠금장식만 보이는 사진보다 체인 끝과 연결부가 함께 보이는 사진이 더 적합합니다."
    ],
    "bullets": [
      "잠금장식 전체 형태",
      "체인 굵기와 연결 고리 형태",
      "잠금이 헐거운지 또는 파손되었는지",
      "분실된 고리·부속이 있는지",
      "이전에 수리한 흔적이 있는지"
    ],
    "image": {
      "src": "/Image/guide/necklace-bracelet-chain-repair-section-3.webp",
      "alt": "팔찌 잠금장식과 체인 연결부를 점검하는 모습",
      "caption": ""
    }
  },
  {
    "title": "사진 상담부터 실물 확인까지의 순서",
    "paragraphs": [
      "사진 상담은 제품 구조와 손상 위치를 파악하기 위한 1차 확인입니다. 실제 작업 가능 범위와 연결 또는 부속 관련 판단은 제품 상태를 확인한 뒤 안내받습니다. 필요한 추가 작업과 일정도 같은 확인 후 안내받습니다."
    ],
    "bullets": [
      "제품 전체·손상 부위·잠금장식 사진 준비",
      "체인 중간·연결 고리·잠금장식 중 손상 위치 구분",
      "분실 부속, 이전 수리 이력, 소재를 알고 있다면 함께 전달",
      "수령 희망일과 세척·광택 희망 여부 전달",
      "실물 확인 후 최종 작업 범위와 상담 내용 확인"
    ]
  },
  {
    "title": "수리 전 함께 확인할 관리 사항",
    "paragraphs": [
      "손상된 체인은 억지로 굽히거나 강한 힘으로 당기지 않는 편이 좋습니다. 손상 부위를 임의로 조정하기보다 분리된 부속을 함께 보관하고, 전문 수리 상담에서 제품 전체와 연결부 상태를 보여주세요. 은 소재 목걸이는 끊어짐 외에 잠금장치와 변색 상태를 함께 확인할 수 있으며, 진주 목걸이는 체인 수리와 달리 줄 교체 기준을 살펴볼 필요가 있습니다."
    ],
    "bullets": [
      "손상 부위를 억지로 당기거나 펴지 않기",
      "분리된 부속은 버리지 말고 함께 보관하기",
      "체인 전체의 마모나 변형도 함께 확인하기",
      "은 소재 목걸이는 끊어짐·잠금장치·변색 상태를 구분해 확인하기",
      "진주 목걸이는 줄 교체 기준을 별도로 확인하기"
    ]
  }
]

const cautions = [
  "체인의 구조와 링크 형태, 마모 정도에 따라 확인해야 할 작업 범위가 달라질 수 있습니다.",
  "부속 분실, 이전 수리 흔적, 연결부 변형이 있으면 사진만으로 최종 작업 방식이나 일정을 확정하기 어렵습니다.",
  "세척·광택 제공 여부와 수리 가능 범위는 제품 상태와 상담 시점의 매장 안내를 확인해야 합니다."
]

const relatedLinks = [
  {
    "to": "/guide/silver-necklace-repair-possible",
    "label": "은목걸이 수리 가능 여부, 끊어짐·잠금장치·변색별로 정리",
    "description": "은 소재 목걸이의 끊어짐, 잠금장치 문제, 변색별 확인 기준을 정리했습니다."
  },
  {
    "to": "/guide/pearl-necklace-restringing",
    "label": "진주 목걸이 줄 교체, 종로 수리 전 확인할 것",
    "description": "진주 목걸이는 체인 수리와 다른 줄 교체 기준을 확인할 수 있습니다."
  },
  {
    "to": "/guide/necklace-clasp-types",
    "label": "목걸이 잠금장치 종류, 스프링링·랍스터·토글 차이",
    "description": "잠금장식 형태와 연결 구조를 비교해 상담 전 확인할 수 있습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '목걸이 끊어짐 수리 전 확인할 곳 | 팔찌 체인·잠금장식 상담'
const gmArticleLead = '목걸이나 팔찌가 끊어졌다면 먼저 제품 전체와 손상 부위를 함께 확인합니다. 체인 형태와 끊어진 위치, 잠금장식 및 연결 고리 상태, 분실된 부속 여부에 따라 확인할 작업 범위가 달라질 수 있습니다. 따라서 사진 상담은 참고용으로 활용하고, 최종 판단은 실물 확인 후 받습니다.'
const gmArticleCategory = '수리'
const gmArticleKeyword = '목걸이 끊어짐 팔찌 잠금장식 수리'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '목걸이·팔찌 체인 수리'
const gmHeroAlt = '끊어진 목걸이 체인과 팔찌 잠금장식을 확인하는 수리 상담 장면'
const gmSourceNote = '체인 수리 원리와 일반적인 주얼리 관리 주의는 승인된 GIA 자료를 바탕으로 정리했습니다. 개별 제품의 수리 가능 여부, 부속 수급, 가격, 일정, 세척·광택 제공 여부는 사업자 상담과 실물 확인이 필요합니다.'
const gmSources = [
  {
    "label": "GIA — Bench Tip: Repair a Fine Chain with a Soldering Technique",
    "url": "https://www.gia.edu/bench-tip-repair-fine-chain-with-soldering-technique",
    "note": "손상된 링크를 확인하고 필요한 경우 손상 부위를 제거한 뒤 연결하고 납땜하는 일반적인 가는 체인 수리 원리를 설명합니다."
  },
  {
    "label": "GIA — Tips on Caring for Jewelry",
    "url": "https://www.gia.edu/articles/gia-news-research-tips-caring-jewelry",
    "note": "주얼리 관리와 전문 보석상 점검에 관한 공식 소비자 안내입니다."
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
