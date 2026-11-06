<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-ribbon-necklace-custom-folds'
const pageTitle = 'AI 리본 목걸이 주문제작, 주름과 꼬리 정하기 | 귀족'
const pageDescription = 'AI로 만든 리본 목걸이를 주문할 때는 넓은 띠의 면, 남길 접힘과 매듭 높이, 꼬리 길이를 나누어 정하세요. 천처럼 보이는 주름을 금속 디자인으로 옮기기 위한 비교표와 종로 귀족 주문 상담 안내입니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-ribbon-necklace-custom-folds-hero-183f533b.webp`
const publishedAt = '2026-11-06'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 리본 목걸이의 주름을 줄여도 리본 느낌이 남을까요?",
    "answer": "어떤 접힘과 윤곽을 남기는지에 따라 달라집니다. 양쪽 고리가 중앙으로 모이는 접힘, 가운데 매듭, 꼬리의 방향 중 중요한 부분을 먼저 표시하고 잔주름을 줄인 안과 비교해 보세요."
  },
  {
    "question": "리본 전체 폭과 금속 띠의 너비는 같은 뜻인가요?",
    "answer": "다릅니다. 전체 폭은 리본의 왼쪽 끝부터 오른쪽 끝까지이고, 띠 너비는 리본을 이루는 부분의 너비입니다. 전체가 작아도 넓은 띠의 면을 원할 수 있으므로 두 값을 나누어 상담하세요."
  },
  {
    "question": "AI 그림처럼 리본 꼬리가 찰랑거리게 제작할 수 있나요?",
    "answer": "가능 여부를 연결 구조와 함께 검토해야 합니다. 휘어진 모습으로 고정한 꼬리를 원하는지, 매듭 아래에서 실제로 움직이는 장식을 원하는지 먼저 알려 주세요. 움직임을 원하면 연결 부위의 모습과 착용 중 닿는 위치도 확인합니다."
  },
  {
    "question": "리본 목걸이를 작게 만들면 원본 비례를 그대로 줄이면 되나요?",
    "answer": "전체를 같은 비율로 줄일지, 넓은 띠나 매듭 같은 특정 부분을 유지할지 정하는 것이 좋습니다. 원하는 완성 크기에서 큰 접힘과 꼬리가 어떻게 보이는지 확인하고 세부 형태를 조정할 수 있는 범위를 상담하세요."
  }
]
const quickAnswers = [
  "리본 전체의 가로폭과 띠 자체의 너비를 따로 정하세요. 전체 크기가 같아도 가는 선으로 된 리본과 넓은 면이 접힌 리본은 인상이 다릅니다.",
  "원본에서 좋아하는 큰 접힘을 골라 표시하고, 자잘한 주름까지 필요한지 구분하세요. 매듭이 솟은 높이와 밝은 반사광도 별도로 확인할 부분입니다.",
  "꼬리는 매듭부터 끝까지의 길이와 좌우 차이를 정하세요. 휘어진 모양으로 고정할지, 실제로 움직이는 장식을 원하는지도 상담에 알려 주세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI 리본 목걸이는 어떤 형태부터 정하면 되나요?",
    "paragraphs": [
      "먼저 리본을 이루는 재료의 모양을 보세요. 둥근 금속선으로 윤곽을 그린 듯한 안, 납작한 띠가 접힌 안, 넓은 면에 볼록한 굴곡이 이어지는 안을 나누어 비교할 수 있습니다. 같은 리본 모티브라도 “가는 선의 가벼운 인상”과 “넓게 빛나는 면” 중 무엇이 좋은지에 따라 주문 방향이 달라집니다.",
      "이번 글에서는 넓은 띠가 접힌 듯한 금속 리본을 중심으로 살펴봅니다. 원본의 한쪽 고리 부분을 확대해 띠의 앞면과 옆 가장자리를 구분해 보세요. 넓은 면이 마음에 드는 것이라면 수정 과정에서 전체 윤곽만 남은 가는 선 리본으로 바뀌지 않도록 그 부분을 표시합니다.",
      "“리본을 작게 해 주세요”라고만 말하면 띠의 너비와 가운데 매듭, 양쪽 꼬리가 모두 줄어들 수 있습니다. 전체 가로폭은 줄이되 넓은 면의 느낌은 남길지, 각 부분을 같은 비율로 줄일지 선호를 적어 보세요. 실제로 가능한 치수와 연결은 선택한 소재와 구조에 맞춰 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "천처럼 보이는 잔주름을 전부 금속에 넣어야 하나요?",
    "paragraphs": [
      "원하는 특징을 만드는 큰 접힘부터 골라 보세요. 예를 들어 양쪽 고리가 중앙으로 모이는 한 번의 접힘과 꼬리 한쪽이 살짝 뒤집힌 곡면을 우선하고, 표면에 촘촘한 잔주름은 줄이는 방향을 상담할 수 있습니다. 천의 질감을 모두 복제하기보다 어떤 접힘에서 리본다운 느낌을 받는지 정하는 과정입니다.",
      "AI 이미지의 밝은 줄이 모두 솟은 주름은 아닙니다. 빛이 비친 부분일 수 있으므로 원하는 굴곡은 이미지 위에 직접 선을 그어 “여기는 접힌 면”, “여기는 매끄러운 면”으로 구분해 주세요. 앞면의 가느다란 선 하나를 깊은 홈으로 해석하면 처음 좋아했던 넓은 면이 달라질 수 있습니다.",
      "GIA의 2024년 주얼리 AI 연구는 생성 이미지를 실제 모델로 옮길 때 소재, 치수, 제작 방식과 착용자 몸과의 관계를 검토해야 한다고 설명합니다. 리본에서는 접힘을 얼마나 높게 만들지, 겉면의 굴곡이 뒷면에서 어떤 형태가 되는지 상담하는 데 이 원칙을 적용할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "리본 폭·매듭·꼬리는 어떻게 나누어 비교하나요?",
    "paragraphs": [
      "정면에서 왼쪽 끝부터 오른쪽 끝까지가 전체 가로폭이고, 리본을 이루는 띠의 너비는 별도 항목입니다. 매듭의 정면 크기와 옆으로 솟은 높이도 나누어 보세요. 꼬리는 매듭에서 시작하는 지점을 기준으로 각 끝까지 표시하면 좌우 길이 차이를 설명하기 쉽습니다.",
      "두 안을 비교할 때는 바꾸고 싶은 항목 하나를 정해 보세요. 넓은 띠와 작은 매듭은 유지하면서 꼬리만 짧게 한 안을 만들면 무엇 때문에 인상이 달라졌는지 알기 좋습니다. 아래 표는 정해진 제품 규격이 아니라 원본에 표시할 주문 상담 항목입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "나눠 볼 부분",
        "비교할 모습",
        "전달할 요청"
      ],
      "rows": [
        [
          "전체 가로·세로",
          "가로로 펼친 리본과 아래로 긴 리본",
          "고리와 꼬리를 포함한 외곽 크기를 정하고 싶어요."
        ],
        [
          "띠 자체의 너비",
          "가는 선 같은 윤곽과 넓게 드러나는 면",
          "전체 크기를 줄여도 띠의 넓은 면은 남겨 주세요."
        ],
        [
          "접힌 면",
          "큰 접힘 몇 개와 촘촘한 잔주름",
          "표시한 접힘은 살리고 나머지 면은 매끄럽게 하고 싶어요."
        ],
        [
          "가운데 매듭",
          "작고 낮은 중심과 볼록하게 솟은 중심",
          "정면에서 보이는 크기와 옆면 높이를 따로 비교하고 싶어요."
        ],
        [
          "좌우 꼬리",
          "같은 길이·다른 길이, 짧은 끝·길게 늘어진 끝",
          "매듭부터 끝까지의 길이와 끝 모양을 각각 정하고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "리본 꼬리의 끝과 움직임은 무엇을 확인하나요?",
    "paragraphs": [
      "끝 모양은 V자로 갈라진 모습, 둥글게 마무리한 모습, 한쪽으로 비스듬히 잘린 모습 등을 비교해 보세요. 정면에서 마음에 드는 윤곽을 고른 다음 실제 끝과 가장자리를 어떻게 마무리할지 묻습니다. 끝이 바깥으로 들린 이미지라면 목걸이를 걸었을 때 피부나 옷과 만날 위치도 확인할 부분입니다.",
      "꼬리가 휘날리는 그림과 실제로 흔들리는 장식은 따로 설명하세요. 굽은 모양을 매듭에 고정해 표현할 수 있는지, 움직이는 꼬리를 원한다면 어떤 연결이 필요한지 질문합니다. 움직임을 추가하면 연결 부위의 외관도 달라질 수 있으므로 원본의 매끈한 면을 어디까지 유지할지 함께 정하세요.",
      "선택한 전체 가로·세로에 맞춰 리본 외곽을 종이에 그려 평소 목걸이 위치에 대보면 꼬리의 길이감을 비교하기 좋습니다. 이는 크기와 비례를 고르는 참고 방법입니다. GIA의 주얼리 디자인 교육도 크기와 비례, 요소 간 관계를 실제 제작 조건과 함께 다룹니다. 금속의 무게감과 가장자리 감촉은 별도 확인이 필요합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 AI 리본 목걸이를 어떻게 주문 문의하나요?",
    "paragraphs": [
      "AI 원본 한 장과 좋아하는 접힘을 표시한 사본을 준비해 주세요. 리본 전체의 희망 가로·세로, 넓은 띠와 가는 선 중 선호하는 형태, 좌우 꼬리의 길이 차이를 함께 적으면 좋습니다. 아직 mm를 정하지 못했다면 평소 착용하는 펜던트의 실제 크기를 참고로 알려 주세요.",
      "문의 예시: “AI로 만든 리본 목걸이입니다. 넓은 금속 띠가 접힌 느낌을 살리고 싶어요. 표시한 큰 접힘만 남기고 잔주름은 줄이고 싶습니다. 가운데 매듭은 낮게, 오른쪽 꼬리는 왼쪽보다 조금 길게 하되 둘 다 고정된 구성을 원해요. 이 비례로 제작 가능한 크기와 끝 마무리를 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 이미지를 보내 주세요. 희망 금속과 색, 체인 포함 여부, 예산과 필요한 날짜도 알려 주시면 주문 구성을 검토하는 데 도움이 됩니다. 리본의 접힘과 꼬리 형태를 구현할 수 있는 범위를 확인하고, 정한 사양을 기준으로 견적과 일정을 상담하세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "AI 이미지에서 보이는 천 같은 질감, 밝은 반사광, 접힌 금속의 굴곡을 구분해 표시하세요. 그림 속 잔주름의 수가 완제품의 사양으로 자동 확정되지는 않습니다.",
  "뾰족하거나 바깥으로 들린 꼬리 끝은 실제 크기와 마감, 착용 위치를 함께 확인하세요. 제작 가능 여부와 필요한 두께는 소재·구조별로 상담합니다."
]
const relatedLinks = [
  {
    "to": "/guide/ai-jewelry-design-prompt-guide",
    "label": "AI 주얼리 이미지 요청문 정리하기",
    "description": "아직 참고 이미지가 없다면 원하는 형태를 설명하는 방법을 살펴보세요."
  },
  {
    "to": "/guide/ai-jewelry-custom-budget-guide",
    "label": "AI 디자인 주문 예산 정하기",
    "description": "남기고 싶은 디자인 요소와 예산의 우선순위를 정리하세요."
  },
  {
    "to": "/guide/ai-ring-design-to-pendant-custom-order",
    "label": "AI 반지 모티브를 목걸이로 바꾸려면",
    "description": "품목을 바꿀 때 펜던트의 방향과 연결을 검토하는 안내입니다."
  },
  {
    "to": "/custom",
    "label": "리본 목걸이 주문제작 상담",
    "description": "AI 원본에 원하는 접힘과 꼬리 형태를 표시해 문의해 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 살펴보기",
    "description": "원하는 금속 면과 입체감을 설명할 참고 디자인을 찾아보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 리본 목걸이 주문제작, 주름과 꼬리 정하기'
const gmArticleLead = 'AI 리본 목걸이 주문제작은 리본의 면과 접힘을 먼저 고르면 구체적으로 상담할 수 있습니다. 가는 선으로 묶은 듯한 리본인지, 넓은 띠가 접힌 리본인지 정한 뒤 꼭 남길 주름과 꼬리 비례를 표시해 보세요. 이미지에서 천처럼 부드럽게 흐르는 모양은 실제 금속의 곡면과 연결 구조로 다시 검토해야 합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 리본 목걸이 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 리본 목걸이의 접힌 면·꼬리 비례 주문 상담'
const gmHeroAlt = '넓은 금속 띠가 접힌 양쪽 고리와 중앙 매듭, 짧은 두 꼬리로 이루어진 금색 리본 목걸이의 AI 예시'
const gmHeroCaption = '넓은 띠의 접힌 면과 짧은 꼬리 비례를 보여 주는 AI 생성 예시입니다. 귀족의 실제 제작 사례가 아니며, 두께와 연결·마감은 주문 상담에서 확인합니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 AI 주얼리 연구와 디자인 교육 자료에서 일반 설계 원칙을 참고했습니다. 리본의 접힘·매듭·꼬리 비교표와 문의 문장은 원하는 주문 형태를 구체화하기 위한 편집 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 생성형 AI 이미지와 실제 주얼리 설계",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "AI 이미지를 실제 주얼리로 옮길 때 확인할 설계 원칙을 참고했습니다."
  },
  {
    "label": "GIA — 주얼리 디자인의 크기·비례·제작 조건",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design-technology",
    "note": "크기·비례·요소의 관계를 제작 조건과 함께 고려하는 교육 안내입니다."
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
