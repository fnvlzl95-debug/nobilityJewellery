<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/jongno-two-tone-couple-ring-selection'
const pageTitle = '종로 콤비 커플링, 색 배치부터 고르세요 | 귀족'
const pageDescription = '콤비 커플링은 중앙·가장자리·장식부에 들어가는 색부터 비교하세요. 귀족 갤러리의 콤비 디자인을 살펴보고 부위별 소재와 원하는 배치를 정리해 주문 상담을 시작할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/jongno-two-tone-couple-ring-selection-hero-3c2ad171.webp`
const publishedAt = '2026-09-20'
const updatedAt = ''
const faqItems = [
  {
    "question": "콤비 커플링의 은빛 부분은 백금인가요?",
    "answer": "색만으로 알 수 없습니다. 여러 색의 금 합금을 조합한 제품도 있고 금과 백금을 함께 쓴 제품도 있으므로 해당 부위의 실제 소재를 확인해야 합니다."
  },
  {
    "question": "색의 순서를 바꾸면 같은 디자인인가요?",
    "answer": "전체 형태가 같아도 중앙과 테두리의 대비가 바뀌면 인상이 달라집니다. 바꾸고 싶은 부위를 사진에 표시하고, 해당 디자인에서 변경 가능한지 확인하세요."
  },
  {
    "question": "금빛 테두리를 더 넓게 주문할 수 있나요?",
    "answer": "테두리의 폭은 색 선택뿐 아니라 반지의 형태와 제작 구조에도 관련됩니다. 사진에서 원하는 비율을 표시해 가능한 변경 범위를 상담해 보세요."
  },
  {
    "question": "콤비와 무광·유광 조합은 같은 뜻인가요?",
    "answer": "색을 나눈 것과 표면 반사감을 나눈 것은 다른 확인 항목입니다. 사진에서 두 부분이 다르게 보이면 색 차이인지 마감 차이인지 함께 질문하세요."
  }
]
const quickAnswers = [
  "콤비 커플링은 중앙 면·가장자리·장식부 중 어디에 대비를 줄지부터 고르세요.",
  "은빛 부위가 백금인지 화이트골드인지, 표면 처리가 있는지는 제품별로 확인해야 합니다.",
  "갤러리 제품명과 원하는 색 위치를 함께 보내면 주문하려는 모습을 설명하기 쉽습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "색 이름보다 색이 들어갈 위치를 고르세요",
    "paragraphs": [
      "GIA는 한 반지의 몸체와 보석 고정 부위에 서로 다른 색의 금을 쓰거나, 다른 색의 금이 교차하는 디자인을 소개합니다. 같은 색 조합이라도 배치가 다르면 보이는 모습이 달라질 수 있습니다.",
      "사진에서 가장 마음에 드는 부분에 표시해 보세요. “은빛이 더 많았으면 좋겠어요”보다 “넓은 중앙은 은빛, 양옆 테두리는 금빛이면 좋겠어요”라고 전달하면 디자인의 기준이 구체적입니다. 다음 표는 배치를 비교할 때 사용할 수 있는 질문입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "색을 나눌 위치",
        "사진에서 볼 점",
        "주문안으로 적는 방법"
      ],
      "rows": [
        [
          "중앙 면과 가장자리",
          "넓은 면과 얇은 선 중 어느 색이 주로 보이는지",
          "중앙은 은빛, 가장자리는 금빛"
        ],
        [
          "교차하거나 겹치는 부분",
          "서로 다른 색이 만나는 방향과 보이는 구간",
          "위로 지나가는 부분은 금빛"
        ],
        [
          "보석 주변과 밴드",
          "장식을 잡는 부위의 색이 밴드와 같은지",
          "밴드는 금빛, 보석 주변은 은빛"
        ]
      ]
    }
  },
  {
    "title": "귀족 갤러리에서 두 디자인을 나란히 비교해 보세요",
    "paragraphs": [
      "넓은 면과 테두리의 대비를 보고 싶다면 갤러리의 “투톤 새틴 콤비 커플링”을 살펴보세요. 새틴 면과 유광 엣지를 조합한 디자인으로, 색이 나뉘는 위치와 반사감이 함께 어떻게 보이는지 비교할 수 있습니다.",
      "가장자리의 장식과 중심 포인트를 함께 보고 싶다면 “밀그레인 솔리테어 콤비 커플링”도 비교해 보세요. 좋아하는 디테일과 빼고 싶은 디테일을 각각 표시하면 기본 디자인을 정하기 쉽습니다.",
      "아래 관련 링크의 귀족 갤러리에서 반지 사진을 확인할 수 있습니다. 사진을 캡처해 “이 디자인의 중앙 색을 유지하고 테두리 색만 상담하고 싶다”처럼 요청해 주세요. 원하는 색 변경은 디자인과 제작 조건을 확인한 뒤 정합니다."
    ],
    "bullets": [
      "두 후보의 정면뿐 아니라 옆면에서 보이는 색도 비교하기",
      "조명에 비친 밝은 부분과 실제 색 경계를 구분해 질문하기",
      "무광·유광 차이는 별도 관련 가이드로 확인하기"
    ],
    "table": null
  },
  {
    "title": "은빛 부위의 소재를 따로 확인하세요",
    "paragraphs": [
      "콤비라는 이름만으로 소재 구성이 정해지지는 않습니다. GIA는 여러 색의 금 합금을 섞어 디자인한 반지를 소개하며, Tiffany의 공식 제품 중에는 옐로골드와 백금을 함께 사용한 밴드도 있습니다. 이는 소재 조합이 여러 가지라는 사례이며 귀족 갤러리 제품의 소재를 대신 설명하는 자료는 아닙니다.",
      "후보를 정했다면 중앙과 가장자리, 보석을 잡는 부분의 소재를 각각 물어보세요. 특히 흰색 금 합금에는 로듐 표면 처리가 쓰이기도 하므로, 밝게 보이는 부위의 바탕 소재와 표면 처리를 나누어 확인하는 것이 좋습니다. 일반적인 금 함량·도금 설명보다 지금 고르는 반지의 각 부위가 어떻게 구성되는지에 집중하세요."
    ],
    "bullets": [
      "중앙 면과 가장자리의 금속 종류·함량",
      "표면 처리가 적용된 부위와 적용되지 않은 부위",
      "사진에서 나뉘어 보이는 색 경계의 실제 구조"
    ],
    "table": null
  },
  {
    "title": "선택한 디자인과 색 표시를 카카오톡으로 보내세요",
    "paragraphs": [
      "두 사람이 함께 고른 사진 한 장에 원하는 색의 위치를 표시해 주세요. 같은 배치를 원하면 하나의 안으로, 서로 다르면 각자의 사진으로 보내면 됩니다. 호수나 최종 소재가 아직 정해지지 않았다면 미정이라고 적고 상담할 수 있습니다.",
      "문의 예시: “투톤 새틴 콤비 커플링을 보고 문의합니다. 중앙은 은빛, 가장자리는 금빛인 모습이 좋습니다. 표시한 테두리의 색 변경이 가능한지와 부위별 소재, 한 쌍 주문 견적을 알고 싶어요. 희망 수령일은 ○월 ○일입니다.”",
      "아래 카카오톡 상담으로 제품명·표시한 사진·희망일을 보내 주세요. 종로 173 종묘귀금속백화점 101호 귀족에서 디자인과 주문 조건을 상담할 수 있습니다. 가격과 제작 일정은 선택한 구성에 맞춰 확인합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "색 배치 변경이나 부분별 소재 선택은 디자인마다 가능한 범위가 다릅니다. 원하는 안을 보낸 뒤 제작 조건을 확인하세요.",
  "사진의 밝기만으로 금속 종류·표면 처리·접합 구조를 확정하지 마세요."
]
const relatedLinks = [
  {
    "to": "/gallery",
    "label": "귀족 콤비 커플링 사진 보기",
    "description": "투톤 새틴과 밀그레인 솔리테어 콤비 디자인을 비교해 보세요."
  },
  {
    "to": "/guide/wedding-band-matte-gloss",
    "label": "색과 별도로 고르는 무광·유광 마감",
    "description": "중앙 면과 테두리의 반사감을 비교하는 기준입니다."
  },
  {
    "to": "/guide/jongno-custom-couple-ring-order",
    "label": "커플링 주문 진행 순서",
    "description": "디자인을 고른 뒤 상담부터 수령까지 확인할 내용을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '종로 콤비 커플링, 색 배치부터 고르세요'
const gmArticleLead = '종로에서 콤비 커플링을 고른다면 “금빛과 은빛”처럼 색 이름만 정하기보다 어느 부위에 각 색을 넣을지 먼저 골라 보세요. 넓은 중앙 면을 강조할지, 얇은 테두리만 다르게 할지에 따라 인상이 달라집니다. 귀족 갤러리에서 마음에 드는 디자인을 찾고 바꾸고 싶은 색의 위치를 표시해 상담해 보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '종로 콤비 커플링'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '콤비 커플링 색 배치와 주문 조건'
const gmHeroAlt = '짙은 돌 위 은빛 중앙 면과 금빛 테두리가 있는 반지 두 개'
const gmHeroCaption = '중앙과 가장자리의 색 배치를 설명하는 이미지입니다. 아래에서 소개하는 귀족 갤러리의 실제 제품 사진과는 다릅니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '금속 색 조합은 GIA, 금과 백금이 함께 쓰인 사례는 Tiffany 공식 제품 설명을 참고했습니다. 귀족 디자인명과 외관 설명은 홈페이지 갤러리를 기준으로 했으며, 색 배치 표와 문의 예시는 주문 상담을 돕기 위한 안내입니다.'
const gmSources = [
  {
    "label": "GIA — Buying Guide for White, Yellow and Rose Gold Engagement Rings",
    "url": "https://4cs.gia.edu/en-us/blog/buying-guide-white-yellow-rose-gold-engagement-rings/",
    "note": "다른 색 금 합금의 배치와 화이트골드의 표면 처리 안내."
  },
  {
    "label": "Tiffany — Together Milgrain Band Ring",
    "url": "https://www.tiffany.com/jewelry/rings/tiffany-together-18k-yellow-gold-and-platinum-rings-74362168.html",
    "note": "금과 백금을 함께 사용한 밴드의 제품 구성 사례."
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
