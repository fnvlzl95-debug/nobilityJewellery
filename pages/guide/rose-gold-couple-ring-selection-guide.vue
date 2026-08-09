<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/rose-gold-couple-ring-selection-guide'
const pageTitle = '로즈골드 커플링, 피부톤·도금·스크래치·레이어드 확인법 | 귀족'
const pageDescription = '로즈골드 커플링을 고를 때 피부톤보다 실제 색감, 도금 여부와 바탕 금속, 표면 마감, 다른 반지와의 조화를 확인하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/rose-gold-couple-ring-selection-guide-hero.webp`
const publishedAt = '2026-08-09'
const updatedAt = ''
const faqItems = [
  {
    "question": "로즈골드는 어떤 피부톤에 가장 잘 어울리나요?",
    "answer": "특정 피부톤에만 어울린다고 단정하기는 어렵습니다. 로즈골드도 구리 비율과 합금 구성에 따라 색감이 다르므로, 손에 직접 대어 피부와의 대비와 평소 옷 색상과의 조화를 확인하는 것이 좋습니다."
  },
  {
    "question": "로즈골드 도금은 오래 착용해도 색이 그대로인가요?",
    "answer": "도금층은 착용 방식과 도금층의 두께 등에 따라 시간이 지나며 마모될 수 있습니다. 도금 여부, 바탕 금속, 금 함량과 함께 관리 방법을 구매 전에 확인하세요."
  },
  {
    "question": "스크래치가 덜 보이는 로즈골드 마감이 있나요?",
    "answer": "유광뿐 아니라 무광, 해머드, 결 마감도 비교할 수 있습니다. 표면 질감이 있는 마감은 작은 사용 흔적이 덜 눈에 띌 수 있지만, 실제 내구성과 마모 정도는 제품의 합금과 사용 환경에 따라 달라집니다."
  },
  {
    "question": "로즈골드와 옐로골드를 함께 레이어드해도 되나요?",
    "answer": "함께 착용할 수 있습니다. 색상 차이, 반지 폭, 두께, 표면 마감을 함께 보고 실제 제품을 같은 손가락에 착용해 균형과 걸림을 확인하세요."
  }
]
const quickAnswers = [
  "로즈골드는 피부톤만으로 고르기보다 여러 색감의 제품을 손에 직접 대어 대비와 조화를 확인하는 편이 좋습니다.",
  "도금 제품은 도금 여부와 바탕 금속, 표시된 금 함량을 확인해야 하며 도금층은 착용 방식과 두께에 따라 마모될 수 있습니다.",
  "스크래치가 걱정되면 유광뿐 아니라 무광이나 결 마감도 비교하고, 레이어드는 실제 제품을 함께 착용해 폭과 색상 차이를 살펴보세요."
]
const sections = [
  {
    "title": "피부톤보다 실제 색감과 대비 확인하기",
    "paragraphs": [
      "금에 구리와 때로는 다른 금속을 섞어 만든 합금이 로즈골드입니다. 같은 로즈골드라도 구리 비율과 합금 구성에 따라 분홍빛의 강도는 물론 따뜻한 느낌까지 달라질 수 있습니다.",
      "로즈골드는 따뜻한 피부에 자연스럽게 이어질 수 있지만, 피부톤만으로 어울림을 단정하기는 어렵습니다. 손등이나 평소 반지를 착용하는 손가락에 제품을 대어 본 뒤 피부와의 대비와 손의 밝기를 확인하고, 평소 옷 색상과도 조화를 이루는지 살펴보세요."
    ],
    "bullets": [
      "밝은 로즈골드와 붉은 기가 강한 로즈골드를 나란히 비교하기",
      "실내 조명과 자연광에서 색감이 어떻게 보이는지 확인하기",
      "두 사람이 같은 색을 선택할지, 각자 다른 색을 고를지 함께 착용해 보기"
    ]
  },
  {
    "title": "도금인지 합금인지 표시 확인하기",
    "paragraphs": [
      "제품이 로즈골드처럼 보이더라도 그 이유만으로 소재를 판단할 수는 없습니다. 구매 전에는 금 도금인지 금 합금 제품인지부터 확인하고, 바탕 금속과 금의 순도, 관련 표시가 어떻게 적혀 있는지도 살펴보세요.",
      "착용 방식과 도금층의 두께 등에 따라 금 도금은 시간이 지나면서 마모될 수 있습니다. 도금 제품을 구매한다면 표면이 닳았을 때 보일 수 있는 바탕 금속과 관리 방법을 확인하고, 상담 가능한 범위도 함께 물어보는 것이 좋습니다."
    ],
    "bullets": [
      "제품 설명에서 도금 여부와 바탕 금속 확인하기",
      "금 함량 또는 순도 표시가 제품 설명과 보증 자료에 정확히 기재됐는지 살펴보기",
      "구리나 니켈 등 합금 금속에 민감하다면 합금 정보를 먼저 문의하기"
    ],
    "image": {
      "src": "/Image/guide/rose-gold-couple-ring-selection-guide-section-2.webp",
      "alt": "도금인지 합금인지 표시 확인하기 예시 이미지",
      "caption": "도금인지 합금인지 표시 확인하기에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "스크래치와 표면 마감 비교하기",
    "paragraphs": [
      "금은 순도와 합금 구성에 따라 경도와 내구성이 달라질 수 있습니다. 일상 착용 반지는 생활 습관과 마감에 따라 표면에 사용 흔적이 생길 수 있으므로, 스크래치가 전혀 생기지 않는다고 기대하기보다 두 가지를 함께 고려해야 합니다.",
      "유광 표면은 반사가 선명해 처음에는 또렷한 인상을 주지만, 작은 흔적도 눈에 띌 수 있습니다. 반면 무광, 해머드, 결 마감은 표면 질감이 있어 작은 마모가 상대적으로 덜 보일 수 있으므로 두 사람이 선호하는 관리 방식에 맞춰 비교해 보시기 바랍니다."
    ],
    "bullets": [
      "유광은 반짝임과 선명한 색감을 우선할 때 비교하기",
      "무광이나 결 마감은 질감과 사용 흔적의 보임 정도를 함께 확인하기",
      "반지끼리 부딪히는 착용 습관과 손을 많이 쓰는 일을 고려하기"
    ]
  },
  {
    "title": "레이어드 조합에서 색상과 폭 맞추기",
    "paragraphs": [
      "서로 다른 금색을 함께 착용하는 조합도 가능합니다. 예를 들어 로즈골드와 옐로골드를 함께 선택할 수 있으며, 금색의 차이가 클수록 의도적인 포인트가 됩니다. 차이가 작으면 자연스럽게 이어지는 느낌이 날 수 있습니다.",
      "레이어드 반지는 색상만으로 판단하기 어렵습니다. 반지 폭과 두께, 표면 마감, 손가락 사이의 간격을 함께 봐야 하므로 사진만으로 결정하기보다 실제 제품을 같은 손가락에 착용해 보시기 바랍니다. 그때 디자인 균형과 걸림을 확인할 수 있습니다."
    ],
    "bullets": [
      "같은 계열의 로즈골드로 통일해 차분한 조합 만들기",
      "로즈골드와 옐로골드를 섞어 색상 대비 만들기",
      "얇은 반지와 기본 폭 반지를 겹쳐 폭과 높이의 균형 확인하기",
      "유광과 무광을 섞을 때 반사와 질감의 차이 살펴보기"
    ],
    "image": {
      "src": "/Image/guide/rose-gold-couple-ring-selection-guide-section-4.webp",
      "alt": "로즈골드 커플링에 옐로골드와 얇은 반지를 겹쳐 착용한 모습",
      "caption": "레이어드는 실제 착용 상태에서 색상과 폭의 균형을 확인하는 것이 좋습니다."
    }
  },
  {
    "title": "상담 전에 정리할 선택 기준",
    "paragraphs": [
      "먼저 두 사람이 원하는 색감과 마감이 같은지, 각자의 우선순위부터 정리해 보시기 바랍니다. 한 사람은 분홍빛과 유광을 선호하고 다른 사람은 은은한 색감과 무광을 선호할 수 있습니다. 이 경우에는 같은 디자인을 유지하되 마감이나 폭만 다르게 하여 비교하는 방법도 있습니다.",
      "수영장, 표백제, 강한 세정제처럼 염소나 강한 화학물질에 노출되는 상황에서는 반지를 빼는 것이 권장됩니다. 평소 착용 환경과 합금 민감성을 상담 때 함께 알려야 보다 적합한 선택지를 검토할 수 있습니다."
    ],
    "bullets": [
      "선호 색감: 은은한 분홍빛인지 붉은 기가 있는 색인지",
      "표면 마감: 유광, 무광, 해머드, 결 마감 중 무엇인지",
      "레이어드 계획: 단독 착용인지 다른 금색과 함께 착용할지",
      "민감성 및 생활 환경: 합금 정보와 화학물질 노출 여부"
    ]
  }
]
const cautions = [
  "로즈골드의 색상, 도금 여부, 금 함량, 합금 구성은 제품마다 다를 수 있으므로 실제 제품 표시와 상담 내용을 기준으로 확인해야 합니다.",
  "도금 제품의 마모 정도와 표면 손상은 착용 습관, 도금층의 두께, 관리 환경에 따라 달라질 수 있으며 특정 기간이나 상태를 미리 단정하기 어렵습니다.",
  "구리나 니켈 등 특정 합금 금속에 민감한 경우 착용 전 합금 정보를 확인하고, 불편함이 생기면 착용을 중단한 뒤 전문가와 상담하세요."
]
const relatedLinks = [
  {
    "to": "/guide/couple-ring-engraving-guide",
    "label": "커플링 각인, 문구·위치·서체 정하는 법",
    "description": "커플링 각인을 정할 때 문구와 위치, 서체, 글자 수를 확인하는 방법을 정리했습니다."
  },
  {
    "to": "/guide/gold-plating-repair",
    "label": "금반지·화이트골드 도금 수리, 변색·광택 상담 전 기준",
    "description": "도금과 표면 상태를 상담하기 전에 변색과 광택 저하를 확인하는 기준을 안내합니다."
  },
  {
    "to": "/guide/jongno-custom-couple-ring-order",
    "label": "종로 커플링 주문제작, 상담부터 수령까지 확인할 것",
    "description": "주문제작 상담 전 소재, 폭, 두께, 호수, 마감과 각인을 정리하는 순서를 소개합니다."
  },
  {
    "to": "/guide/wedding-band-matte-gloss",
    "label": "웨딩밴드 무광 유광 차이, 종로 결혼반지 선택 기준",
    "description": "무광과 유광의 표면 반사, 질감과 사용 흔적을 비교하는 기준을 정리했습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '로즈골드 커플링, 피부톤·도금·스크래치·레이어드 확인법'
const gmArticleLead = '제품마다 분홍빛과 색감이 다를 수 있는 이유는 로즈골드가 금에 구리 등을 섞어 만든 합금이기 때문입니다. 따라서 피부톤만으로 선택을 좁히기보다 실제 반지를 손에 대어 보고, 도금 여부와 순도 표시를 확인한 뒤 표면 마감과 레이어드 조합도 함께 살펴보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '로즈골드 커플링 선택'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '로즈골드 커플링의 색감, 도금 여부, 표면 마감, 레이어드 조합 상담'
const gmHeroAlt = '서로 다른 색감과 표면 마감의 로즈골드 커플링을 손가락에 함께 착용한 모습'
const gmSourceNote = '금속 함량과 도금 표시, 로즈골드의 합금 구성과 색상 차이, 주얼리 관리와 화학물질 주의사항은 아래 공식 자료를 바탕으로 정리했습니다. 실제 제품의 표시와 상담 내용이 우선합니다.'
const gmSources = [
  {
    "label": "Federal Trade Commission, Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "금의 순도 표시, 금 합금의 경도와 내구성, 도금의 마모 가능성에 관한 소비자 안내입니다."
  },
  {
    "label": "Federal Trade Commission, Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속의 종류, 품질, 금속 함량과 처리 내용을 정확히 표시해야 한다는 공식 기준 안내입니다."
  },
  {
    "label": "GIA, Rose Gold vs. Yellow Gold: Discover the Differences",
    "url": "https://4cs.gia.edu/en-us/blog/yellow-gold-vs-rose-gold/",
    "note": "로즈골드의 합금 구성과 구리 비율에 따른 색상, 피부톤과 다른 금색의 조합을 설명합니다."
  },
  {
    "label": "GIA, Tips on Caring for Jewelry",
    "url": "https://www.gia.edu/articles/gia-news-research-tips-caring-jewelry",
    "note": "화학물질과 염소가 금 합금과 보석에 미칠 수 있는 영향 및 기본 관리법을 설명합니다."
  },
  {
    "label": "GIA, Guide to White, Yellow, and Rose Gold Engagement Rings",
    "url": "https://4cs.gia.edu/en-us/blog/buying-guide-white-yellow-rose-gold-engagement-rings/",
    "note": "로즈골드의 합금 금속, 순도 표기, 색상 특성과 금속 민감성 주의사항을 설명합니다."
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
