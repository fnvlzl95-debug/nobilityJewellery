<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-filled-vermeil-plated-difference'
const pageTitle = '골드필드 뜻: 금도금·버메일 차이 | 귀족'
const pageDescription = '골드필드는 바탕 금속에 금합금 층을 기계적으로 결합한 구조입니다. 금도금·골드버메일과 바탕 금속, 금층 두께·중량 비율, GF·1/20 표기 확인법을 비교합니다.'
const ogImage = `${siteConfig.url}/Image/guide/gold-filled-vermeil-plated-hero.webp`
const publishedAt = '2026-07-26'

const faqItems = [
  {
    "question": "골드필드는 14K 금제품과 같은 뜻인가요?",
    "answer": "아닙니다. 14K 금제품은 제품 자체가 14K 금합금으로 이루어진 반면 골드필드는 바탕 금속에 금합금 층을 기계적으로 결합한 제품입니다. 14K GF의 14K는 바깥 금층의 순도를 가리키며 제품 전체가 14K라는 뜻이 아닙니다."
  },
  {
    "question": "골드버메일과 일반 금도금은 무엇이 다른가요?",
    "answer": "골드버메일은 스털링실버 바탕의 금 표면 처리 유형입니다. 일반 금도금은 바탕 금속이 은으로 한정되지 않으며, 금층을 적용한 공정과 두께도 제품별로 확인해야 합니다."
  },
  {
    "question": "골드필드가 금도금보다 오래가는 편인가요?",
    "answer": "명칭만으로 사용 기간을 보장할 수는 없습니다. 결합 방식, 금층 사양, 착용 빈도, 마찰과 화학제품 노출에 따라 마모 정도가 달라질 수 있습니다."
  },
  {
    "question": "1/20 14K GF 표기는 무슨 뜻인가요?",
    "answer": "미국 Federal Trade Commission 표기 예시에서 14K는 결합된 금층의 순도, 1/20은 제품 전체 금속에서 해당 금층이 차지하는 중량 비율을 뜻합니다. 적용 국가와 판매처의 기준을 함께 확인하세요."
  },
  {
    "question": "색만 보고 골드필드와 금도금을 구별할 수 있나요?",
    "answer": "새 제품의 색과 광택만으로 구조를 확정하기 어렵습니다. 각인, 판매 명세, 바탕 금속, 금층 순도와 두께 또는 중량 비율을 확인하세요."
  }
]

const quickAnswers = [
  "골드필드는 제품 전체가 14K 금이라는 뜻이 아니라, 바탕 금속에 금합금 층을 기계적으로 결합한 구조를 말합니다.",
  "골드버메일은 스털링실버 바탕의 금 표면 처리 유형이며, 일반 금도금은 바탕 금속이 은으로 한정되지 않습니다.",
  "구매 전에는 색상명보다 바탕 금속, 금층 순도, 두께 또는 중량 비율, 적용 표기 기준을 함께 확인해야 합니다."
]

