<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/hidden-halo-ring-side-profile'
const pageTitle = '히든 헤일로 반지, 옆면에서 확인할 3가지 | 귀족'
const pageDescription = '히든 헤일로 반지는 작은 다이아가 중심석 아래에 놓입니다. 일반 헤일로와의 차이, 옆면의 보석 줄과 세팅 높이, 웨딩밴드가 닿는 위치를 보고 주문하는 방법입니다.'
const ogImage = `${siteConfig.url}/Image/guide/hidden-halo-ring-side-profile-hero.webp`
const publishedAt = '2026-11-26'
const updatedAt = ''
const faqItems = [
  {
    "question": "히든 헤일로도 위에서 다이아가 더 커 보이나요?",
    "answer": "중심석 바깥에 보이는 테두리가 목적이라면 일반 헤일로의 정면 사진을 보세요. 히든 헤일로는 중심석 아래에 장식이 있어 옆에서 보이는 반짝임이 주된 차이입니다."
  },
  {
    "question": "파베 밴드와 히든 헤일로는 같은 디자인인가요?",
    "answer": "두 표현은 서로 다른 부분을 가리킬 수 있습니다. 작은 보석이 밴드에 있는지, 중심석 아래 받침에 있는지 보세요. 한 반지에 두 장식을 함께 넣은 디자인도 있습니다."
  },
  {
    "question": "기존 웨딩밴드와 틈 없이 겹쳐 낄 수 있나요?",
    "answer": "받침 아래 공간과 웨딩밴드의 두께·단면에 따라 다릅니다. 함께 낄 반지의 옆면 사진이나 실물을 준비해 접촉하는 위치를 확인하세요."
  },
  {
    "question": "보유 다이아로 히든 헤일로 제작을 문의할 수 있나요?",
    "answer": "가능 여부를 상담할 수 있습니다. 중심석의 치수와 옆면 사진, 원하는 장식 위치를 보내 주세요. 돌의 상태와 깊이에 맞춰 가능한 받침 구조를 확인합니다."
  },
  {
    "question": "예식 전에 받으려면 언제 상담해야 하나요?",
    "answer": "귀족 주문제작은 최소 3주를 기준으로 합니다. 촬영일과 예식일 중 먼저 필요한 날짜를 알리고, 중심석 준비와 도안 확정을 반영한 수령 일정을 확인하세요."
  }
]
const quickAnswers = [
  "일반 헤일로는 위에서 볼 때 중심석 바깥에 작은 보석 테두리가 보입니다. 히든 헤일로는 그 줄이 중심석 아래에 있어 옆에서 더 잘 보입니다.",
  "히든 헤일로라는 이름만으로 완성 높이나 웨딩밴드와의 간격은 알 수 없습니다. 반지를 손에 낀 상태의 측면과 두 반지를 나란히 댄 모습을 요청하세요.",
  "견적에서는 중심 다이아 한 알, 중심석 아래 작은 다이아, 밴드 위 작은 다이아를 구분하세요. 같은 중심석으로 히든 헤일로를 넣은 안과 생략한 안을 비교하면 선택하기 쉽습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "작은 다이아 줄은 어느 각도에서 보이나요?",
    "paragraphs": [
      "사진을 고를 때 중심석의 테두리를 눈으로 한 바퀴 따라가 보세요. 손등을 내려다보는 사진에서 테두리 바깥으로 작은 보석이 이어지면 일반 헤일로의 모습입니다. 위에서는 단정한 한 알 반지처럼 보이는데 옆으로 돌렸을 때 중심석 바로 아래에서 작은 보석이 나타난다면 히든 헤일로의 특징을 본 것입니다.",
      "대표 이미지에서는 반지 양옆의 금속 밴드가 매끈하고, 작은 보석은 중심석 받침에만 있습니다. 밴드에도 작은 보석이 줄지어 있는 사진을 골랐다면 두 곳 중 어디가 마음에 드는지 짚어 주세요. ‘위에서는 밴드가 매끈하고, 옆에서만 한 줄이 보이면 좋겠습니다’라고 하면 주문할 장식의 범위가 분명합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "옆면에서 세팅 높이는 어디부터 재나요?",
    "paragraphs": [
      "같은 타원형 중심석이라도 아래쪽 깊이와 받침 구조에 따라 손 위에서 솟는 높이가 달라집니다. 먼저 손가락에 닿는 안쪽 면에서 중심석 꼭대기까지의 높이를 물어보세요. 작은 보석 줄이 밴드 윗선보다 얼마나 위에 있는지는 별도의 치수입니다. 두 값을 하나의 ‘높이’로 들으면 어떤 부분이 높아지는지 알기 어렵습니다.",
      "정면 확대 사진만 있는 경우에는 반지를 똑바로 세운 옆면과 비스듬히 기울인 사진도 요청하세요. 옆면은 작은 보석 줄의 위치를 확인하기 좋고, 비스듬한 사진은 손을 움직일 때 장식이 얼마나 보일지 가늠하기 좋습니다. 보유 다이아로 제작한다면 감정서에 적힌 가로·세로·깊이를 보내 실제 돌에 가능한 높이를 상담하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "요청할 사진",
        "눈여겨볼 곳",
        "결정할 내용"
      ],
      "rows": [
        [
          "손등에서 내려다본 정면",
          "중심석 둘레와 밴드 윗면",
          "위에서도 작은 보석을 보이게 할지"
        ],
        [
          "눈높이를 낮춘 측면",
          "중심석 밑의 보석 줄과 받침 높이",
          "측면 장식의 위치와 노출 정도"
        ],
        [
          "웨딩밴드를 곁들인 측면",
          "두 반지의 윗모서리와 받침 사이",
          "맞닿게 할지 간격을 둘지"
        ]
      ]
    }
  },
  {
    "title": "함께 낄 웨딩밴드가 보석 줄에 닿을까요?",
    "paragraphs": [
      "직선형 웨딩밴드를 곁들일 예정이라면 두 반지를 같은 손가락에 낀 옆모습을 보세요. 웨딩밴드 윗모서리가 중심석 받침 아래로 들어가는지, 작은 보석을 잡은 금속에 먼저 닿아 두 반지 사이가 벌어지는지가 보입니다. 히든 헤일로 반지끼리도 이 부분의 모양은 다를 수 있습니다.",
      "예를 들어 웨딩밴드의 폭이 3mm라는 정보는 손가락을 얼마나 넓게 덮는지 알려 줍니다. 받침 아래로 들어갈지는 손가락 표면에서 밴드 윗면까지의 두께와 모서리 모양도 알아야 합니다. 매장에는 함께 낄 반지를 가져오고, 사진으로 상담할 때는 두 반지가 나란히 놓일 방향에서 웨딩밴드 단면을 찍어 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 중심석으로 견적을 비교하려면",
    "paragraphs": [
      "먼저 중심석의 종류와 크기를 정한 뒤 옆면 장식만 바꿔 보세요. 예를 들어 같은 0.50ct 다이아와 같은 14K 밴드에 작은 보석 줄을 넣었을 때와 생략했을 때의 두 견적을 요청할 수 있습니다. 한쪽 견적에 밴드 위 보석까지 포함돼 있다면 그 부분을 따로 적어 달라고 하세요.",
      "‘다이아 총중량’에는 한 반지에 들어간 여러 알의 무게가 합산될 수 있습니다. 원하는 것이 중심석 한 알의 크기라면 그 중량과 정면 치수를 확인하고, 측면 장식은 작은 보석의 종류와 세팅 범위로 비교하면 됩니다. 옆면 사진 한 장에 보이는 보석 개수만으로 반대편까지 몇 알이 들어갈지 단정하기는 어렵습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 보낼 히든 헤일로 제작 문의 예시",
    "paragraphs": [
      "“위에서 봤을 때는 타원형 다이아 한 알이 보이고, 기울였을 때만 중심석 아래 작은 보석이 보이는 반지를 원합니다. 밴드는 민자로 부탁드립니다. 첨부한 웨딩밴드와 함께 끼고 싶은데 두 반지가 닿는 위치와 가능한 세팅 높이를 확인할 수 있을까요?”",
      "여기에 보유석 유무, 희망 소재와 예산을 덧붙이세요. 참고 이미지가 AI 시안이라면 꼭 살리고 싶은 보석 줄에 표시해 보내면 됩니다. 귀족 주문제작은 최소 3주이며, 실제 중심석과 받침 구조를 확인한 뒤 제작 가능 범위와 견적, 수령 일정을 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "작은 보석이 보이는 각도는 중심석 크기와 받침의 폭에 따라 달라집니다. 원하는 옆모습과 피하고 싶은 정면 테두리를 사진에 따로 표시하세요.",
  "두 반지를 겹칠 때 단단한 보석이나 세팅 발이 옆 반지를 계속 누르는지 확인하세요. 간격을 힘으로 좁히지 말고 착용 상태에서 닿는 자리를 상담하세요."
]
const relatedLinks = [
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "프롱과 파베 등 세팅 방식 보기",
    "description": "중심석을 잡는 구조와 작은 보석 장식의 차이를 확인하세요."
  },
  {
    "to": "/guide/wedding-band-guard-ring-guide",
    "label": "웨딩밴드와 가드링의 높이 비교",
    "description": "두 반지를 함께 낄 때 모서리와 간격을 살펴보세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "보유석과 참고 사진으로 제작 가능 범위를 상담하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '히든 헤일로 반지, 옆면에서 확인할 3가지'
const gmArticleLead = '히든 헤일로는 중심석 아래를 작은 보석이 둘러싸는 반지 디자인입니다. 위에서 보면 중심석 한 알이 먼저 보이고, 손을 기울이면 그 아래 작은 보석 줄이 드러납니다. 주문 전에는 옆면 사진에서 작은 보석이 놓인 자리, 손가락 위로 솟는 높이, 함께 낄 웨딩밴드가 닿는 곳을 확인하세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '히든 헤일로 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '히든 헤일로 반지 제작 상담'
const gmHeroAlt = '금빛 반지의 옆면에서 타원형 중심석 아래 두 발 사이로 작은 보석 줄이 보이는 히든 헤일로 디자인 예시'
const gmHeroCaption = 'AI로 만든 측면 디자인 예시입니다. 중심석을 잡은 발 사이, 금속 가로대에 작은 보석이 한 줄로 놓여 있습니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '헤일로의 위치 비교는 Blue Nile, 작은 다이아와 중심석 중량 구분은 GIA 자료를 참고했습니다. 본문의 치수와 중량은 상담을 위한 예시입니다.'
const gmSources = [
  {
    "label": "Blue Nile — 히든 헤일로와 일반 헤일로 비교",
    "url": "https://www.bluenile.com/blog/fashion/hidden-halo-engagement-ring-guide",
    "note": "히든 헤일로는 중심석 아래 작은 보석 줄이 옆에서 보이며, 일반 헤일로는 중심석 둘레를 위에서 볼 수 있습니다."
  },
  {
    "label": "GIA — 작은 다이아를 사용한 주얼리 디자인",
    "url": "https://www.gia.edu/design-with-melee",
    "note": "작은 다이아를 중심석 둘레나 밴드에 배치할 수 있으며 중심석과 장식석 중량을 나누어 설명합니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "참고 사진과 소재로 제작 범위와 견적을 상담하며 제작은 최소 3주 기준입니다."
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
