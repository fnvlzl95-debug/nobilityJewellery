<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/coin-necklace-design-selection-guide'
const pageTitle = '코인 목걸이 구매, 양면과 테두리 선택법 | 귀족'
const pageDescription = '코인 목걸이를 구매할 때는 앞·뒷면 무늬와 테두리 비율, 문양의 입체감을 따로 살펴보세요. 코인풍 장식과 실제 주화 사용 제품을 구분하고 원하는 부분을 사진에 표시해 귀족에 구매·제작 상담을 시작할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/coin-necklace-design-selection-guide-hero-2c492123.webp`
const publishedAt = '2026-09-23'
const updatedAt = ''
const faqItems = [
  {
    "question": "코인 목걸이에는 진짜 동전이 들어가나요?",
    "answer": "제품마다 다릅니다. 코인처럼 무늬를 만든 장식도 있고 실제 주화를 사용했다고 설명하는 제품도 있습니다. 상품 설명에서 재료와 제작 구성을 확인하세요."
  },
  {
    "question": "양면 코인 목걸이는 앞뒤 무늬가 같나요?",
    "answer": "반드시 같지는 않습니다. 서로 다른 그림이나 문구가 들어갈 수 있어 앞면과 뒷면 사진을 각각 확인해야 합니다. 두 면 중 주로 보이고 싶은 쪽도 골라 보세요."
  },
  {
    "question": "코인 펜던트 크기는 무엇을 기준으로 비교하나요?",
    "answer": "전체 너비와 중앙 문양이 차지하는 부분을 구분해 보세요. 테두리가 넓은 제품은 같은 전체 크기라도 문양이 작게 보일 수 있습니다. 문양의 입체감은 옆면 사진으로 함께 확인하세요."
  },
  {
    "question": "갖고 있는 동전으로 목걸이 제작을 문의해도 되나요?",
    "answer": "보유 주화를 사용하려는 요청임을 먼저 알려 주세요. 주화 사진과 원하는 고정 형태를 보내 해당 작업의 취급 여부를 확인해야 합니다. 일반 코인풍 장식 제작과 같은 조건이라고 가정하지 마세요."
  }
]
const quickAnswers = [
  "코인 모양의 장식인지 실제 주화를 사용한 제품인지 상품 설명으로 구분하세요.",
  "앞면과 뒷면을 각각 보고, 양쪽 모두 마음에 드는지 확인하세요.",
  "전체 너비에서 중앙 문양과 테두리가 차지하는 비율을 나눠 비교하면 원하는 디자인을 설명하기 쉽습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "코인 모양인지 실제 주화인지 먼저 읽어 보세요",
    "paragraphs": [
      "“코인 목걸이”라는 이름만으로 실제 화폐가 들어 있다고 볼 수는 없습니다. 동전을 닮은 무늬를 넣은 장식인지, 주화를 틀에 넣은 제품인지 설명에서 구분해 보세요. 실제로 Bvlgari의 특정 Monete 목걸이는 고대 주화를 사용한다고 안내하지만, 이 조건을 다른 코인풍 목걸이에 적용할 수는 없습니다.",
      "일상용 장신구를 찾는다면 먼저 마음에 드는 문양을 고르고 그 제품의 소재와 구성을 확인하면 됩니다. 코인이라는 이름이나 금빛 외관만 보고 순금 또는 투자용 금화로 판단하지 마세요. 귀족에 문의할 때도 실제 주화를 보유한 경우와 코인처럼 생긴 디자인을 원하는 경우를 구분해 알려 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "앞면과 뒷면을 한 쌍의 디자인으로 비교하세요",
    "paragraphs": [
      "앞면에 인물·동물·식물 같은 무늬가 있고 뒷면은 다른 그림이나 문구로 채워진 디자인도 있습니다. Pandora의 특정 메달 장식은 앞면에 페가수스, 뒷면에 문구를 넣었다고 설명합니다. 이처럼 정면 사진에서 보이지 않는 면도 따로 확인할 이유가 있습니다.",
      "후보 사진을 앞면과 뒷면으로 나란히 놓고 보세요. 양쪽 모두 무늬가 있기를 원하는지, 한쪽은 간결한 빈 면이 좋을지 취향을 정할 수 있습니다. 양면 디자인이라는 설명이 있더라도 양쪽의 모양이 같다는 뜻은 아니므로 실제 사진을 확인하는 것이 좋습니다.",
      "주로 보이고 싶은 면이 정해졌다면 그 면이 앞으로 오도록 착용한 사진도 요청해 보세요. 다른 면으로 바꾸어 착용할 수 있는지와 어떤 방향으로 연결되는지는 해당 제품의 구조를 기준으로 확인합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 양면 구성",
        "추가로 볼 사진",
        "상담에서 말할 내용"
      ],
      "rows": [
        [
          "앞뒤에 서로 다른 무늬",
          "두 면을 같은 크기로 찍은 사진",
          "주로 보이고 싶은 면과 반대 면의 선호"
        ],
        [
          "한쪽 문양·한쪽 간결한 면",
          "뒷면 전체가 드러난 사진",
          "뒷면에 무늬가 없는 후보를 선호하는지"
        ],
        [
          "양쪽 모두 비슷한 분위기",
          "양쪽의 테두리와 문양 비교 사진",
          "반대 면에서도 유지하고 싶은 요소"
        ]
      ]
    }
  },
  {
    "title": "중앙 문양과 테두리의 비율을 따로 고르세요",
    "paragraphs": [
      "같은 전체 너비라도 테두리가 넓으면 중앙 문양이 차지하는 면적은 작아질 수 있습니다. 가운데 그림이 크게 보이는 후보와 프레임이 또렷한 후보를 나란히 놓고, 어느 부분에 먼저 눈이 가는지 살펴보세요. 전체 크기만으로 문양의 존재감을 비교하기는 어렵습니다.",
      "매끈한 원형 테두리를 원하는지, 선이나 작은 구슬 모양이 반복되는 테두리가 좋은지도 표시해 보세요. 참고 사진에 “이 테두리는 유지하고 싶다”라고 적으면 단순히 큰 코인이나 작은 코인이라고 말할 때보다 선호가 분명해집니다.",
      "문양의 입체감은 옆면 사진에서 살펴보세요. 표면에 선으로 표현된 무늬인지, 바탕에서 도드라지는 양각인지 확인하고 어느 쪽을 원하는지 골라 보세요. 두께나 돌출 정도의 변경 가능 여부는 디자인별로 상담해야 합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "비교할 후보",
        "눈여겨볼 부분",
        "원하는 인상 정리"
      ],
      "rows": [
        [
          "중앙 문양이 넓은 디자인",
          "그림 부분과 바깥 윤곽",
          "문양 자체가 잘 보였으면 좋겠어요."
        ],
        [
          "프레임이 강조된 디자인",
          "테두리의 폭과 반복 무늬",
          "바깥 원형 라인이 또렷했으면 좋겠어요."
        ],
        [
          "입체 문양이 있는 디자인",
          "옆면에서 보이는 돌출 형태",
          "문양의 높이를 사진으로 먼저 보고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "사진에 남길 부분을 표시해 문의하세요",
    "paragraphs": [
      "문의 예시: “코인 모양의 목걸이를 찾고 있습니다. 첨부 사진의 넓지 않은 테두리와 식물 무늬가 마음에 들어요. 뒷면은 간결한 디자인을 선호하고, 실제 주화가 들어갈 필요는 없습니다. 이런 조건으로 구매 또는 제작할 수 있는지, ○월 ○일 수령을 희망할 때 어떤 후보를 볼 수 있는지 상담받고 싶습니다.”",
      "귀족 카카오톡 상담에 참고 사진·선호하는 앞뒷면·테두리 형태·예산·희망일을 보내 주세요. 특정 브랜드 제품의 사진을 참고하더라도 그대로 복제하는 요청보다 마음에 드는 요소를 표시해 구매·제작 가능한 범위를 확인해 보세요.",
      "종로 173 종묘귀금속백화점 101호 귀족에서 디자인과 주문 조건을 상담할 수 있습니다. 보유한 실제 주화를 사용하고 싶다면 첫 문의에서 알려 주시고, 해당 작업을 취급하는지부터 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "코인이라는 상품명만으로 실제 화폐·순금·투자용 금화라고 판단하지 마세요.",
  "앞뒷면 변경이나 테두리 수정, 보유 주화 사용은 사진만으로 확정할 수 없으므로 취급 여부와 가능 범위를 먼저 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "코인 목걸이 디자인 상담하기",
    "description": "앞뒷면과 테두리에서 원하는 부분을 사진에 표시해 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 둘러보기",
    "description": "펜던트의 무늬와 윤곽을 비교할 참고 사진을 찾아보세요."
  },
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "디자인을 고른 뒤 목걸이 길이 확인",
    "description": "선택한 펜던트를 어느 위치에 착용할지 따로 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '코인 목걸이 구매, 양면과 테두리 선택법'
const gmArticleLead = '코인 목걸이는 둥근 모양이 비슷해도 앞·뒷면의 무늬와 테두리에 따라 인상이 달라집니다. 정면 사진 한 장으로 고르기 전에 반대쪽 면과 옆면도 살펴보세요. 어떤 무늬를 주로 보이게 하고 싶은지 정하면 후보를 좁히기 쉽습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '코인 목걸이 구매'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '코인 목걸이 양면 무늬와 테두리 디자인'
const gmHeroAlt = '크림색 리넨 위에 놓인 금빛 원형 코인 스타일 펜던트와 세로 고리에 연결된 가는 체인'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '실제 주화를 사용한 특정 제품 사례는 Bvlgari, 앞뒷면에 다른 장식을 넣은 사례는 Pandora 제품 안내를 참고했습니다. 문양·테두리를 비교하는 표와 문의 예시는 디자인 선택을 돕기 위한 제안이며, 귀족의 취급 품목이나 제작 조건을 뜻하지 않습니다.'
const gmSources = [
  {
    "label": "Bvlgari — Monete Necklace",
    "url": "https://www.bulgari.com/en-gb/product/347707",
    "note": "실제 고대 주화를 사용한다고 설명하는 특정 목걸이 제품 사례입니다."
  },
  {
    "label": "Pandora — Pegasus Medallion Charm",
    "url": "https://us.pandora.net/en/charms/pegasus-medallion-charm/764090C01.html",
    "note": "앞면의 그림과 뒷면의 문구를 구분해 소개하는 메달 장식 사례입니다."
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
