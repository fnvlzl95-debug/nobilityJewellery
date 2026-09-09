<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/couple-ring-finger-placement'
const pageTitle = '커플링은 어느 손가락에 낄까 | 귀족'
const pageDescription = '커플링과 결혼반지는 착용 손가락만으로 확정해 구분하기 어렵습니다. 대표적인 착용 관습과 두 반지의 의미 차이, 상담 전 확인할 내용을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/couple-ring-finger-placement-hero-5e9b2e70.webp`
const publishedAt = '2026-09-09'
const updatedAt = ''
const faqItems = [
  {
    "question": "커플링은 꼭 왼손 약지에 껴야 하나요?",
    "answer": "아닙니다. 국제적으로 통일된 공식 착용 손가락은 없으므로 연인의 합의와 착용감에 따라 왼손이나 오른손 약지, 다른 손가락을 선택할 수 있습니다."
  },
  {
    "question": "오른손 약지에 낀 반지는 결혼반지인가요?",
    "answer": "반지의 위치만으로는 알 수 없습니다. 지역과 문화에 따라 결혼반지를 오른손에 끼는 사례도 있지만, 착용자의 설명과 반지의 의미를 함께 확인해야 합니다."
  },
  {
    "question": "커플링과 결혼반지는 디자인으로 구분할 수 있나요?",
    "answer": "디자인이나 금속만으로 확정하기 어렵습니다. 두 반지 모두 비슷한 형태일 수 있으므로 맞춘 목적과 착용자가 사용하는 명칭을 확인하는 것이 적절합니다."
  },
  {
    "question": "결혼반지와 커플링을 같은 약지에 껴도 되나요?",
    "answer": "가능합니다. 다만 반지끼리 부딪히거나 착용감이 달라질 수 있으므로 폭과 두께, 표면 형태, 손가락 치수를 함께 확인하는 것이 좋습니다."
  }
]
const quickAnswers = [
  "커플링은 왼손이나 오른손 약지에 낄 수 있지만, 정해진 공식 손가락은 없습니다.",
  "결혼반지는 서구권에서 왼손 약지에 끼는 관습이 널리 알려졌지만 지역과 문화에 따라 오른손에 끼기도 합니다.",
  "커플링과 결혼반지는 같은 약지에 낄 수도 있어 손가락만으로 구분하지 말고 반지의 의미와 착용자의 설명을 확인해야 합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "커플링은 어느 손가락에 낄까",
    "paragraphs": [
      "커플링이라는 명칭에는 국제적으로 통일된 착용 손가락이나 결혼 여부를 표시하는 공식 기준이 없습니다. 연인이 합의해 왼손 또는 오른손 약지에 착용하거나, 활동성과 착용감을 고려해 다른 손가락을 선택할 수 있습니다.",
      "약속을 기념하는 반지는 관계를 진지하게 이어가겠다는 의미로 설명될 수 있지만, 그 자체가 결혼을 의미하는 반지는 아닙니다. 따라서 손가락보다 두 사람이 정한 의미와 착용 목적이 더 중요한 기준이 됩니다."
    ],
    "bullets": [
      "왼손 약지: 결혼 관련 반지와 겹칠 수 있어 의미를 설명해 두는 것이 좋습니다.",
      "오른손 약지: 결혼반지와 구분하거나 개인적인 약속을 표현하려는 선택이 될 수 있습니다.",
      "다른 손가락: 손가락 굵기, 직업, 활동량, 착용감에 따라 선택할 수 있습니다."
    ],
    "table": null
  },
  {
    "title": "결혼반지는 어디에 끼는가",
    "paragraphs": [
      "결혼반지는 서구권 관습상 왼손 네 번째 손가락인 약지에 착용하는 경우가 널리 알려져 있습니다. 약혼반지와 결혼반지를 함께 착용하는 방식도 이 관습을 바탕으로 설명됩니다.",
      "다만 착용 손은 문화와 지역에 따라 달라질 수 있습니다. 러시아, 독일, 폴란드, 그리스, 인도 등에서는 오른손 착용 사례가 알려져 있으므로, 왼손 약지만을 결혼반지의 절대 기준으로 보기는 어렵습니다."
    ],
    "bullets": [
      "서구권의 대표적 관습은 왼손 약지 착용입니다.",
      "일부 지역에서는 오른손 약지 착용이 흔한 사례로 소개됩니다.",
      "개인의 종교, 가족 관습, 지역 문화에 따라 선택이 달라질 수 있습니다."
    ],
    "table": null
  },
  {
    "title": "커플링과 결혼반지 구분 기준",
    "paragraphs": [
      "커플링과 결혼반지는 같은 약지에 착용할 수도 있으므로 손가락만으로 확정적으로 구분할 수 없습니다. 반지의 디자인이나 금속만으로도 결혼 여부를 단정하기 어렵습니다.",
      "구분이 필요하다면 반지를 맞춘 목적, 두 사람이 사용하는 명칭, 결혼식이나 혼인과 연결된 반지인지 여부를 확인하는 편이 적절합니다. 외부에서 반지만 보고 관계를 판단할 때에는 착용자의 설명을 우선해야 합니다."
    ],
    "bullets": [
      "커플링: 연인 간의 애정이나 약속을 기념하는 의미로 설명할 수 있습니다.",
      "결혼반지: 결혼과 관련된 관계를 기념하는 반지로 사용됩니다.",
      "같은 손가락에 낄 수 있으므로 착용 위치만으로 의미를 단정하지 않습니다."
    ],
    "table": {
      "headers": [
        "구분",
        "커플링",
        "결혼반지"
      ],
      "rows": [
        [
          "주요 의미",
          "연인 간의 애정이나 약속을 기념",
          "결혼과 관련된 관계를 기념"
        ],
        [
          "착용 손가락",
          "합의에 따라 약지나 다른 손가락",
          "지역과 문화에 따라 왼손 또는 오른손 약지"
        ],
        [
          "구분 방법",
          "착용 목적과 두 사람의 설명 확인",
          "결혼과 연결된 의미와 착용자의 설명 확인"
        ],
        [
          "공통점",
          "같은 약지에 착용할 수 있음",
          "같은 약지에 착용할 수 있음"
        ]
      ]
    }
  },
  {
    "title": "커플링 상담 전에 정할 내용",
    "paragraphs": [
      "커플링을 고를 때는 먼저 어느 손에 낄지 정하기보다 두 사람이 원하는 의미와 실제 착용 환경을 함께 이야기하는 것이 좋습니다. 같은 손가락에 낄 계획이라면 폭과 두께, 다른 반지와의 간섭 여부도 함께 살펴야 합니다.",
      "상담할 때에는 원하는 손가락, 평소 착용할 반지, 손을 많이 사용하는 활동, 두 반지의 통일 정도를 전달하면 선택지를 비교하기 쉽습니다. 손가락 치수는 시간과 컨디션에 따라 다르게 느껴질 수 있으므로 실제 착용감을 확인하는 과정이 필요합니다."
    ],
    "bullets": [
      "두 사람이 같은 손가락에 낄지 각자 다르게 낄지 정합니다.",
      "결혼반지와 함께 착용할 가능성이 있는지 말합니다.",
      "반지 폭과 표면 마감, 보석 유무, 착용감을 함께 비교합니다.",
      "손을 많이 쓰는 직업이나 운동 여부를 상담 시 알립니다."
    ],
    "table": null
  }
]
const cautions = [
  "왼손 약지에 낀 반지라고 해서 반드시 결혼반지라고 단정할 수 없습니다.",
  "커플링의 의미와 결혼 여부는 착용자의 합의와 설명에 따라 달라질 수 있으므로 외부에서 반지만 보고 판단하지 않는 것이 좋습니다.",
  "제시된 착용 관습은 지역과 문화에 따라 달라질 수 있으며, 모든 사람에게 동일하게 적용되는 규칙은 아닙니다."
]
const relatedLinks = [
  {
    "to": "/guide/jongno-couple-ring-price-consultation-prep",
    "label": "종로 커플링 가격 상담 전 정할 것",
    "description": "종로 커플링 상담에서 금속, 폭, 보석, 세팅, 착용감과 두 반지의 통일 정도를 정리하는 방법을 안내합니다."
  },
  {
    "to": "/guide/silver-ring-rhodium-plating-guide",
    "label": "은반지 로듐 도금과 재도금 기준",
    "description": "은반지의 로듐 도금 목적과 외관 변화, 재도금 상담 전에 확인할 내용을 정리합니다."
  },
  {
    "to": "/guide/plated-jewelry-discoloration-care-guide",
    "label": "도금 변색, 닦기 전 원인 확인",
    "description": "도금 반지의 오염과 도금 마모를 구분하고 관리 전 확인할 사항을 안내합니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '커플링은 어느 손가락에 낄까'
const gmArticleLead = '커플링은 정해진 손가락이 있는 반지가 아니므로 연인의 합의에 따라 왼손이나 오른손 약지, 또는 다른 손가락에 착용할 수 있습니다. 결혼반지도 지역과 문화에 따라 착용 손이 달라질 수 있어 손가락보다 반지의 의미와 착용자의 설명을 함께 확인하는 것이 적절합니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '커플링 손가락'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '커플링 착용 손가락과 결혼반지 구분 상담'
const gmHeroAlt = '돌 표면 위의 투톤 커플링 두 개와 약지에 같은 반지를 착용한 두 사람의 손'
const gmHeroCaption = '커플링은 착용자의 합의와 반지의 의미를 함께 고려해 선택합니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '착용 관습과 약속 반지의 의미는 Gemological Institute of America의 공개 자료를 바탕으로 정리했습니다. 커플링이라는 명칭에 대한 적용은 약속 반지 관련 설명의 범위로 제한했습니다.'
const gmSources = [
  {
    "label": "Gemological Institute of America, How to Wear Your Engagement Ring and Wedding Band",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-wear-engagement-ring-wedding-band/",
    "note": "결혼반지와 약혼반지의 대표적인 착용 관습, 지역별 착용 손의 차이를 설명합니다."
  },
  {
    "label": "Gemological Institute of America, Guide to Promise Ring Meaning",
    "url": "https://4cs.gia.edu/en-us/blog/guide-to-promise-ring-meaning/",
    "note": "결혼을 의미하지 않는 약속 반지의 의미와 착용 손가락이 다양할 수 있음을 설명합니다."
  },
  {
    "label": "Gemological Institute of America, Engagement Rings through the Ages",
    "url": "https://www.gia.edu/gia-news-research-engagement-rings-through-ages",
    "note": "약혼과 결혼 관련 반지를 왼손 약지에 착용하는 역사적 관습을 설명합니다."
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
