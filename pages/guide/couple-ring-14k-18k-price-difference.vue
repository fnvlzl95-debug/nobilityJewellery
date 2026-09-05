<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/couple-ring-14k-18k-price-difference'
const pageTitle = '14K·18K 커플링 가격 차이: 금 함량·중량·공임 비교 | 귀족'
const pageDescription = '14K·18K 커플링은 금 함량, 완성 중량, 당일 시세, 세팅·공임 조건에 따라 가격 차이가 납니다. 같은 디자인이라도 소재·폭·두께·중량을 맞춰 비교하세요.'
const ogImage = `${siteConfig.url}/Image/guide/couple-ring-14k-18k-comparison.webp`
const publishedAt = '2026-05-18'

const faqItems = [
  {
    "question": "18K는 14K보다 보통 몇 퍼센트 비싼가요?",
    "answer": "고정된 가격 비율을 제시하기 어렵습니다. 18K는 14K보다 순금 함량이 높지만, 실제 커플링 가격은 완성 중량, 디자인, 세팅, 공임, 유통 조건과 당일 시세에 따라 달라지므로 같은 규격으로 견적을 비교해야 합니다."
  },
  {
    "question": "14K와 18K 중 어떤 소재가 더 실용적인가요?",
    "answer": "매일 착용하는지, 예산을 어떻게 배분할지, 금 함량과 색감·착용감을 얼마나 중요하게 보는지에 따라 달라집니다. 특정 소재가 모든 사람에게 더 실용적이라고 단정하기보다 제품 사양과 착용 환경을 함께 상담하세요."
  },
  {
    "question": "화이트골드에서는 14K와 18K의 차이가 크게 보이나요?",
    "answer": "화이트골드는 표면 로듐 도금 여부와 마감에 따라 외관이 달라질 수 있어 순도만으로 겉보기 차이를 판단하기 어렵습니다. 로듐 도금 여부와 관리 방법은 제품 사양을 확인하세요."
  },
  {
    "question": "커플링 견적을 비교할 때 무엇을 같게 맞춰야 하나요?",
    "answer": "소재, 폭, 두께, 반지 호수, 완성 중량, 보석 세팅, 각인, 마감과 공임 포함 여부를 같은 기준으로 맞추는 것이 좋습니다. 사이즈 조절 가능 여부와 조건은 디자인·세팅·판매처 정책마다 달라 주문 전 확인해야 합니다."
  }
]

const quickAnswers = [
  "14K는 순금 약 58.3% 또는 58.5%, 18K는 순금 75.0%를 기준으로 하므로 동일 조건 비교에서 소재비 차이가 발생할 수 있습니다.",
  "정확한 견적 비교는 ‘14K와 18K 중 무엇이 더 비싼가’보다 소재, 폭, 두께, 완성 중량, 세팅, 공임을 같은 조건으로 맞추는 데서 시작합니다.",
  "매일 착용 여부와 예산 배분을 먼저 정하고, 사이즈 조절·도금·세팅 관련 조건은 주문 전 해당 판매처에 확인하세요."
]

