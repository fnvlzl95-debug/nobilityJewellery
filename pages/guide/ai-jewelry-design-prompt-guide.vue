<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-jewelry-design-prompt-guide'
const pageTitle = 'AI 주얼리 디자인, 주문제작 프롬프트 예시 | 귀족'
const pageDescription = 'AI 주얼리 디자인을 시작할 때 품목·형태·색·보석 배치를 어떻게 적을지 안내합니다. 반지와 목걸이 프롬프트 예시를 내 취향에 맞게 바꾸고, 생성한 아이디어로 종로 귀족에 주문제작을 상담해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/ai-jewelry-design-prompt-guide-hero-34467502.webp`
const publishedAt = '2026-10-22'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 주얼리 디자인 프롬프트를 길게 써야 하나요?",
    "answer": "길이보다 원하는 특징이 분명한지가 중요합니다. 품목과 외곽 모양, 보석 유무부터 적고 필요할 때 표면이나 구도 설명을 더해 보세요. 서로 반대되는 요청이 섞이지 않도록 확인하세요."
  },
  {
    "question": "“고급스러운 반지”라고만 입력해도 되나요?",
    "answer": "아이디어를 시작하는 말로 쓸 수 있지만, 마음에 드는 결과를 비교하려면 형태를 덧붙이는 편이 좋습니다. 예를 들어 단순한 외곽, 중앙 장식 하나, 매끄러운 금속 면처럼 자신이 원하는 특징을 적어 보세요."
  },
  {
    "question": "보석 없는 디자인을 원했는데 AI가 보석을 넣으면 어떻게 하나요?",
    "answer": "추가된 보석이 원하는 요소인지 먼저 확인하세요. 필요 없다면 보석 없는 금속 디자인을 원한다고 다시 적고, 생성 결과에서도 해당 부분이 바뀌었는지 확인하면 됩니다. 입력했다고 항상 정확히 반영되는 것은 아닙니다."
  },
  {
    "question": "AI로 마음에 드는 이미지를 못 만들어도 주문제작 상담이 되나요?",
    "answer": "원하는 품목과 모양을 적은 문장으로 디자인 방향을 상담할 수 있습니다. 생성한 이미지 중 일부만 마음에 든다면 좋아하는 부분과 바꾸고 싶은 부분을 함께 설명해 주세요."
  }
]
const quickAnswers = [
  "처음에는 한 품목의 외곽 모양과 중심 장식부터 정하세요. 배경·조명에 대한 요청은 제품 디자인 설명 뒤에 따로 적습니다.",
  "아래 반지·목걸이 입력 예시는 취향을 정리하는 출발점입니다. 원하는 부분을 바꿔 써 보고, 이미지가 요청대로 나왔는지도 확인하세요.",
  "마음에 드는 이미지가 나오면 주문 상담의 참고 자료로 활용하세요. 이미지를 완성하지 못했더라도 원하는 형태를 적은 문장으로 상담을 시작할 수 있습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI 주얼리 디자인은 어떤 말부터 입력하면 좋나요?",
    "paragraphs": [
      "먼저 “무엇을 만들지”와 “어떤 모양을 원하는지”를 적으세요. 반지인지 펜던트인지 정한 다음, 둥근 곡선·각진 면·물방울 윤곽처럼 눈에 보일 특징을 덧붙입니다. “단정하게”를 원한다면 장식을 하나만 둘지, 좌우가 같은 모습일지처럼 자신이 생각하는 단정함을 풀어 쓰는 방법입니다.",
      "GIA의 주얼리 디자인 교육은 형태·질감·균형·여백·색을 기본 디자인 개념으로 다룹니다. GIA의 2024년 AI 디자인 연구도 글로 설명한 아이디어를 시각적으로 탐색하는 활용을 소개합니다. 아래 표와 입력 문장은 이러한 디자인 요소를 주문제작 아이디어에 적용해 볼 수 있도록 정리한 예시입니다.",
      "모든 항목을 한꺼번에 결정할 필요는 없습니다. 보석을 넣을지 아직 모르겠다면 보석 없는 안부터 보거나, 중심 장식 유무를 나누어 살펴보세요. 실제 제작에 필요한 소재·치수·구조는 이후 상담에서 구체화합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "정리할 항목",
        "막연한 표현",
        "형태를 덧붙인 표현 예시"
      ],
      "rows": [
        [
          "품목과 수량",
          "액세서리를 만들어 줘",
          "한 개의 반지 디자인을 보여 줘"
        ],
        [
          "외곽 모양",
          "부드러운 느낌",
          "둥근 모서리와 완만한 물결 곡선"
        ],
        [
          "장식 배치",
          "깔끔하게",
          "중앙 장식 하나, 좌우 추가 장식 없이"
        ],
        [
          "금속 색과 표면",
          "따뜻한 분위기",
          "따뜻한 금빛 색감, 매끄러운 표면"
        ],
        [
          "보석 유무",
          "너무 화려하지 않게",
          "중앙에 원형 녹색 보석 하나만"
        ],
        [
          "제품을 보여 주는 방식",
          "멋진 화보처럼",
          "전체 윤곽이 보이는 단색 배경의 제품 이미지"
        ]
      ]
    }
  },
  {
    "title": "반지 디자인 프롬프트는 어떻게 써 볼 수 있나요?",
    "paragraphs": [
      "아직 중심 보석이나 세부 장식을 정하지 않았다면 밴드의 형태부터 탐색해 보세요. 아래 문장은 보석 없는 곡선 반지의 아이디어 예시입니다. 금속 색감이나 윗면의 모양을 바꾸어 자신이 선호하는 형태를 찾아볼 수 있습니다.",
      "입력 예시: “주문제작을 상담할 때 참고할 반지 디자인 이미지 한 장을 만들어 줘. 실버 톤의 보석 없는 반지 하나이며, 윗면은 완만한 물결 곡선이고 모서리는 둥근 느낌이면 좋겠어. 밴드는 끊김 없이 이어진 형태로 보여 줘. 전체 윤곽과 윗면이 함께 보이도록 살짝 비스듬한 구도로, 단순한 배경에 놓아 줘. 문자·로고·별도 장식·다른 반지는 넣지 말아 줘.”",
      "결과를 보고 곡선이 너무 복잡하다면 “윗면의 물결을 하나의 완만한 굴곡으로 단순하게”처럼 바꿀 부분을 짚어 보세요. 반대로 각진 느낌이 좋다면 “윗면은 평평한 면, 가장자리에는 부드러운 모서리”로 표현을 바꾸어 비교할 수 있습니다. 둥글다는 요청과 날카로운 모서리를 원한다는 요청이 섞이지 않는지도 살펴보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "목걸이와 펜던트 디자인은 어떤 문장으로 시작하나요?",
    "paragraphs": [
      "펜던트는 바깥 윤곽과 안쪽 장식을 나누어 적으면 좋습니다. 물방울 모양 자체가 마음에 드는지, 그 안에 놓인 보석이 포인트인지 먼저 생각해 보세요. 체인까지 함께 보고 싶다면 펜던트에 연결되는 부분이 보이도록 요청할 수 있습니다.",
      "입력 예시: “주문제작 아이디어를 살펴볼 펜던트 목걸이 이미지를 만들어 줘. 따뜻한 금빛의 부드러운 물방울 외곽 안에 원형 녹색 보석 하나가 중앙에 놓인 디자인이면 좋겠어. 보석 주위는 매끄러운 금속 면으로 남기고 작은 보석을 둘러 넣지 말아 줘. 펜던트는 하나이며 위쪽 체인 고리와 연결된 가는 체인이 보이게 해 줘. 전체 모양이 잘 보이는 정면 구도와 단순한 배경으로, 문자나 로고 없이 보여 줘.”",
      "여기서 외곽을 원형으로 바꾸거나 중앙 보석을 빼는 식으로 다른 인상을 탐색할 수 있습니다. “중앙에 보석 하나만”이라고 적었는데 주변에도 보석이 생겼다면, 그 결과를 그대로 받아들이기보다 필요한 장식과 제외할 장식을 다시 확인해 주세요. 입력 문장은 의도를 전달하는 자료이며 결과의 정확성을 보증하지 않습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "예쁜 이미지가 나왔을 때 디자인은 어떻게 비교하나요?",
    "paragraphs": [
      "제품의 모양과 촬영 연출을 나누어 보세요. 한 이미지는 어두운 배경에 강한 반짝임이 있고 다른 이미지는 밝은 배경에 부드러운 조명이 있다면, 어느 디자인이 좋은지보다 어느 사진이 화려한지에 끌릴 수 있습니다. 배경과 구도를 비슷하게 요청한 뒤 외곽·장식 위치·표면의 느낌을 비교해 보세요.",
      "형태를 보고 싶은 단계에서는 손이나 소품에 가려진 부분이 없는지도 확인합니다. 반지를 크게 보여 달라고 요청한 것은 이미지 안에서 크게 보이게 하는 표현일 수 있으므로, 그 결과만으로 실제 반지 폭이나 보석 치수를 정하지는 마세요. 실제 크기와 착용감은 주문 상담에서 확인할 항목입니다.",
      "마음에 드는 이유를 “고급스러워서”에서 한 걸음 더 구체화해 보세요. “바깥 윤곽이 단순해서”, “중앙 장식이 하나라서”, “넓은 금속 면이 보여서”처럼 적으면 다음 이미지 생성과 상담에서 같은 취향을 설명하기 쉬워집니다. 한 번에 여러 장식을 더하기보다 지금 비교하려는 요소를 정하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "프롬프트로 만든 아이디어를 종로 귀족에 어떻게 전달하나요?",
    "paragraphs": [
      "완벽한 입력 문장이나 완성도 높은 이미지를 준비해야만 상담할 수 있는 것은 아닙니다. 만들고 싶은 품목과 마음에 드는 모양을 적고, 이미지가 있다면 함께 보내 주세요. 이미지가 원하는 모습과 다르면 “전체 윤곽은 좋지만 옆 장식은 빼고 싶다”처럼 차이를 설명하면 됩니다.",
      "문의 예시: “AI로 물방울 펜던트 아이디어를 만들어 봤습니다. 단순한 외곽과 중앙 보석 하나가 마음에 들어요. 이미지에 보이는 색감을 참고해 실제 보석과 크기, 제작 가능한 구성을 상담받고 싶습니다.” 생성 이미지의 구조 확인과 상담 자료 정리는 아래 ‘AI 생성 사진으로 주문제작 상담하기’ 글에서 이어서 살펴보세요.",
      "아래 카카오톡 상담에 품목·원하는 형태를 적은 문장·선호 이미지·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 디자인 방향과 제작 가능한 범위를 상담합니다. 실제 소재와 사양에 따른 견적·일정도 함께 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "입력 예시는 특정 AI 도구의 공식 명령어나 제작 도면이 아닙니다. 사용하는 도구와 입력 조건에 따라 결과가 달라질 수 있습니다.",
  "생성된 이미지의 금속 색·보석 표현·비례를 실제 소재나 치수로 확정하지 마세요. 제작에 필요한 구조와 사양은 상담을 통해 확인합니다."
]
const relatedLinks = [
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 생성 사진으로 주문제작 상담하기",
    "description": "이미지가 준비됐다면 구조 확인과 상담 자료 정리를 이어서 살펴보세요."
  },
  {
    "to": "/custom",
    "label": "주얼리 아이디어 주문제작 상담",
    "description": "원하는 형태를 적은 문장과 참고 이미지로 문의하세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 디자인에서 취향 찾아보기",
    "description": "외곽 모양·금속 색·장식 배치를 비교해 보세요."
  },
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "반지 주문 사양 확인하기",
    "description": "디자인 방향을 정한 다음 확인할 소재와 사이즈 항목을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 주얼리 디자인, 주문제작 프롬프트 예시'
const gmArticleLead = 'AI 주얼리 디자인 프롬프트는 원하는 장신구의 모습을 설명하는 입력 문장입니다. 주문제작 아이디어를 만들고 싶다면 품목·전체 모양·금속 색감·보석 유무와 배치를 먼저 적어 보세요. “고급스럽게” 같은 분위기 표현에 구체적인 형태를 더하면, 결과에서 무엇이 마음에 들고 무엇을 바꿀지 비교하기 좋습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 주얼리 디자인'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 프롬프트로 만든 주얼리 디자인 주문 상담'
const gmHeroAlt = '물방울 모양 금빛 펜던트 중앙에 원형 녹색 보석 하나를 배치한 AI 디자인 예시'
const gmHeroCaption = '본문의 펜던트 입력 예시와 같은 디자인 방향을 설명하는 AI 생성 이미지입니다. 실제 판매 제품·제작 사례·확정 도면이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '디자인 요소는 GIA 교육 안내, AI를 활용한 아이디어 탐색은 GIA의 2024년 연구를 참고했습니다. 비교표와 반지·펜던트 입력 문장은 취향을 정리하도록 작성한 예시이며 특정 도구의 결과를 보증하지 않습니다.'
const gmSources = [
  {
    "label": "GIA — 생성형 AI와 주얼리 디자인 아이디어(2024)",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "텍스트로 디자인 아이디어를 시각적으로 탐색하는 활용을 참고했습니다."
  },
  {
    "label": "GIA — 주얼리 디자인의 기본 요소",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design-technology",
    "note": "형태·질감·균형·여백·색 등 디자인 기본 개념을 참고했습니다."
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
