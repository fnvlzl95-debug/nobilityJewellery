<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/cast-vs-handmade-custom-ring-consultation'
const pageTitle = '주물 반지와 핸드메이드 차이, 제작·마감 확인법 | 귀족'
const pageDescription = '주물 반지와 핸드메이드를 비교할 때 기본 형태를 만드는 공정과 수작업 마감을 나누어 확인하세요. 제작 범위, 표면 질감, 주문 기록에 남길 질문을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/cast-vs-handmade-custom-ring-consultation-hero-262a3ec2.webp`
const publishedAt = '2026-09-11'
const updatedAt = ''
const faqItems = [
  {
    "question": "주물 반지에도 손작업이 들어가나요?",
    "answer": "들어갈 수 있습니다. 주물로 기본 형태를 만든 뒤 세팅과 연마 같은 후속 작업을 진행할 수 있으므로, 손작업이 적용되는 부위를 확인하세요."
  },
  {
    "question": "핸드메이드 마감과 반지 전체의 수작업 제작은 같은 뜻인가요?",
    "answer": "구분해서 확인해야 합니다. 표면을 손으로 다듬는다는 설명과 재료를 성형·접합해 형태를 만든다는 설명은 서로 다른 작업을 가리킵니다. 반지 전체인지 특정 부품인지도 물어보세요."
  },
  {
    "question": "주물과 핸드메이드 중 어느 쪽을 골라야 하나요?",
    "answer": "명칭만으로 결정하기보다 원하는 디자인과 마감이 어떻게 구현되는지 확인하세요. 기본 형태 제작 방식, 손작업 범위, 완성품 확인 방법을 같은 항목으로 비교하는 것이 좋습니다."
  },
  {
    "question": "상담할 때 무엇을 준비하면 좋나요?",
    "answer": "원하는 디자인 사진에 표면 질감과 모서리 등 마음에 드는 부분을 표시해 두세요. 착용할 때 닿는 안쪽 면과 각인 주변처럼 별도로 확인할 부분도 적어 두면 좋습니다."
  }
]
const quickAnswers = [
  "주물은 반지의 기본 형태를 만드는 공정이며, 이후 세팅과 연마 등 다른 작업이 이어질 수 있습니다.",
  "수작업으로 형태를 만드는 것과 만들어진 반지를 손으로 마감하는 것은 구분해서 확인해야 합니다.",
  "주문 전에는 제작 방식, 손작업 부위, 원하는 표면 질감을 구체적으로 기록해 두세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "주물과 수작업 마감은 함께 쓰일 수 있습니다",
    "paragraphs": [
      "주물 제작은 주형을 이용해 금속의 기본 형태를 만드는 과정입니다. GIA의 주얼리 제조 현장 보고서는 왁스 모형 준비, 주조, 세팅, 최종 연마와 품질관리로 이어지는 흐름을 소개합니다. 주조가 끝났다고 완제품이 되는 것은 아닙니다.",
      "반지 안쪽과 작은 부품을 다듬는 벤치 작업도 별도로 이뤄집니다. GIA의 마감 교육 자료에서는 연마재와 회전 도구를 사용해 작업자가 표면을 조절하는 사례를 보여 줍니다. 따라서 주물 여부와 손으로 마감한 범위를 따로 확인하는 편이 공정을 이해하는 데 도움이 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "핸드메이드라는 설명에서 구분할 세 가지",
    "paragraphs": [
      "수작업으로 재료를 성형·접합해 형태를 만드는 작업과, 이미 만들어진 부품의 표면을 손으로 다듬는 작업은 다릅니다. GIA의 벤치 교육 사례에도 부품의 성형·접합 과정과 후속 마감이 구분되어 있습니다.",
      "핸드메이드라는 설명을 들었다면 아래 표처럼 어느 단계를 뜻하는지 물어보세요. 반지 전체에 관한 설명인지, 특정 부품이나 마감에 관한 설명인지도 함께 확인합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "구분",
        "설명을 들을 부분",
        "상담 질문"
      ],
      "rows": [
        [
          "주물 제작",
          "주형을 이용한 기본 형태 제작",
          "반지의 어떤 부분을 주물로 만드나요?"
        ],
        [
          "수작업으로 형태 제작",
          "재료를 성형하거나 접합하는 작업",
          "어느 부품을 어떤 방식으로 직접 만드나요?"
        ],
        [
          "수작업 마감",
          "표면과 세부 부위의 다듬기·연마",
          "안쪽 면과 모서리는 어떻게 마감하나요?"
        ]
      ]
    }
  },
  {
    "title": "원하는 마감은 사진의 위치를 짚어 설명하세요",
    "paragraphs": [
      "마음에 드는 반지 사진에서 좋아하는 부분을 표시해 두세요. 광택이 있는 바깥면인지, 질감이 남은 표면인지, 각이 살아 있는 모서리인지 구분하면 상담에서 확인할 내용이 분명해집니다.",
      "사진 한 장으로 완성 상태를 모두 판단하려 하지 말고, 가능한 경우 실제 샘플이나 여러 각도의 사진을 요청하세요. 손가락에 닿는 안쪽 면은 별도로 보여 달라고 하면 좋습니다."
    ],
    "bullets": [
      "바깥면: 유광·무광 등 원하는 표면 느낌을 표시합니다.",
      "모서리: 둥근 느낌과 각이 있는 느낌 중 원하는 쪽을 설명합니다.",
      "안쪽 면: 착용 시 닿는 부분의 마감과 확인 방법을 묻습니다.",
      "각인·세팅 주변: 유지하고 싶은 선과 표현을 사진에 표시합니다."
    ],
    "table": null
  },
  {
    "title": "주문 확정 전에 남길 확인 내용",
    "paragraphs": [
      "상담이 끝나면 들은 제작 방식과 요청한 마감이 주문 내용에 기록되는지 확인하세요. 견적을 비교할 때도 같은 디자인과 마감 범위를 기준으로 설명을 요청하는 편이 좋습니다.",
      "예를 들어 “사진의 바깥면 광택과 둥근 모서리를 원합니다. 기본 형태 제작 방식과 손으로 마감하는 부위를 알려주시고, 가능한 범위를 주문 내용에 남겨 주세요”라고 요청할 수 있습니다. 이는 상담용 예시이며 특정 공정이나 주문 조건을 약속하는 문구는 아닙니다."
    ],
    "bullets": [
      "기본 형태를 만드는 방식과 적용 부위",
      "수작업으로 다듬을 면과 세부 부분",
      "원하는 질감과 참고 사진에서 표시한 위치",
      "완성 후 확인 방법과 수정 요청 가능 범위"
    ],
    "table": null
  }
]
const cautions = [
  "주물·핸드메이드라는 이름만으로 품질이나 내구성의 우열을 단정하지 마세요.",
  "이 글은 공정을 구분하기 위한 안내입니다. 귀족의 실제 제작 방식, 작업 범위와 주문 조건은 디자인별 상담에서 확인해 주세요."
]
const relatedLinks = [
  {
    "to": "/guide/custom-ring-consultation-checklist",
    "label": "일반 반지 주문제작 상담 체크리스트",
    "description": "주문 전 정할 내용과 주문 확정 전에 문서로 확인할 항목을 정리했습니다."
  },
  {
    "to": "/guide/jongno-custom-couple-ring-order",
    "label": "종로 커플링 주문제작, 상담부터 수령까지 확인할 것",
    "description": "소재, 폭, 두께, 호수, 마감과 각인 등 주문 상담에서 확인할 내용을 정리했습니다."
  },
  {
    "to": "/guide/custom-earrings-production-time",
    "label": "귀걸이 주문제작 기간, 디자인 확정부터 한쌍 수령까지",
    "description": "모델 제작, 주조, 조립, 세팅과 마감으로 이어지는 주문제작 단계를 살펴봅니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '주물 반지와 핸드메이드 차이, 제작·마감 확인법'
const gmArticleLead = '주문제작 반지에 손작업이 들어간다고 해서 모든 단계가 같은 방식으로 진행되는 것은 아닙니다. 주물로 형태를 만든 뒤 손으로 마감할 수도 있습니다. 상담에서는 기본 형태를 만드는 방법과 완성 표면을 다듬는 범위를 나누어 물어보세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '주물 반지 핸드메이드 차이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '주물 제작과 수작업 마감의 범위 확인'
const gmHeroAlt = '작업대 위에 놓인 왁스 반지 모형과 금속 반지, 줄과 연마 도구가 제작 단계별로 배치된 모습'
const gmHeroCaption = '왁스 모형, 금속 반지와 마감 도구를 배치한 공정 이해용 예시 이미지입니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '아래 GIA 자료의 제조 흐름과 벤치 마감 사례를 참고했습니다. 표와 질문 예시는 이 공정 구분을 주문 상담에 적용하기 위해 정리한 내용입니다.'
const gmSources = [
  {
    "label": "Gemological Institute of America, Shenzhen: The Frontier of China’s Gem and Jewelry Industry",
    "url": "https://www.gia.edu/gia-news-research/shenzhen-china-gem-jewelry-industry",
    "note": "주형 선택, 왁스 제작, 주조, 세팅, 최종 연마와 품질관리로 이어지는 주얼리 제조 흐름을 설명합니다."
  },
  {
    "label": "Gemological Institute of America, Bench Tip #6: Use a Split Mandrel for Finishing Round Bezels",
    "url": "https://www.gia.edu/UK-EN/bench-tip-use-split-mandrel-finishing-round-bezels",
    "note": "벤치 주얼러가 반지 안쪽과 작은 부위를 연마재와 수공구로 마감하는 사례를 보여 줍니다."
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
