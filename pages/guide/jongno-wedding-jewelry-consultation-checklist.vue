<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-wedding-jewelry-consultation-checklist'
const pageTitle = '결혼예물 상담 전 확인할 체크리스트 | 귀족'
const pageDescription = '종로에서 결혼예물을 상담하기 전 예산, 금속과 보석 사양, 반지 치수, 계약 조건, 증빙자료를 확인하는 방법을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-wedding-jewelry-consultation-checklist-hero.webp`
const publishedAt = '2026-08-06'
const updatedAt = ''
const faqItems = [
  {
    "question": "결혼예물 상담 전 예산은 어떻게 준비하면 좋나요?",
    "answer": "총액만 정하기보다 금속 종류·순도, 중량, 보석, 세공 관련 비용 등 항목으로 나누어 정리한 뒤 항목별 견적을 요청하세요. 실제 금액은 제품 사양과 상담 시점의 조건에 따라 달라질 수 있습니다."
  },
  {
    "question": "결혼반지 상담에서 확인할 제품 정보는 무엇인가요?",
    "answer": "금속 종류와 함량 또는 순도, 중량, 보석의 종류와 사양, 반지 치수·폭·두께·마감·각인 등을 확인하세요. 합의한 사양이 주문서에 기록되고 제품 설명과 일치하는지도 살펴보는 것이 좋습니다."
  },
  {
    "question": "다이아몬드 상담 때 무엇을 물어봐야 하나요?",
    "answer": "컷, 색, 클래리티, 캐럿 중량으로 구성된 4Cs를 확인할 수 있습니다. 천연·합성 여부와 감지 가능한 처리 여부, 관련 정보가 보석 리포트 또는 품질보증서에 기재되는지도 문의하세요."
  },
  {
    "question": "교환·환급 조건은 계약 전에 확인해야 하나요?",
    "answer": "네. 귀금속의 단순 변심에 따른 교환·환급이 자동으로 보장된다고 단정할 수 없으므로, 계약 전에 교환·환급 조건과 수리·품질보증 범위를 서면으로 확인하는 것이 좋습니다."
  },
  {
    "question": "상담 후에는 어떤 자료를 보관해야 하나요?",
    "answer": "계약서, 영수증, 품질보증서, 제품 설명이나 광고 자료를 보관하세요. 서류에 기재된 제품 사양과 계약 조건이 상담 내용과 일치하는지도 확인해야 합니다."
  }
]
const quickAnswers = [
  "예산은 총액만 정하기보다 금속 종류·순도, 중량, 보석, 세공 관련 비용 등 항목별 견적을 요청해 비교하세요.",
  "금속·순도·중량·보석 정보와 반지 치수·폭·마감·각인 등 합의한 사양이 주문서에 기재되는지 확인하세요.",
  "총액, 결제 조건, 인도 예정일, 교환·환급 조건, 수리·품질보증 범위는 서면으로 확인하고 계약서와 영수증을 보관하세요."
]
const sections = [
  {
    "title": "예산과 우선순위를 먼저 정리하기",
    "paragraphs": [
      "예산은 총액 하나로만 정하기보다 금속 종류와 순도, 중량, 보석, 세공 관련 비용 등으로 나누어 상담받으면 항목별 내용을 비교하기 편합니다. 견적을 받을 때에는 각 항목이 어떤 제품 사양을 기준으로 산정됐는지 함께 확인하세요.",
      "두 사람이 꼭 포함하고 싶은 품목과 조정 가능한 항목을 미리 구분해 두는 것도 도움이 됩니다. 실제 견적과 구성은 소재, 중량, 보석, 디자인 및 상담 시점의 조건에 따라 달라질 수 있으므로 상담받은 내용을 기준으로 판단해야 합니다."
    ],
    "bullets": [
      "총액과 항목별 비용을 구분해 기록하기",
      "금속, 보석, 디자인 가운데 우선순위 정하기",
      "희망 수령일이 있다면 상담 시 전달하고 주문서 기재 여부 확인하기",
      "비교할 디자인 사진이나 원하는 분위기 정리하기"
    ],
    "image": {
      "src": "/Image/guide/jongno-wedding-jewelry-consultation-checklist-section-1.webp",
      "alt": "결혼예물 상담 예산과 우선순위를 기록한 노트 옆의 웨딩밴드",
      "caption": "총액과 비용 구성을 나누어 기록하면 상담 내용을 비교하기 쉽습니다."
    }
  },
  {
    "title": "금속·순도와 보석 사양 확인하기",
    "paragraphs": [
      "금·백금·백색금·은 등 금속 종류와 함량 또는 순도 표시를 확인하고, 상담 중 안내받은 제품 설명이 주문서의 표시와 일치하는지 살펴보세요. 귀금속 합금의 순도와 표시는 제품 및 적용 기준에 따라 확인 방식이 달라질 수 있으므로, 각인이나 서류에 적힌 내용의 의미를 상담 시 확인하는 것이 좋습니다.",
      "다이아몬드는 컷(Cut), 색(Color), 클래리티(Clarity), 캐럿 중량(Carat Weight)의 4Cs를 확인할 수 있습니다. 다이아몬드나 유색 보석을 선택한다면 천연·합성 여부와 감지 가능한 처리 여부를 확인하고, 관련 정보가 보석 리포트 또는 품질보증서에 기재되는지도 확인하세요."
    ],
    "bullets": [
      "금속 종류와 함량·순도 표시",
      "제품별 중량 표기와 주문서 기재 내용",
      "다이아몬드의 4Cs와 캐럿 중량",
      "보석의 천연·합성 여부 및 감지 가능한 처리 여부",
      "리포트 또는 품질보증서에 적힌 정보"
    ],
    "image": {
      "src": "/Image/guide/jongno-wedding-jewelry-consultation-checklist-section-2.webp",
      "alt": "다이아몬드가 세팅된 결혼반지와 보석 정보를 살펴보는 상담 장면",
      "caption": "보석의 품질 정보와 리포트·품질보증서의 기재 항목을 함께 확인하세요."
    }
  },
  {
    "title": "반지 치수와 맞춤 사양 기록하기",
    "paragraphs": [
      "두 사람의 손가락 치수와 원하는 착용감을 상담 전에 생각해 두세요. 반지 폭, 두께, 디자인, 손가락에 닿는 형태에 따라 같은 치수라도 느껴지는 착용감이 달라질 수 있으므로 실제 착용 시 확인하는 것이 좋습니다.",
      "주문제작이나 맞춤 요소가 있는 경우에는 반지 치수와 함께 소재, 폭, 두께, 마감, 각인 등 합의한 사양이 주문서에 빠짐없이 적히는지 확인하세요. 각인처럼 개별 주문 내용에 해당하는 항목은 변경 가능 여부와 확정 시점을 계약 전 상담을 통해 확인해야 합니다."
    ],
    "bullets": [
      "두 사람의 희망 치수와 실제 착용감",
      "반지 폭·두께·디자인",
      "표면 마감과 각인 내용",
      "주문서에 기재된 맞춤 사양",
      "제품 설명과 서면 사양의 일치 여부"
    ],
    "image": {
      "src": "/Image/guide/jongno-wedding-jewelry-consultation-checklist-section-3.webp",
      "alt": "고객의 손가락에 반지 치수 측정 도구를 대는 귀금속 상담 장면",
      "caption": "치수와 착용감은 실제 손에 맞춰 확인하고 합의한 사양은 주문서에 기록하세요."
    }
  },
  {
    "title": "계약 조건과 증빙자료 챙기기",
    "paragraphs": [
      "계약 전에는 제품별 금속·순도·중량·보석 정보, 총액과 비용 구성, 결제 조건, 인도 예정일을 서면으로 확인하세요. 교환·환급 조건과 수리·품질보증 범위도 계약서 또는 별도 서류에서 확인하고, 구두로 안내받은 내용이 있다면 서면 자료에 반영되는지 문의하는 것이 좋습니다.",
      "상담 및 계약 후에는 계약서, 영수증, 품질보증서, 제품 설명이나 광고 자료를 보관하세요. 귀금속의 단순 변심에 따른 교환·환급이 자동으로 보장된다고 단정하기 어려우므로, 적용 조건을 계약 전에 확인해야 합니다."
    ],
    "bullets": [
      "제품별 사양과 총액·비용 구성",
      "결제 조건과 인도 예정일",
      "교환·환급 조건",
      "수리·품질보증 범위",
      "계약서·영수증·품질보증서·제품 설명 자료 보관"
    ],
    "image": {
      "src": "/Image/guide/jongno-wedding-jewelry-consultation-checklist-section-4.webp",
      "alt": "결혼예물 주문서와 영수증, 품질보증 관련 서류를 확인하는 손",
      "caption": "상담 내용과 계약 조건은 서면으로 남기고 관련 증빙자료를 보관하세요."
    }
  }
]
const cautions = [
  "귀금속의 가격, 제작 가능 여부, 재고, 인도 시점, 수리 범위는 제품 사양과 상담 시점 및 개별 계약 조건에 따라 달라질 수 있습니다. 일반적인 안내만으로 확정하지 말고 상담 및 서면 조건을 확인하세요.",
  "순도·중량·보석 정보와 교환·환급·품질보증 조건은 제품별 서류와 계약 내용을 우선 확인하세요. 단순 변심에 따른 교환·환급이 자동으로 보장된다고 단정할 수 없습니다.",
  "보석 리포트나 품질보증서가 제공되는 경우에도 발행 주체와 실제 기재 항목, 적용 범위를 개별적으로 확인하는 것이 좋습니다."
]
const relatedLinks = [
  {
    "to": "/guide/jongno-jewelry-store-visit-guide",
    "label": "종로 금은방 방문 예약, 상담 전 준비하면 좋은 것",
    "description": "종로 금은방 방문 전 예약이 필요한 경우와 사진, 예산, 희망 수령일, 수리·주문제작·예물 상담 준비물을 정리했습니다."
  },
  {
    "to": "/guide/jongno-custom-couple-ring-order",
    "label": "종로 커플링 주문제작, 상담부터 수령까지 확인할 것",
    "description": "종로 커플링 주문제작 전 예산·수령일을 준비하고 소재, 폭, 두께, 호수, 마감, 각인과 제작 확인서를 정하는 순서를 정리했습"
  },
  {
    "to": "/guide/wedding-jewelry-set-composition",
    "label": "결혼예물 세트 구성, 신부·신랑·혼주 예물 준비 기준",
    "description": "웨딩밴드, 다이아 3부·5부, 신랑 예물, 혼주 예물까지 예산에 맞춰 어디까지 준비할지 상담 전 기준을 정리했습니다."
  },
  {
    "to": "/guide/wedding-band-guard-ring-guide",
    "label": "결혼반지 가드링, 종로 맞춤제작 전 확인할 기준",
    "description": "결혼반지 가드링을 직선형·곡선형으로 고르는 법과 메인 반지 높이, 간격, 소재, 호수, 맞춤제작 상담 기준을 정리했습니다."
  }
]

