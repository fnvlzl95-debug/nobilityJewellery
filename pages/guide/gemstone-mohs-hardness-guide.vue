<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gemstone-mohs-hardness-guide'
const pageTitle = '보석 모스 경도 순위: 다이아 10·루비·사파이어 9 | 귀족'
const pageDescription = '보석 모스 경도는 긁힘 저항을 나타내는 상대 척도입니다. 다이아몬드 10, 루비·사파이어가 속하는 강옥 9, 수정 계열 7을 비교하고 충격과 보관 기준을 확인하세요.'
const ogImage = `${siteConfig.url}/Image/guide/gemstone-mohs-hardness-guide-hero.webp`
const publishedAt = '2026-07-11'
const updatedAt = '2026-08-25'

const faqItems = [
  {
    "question": "모스 경도가 가장 높은 보석은 무엇인가요?",
    "answer": "다이아몬드가 모스 경도 10으로 모스 척도의 가장 높은 기준 광물입니다. 다만 경도는 긁힘 저항을 뜻하므로 강한 충격에도 반드시 손상되지 않는다는 의미는 아닙니다."
  },
  {
    "question": "루비와 사파이어의 모스 경도는 다른가요?",
    "answer": "루비와 사파이어는 모두 강옥 계열로 모스 경도 9입니다. 두 보석의 경도 수치가 같더라도 실제 관리에는 세팅과 착용 환경을 함께 고려해야 합니다."
  },
  {
    "question": "모스 경도 숫자가 높으면 매일 착용해도 되나요?",
    "answer": "경도가 높은 보석은 긁힘 저항을 판단하는 데 참고가 될 수 있지만, 매일 착용 가능 여부를 경도만으로 결정할 수는 없습니다. 충격, 인성, 안정성, 세팅 보호 정도를 함께 확인해야 합니다."
  },
  {
    "question": "집에서 보석을 긁어 경도를 확인해도 되나요?",
    "answer": "권장하지 않습니다. 완성된 주얼리에 직접 긁기 시험을 하면 보석이나 금속 표면이 영구적으로 손상될 수 있습니다. 보석 종류가 불확실하면 전문 감별 상담을 받아보세요."
  }
]

const quickAnswers = [
  "모스 경도는 긁힘 저항을 나타내는 상대 척도이며, 숫자가 높아도 충격 손상이 없다는 뜻은 아닙니다.",
  "다이아몬드는 10, 루비·사파이어가 속하는 강옥은 9, 수정 계열은 7로 안내할 수 있습니다.",
  "보석은 경도만으로 관리법을 정할 수 없으므로 종류와 처리 여부를 확인하고 서로 닿지 않게 보관하는 편이 좋습니다."
]

