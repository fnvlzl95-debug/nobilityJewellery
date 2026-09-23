<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/open-ring-size-selection-guide'
const pageTitle = '오픈링 구매, 프리사이즈인지 확인하세요 | 귀족'
const pageDescription = '오픈링은 끝이 열려 있어도 모두 프리사이즈는 아닙니다. 고정 호수와 조절형을 구분하고 틈의 위치·끝장식·착용 방향을 살펴보세요. 원하는 디자인 사진으로 귀족에 구매·제작 가능 범위를 문의할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/open-ring-size-selection-guide-hero-fca4fb25.webp`
const publishedAt = '2026-09-23'
const updatedAt = ''
const faqItems = [
  {
    "question": "오픈링이면 누구나 맞는 프리사이즈인가요?",
    "answer": "아닙니다. 끝이 열린 디자인이어도 정해진 호수를 고르는 제품이 있습니다. 프리사이즈 또는 조절 가능 표시와 적용 범위를 별도로 확인하세요."
  },
  {
    "question": "프리사이즈 오픈링은 선물받는 사람의 호수를 몰라도 되나요?",
    "answer": "그렇게 단정하기는 어렵습니다. 제품이 맞는 호수 범위와 착용할 손가락을 함께 확인해야 합니다. 호수가 미정이라면 구매 전 어떤 확인이 필요한지 판매처에 물어보세요."
  },
  {
    "question": "오픈링의 틈을 원하는 방향으로 바꿀 수 있나요?",
    "answer": "착용 방향을 달리하는 것과 반지 자체의 구조를 바꾸는 것은 구분해야 합니다. 원하는 방향을 사진에 표시하고 해당 제품을 그렇게 착용하거나 제작할 수 있는지 상담하세요."
  },
  {
    "question": "오픈링 구매 상담에는 어떤 사진이 도움이 되나요?",
    "answer": "열린 틈이 보이는 정면 사진과 두 끝의 높이를 볼 수 있는 측면 사진이 좋습니다. 마음에 드는 끝장식과 착용할 손가락, 조절 기능이 필요한지도 함께 알려 주세요."
  }
]
const quickAnswers = [
  "오픈링이라는 이름과 프리사이즈·조절 가능 표시는 따로 확인하세요.",
  "조절형이라면 적용 가능한 호수 범위와 누가 어떤 방식으로 조절하는지 물어보세요.",
  "열린 틈의 위치와 두 끝의 높이를 확인할 수 있는 정면·측면 사진을 준비하면 디자인 상담이 쉬워집니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "오픈형 디자인과 사이즈 선택을 나누어 보세요",
    "paragraphs": [
      "반지의 양 끝이 연결되지 않은 모양이어도 정해진 호수로 제작된 제품일 수 있습니다. Pandora는 특정 오픈링 제품에 사이즈 조절이 불가능하며 벌리거나 구부리거나 누르지 말라고 안내합니다. Tiffany의 T Wire Ring 공식 페이지에서도 여러 사이즈를 따로 선택하도록 되어 있습니다.",
      "따라서 상품명에 오픈링이라고 적혀 있다는 이유만으로 아무 손가락에나 맞는다고 생각하지 마세요. 고정 호수를 고르는 제품인지, 조절 기능이 있는 제품인지 해당 상품 설명을 먼저 읽어 보세요. 위 브랜드 사례는 열린 형태와 조절 기능이 별개일 수 있다는 예이며, 모든 오픈링의 조건이 같다는 뜻은 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "상품 설명에서 본 내용",
        "구매 전에 확인할 질문"
      ],
      "rows": [
        [
          "호수 선택 항목이 있음",
          "내 호수에 맞는 규격을 고르는 제품인가요?"
        ],
        [
          "프리사이즈·조절 가능이라고 적힘",
          "어느 호수 범위에 맞으며 누가 조절하나요?"
        ],
        [
          "오픈형이라는 설명만 있음",
          "고정 호수인지 조절형인지 먼저 알려 주세요."
        ]
      ]
    }
  },
  {
    "title": "조절형이라면 범위와 방법까지 확인하세요",
    "paragraphs": [
      "조절 가능하다는 설명이 있더라도 원하는 만큼 계속 벌릴 수 있다는 의미로 받아들이지 마세요. 착용하려는 손가락의 호수에 맞는지, 처음 맞춘 뒤에도 조절할 수 있는지, 착용자가 직접 해도 되는지를 판매자에게 물어보세요. 제품별 안내 없이 허용 범위를 숫자로 정할 수는 없습니다.",
      "선물용으로 고른다면 “프리사이즈니까 괜찮겠지” 하고 결정하기보다 받는 사람이 낄 손가락과 제품의 적용 범위를 함께 확인하세요. 호수를 모르는 경우에는 미정이라고 알리고 어떤 확인이 필요한지 상담하면 됩니다. 일반적인 호수 확인 방법은 아래 관련 안내에서 따로 볼 수 있습니다."
    ],
    "bullets": [
      "제품에 명시된 적용 호수 범위",
      "판매처에서 맞추는지, 착용자가 조절할 수 있는지",
      "처음 맞춘 뒤 다시 조절할 때의 안내"
    ],
    "table": null
  },
  {
    "title": "틈의 위치와 두 끝의 모양을 고르세요",
    "paragraphs": [
      "오픈링의 매력은 이어지지 않은 부분이 만드는 모양에도 있습니다. 틈이 손등 쪽에서 보이기를 원하는지, 옆이나 손바닥 쪽에 있기를 원하는지 참고 사진에 표시해 보세요. 같은 반지라도 착용 방향을 어떻게 잡았는지에 따라 사진에서 보이는 모습이 달라집니다.",
      "두 끝이 떨어져 있는 형태와 서로 겹쳐 보이는 형태도 구분해 보세요. 정면 사진에서는 비슷해 보여도 측면에서는 한쪽 끝이 더 높을 수 있습니다. 끝장식이 손가락 옆면에 닿는지, 높게 올라오는 부분이 있는지 궁금하다면 그 부분을 표시해 문의하세요.",
      "제품을 직접 볼 수 있다면 안내된 방향으로 착용하고 끝부분이 닿는 느낌을 확인해 보세요. 원하는 틈의 폭이나 끝의 배치를 만들기 위해 스스로 구부리기보다, 구매 또는 제작 단계에서 그 모양을 요청할 수 있는지 확인하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "고를 부분",
        "사진에서 표시할 내용"
      ],
      "rows": [
        [
          "틈이 보이는 방향",
          "정면·옆면·손바닥 쪽 중 원하는 위치"
        ],
        [
          "두 끝의 관계",
          "서로 떨어진 모양 또는 겹쳐 보이는 모양"
        ],
        [
          "끝장식의 입체감",
          "끝의 높이와 손가락에 닿는 면"
        ]
      ]
    }
  },
  {
    "title": "원하는 오픈 모양을 사진으로 보내 주세요",
    "paragraphs": [
      "문의 예시: “첨부 사진처럼 두 끝이 떨어진 오픈링을 찾고 있습니다. 틈은 손등 쪽에 보이고 끝장식은 높지 않았으면 해요. 검지에 착용할 예정이며, 직접 조절하는 기능은 필요하지 않습니다. 이 형태로 구매하거나 제작할 수 있는지와 호수 확인 방법을 상담받고 싶습니다.”",
      "귀족 카카오톡 상담에 참고 사진·착용할 손가락·조절 기능이 필요한지 여부·희망일을 보내 주세요. 사진에서 특히 마음에 드는 틈과 끝부분에 표시하면 원하는 형태를 전달하기 쉽습니다. 제작 가능 여부와 견적·일정은 선택한 구조를 보고 확인합니다.",
      "종로 173 종묘귀금속백화점 101호 귀족에 방문할 계획이라면, 먼저 사진으로 상담하고 실제로 확인할 디자인과 착용 조건을 정리해 보세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "조절 가능하다는 안내가 없는 오픈링을 직접 벌리거나 눌러 호수를 바꾸지 마세요.",
  "사진으로 고른 틈의 모양과 실제 착용감은 다를 수 있어 제품 구조와 호수를 함께 확인해야 합니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "원하는 오픈링 디자인 상담하기",
    "description": "열린 모양과 호수 선택 조건을 사진으로 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 둘러보기",
    "description": "마음에 드는 반지의 선과 장식을 찾아보세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "착용할 손가락의 호수 확인",
    "description": "오픈형 여부와 별도로 기본 사이즈를 확인하는 안내입니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '오픈링 구매, 프리사이즈인지 확인하세요'
const gmArticleLead = '끝이 열려 있는 오픈링을 보고 “호수를 몰라도 살 수 있겠다”고 생각하셨나요? 열린 모양만으로 사이즈 조절 여부를 알 수는 없습니다. 먼저 고정 호수 제품인지 확인한 뒤, 틈과 끝장식이 마음에 드는 디자인을 골라 보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '오픈링 프리사이즈'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '오픈링 호수 선택과 열린 디자인'
const gmHeroAlt = '중성적인 배경 위에 놓인 금빛 심플한 C자 오픈링 한 개와 서로 떨어진 매끈한 둥근 팁 두 개'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '오픈링의 조절 제한과 사이즈 선택 사례는 Pandora·Tiffany의 해당 제품 안내를 참고했습니다. 틈의 위치와 끝장식을 비교하는 표·문의 예시는 구매 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "Pandora — Pearl Open Ring",
    "url": "https://us.pandora.net/en/rings/statement-rings/treated-freshwater-cultured-pearl-open-ring/163285C01.html",
    "note": "사이즈를 조절할 수 없다고 안내하는 특정 오픈링 제품 사례입니다."
  },
  {
    "label": "Tiffany — T Wire Ring",
    "url": "https://www.tiffany.com/jewelry/rings/tiffany-t-18k-white-gold-rings-60148364.html",
    "note": "열린 형태의 반지에 여러 사이즈 선택지를 제공하는 제품 사례입니다."
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
