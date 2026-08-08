<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/wedding-band-matte-gloss'
const pageTitle = '웨딩밴드 무광 유광 차이, 종로 결혼반지 선택 기준 | 귀족'
const pageDescription = '웨딩밴드 무광 유광 차이를 표면 반사, 질감, 사용 흔적, 촬영, 재마감 기준으로 비교하고 종로 결혼반지 상담 전 확인할 내용을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/wedding-band-matte-gloss-hero.webp`
const publishedAt = '2026-07-13'

const faqItems = [
  {
    "question": "웨딩밴드는 무광과 유광 중 어느 쪽이 스크래치가 덜 보이나요?",
    "answer": "두 마감 모두 착용 중 생활 스크래치가 생길 수 있습니다. 유광은 반사면에 생긴 선이 눈에 띌 수 있고, 무광은 기존 질감에 섞여 덜 도드라져 보일 수 있습니다. 반대로 무광도 마찰이 잦은 부분의 결이 눌리면 부분적으로 반사감이 달라질 수 있어 착용 환경을 함께 고려해야 합니다."
  },
  {
    "question": "유광 웨딩밴드를 나중에 무광으로 바꿀 수 있나요?",
    "answer": "가능 여부와 작업 범위는 소재, 장식, 각인, 보석 세팅, 반지의 현재 상태에 따라 달라질 수 있습니다. 민자 디자인이라도 상담 시 실제 제품을 확인한 뒤 마감 변경과 재연마 조건을 안내받는 것이 좋습니다."
  },
  {
    "question": "새틴과 브러시드 무광은 같은 마감인가요?",
    "answer": "둘 다 유광보다 반사가 적은 표면 표현으로 볼 수 있지만, 결 방향과 질감은 다를 수 있습니다. 업체마다 명칭을 사용하는 방식이 다를 수 있으므로 이름만으로 판단하지 말고 실제 샘플의 결과 입자감을 확인하세요."
  },
  {
    "question": "커플 웨딩밴드는 두 사람 모두 같은 마감으로 맞춰야 하나요?",
    "answer": "반드시 같을 필요는 없습니다. 폭, 단면, 금속 색상 등 공통 요소를 유지하면서 각자의 취향과 생활 환경에 맞춰 한쪽은 유광, 다른 쪽은 무광으로 선택할 수 있습니다."
  },
  {
    "question": "백금 웨딩밴드의 광택은 시간이 지나면 달라질 수 있나요?",
    "answer": "GIA는 백금 반지 표면에 시간이 지나 패티나가 생길 수 있으며, 더 반짝이는 외관을 원할 경우 재연마로 광택을 되살릴 수 있다고 설명합니다. 실제 관리나 재연마 조건은 반지의 상태와 디자인을 확인해 상담해야 합니다."
  }
]

const quickAnswers = [
  "무광과 유광의 핵심 차이는 금 함량이나 강도가 아니라 표면의 결과 빛 반사, 사용 흔적이 보이는 방식입니다.",
  "무광은 새틴·브러시드·매트처럼 세부 질감이 나뉠 수 있으므로 마감 이름보다 실제 샘플의 결 방향과 입자감을 확인하세요.",
  "매일 착용할 웨딩밴드는 손 모양, 반지 폭, 생활 환경, 촬영 일정과 추후 재마감 조건을 함께 비교해 선택하는 것이 좋습니다."
]

