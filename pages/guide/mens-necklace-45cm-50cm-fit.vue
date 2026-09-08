<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/mens-necklace-45cm-50cm-fit'
const pageTitle = '남자 목걸이 45·50cm 선택법 | 귀족'
const pageDescription = '남자 목걸이 45cm와 50cm 중 어떤 길이가 맞는지 목둘레, 펜던트 유무, 착용 위치를 기준으로 비교합니다.'
const ogImage = `${siteConfig.url}/Image/guide/mens-necklace-45cm-50cm-fit-hero-e636a584.webp`
const publishedAt = '2026-09-08'
const updatedAt = ''
const faqItems = [
  {
    "question": "남자 목걸이는 45cm와 50cm 중 어느 길이가 더 무난한가요?",
    "answer": "목에 가까운 체인을 원하면 45cm부터, 조금 더 여유 있고 낮은 위치를 원하면 50cm부터 비교할 수 있습니다. 다만 목둘레와 펜던트 유무에 따라 실제 위치가 달라집니다."
  },
  {
    "question": "펜던트가 있으면 45cm와 50cm 중 어떻게 고르나요?",
    "answer": "45cm는 펜던트를 쇄골 가까이에 보이게 하는 선택에, 50cm는 더 낮게 보이게 하는 선택에 가깝습니다. 펜던트가 클수록 위치와 시각적 무게가 달라질 수 있어 실제 크기로 시험하는 것이 좋습니다."
  },
  {
    "question": "목둘레를 재면 목걸이 길이를 바로 정할 수 있나요?",
    "answer": "목둘레는 중요한 참고 기준이지만 그것만으로 실제 착용 위치를 확정하기는 어렵습니다. 체인 길이와 펜던트 크기를 함께 반영해 끈으로 착용 테스트를 해보세요."
  },
  {
    "question": "구매 전에 45cm와 50cm를 비교하는 방법은 무엇인가요?",
    "answer": "각 길이만큼 끈을 잘라 목에 둘러 보고, 펜던트가 있다면 실제 크기까지 더해 끝부분의 위치를 확인하세요. 평소 입는 상의와 함께 비교하면 상담할 기준을 정하기 쉽습니다."
  }
]
const quickAnswers = [
  "45cm는 목에 가까운 체인이나 작은 펜던트를 살펴볼 때 먼저 확인하기 좋습니다.",
  "50cm는 45cm보다 여유 있는 착용감과 더 낮은 펜던트 위치를 살펴볼 때 기준이 됩니다.",
  "목둘레와 펜던트 크기가 실제 위치를 바꾸므로 끈으로 원하는 길이를 시험한 뒤 선택하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "길이부터 확인하기",
    "paragraphs": [
      "Tiffany & Co. 공식 표에서는 18인치를 45.75cm, 20인치를 50.75cm로 제시합니다. 따라서 일반적으로 말하는 45cm와 50cm는 각각 약 18인치와 20인치에 가까운 길이로 볼 수 있습니다.",
      "다만 표기 길이와 실제 착용 위치는 같지 않을 수 있습니다. 목둘레, 체형, 체인의 형태, 펜던트의 크기와 무게에 따라 목걸이가 놓이는 지점이 달라집니다."
    ],
    "bullets": [
      "45cm는 목에 가까운 길이를 비교할 때 기준이 됩니다.",
      "50cm는 45cm보다 더 여유 있는 길이를 비교할 때 기준이 됩니다.",
      "센티미터 표기만으로 쇄골이나 가슴 위 위치를 확정하지 마세요."
    ],
    "table": {
      "headers": [
        "구분",
        "45cm",
        "50cm"
      ],
      "rows": [
        [
          "대략적인 인치 환산",
          "약 18인치",
          "약 20인치"
        ],
        [
          "착용 위치를 보는 기준",
          "목에 가까운 편",
          "45cm보다 낮고 여유 있는 편"
        ],
        [
          "확인할 요소",
          "목둘레와 펜던트 크기",
          "목둘레와 펜던트 크기"
        ]
      ]
    }
  },
  {
    "title": "펜던트가 없을 때",
    "paragraphs": [
      "펜던트가 없는 기본 체인이라면 45cm는 비교적 목에 가까운 쇄골 부근의 길이로, 50cm는 그보다 낮은 위치를 살펴보는 기준으로 활용할 수 있습니다.",
      "목둘레가 큰 경우에는 같은 길이도 더 짧게 느껴질 수 있습니다. 체인 굵기와 실제 목선에 따라 인상이 달라질 수 있으므로 원하는 셔츠나 상의와 함께 확인하는 편이 좋습니다."
    ],
    "bullets": [
      "목에 가까운 기본 체인을 원하면 45cm부터 비교하세요.",
      "조금 더 여유 있는 착용을 원하면 50cm부터 비교하세요.",
      "목둘레가 큰 경우에는 두 길이를 모두 직접 대보는 것이 안전합니다."
    ],
    "table": null
  },
  {
    "title": "펜던트가 있을 때",
    "paragraphs": [
      "펜던트가 있으면 체인 길이뿐 아니라 펜던트의 크기와 형태도 함께 봐야 합니다. 45cm는 펜던트가 쇄골 가까이에 보이는 선택에 가깝고, 50cm는 펜던트가 더 낮게 놓이는 선택에 가깝습니다.",
      "펜던트가 클수록 시각적 무게가 커지고 하단 위치가 달라질 수 있습니다. 그러므로 같은 45cm 또는 50cm라도 펜던트가 없는 체인과 같은 위치라고 단정하기 어렵습니다."
    ],
    "bullets": [
      "작은 펜던트를 목에 가까이 보이고 싶다면 45cm를 먼저 시험하세요.",
      "펜던트를 조금 더 낮게 보이고 싶다면 50cm를 먼저 시험하세요.",
      "큰 펜던트는 실제 크기까지 반영해 위치를 확인하세요."
    ],
    "image": {
      "src": "/Image/guide/mens-necklace-45cm-50cm-fit-section-3-a5795ec5.webp",
      "alt": "남성 목걸이 체인 끝에 작은 펜던트와 큰 펜던트를 나란히 놓은 모습",
      "caption": "펜던트의 크기와 형태가 체감되는 착용 위치에 영향을 줄 수 있습니다.",
      "width": 1024,
      "height": 1024
    },
    "table": null
  },
  {
    "title": "구매 전 착용 위치 확인",
    "paragraphs": [
      "원하는 길이만큼 끈을 잘라 목에 둘러 보면 45cm와 50cm의 차이를 간단히 비교할 수 있습니다. 펜던트가 있다면 펜던트의 실제 크기까지 더해 끈 끝의 위치를 확인해야 합니다.",
      "평소 입는 상의와 함께 살펴보고, 체인을 목에 가까이 둘지 조금 낮게 둘지 정한 뒤 상담을 요청하면 선택 기준을 구체화하기 쉽습니다."
    ],
    "bullets": [
      "45cm 길이의 끈과 50cm 길이의 끈을 각각 준비하세요.",
      "펜던트가 있다면 실제 크기와 비슷한 물체를 끈 끝에 대보세요.",
      "목둘레와 상의 목선을 함께 확인하세요.",
      "착용 위치가 애매하면 두 길이를 모두 상담 대상으로 남겨 두세요."
    ],
    "table": null
  }
]
const cautions = [
  "45cm와 50cm는 대표적인 비교 기준일 뿐, 목둘레와 체형에 따라 실제 착용 위치가 달라질 수 있습니다.",
  "펜던트의 크기와 형태를 제외하고 체인 길이만으로 착용 위치나 어울림을 확정하지 마세요.",
  "이 안내는 길이 선택 기준이며, 특정 제품의 재고·가격·소재·등급·인증 또는 수리 가능성을 의미하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "남자·여자 목걸이 길이 추천: 42·45·50cm 비교",
    "description": "42cm, 45cm, 50cm 목걸이를 체형과 펜던트 크기 기준으로 비교합니다."
  },
  {
    "to": "/guide/mother-necklace-design-consulting",
    "label": "어머니 목걸이 디자인 상담: 선물용 체인·펜던트·길이 고르는 기준",
    "description": "선물용 목걸이의 체인과 펜던트, 길이를 상담 전에 확인하는 기준을 안내합니다."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "목걸이 줄 교체와 펜던트 호환",
    "description": "펜던트 고리와 새 체인의 호환 여부를 확인하는 상담 기준을 정리합니다."
  },
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "탄생석 종류와 의미, 목걸이 선물 고르는 기준",
    "description": "탄생석 목걸이를 고를 때 색상, 소재, 표기와 예산을 확인하는 기준을 안내합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '남자 목걸이 45·50cm 선택법'
