<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/y-lariat-necklace-drop-selection'
const pageTitle = 'Y자 목걸이 구매, 갈림점과 드롭 길이 | 귀족'
const pageDescription = 'Y자 목걸이는 목을 두르는 부분과 아래로 내려오는 드롭을 나누어 골라 보세요. 갈림점과 장식 끝의 위치, 조절되는 구간을 확인하고 참고 사진에 원하는 위치를 표시해 귀족에 구매·제작 상담을 시작할 수 있습니다.'
const ogImage = `${siteConfig.url}/Image/guide/y-lariat-necklace-drop-selection-hero-ce565c42.webp`
const publishedAt = '2026-09-25'
const updatedAt = ''
const faqItems = [
  {
    "question": "Y자 목걸이와 라리에트 목걸이는 길이 조절이 모두 되나요?",
    "answer": "이름만으로 조절 여부를 판단할 수 없습니다. 실제 연결 구조와 사용 방법을 보고, 목둘레 부분과 아래 드롭 중 어느 구간이 조절되는지 확인하세요."
  },
  {
    "question": "Y자 목걸이에 적힌 길이에 아래 드롭도 포함되나요?",
    "answer": "제품마다 측정 범위가 다를 수 있습니다. 목을 두르는 부분인지 전체 체인인지, Y 모티프나 드롭 길이가 따로 표시되는지 판매 설명에서 확인해야 합니다."
  },
  {
    "question": "Y자 목걸이의 장식 끝만 짧게 주문할 수 있나요?",
    "answer": "갈림점은 유지하고 끝만 올리고 싶다는 요청을 사진에 표시해 주세요. 해당 구조에서 드롭만 변경할 수 있는지는 제품과 제작 방식에 따라 상담해야 합니다."
  },
  {
    "question": "Y자 목걸이 상담 사진에는 무엇을 표시하면 좋나요?",
    "answer": "양쪽 체인이 만나는 갈림점을 A, 맨 아래 장식 끝을 B로 표시하고 각각 원하는 위치를 적어 주세요. 함께 입을 상의와 조절 기능의 필요 여부도 알려 주면 좋습니다."
  }
]
const quickAnswers = [
  "Y자 목걸이는 목둘레 부분과 갈림점 아래로 내려오는 드롭을 나누어 살펴보세요.",
  "상품에 적힌 길이가 어느 구간을 잰 값인지 확인해야 장식 끝의 위치를 비교할 수 있습니다.",
  "조절형이라도 움직이는 부분은 제품마다 다르므로, 갈림점과 드롭이 각각 조절되는지 물어보세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "길이 하나보다 갈림점과 끝을 함께 보세요",
    "paragraphs": [
      "Y자 목걸이를 찾을 때는 라리에트(lariat)라는 이름도 함께 보게 됩니다. Tiffany의 공식 라리에트 상품처럼 길이를 표기하는 제품도 있지만, 이름이나 길이 숫자만으로 연결 구조와 아래 장식의 위치까지 알 수는 없습니다. 구입할 제품의 사진과 측정 범위를 함께 확인하세요.",
      "먼저 목을 두르는 부분을 보고, 양쪽 체인이 만나는 지점을 A, 가장 아래 장식 끝을 B로 표시해 보세요. A의 착용 위치와 A에서 B까지 내려오는 드롭을 나누어 생각하면 “전체적으로 긴 목걸이”보다 구체적으로 원하는 형태를 전달할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "목둘레 부분과 아래 드롭을 따로 고르세요",
    "paragraphs": [
      "Swarovski의 Symbolica Y 목걸이 공식 설명은 길이 범위와 Y 모티프 길이를 별도 항목으로 안내합니다. 이처럼 한 제품 안에서도 길이를 설명하는 구간이 다를 수 있습니다. 다른 제품을 비교할 때는 같은 구간을 재었는지 먼저 확인하세요.",
      "갈림점은 마음에 드는데 끝이 너무 아래로 내려온다면, 목둘레 부분을 줄이는 것과 드롭을 짧게 고르는 것은 다른 요청입니다. 참고 사진에서 A를 유지한 채 B만 올리고 싶은지, A와 B를 함께 올리고 싶은지 표시해 보세요. 실제로 바꿀 수 있는 범위는 제품 구조에 따라 상담해야 합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "살펴볼 부분",
        "사진에서 볼 위치",
        "구매·주문할 때 물어볼 내용"
      ],
      "rows": [
        [
          "목을 두르는 부분",
          "양쪽 체인과 목 뒤 연결부",
          "표기 길이는 어느 지점부터 어디까지인가요?"
        ],
        [
          "Y자 갈림점 A",
          "양쪽 체인이 만나는 곳",
          "착용했을 때 이 갈림점을 원하는 위치에 둘 수 있나요?"
        ],
        [
          "아래 드롭 A–B",
          "갈림점부터 장식 끝까지",
          "목둘레 부분을 유지하고 아래 길이만 바꿀 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "조절형은 어느 부분이 움직이는지 확인하세요",
    "paragraphs": [
      "슬라이딩 잠금을 사용하는 Y자 목걸이도 있습니다. 다만 “조절 가능”이라는 설명만 보고 목둘레와 드롭을 각각 원하는 대로 바꿀 수 있다고 생각하지 마세요. 목 뒤 길이를 바꾸는지, 앞쪽 연결점이 움직이는지, 한쪽을 조절하면 다른 부분도 달라지는지 해당 제품의 사용 방법을 확인해야 합니다.",
      "가능하다면 조절 전후를 같은 방향에서 보여 주는 사진이나 짧은 영상을 요청해 보세요. A는 그대로 있고 B만 이동하는지, 두 위치가 함께 바뀌는지 보면 자신이 원하는 조절 방식인지 판단하기 쉽습니다. 고정된 연결점을 임의로 밀어 움직이는 방식으로 확인하지는 마세요.",
      "자주 입을 상의와 함께 원하는 위치를 정해 보세요. 갈림점이 목선 위에 드러나는 구성을 원하는지, 아래 장식까지 옷 위에 보이기를 원하는지 사진에 표시하면 좋습니다. 같은 목걸이라도 옷의 목선과 착용자에 따라 보이는 위치가 달라질 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "A·B를 표시한 사진으로 상담을 시작하세요",
    "paragraphs": [
      "문의 예시: “Y자 목걸이를 찾고 있습니다. 사진의 갈림점 A는 유지하고, 장식 끝 B는 조금 위에서 끝나는 느낌을 원해요. 목둘레와 아래 드롭을 따로 선택할 수 있는지 궁금합니다. 조절형이라면 어느 부분이 움직이는지도 알고 싶어요.”",
      "귀족 카카오톡에 참고 사진·A와 B의 희망 위치·함께 입을 상의·조절 기능의 필요 여부·예산·희망일을 보내 주세요. 정확한 길이를 아직 정하지 못했다면 원하는 위치를 표시한 사진부터 전달해도 됩니다. 구매 또는 제작 가능 범위와 견적·일정은 상담에서 확인합니다.",
      "종로 173 종묘귀금속백화점 101호 귀족에 방문하기 전, 원하는 Y자 실루엣을 사진으로 먼저 설명해 보세요. 체인 종류나 잠금 장치를 모두 정하기에 앞서 갈림점과 끝의 관계를 정리하면 원하는 디자인을 좁히기 좋습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "제품마다 길이를 표시하는 범위와 조절 구조가 다르므로 같은 길이 표기만으로 착용 위치를 단정하지 마세요.",
  "고정된 연결점을 억지로 움직이지 말고, 조절 가능 구간과 방법을 해당 제품 기준으로 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "Y자 목걸이 구매·제작 상담하기",
    "description": "갈림점과 장식 끝의 희망 위치를 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 목걸이 디자인 살펴보기",
    "description": "원하는 체인과 장식의 분위기를 찾아보세요."
  },
  {
    "to": "/guide/gold-necklace-length-guide",
    "label": "일반 목걸이 길이 선택 기준",
    "description": "목을 두르는 길이부터 고민될 때 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'Y자 목걸이 구매, 갈림점과 드롭 길이'
const gmArticleLead = '사진 속 Y자 목걸이가 마음에 들었는데, 막상 걸면 아래 장식이 어디까지 내려올지 궁금한가요? 목을 두르는 체인 길이만으로는 답하기 어렵습니다. 두 체인이 만나는 갈림점과 그 아래 장식 끝을 따로 정하면 원하는 모습을 설명하기 쉬워집니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = 'Y자 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'Y자 목걸이 갈림점과 드롭 구성'
const gmHeroAlt = '크림색 천 위 금빛 Y자 목걸이로 작은 원형 장식 두 개 아래에 한 줄 체인과 민자 바 장식이 이어진 모습'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '라리에트 상품의 길이 표기와 Y 모티프·슬라이딩 잠금 사례는 공식 제품 설명을 참고했습니다. 갈림점 A와 끝 B를 표시해 상담하는 방법은 원하는 디자인을 전달하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "Swarovski — Symbolica Y necklace",
    "url": "https://www.swarovski.com/en_GB-CA/p-M5741463/Symbolica-Y-necklace-Crystal-pearl-Pave-Horseshoe-White-18K-rose-gold-finish?variantID=5741463",
    "note": "목걸이 길이와 Y 모티프 길이, 조절 잠금을 별도로 안내하는 제품 사례입니다."
  },
  {
    "label": "Tiffany — Elsa Peretti Open Heart Lariat Necklace",
    "url": "https://www.tiffany.com/jewelry/necklaces-pendants/ep-open-heart-sterling-silver-necklaces-pendants-1405144956.html",
    "note": "라리에트 이름과 길이 표기를 확인할 수 있는 공식 제품 사례입니다."
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