const sections = [
  {
    "title": "보석 모스 경도 한눈에 보기",
    "paragraphs": [
      "활석 1부터 다이아몬드 10까지의 기준 광물을 사용해 상대적인 긁힘 저항을 비교하는 것이 모스 척도입니다. 아래 수치는 승인된 자료에서 확인되는 대표 기준과 보석 예시를 중심으로 정리한 것입니다.",
      "충격 저항을 뜻하는 것이 아니라, 모스 경도는 긁힘 기준입니다."
    ],
    "bullets": [
      "다이아몬드 | 모스 경도 10 | 긁힘 저항이 가장 높은 기준 광물",
      "루비·사파이어 | 강옥, 모스 경도 9 | 높은 긁힘 저항",
      "수정 계열 | 석영, 모스 경도 7 | 경도 비교 시 석영 기준 적용",
      "경도와 인성은 서로 다른 성질이므로 착용 환경을 함께 확인"
    ]
  },
  {
    "title": "보석 모스 경도는 긁힘 저항을 뜻합니다",
    "paragraphs": [
      "모스 경도는 1부터 10까지 사용하며, 광물이 다른 물질에 의해 긁히는 것에 얼마나 저항하는지를 비교하는 상대 척도입니다. 숫자가 높으면 비교 대상에 대한 긁힘 저항이 높은 것으로 해석할 수 있습니다.",
      "모스 숫자는 균등한 측정 단위가 아니므로, 산술 점수처럼 해석하지 않아야 합니다. 다이아몬드 10은 강옥 9보다 숫자로 한 단계 높지만 실제 경도 차이는 매우 큽니다."
    ],
    "bullets": [
      "경도는 주로 긁힘 저항과 관련됩니다.",
      "인성은 충격으로 깨지거나 쪼개지는 데 대한 저항입니다.",
      "경도가 높다고 충격에 반드시 강한 것은 아닙니다.",
      "보석의 내구성은 경도와 인성 등 여러 성질을 함께 살펴야 합니다."
    ],
    "image": {
      "src": "/Image/guide/gemstone-mohs-hardness-guide-section-2.webp",
      "alt": "보석 모스 경도는 긁힘 저항을 뜻합니다 예시 이미지",
      "caption": "보석 모스 경도는 긁힘 저항을 뜻합니다에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "자주 쓰는 보석 모스 경도 순위",
    "paragraphs": [
      "활석 1, 석고 2, 방해석 3, 형석 4, 인회석 5, 정장석 6, 석영 7, 황옥 8, 강옥 9, 다이아몬드 10이 모스 척도의 기준 광물입니다.",
      "석영은 보석 예시에서 7로, 루비와 사파이어가 속하는 강옥은 9로, 다이아몬드는 10으로 설명됩니다. 다만 실제 제품을 관리할 때에는 보석의 종류와 처리 여부를 먼저 살피고 세팅 상태도 별도로 확인해야 합니다."
    ],
    "bullets": [
      "10: 다이아몬드",
      "9: 강옥 계열인 루비·사파이어",
      "8: 황옥, 보석명으로는 토파즈로도 알려짐",
      "7: 석영과 수정 계열"
    ]
  },
  {
    "title": "높은 경도도 충격 손상을 막지는 못합니다",
    "paragraphs": [
      "표면이 긁히는 정도를 비교하는 기준이 경도이며, 이 수치만으로 강한 충격에 대한 안전성이 보장되지는 않습니다. 경도가 높은 다이아몬드도 착용 중에는 충격에 주의해야 합니다.",
      "보석에 금이 보이거나 흔들림과 모서리 손상이 확인되면 직접 긁어 시험하지 않아야 합니다. 그 대신 착용을 멈춘 뒤 상태를 확인하는 것이 안전합니다."
    ],
    "bullets": [
      "높은 경도와 높은 인성은 같은 의미가 아닙니다.",
      "강한 충격은 보석의 모양과 세팅 상태에 따라 손상을 일으킬 수 있습니다.",
      "보석 종류를 확인하려고 완성된 주얼리를 직접 긁지 마세요."
    ],
    "image": {
      "src": "/Image/guide/gemstone-mohs-hardness-guide-section-4.webp",
      "alt": "보석이 세팅된 반지의 표면과 가장자리를 확대해 점검하는 모습",
      "caption": "경도 숫자뿐 아니라 보석의 손상과 세팅 상태를 함께 확인해야 합니다."
    }
  },
  {
    "title": "착용 환경에 따라 관리 기준을 나눠 보세요",
    "paragraphs": [
      "손을 쓰는 활동이나 외부 물체와의 접촉이 잦은 반지는 보석의 경도만으로 판단하지 않아야 합니다. 충격 가능성과 세팅 보호 범위를 함께 확인해야 하며, 목걸이와 귀걸이도 착용 환경 및 세팅에 따라 관리 부담이 달라질 수 있습니다.",
      "상대적으로 부드러운 보석은 단단한 보석이나 금속과 직접 닿지 않도록 분리하는 편이 좋습니다. 특정 보석을 특정 품목에 반드시 권장하기보다는 착용 빈도와 생활 환경을 기준으로 상담하는 것이 좋습니다."
    ],
    "bullets": [
      "매일 착용하는 반지는 경도·인성·세팅 보호를 함께 확인합니다.",
      "손을 많이 쓰거나 충격이 예상되는 활동에서는 착용을 조절합니다.",
      "목걸이와 귀걸이도 다른 주얼리와 엉키거나 부딪히지 않게 보관합니다.",
      "사진만으로 천연석, 합성석, 유사석을 확정하기는 어렵습니다."
    ]
  },
  {
    "title": "보관·세척 및 상담 전 체크리스트",
    "paragraphs": [
      "보석은 개별 파우치나 칸막이에 넣어 서로 닿지 않게 보관하는 편이 좋습니다. 경도가 다른 보석과 금속이 함께 움직일 때 표면 손상이 생길 수 있으므로 분리 보관이 유리합니다.",
      "처리된 보석은 초음파 세척이 맞지 않을 수 있습니다. 처리 방식과 제조사 관리 지침을 확인할 수 없으면 초음파·스팀 세척을 피하세요. 처리 여부는 아래 관련 페이지의 감정서·감별서 차이 글에서 확인 기준을 살펴볼 수 있습니다."
    ],
    "bullets": [
      "보석 종류와 처리 여부를 확인한 뒤 세척 방법을 정합니다.",
      "손상이나 흔들림이 있으면 세척보다 상태 확인을 먼저 합니다.",
      "구매 보증서와 감별 관련 자료가 있다면 상담 때 함께 준비합니다.",
      "보석의 착용 품목, 빈도, 생활 환경을 상담 시 전달합니다."
    ]
  }
]

const cautions = [
  "모스 경도는 상대적인 긁힘 척도이며 숫자 간 차이가 동일한 선형 척도가 아닙니다.",
  "경도가 높아도 충격에 대한 인성이 높다고 단정할 수 없습니다.",
  "같은 종류의 보석도 처리 여부와 세팅 상태에 따라 세척 및 착용 관리가 달라질 수 있습니다.",
  "보석 종류를 확인하기 위해 완성된 주얼리를 직접 긁는 시험은 영구적인 손상을 일으킬 수 있습니다."
]

const relatedLinks = [
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "반지용 보석 내구성 선택 기준",
    "description": "경도뿐 아니라 인성·안정성·세팅을 함께 보고 일상 착용 가능성을 비교하세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 차이",
    "description": "보석 종류와 처리 여부를 확인할 때 보고서의 검사 범위를 살펴봅니다."
  },
  {
    "to": "/custom",
    "label": "착용 환경에 맞춘 보석 반지 주문 상담",
    "description": "원하는 보석과 착용 빈도, 세팅 보호 범위를 함께 상담하세요."
  }
]

