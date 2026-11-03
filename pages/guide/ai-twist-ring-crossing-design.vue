<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-twist-ring-crossing-design'
const pageTitle = 'AI 꼬임 반지, 겹치는 선부터 정하기 | 귀족'
const pageDescription = 'AI로 만든 꼬임 반지를 주문하려면 선이 교차하는 위치와 위아래, 고정 구조를 구분하세요. 한 개의 반지인지, 틈과 손바닥 쪽 연결은 어떤지 종로 귀족이 상담 기준을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-twist-ring-crossing-design-hero-2a9c938e.webp`
const publishedAt = '2026-11-03'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI 꼬임 반지에서 두 줄이 보이면 반지 두 개인가요?",
    "answer": "두 줄이 보인다고 두 개의 독립된 반지라는 뜻은 아닙니다. 한 몸으로 연결된 밴드일 수도 있으므로 고정된 한 개의 반지를 원하는지, 분리된 고리 구성을 원하는지 따로 알려 주세요."
  },
  {
    "question": "AI 반지 그림에서 어두운 부분은 실제로 뚫린 틈인가요?",
    "answer": "그림만으로는 확정하기 어렵습니다. 관통한 공간인지, 금속 표면의 홈인지, 겹친 부분의 그림자인지 구분해 질문하세요. 실제로 빈 공간을 원한다면 해당 위치를 표시해 구현 가능한 구조를 상담하면 됩니다."
  },
  {
    "question": "꼬임 반지는 금속을 직접 비틀어서만 만드나요?",
    "answer": "꼬인 외관만으로 제작 공정을 알 수는 없습니다. 어떤 방식으로 형태를 만들고 연결할지는 소재와 디자인에 따라 확인해야 합니다. 원하는 모양과 공정에 대한 요청을 구분해 전달하세요."
  },
  {
    "question": "AI 꼬임을 줄이면 어떤 부분부터 다시 확인하나요?",
    "answer": "남길 교차 위치와 횟수부터 정하고 선이 밴드로 이어지는 경로를 다시 확인하세요. 정면 전체 넓이, 겹침 높이, 손바닥 쪽 형태도 달라질 수 있으므로 같은 호수 조건에서 어떤 모습으로 바뀌는지 상담하는 것이 좋습니다."
  }
]
const quickAnswers = [
  "교차 횟수와 위치를 먼저 고르세요. 정면 한곳의 X자, 반복되는 꼬임, 한곳에 모인 매듭처럼 원하는 모습을 말로 풀어 전달하면 좋습니다.",
  "겹친 선의 위아래와 연결을 따로 확인하세요. AI 그림에서 가려지거나 끊겨 보이는 구간은 추측해서 연결하지 말고 상담할 부분으로 표시합니다.",
  "정면의 넓이와 겹침 높이, 손바닥 쪽 밴드는 다른 항목입니다. 원하는 호수와 함께 안쪽 구조까지 검토해야 실제 착용할 반지의 조건을 정할 수 있습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI 꼬임 반지는 어떤 모양부터 고르면 좋나요?",
    "paragraphs": [
      "“꼬인 반지”라는 말에 원하는 모습을 덧붙여 보세요. 두 선이 정면에서 한 번 만나는 모습, 줄처럼 여러 번 감기는 모습, 가운데에 매듭 같은 덩어리가 있는 모습은 주문 방향이 다릅니다. 이는 취향을 설명하기 위한 구분이며 정해진 제품 분류나 제작 방식의 이름은 아닙니다.",
      "AI 이미지에서 가장 마음에 드는 부분을 작게 표시해 보세요. 한 번의 넓은 교차가 좋은지, 가는 선이 촘촘히 반복되는 것이 좋은지 골라 두면 수정할 때 기준이 됩니다. 둥근 금속선처럼 보이는 부분과 넓고 납작한 띠처럼 보이는 부분도 나누어 알려 주세요.",
      "처음 상담에서는 보석 없는 금속 형태부터 설명해도 됩니다. “위쪽 한곳만 두 줄이 교차하고 나머지는 단정한 밴드였으면 한다”처럼 남길 장식을 정하세요. 그림에 보이는 모든 꼬임을 그대로 넣는 것이 목표인지, 핵심 교차만 살려도 되는지도 함께 전하면 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "겹친 선이 실제로 어떻게 이어지는지 확인해야 하나요?",
    "paragraphs": [
      "네. 정면에서 겹쳐 보이는 모양과 실제 금속이 이어지는 구조를 나누어 확인해야 합니다. 원본을 보관한 뒤 복사한 이미지 위에 선을 서로 다른 색으로 따라 그려 보세요. 위로 지나가는 선이 어느 쪽 밴드로 이어지는지, 아래 선이 다시 나타나는 곳은 어디인지 살펴봅니다.",
      "가려진 구간을 억지로 완성할 필요는 없습니다. 한 선이 갑자기 두 갈래처럼 보이거나 그림자 때문에 연결을 알 수 없다면 그 지점을 표시해 질문하세요. GIA의 2024년 주얼리 AI 연구도 떠 있는 보석 고정부 등 생성 이미지의 구조상 이상 사례를 보여 줍니다. 꼬임 반지에서도 보기 좋은 그림과 제작 가능한 입체 구조를 구분하는 것이 필요합니다.",
      "두 줄이 한 몸으로 고정된 반지인지, 서로 분리된 고리를 조합한 것인지도 정하세요. 같은 정면 인상을 가졌더라도 실제 구성은 다를 수 있습니다. 움직이는 고리를 특별히 원하는 것이 아니라면 “한 개의 고정된 반지로 착용하고 싶다”고 명시하고 가능한 연결 방식을 상담하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "교차 부분에서는 무엇을 따로 물어봐야 하나요?",
    "paragraphs": [
      "먼저 어느 선이 위로 지나가는지 정하고, 그 모양을 실제로 어떻게 지지하고 연결할지 물어보세요. 위아래 선을 서로 고정하는지, 떨어져 보이는 공간을 남기는지, 손가락 쪽에서 어떤 면으로 이어지는지는 정면 이미지 한 장에 모두 드러나지 않습니다.",
      "어둡게 보이는 부분도 곧바로 구멍으로 정하지 마세요. 실제로 관통한 틈일 수도 있지만 표면의 홈이나 겹친 금속 아래 그림자일 수도 있습니다. “이 부분은 뒤가 보이는 빈 공간을 원한다”처럼 의도를 적고 구현 가능한 범위를 확인합니다. 아래 표는 AI 원본에 표시할 상담 질문입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "표시할 부분",
        "구분할 내용",
        "상담 질문 예시"
      ],
      "rows": [
        [
          "교차점",
          "위로 지나가는 선과 아래쪽 선",
          "이 선이 위로 보이는 방향을 유지할 수 있나요?"
        ],
        [
          "가려진 구간",
          "반대쪽으로 이어지는 경로",
          "보이지 않는 부분은 어느 밴드로 연결되나요?"
        ],
        [
          "어두운 틈",
          "관통한 빈 공간·홈·그림자",
          "실제로 뒤가 보이는 틈인가요, 표면 표현인가요?"
        ],
        [
          "선이 만나는 곳",
          "고정되는 위치와 떨어져 보이는 범위",
          "한 개의 고정된 반지로 만들 때 어디가 연결되나요?"
        ],
        [
          "손바닥 방향",
          "꼬임의 종료 지점과 밴드 연결",
          "아래쪽은 민자로 이어지나요, 꼬임이 계속되나요?"
        ]
      ]
    }
  },
  {
    "title": "정면의 꼬임이 마음에 들면 폭과 호수는 어떻게 정하나요?",
    "paragraphs": [
      "가장 넓게 보이는 교차 부분과 각 금속선의 너비를 따로 확인하세요. 두 줄 사이에 공간이 있으면 정면의 전체 넓이와 실제 금속선의 너비가 다릅니다. 겹친 부분이 얼마나 올라오는지, 아래쪽 밴드가 손가락을 어떻게 감싸는지도 함께 물어보세요.",
      "GIA의 반지 치수 안내는 폭이 일정한 반지, 폭이 달라지는 반지, 넓은 밴드와 안쪽이 볼록한 반지 등을 구분해 다룹니다. 이처럼 정면 장식의 외곽만 보고 호수를 정하기보다 안쪽 형태와 착용할 손가락을 함께 확인하는 것이 좋습니다. 꼬임이 넓다는 이유로 정해진 몇 호를 더하는 방식으로 확정하지 마세요.",
      "평소 편하게 착용하는 반지의 호수는 참고로 알려 주세요. 새 반지에서는 교차 부분이 옆 손가락과 닿는지, 손바닥 쪽에 원하는 매끈한 밴드가 남는지 확인할 수 있는 자료나 방법을 상담합니다. AI 착용 이미지가 자연스러워 보여도 실제 높이와 착용감이 검증된 것은 아닙니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 AI 꼬임 반지를 어떻게 주문 문의하나요?",
    "paragraphs": [
      "AI 원본과 교차 부분을 표시한 이미지를 함께 보내 주세요. 원하는 선의 수와 교차 위치, 고정된 한 개의 반지인지, 손바닥 쪽까지 꼬임을 이어갈지를 적으면 상담 방향이 구체적입니다. 색을 두 가지로 나누고 싶다면 어느 선에 어떤 색을 원하는지도 추가해 주세요.",
      "문의 예시: “AI로 만든 반지 이미지입니다. 정면에서 두 선이 한 번 교차하는 모양이 마음에 들어요. 표시한 선이 위로 지나가고, 하나로 고정된 반지를 원합니다. 손바닥 쪽은 민자로 이어졌으면 합니다. 착용할 손가락과 평소 호수를 알려 드릴 테니 가능한 연결 구조와 교차 부분의 높이를 상담받고 싶어요. 예산은 ○○원 안팎이고 희망일은 ○월 ○일입니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 이미지를 보내 주세요. 원하는 꼬임의 외관과 실제로 구현할 구조를 나누어 확인한 뒤 금속, 치수, 주문 구성에 맞는 견적과 일정을 상담합니다. 꼬여 보이는 모양만으로 실제 금속을 비트는 공정인지, 다른 방식으로 형태를 만드는지 확정할 수는 없습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "AI 이미지에서 선이 겹쳐 보인다는 사실만으로 접합 위치·빈틈·독립 고리 여부를 확정하지 마세요. 확인되지 않는 구간은 표시해 실제 구조를 상담하세요.",
  "본문의 모양 구분과 비교표는 주문 의도를 전달하는 예시입니다. 모든 교차 형태의 제작 가능성이나 특정 호수·높이에서의 착용감을 보장하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/split-shank-ring-custom-band-design",
    "label": "교차보다 갈라지는 밴드가 좋다면",
    "description": "보석 옆에서 밴드가 나뉘는 스플릿 생크의 선택 기준을 살펴보세요."
  },
  {
    "to": "/guide/jongno-two-tone-couple-ring-selection",
    "label": "서로 다른 색의 선을 조합하고 싶다면",
    "description": "콤비 반지의 색을 어느 부위에 배치할지 구분하세요."
  },
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 이미지 주문제작 상담 기본 안내",
    "description": "생성 이미지와 실제 제작 사양을 구분하는 방법입니다."
  },
  {
    "to": "/custom",
    "label": "AI 꼬임 반지 제작 상담",
    "description": "원본과 원하는 교차 부분을 표시한 이미지를 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 참고하기",
    "description": "밴드의 선과 전체 윤곽을 설명할 디자인을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 꼬임 반지, 겹치는 선부터 정하기'
const gmArticleLead = 'AI 꼬임 반지를 주문제작할 때는 마음에 드는 교차 부분부터 표시하세요. 한곳에서 두 선이 겹치는 모습인지, 둘레를 따라 꼬임이 반복되는 모습인지 정하고 선이 어디로 이어지는지 확인합니다. 그림에 두 줄이 보인다는 이유만으로 두 개의 반지이거나 서로 움직이는 구조라고 판단할 수는 없습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 꼬임 반지 교차 구조'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 꼬임 반지 교차 모양·구조 상담'
const gmHeroAlt = '정면에서 두 금속선이 교차하고 아래쪽은 한 밴드로 이어지는 금색 꼬임 반지의 AI 디자인 예시'
const gmHeroCaption = '교차하는 선과 밴드의 연결을 설명하는 AI 생성 이미지입니다. 실제 판매 제품·고객 제작 사례나 구조가 검증된 도면은 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 2024년 AI 주얼리 연구와 반지 치수 안내를 참고했습니다. 꼬임 모양의 구분, 선을 따라 표시하는 방법과 비교표는 상담을 돕기 위한 편집 예시입니다.'
const gmSources = [
  {
    "label": "GIA — AI 주얼리 이미지의 구조와 실제 설계 검토",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "생성 이미지의 구조와 실제 제작 검토를 구분하는 근거로 참고했습니다."
  },
  {
    "label": "GIA — 반지 형태별 치수 측정 고려사항",
    "url": "https://www.gia.edu/quality-assurance-benchmark/accurate-determination-finger-ring-size",
    "note": "반지의 폭과 안쪽 형태를 구분해 치수를 확인하는 안내를 참고했습니다."
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
