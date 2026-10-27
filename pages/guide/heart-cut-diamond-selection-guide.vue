<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/heart-cut-diamond-selection-guide'
const pageTitle = '하트컷 다이아, 모양과 세팅 고르는 법 | 귀족'
const pageDescription = '하트컷 다이아는 한 알의 외곽이 하트인 보석입니다. 윗부분의 골과 좌우 곡선, 아래 끝을 비교하고 세팅 후에도 하트 윤곽이 보이는지 확인하는 방법을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/heart-cut-diamond-selection-guide-hero-1d38e9ae.webp`
const publishedAt = '2026-10-27'
const updatedAt = ''
const faqItems = [
  {
    "question": "하트 모양 안에 다이아가 들어 있으면 모두 하트컷인가요?",
    "answer": "아닙니다. 금속 하트 안에 작은 보석을 여러 개 넣거나 다른 모양의 보석을 배치한 제품도 있습니다. 하트컷 한 알을 원하는 경우 중앙 보석 자체의 외곽이 하트인지 확인하세요."
  },
  {
    "question": "하트컷 다이아는 넓은 모양이 길쭉한 모양보다 좋은가요?",
    "answer": "넓거나 길쭉한 인상은 취향으로 비교할 수 있습니다. 그와 별개로 양쪽 둥근 부분과 옆선이 어울리는지 살펴보고, 정면 사진과 실제 치수를 같은 조건에서 확인하세요."
  },
  {
    "question": "하트컷 다이아를 고를 때 윗부분의 골은 왜 보나요?",
    "answer": "윗골은 하트 형태를 알아보게 하는 부분 중 하나입니다. 실제 보석에서 어떻게 파여 있는지와 세팅 후 금속 발이나 목걸이 고리에 얼마나 가려지는지를 나누어 확인하면 좋습니다."
  },
  {
    "question": "하트컷 반지나 목걸이는 끝부분 세팅을 확인해야 하나요?",
    "answer": "네. 하트의 아래쪽 뾰족한 끝은 보호 구조를 함께 고려해야 합니다. 윤곽을 살리면서 끝을 어떻게 감싸는지 실제 보석과 완성 디자인을 기준으로 상담하세요."
  }
]
const quickAnswers = [
  "하트 모양 금속 안에 작은 보석을 여러 개 넣은 제품과 하트컷 한 알은 다른 구성입니다. 상품명만 보지 말고 중앙 보석 자체가 어떤 모양인지 확인하세요.",
  "보석의 윗골에서 아래 끝까지 중심선을 떠올리고 양쪽 둥근 부분과 옆선을 비교해 보세요. 넓거나 길쭉한 취향과 좌우 균형을 따로 살펴보면 좋습니다.",
  "확대 사진에서 예쁜 하트라도 세팅 후에는 금속 발이나 고리가 일부 윤곽을 가릴 수 있습니다. 실제 치수와 완성 상태의 정면·측면을 함께 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "하트컷 다이아와 하트 모양 주얼리는 어떻게 다른가요?",
    "paragraphs": [
      "하트컷은 보석 자체의 외곽이 하트라는 뜻으로 쓰입니다. GIA는 하트형 다이아몬드를 윗부분의 파인 골, 좌우 둥근 부분, 아래쪽의 뾰족한 끝을 가진 형태로 설명합니다. 금속을 하트로 만들거나 작은 보석을 하트 모양으로 모아 놓은 디자인과 구분해서 보세요.",
      "예를 들어 사진에서 하트 한가운데가 여러 작은 보석으로 나뉘어 있다면, 하트컷 한 알을 사용한 제품인지 먼저 물어보는 편이 좋습니다. 어느 구성이 더 좋다는 뜻은 아닙니다. 한 알의 윤곽을 원한 것인지, 하트라는 장식 모양을 원한 것인지에 따라 비교할 후보가 달라집니다.",
      "하트컷이라는 말은 천연·랩그로운 여부나 품질을 대신하지 않습니다. 보석의 형태를 고른 뒤 실제 후보의 종류와 안내 자료를 따로 확인하세요. 다른 재료의 하트형 보석을 함께 비교한다면 보석명도 구분해 적는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "하트컷의 좌우 균형은 어디부터 보면 되나요?",
    "paragraphs": [
      "정면에서 윗골과 아래 끝을 잇는 중심선을 떠올려 보세요. GIA는 이 중심선을 기준으로 하트 양쪽의 크기와 모양을 비교하는 방법을 안내합니다. 먼저 좌우 둥근 부분의 높이와 부풀어 오른 정도를 보고, 양옆 곡선이 아래 끝으로 이어지는 모습을 살펴보면 됩니다.",
      "한쪽으로 기울여 찍은 사진은 가까운 쪽이 더 커 보일 수 있습니다. 비대칭처럼 느껴지면 사진만으로 결론을 내리기보다 정면에서 본 자료나 실물을 확인해 보세요. 아래 표는 후보를 보며 질문을 정리하는 방법이며, 감정 등급을 매기는 기준표는 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "살펴볼 곳",
        "후보에서 비교할 모습",
        "상담할 때 남길 말"
      ],
      "rows": [
        [
          "위쪽 가운데 골",
          "두 둥근 부분 사이의 파임이 어떻게 보이는지",
          "윗골이 가려지지 않고 하트 모양이 분명했으면 해요."
        ],
        [
          "좌우 둥근 부분",
          "양쪽의 크기·높이·곡선이 어울리는지",
          "왼쪽과 오른쪽이 비슷한 인상인지 정면으로 보고 싶어요."
        ],
        [
          "양옆에서 끝으로 이어지는 선",
          "곡선이 아래쪽으로 이어지는 윤곽",
          "아래로 급하게 좁아지는 것보다 부드러운 곡선을 선호해요."
        ],
        [
          "아래쪽 끝",
          "중앙으로 모이는 방향과 완성 후 노출",
          "이 끝을 어떤 금속 구조로 보호하는지 궁금해요."
        ],
        [
          "전체 가로·세로 인상",
          "넓고 도톰한 형태와 길쭉한 형태",
          "좌우 균형은 유지하면서 조금 더 넓은 하트를 보고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "도톰한 하트와 길쭉한 하트 중 무엇을 고르나요?",
    "paragraphs": [
      "원하는 윤곽의 취향과 좌우 균형을 나누어 생각해 보세요. 가로로 넉넉한 하트가 좋다고 해서 한쪽이 더 부풀어 있는 모습까지 원하는 것은 아닙니다. “넓은 하트가 좋고, 양쪽 둥근 부분은 비슷했으면 한다”처럼 두 조건을 함께 말하면 비교 방향이 분명해집니다.",
      "후보 A와 B를 나란히 볼 때는 촬영 각도와 확대 정도도 맞춰 보세요. 상세 사진을 크게 확대하면 작은 차이가 두드러지지만, 실제 착용 거리에서는 느낌이 달라질 수 있습니다. 가까운 정면 사진과 반지·목걸이 전체 모습이 함께 있으면 좋아하는 윤곽이 완성품에서도 눈에 들어오는지 비교하기 좋습니다.",
      "크기는 캐럿 표기만으로 정하지 말고 실제 가로·세로 치수를 함께 확인하세요. “작은 하트”라는 말도 사람마다 떠올리는 크기가 다릅니다. 원하는 착용 위치와 참고 제품 크기를 알려 주고, 실제 후보에서 모양이 어떻게 보이는지 확인하는 편이 좋습니다. 이 글에서는 특정 캐럿이나 가로·세로 비율을 모두에게 맞는 기준으로 정하지 않습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "하트 윤곽을 살리면서 끝을 보호하려면 무엇을 보나요?",
    "paragraphs": [
      "윗골이 보이는지와 아래 끝을 보호하는지를 함께 살펴보세요. GIA는 하트형 보석의 끝부분이 손상에 취약할 수 있어 이를 감싸는 세팅을 고려하도록 안내합니다. 모양을 더 드러내고 싶더라도 금속 발을 줄이거나 빼기 전에 필요한 고정 구조를 먼저 상담하세요.",
      "GIA의 다이아몬드 형태 안내는 윗골보다 양쪽 둥근 부분에 발을 배치하면 하트 형태를 드러내는 데 도움이 된다고 설명합니다. 다만 발의 위치와 크기는 실제 보석에 맞춰 검토해야 합니다. 사진에서 보석 자체의 파인 골이 보이는지, 금속이 만든 선을 하트 윤곽으로 보고 있는지 구분해 보세요.",
      "목걸이라면 체인과 연결되는 고리가 윗골 앞을 얼마나 가리는지도 확인할 수 있습니다. 반지라면 밴드와 중심 보석을 받치는 부분이 정면 윤곽에 어떻게 더해지는지 살펴보세요. 보석만 고를 때 마음에 들었던 모양이 세팅 후에도 유지되는지 확인하는 과정입니다. 특정 발 개수나 세팅 이름만으로 보호 성능과 완성 모습을 보장할 수는 없습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 하트컷 다이아 상담은 무엇부터 보내면 되나요?",
    "paragraphs": [
      "하트컷 한 알을 원하는지, 여러 보석을 모은 하트 장식을 원하는지 먼저 알려 주세요. 하트컷을 원한다면 마음에 드는 윤곽 사진, 만들 품목, 넓거나 길쭉한 형태 중 선호하는 쪽을 보내시면 됩니다. 실제 보석 후보를 아직 고르지 않았다면 이미지가 디자인 참고용이라고 적어 주세요.",
      "문의 예시: “하트컷 다이아 한 알로 된 목걸이를 생각하고 있습니다. 길쭉한 형태보다 윗부분이 도톰한 하트가 좋고, 고리 때문에 가운데 골이 가려지지 않았으면 합니다. 아래 끝을 보호하는 세팅도 함께 보고 싶어요. 예산은 ○○원 안팎이며 천연·랩그로운 중 ○○를 우선으로 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 이미지와 희망일을 보내 주세요. 가능한 보석 후보와 디자인을 확인한 뒤, 선택한 보석의 사양과 금속·세팅을 기준으로 견적 및 일정을 상담하세요. 반지로 원한다면 목걸이 대신 착용할 손가락과 알고 있는 호수를 함께 알려 주시면 됩니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "본문의 윤곽 비교는 디자인 취향과 상담 질문을 정리하는 방법입니다. 사진만으로 보석의 진위나 품질 등급을 판정할 수는 없습니다.",
  "세팅 후 보이는 하트 윤곽과 끝부분 보호 구조를 함께 확인하세요. 원하는 보석의 수급과 제작 가능 여부는 실제 사양을 보고 상담해야 합니다."
]
const relatedLinks = [
  {
    "to": "/guide/diamond-cut-shapes-guide",
    "label": "다른 다이아몬드 모양과 비교하기",
    "description": "하트 외에 라운드·오벌·페어 등 다른 윤곽도 살펴보세요."
  },
  {
    "to": "/guide/lab-grown-diamond-natural-difference",
    "label": "천연·랩그로운 다이아 구분",
    "description": "보석의 모양과 생성 방식을 별도로 확인하세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "보석 고정 방식 알아보기",
    "description": "선택한 하트형 보석에 맞는 세팅을 상담하세요."
  },
  {
    "to": "/guide/jongno-diamond-pendant-design-order",
    "label": "다이아 목걸이의 전체 디자인 선택",
    "description": "보석을 고른 다음 펜던트 구성을 정리해 보세요."
  },
  {
    "to": "/custom",
    "label": "하트컷 반지·목걸이 상담",
    "description": "좋아하는 윤곽과 만들 품목을 함께 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "보석과 금속이 어우러지는 모습을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '하트컷 다이아, 모양과 세팅 고르는 법'
const gmArticleLead = '하트컷 다이아는 다이아몬드 한 알 자체가 하트 윤곽을 가진 보석입니다. 고를 때는 윗부분의 골, 양쪽 둥근 부분, 아래로 모이는 끝을 차례로 보세요. 넓고 도톰한 하트와 길쭉한 하트 중 취향을 정하는 일, 좌우 균형을 확인하는 일은 구분할 수 있습니다. 반지나 목걸이로 만들 때는 보석을 고정한 뒤에도 그 윤곽이 잘 보이는지와 뾰족한 끝을 어떻게 보호하는지 함께 확인하세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '하트컷 다이아'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '하트컷 다이아 반지·목걸이 선택 상담'
const gmHeroAlt = '하트형 투명 보석 한 알을 은빛 금속으로 고정한 목걸이 펜던트의 AI 디자인 예시'
const gmHeroCaption = '하트 윤곽과 보석을 고정하는 부분을 설명하기 위한 AI 생성 이미지입니다. 실제 다이아몬드 샘플·판매 제품·완성된 주문제작 사례가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '하트형 다이아몬드의 윤곽과 세팅의 기본 원칙은 GIA 자료를 참고했습니다. 비교표와 후보 사진 확인 순서, 문의 문장은 구매 상담을 돕기 위해 작성한 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 하트형 다이아의 윤곽과 끝부분 보호",
    "url": "https://4cs.gia.edu/en-us/blog/diamond-heart-shaped-engagement-ring/",
    "note": "하트의 중심선을 기준으로 좌우를 비교하고 뾰족한 끝을 보호하는 설명을 참고했습니다."
  },
  {
    "label": "GIA — 하트형 보석의 구성과 세팅",
    "url": "https://4cs.gia.edu/en-us/blog/guide-diamond-shapes-engagement-rings/",
    "note": "하트의 윗골·둥근 부분·끝과, 윤곽을 살리는 세팅 설명을 참고했습니다."
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
