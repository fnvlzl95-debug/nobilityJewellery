<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/amethyst-ring-color-aaa-selection'
const pageTitle = '자수정 반지, 색과 AAA 표기 확인법 | 귀족'
const pageDescription = '자수정 반지는 보라색의 진하기와 색 분포, AAA 표기의 기준을 나누어 확인하세요. 판매처 품질 표현과 감별 자료의 차이, 실제 후보 비교와 착용·관리 조건을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/amethyst-ring-color-aaa-selection-hero-95390707.webp`
const publishedAt = '2026-10-29'
const updatedAt = ''
const faqItems = [
  {
    "question": "자수정 AAA는 GIA가 매긴 등급인가요?",
    "answer": "AAA라는 표기만으로 GIA 등급이라고 볼 수 없습니다. GIA는 자수정에 공통 표준 품질 등급 체계가 없고 업체들이 자체 표현을 사용할 수 있다고 안내합니다. 해당 판매처가 어떤 기준으로 붙인 표기인지 확인하세요."
  },
  {
    "question": "자수정 반지는 색이 가장 진한 것으로 고르면 되나요?",
    "answer": "진하기만으로 고르기보다 약한 조명에서도 원하는 보라색으로 보이는지 확인하세요. 너무 어두운 자수정은 검게 느껴질 수 있으므로, 색의 밝기와 분포를 실제 후보에서 함께 비교하는 것이 좋습니다."
  },
  {
    "question": "AAA 자수정이면 천연이고 처리도 없는 건가요?",
    "answer": "AAA라는 자체 품질 표현이 천연이나 무처리를 증명하지는 않습니다. 천연 여부와 처리 내용은 별도로 질문하고, 확인 자료가 있다면 선택할 보석과 연결되는 내용인지 살펴보세요."
  },
  {
    "question": "자수정 반지를 초음파 세척기에 넣어도 되나요?",
    "answer": "염색이나 균열 충전 등의 예외와 완성 반지의 상태를 먼저 확인해야 합니다. 처리 여부와 세팅 상태를 모른 채 사용하기보다 판매처에 해당 제품의 세척 가능 조건을 문의하세요."
  }
]
const quickAnswers = [
  "자수정의 AAA·AA·A는 업체별 품질 표현일 수 있습니다. 서로 다른 판매처의 AAA를 같은 등급이라고 놓고 가격만 비교하지 마세요.",
  "진한 자수정도 약한 빛에서는 너무 어둡게 보일 수 있습니다. 밝은 조명 사진뿐 아니라 평소 착용할 환경에서 보라색이 어떻게 보이는지 확인하세요.",
  "반지 후보를 정할 때는 보석의 실제 치수와 세팅 높이, 안내받은 처리 여부를 함께 적어 두세요. 관리 방법도 그 후보의 상태와 완성품 구성을 기준으로 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "자수정 AAA는 공통으로 쓰는 감정 등급인가요?",
    "paragraphs": [
      "자수정의 AAA 표기를 공통 품질 등급으로 받아들이면 안 됩니다. GIA 구매 안내는 업체들이 AAA·AA·A 같은 자체 품질 표현을 만들 수 있지만, 자수정에는 표준화된 품질 등급 체계가 없다고 설명합니다. 따라서 A업체의 AAA와 B업체의 AAA가 같은 조건이라는 전제로 비교하기 어렵습니다.",
      "AAA가 적혀 있다면 “이 표기는 색, 투명도, 연마 중 무엇을 기준으로 하나요?”라고 물어보세요. 등급 이름보다 실제 설명과 후보의 모습이 비교에 도움이 됩니다. 자체 표기가 있다는 이유로 제품이 나쁘다고 판단할 필요도 없습니다. 그 표현이 뜻하는 범위를 확인하면 됩니다.",
      "판매처의 품질 표현과 보석의 천연 여부를 확인하는 자료는 나누어 보세요. AAA라는 글자만으로 천연·무처리가 증명되지는 않습니다. 천연 자수정을 원하는 경우 어떤 확인 자료가 있는지 물어보고, 보고서가 제공된다면 해당 보석을 대상으로 무엇을 확인한 문서인지 살펴보세요. 모든 자수정 제품에 감별 보고서가 기본으로 포함된다고 가정하지는 마세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "자수정은 보라색이 진할수록 좋은가요?",
    "paragraphs": [
      "자수정은 보라색 석영이며 색의 범위가 넓습니다. GIA는 선명한 보라색이나 붉은 기가 도는 보라색, 눈에 띄는 색 구역이 없는 모습을 주요 품질 요소로 설명합니다. 다만 색이 지나치게 어두우면 약한 조명에서 검게 보일 수 있다고도 안내합니다. 진하기 하나만 높이는 방식으로 후보를 고르지는 마세요.",
      "보석 안에 옅은 보라색과 짙은 보라색이 구역처럼 나뉘어 보이는지도 살펴보세요. 이는 색의 분포를 보는 항목입니다. 반사광 때문에 한 장의 사진에서 밝고 어둡게 보이는 것과 구분하기 어려우면, 각도를 바꾼 모습이나 실물을 확인하세요. 사진에 보이는 줄 하나로 균열이나 가짜라고 판정할 수는 없습니다.",
      "연한 라일락빛을 좋아하는 취향과 시장에서 평가하는 품질 요소도 구분할 수 있습니다. “검게 느껴질 만큼 진한 색은 피하고 싶다”, “옅더라도 맑은 보라색이 좋다”처럼 원하는 인상을 적어 보세요. 선호하는 색 범위를 정한 다음, 그 범위 안에서 색 분포와 눈에 보이는 내포물, 표면 상태를 비교하면 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "실제 자수정 반지 후보는 어떤 순서로 비교하나요?",
    "paragraphs": [
      "먼저 비교 사진이 실제 선택할 보석인지 확인한 뒤, 보석과 반지 전체를 나누어 보세요. 나석 사진만으로 후보를 골랐다면 완성 반지에서 보석이 어느 정도 높이로 올라오는지, 손가락 위에서 차지하는 크기는 어떤지도 확인해야 합니다. 아래 표는 감정 등급표가 아니라 구매 상담 때 남길 질문입니다.",
      "GIA 품질 안내에는 자수정의 색을 바꾸는 열처리·염색과 드물게 시행되는 균열 충전 사례가 설명돼 있습니다. 이 사실이 모든 후보에 같은 처리가 있었다는 뜻은 아닙니다. 선택할 보석에 관해 안내된 처리 내용과 확인되지 않은 부분을 구분해 물어보세요. 사진만으로 처리 여부를 알아내려 하기보다 판매 설명과 해당 확인 자료를 함께 보는 편이 좋습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 항목",
        "후보끼리 비교할 내용",
        "상담 질문 예시"
      ],
      "rows": [
        [
          "판매처 품질 표현",
          "AAA·AA 등 표기를 붙인 기준",
          "이 등급에서 색과 내포물은 어떤 기준으로 선별하나요?"
        ],
        [
          "실제 보라색",
          "평소 조명에서의 밝기와 색 분포",
          "어두운 실내에서도 보라색이 잘 보이는 후보인가요?"
        ],
        [
          "보석의 치수",
          "가로·세로·깊이와 원하는 모양",
          "캐럿 외에 실제 치수를 알 수 있나요?"
        ],
        [
          "보석 정보",
          "천연 여부, 처리 설명, 제공되는 자료",
          "이 보석에 대해 확인된 처리 내용은 무엇인가요?"
        ],
        [
          "완성 반지의 구조",
          "보석 높이, 고정 부분, 밴드와의 비율",
          "측면에서 보이는 높이와 착용 모습을 확인할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "자수정 반지를 일상에서 착용해도 되나요?",
    "paragraphs": [
      "일상 착용용 반지로 고려할 수 있지만 흠집이나 손상에 강한 정도를 과신하지 마세요. GIA는 자수정의 모스 경도를 7로 안내하며, 경도의 한계를 이해하고 관리할 때 반지로도 사용할 수 있다고 설명합니다. 손을 쓰는 작업이 많은지 알려 주고, 보석의 돌출 높이와 보호되는 부분을 함께 상담하세요.",
      "급격한 온도 변화는 균열의 원인이 될 수 있고, 일부 자수정은 강한 빛에 오래 노출되면 색이 옅어질 수 있습니다. 뜨거운 증기로 세척하거나 강한 열을 가하는 방법은 피하세요. 햇빛이 잠깐 닿는 것만으로 바로 변색된다는 뜻은 아닙니다. 강한 빛과 열에 장시간 두는 보관 환경을 피하는 데 초점을 두면 됩니다.",
      "GIA는 자수정 세척에 미지근한 비눗물을 안내하지만 완성 반지는 금속·부속과 현재 상태도 함께 고려해야 합니다. 초음파 세척에는 염색이나 균열 충전된 보석 등의 예외가 있으므로, 처리 여부를 모르면 먼저 판매처에 확인하세요. 구매할 때 해당 제품에 허용되는 세척 방법을 받아 두면 관리하기 편합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 자수정 반지 상담은 무엇을 준비하나요?",
    "paragraphs": [
      "원하는 보라색의 참고 사진, 반지 모양, 예산과 알고 있는 호수를 보내 주세요. AAA라는 표기를 지정하기보다는 옅은 색과 진한 색 중 어느 쪽을 좋아하는지, 색 구역이 눈에 띄는 모습은 어느 정도까지 괜찮은지 설명해 보세요. 참고 사진이 실제 판매 제품인지 분위기 예시인지도 구분해 적으면 좋습니다.",
      "문의 예시: “타원형 자수정 한 알이 중심인 반지를 생각하고 있습니다. 아주 어두운 보라색보다 실내에서도 색이 보이는 후보를 보고 싶어요. 천연 여부와 처리에 관한 설명도 확인하고 싶습니다. 예산은 ○○원 안팎이고 호수는 ○호입니다. 자수정 후보와 너무 높지 않은 반지 구성을 상담받을 수 있을까요?”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 사진을 보내 주세요. 상담 가능한 보석과 디자인 범위를 확인한 뒤, 실제 선택한 후보의 사양과 금속·세팅을 기준으로 견적과 일정을 안내받으시면 됩니다. 원하는 색상이나 크기의 재고·제작 가능 여부는 상담 시 확인해야 합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "자수정의 AAA 표기나 산지 이름만으로 품질·천연 여부·처리를 확정할 수는 없습니다. 선택할 보석의 실제 모습과 설명, 제공되는 자료를 확인하세요.",
  "색 비교 사진은 조명과 화면에 따라 다르게 보일 수 있습니다. 이 글의 비교표는 구매 질문을 정리한 예시이며 감별이나 품질 판정을 대신하지 않습니다."
]
const relatedLinks = [
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 감정서·감별서의 확인 범위",
    "description": "품질 표현과 보석의 정체를 확인하는 자료를 구분해 보세요."
  },
  {
    "to": "/guide/gemstone-durability-for-ring-selection",
    "label": "반지용 보석의 내구성 확인",
    "description": "경도뿐 아니라 충격과 착용 환경도 함께 고려하세요."
  },
  {
    "to": "/guide/birthstone-necklace-gift-guide",
    "label": "다른 탄생석과 선물 선택 비교",
    "description": "자수정 외의 보석과 선물용 주얼리 선택 기준을 살펴보세요."
  },
  {
    "to": "/custom",
    "label": "자수정 반지 보석·디자인 상담",
    "description": "좋아하는 보라색과 모양, 예산을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "중심 보석과 밴드의 전체적인 비율을 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '자수정 반지, 색과 AAA 표기 확인법'
const gmArticleLead = '자수정 반지는 보라색의 진하기만 보고 고르기보다, 실제 착용할 때의 색과 판매 설명을 함께 비교하세요. AAA는 자수정에 공통으로 적용되는 표준 품질 등급이 아닙니다. 판매처가 어떤 기준으로 붙인 표현인지 확인하고, 마음에 드는 보석의 색 분포·치수·천연 및 처리 여부를 따로 살펴보는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '자수정 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '자수정 반지 보석·디자인 상담'
const gmHeroAlt = '타원형 보라색 보석 한 알을 네 개의 금색 발로 고정한 반지의 AI 디자인 예시'
const gmHeroCaption = '자수정 반지의 색과 구성을 설명하기 위한 AI 생성 이미지입니다. 실제 보석 샘플·판매 제품·제작 사례가 아니며, 천연 여부나 품질 등급을 보여 주는 자료가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '자수정의 품질 표현과 재료 특성은 GIA 자료를 참고했습니다. 후보 비교표와 상담 문장은 원하는 반지를 고르기 위한 편집 예시이며, 실제 보석의 품질 판정은 아닙니다.'
const gmSources = [
  {
    "label": "GIA — 자수정 구매와 AAA 표기 안내",
    "url": "https://www.gia.edu/amethyst/buyers-guide",
    "note": "업체별 AAA 표기와 보석 확인 자료의 역할을 참고했습니다."
  },
  {
    "label": "GIA — 자수정의 색 분포와 품질 요소",
    "url": "https://www.gia.edu/amethyst-quality-factor",
    "note": "색 분포, 너무 어두운 색의 인상과 처리 사례를 참고했습니다."
  },
  {
    "label": "GIA — 자수정의 경도와 관리",
    "url": "https://www.gia.edu/amethyst-care-cleaning",
    "note": "반지 착용과 빛·열·세척 관련 주의점을 참고했습니다."
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
