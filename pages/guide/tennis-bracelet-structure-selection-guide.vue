<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/tennis-bracelet-structure-selection-guide'
const pageTitle = '테니스 팔찌 뜻, 세팅·잠금장치 선택법 | 귀족'
const pageDescription = '테니스 팔찌는 보석을 연속으로 연결한 디자인입니다. 프롱·베젤·채널 세팅 차이, 총 캐럿과 한 알 크기, 잠금장치를 확인하는 순서를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/tennis-bracelet-structure-selection-guide-hero-b83a683e.webp`
const publishedAt = '2026-09-13'
const updatedAt = ''
const faqItems = [
  {
    "question": "테니스 팔찌는 모두 다이아몬드인가요?",
    "answer": "아닙니다. 테니스 팔찌는 연결된 배열을 가리키는 디자인 이름입니다. 보석명과 금속 소재는 제품 설명에서 따로 확인하세요."
  },
  {
    "question": "총 캐럿이 같으면 한 알 크기도 같나요?",
    "answer": "같다고 볼 수 없습니다. 총 캐럿은 여러 보석의 무게를 합한 값이므로 보석 수와 개별 크기도 확인해야 합니다."
  },
  {
    "question": "프롱과 베젤 중 무엇이 더 좋은가요?",
    "answer": "보석을 드러내는 모양과 금속 테두리의 느낌을 비교해 선택하세요. 세팅 이름만으로 완성품의 품질을 판단하기보다 실물의 마감과 착용감을 함께 보는 것이 좋습니다."
  },
  {
    "question": "잠금장치가 딸깍 닫히면 괜찮나요?",
    "answer": "소리만으로 판단하지 마세요. 해당 제품의 주 잠금장치가 완전히 결합됐는지, 보조 안전장치가 있다면 올바르게 닫혔는지 확인하세요."
  }
]
const quickAnswers = [
  "테니스 팔찌는 디자인 이름입니다. 보석 종류와 금속 소재를 별도로 확인하세요.",
  "총 캐럿과 한 알의 크기는 다릅니다. 보석 수와 팔찌 폭도 함께 비교하세요.",
  "잠금 방식은 제품마다 다릅니다. 여닫는 방법과 보조 안전장치부터 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "이름보다 소재와 보석 배열을 먼저 보세요",
    "paragraphs": [
      "같은 테니스 팔찌라는 이름으로 판매돼도 보석 종류와 금속은 다를 수 있습니다. 제품 설명에서 보석명, 천연·랩그로운 여부, 금속 종류를 각각 찾아보세요. 정보가 빠져 있다면 사진만 보고 추정하지 말고 판매처에 질문하세요.",
      "총 캐럿은 여러 보석의 무게를 합한 표기이며 한 알의 지름을 뜻하지 않습니다. 같은 총중량이라도 보석 수가 다르면 한 알씩 보이는 크기가 달라질 수 있습니다. 비교할 때는 총 캐럿, 한 알의 크기, 보석 수를 서로 다른 항목으로 적어 두세요."
    ],
    "bullets": [
      "보석명과 금속 소재를 제품명과 별도로 확인합니다.",
      "팔찌 전체 사진과 옆면 사진을 함께 보고 폭과 배열을 비교합니다.",
      "정면 사진에서 알 수 없는 연결부와 잠금 구조는 추가 사진을 요청합니다."
    ],
    "table": {
      "headers": [
        "제품 설명의 항목",
        "확인할 질문",
        "비교할 때 주의할 점"
      ],
      "rows": [
        [
          "보석·금속 소재",
          "보석명과 금속 종류는 무엇인가요?",
          "테니스 팔찌라는 이름으로 소재를 추정하지 않기"
        ],
        [
          "총 캐럿",
          "전체 보석을 합한 중량인가요?",
          "한 알의 지름이나 팔찌 폭과 구분하기"
        ],
        [
          "한 알 크기·보석 수",
          "각 보석 크기와 배열은 어떤가요?",
          "총 캐럿이 비슷해도 각각 확인하기"
        ]
      ]
    }
  },
  {
    "title": "프롱·베젤·채널 세팅 비교",
    "paragraphs": [
      "GIA의 세팅 안내는 보석을 잡는 금속의 형태를 구분합니다. 프롱은 작은 금속 발로, 베젤은 테두리로, 채널은 나란한 금속 벽 사이로 보석을 고정합니다. 아래 차이를 기준으로 원하는 모양을 골라 보세요.",
      "세팅 이름만으로 완성품의 견고함을 정할 수는 없습니다. 마음에 드는 디자인을 고른 뒤, 돌출된 부분이나 불편한 모서리가 없는지 실물에서 확인하세요."
    ],
    "bullets": [],
    "image": {
      "src": "/Image/guide/tennis-bracelet-structure-selection-guide-section-2-6d13ca44.webp",
      "alt": "왼쪽부터 금속 발로 잡는 프롱, 둥근 테두리의 베젤, 평행한 금속 벽 사이의 채널 세팅 예시",
      "caption": "왼쪽부터 프롱·베젤·채널 세팅의 외관 예시입니다. 특정 제품의 품질이나 연결 구조를 검증한 사진은 아닙니다.",
      "width": 1024,
      "height": 1024
    },
    "table": {
      "headers": [
        "세팅",
        "보석을 잡는 방식",
        "외관에서 비교할 점"
      ],
      "rows": [
        [
          "프롱",
          "작은 금속 발로 고정",
          "보석이 드러나는 면적과 금속 발의 높이"
        ],
        [
          "베젤",
          "금속 테두리로 전체 또는 일부를 감쌈",
          "테두리 두께와 보석 가장자리의 노출"
        ],
        [
          "채널",
          "평행한 금속 벽 사이에 배열",
          "이어지는 금속 선과 표면 높이"
        ]
      ]
    }
  },
  {
    "title": "잠금장치는 여닫는 방법부터 확인하세요",
    "paragraphs": [
      "Blue Nile의 팔찌 안내에는 박스 안에 납작한 금속 혀를 넣어 잠그는 방식과 별도 안전장치가 소개돼 있습니다. 제품에 따라 구조가 다르므로 판매자에게 여닫는 시범을 요청하고, 주 잠금장치와 보조 걸쇠를 구분해 보세요.",
      "착용해 볼 때는 떨어뜨리지 않도록 부드러운 받침 위에서 여닫으세요. 잠근 뒤 손목을 천천히 움직여 과하게 밀리거나 연결부가 뻣뻣하게 걸리는지 확인합니다. 잠금 소리가 난다는 이유만으로 상태가 정상이라고 판단하지 마세요."
    ],
    "bullets": [
      "주 잠금장치가 완전히 결합됐는지 확인합니다.",
      "보조 안전장치가 있다면 닫는 순서와 해제 방법을 익힙니다.",
      "움직임 중 저절로 풀리거나 걸리는 부분이 있으면 착용을 멈춥니다.",
      "보석을 손으로 흔들어 시험하거나 잠금장치를 도구로 조이지 마세요."
    ],
    "table": null
  },
  {
    "title": "비교 사진과 질문을 함께 준비하세요",
    "paragraphs": [
      "상담 전 마음에 드는 팔찌 사진 한두 장을 골라, 보석이 잘 드러나는 모습이 좋은지 금속 테두리가 있는 모습이 좋은지 적어 보세요. 세팅 이름을 정확히 몰라도 사진에서 원하는 부분을 표시하면 설명하기 쉽습니다.",
      "매장에서 비교할 때는 같은 조명 아래 앞면과 옆면을 보고, 직접 여닫을 수 있는지 확인하세요. 사진으로 문의한다면 아래 질문을 함께 보내면 됩니다. 원하는 디자인의 제작 가능 여부와 조건은 상담에서 확인하세요."
    ],
    "bullets": [
      "이 제품의 보석 종류와 금속 소재는 무엇인가요?",
      "사진에서 보이는 세팅과 실제 연결부는 어떤 형태인가요?",
      "혼자 착용할 때 잠금과 해제가 가능한 구조인가요?",
      "길이를 고르거나 상태를 점검할 때 무엇을 확인해야 하나요?"
    ],
    "table": null
  }
]
const cautions = [
  "보석이 들뜨거나 잠금이 느슨해 보이면 계속 착용하지 말고 상태를 확인받으세요. GIA는 잠금장치·안전장치·세팅을 주기적으로 점검하도록 안내합니다.",
  "이미지는 구조와 외관을 이해하기 위한 예시입니다. 사진만으로 보석의 진위, 결합 상태나 내구성을 판정할 수 없습니다."
]
const relatedLinks = [
  {
    "to": "/guide/bracelet-size-measuring-guide",
    "label": "팔찌 사이즈 재는 법",
    "description": "손목 둘레와 실제 착용 길이를 구분해 팔찌 치수를 확인하는 방법을 정리했습니다."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서 차이",
    "description": "다이아몬드와 유색 보석의 보고서에서 확인할 항목을 정리했습니다."
  },
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "보석의 경도·인성·안정성",
    "description": "보석을 고를 때 경도만으로 판단하기 어려운 이유와 착용 환경을 살펴봅니다."
  },
  {
    "to": "/guide/custom-gold-bracelet-order",
    "label": "금팔찌 주문제작 기준",
    "description": "팔찌 길이와 굵기, 체인과 잠금장치를 정할 때 확인할 항목을 안내합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '테니스 팔찌 뜻, 세팅·잠금장치 선택법'
const gmArticleLead = '테니스 팔찌는 작은 보석을 연속으로 연결해 손목을 감싸는 유연한 라인형 팔찌입니다. 이름은 디자인을 가리키므로 보석과 금속 소재는 따로 확인해야 합니다. 사진에서 보이는 반짝임과 함께 세팅, 연결부, 잠금장치를 비교해 보세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '테니스 팔찌 뜻'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '테니스 팔찌 디자인과 소재 선택'
const gmHeroAlt = '작업대 위에 펼친 테니스 팔찌의 보석 배열과 열린 잠금장치, 주변의 측정 도구'
const gmHeroCaption = '테니스 팔찌의 배열과 연결부를 보여주는 예시 이미지입니다. 실제 판매 제품이나 측정 결과를 뜻하지 않습니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '배열과 세팅의 정의는 GIA 구매 안내, 점검 권고는 GIA 안전장치 안내, 박스 잠금의 작동 설명은 Blue Nile 자료를 참고했습니다. 사진 비교와 상담 질문은 소비자가 제품별 차이를 확인할 수 있도록 구성했습니다.'
const gmSources = [
  {
    "label": "GIA — Tennis Bracelet Buying Guide",
    "url": "https://4cs.gia.edu/en-us/blog/tennis-bracelet-buying-guide/",
    "note": "테니스 팔찌의 정의와 프롱·베젤·채널 세팅 구조를 설명합니다."
  },
  {
    "label": "GIA — How the Tennis Bracelet Got Its Name",
    "url": "https://4cs.gia.edu/en-us/blog/tennis-bracelet-got-name/",
    "note": "보석 배열의 예시와 잠금장치·안전장치·세팅의 점검을 안내합니다."
  },
  {
    "label": "Blue Nile — Bracelets: Education & Buying Tips",
    "url": "https://www.bluenile.com/education/jewelry/bracelet-guide",
    "note": "박스 잠금과 보조 안전장치의 작동 방식을 설명합니다."
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