const sections = [
  {
    "title": "무광과 유광은 표면 마감의 차이입니다",
    "paragraphs": [
      "귀금속 장신구의 표면 마감은 CIBJO에서 하이폴리시, 새틴·브러시드, 매트 등으로 구분합니다. 따라서 무광과 유광은 금속 자체의 종류를 뜻하지 않으며, 표면을 어떤 방식으로 다듬고 표현했는지를 설명하는 용어입니다.",
      "유광은 하이폴리시 또는 미러라이크 폴리시처럼 빛을 비교적 선명하게 반사하도록 만든 표면입니다. 반대로 무광은 반사를 줄여 표면의 질감이 드러나도록 한 매트 계열의 표현입니다. 새틴이나 브러시드 마감은 유광과 비교할 때 반사가 적고 차분한 인상으로 볼 수 있습니다."
    ],
    "bullets": [
      "유광: 빛과 주변 윤곽이 선명하게 반사되는 편",
      "무광: 빛이 부드럽게 분산되고 표면 질감이 보이는 편",
      "마감만으로 금속의 함량이나 종류를 판단할 수 없음",
      "매장 조명과 자연광에서 실제 샘플을 함께 확인"
    ]
  },
  {
    "title": "무광도 새틴과 브러시드 등 질감이 다릅니다",
    "paragraphs": [
      "무광이라는 말만으로는 표면의 인상을 모두 설명하기 어렵습니다. 새틴과 브러시드, 매트는 결의 방향과 반사 정도가 서로 다르게 나타날 수 있습니다. 같은 명칭을 사용하더라도 제작 방식에 따라 실제 입자감이나 결은 달라질 수 있습니다.",
      "온라인 사진은 조명이나 촬영 각도에 따라 질감이 다르게 보일 수 있습니다. 상담할 때 원하는 사진을 보여주는 데 또한, 실제 샘플을 통해 결이 한 방향인지와 표면이 매끈한지, 입자감이 느껴지는지를 확인하는 것이 좋습니다."
    ],
    "bullets": [
      "새틴·브러시드·매트는 세부 질감과 반사 정도를 나누어 확인",
      "결 방향과 표면 거칠기는 샘플마다 다르게 느껴질 수 있음",
      "중앙과 가장자리에 서로 다른 마감을 적용하는 부분 마감도 비교 가능",
      "마감 명칭보다 완성 샘플의 표면 인상을 우선 확인"
    ],
    "image": {
      "src": "/Image/guide/wedding-band-matte-gloss-section-2.webp",
      "alt": "무광도 새틴과 브러시드 등 질감이 다릅니다 예시 이미지",
      "caption": "무광도 새틴과 브러시드 등 질감이 다릅니다에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "착용 환경과 반지 형태를 함께 비교하세요",
    "paragraphs": [
      "반지의 유광 마감은 선명한 반사와 가장자리 하이라이트가 두드러지고, 무광은 표면색과 형태가 차분하게 보이는 경향이 있습니다. 어느 쪽이 더 잘 맞는지는 손 모양만으로 정하기 어렵습니다. 반지 폭과 단면, 금속 색상, 평소 착용하는 액세서리를 함께 살펴 판단해야 합니다.",
      "두 마감 모두 생활 스크래치가 생길 수 있습니다. 유광은 매끈한 반사면에 난 선이 눈에 띌 수 있습니다. 반면 무광은 기존 결에 섞여 덜 도드라져 보일 수 있지만, 마찰이 잦은 부분의 결이 눌리면 반사감이 달라질 수도 있습니다."
    ],
    "bullets": [
      "반지 폭이 넓을수록 표면 마감의 인상이 더 크게 보일 수 있음",
      "유광은 반짝임과 윤곽을, 무광은 차분한 색감과 질감을 비교",
      "책상이나 손잡이 등 자주 닿는 환경을 상담 시 설명",
      "촬영 예정이라면 조명과 자연광에서 모두 샘플 확인"
    ]
  },
  {
    "title": "커플 웨딩밴드는 마감을 다르게 선택할 수 있습니다",
    "paragraphs": [
      "두 사람이 반드시 같은 마감을 고를 필요는 없습니다. 폭이나 단면, 금속 색상처럼 공통으로 정할 요소는 맞추고, 표면 마감은 각자의 취향과 생활 환경에 따라 다르게 선택하는 방법도 있습니다.",
      "부분 마감으로 한 반지의 중앙과 가장자리를 다르게 나누는 것도 가능합니다. 중앙은 무광으로, 가장자리는 유광으로 적용하는 방식입니다. 다만 세부 패턴이나 보석 세팅이 있는 디자인은 마감 변경이나 수리 범위를 추후 확인해야 하며, 확인 기준은 반지의 상태와 구조에 따라 달라집니다."
    ],
    "bullets": [
      "같은 디자인에 서로 다른 표면 마감 적용",
      "중앙 무광과 가장자리 유광의 부분 마감 비교",
      "폭과 단면을 통일해 커플 디자인의 연결감 유지",
      "혼합 마감의 경계와 추후 관리 조건을 상담 때 확인"
    ],
    "image": {
      "src": "/Image/guide/wedding-band-matte-gloss-section-4.webp",
      "alt": "무광 중앙과 유광 가장자리를 조합한 웨딩밴드 디자인",
      "caption": "한 반지 안에서도 표면 영역을 나누어 마감할 수 있습니다."
    }
  },
  {
    "title": "상담 전 확인할 마감 선택 체크리스트",
    "paragraphs": [
      "상담할 때는 ‘무광으로 해 주세요’라고만 말하기보다 원하는 표면의 반사 정도와 결 방향을 구체적으로 전달하는 편이 좋습니다. 사진만으로 판단하지 말고 실제 샘플을 정면과 측면에서 살펴본 뒤, 손가락에 착용했을 때의 모습도 확인하면 다른 인상을 비교할 수 있습니다.",
      "제작·사이즈 조정·재마감에 관한 조건은 디자인과 반지 상태, 작업 방식에 따라 달라질 수 있습니다. 촬영이나 예식 일정이 있다면 희망 날짜를 상담 시 전달하고, 선택한 마감의 변경 가능 범위와 관리 방법을 확인하세요."
    ],
    "bullets": [
      "원하는 금속 색상과 표면 반사 정도",
      "새틴·브러시드·매트 등 실제 마감 샘플",
      "반지 폭, 단면, 가장자리 형태",
      "두 사람의 마감을 같게 할지 다르게 할지",
      "부분 마감·각인·보석 세팅 여부",
      "촬영·예식 일정과 상담 시 확인할 관리 조건"
    ]
  }
]

const cautions = [
  "무광과 유광 중 어느 한쪽이 생활 스크래치에 절대적으로 강하다고 단정할 수 없습니다. 금속 소재, 반지 구조, 착용 환경에 따라 보이는 방식이 달라질 수 있습니다.",
  "마감 변경이나 재연마 가능 여부는 반지의 소재, 장식, 세팅, 현재 상태에 따라 달라질 수 있으므로 상담 전 확정할 수 없습니다.",
  "거친 수세미나 사포로 무광 표면을 직접 보정하면 결 방향과 표면 상태가 달라질 수 있으므로 임의 작업은 피하고 제품 상태를 먼저 확인하세요."
]

const relatedLinks = [
  {
    "to": "/guide/platinum-vs-white-gold-difference",
    "label": "화이트골드·백금 차이: 예물 반지 소재 선택 기준",
    "description": "백금과 화이트골드의 소재와 관리 차이를 비교해 웨딩밴드 선택 기준을 정리했습니다."
  },
  {
    "to": "/guide/gold-filled-vermeil-plated-difference",
    "label": "골드필드·골드버메일·금도금 차이",
    "description": "금속 표면과 금층 구조, 표기와 관리 차이를 구분해 설명합니다."
  },
  {
    "to": "/guide/hollow-vs-solid-gold-jewelry",
    "label": "중공 금제품·솔리드 금제품 차이",
    "description": "금제품의 내부 구조와 중량, 착용 시 확인할 항목을 정리했습니다."
  }
]

const updatedAt = '2026-08-08'
// guide-manager:data:start
const gmArticleTitle = '웨딩밴드 무광 유광 차이, 종로 결혼반지 선택 기준'
const gmArticleLead = '웨딩밴드의 무광과 유광은 금속 종류나 함량에서 나뉘는 것이 아니라 표면 마감에 따라 구분됩니다. 빛의 반사와 표면 질감, 생활 흔적이 보이는 방식이 서로 다르므로 실제 샘플을 착용 환경과 함께 비교해 선택하는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '웨딩밴드 무광 유광 차이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '웨딩밴드 무광 유광 맞춤제작'
const gmHeroAlt = '무광과 유광 웨딩밴드의 표면 마감을 나란히 비교한 모습'
const gmSourceNote = '표면 마감의 정의와 웨딩밴드의 마감 조합, 백금 표면 변화에 관한 내용은 아래 승인된 CIBJO 및 GIA 자료를 바탕으로 작성했습니다. 가격, 제작 기간, 재고, 등급, 인증 및 개별 제품의 수리 가능 여부는 사업자 제공 사실이 없어 기재하지 않았습니다.'
const gmSources = [
  {
    "label": "CIBJO Retailers’ Reference Guide: Precious Metals",
    "url": "https://cibjo.org/rrg/wp-content/uploads/2021/10/CIBJO%20RRG%20%28Precious%20Metals%29.pdf",
    "note": "금·백금 장신구의 하이폴리시, 새틴·브러시드, 매트 등 표면 마감 구분의 근거입니다."
  },
  {
    "label": "GIA: Best Ring Material for Everyday Wear",
    "url": "https://4cs.gia.edu/en-us/blog/best-ring-material-everyday-wear/",
    "note": "반지의 고광택·매트 마감과 백금 표면의 패티나 및 재연마 설명의 근거입니다."
  },
  {
    "label": "GIA: Matching Jewelry for Couples",
    "url": "https://4cs.gia.edu/en-us/blog/matching-jewelry-for-couples/",
    "note": "커플 주얼리에서 브러시드 마감과 매트·유광 조합을 소개하는 근거입니다."
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
        { name: '웨딩밴드 무광 유광 차이', path: pagePath },
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
