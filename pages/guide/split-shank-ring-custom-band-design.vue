<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/split-shank-ring-custom-band-design'
const pageTitle = '스플릿 생크 반지 주문제작, 밴드 선택법 | 귀족'
const pageDescription = '스플릿 생크 반지는 보석 가까이에서 밴드가 갈라지는 디자인입니다. 주문제작 전에 나뉘는 위치, 두 갈래 사이 빈틈과 전체 폭, 금속선·보석 장식을 비교하는 방법을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/split-shank-ring-custom-band-design-hero-7dd3065e.webp`
const publishedAt = '2026-10-27'
const updatedAt = ''
const faqItems = [
  {
    "question": "스플릿 생크 반지는 반드시 보석 옆에서 두 갈래로만 나뉘나요?",
    "answer": "두 갈래로 나뉘는 형태가 대표적이며 여러 갈래로 나뉘는 변형도 있습니다. 이름만으로 형태를 정하지 말고, 원하는 갈래 수와 나뉘는 위치가 보이는 사진을 함께 보내 주세요."
  },
  {
    "question": "스플릿 생크 밴드의 폭은 어느 부분을 재는 건가요?",
    "answer": "두 갈래의 바깥쪽 전체 폭, 각 금속선의 너비, 손바닥 쪽 밴드 폭을 구분해야 합니다. 치수 안내를 받을 때 측정 위치를 사진이나 도안에 표시해 달라고 요청하면 비교하기 쉽습니다."
  },
  {
    "question": "스플릿 생크 반지에 작은 보석 장식을 꼭 넣어야 하나요?",
    "answer": "반드시 넣어야 하는 것은 아닙니다. 갈라진 밴드 형태와 보석 장식은 별도 선택 항목입니다. 민자 금속선을 원하는지, 두 갈래 모두 또는 일부 구간에 장식을 원하는지 알려 주세요."
  },
  {
    "question": "참고 사진의 보석은 바꾸고 갈라진 밴드만 살릴 수 있나요?",
    "answer": "상담할 수 있지만 중심 보석의 모양과 치수가 달라지면 밴드의 벌어짐과 연결 구조도 검토해야 합니다. 사진에서 유지하고 싶은 선을 표시하고, 새 보석에 맞게 조정할 수 있는 부분도 함께 알려 주세요."
  }
]
const quickAnswers = [
  "스플릿 생크는 밴드가 갈라지는 형태를 뜻합니다. 반지 두 개를 겹쳐 끼거나 반지 끝을 열어 두는 것과 같은 의미는 아니므로, 옆면과 손바닥 쪽 연결도 확인하세요.",
  "“두 줄을 얇게”라고만 말하지 말고 전체 벌어짐을 줄일지, 각 갈래를 가늘게 할지 구분하세요. 두 요청은 완성 모양과 구조에 서로 다르게 반영될 수 있습니다.",
  "중심석 모양과 크기를 같게 놓고 밴드의 분기 위치·간격·장식만 바꿔 비교해 보세요. 가능한 구조와 실제 치수는 제작 상담에서 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "스플릿 생크 반지는 두 줄 반지와 무엇이 다른가요?",
    "paragraphs": [
      "스플릿 생크는 손가락을 두르는 밴드가 중심 보석 쪽에서 갈라지는 구조를 가리킵니다. 주얼리 제작사 Joseph Jewelry의 용어 안내도 중심부에 가까워지며 밴드가 둘로 나뉘는 형태로 설명하고, 갈라지는 위치는 디자인과 중심석 세팅에 따라 달라진다고 안내합니다. 이 글에서는 두 갈래로 나뉘는 형태를 중심으로 살펴봅니다.",
      "사진에서 두 줄처럼 보인다고 모두 같은 구조는 아닙니다. 반지 두 개를 겹친 모습일 수도 있고, 넓은 밴드 표면에 홈만 낸 디자인일 수도 있습니다. 실제로 빈 공간이 있는지, 한 반지의 밴드가 갈라졌다가 이어지는지 확인해 보세요.",
      "갈라진 틈이 보인다고 사이즈를 늘리고 줄이는 기능이 있다는 뜻도 아닙니다. 이름만으로 프리사이즈라고 판단하지 말고, 착용할 손가락에 맞춰 호수를 확인하세요. 끝이 열린 오픈링과 사이즈 조절에 관한 자세한 내용은 아래 관련 가이드로 연결했습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "밴드가 갈라지는 위치와 빈틈은 어떻게 고르나요?",
    "paragraphs": [
      "보석 가까이에서 짧게 나뉘는 선을 좋아하는지, 손가락 옆쪽부터 길게 벌어지는 선을 좋아하는지 먼저 골라 보세요. 전자는 갈라짐이 작은 장식처럼 보일 수 있고, 후자는 두 갈래와 빈 공간이 더 눈에 들어올 수 있습니다. 선이 벌어지는 정도를 중심석과 함께 비교해 보세요.",
      "참고 사진에는 밴드가 하나에서 둘로 나뉘기 시작하는 지점과 가장 넓게 벌어진 곳을 따로 표시하는 방법을 권합니다. “폭을 줄여 주세요”라는 말만으로는 금속선 자체를 가늘게 할지, 두 줄 사이를 좁힐지 분명하지 않을 수 있기 때문입니다.",
      "아래는 사진을 보며 선택할 항목을 정리한 표입니다. 일정한 치수를 권하는 규격표가 아니라, 원하는 선과 공간을 설명하기 위한 상담 예시입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "사진에서 볼 부분",
        "구분해서 비교할 선택",
        "전달할 말의 예시"
      ],
      "rows": [
        [
          "갈라지는 시작점",
          "보석 가까이에서 짧게 / 더 아래에서 길게",
          "틈이 길게 이어지기보다 보석 옆에서만 살짝 보이면 좋겠어요."
        ],
        [
          "두 갈래의 바깥쪽 폭",
          "좁게 모인 윤곽 / 넓게 벌어진 윤곽",
          "중심석은 유지하고 밴드가 벌어지는 폭은 줄이고 싶어요."
        ],
        [
          "갈래 사이 빈틈",
          "작은 틈 / 눈에 띄는 빈 공간",
          "금속선 굵기는 비슷하게 두고 두 줄 사이 공간을 더 보고 싶어요."
        ],
        [
          "각 금속선의 너비",
          "가는 선 / 존재감 있는 선",
          "전체 벌어짐은 좋지만 각 줄이 조금 더 도톰한 쪽도 비교하고 싶어요."
        ],
        [
          "손바닥 쪽 연결",
          "아래에서 한 밴드로 이어지는 위치와 형태",
          "정면 외에 두 갈래가 합쳐지는 아래쪽 모습도 확인하고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "민자 밴드와 작은 보석 장식 중 무엇을 비교하나요?",
    "paragraphs": [
      "밴드의 갈라진 선 자체가 마음에 들면 장식 없는 금속선부터 비교해 보세요. 작은 보석을 줄지어 넣으면 금속선과 빈틈에 더해 반짝임의 배열도 선택할 요소가 됩니다. 스플릿 생크라는 이름만으로 밴드 보석이 포함되는 것은 아니므로, 장식 여부와 범위를 따로 정하는 편이 좋습니다.",
      "장식을 넣고 싶다면 두 갈래 모두에 넣을지, 일부 구간에만 넣을지 사진에 표시해 주세요. 보석이 시작하고 끝나는 위치까지 정리하면, 중심석 주변을 강조하고 싶은지 밴드의 긴 선을 강조하고 싶은지 전달하기 쉬워집니다. 실제 가능한 배치와 고정 방식은 금속선 너비 및 보석 치수를 함께 보고 검토해야 합니다.",
      "GIA는 주문제작 반지에서 중심 보석의 모양이 전체 디자인을 결정하는 데 영향을 준다고 설명합니다. 밴드만 비교하고 싶을 때는 중심석의 모양·크기와 금속색을 같은 조건으로 두는 방법을 권합니다. 참고 사진마다 중심석까지 달라지면 무엇 때문에 한쪽이 더 마음에 드는지 구분하기 어려울 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "넓게 벌어진 밴드는 착용 전에 무엇을 확인하나요?",
    "paragraphs": [
      "정면에서 보이는 빈틈과 손가락에 닿는 금속 부분을 구분해 보세요. 틈이 넓다는 이유만으로 반지가 가볍거나 편하다고 단정할 수는 없습니다. 위쪽이 넓어지는 형태와 손바닥 쪽 밴드 폭, 각 갈래의 두께는 서로 다른 확인 항목입니다.",
      "가능한 실물이나 확인 자료에서는 손가락을 모았을 때 바깥쪽 선이 닿는 위치, 갈래가 합쳐지는 구간의 모양, 중심석을 받치는 부분의 높이를 살펴보세요. 정면에서는 가늘어 보여도 옆면의 두께나 높이는 다를 수 있습니다. 어떤 방향의 사진·치수·실물로 확인할 수 있는지 상담 때 물어보시면 됩니다.",
      "갈라진 선을 더 가늘게 바꾸는 요청은 단순히 같은 반지를 축소하는 것과 구분해 상담하세요. 원하는 외관과 함께 필요한 금속 두께와 연결부를 검토해야 합니다. 모든 디자인에 적용되는 최소 두께나 “두 갈래라서 더 튼튼하다”는 기준을 임의로 정할 수는 없습니다. 호수나 향후 사이즈 조정도 실제 구조가 정해진 뒤 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 스플릿 생크 반지 주문제작을 어떻게 문의하나요?",
    "paragraphs": [
      "중심 보석이 보이는 사진과 갈라진 밴드가 잘 보이는 사진을 함께 보내 주세요. 원하는 분기점과 빈틈에 표시하고, 그대로 남길 부분과 바꿔도 되는 부분을 나누어 적으면 좋습니다. 치수를 아직 모르더라도 좋아하는 선의 모양과 착용할 손가락부터 설명할 수 있습니다.",
      "문의 예시: “첨부 사진처럼 보석 옆에서 밴드가 두 갈래로 갈라지는 반지를 원합니다. 중심은 둥근 보석으로 생각하고 있고, 갈라짐은 짧게 보이되 두 줄 사이에 작은 틈이 있었으면 합니다. 밴드에는 작은 보석 없이 금속선만 두고 싶어요. 예산은 ○○원 안팎, 희망일은 ○월 ○일이며 가능한 구성을 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 이미지와 선호 금속, 중심석 보유 여부를 보내 주세요. 비교한 안 중 선택한 분기 위치·벌어짐·장식 범위가 상담 내용과 맞는지 확인하고, 실제 보석과 제작 구조를 기준으로 견적과 일정을 안내받으세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "본문의 표와 문의 문장은 디자인 취향을 전달하는 예시입니다. 특정 치수·보석 구성의 제작 가능 여부는 실물 사양과 구조를 보고 확인해야 합니다.",
  "참고 이미지의 틈과 금속선 너비만으로 중량·착용감·강도를 판단하지 마세요. 선택한 디자인의 실제 치수와 호수를 함께 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "반지 주문제작 전체 준비 항목",
    "description": "밴드를 고른 뒤 소재·호수 등 나머지 사양을 정리하세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "중심 보석 고정 방식 비교",
    "description": "밴드 모양과 별도로 프롱·베젤 등의 세팅을 살펴보세요."
  },
  {
    "to": "/guide/open-ring-size-selection-guide",
    "label": "끝이 열린 오픈링과 사이즈 선택",
    "description": "갈라진 밴드와 조절 가능한 구조를 구분해 보세요."
  },
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "주문 전 반지 호수 확인하기",
    "description": "착용할 손가락과 디자인을 함께 고려하세요."
  },
  {
    "to": "/custom",
    "label": "스플릿 생크 반지 제작 문의",
    "description": "원하는 갈라짐과 장식 범위를 사진에 표시해 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "중심 보석과 금속선의 구성을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '스플릿 생크 반지 주문제작, 밴드 선택법'
const gmArticleLead = '스플릿 생크 반지는 중심 보석 가까이에서 밴드가 두 갈래 등으로 나뉘는 디자인입니다. 주문제작할 때는 보석만 고르지 말고 밴드가 어디서 갈라지고 얼마나 벌어지는지 함께 정하세요. 같은 중심석도 짧게 갈라진 밴드와 길게 벌어진 밴드에서 다르게 보일 수 있습니다. 두 갈래의 바깥쪽 폭, 사이의 빈틈, 각 금속선의 너비를 나누어 비교하면 원하는 형태를 전달하기 쉽습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '스플릿 생크 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '스플릿 생크 반지 밴드 디자인 주문제작 상담'
const gmHeroAlt = '둥근 중심 보석 양옆의 금빛 밴드가 두 갈래로 갈라지는 스플릿 생크 반지 AI 디자인 예시'
const gmHeroCaption = '밴드가 갈라지는 위치와 빈 공간을 설명하기 위한 AI 생성 이미지입니다. 실제 판매 제품이나 완성된 주문제작 사례가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '밴드 형태의 정의는 Joseph Jewelry의 용어 안내, 중심석과 전체 디자인의 관계는 GIA 자료를 참고했습니다. 비교표와 사진 표시 방법, 문의 문장은 주문 상담을 돕기 위해 작성한 예시입니다.'
const gmSources = [
  {
    "label": "Joseph Jewelry — 스플릿 생크 용어 안내",
    "url": "https://www.josephjewelry.com/guide/glossary/Split%2BShank",
    "note": "제작사 용어 안내의 밴드 분기 정의와 디자인별 분기 위치 설명을 참고했습니다."
  },
  {
    "label": "GIA — 주문제작 반지의 중심석 모양과 디자인",
    "url": "https://4cs.gia.edu/en-us/blog/guys-guide-custom-engagement-rings/",
    "note": "중심 보석의 모양이 전체 반지 디자인에 영향을 준다는 설명을 참고했습니다."
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
