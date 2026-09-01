<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/14k-18k-jewelry-price-difference'
const pageTitle = '14K·18K 주얼리 가격 차이 기준 | 귀족'
const pageDescription = '일반 주얼리의 14K와 18K 가격 차이를 금 함량, 중량, 제작 조건, 보석과 부자재로 나누어 살펴봅니다.'
const ogImage = `${siteConfig.url}/Image/guide/14k-18k-jewelry-price-difference-hero-2bafd6d0.webp`
const publishedAt = '2026-09-01'
const updatedAt = ''
const faqItems = [
  {
    "question": "14K와 18K 중 어느 쪽이 더 비싼가요?",
    "answer": "같은 중량과 비슷한 제작 조건이라면 금 함량이 더 높은 18K가 소재비 상승 요인이 될 수 있습니다. 그러나 최종 가격은 디자인, 보석, 중량과 판매 조건에 따라 달라집니다."
  },
  {
    "question": "14K와 18K 가격 차이를 금 함량만으로 계산할 수 있나요?",
    "answer": "어렵습니다. 금 함량은 중요한 비교 기준이지만 실제 중량, 제작 난이도, 제품 구조, 보석과 부자재가 함께 반영됩니다."
  },
  {
    "question": "반지와 목걸이와 귀걸이는 어떤 항목을 비교해야 하나요?",
    "answer": "반지는 폭과 두께와 세팅, 목걸이는 길이와 체인과 펜던트, 귀걸이는 한 쌍 여부와 장식과 침과 뒷장식을 확인하세요. 모든 제품에서 실제 중량과 카럿 표기도 함께 확인해야 합니다."
  },
  {
    "question": "상담 때 어떤 견적을 요청하면 좋나요?",
    "answer": "같은 디자인을 기준으로 14K와 18K를 나눈 비교 견적을 요청하고, 완성 예상 중량, 보석과 부자재, 제작 관련 비용, 변경 가능 항목을 구분해 확인하는 것이 좋습니다."
  }
]
const quickAnswers = [
  "18K는 14K보다 금 함량이 높아 같은 중량과 비슷한 제작 조건이라면 소재비가 더 높아지는 방향으로 작용합니다.",
  "최종 견적은 카럿뿐 아니라 실제 금속 중량, 제품 크기와 구조, 제작 난이도, 보석과 부자재를 함께 확인해야 합니다.",
  "반지·목걸이·귀걸이는 제품 형태와 중량이 달라 카럿만으로 가격 차이를 같은 비율로 계산할 수 없습니다."
]
const sections = [
  {
    "title": "금 함량이 가격에 미치는 영향",
    "paragraphs": [
      "24K를 순금 24부분으로 보면, 14K는 금 14부분과 다른 금속 10부분으로 구성됩니다. 18K의 경우에는 금 18부분과 다른 금속 6부분이 들어갑니다.",
      "금 함량을 비교하면 14K는 약 58.3~58.5%, 18K는 75%입니다. 다만 실제 합금 조성은 색상과 제조 방식에 따라 달라질 수 있습니다.",
      "같은 제품 중량에 제작 조건도 비슷하다고 가정하면, 18K는 금 함량이 더 높아 금 소재비가 높아지는 방향으로 작용합니다. 그렇더라도 총판매가가 같은 비율로 오르는 것은 아닙니다."
    ],
    "bullets": [
      "14K는 금 외 금속의 비율이 더 높습니다.",
      "18K는 14K보다 금 함량이 높습니다.",
      "금 함량 차이는 소재비 비교의 한 항목입니다."
    ]
  },
  {
    "title": "견적서에서 먼저 볼 항목",
    "paragraphs": [
      "14K·18K 여부만으로 판단하지 말고, 실제 금속 중량을 먼저 확인해야 합니다. 제품의 크기와 두께, 속이 찬 구조인지 여부도 나누어 살펴봐야 합니다.",
      "견적에는 제작 난이도와 손이 들어가는 정도도 영향을 줄 수 있습니다. 여기에 표면 처리, 잠금 장치와 같은 부자재 역시 함께 반영될 수 있습니다.",
      "제품과 판매처에 따라 브랜드, 유통, 세금, 행사 조건이 달라질 수 있습니다. 그러므로 이번 안내만으로 금액을 정할 수는 없습니다."
    ],
    "bullets": [
      "금속의 실제 중량",
      "제품의 크기와 구조",
      "디자인과 제작 난이도",
      "표면 처리와 부자재",
      "브랜드와 판매 조건"
    ],
    "image": {
      "src": "/Image/guide/14k-18k-jewelry-price-difference-section-2-c7deb9e5.webp",
      "alt": "견적서에서 먼저 볼 항목 예시 이미지",
      "caption": "견적서에서 먼저 볼 항목에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "제품별 비교 방법",
    "paragraphs": [
      "반지는 손가락 둘레와 폭, 두께를 먼저 살펴보고 속 구조와 보석 세팅 여부도 함께 확인해야 합니다. 같은 카럿이라도 세팅 방식과 중량이 다를 경우 견적은 달라질 수 있습니다.",
      "목걸이는 길이와 폭을 확인한 뒤, 체인 구조와 잠금 장치를 살펴보는 것이 좋습니다. 펜던트의 포함 여부도 나누어 보고, 체인과 장식의 중량을 따로 확인하면 비교하기가 쉬워집니다.",
      "귀걸이를 확인할 때는 한 쌍인지 먼저 보고, 장식의 크기와 개수도 살펴야 합니다. 침과 뒷장식의 소재가 무엇인지 확인해야 하며, 작은 제품이라도 보석과 제작 방식에 따라 견적 구성이 달라질 수 있습니다."
    ],
    "bullets": [
      "반지: 폭·두께·세팅·중량 확인",
      "목걸이: 길이·체인·펜던트·잠금 장치 확인",
      "귀걸이: 한 쌍 여부·장식·침과 뒷장식 확인"
    ]
  },
  {
    "title": "상담 전에 확인할 질문",
    "paragraphs": [
      "견적을 받을 때에는 14K 또는 18K 표기를 확인해야 합니다. 완성 예상 중량과 보석 및 부자재의 포함 여부를 묻고, 제작 관련 비용이 어떻게 나뉘는지도 함께 확인하는 것이 좋습니다.",
      "카럿에 따른 소재비 차이를 확인하려면 같은 디자인에서 소재만 바꾼 비교 견적을 요청하는 방법이 있습니다. 이렇게 하면 나머지 비용도 따로 구분하는 데 도움이 됩니다.",
      "상담 시점이나 디자인 확정 여부에 따라 완성 중량과 제작 조건은 달라질 수 있습니다. 따라서 최종 확정 전에는 안내 내용을 문서로 확인해야 합니다."
    ],
    "bullets": [
      "카럿 표기와 금속 함량",
      "완성 예상 중량",
      "보석과 부자재 포함 여부",
      "제작 관련 비용의 구분",
      "최종 변경 가능 항목"
    ],
    "image": {
      "src": "/Image/guide/14k-18k-jewelry-price-difference-section-4-51b8a7a9.webp",
      "alt": "상담 전에 확인할 질문 예시 이미지",
      "caption": "상담 전에 확인할 질문에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  }
]
const cautions = [
  "18K가 14K보다 항상 같은 비율로 비싸다고 단정할 수 없습니다. 제품 중량, 디자인, 보석, 제작 조건이 다르면 결과가 달라집니다.",
  "이번 안내에는 특정 판매처의 당일 금 시세, 재고, 세금, 행사, 브랜드 비용이 포함되지 않았습니다.",
  "14K·18K 표기만으로 제품의 전체 품질이나 착용 적합성을 판단하지 말고 제품 상태와 사용 조건을 함께 상담하세요."
]
const relatedLinks = [
  {
    "to": "/guide/couple-ring-14k-18k-price-difference",
    "label": "14K·18K 커플링 가격 차이: 금 함량·중량·공임 비교",
    "description": "14K·18K 커플링의 금 함량, 완성 중량, 세팅과 제작 조건을 비교합니다."
  },
  {
    "to": "/guide/gold-585-vs-750-selection",
    "label": "585와 750 각인을 읽고 14K·18K 선택 기준 정하는 법",
    "description": "585와 750 각인이 14K와 18K를 뜻하는 이유와 선택 기준을 살펴봅니다."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "일반 반지 주문제작 상담 체크리스트",
    "description": "반지 주문제작 전에 정하고 확인할 항목을 정리합니다."
  },
  {
    "to": "/guide/white-gold-discoloration-care",
    "label": "화이트골드 변색 원인과 도금 관리",
    "description": "화이트골드의 표면 변화와 관리 방법을 확인합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '14K·18K 주얼리 가격 차이 기준'
const gmArticleLead = '14K와 18K의 가격 차이는 금 함량에서 비롯됩니다. 하지만 최종 견적은 제품 중량과 크기, 구조, 제작 난이도, 보석, 표면 처리 등에 따라 달라집니다. 따라서 카럿만으로 반지·목걸이·귀걸이의 가격을 일률적으로 계산하기는 어렵습니다.'
const gmArticleCategory = '가격'
const gmArticleKeyword = '14K 18K 주얼리 가격 차이'
const gmInquiryType = 'other' as const
const gmInquiryTopic = '14K와 18K 일반 주얼리 견적 비교'
const gmHeroAlt = '금속 반지와 체인 목걸이, 한 쌍의 귀걸이가 빈 견적서와 확대경 옆에 나란히 놓인 모습'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '금 함량과 귀금속 표시 범위는 승인된 Federal Trade Commission과 GIA 자료를 바탕으로 정리했습니다. 특정 판매처의 가격이나 조건은 포함하지 않았습니다.'
const gmSources = [
  {
    "label": "Federal Trade Commission — Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "14K와 18K의 금 함량 표기와 구성 비율을 설명하는 미국 연방거래위원회 소비자 안내입니다."
  },
  {
    "label": "Federal Trade Commission — Jewelry Guides",
    "url": "https://www.ftc.gov/news-events/topics/tools-consumers/jewelry-guides",
    "note": "귀금속 제품의 금속 함량, 중량, 품질, 가격, 제작과 유통 관련 표시 범위를 확인할 수 있는 공식 지침입니다."
  },
  {
    "label": "GIA — Methods for Determining the Gold Content of Jewelry Metals",
    "url": "https://www.gia.edu/doc/Methods-for-Determining-Gold-Content-of-Jewelry-Metals.pdf",
    "note": "14K 약 58.4%와 18K 약 75.0%의 금 함량 분석 자료입니다."
  },
  {
    "label": "GIA 4Cs — Placeholder Rings: Metals for Placeholder Rings",
    "url": "https://4cs.gia.edu/en-us/blog/propose-now-shop-later-placeholder-ring/",
    "note": "금의 가격대가 순도와 섬세함에 따라 달라질 수 있으며 14K와 18K의 금과 합금 비율이 다름을 설명합니다."
  },
  {
    "label": "GIA 4Cs — Best Ring Material for Everyday Wear",
    "url": "https://4cs.gia.edu/en-us/blog/best-ring-material-everyday-wear/",
    "note": "카럿 외에도 금속 종류, 내구성, 디자인과 사용 조건을 함께 고려할 수 있음을 설명합니다."
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