const gmArticleLead = '45cm는 목에 가까운 착용을, 50cm는 조금 더 여유 있고 낮은 위치를 살펴볼 때 기준이 됩니다. 다만 같은 길이라도 목둘레와 펜던트 크기에 따라 실제 위치가 달라지므로 끈으로 착용 위치를 먼저 확인하는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '남자 목걸이 45cm 50cm'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '목둘레와 펜던트 유무에 따른 남자 목걸이 길이 선택 상담'
const gmHeroAlt = '서로 다른 길이로 놓인 은색과 금색 목걸이 체인, 펜던트와 줄자'
const gmHeroCaption = '목둘레와 펜던트 유무에 따라 45cm와 50cm의 착용 위치를 비교합니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '길이 환산, 목둘레와 펜던트 크기에 따른 착용 위치 차이, 끈으로 길이를 시험하는 방법은 아래 공식 안내를 바탕으로 정리했습니다. 개별 제품의 가격, 재고, 소재, 등급, 인증 또는 수리 가능성은 포함하지 않습니다.'
const gmSources = [
  {
    "label": "Tiffany & Co. Necklaces & Pendants Size Guide",
    "url": "https://www.tiffany.com/client-services/size-guide/necklaces-pendants-size.html",
    "note": "목걸이 길이의 센티미터 환산과 목둘레·펜던트 크기, 끈으로 길이를 시험하는 방법을 확인했습니다."
  },
  {
    "label": "Tiffany & Co. Dainty Jewellery 안내",
    "url": "https://nl.tiffany.com/jewelry/dainty-jewelry/diamond/",
    "note": "40.6cm와 45.7cm가 쇄골 부근에 놓이고 45.7cm가 다양한 목선에 활용될 수 있다는 설명을 참고했습니다."
  },
  {
    "label": "Tiffany & Co. Long Pendant Necklaces 안내",
    "url": "https://nl.tiffany.com/jewelry/long-pendant-necklaces/?page=2",
    "note": "펜던트 목걸이에서 길이에 따라 펜던트 위치가 달라지는 설명을 참고했습니다."
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
