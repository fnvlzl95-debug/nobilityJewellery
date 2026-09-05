<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ruby-heat-treatment-buying-checklist'
const pageTitle = '루비 가열·비가열, 구매 전 확인할 것 | 귀족'
const pageDescription = '루비 가열·비가열과 유리 충전의 차이를 확인하세요. 천연 여부와 처리 정보를 보고서·판매 설명에 대조하고, 세척 전에 피해야 할 행동을 정리합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ruby-heat-treatment-buying-checklist-hero-ef60bae6.webp`
const publishedAt = '2026-09-06'
const updatedAt = ''
const faqItems = [
  {
    "question": "천연 루비가 가열되면 가짜인가요?",
    "answer": "아닙니다. 천연 여부와 가열 여부는 별도의 확인 항목입니다. 천연 루비도 가열될 수 있으므로 가열 표기만으로 합성이나 가짜라고 판단하지 않습니다."
  },
  {
    "question": "비가열 루비는 어떻게 확인하나요?",
    "answer": "판매자의 구두 설명만 보지 말고 독립 보석 감별기관의 보고서에 가열의 증거가 없다는 의견이 있는지 확인하세요. 보고서 번호와 판매자가 제공한 서면 설명도 함께 대조하는 것이 좋습니다."
  },
  {
    "question": "가열 루비와 유리 충전 루비는 같은가요?",
    "answer": "같은 처리로 묶으면 안 됩니다. 가열 여부와 균열 또는 공동 충전 여부를 별도로 확인해야 하며, 충전·염색 재료는 세척과 수리에서 더 주의가 필요합니다."
  },
  {
    "question": "GIA 보고서에 루비 등급이 표시되나요?",
    "answer": "GIA는 루비를 식별하고 검출 가능한 처리 정보를 기재할 수 있지만, 다이아몬드와 같은 등급표로 루비를 등급 매기지는 않습니다. 보고서의 재료와 처리 의견을 품질 전체의 보증으로 확대해석하지 마세요."
  }
]
const quickAnswers = [
  "천연 루비도 가열될 수 있으므로 가열 표기만으로 가짜나 합성이라고 판단하지 않습니다.",
  "비가열은 판매자의 말보다 독립 보고서에 가열의 증거가 없다는 의견이 있는지 확인합니다.",
  "유리 충전 루비는 가열 루비와 관리 조건이 다르므로 처리 정보를 모른 채 초음파나 스팀을 사용하지 않습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "천연 여부와 가열 여부는 다른 질문입니다",
    "paragraphs": [
      "천연 루비도 가열될 수 있습니다. 따라서 천연인지 실험실에서 성장했는지와 가열·충전 등 어떤 처리가 확인되는지는 따로 확인해야 합니다. 천연이라는 말만으로 처리되지 않았다고 볼 수는 없습니다."
    ],
    "bullets": [
      "판매 설명에서 천연 또는 실험실 성장 여부를 확인합니다.",
      "처리 종류와 처리 미상 여부를 별도 항목으로 기록합니다.",
      "제품 표기와 보유 보고서의 내용이 같은지 대조합니다."
    ],
    "table": null
  },
  {
    "title": "비가열 문구는 보고서의 처리 의견으로 확인하세요",
    "paragraphs": [
      "비가열이라는 판매 문구는 독립 검사기관 보고서의 처리 의견과 대조하세요. 가열의 증거가 없다는 의견이 다른 모든 처리까지 없다는 뜻인지 확대해석하지 말고, 보고서 전체의 처리 항목을 읽어야 합니다.",
      "비가열석은 희소성으로 프리미엄이 형성될 수 있지만, 색·투명도·크기·컷과 확인 문서가 다른 두 루비의 품질이나 가격을 그 문구 하나로 정할 수는 없습니다. 산지명도 품질 전체를 보증하지 않습니다."
    ],
    "bullets": [
      "보고서 발행기관과 보고서 번호를 받습니다.",
      "보고서의 재료 확인과 처리 의견을 판매 설명과 대조합니다.",
      "사진만으로 천연 여부나 비가열 여부를 판별하려 하지 않습니다."
    ],
    "table": null
  },
  {
    "title": "가열과 유리 충전을 같은 처리로 묶지 마세요",
    "paragraphs": [
      "가열 처리는 유리로 균열을 메우는 처리와 다른 유형입니다. 견적이나 관리 안내에서 단순히 처리 여부만 적지 말고, 확인된 처리 종류를 구체적으로 구분해야 합니다.",
      "가열 루비는 일반적으로 무처리 루비와 함께 비교적 내구성이 높은 범주로 설명되지만, 균열 충전·공동 충전·염색 재료는 더 주의해서 관리해야 합니다."
    ],
    "bullets": [
      "판매자의 가열 설명 외에 유리 충전·공동 충전·염색 등 추가 처리가 있는지 묻습니다.",
      "균열 충전·공동 충전·염색 재료는 GIA 안내에 따라 젖은 천만 사용합니다."
    ],
    "table": {
      "headers": [
        "확인 항목",
        "가열 처리",
        "유리 충전 처리"
      ],
      "rows": [
        [
          "처리 구분",
          "가열 처리 여부를 보고서에서 확인",
          "균열 또는 공동 충전 여부를 별도로 확인"
        ],
        [
          "구매 기록",
          "천연 또는 실험실 성장 여부와 함께 기록",
          "충전 재료와 처리 정보의 서면 설명을 기록"
        ],
        [
          "관리 전 확인",
          "제품 상태와 보고서 내용을 대조",
          "세척·수리 전에 충전 여부를 알림"
        ],
        [
          "피할 행동",
          "처리 미상이라면 안전을 일괄 가정하지 않음",
          "초음파·스팀·산성 세정제를 임의로 사용하지 않음"
        ]
      ]
    }
  },
  {
    "title": "견적표에서 같은 조건으로 비교할 항목",
    "paragraphs": [
      "서로 다른 루비의 가격만 나란히 비교하면 처리와 제품 구성이 달라 판단하기 어려울 수 있습니다. 아래 항목을 같은 형식으로 받아 기록하면 상담 내용을 대조하기 쉽습니다."
    ],
    "bullets": [
      "천연 또는 실험실 성장 여부",
      "처리 종류와 처리 미상 여부",
      "보고서 발행기관과 보고서 번호",
      "중량·치수·형태·색상",
      "보석 단품인지 장신구인지",
      "제품 표기와 판매자가 제공하는 서면 설명"
    ],
    "table": null
  },
  {
    "title": "처리 정보를 모를 때 세척·수리 전 할 일",
    "paragraphs": [
      "처리 정보가 없으면 세척을 시작하기 전에 판매자에게 확인하세요. 특히 충전·염색 가능성을 배제할 수 없다면 초음파·스팀 세척기나 레몬즙 등 산성 물질을 임의로 사용하지 마세요.",
      "세척이나 수리를 문의할 때는 제품 표기, 보유 보고서와 판매자의 처리 설명을 함께 준비하세요. 착용 목적과 걱정되는 부분을 적어두면 필요한 확인 항목을 정리하기 쉽습니다."
    ],
    "bullets": [
      "보고서 사본 또는 번호와 제품 표기 사진을 함께 보관합니다.",
      "처리 정보를 모르면 모른다는 사실부터 접수 시 알립니다."
    ],
    "table": null
  }
]
const cautions = [
  "비가열이나 산지명만으로 품질과 가치를 판단하지 마세요.",
  "다른 제품의 세척 방법을 처리 상태가 다른 루비에 그대로 적용하지 마세요."
]
const relatedLinks = [
  {
    "to": "/guide/ruby-vs-pink-sapphire-difference",
    "label": "루비와 핑크 사파이어 차이",
    "description": "색 분류가 궁금할 때 먼저 확인"
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 차이",
    "description": "보고서 유형과 검사 범위 읽기"
  },
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "반지용 보석 내구성",
    "description": "경도와 처리 상태를 함께 비교"
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '루비 가열·비가열, 구매 전 확인할 것'
const gmArticleLead = '가열 루비라고 해서 가짜이거나 합성이라는 뜻은 아닙니다. 천연인지 실험실에서 성장했는지와 어떤 처리가 확인되는지는 별도의 질문이므로, 판매 문구와 독립 보고서를 차례로 대조해야 합니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '루비 가열 비가열'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '루비의 천연 여부와 처리 정보 확인 순서'
const gmHeroAlt = '붉은 보석 옆에 놓인 루페, 문서와 치수 측정 도구'
const gmHeroCaption = '구매 전 문서를 대조하는 상황을 표현한 생성 이미지입니다. 실제 제품이나 감별 결과가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '처리와 관리 원칙은 GIA 자료를 대조했습니다. 견적 기록표는 구매자가 판매 설명과 문서를 비교하도록 정리한 확인 목록입니다.'
const gmSources = [
  {
    "label": "GIA 루비 구매 안내",
    "url": "https://www.gia.edu/ruby/buyers-guide",
    "note": "천연·실험실 성장 여부, 처리 정보, 독립 보고서, 가열과 유리 충전의 구분, 루비 평가 방식에 대한 공식 안내입니다."
  },
  {
    "label": "GIA 루비 관리·세척 안내",
    "url": "https://www.gia.edu/ruby-care-cleaning",
    "note": "무처리·가열·확산 처리와 균열 충전·공동 충전·염색 재료의 세척 및 관리 차이에 대한 공식 안내입니다."
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
        { name: gmArticleTitle, path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: articleImages,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url },
        reviewedBy: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: gmReviewedBy, url: siteConfig.url },
        publisher: {
          '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: siteConfig.name, url: siteConfig.url,
          logo: { '@type': 'ImageObject', url: siteConfig.url + '/favicon.svg' },
        },
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
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
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
    :hero-caption="gmHeroCaption"
    :hero-width="gmHeroWidth"
    :hero-height="gmHeroHeight"
    :reviewed-by="gmReviewedBy"
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