const sections = [
  {
    "title": "금 함량과 14K·18K 표기부터 확인하세요",
    "paragraphs": [
      "14K는 24부분 중 금 14부분을 포함하는 합금으로, 순금 함량은 약 58.3%이며 583 또는 585로 표기될 수 있습니다. 18K는 순금 함량 75.0%를 기준으로 하며 750으로 표기될 수 있습니다.",
      "같은 중량을 가정하면 18K의 순금 함량은 14K보다 약 28.6% 많습니다. 이는 순도 수치의 산술 비교이며, 완제품 가격이 반드시 같은 비율로 높아진다는 뜻은 아닙니다.",
      "반지 안쪽 표기와 견적서의 소재·중량을 함께 확인하고, 표기 방식과 제품 정보가 일치하는지 판매처에 문의하세요."
    ],
    "bullets": [
      "14K: 순금 약 58.3% 또는 58.5% 기준",
      "18K: 순금 75.0% 기준",
      "표기 예시: 14K는 583 또는 585, 18K는 750",
      "순도 차이와 완제품 가격 차이는 별도로 비교"
    ]
  },
  {
    "title": "가격 차이를 만드는 중량·시세·세팅·공임",
    "paragraphs": [
      "14K·18K 커플링의 실제 가격은 금 함량만으로 결정된다고 보기 어렵습니다. 완성 중량, 디자인과 규격, 보석 세팅, 세공 및 공임, 유통 조건을 함께 확인해야 합니다.",
      "같은 디자인명이라도 반지의 폭과 두께, 두 분의 반지 호수, 표면 마감, 세팅 유무에 따라 완성 중량과 견적이 달라질 수 있습니다. 따라서 14K와 18K를 비교할 때는 동일한 규격으로 견적을 요청하는 것이 우선입니다."
    ],
    "bullets": [
      "소재: 14K 또는 18K와 색상 확인",
      "규격: 폭·두께·반지 호수 확인",
      "중량: 완성된 한 쌍의 중량 확인",
      "세팅·각인: 보석, 마감, 각인 포함 여부 확인",
      "공임·유통 조건: 판매처별 산정 방식 확인"
    ],
    "image": {
      "src": "/Image/guide/couple-ring-14k-18k-price-difference-section-2.webp",
      "alt": "가격 차이를 만드는 중량·시세·세팅·공임 예시 이미지",
      "caption": "가격 차이를 만드는 중량·시세·세팅·공임에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "14K를 상담할 때 확인할 기준",
    "paragraphs": [
      "예산 배분과 일상 착용 빈도를 우선 기준으로 삼는다면 14K를 비교 대상으로 상담할 수 있습니다. 특정 착용 환경에서 내구성이 어느 정도인지, 관리가 편한지는 디자인과 합금뿐 아니라 마감과 사용 방식에 따라서도 달라질 수 있으므로 제품 사양을 먼저 확인해야 합니다.",
      "화이트골드 커플링은 표면 처리 여부에 따라 외관이 달라질 수 있고, 관리 조건에도 차이가 생길 수 있습니다. 따라서 제품 사양에서 로듐 도금 여부를 확인하고, 관리 방법도 함께 확인해야 합니다."
    ],
    "bullets": [
      "매일 착용할지와 손을 많이 사용하는지 먼저 점검",
      "폭·두께와 디자인 디테일에 예산을 어떻게 배분할지 결정",
      "화이트골드는 로듐 도금 여부와 관리 조건 확인",
      "금속 알레르기 경험이 있다면 상담 전에 알리기"
    ]
  },
  {
    "title": "18K를 상담할 때 확인할 기준",
    "paragraphs": [
      "순금 함량 75.0%를 기준으로 하는 18K는 높은 금 함량이나 색감, 착용감을 중요하게 보는 경우 비교할 수 있습니다. 다만 제품의 형태와 합금 구성에 더해 마감에 따라서도 실제 중량감과 색상이 달라질 수 있습니다.",
      "매장 정책과 제품 상태, 당시 시세가 재판매·보상 조건에 영향을 줄 수 있으므로 해당 조건은 별도로 확인해야 합니다. 금속 알레르기가 있다면 18K라는 표기만으로 반응 가능성을 판단하기보다 합금 구성과 과거 반응을 상담해야 합니다."
    ],
    "bullets": [
      "높은 금 함량을 중요하게 볼 때",
      "옐로우골드의 색감과 착용감을 비교할 때",
      "결혼반지나 웨딩밴드 등 사용 목적을 먼저 정할 때",
      "재판매·보상 조건은 판매처 정책과 당시 시세를 별도 확인"
    ],
    "image": {
      "src": "/Image/guide/couple-ring-14k-18k-price-difference-section-4.webp",
      "alt": "18K를 상담할 때 확인할 기준 예시 이미지",
      "caption": "18K를 상담할 때 확인할 기준에서 확인할 부분을 보여주는 이미지입니다."
    }
  },
  {
    "title": "견적을 같은 조건으로 맞추는 최종 점검",
    "paragraphs": [
      "소재, 폭, 두께, 완성 중량, 세팅, 공임을 같은 조건으로 맞춘 뒤 견적을 요청하는 방식이 좋습니다. ‘14K 얼마, 18K 얼마’만 놓고 비교하지 않도록 조건을 먼저 맞춰야 합니다. 또한 반지 호수는 완성 중량과 착용감에 영향을 줄 수 있으므로 두 사람의 정확한 사이즈도 확인해야 합니다.",
      "각인 문구와 위치, 서체, 표면 마감이 견적에 포함되는지 확인하고, 사이즈 조절 가능 여부와 조건은 디자인·세팅·판매처 정책마다 달라 주문 전 확인해야 합니다."
    ],
    "bullets": [
      "두 소재의 동일 규격 견적 요청",
      "완성 중량과 세팅 포함 여부 확인",
      "각인과 마감의 포함 조건 확인",
      "사이즈 조절 가능 여부와 조건 확인",
      "당일 시세 적용 기준과 견적 유효 조건 확인"
    ]
  }
]

const cautions = [
  "가격은 당일 시세와 제품의 중량·디자인·세팅·공임·유통 조건에 따라 달라질 수 있으므로 고정 금액이나 일정한 가격 비율로 판단하지 마세요.",
  "같은 디자인처럼 보여도 폭, 두께, 반지 호수, 완성 중량이 다르면 견적을 직접 비교하기 어렵습니다.",
  "금속 알레르기, 로듐 도금, 보석 세팅, 사이즈 조절 가능 여부는 제품 사양과 판매처 정책을 주문 전에 확인하세요."
]

const relatedLinks = [
  {
    "to": "/couple-ring",
    "label": "같은 규격으로 14K·18K 커플링 견적 상담받기",
    "description": "폭·두께·호수·완성 중량·세팅·각인·공임 조건을 맞춰 비교하세요."
  },
  {
    "to": "/guide/platinum-vs-white-gold-difference",
    "label": "화이트골드·백금 차이: 가격·무게·변색·예물 선택",
    "description": "백금과 화이트골드의 색·무게·관리·가격 차이를 비교하고 예물 반지 선택 기준을 확인할 수 있습니다."
  },
  {
    "to": "/guide/couple-ring-engraving-guide",
    "label": "커플링 각인, 문구·위치·서체 정하는 법",
    "description": "커플링 각인의 문구·위치·서체와 글자 수를 정할 때 확인할 기준을 안내합니다."
  },
  {
    "to": "/guide/diamond-3bu-5bu-difference",
    "label": "다이아 3부 5부 차이, 예물 반지 고를 때 가격·크기 기준",
    "description": "다이아 크기와 4C, 세팅 및 감정서에 따라 달라지는 비교 기준을 정리합니다."
  },
  {
    "to": "/guide/jongno-custom-couple-ring-order",
    "label": "종로 커플링 주문제작, 상담부터 수령까지 확인할 것",
    "description": "종로 커플링 주문제작 상담에서 소재·규격·각인과 제작 조건을 확인하는 순서를 안내합니다."
  }
]

const updatedAt = '2026-09-05'
// guide-manager:data:start
const gmArticleTitle = '14K·18K 커플링 가격 차이: 금 함량·중량·공임 비교'
const gmArticleLead = '14K·18K 커플링 가격 차이는 금 함량만으로 정해지지 않습니다. 같은 디자인도 완성 중량, 폭·두께, 세팅, 당일 금 시세와 공임 조건이 다르면 견적을 그대로 비교할 수 없습니다. 상담 전에는 두 소재의 견적을 같은 중량·규격·세팅 기준으로 요청하세요.'
const gmArticleCategory = '가격'
const gmArticleKeyword = '14K 18K 커플링 가격 차이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '14K 18K 커플링 가격 차이'
const gmHeroAlt = '14K와 18K 커플링의 금 함량과 가격 비교 기준'
const gmSourceNote = '14K·18K 순도 표기와 금속 함량은 GIA와 미국 FTC의 소비자 안내를 기준으로 정리했습니다. 실제 제품 가격과 판매처별 서비스 조건은 개별 제품 사양과 상담 내용을 확인해야 합니다.'
const gmSources = [
  {
    "label": "GIA 4Cs: 금 합금 순도와 14K·18K 표기",
    "url": "https://4cs.gia.edu/en-us/blog/buying-guide-white-yellow-rose-gold-engagement-rings/",
    "note": "GIA는 14K를 약 58.3%(583 또는 585), 18K를 75%(750)로 설명합니다."
  },
  {
    "label": "미국 연방거래위원회 소비자 안내: 캐럿 표시의 의미",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "14K와 18K가 24부분 중 금 함량을 나타내는 기준임을 설명합니다."
  },
  {
    "label": "미국 연방거래위원회 주얼리 가이드",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "금속 함량·품질·가격·가치 등에 관한 주얼리 표시가 정확해야 한다는 공식 안내입니다."
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
        { name: '14K 18K 커플링 가격 차이', path: pagePath },
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