// guide-manager:data:start
const gmArticleTitle = '결혼예물 상담 전 확인할 체크리스트'
const gmArticleLead = '결혼예물 상담은 디자인을 고르는 과정과 함께 제품 사양 및 계약 조건을 확인하는 과정입니다. 상담 전에 우선순위를 정하고, 합의한 금속·보석·치수·비용·인도 조건이 주문서와 관련 서류에 어떻게 기록되는지 확인해 보세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '종로 결혼예물 상담 전 체크리스트'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '결혼예물 주문제작 상담 전 확인사항'
const gmHeroAlt = '종로 귀금속 매장에서 결혼예물 반지와 보석을 상담하는 커플'
const gmSourceNote = '공공기관과 국제 보석 교육기관의 공식 자료를 바탕으로 결혼예물 상담 전 확인 항목을 정리했습니다. 가격·재고·제작 기간·수리 가능 여부는 제품 및 사업자와의 개별 계약 조건을 확인해야 합니다.'
const gmSources = [
  {
    "label": "한국소비자원 소비자분쟁해결기준",
    "url": "https://www.kca.go.kr/down/cou_08_01.pdf",
    "note": "귀금속·보석 품목의 분쟁 기준과 적용 범위를 확인하는 공공기관 자료입니다."
  },
  {
    "label": "소비자24 1372 상담사례: 순금목걸이 환급요청",
    "url": "https://www.consumer.go.kr/user/ftc/consumer/cnsltcase/114/selectCnsltCaseView.do?page=214&prgnCnsltCaseSn=51435&row=25&searchBgCode=&searchCnd=&searchMdCode=&searchSmCode=&searchWrd=",
    "note": "귀금속의 함량·중량·등급·색상·크기·천연 또는 합성 여부와 치수·도금 관련 확인사항을 설명하는 공식 상담사례입니다."
  },
  {
    "label": "한국소비자원 소비자 피해예방 안내",
    "url": "https://www.kca.go.kr/home/sub.do?menukey=4005&mode=view&no=1003229848&page=6",
    "note": "상품정보, 품질보증사항, 영수증·품질보증서·광고 내용 등 증빙자료를 확인·보관하라는 소비자원 안내입니다."
  },
  {
    "label": "GIA 다이아몬드 구매 안내",
    "url": "https://4cs.gia.edu/en-us/how-to-buy-a-diamond/",
    "note": "다이아몬드 품질을 Cut·Color·Clarity·Carat Weight의 4Cs로 설명하는 국제 보석 교육기관의 공식 자료입니다."
  },
  {
    "label": "GIA 다이아몬드 리포트 종류",
    "url": "https://4cs.gia.edu/en-us/types-gia-reports/",
    "note": "천연·랩그로운 다이아몬드 및 유색 보석의 감정·식별 리포트에 포함되는 정보를 확인하는 공식 자료입니다."
  },
  {
    "label": "ISO 9202:2026 귀금속 합금 순도 표준",
    "url": "https://www.iso.org/standard/90827.html",
    "note": "귀금속 합금의 순도(fineness)를 다루는 국제 표준의 범위와 국가별 표시·각인 요건 유의사항을 확인할 수 있습니다."
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
