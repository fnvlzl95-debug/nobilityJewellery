<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/anniversary-ring-gift-selection'
const pageTitle = '기념일 반지 선물, 관계와 착용 방식에 맞게 고르는 기준 | 귀족'
const pageDescription = '교제 기념일, 결혼 기념일, 약속의 의미처럼 선물하는 관계와 착용 방식을 기준으로 반지 선택 전 확인할 내용을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/anniversary-ring-gift-selection-hero.webp`
const publishedAt = '2026-08-10'
const updatedAt = ''
const faqItems = [
  {
    "question": "교제 기념일에 약혼반지를 선물해도 되나요?",
    "answer": "약혼반지는 일반적으로 청혼과 결혼 의사를 상징하므로, 교제 기념의 의미로 선물하려면 약혼반지로 오해되지 않을 디자인과 설명을 함께 고려하는 것이 좋습니다."
  },
  {
    "question": "프로미스 링은 어느 손가락에 착용하나요?",
    "answer": "정해진 손가락은 없습니다. 왼손이나 오른손의 여러 손가락에 착용할 수 있으며, 필요하면 목걸이 줄에 걸어 착용할 수도 있습니다."
  },
  {
    "question": "결혼 기념일 반지는 기존 결혼반지와 함께 착용할 수 있나요?",
    "answer": "애니버서리 링이나 이터니티 링을 기존 반지와 겹쳐 착용하는 선택이 가능합니다. 다만 반지의 폭과 모양, 서로 닿는 부분은 실제 착용 상태에서 확인하는 것이 좋습니다."
  },
  {
    "question": "약혼반지와 결혼반지를 함께 착용하는 순서가 있나요?",
    "answer": "전통적으로는 웨딩 밴드를 손가락 안쪽에 먼저 착용하고 약혼반지를 그 위에 착용합니다. 손과 문화에 따라 다른 방식도 가능하므로 개인의 편안함을 함께 고려하세요."
  },
  {
    "question": "맞춤 기념일 반지 상담에서 무엇을 물어봐야 하나요?",
    "answer": "금속 종류와 함량, 보석 정보, 착용 방식과 관리 방법을 확인하고 가격, 재고, 제작 기간, 수리 가능 여부는 상담 시 별도로 문의하세요."
  }
]
const quickAnswers = [
  "교제 기념일 선물이라면 약혼을 뜻하는지 오해가 없도록 반지의 의미를 먼저 설명하는 것이 좋습니다.",
  "프로미스 링은 정해진 착용 손가락이 없으며 왼손이나 오른손의 여러 손가락, 목걸이 줄에 걸어 착용할 수 있습니다.",
  "결혼 기념일 반지는 기존 약혼반지나 결혼반지와 함께 겹쳐 착용할지, 별도로 착용할지 확인하면 선택 범위를 좁히기 쉽습니다."
]
const sections = [
  {
    "title": "선물하는 관계와 의미부터 정하기",
    "paragraphs": [
      "교제 기념일에 주는 반지는 관계에 대한 약속이나 헌신을 표현하는 프로미스 링으로 생각할 수 있습니다. 다만 프로미스 링은 결혼을 약속하는 약혼반지와 의미가 다를 수 있으므로, 선물하는 사람이 담고 싶은 뜻을 미리 정리해야 합니다.",
      "약혼을 의미하는 반지인지, 현재 관계의 기념을 위한 반지인지 상대가 다르게 받아들일 수 있습니다. 반지를 건넬 때 선물의 의미와 착용 의도를 함께 설명하면 불필요한 오해를 줄이는 데 도움이 됩니다."
    ],
    "bullets": [
      "교제 기념일: 관계의 약속과 기념을 표현하는 반지",
      "청혼을 위한 경우: 약혼과 결혼 의사를 상징하는 반지",
      "결혼 기념일: 결혼 관계와 중요한 이정표를 기념하는 추가 반지"
    ]
  },
  {
    "title": "착용 손가락과 손을 자유롭게 선택하기",
    "paragraphs": [
      "프로미스 링에는 반드시 정해진 착용 손가락이 있는 것은 아닙니다. 왼손 또는 오른손의 손가락에 착용할 수 있고, 손가락에 착용하기 불편하다면 목걸이 줄에 걸어 착용하는 방식도 생각할 수 있습니다.",
      "약혼반지와 결혼반지는 지역과 문화에 따라 착용하는 손이 다를 수 있습니다. 왼손 약지를 선택하는 방식만 고정된 규칙으로 보기보다 상대의 평소 착용 습관과 편안함을 우선 확인하는 것이 좋습니다."
    ],
    "bullets": [
      "평소 자주 쓰는 손과 손가락인지 확인하기",
      "반지를 여러 개 착용하는지 살펴보기",
      "손가락 대신 목걸이 줄에 걸어 착용할 필요가 있는지 생각하기"
    ],
    "image": {
      "src": "/Image/guide/anniversary-ring-gift-selection-section-2.webp",
      "alt": "왼손과 오른손에 다양한 방식으로 착용한 기념일 반지",
      "caption": "착용 손과 손가락은 의미뿐 아니라 일상 습관도 함께 고려합니다."
    }
  },
  {
    "title": "기존 반지와 함께 착용할지 살펴보기",
    "paragraphs": [
      "기존 약혼반지 또는 결혼반지에 결혼 기념일에 추가하는 애니버서리 링이나 이터니티 링을 함께 겹쳐 착용할 수 있습니다. 여러 반지를 겹쳐 착용하려면 반지의 폭과 모양을 살펴보고, 손가락에서 닿는 위치도 서로 잘 맞는지 확인해야 합니다.",
      "약혼반지와 웨딩 밴드를 함께 착용할 때는 웨딩 밴드를 손가락 안쪽에 먼저 끼운 뒤 약혼반지를 그 위에 착용하는 방식이 전통적입니다. 그러나 착용 순서와 손은 개인의 취향과 문화에 따라 달라질 수 있으므로, 실제 조합을 상담하려면 기존 반지를 지참하는 편이 안전합니다."
    ],
    "bullets": [
      "기존 반지와 겹쳐 착용할지 별도로 착용할지 정하기",
      "반지끼리 닿는 부분과 손가락 움직임 확인하기",
      "전통적인 착용 순서를 따를지 개인 방식으로 정할지 결정하기"
    ]
  },
  {
    "title": "맞춤 상담 전에 확인할 표시와 정보",
    "paragraphs": [
      "맞춤 반지를 상담하는 과정에서는 금속 종류와 함량이 실제 상품 정보와 일치하는지 확인해야 하며, 보석의 종류와 품질 관련 설명도 함께 살펴봐야 합니다. 제품 설명만으로 판단하기보다 필요한 표시와 상담 내용을 기록해 두면 선물 후 확인에도 도움이 됩니다.",
      "사업자에게 확인해야 하는 항목으로는 가격과 재고, 제작 기간, 수리 가능 여부가 있습니다. 상담 전에는 해당 내용을 미리 정해진 사실처럼 판단하지 말고, 원하는 디자인과 착용 방식에 맞는지 각각 문의해야 합니다."
    ],
    "bullets": [
      "금속 종류와 함량 확인하기",
      "보석의 종류와 품질 관련 표시 확인하기",
      "일상 착용 방식에 맞는 내구성과 관리 안내 문의하기",
      "가격·재고·제작 기간·수리 가능 여부는 상담 시 확인하기"
    ],
    "image": {
      "src": "/Image/guide/anniversary-ring-gift-selection-section-4.webp",
      "alt": "기념일 반지 맞춤 상담에서 상품 정보를 확인하는 모습",
      "caption": "맞춤 제작과 구매 조건은 상담 시 확인한 상품 정보로 판단해야 합니다."
    }
  }
]
const cautions = [
  "프로미스 링과 약혼반지는 의미가 다를 수 있으므로, 결혼 약속을 뜻하는지 여부를 선물 전에 분명히 설명하세요.",
  "착용 손과 반지 겹침 방식에는 개인 취향과 지역·문화 차이가 있으므로 정해진 한 가지 방식만 정답으로 보지 마세요.",
  "가격, 재고, 제작 기간, 수리 가능 여부는 사업자 확인 없이 단정할 수 없습니다.",
  "금속, 보석, 품질, 함량과 내구성에 관한 설명은 실제 상품 표시와 상담 내용을 기준으로 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/find-girlfriend-ring-size-guide",
    "label": "여자친구 반지 사이즈는 기존 반지로 조용히 확인하세요",
    "description": "깜짝 기념일 선물을 준비할 때 기존 반지를 활용해 사이즈를 확인하는 방법과 오차를 줄이기 위해 함께 살펴볼 내용을 정리했습니다."
  },
  {
    "to": "/guide/wedding-band-matte-gloss",
    "label": "웨딩밴드 무광 유광 차이, 종로 결혼반지 선택 기준",
    "description": "결혼 기념일 반지와 함께 살펴볼 수 있는 웨딩밴드 표면 마감의 차이와 착용 중 확인할 기준을 정리했습니다."
  },
  {
    "to": "/guide/rose-gold-couple-ring-selection-guide",
    "label": "로즈골드 커플링, 피부톤·도금·스크래치·레이어드 확인법",
    "description": "커플링과 기념일 반지를 고를 때 색감, 표면 마감, 다른 반지와의 조화를 확인하는 방법을 정리했습니다."
  },
  {
    "to": "/guide/platinum-vs-white-gold-difference",
    "label": "화이트골드·백금 차이: 가격·무게·변색·예물 선택",
    "description": "기념일 반지의 금속을 상담하기 전에 백금과 화이트골드의 색과 관리 차이를 확인할 수 있습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '기념일 반지 선물, 관계와 착용 방식에 맞게 고르는 기준'
const gmArticleLead = '기념일 반지는 반지의 모양만 고르기보다 선물의 의미와 상대가 편하게 착용할 방식을 먼저 정하는 것이 중요합니다. 프로미스 링인지, 약혼반지인지, 결혼반지와 함께 착용할 추가 반지인지에 따라 전달해야 할 의미와 확인할 내용이 달라집니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '기념일 반지 선물 선택'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '기념일 반지 맞춤 상담'
const gmHeroAlt = '기념일 선물용 반지와 손편지가 놓인 장면'
const gmSourceNote = '반지의 의미와 착용 방식에 관한 일반 내용은 Gemological Institute of America 자료를 참고했습니다. 상품의 표시와 소비자 정보에 관한 내용은 Federal Trade Commission의 Jewelry Guides를 참고했으며, 가격·재고·제작 기간·수리 가능 여부는 사업자 상담이 필요합니다.'
const gmSources = [
  {
    "label": "A Guide to the Promise Ring Meaning: The Promise Behind Promise Rings",
    "url": "https://4cs.gia.edu/en-us/blog/guide-to-promise-ring-meaning/",
    "note": "프로미스 링의 일반적 의미, 약혼반지와의 차이, 착용 손가락과 선물 의미 설명에 참고했습니다."
  },
  {
    "label": "How to Wear Your Engagement Ring and Wedding Band",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-wear-engagement-ring-wedding-band/",
    "note": "약혼반지와 웨딩 밴드의 전통적 착용 순서, 국가와 문화에 따른 착용 방식 차이에 참고했습니다."
  },
  {
    "label": "Ring Stacking Guide: How to Style and Stack Your Rings",
    "url": "https://4cs.gia.edu/en-us/blog/guide-on-how-to-stack-rings/",
    "note": "이터니티 링을 기념일에 추가하는 사례와 여러 반지를 함께 착용하는 방식에 참고했습니다."
  },
  {
    "label": "Jewelry Guides: Helping Consumers Understand What They’re Buying",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "보석의 종류, 품질, 금속 함량, 내구성 및 서비스 가능성에 관한 표시를 사실에 맞게 확인해야 한다는 기준에 참고했습니다."
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
        image: ogImage,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
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
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