const sections = [
  {
    "title": "제품 전체가 금인지 표면에 금층이 있는지 구분하세요",
    "paragraphs": [
      "14K·18K 금제품은 해당 순도의 금합금으로 제품 본체를 만듭니다. 반면 골드필드, 골드버메일과 금도금은 금속으로 만든 바탕 위에 금 또는 금합금 층을 더한 구조입니다. 따라서 겉색이 비슷하더라도 제품 전체의 귀금속 함량과 마모 후 드러나는 소재에는 차이가 있습니다.",
      "상품명에 골드나 골드 컬러가 포함되어 있어도 그것만 보지 말고, 본체 소재와 표면 처리 항목을 나누어 읽어야 합니다. 금속 자체의 색과 관리 차이를 함께 비교하려면 백금·화이트골드 차이 가이드도 확인해야 합니다."
    ],
    "bullets": [
      "본체 전체가 14K·18K 금합금인지",
      "바탕 금속 위에 금층을 결합하거나 도금한 제품인지",
      "금색이라는 색상 설명과 실제 소재 표기를 구분했는지",
      "금층이 마모되면 어떤 바탕 금속이 드러나는지"
    ]
  },
  {
    "title": "골드필드·골드버메일·금도금 한눈에 비교",
    "paragraphs": [
      "세 유형은 모두 겉면에 금 또는 금합금 층이 보일 수 있습니다. 다만 바탕 금속과 금층을 적용하는 방식, 그리고 확인해야 할 표기는 서로 다릅니다. 아래 수치와 정의는 미국 Federal Trade Commission 자료에 근거한 설명이며, 국내외 상품에 그대로 적용되는 단일 기준은 아닙니다."
    ],
    "bullets": [
      "골드필드: 바탕 금속에 금합금 층을 기계적으로 결합합니다. 미국 자료에서는 10K 이상 금합금과 금층 중량 비율을 확인하며, 1/20 이상인 경우 Gold Filled 표기 예시가 제시됩니다.",
      "골드버메일: 스털링실버 바탕에 금을 입힌 유형입니다. 미국 자료에서는 주요 표면 전체에 10K 이상 금을 순금 환산 2.5마이크론 이상 입힌 경우를 설명합니다.",
      "금도금: 기계 도금, 전기 도금 및 기타 공정으로 적용한 금층을 포괄하는 표현입니다. 바탕 금속은 은으로 한정되지 않습니다.",
      "금 전기도금: 미국 소비자 안내에서는 최소 10K 금을 전해 공정으로 적용하고 금층 두께가 최소 0.175마이크론인 제품으로 설명합니다."
    ],
    "image": {
      "src": "/Image/guide/gold-filled-vermeil-plated-difference-section-2-59def09b.webp",
      "alt": "금색 외층 아래 은색과 회색 바탕이 각각 보이는 세 가지 소재 단면 모형과 측정용 캘리퍼",
      "caption": "유형을 비교할 때 바탕 금속, 금층 사양, 적용 방식을 함께 확인합니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "골드필드는 결합 방식과 중량 비율을 봅니다",
    "paragraphs": [
      "금합금 층을 바탕 금속에 기계적으로 결합한 제품을 설명할 때 골드필드, 골드 오버레이와 롤드 골드 플레이트라는 용어를 사용합니다. 여기서 14K GF의 14K는 결합된 금층의 순도를 뜻하며, 제품 전체가 14K라는 의미는 아닙니다.",
      "미국 Federal Trade Commission 소비자 안내에서는 금층이 전체 금속 중량의 1/20보다 적은 골드필드·골드 오버레이 제품에 금의 중량 비율을 표시하는 방식을 제시합니다. 안내된 예시에는 1/40 14K gold overlay가 있습니다. 다만 국가와 판매처에 따라 표기 관행은 달라질 수 있습니다."
    ],
    "bullets": [
      "GF·Gold Filled 표기와 금층 순도",
      "1/20 등 금층의 중량 비율",
      "골드 오버레이·RGP와 골드필드 용어 구분",
      "바탕 금속의 종류와 민감 반응 관련 소재"
    ]
  },
  {
    "title": "골드버메일은 스털링실버 바탕이 핵심입니다",
    "paragraphs": [
      "스털링실버에 금을 입힌 제품을 골드버메일이라고 합니다. 925 각인만으로는 금층 순도와 두께까지 확인되지 않으므로, 금층 사양과 중간층 사용 여부를 함께 문의하시기 바랍니다.",
      "은 위에 다른 바탕 금속층을 먼저 입힌 뒤 다시 금도금을 한 구조라면 판매 명세에서 해당 구조를 확인해야 합니다. 또한 골드버메일이라고 표시된 제품도 국가별 기준과 판매 방식에 따라 다를 수 있습니다."
    ],
    "bullets": [
      "스털링실버 또는 925 바탕인지",
      "금층이 어떤 순도로 표시됐는지",
      "금층 두께가 어떤 기준으로 표시됐는지",
      "은과 금 사이에 다른 금속층이 있는지"
    ],
    "image": {
      "src": "/Image/guide/gold-filled-vermeil-plated-difference-section-4-08e0626c.webp",
      "alt": "골드버메일은 스털링실버 바탕이 핵심입니다 예시 이미지",
      "caption": "골드버메일은 스털링실버 바탕이 핵심입니다에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "금도금은 공정과 두께, 바탕 금속을 확인하세요",
    "paragraphs": [
      "여러 바탕 금속에 금층을 입기는 하지만, 금도금은 이를 넓게 가리키는 표현입니다. 착용 방식과 도금 두께에 따라 금층이 시간이 지나면서 마모될 수 있으므로, 금도금이라는 명칭만으로 내구성을 판단하기는 어렵습니다.",
      "골드 플래시나 골드 워시처럼 얇은 금층을 나타내는 표현은 판매처에 따라 사용될 수 있습니다. 판매 설명에서는 실제 금층 순도와 두께, 적용 공정, 바탕 금속을 확인하세요."
    ],
    "bullets": [
      "전기도금인지 다른 표면 처리인지",
      "금층 순도와 마이크론 두께",
      "Heavy·Flash·Wash 표현의 판매자 정의",
      "바탕 금속과 중간 도금층의 구성"
    ]
  },
  {
    "title": "구매표에 표기와 사양을 적으세요",
    "paragraphs": [
      "구매 전에는 제품명보다 본체 소재, 금층 순도, 두께 또는 중량 비율, 제작 방식, 알레르기 관련 구성과 보증 범위를 한 줄씩 확인하세요. 14K GF가 뜻하는 것은 제품 전체가 14K라는 사실이 아니며, 925 Vermeil도 금층 두께까지 자동으로 증명하지 않습니다.",
      "체인·보석·코팅·조립 방식에 따라 재도금 가능 여부, 공정 제한, 보증 조건이 달라질 수 있으므로 판매 명세로 확인하세요. 판매 명세와 각인이 서로 일치하는지도 대조해야 합니다."
    ],
    "bullets": [
      "본체 소재와 금층 순도",
      "금층 두께 또는 중량 비율",
      "GF·RGP·GEP·Vermeil 용어의 적용 기준",
      "보증 조건과 재도금 가능 여부",
      "수리·매입 시 금합금 제품과 구분"
    ]
  },
  {
    "title": "기준 확인 출처",
    "paragraphs": [
      "미국 Federal Trade Commission의 소비자 안내와 Jewelry Guides를 기준으로 골드필드와 금도금의 정의, 표시 방식, 금층 관련 수치를 확인했습니다. 국가별 표시 관행은 다를 수 있으므로 국내 판매 명세와 함께 대조하세요."
    ],
    "bullets": [
      "Federal Trade Commission 소비자 안내: 골드필드, 금도금, 금 전기도금의 소비자용 정의와 표시 기준",
      "Federal Trade Commission Jewelry Guides: 귀금속과 주얼리의 표시·광고 기준",
      "Federal Trade Commission 개정 Jewelry Guides 해설: 골드필드와 도금 용어의 적용 조건"
    ]
  }
]

const cautions = [
  "이 글의 수치 예시는 미국 Federal Trade Commission 기준이며 국내외 모든 판매 표기에 자동으로 적용되는 단일 국제 기준은 아닙니다.",
  "14K GF·925 Vermeil 같은 각인만으로 실제 금층 두께와 제작 품질을 확정하지 말고 판매 명세와 보증 내용을 함께 확인하세요.",
  "표면 금층이 닳으면 바탕 금속이 피부에 닿을 수 있으므로 금속 민감 반응이 있다면 중간층과 바탕 소재까지 확인하세요."
]

const relatedLinks = [
  {
    "to": "/guide/platinum-vs-white-gold-difference",
    "label": "백금·화이트골드 차이: 가격·무게·변색·예물 선택",
    "description": "제품 전체가 금속 합금인 소재와 표면 처리 제품을 비교할 때 참고할 수 있습니다."
  },
  {
    "to": "/guide/hollow-vs-solid-gold-jewelry",
    "label": "중공 금목걸이·솔리드 차이, 무게와 찌그러짐 확인법",
    "description": "제품의 겉모습과 내부 구조가 다를 때 확인할 기준을 정리합니다."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 차이, 다이아·유색보석 보고서 읽는 법",
    "description": "보석이 함께 세팅된 제품의 문서와 표기 확인에 참고할 수 있습니다."
  }
]

const updatedAt = '2026-08-29'
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '골드필드 뜻: 금도금·버메일 차이'
const gmArticleLead = '골드필드는 바탕 금속에 금합금 층을 기계적으로 결합한 제품입니다. 일반 금도금은 여러 바탕 금속에 금층을 입히는 넓은 범주의 표면 처리입니다. 골드버메일은 스털링실버 바탕인지부터 확인해야 합니다. 구매 전에는 바탕 금속과 금층 순도뿐 아니라 두께 또는 중량 비율, 적용 표기 기준도 함께 확인해야 합니다.'
const gmArticleCategory = '소재·보석'
const gmArticleKeyword = '골드필드 금도금 차이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '금제품 소재와 표면 처리 비교'
const gmHeroAlt = '금색 체인과 반지 옆에 금층 단면 모형, 루페, 소재 표기 카드가 놓인 상담용 작업대'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '본문의 정의와 수치 예시는 미국 Federal Trade Commission 공식 자료를 바탕으로 정리했으며, 국내외 판매 표기의 적용 여부는 제품별 명세를 확인해야 합니다.'
const gmSources = [
  {
    "label": "Federal Trade Commission, Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "골드필드, 금도금, 금 전기도금, 금 세척의 소비자용 정의와 표시 기준을 설명합니다."
  },
  {
    "label": "Federal Trade Commission, Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속 및 주얼리의 표시·광고 기준을 제공합니다."
  },
  {
    "label": "Federal Trade Commission, Summary of Basis and Purpose for the Revised Jewelry Guides",
    "url": "https://www.ftc.gov/system/files/documents/public_statements/1393857/g71001_jewelry_guides_statement_of_basis_and_purpose_final_8-8-18.pdf",
    "note": "골드필드와 금도금 용어가 사용될 수 있는 조건과 기계적 도금·전기 도금의 구분을 설명합니다."
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
        { name: '골드필드·골드버메일·금도금 차이', path: pagePath },
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
        author: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url },
        reviewedBy: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: gmReviewedBy, url: siteConfig.url },
        publisher: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization`, name: siteConfig.name, url: siteConfig.url, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/favicon.svg` } },
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
