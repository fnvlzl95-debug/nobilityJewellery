<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/stud-earring-meaning-selection-guide'
const pageTitle = '스터드 귀걸이 뜻과 선택 기준 | 귀족'
const pageDescription = '스터드 귀걸이의 형태와 잠금 방식을 알아보고, 선물용과 첫 귀걸이를 고를 때 확인할 소재·무게·크기·관리 기준을 정리합니다.'
const ogImage = `${siteConfig.url}/Image/guide/stud-earring-meaning-selection-guide-hero-9d867f5d.webp`
const publishedAt = '2026-09-02'
const updatedAt = ''
const faqItems = [
  {
    "question": "스터드 귀걸이는 무엇인가요?",
    "answer": "장식이 귀 앞면에 밀착되고 포스트와 뒷마개로 고정되는 간결한 형태의 귀걸이입니다."
  },
  {
    "question": "선물용 스터드 귀걸이는 무엇을 먼저 봐야 하나요?",
    "answer": "받는 사람의 평소 스타일, 금속 색상, 원하는 크기와 무게, 금속 민감도, 뒷마개 선호를 먼저 확인하는 것이 좋습니다."
  },
  {
    "question": "첫 귀걸이는 무거운 디자인을 피해야 하나요?",
    "answer": "새로 뚫은 부위의 자극과 걸림을 줄이려는 목적이라면 크거나 무거운 디자인보다 단순하고 부담이 적은 디자인을 우선 검토할 수 있습니다."
  },
  {
    "question": "나사식 뒷마개가 가장 좋은가요?",
    "answer": "나사식 뒷마개는 분실 방지 측면에서 고려할 수 있지만 포스트가 더 두껍게 느껴질 수 있습니다. 제품 구조와 착용자의 선호를 함께 확인해야 합니다."
  }
]
const quickAnswers = [
  "스터드 귀걸이는 장식이 귀 앞면에 밀착되고 포스트와 뒷마개로 고정되는 간결한 귀걸이입니다.",
  "선물용은 받는 사람의 평소 금속 색상, 크기, 무게, 금속 민감도와 뒷마개 선호를 먼저 확인하는 것이 좋습니다.",
  "첫 귀걸이는 크거나 무거운 디자인보다 걸리거나 눌릴 위험을 줄일 수 있는 단순한 디자인을 우선 검토할 수 있습니다."
]
const sections = [
  {
    "title": "스터드 귀걸이의 형태",
    "paragraphs": [
      "스터드 귀걸이는 귀 앞면에 장식이 밀착되는 형태입니다. 포스트가 귓불을 통과하고 뒤쪽의 뒷마개가 장식을 고정하는 구조가 일반적입니다.",
      "움직임이 큰 드롭형이나 후프형과 비교하면 장식이 귀 가까이에 놓이는 편이어서 단정한 인상을 원하는 상황에 검토할 수 있습니다."
    ],
    "bullets": [
      "앞면 장식과 포스트, 뒷마개로 구성되는 구조",
      "보석이나 금속 장식의 모양과 색상에 따라 분위기가 달라짐",
      "단순한 형태부터 세팅이 있는 디자인까지 선택 폭이 있음"
    ]
  },
  {
    "title": "선물용으로 확인할 기준",
    "paragraphs": [
      "선물이라면 받는 사람의 평소 착용 스타일과 선호하는 금속 색상, 원하는 크기를 먼저 살펴보세요. 평소 작은 장식을 착용하는 사람인지, 눈에 띄는 디자인을 선호하는지도 선택에 영향을 줄 수 있습니다.",
      "금속 민감도가 있거나 과거 귀걸이 착용 뒤 불편함을 경험한 사람이라면 금속 종류와 니켈 포함 여부, 저알레르기성 표시를 확인하는 편이 안전합니다. 소재를 추측하기보다 상품에 표시된 내용을 기준으로 상담하세요."
    ],
    "bullets": [
      "평소 착용하는 금속 색상과 장식 크기",
      "귀걸이 착용 시 금속 민감도나 과거 반응",
      "선호하는 뒷마개 방식과 교환·반품 조건",
      "금속 종류와 함량이 상품 설명에 명확히 표시되어 있는지"
    ],
    "image": {
      "src": "/Image/guide/stud-earring-meaning-selection-guide-section-2-986aee8f.webp",
      "alt": "선물용으로 확인할 기준 예시 이미지",
      "caption": "선물용으로 확인할 기준에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "첫 귀걸이 선택 기준",
    "paragraphs": [
      "첫 귀걸이는 장식이 크거나 무거운 디자인보다 귀에 걸리거나 눌릴 위험이 적은 단순한 디자인을 우선 검토할 수 있습니다. 특히 새로 뚫은 부위라면 장식의 크기와 무게, 포스트와 뒷마개의 압박감을 함께 살펴야 합니다.",
      "잠금형 뒷마개나 나사식 뒷마개는 마찰식 뒷마개보다 분실 방지 측면에서 고려할 수 있습니다. 다만 나사식 포스트는 더 두껍게 느껴질 수 있으므로 실제 착용감과 관리 방법을 상담하는 것이 좋습니다."
    ],
    "bullets": [
      "귀에 걸릴 가능성이 적은 단순한 장식",
      "착용자가 부담을 느끼지 않을 크기와 무게",
      "포스트 굵기와 뒷마개의 압박감",
      "분실 방지와 착용 편의 중 어느 기준을 우선할지"
    ]
  },
  {
    "title": "소재와 표시 내용 확인",
    "paragraphs": [
      "귀금속의 종류나 함량은 상품 설명만 보고 단정하지 말고 표시된 금속 종류와 함량을 확인해야 합니다. 금속 색상만으로 소재나 순도를 판단하기는 어렵습니다.",
      "니켈은 귀걸이와 뒷마개에서 접촉성 피부염을 일으킬 수 있습니다. 민감한 사람은 니켈이 없거나 저알레르기성으로 명확히 표시된 제품을 우선 확인하고, 불편함이 생기면 착용을 중단한 뒤 필요한 상담을 받아야 합니다."
    ],
    "bullets": [
      "금속 종류와 함량 표기",
      "니켈 포함 여부 또는 저알레르기성 표시",
      "포스트와 뒷마개까지 같은 기준으로 확인",
      "표시가 불분명한 부분은 구매 전 상담"
    ],
    "image": {
      "src": "/Image/guide/stud-earring-meaning-selection-guide-section-4-eda7bea8.webp",
      "alt": "소재와 표시 내용 확인 예시 이미지",
      "caption": "소재와 표시 내용 확인에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  }
]
const cautions = [
  "금속 민감도는 개인마다 다를 수 있으므로 니켈이 없다는 표시만으로 모든 불편함이 없다고 보장할 수 없습니다.",
  "첫 귀걸이는 새로 뚫은 부위의 상태와 관리 방법에 따라 선택 기준이 달라질 수 있습니다. 통증, 붓기, 진물 등 불편함이 있으면 의료 전문가의 안내를 받아야 합니다.",
  "잠금 방식에 따른 분실 방지 효과와 착용감은 제품 구조와 개인 사용 방식에 따라 달라질 수 있습니다."
]
const relatedLinks = [
  {
    "to": "/guide/earring-types-guide",
    "label": "귀걸이 종류, 스터드·드롭·후프·클립형 차이",
    "description": "귀걸이 형태별 움직임과 무게, 잠금 구조를 비교하고 착용 목적에 맞는 선택 기준을 정리합니다."
  },
  {
    "to": "/guide/earring-back-lost-types",
    "label": "귀걸이 뒷마개 분실, 종류별 교체 기준",
    "description": "뒷마개 종류와 침 굵기, 소재를 확인해 교체할 때 살펴볼 기준을 안내합니다."
  },
  {
    "to": "/guide/anniversary-ring-gift-selection",
    "label": "기념일 반지 선물, 관계와 착용 방식에 맞게 고르는 기준",
    "description": "선물하는 관계와 착용 방식을 기준으로 주얼리 선택 전 확인할 내용을 정리합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '스터드 귀걸이 뜻과 선택 기준'
const gmArticleLead = '스터드 귀걸이는 장식이 귀 앞면에 밀착되는 간결한 형태로, 포스트와 뒷마개로 고정하는 방식이 일반적입니다. 선물용이나 첫 귀걸이를 고를 때는 디자인뿐 아니라 금속 민감도, 무게, 잠금 방식, 표시 내용을 함께 확인하는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '스터드 귀걸이 뜻'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '스터드 귀걸이 선물 및 첫 귀걸이 선택 상담'
const gmHeroAlt = '작은 원형 보석 장식이 있는 스터드 귀걸이 한 쌍과 포스트, 뒷마개가 흰색 작업대 위에 놓인 모습'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '스터드 귀걸이의 형태와 잠금 방식, 금속 및 알레르기 확인 기준은 아래 승인된 공식 자료를 바탕으로 정리했습니다. 가격, 재고, 제작 기간과 개별 제품의 수리 가능 여부는 제품 상태와 상담 시점에 따라 달라질 수 있어 이 글에서 단정하지 않습니다.'
const gmSources = [
  {
    "label": "Gemological Institute of America, How to Choose Diamond Stud Earrings",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-choose-diamond-stud-earrings/",
    "note": "스터드 귀걸이의 형태, 잠금 방식, 금속, 알레르기와 세팅 선택에 관한 공식 안내"
  },
  {
    "label": "American Academy of Dermatology, Nickel allergy: How to avoid exposure and reduce symptoms",
    "url": "https://www.aad.org/public/diseases/eczema/insider/nickel-allergy",
    "note": "귀걸이와 뒷마개의 니켈 노출 및 금속 선택에 관한 공식 안내"
  },
  {
    "label": "Federal Trade Commission, Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속의 종류와 금속 함량을 정확하게 표시해야 한다는 공식 지침"
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
