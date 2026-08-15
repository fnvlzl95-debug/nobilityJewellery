<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/wedding-paemul-yesul-difference'
const pageTitle = '결혼 패물과 예물의 차이, 준비 범위는 이렇게 정리하세요 | 귀족'
const pageDescription = '결혼 예물과 패물의 의미를 구분하고, 오늘날 준비 범위를 양가 합의와 귀금속·장신구 중심으로 정리한 안내입니다.'
const ogImage = `${siteConfig.url}/Image/guide/wedding-paemul-yesul-difference-hero.webp`
const publishedAt = '2026-08-15'
const updatedAt = ''
const faqItems = [
  {
    "question": "패물과 예물은 같은 뜻인가요?",
    "answer": "완전히 같은 뜻으로 보기보다 예물이 더 넓은 개념이고, 패물은 그중 귀금속과 장신구에 가까운 범주로 이해하는 것이 적절합니다. 실제 사용은 가정과 상담 상황에 따라 달라질 수 있습니다."
  },
  {
    "question": "결혼 패물로 반드시 준비해야 하는 품목이 있나요?",
    "answer": "법적으로 정해진 필수 목록이 있다고 보기는 어렵습니다. 반지나 귀금속 장신구를 기본으로 할지, 다른 물품을 더할지는 두 사람과 양가가 합의해 정하면 됩니다."
  },
  {
    "question": "시계나 가방도 패물에 포함되나요?",
    "answer": "시계나 가방을 예물로 준비하는 경우가 있을 수 있지만, 귀금속과 장신구 중심의 패물 범위와는 별도로 정하는 항목으로 안내하는 편이 안전합니다. 포함 여부는 양가 합의가 필요합니다."
  },
  {
    "question": "전통적으로 예물 목록은 정해져 있었나요?",
    "answer": "전통 혼례의 물목은 하나의 고정 목록만 있었던 것이 아니며, 지역과 가정에 따라 의류, 직물, 음식, 패물 등 여러 물품이 포함될 수 있었습니다."
  }
]
const quickAnswers = [
  "예물은 결혼 때 서로 주고받는 물건을 넓게 뜻하고, 패물은 그중 귀금속과 장신구류를 가리키는 말로 정리할 수 있습니다.",
  "패물의 기본 범위는 양가가 합의한 반지나 귀금속 장신구이며, 시계·가방·의류·현금성 물품은 별도 합의 사항입니다.",
  "전통 혼례에도 고정된 단일 목록은 없었으므로, 현재는 예산·착용 목적·양가 관례를 먼저 정한 뒤 품목을 선택하는 편이 좋습니다."
]
const sections = [
  {
    "title": "예물과 패물은 무엇이 다른가요",
    "paragraphs": [
      "감사나 예의를 나타내기 위해 보내는 물건을 예물이라고 하며, 결혼 맥락에서는 신랑과 신부가 결혼할 때 서로 주고받는 물건을 가리킵니다.",
      "패물은 결혼 예물 전체와 완전히 같은 말은 아닙니다. 혼례와 함께 마련하거나 주고받던 귀금속과 장신구류를 뜻하는 범주로 이해하는 것이 적절합니다.",
      "실무적으로 정리하면 예물이 더 넓은 개념이며, 패물은 그 안에 포함되는 귀금속·장신구 부분입니다."
    ],
    "bullets": [
      "예물: 결혼과 관련해 주고받는 물품 전반",
      "패물: 반지·목걸이·귀걸이 등 귀금속과 장신구 중심의 물품",
      "두 표현의 사용 범위는 가정과 상담 상황에 따라 달라질 수 있음"
    ]
  },
  {
    "title": "전통 혼례의 물목과 오늘날의 차이",
    "paragraphs": [
      "전통 혼례에서는 폐물과 예물의 내용을 적은 물목을 따로 마련하는 절차가 있었습니다. 주고받는 물품도 하나의 고정 목록으로만 정해져 있지는 않았습니다.",
      "의류, 이불, 솜, 직물, 술, 떡, 패물 등이 혼례 물품에 포함될 수 있었습니다. 따라서 예물의 범위는 시대와 지역뿐 아니라 가정의 방식에 따라서도 달라져 왔다고 볼 수 있습니다.",
      "오늘날에는 법적으로 정해진 예물 필수 목록이 있다고 보기보다, 두 사람과 양가가 준비할 범위를 미리 합의하는 방식이 현실적입니다."
    ],
    "bullets": [
      "전통 혼례의 물목은 지역과 가정에 따라 달라질 수 있었음",
      "패물은 여러 혼례 물품 가운데 귀금속·장신구에 해당하는 부분으로 볼 수 있음",
      "현재의 준비 범위는 전통 목록보다 당사자의 합의가 중요함"
    ],
    "image": {
      "src": "/Image/guide/wedding-paemul-yesul-difference-section-2.webp",
      "alt": "전통 혼례 물목과 현대 예물을 함께 떠올리게 하는 장신구",
      "caption": "예물의 구성은 시대와 가정의 방식에 따라 달라질 수 있습니다."
    }
  },
  {
    "title": "결혼 패물 준비 범위 정하는 순서",
    "paragraphs": [
      "먼저 두 사람이 예물을 준비할지 여부를 정합니다. 준비하기로 했다면 서로 어떤 물품을 주고받을지도 함께 정해야 합니다. 이후 양가에 전달할 내용을 같은 기준으로 정리하면 불필요한 오해를 줄이는 데 도움이 됩니다.",
      "귀금속을 준비할 때는 반지, 목걸이, 귀걸이 등의 범위를 착용 빈도와 생활 방식에 맞춰 정할 수 있습니다. 품목을 많이 늘리기보다는 실제로 자주 착용할 제품을 우선 검토하는 편이 좋습니다.",
      "의류, 시계, 가방, 현금성 물품 등을 포함할지는 패물의 기본 범위와 따로 합의해야 합니다. 특정 품목을 관례라고 단정하지 말고, 준비할지 여부와 부담 기준을 함께 확인해야 합니다."
    ],
    "bullets": [
      "두 사람의 희망 품목과 생략할 품목 정하기",
      "양가에 전달할 준비 범위와 부담 기준 맞추기",
      "귀금속·장신구는 착용 목적과 관리 방법 확인하기",
      "시계·가방·의류 등은 별도 항목으로 합의하기",
      "상담 전 원하는 소재, 디자인, 예산 범위를 정리하기"
    ]
  },
  {
    "title": "상담 전에 확인할 내용",
    "paragraphs": [
      "패물 상담을 받을 때는 원하는 품목과 착용 대상을 먼저 나눠 정리합니다. 또 매일 착용할지 특별한 날에 사용할지도 살펴봐야 합니다. 같은 장신구라도 사용 목적에 따라 디자인과 관리 방법을 다르게 살펴볼 수 있습니다.",
      "제품을 비교할 때는 소재 표기와 보석의 종류 및 처리 여부를 먼저 확인합니다. 이어 구성품과 제공되는 서류가 있는지도 차례로 살펴보는 것이 좋습니다. 개별 제품의 재고, 제작 가능 여부, 가격과 기간은 상담 시점과 선택 사양에 따라 달라질 수 있으므로 함께 확인해야 합니다."
    ],
    "bullets": [
      "준비할 품목과 착용자를 구분하기",
      "매일 착용할 제품과 기념용 제품을 나누기",
      "소재와 보석 관련 표기 확인하기",
      "가격·제작 기간·수리 및 관리 조건은 상담 시 확인하기"
    ],
    "image": {
      "src": "/Image/guide/wedding-paemul-yesul-difference-section-4.webp",
      "alt": "상담 전에 확인할 내용 예시 이미지",
      "caption": "상담 전에 확인할 내용에서 확인할 부분을 보여주는 이미지입니다."
    }
  }
]
const cautions = [
  "예물과 패물의 사용 범위는 가정과 지역에 따라 다를 수 있으므로, 한 가지 관례를 모든 경우에 적용하지 마세요.",
  "개별 제품의 가격, 재고, 제작 기간, 수리 가능 여부, 보석 등급과 인증은 제공되는 제품 정보와 상담 시점에 따라 달라질 수 있습니다.",
  "전통 혼례의 물목을 오늘날 반드시 준비해야 하는 목록으로 해석하지 말고, 두 사람과 양가의 합의를 기준으로 결정하세요."
]
const relatedLinks = [
  {
    "to": "/guide/platinum-vs-white-gold-difference",
    "label": "화이트골드·백금 차이: 가격·무게·변색·예물 선택",
    "description": "예물 반지 소재를 고를 때 백금과 화이트골드의 차이, 관리와 선택 기준을 살펴볼 수 있습니다."
  },
  {
    "to": "/guide/wedding-band-matte-gloss",
    "label": "웨딩밴드 무광 유광 차이, 종로 결혼반지 선택 기준",
    "description": "웨딩밴드 표면 질감과 사용 흔적, 재마감 기준을 비교해 볼 수 있습니다."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 차이, 다이아·유색보석 보고서 읽는 법",
    "description": "예물 보석을 고를 때 감정서와 감별서의 검사 범위를 확인하는 데 도움이 됩니다."
  },
  {
    "to": "/guide/diamond-3bu-5bu-difference",
    "label": "다이아 3부 5부 차이, 예물 반지 고를 때 가격·크기 기준",
    "description": "다이아 예물 반지의 크기와 감정서, 선택 기준을 비교해 볼 수 있습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '결혼 패물과 예물의 차이, 준비 범위는 이렇게 정리하세요'
const gmArticleLead = '결혼을 앞두고 신랑과 신부가 주고받는 물건을 넓게 예물이라고 하며, 그중 귀금속이나 장신구에 해당하는 부분은 패물로 이해할 수 있습니다. 다만 실제 준비 목록은 가정과 지역, 예산에 따라 달라지고, 두 사람의 합의도 영향을 줄 수 있습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '결혼 패물 예물 차이'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '결혼 패물과 예물의 차이 및 준비 범위 상담'
const gmHeroAlt = '결혼 예물로 준비하는 반지와 귀금속 장신구'
const gmSourceNote = '예물의 일반적 의미와 전통 혼례의 물목, 패물과 장신구의 관계를 승인된 공공 자료를 바탕으로 정리했습니다. 개별 제품의 가격이나 제작 조건은 포함하지 않았습니다.'
const gmSources = [
  {
    "label": "한국어기초사전: 예물",
    "url": "https://krdict.korean.go.kr/m/eng/searchResult?ParaWordNo=90968&currentPage=9&exaType=&font_size=12&mainSearchWord=%EC%98%88&nation=eng&nationCode=6&proverbType=&searchType=W&sort=W&viewType=A&wordMatchFlag=N",
    "note": "국립국어원이 제공하는 사전으로, 예물의 일반적 의미와 결혼 때 신랑·신부가 주고받는 물건이라는 뜻을 확인할 수 있습니다."
  },
  {
    "label": "한국민족문화대백과사전: 육례",
    "url": "https://encykorea.aks.ac.kr/Article/E0042087",
    "note": "한국학중앙연구원이 제공하는 자료로, 전통 혼례의 폐물·예물·물목과 혼례 절차를 확인할 수 있습니다."
  },
  {
    "label": "한국민족문화대백과사전: 장신구",
    "url": "https://encykorea.aks.ac.kr/Article/E0048637",
    "note": "한국 전통 장신구와 패물의 관계, 패물에 포함되는 장신구 사례를 확인할 수 있습니다."
  },
  {
    "label": "국립고궁박물관: 왕실의 장신구",
    "url": "https://www.gogung.go.kr/ebook/access/ecatalogt.jsp?Dir=150&callmode=admin&catimage=&eclang=ko&start=130&um=s",
    "note": "전통적인 패물과 장신구의 유형 및 귀금속·보석 장식 사례를 확인할 수 있습니다."
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
