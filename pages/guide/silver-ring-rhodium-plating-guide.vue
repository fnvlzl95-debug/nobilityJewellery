<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/silver-ring-rhodium-plating-guide'
const pageTitle = '은반지 로듐 도금과 재도금 기준 | 귀족'
const pageDescription = '은반지에 로듐 도금을 하는 목적과 도금이 벗겨졌을 때 확인할 외관 변화, 재도금 상담 전 준비할 내용을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/silver-ring-rhodium-plating-guide-hero-bef01257.webp`
const publishedAt = '2026-09-07'
const updatedAt = ''
const faqItems = [
  {
    "question": "은반지에 로듐 도금을 하면 무엇이 달라지나요?",
    "answer": "은보다 밝고 반사성이 높은 흰색 외관을 만들 수 있고, 은의 변색을 늦추거나 표면을 보호하는 데 도움을 줄 수 있습니다. 다만 도금은 영구적인 처리가 아닙니다."
  },
  {
    "question": "로듐 도금이 벗겨졌는지 어떻게 알 수 있나요?",
    "answer": "반지의 일부가 탁하거나 누렇게 또는 어둡게 보이고, 밝은 부분과 다른 은색 부분이 섞여 보이면 도금층 마모나 변색을 의심할 수 있습니다. 정확한 판단은 상태 확인이 필요합니다."
  },
  {
    "question": "색이 조금 변한 정도에도 재도금을 상담해야 하나요?",
    "answer": "부분적인 색 변화가 신경 쓰이거나 바탕 은 노출이 보이면 재도금 상담을 시작할 수 있습니다. 색 변화의 원인과 표면 상태를 확인한 뒤 필요한 작업을 안내받는 방식이 적절합니다."
  },
  {
    "question": "재도금 상담 때 사진을 보내도 되나요?",
    "answer": "전체 사진과 색 변화가 보이는 부분의 가까운 사진을 함께 준비하면 상담에 도움이 됩니다. 다만 사진만으로는 흠집, 표면 상태와 작업 가능 여부를 모두 확정하기 어렵습니다."
  }
]
const quickAnswers = [
  "로듐 도금은 은반지를 더 밝고 반사성이 높은 흰색으로 보이게 하고 변색을 늦추는 데 도움을 줄 수 있습니다.",
  "반복적인 마찰로 도금층이 닳으면 은색이나 변색된 바탕이 드러나 색이 달라 보일 수 있습니다.",
  "부분적으로 탁하거나 누렇게 또는 어둡게 보이고 바탕 은 노출이 확인되면 상태 확인 후 재도금을 상담할 수 있습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "로듐 도금을 하는 이유",
    "paragraphs": [
      "로듐은 은 표면에 얇은 도금층을 만들어 은보다 밝고 반사성이 높은 흰색 외관을 연출하는 데 쓰일 수 있습니다.",
      "은은 사용과 환경에 따라 변색될 수 있으며, 로듐 도금은 변색을 늦추거나 표면을 보호하는 데 도움을 줄 수 있습니다. 다만 도금은 표면 코팅이므로 영구적인 상태로 보기는 어렵습니다."
    ],
    "bullets": [
      "은반지를 더 밝고 선명한 흰색으로 보이게 하는 목적",
      "은의 변색을 늦추고 표면을 보호하는 목적",
      "도금 자체가 은의 소재나 내부 상태를 바꾸는 것은 아님"
    ],
    "table": null
  },
  {
    "title": "도금이 벗겨질 때 보이는 변화",
    "paragraphs": [
      "반지를 반복해서 착용하면 손가락, 다른 장신구, 물체와의 마찰이 생깁니다. 이 과정에서 로듐층이 닳으면 원래의 은색이나 변색된 표면이 부분적으로 드러나 외관이 달라질 수 있습니다."
    ],
    "bullets": [
      "반지 안쪽이나 가장자리처럼 마찰이 많은 부분의 색이 먼저 달라질 수 있음",
      "표면 일부가 탁하거나 누렇게 또는 어둡게 보일 수 있음",
      "밝은 부분과 어두운 부분이 섞여 얼룩처럼 보일 수 있음",
      "색 변화만으로 도금 손상 범위나 수리 가능성을 확정할 수는 없음"
    ],
    "image": {
      "src": "/Image/guide/silver-ring-rhodium-plating-guide-section-2-0b4abab2.webp",
      "alt": "반지 안쪽과 가장자리의 색이 서로 다르게 보이는 은반지가 흰색 천 위에 놓인 모습",
      "caption": "마찰이 잦은 부분은 다른 영역보다 먼저 색이 달라져 보일 수 있습니다.",
      "width": 1024,
      "height": 1024
    },
    "table": null
  },
  {
    "title": "재도금 상담을 시작할 기준",
    "paragraphs": [
      "다음과 같은 변화가 보이면 사진을 준비해 상태 확인과 재도금 상담을 시작할 수 있습니다. 이 기준은 도금층이 영구적이지 않고 은이 변색될 수 있다는 점을 바탕으로 한 상담 기준입니다."
    ],
    "bullets": [
      "색이 부분적으로 탁해진 경우",
      "표면이 누렇게 또는 어둡게 보이는 경우",
      "도금이 닳아 바탕 은이 드러난 경우",
      "변색과 광택 저하가 함께 보이는 경우",
      "반지 전체와 문제가 보이는 부분을 각각 촬영해 상담할 때"
    ],
    "table": null
  },
  {
    "title": "상담 전에 확인할 내용",
    "paragraphs": [
      "재도금 상담에서는 반지의 현재 상태를 먼저 확인해야 합니다. 도금이 벗겨진 위치와 범위, 변색 양상, 표면의 흠집이나 형태 변화가 함께 보이는지 전달하면 상담에 도움이 됩니다.",
      "사진만으로는 실제 표면 상태를 모두 판단하기 어려울 수 있습니다. 상담 시점의 제품 상태와 확인 결과에 따라 필요한 작업과 진행 가능 여부가 달라질 수 있으므로, 비용과 기간은 상태 확인 후 문의해야 합니다."
    ],
    "bullets": [
      "반지 전체 사진과 색 변화 부위의 가까운 사진 준비",
      "도금이 벗겨진 위치를 안쪽, 바깥쪽, 가장자리로 나누어 설명",
      "변색 외에 깊은 흠집이나 찌그러짐이 있는지 확인",
      "착용 중 마찰이 많은 상황이 있었는지 전달",
      "재도금 전 표면 정리나 다른 수리가 필요한지 문의"
    ],
    "table": {
      "headers": [
        "확인 항목",
        "상담 때 전달할 내용"
      ],
      "rows": [
        [
          "색 변화",
          "탁함, 누런 느낌, 어두운 부분의 위치"
        ],
        [
          "도금 노출 상태",
          "바탕 은이 보이는 범위와 형태"
        ],
        [
          "표면 상태",
          "흠집, 찌그러짐, 거친 느낌의 유무"
        ],
        [
          "사진",
          "전체 모습과 가까운 부분 사진"
        ],
        [
          "요청 내용",
          "재도금만 원하는지 다른 수리도 함께 필요한지"
        ]
      ]
    }
  }
]
const cautions = [
  "로듐 도금은 표면 코팅이므로 사용 중 마찰에 따라 다시 닳을 수 있으며, 재도금 유지 기간을 일률적으로 정할 수 없습니다.",
  "사진이나 색상만으로 도금 손상 여부와 작업 가능성을 확정할 수 없습니다. 실제 제품 상태 확인이 필요합니다.",
  "사업자 제공 정보가 없으므로 재도금 비용, 소요 기간, 보증 범위, 재고와 같은 조건은 이 글에서 제시하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/silver-ring-repair-cost",
    "label": "은반지 수리 비용, 변색·찌그러짐·사이즈별 기준",
    "description": "광택, 형태 복원, 사이즈 조절, 땜 여부에 따라 비용이 달라질 수 있어 맡기기 전 확인할 내용을 정리했습니다."
  },
  {
    "to": "/guide/gold-plating-repair",
    "label": "금반지·화이트골드 도금 수리, 변색·광택 상담 전 기준",
    "description": "금반지와 화이트골드 제품의 변색과 광택 저하, 로듐 도금 상담 전에 확인할 표면 상태와 사진 기준을 정리했습니다."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "일반 반지 주문제작 상담 체크리스트",
    "description": "반지 상담 전에 정할 내용과 주문 확정 전에 확인할 항목을 정리했습니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '은반지 로듐 도금과 재도금 기준'
const gmArticleLead = '로듐 도금은 은반지를 더 밝고 반사성이 높은 흰색으로 보이게 하며 변색을 늦추는 데 도움을 줄 수 있는 표면 처리입니다. 다만 사용 중 마찰로 도금층이 닳을 수 있으므로 색 변화와 바탕 은 노출 여부를 확인한 뒤 재도금을 상담해야 합니다.'
const gmArticleCategory = '관리'
const gmArticleKeyword = '은반지 로듐 도금 재도금'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '은반지 로듐 도금 벗겨짐과 재도금 상담'
const gmHeroAlt = '광택이 다른 은반지 두 개가 흰색 작업대 위에 놓여 있고 옆에 확대경과 부드러운 연마 도구가 배치된 모습'
const gmHeroCaption = '은반지의 로듐 도금 상태를 살필 때는 색과 표면 변화를 함께 확인합니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '로듐 도금의 외관 효과와 비영구성, 은의 변색 특성은 아래 공식 자료를 바탕으로 정리했습니다. 재도금 비용과 기간, 개별 제품의 작업 가능 여부는 사업자 제공 정보가 없어 포함하지 않았습니다.'
const gmSources = [
  {
    "label": "Federal Trade Commission, Summary of Basis and Purpose for the Revised Jewelry Guides",
    "url": "https://www.ftc.gov/system/files/documents/public_statements/1393857/g71001_jewelry_guides_statement_of_basis_and_purpose_final_8-8-18.pdf",
    "note": "로듐 표면 처리가 은을 포함한 귀금속 제품에 적용될 수 있으며 표면 코팅은 영구적이지 않을 수 있다는 공식 자료입니다."
  },
  {
    "label": "GIA 4Cs, White Gold vs. Silver",
    "url": "https://4cs.gia.edu/en-us/blog/white-gold-vs-silver/",
    "note": "은의 변색 특성과 은에 로듐 도금을 하는 목적을 설명하는 교육 자료입니다."
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