// guide-manager:data:start
const gmArticleTitle = '보석 모스 경도 순위: 다이아 10·루비·사파이어 9'
const gmArticleLead = '광물이 다른 물질에 의해 긁히는 정도를 비교하는 상대 척도가 보석 모스 경도입니다. 다이아몬드는 10이고 루비와 사파이어가 속하는 강옥은 9입니다. 다만 경도가 높더라도 충격에 반드시 강한 것은 아니므로 인성·안정성·세팅을 함께 살펴야 합니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '보석 모스 경도'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '유색 보석 주얼리 상담'
const gmHeroAlt = '다이아몬드와 루비 사파이어 등 보석의 모스 경도를 비교하는 안내 이미지'
const gmSourceNote = '모스 경도와 기준 광물, 경도와 인성의 차이는 아래 승인된 공식 자료를 바탕으로 정리했습니다. 보석별 처리 여부와 세척 가능성은 개별 제품 자료를 확인하지 못한 경우 단정하지 않습니다. 확인일은 2026년 8월 5일입니다.'
const gmSources = [
  {
    "label": "U.S. Geological Survey, Mineral Gemstones",
    "url": "https://pubs.usgs.gov/gip/gemstones/mineral.html",
    "note": "보석의 경도와 모스 척도의 기준 광물을 설명하는 미국 지질조사국 자료입니다."
  },
  {
    "label": "Gemological Institute of America, Mohs Scale – Gem and Mineral Hardness",
    "url": "https://4cs.gia.edu/en-us/blog/mohs-scale/",
    "note": "모스 척도의 의미, 긁힘 저항성과 인성의 차이를 설명하는 자료입니다."
  },
  {
    "label": "Gemological Institute of America, More than the Mohs Scale",
    "url": "https://4cs.gia.edu/en-us/blog/more-than-mohs-scale-gem-durability/",
    "note": "모스 경도가 비선형적인 상대 척도이며 경도와 인성이 다른 성질임을 설명하는 자료입니다."
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
    { property: 'og:locale', content: 'ko_KR' },
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
        { name: '보석 모스 경도 순위', path: pagePath },
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
        author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
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
