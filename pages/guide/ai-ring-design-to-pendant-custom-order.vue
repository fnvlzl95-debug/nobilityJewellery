<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-ring-design-to-pendant-custom-order'
const pageTitle = 'AI 반지 디자인, 목걸이로 바꿔 맞추기 | 귀족'
const pageDescription = 'AI 반지 디자인이 마음에 들지만 목걸이로 착용하고 싶다면, 남길 모티브와 새로 정할 연결 구조를 구분하세요. 펜던트의 방향·비율·고리와 주문 구성을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-ring-design-to-pendant-custom-order-hero-3f2ced42.webp`
const publishedAt = '2026-11-01'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 반지 디자인을 목걸이로 주문하려면 반지를 먼저 만들어야 하나요?",
    "answer": "그럴 필요는 없습니다. AI 반지 이미지에서 마음에 드는 특징을 골라 새 펜던트의 참고 자료로 보낼 수 있습니다. 실제 반지를 만들었다가 바꾸는 작업과는 다르며, 목걸이에 맞는 구조부터 상담하면 됩니다."
  },
  {
    "question": "반지 밴드만 지우면 같은 디자인의 펜던트가 되나요?",
    "answer": "밴드와 연결된 곡선이 전체 인상의 일부일 수 있어 지우면 모양이 달라질 수 있습니다. 중앙 장식만 남길지, 양옆의 곡선을 둘레 장식으로 살릴지 고르고 체인 연결부와 뒷면을 새로 검토하세요."
  },
  {
    "question": "AI가 만든 펜던트 착용 사진대로 방향이 유지되나요?",
    "answer": "이미지 한 장만으로 실제 착용 방향이나 움직임을 확인할 수는 없습니다. 체인 연결 위치와 장식 구조를 함께 검토하고, 착용 시 놓이는 모습을 어떤 자료나 방법으로 확인할 수 있는지 상담하세요."
  },
  {
    "question": "목걸이 이미지가 없어도 AI 반지 사진만 보내면 되나요?",
    "answer": "네. 반지 원본과 남기고 싶은 부분, 원하는 세로형·가로형 방향을 보내 주세요. 펜던트만 필요한지 체인도 함께 필요한지 알려 주면 제작 가능한 형태와 주문 범위를 상담하기 좋습니다."
  }
]
const quickAnswers = [
  "AI 반지 이미지만 있어도 펜던트를 원하는 방향으로 상담을 시작할 수 있습니다. 반지를 먼저 만들거나 목걸이 이미지를 완성해 올 필요는 없습니다.",
  "반지의 정면 장식과 손가락을 감싸는 밴드를 나누어 보세요. 남길 윤곽을 고른 뒤 펜던트의 고리·뒷면·전체 크기를 따로 정합니다.",
  "원본 이미지와 남기고 싶은 부분, 펜던트 단독 또는 체인 포함 여부를 알려 주세요. 실제 제작 범위는 목걸이에 맞게 검토한 구조와 사양으로 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI로 만든 반지 사진을 목걸이 주문에 써도 되나요?",
    "paragraphs": [
      "네. 사진 속 품목이 반지여도 “이 모양을 목걸이의 펜던트로 착용하고 싶다”고 설명할 수 있습니다. 이미 가진 반지의 금속을 재사용하는 리폼과는 출발점이 다릅니다. 여기서는 실물이 없는 AI 이미지를 참고해 새 펜던트를 만드는 상담을 다룹니다.",
      "GIA의 2024년 주얼리 AI 연구에는 브로치 사진을 바탕으로 목걸이 디자인 변형을 생성한 예시가 나옵니다. 이는 한 품목의 특징을 다른 품목의 이미지로 발전시킨 사례이며, 그 이미지가 그대로 제작됐다는 뜻은 아닙니다. 좋아하는 모양을 찾는 단계와 실제 목걸이의 구조를 정하는 단계를 구분해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반지 디자인에서 어떤 부분을 펜던트에 남길까요?",
    "paragraphs": [
      "먼저 손가락을 감싸는 밴드를 제외하고도 마음에 드는 모양이 남는지 보세요. 중앙의 둥근 장식이 좋은지, 양옆에서 감싸는 곡선이 좋은지, 반지 전체의 넓은 윤곽이 좋은지에 따라 펜던트의 출발점이 달라집니다.",
      "예를 들어 중앙 장식을 두 곡선이 감싸는 AI 반지라면 두 방향을 비교할 수 있습니다. 중앙 장식만 살린 간결한 펜던트와, 양옆 곡선까지 둘레 장식으로 옮긴 펜던트입니다. 후자를 원한다면 “밴드는 없어져도 두 곡선이 감싸는 인상은 남겨 주세요”라고 적어 보세요. 두 안 모두 실제로 가능한지는 별도로 확인합니다.",
      "주얼리 재료 판매사 Fire Mountain Gems and Beads의 디자인 교육 자료는 크기와 배치가 강조점을 만들고, 비례는 부분과 전체의 관계를 살피는 개념이라고 설명합니다. 이를 참고해 “같은 반지처럼 보이게”라는 요청을 중앙 포인트·주변 곡선·바깥 윤곽으로 나누어 전달하면 원하는 특징이 더 분명해집니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반지 밴드가 없어지면 무엇을 다시 정해야 하나요?",
    "paragraphs": [
      "펜던트에는 체인과 만나는 부분이 필요합니다. 반지에서는 밴드 양쪽으로 이어지던 장식을 어떻게 연결할지, 어느 부분을 위로 두고 걸지 질문해 보세요. 같은 곡선도 세로로 세운 안과 가로로 놓은 안에서 보이는 인상이 다릅니다. 이미지의 방향만 돌렸다고 연결 구조까지 정해지는 것은 아닙니다.",
      "고리를 장식 위에 보이게 둘지, 앞에서 덜 보이도록 연결하고 싶은지도 선호로 전달할 수 있습니다. 가능한 방식은 장식의 두께와 뒷면, 체인 구성에 따라 검토해야 합니다. GIA 연구의 요약도 이미지를 실제 주얼리로 옮길 때 소재·치수·제조 방식과 몸에 닿는 관계를 고려해야 한다고 설명합니다. 아래 표는 품목을 바꿀 때 사용할 상담 질문입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "반지 이미지에서 볼 부분",
        "펜던트로 바꿀 때 정할 것",
        "상담 질문 예시"
      ],
      "rows": [
        [
          "손가락을 감싸는 밴드",
          "없앨 부분과 장식으로 남길 부분",
          "밴드로 이어지던 곡선을 둘레 장식으로 살릴 수 있나요?"
        ],
        [
          "중앙 장식과 양옆 무늬",
          "목걸이에서도 강조할 윤곽",
          "중앙만 남긴 안과 곡선을 포함한 안을 비교할 수 있나요?"
        ],
        [
          "사진에서 보이는 위아래",
          "체인 연결 위치와 착용 방향",
          "세로로 걸었을 때 위쪽을 어디로 잡는 구조인가요?"
        ],
        [
          "반지 옆면의 높이",
          "펜던트 뒷면과 돌출 범위",
          "몸에 닿는 뒷면은 어떤 모양으로 달라지나요?"
        ],
        [
          "반지의 확대된 정면",
          "장식 본체와 고리를 포함한 전체 치수",
          "고리까지 포함한 세로 길이와 본체 크기를 나눠 알려 주세요."
        ]
      ]
    }
  },
  {
    "title": "바뀐 펜던트 후보는 어떻게 비교하면 좋을까요?",
    "paragraphs": [
      "원본 반지 이미지 옆에 펜던트 후보를 놓고, 처음 표시한 특징이 남아 있는지 확인하세요. 고리가 추가되면서 위쪽 곡선이 가려지는지, 중앙 장식을 줄이면서 주변 곡선만 눈에 들어오는지처럼 바뀐 부분을 짚어 봅니다. 원본과 완전히 같은 외형보다 어떤 특징을 우선할지 정하는 과정입니다.",
      "후보끼리는 장식 본체의 가로·세로와 고리를 포함한 전체 크기를 함께 비교하세요. 화면 확대 비율이 다르면 더 크게 보이는 그림이 실제로도 큰 펜던트인지 알 수 없습니다. 치수를 맞춘 정면 자료와 옆면·뒷면 설명을 어떤 방식으로 확인할 수 있는지 상담해 보세요.",
      "AI로 만든 착용 이미지에서 펜던트가 반듯하게 보이더라도 실제 착용 중 같은 방향을 유지한다는 보장은 아닙니다. 체인에 연결됐을 때 놓이는 방향과 움직임, 뒷면이 닿는 부분을 확인할 수 있는 범위를 물어보세요. 기존 체인에 달 계획이라면 체인 끝과 연결 부위 사진도 보내고, 자세한 호환 항목은 아래 체인 가이드를 참고하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 AI 디자인 펜던트를 어떻게 문의하나요?",
    "paragraphs": [
      "AI 반지 원본과 함께 남기고 싶은 부분을 표시해 보내 주세요. 목걸이로 바꾼 이미지가 없어도 괜찮습니다. “세로로 길게 걸고 싶다”, “중앙 장식보다 감싸는 곡선이 중요하다”처럼 품목을 바꾸는 이유와 우선순위를 적으면 상담 방향을 잡기 좋습니다.",
      "문의 예시: “제가 AI로 만든 반지 이미지입니다. 중앙 장식과 양옆의 두 곡선을 살려 세로형 펜던트로 새로 맞추고 싶어요. 반지 밴드는 필요 없고, 고리가 앞에서 많이 보이지 않는 구성이 가능한지 궁금합니다. 체인까지 포함해 예산 ○○원 안팎으로 생각하고 있습니다. 가능한 형태와 견적, ○월 ○일까지 수령할 수 있는지 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 이미지를 보내 주세요. 펜던트 단독인지 체인 포함인지 확인하고, 원하는 모티브를 목걸이로 구현할 수 있는 범위를 상담합니다. 디자인 방향을 정한 뒤 실제 금속과 보석, 크기·연결 구조를 기준으로 견적과 일정을 확인하세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "AI 반지에서 목걸이로 바꾼 그림은 디자인 방향을 비교하는 자료입니다. 제작 도안이나 착용 검증을 대신하지 않으며, 제작 가능한 구조로 조정이 필요할 수 있습니다.",
  "이 글은 이미지 속 모티브로 새 펜던트를 만드는 상담을 다룹니다. 보유한 실물 반지의 금속이나 보석을 활용하려면 실물 상태와 재사용 가능 범위를 따로 확인해야 합니다."
]
const relatedLinks = [
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 이미지로 주문제작 상담 시작하기",
    "description": "생성 이미지와 실제 제작 사양을 구분하는 기본 안내입니다."
  },
  {
    "to": "/guide/ai-jewelry-custom-budget-guide",
    "label": "AI 디자인 주문제작 예산 맞추기",
    "description": "살릴 특징을 정한 뒤 예산에 맞춰 비교할 항목을 살펴보세요."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "사용할 체인과 펜던트 호환 확인",
    "description": "기존 체인에 새 펜던트를 달고 싶다면 연결부를 함께 확인하세요."
  },
  {
    "to": "/custom",
    "label": "AI 반지 모티브로 펜던트 제작 상담",
    "description": "마음에 드는 반지 이미지와 목걸이에 남길 특징을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 살펴보기",
    "description": "장식과 전체 비율을 설명할 참고 디자인을 찾아보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 반지 디자인, 목걸이로 바꿔 맞추기'
const gmArticleLead = 'AI 반지 디자인을 펜던트로 주문제작하고 싶다면, 반지에서 좋아하는 부분을 골라 목걸이의 장식으로 바꾸는 방향을 상담해 보세요. 중앙 장식만 남길지, 밴드로 이어지는 곡선도 살릴지 정한 다음 체인 연결 위치와 착용 방향을 검토합니다. 반지 사진에서 밴드를 지우는 것만으로 펜던트 설계가 끝나는 것은 아닙니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 반지 모티브 펜던트 전환'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 반지 디자인을 펜던트로 제작 상담'
const gmHeroAlt = '두 곡선이 중앙 장식을 감싸는 모티브를 공유한 금색 반지와 펜던트 목걸이의 AI 디자인 예시'
const gmHeroCaption = '반지의 모티브를 펜던트에 옮기는 방향을 보여 주는 AI 생성 이미지입니다. 실제 판매 제품·제작 사례나 실물 반지 리폼 전후 사진이 아니며, 제작 가능 여부는 별도로 확인해야 합니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 2024년 연구와 Fire Mountain Gems and Beads의 디자인 교육 자료를 참고했습니다. 반지에서 펜던트로 바꾸는 비교표와 문의 문장은 상담을 돕기 위한 편집 예시이며, 특정 구조의 제작 가능성을 보증하는 자료는 아닙니다.'
const gmSources = [
  {
    "label": "GIA — 생성형 AI를 활용한 주얼리 디자인 연구",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "AI 이미지의 품목 변형 예시와 실제 주얼리 설계 검토의 필요성을 참고했습니다."
  },
  {
    "label": "Fire Mountain Gems and Beads — 강조점과 비례의 디자인 원칙",
    "url": "https://www.firemountaingems.com/learn/categories/essential-resources/design-principles/BC4L-article.html",
    "note": "주얼리에서 강조점과 부분·전체의 비율을 살피는 원칙을 참고했습니다."
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
