<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ring-spinning-fit-balance-guide'
const pageTitle = '반지가 돌아가는 이유, 줄이기 전에 확인할 것 | 귀족'
const pageDescription = '반지가 자꾸 돌아간다면 마디와 착용 부위의 차이, 장식 배치부터 확인하세요. 전체 회전과 보석 흔들림을 구분하고, 호수 조정과 안쪽 비드를 검토할 때의 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/ring-spinning-fit-balance-guide-hero-45a4b858.webp`
const publishedAt = '2026-09-19'
const updatedAt = ''
const faqItems = [
  {
    "question": "반지가 돌아가면 사이즈를 줄여야 하나요?",
    "answer": "아닙니다. 관절과 착용부의 굵기 차이, 반지의 무게 배분과 밴드 형태, 시간대별 손가락 변화를 먼저 확인해야 합니다. 반지 전체의 회전인지 보석이나 세팅의 느슨함인지도 구분해야 합니다."
  },
  {
    "question": "반지 안쪽 비드를 넣으면 누구나 편한가요?",
    "answer": "그렇지는 않습니다. 비드는 헐거움과 회전을 줄이는 선택지이지만 안쪽 돌기가 불편할 수도 있습니다. 마디 통과와 착용부의 압박감, 해당 반지에 적용할 수 있는지를 함께 확인해야 합니다."
  },
  {
    "question": "보석이 흔들리는 것과 반지가 돌아가는 것은 같은 문제인가요?",
    "answer": "반지 전체의 회전과 보석의 흔들림은 구분해서 확인해야 합니다. 보석이 움직이거나 고정 부위에 이상이 보이면 호수 조정부터 결정하지 말고 착용을 멈춘 뒤 점검을 요청하세요."
  },
  {
    "question": "상담 전에 어떤 사진을 준비하면 좋나요?",
    "answer": "편안하게 손을 둔 상태에서 장식이 어디로 돌아가는지 보이는 사진과 반지 옆면·안쪽 사진이 도움이 됩니다. 언제 불편한지도 함께 적어 주세요. 사진만으로 적정 호수나 가공 가능 여부를 확정할 수는 없습니다."
  }
]
const quickAnswers = [
  "반지 전체가 돌아가는 현상과 보석이 흔들리는 현상은 별도로 확인해야 합니다.",
  "큰 관절과 가는 손가락 뿌리의 차이가 있으면 관절 통과에 필요한 여유 때문에 반지가 돌아갈 수 있습니다.",
  "하루 중 착용감과 반지의 폭·형태를 확인한 뒤 조정이 필요한지 판단하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "먼저 반지 전체의 회전인지 확인하세요",
    "paragraphs": [
      "반지가 손가락 둘레를 따라 통째로 돌아가는지, 반지 몸체는 그대로인데 보석만 움직이는지 먼저 구분하세요. GIA는 손가락을 감싸는 밴드와 보석을 잡는 세팅을 별도 구성으로 설명합니다. 크기를 줄인다고 보석의 고정 상태까지 해결되는 것은 아닙니다.",
      "보석이 흔들리거나 고정 부위에 이상이 보이면 계속 만져서 시험하지 말고 착용을 멈춘 뒤 점검을 요청하세요. 손가락에서 반지 전체가 도는 경우라면 아래의 착용 조건을 차례로 살펴보면 됩니다."
    ],
    "bullets": [
      "반지의 장식 방향이 자주 바뀌는지 살펴봅니다.",
      "보석이 흔들리거나 소리가 나는지 억지로 시험하지 말고 상태를 상담합니다.",
      "두 현상이 함께 있을 수 있으므로 크기 조정만으로 해결된다고 단정하지 않습니다."
    ],
    "table": null
  },
  {
    "title": "관절과 손가락 뿌리의 차이를 보세요",
    "paragraphs": [
      "손가락 관절이 반지가 놓이는 부위보다 굵다면 반지는 관절을 통과할 수 있는 여유가 필요합니다. 이 여유 때문에 관절을 지난 착용 위치에서 반지가 돌아갈 수 있습니다.",
      "이때 착용 위치만 보고 줄이면 관절을 통과할 때 지나치게 뻑뻑해질 수 있습니다. 관절을 무리 없이 통과하는지와 착용부에서 지나치게 헐겁지 않은지를 함께 평가해야 합니다."
    ],
    "bullets": [
      "관절을 통과할 때 걸림이나 통증이 있는지 확인합니다.",
      "착용 위치에서 반지가 빠질 듯한지, 반대로 피부를 과하게 누르는지 살핍니다.",
      "손가락 모양과 반지의 맞춤은 개인마다 달라 한 호수 조정을 먼저 정하지 않습니다."
    ],
    "table": null
  },
  {
    "title": "장식의 무게와 밴드 형태를 살펴보세요",
    "paragraphs": [
      "윗장식이 있는 반지라면 어느 방향으로 기우는지 관찰해 보세요. 장식이 있는 쪽으로 반복해서 내려가면 밴드의 여유와 장식 배치를 함께 보여 주는 것이 좋습니다. 이 모습만으로 원인을 확정하거나 세팅 불량이라고 판단하지는 마세요.",
      "특히 넓은 밴드는 같은 호수라도 더 조이는 느낌을 줄 수 있으므로 숫자만으로 착용감을 판단하기 어렵습니다. 반지의 폭, 두께, 장식 배치와 손가락 형태를 함께 확인해야 합니다."
    ],
    "bullets": [
      "장식이 무거운 방향으로 반복해서 내려가는지 봅니다.",
      "밴드가 넓거나 형태가 독특한지 확인합니다.",
      "보석의 흔들림과 반지 밴드의 회전을 서로 다른 점검 항목으로 나눕니다."
    ],
    "table": {
      "headers": [
        "확인 항목",
        "살펴볼 내용",
        "성급한 판단을 피해야 하는 이유"
      ],
      "rows": [
        [
          "손가락 형태",
          "관절과 착용부의 굵기 차이",
          "관절 통과에 필요한 여유가 있을 수 있습니다."
        ],
        [
          "반지 형태",
          "밴드의 폭과 두께, 장식 배치",
          "같은 호수라도 조임과 균형감이 다를 수 있습니다."
        ],
        [
          "보석과 세팅",
          "보석의 흔들림과 고정 구조",
          "밴드 회전과 별도의 점검이 필요합니다."
        ]
      ]
    }
  },
  {
    "title": "호수 조정과 안쪽 비드는 무엇이 다른가요?",
    "paragraphs": [
      "호수를 줄이는 작업은 반지의 둘레를 바꿉니다. 마디는 굵고 착용 부위는 가늘다면, 돌아가지 않을 만큼 줄였을 때 마디를 통과하기 어려워질 수 있습니다.",
      "GIA가 소개하는 안쪽 비드는 밴드 안에 작은 금속 돌기를 더해 헐거움을 줄이는 전문 작업입니다. 마디가 큰 경우 회전을 줄이는 선택지가 될 수 있지만, GIA의 기술 자료는 돌기가 불편하게 느껴질 수도 있다고 설명합니다. 작은 돌기라고 해서 누구에게나 편한 것은 아닙니다.",
      "다른 내부 구조를 적용하는 방식도 있으므로 조정 방법부터 정하지 말고 현재 반지와 손가락을 함께 보여 주세요. 가능 여부와 착용감은 소재·밴드·세팅에 따라 확인해야 하며, 귀족이 특정 가공을 제공한다는 뜻은 아닙니다."
    ],
    "bullets": [
      "마디를 넘길 때의 불편함과 착용 위치에서의 헐거움을 각각 설명합니다.",
      "회전이 자주 생기는 시간과 활동을 적습니다. 아침·저녁의 착용감 차이도 도움이 됩니다.",
      "조정 후에도 빼고 끼울 수 있는지, 안쪽이 특정 지점을 누르지 않는지 확인할 방법을 질문합니다."
    ],
    "table": null
  }
]
const cautions = [
  "테이프·접착제·공구로 반지 안쪽을 고정하거나 모양을 바꾸지 마세요.",
  "빠질 만큼 헐겁거나 통증이 생긴다면 계속 착용하며 시험하지 마세요.",
  "비드 등 조정 방식은 반지마다 적용 조건이 다릅니다. 먼저 현재 상태와 착용감을 확인해야 합니다."
]
const relatedLinks = [
  {
    "to": "/guide/ring-size-measuring-method",
    "label": "반지 호수 측정의 기본",
    "description": "호수와 손가락 크기를 확인하는 기본 방법입니다."
  },
  {
    "to": "/guide/jongno-ring-size-repair",
    "label": "종로 반지 사이즈 조정 전 확인",
    "description": "소재·세팅·각인 등 조정에 앞서 확인할 조건을 정리했습니다."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "반지 보석 세팅 구조",
    "description": "보석을 고정하는 부위와 밴드를 구분해 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '반지가 돌아가는 이유, 줄이기 전에 확인할 것'
const gmArticleLead = '반지가 손가락에서 돌아간다고 해서 바로 한 호수를 줄이는 것이 항상 맞는 것은 아닙니다. 관절과 손가락 뿌리의 굵기 차이, 반지의 무게 배분과 밴드 형태, 하루 중 손가락 변화, 보석과 세팅 상태를 나누어 살펴봐야 합니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '반지가 돌아가는 이유'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '반지 회전과 착용감 확인'
const gmHeroAlt = '회색 바닥 위 작은 원형 보석이 달린 금빛 반지'
const gmHeroCaption = '밴드와 윗장식을 보여 주는 설명용 이미지입니다. 실제 판매 제품이나 특정 조정 결과가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 반지 크기·착용 기준과 세팅 구조 안내를 참고했습니다. 회전 방향을 기록하고 사진을 준비하는 순서는 상담을 돕기 위한 관찰 안내입니다. 개별 반지의 조정 방식은 실물 확인이 필요합니다.'
const gmSources = [
  {
    "label": "GIA 4Cs, Ring Size Guide: Tips and Ring Size Chart",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-determine-ring-size-tips-and-ring-size-chart/",
    "note": "관절 통과, 넓은 생크, 내부 비드, 기계식 생크, 기온과 시간대에 따른 손가락 변화 및 착용 상태를 설명합니다."
  },
  {
    "label": "GIA Quality Assurance Benchmarks, Accurate Determination of Finger and Ring Sizes",
    "url": "https://my.gia.edu/quality-assurance-benchmark/accurate-determination-finger-ring-size",
    "note": "반지의 안정적인 착용 상태, 관절 통과 여유와 내부 비드 적용 사례를 다룹니다."
  },
  {
    "label": "GIA 4Cs, Complete Guide to Engagement Ring Settings",
    "url": "https://4cs.gia.edu/en-us/blog/guide-to-ring-settings/",
    "note": "생크와 보석 고정 세팅의 구조를 설명하며, 세팅 점검을 크기 조정과 구분하는 근거로 참고했습니다."
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
