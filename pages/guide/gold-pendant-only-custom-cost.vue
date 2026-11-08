<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/gold-pendant-only-custom-cost'
const pageTitle = '금 펜던트 주문제작 비용, 체인 제외 견적 | 귀족'
const pageDescription = '금 펜던트만 주문할 때는 본체·고리·보석·각인과 보유 체인 연결 작업의 포함 여부를 확인하세요. 체인 제외 견적과 새 목걸이 견적을 같은 조건으로 비교하는 표, 종로 귀족 상담 준비를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/gold-pendant-only-custom-cost-hero.webp`
const publishedAt = '2026-11-08'
const updatedAt = ''
const faqItems = [
  {
    "question": "금 펜던트만 주문하면 금값을 빼고 공임만 내나요?",
    "answer": "체인을 제외하는 것과 펜던트의 재료비를 제외하는 것은 다릅니다. 새로 만드는 펜던트의 금속·보석과 제작 작업이 견적에 어떻게 포함되는지 확인하세요. 가지고 있는 금을 활용하려면 별도의 리폼 상담으로 구분합니다."
  },
  {
    "question": "펜던트 사진에 체인이 보이면 견적에도 포함되나요?",
    "answer": "사진만으로 포함 여부를 알 수 없습니다. 펜던트 단품인지 목걸이 전체인지 먼저 확인하고, 새 체인이 포함된다면 소재·길이·잠금장치 구성도 함께 안내받으세요."
  },
  {
    "question": "기존 체인을 쓰면 어떤 사진이 필요한가요?",
    "answer": "체인 전체, 잠금장치와 반대편 끝부분, 확인 가능한 소재 표시를 촬영해 보내세요. 새 펜던트 고리에 연결할 수 있는지와 연결·조정 작업의 견적 포함 여부를 상담할 수 있습니다."
  },
  {
    "question": "아직 체인을 고르지 않았는데 펜던트부터 제작해도 되나요?",
    "answer": "체인 계획을 알려주고 고리 규격을 언제 확정할지 먼저 상담하세요. 펜던트 완성 후 고른 체인의 끝부분이 통과하지 않을 수 있어, 사용할 체인과 연결 방식을 제작 전에 맞춰 확인하는 것이 좋습니다."
  },
  {
    "question": "금 펜던트 주문제작은 얼마나 걸리나요?",
    "answer": "귀족은 최소 3주를 기준으로 상담합니다. 디자인·소재·보석·각인과 체인 연결 작업 등 최종 조건에 따라 수령 일정이 달라지므로 필요한 날짜를 먼저 알려 주세요."
  }
]
const quickAnswers = [
  "체인을 제외해도 펜던트의 금속·보석·고리와 제작비는 남습니다. 공임만의 견적인지 완성 펜던트의 견적인지 먼저 구분하세요.",
  "기존 체인을 쓸 계획이라면 체인 연결 작업이 포함되는지 물어보세요. 펜던트 고리와 체인 끝부분이 맞지 않으면 제작 범위를 다시 정해야 할 수 있습니다.",
  "두 견적은 같은 펜던트 크기·소재·보석·마감을 기준으로 비교하세요. 한쪽에 새 체인이나 추가 각인이 포함됐다면 금액만 바로 비교하기 어렵습니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "체인 제외 견적에는 무엇이 포함되나요?",
    "paragraphs": [
      "“펜던트만 제작”이라는 말에는 서로 다른 주문이 섞일 수 있습니다. 완성된 펜던트만 받아 직접 체인에 끼우려는 경우와, 가지고 있는 체인에 연결하는 작업까지 맡기는 경우를 먼저 나누세요. 체인이 없는 경우에는 새 체인까지 구입할지 정해야 합니다.",
      "견적을 받을 때는 장식 본체뿐 아니라 체인을 거는 고리, 사용할 보석, 각인과 앞뒤 마감이 포함됐는지 확인하세요. 고리의 모양과 크기가 아직 미정이라면 그 조건을 정한 뒤에도 안내받은 금액이 같은지 물어보는 편이 좋습니다.",
      "아래 표는 상담할 작업을 나누기 위한 예시입니다. 각 항목에 별도 요금이 생긴다는 뜻은 아니며, 안내받은 총액에 어느 범위까지 포함됐는지 확인하는 데 사용하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 주문",
        "견적에서 확인할 범위",
        "함께 전달할 내용"
      ],
      "rows": [
        [
          "새 펜던트만 받기",
          "본체·고리·보석·각인·마감의 포함 여부",
          "사용할 체인이 있는지, 직접 끼울 수 있는 구성을 원하는지"
        ],
        [
          "새 펜던트를 보유 체인에 연결하기",
          "펜던트 제작과 기존 체인 연결·조정 작업의 포함 여부",
          "체인 전체와 끝부분 사진, 확인 가능한 소재 정보"
        ],
        [
          "펜던트와 새 체인을 함께 구입하기",
          "펜던트 외에 완성 체인·잠금장치가 포함되는지",
          "희망 체인 길이·형태·소재와 목걸이 전체 예산"
        ]
      ]
    }
  },
  {
    "title": "펜던트가 작아도 제작비가 달라지는 이유는?",
    "paragraphs": [
      "작아 보인다는 이유만으로 필요한 작업까지 적다고 판단하기는 어렵습니다. 본체의 앞뒤 형태, 보석을 고정할 부분, 고리와의 연결, 각인과 마감처럼 실제로 만들어야 할 요소를 함께 봐야 합니다. 금속 재료의 조건과 세공 작업을 나누어 질문해 보세요.",
      "GIA의 주얼리 디자인 교육도 크기·비례·요소의 관계를 비용·시간·제조 방식 등의 조건과 함께 다룹니다. 펜던트 상담에서도 정면 사진 하나보다는 옆면 두께와 뒷면 형태, 고리 구조를 정한 뒤 제작 범위를 비교하는 편이 도움이 됩니다.",
      "예를 들어 같은 타원형 윤곽이라도 매끈한 판으로 만드는 안과 도톰한 곡면을 가진 안은 확인할 구조가 다릅니다. 어느 안이 더 저렴하다고 미리 정하기보다, 원하는 모습과 실제 규격을 알려주고 각각에 필요한 소재와 작업을 확인하세요. 손그림이나 참고 사진이 있어도 제작 치수와 연결 구조를 검토하는 과정은 필요할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "보유한 체인을 쓰면 연결 비용은 빠지나요?",
    "paragraphs": [
      "보유 체인을 그대로 쓸 수 있는지는 새 펜던트와의 연결 조건을 확인한 뒤 판단합니다. 체인을 새로 구매하지 않는 것과, 연결·조정 작업이 필요 없는 것은 다른 문제입니다. 먼저 사용할 체인을 보여주고 펜던트를 그 체인에 맞춰 제작할 수 있는지 상담하세요.",
      "Rio Grande의 체인 가이드는 체인의 폭·두께뿐 아니라 끝 고리가 펜던트 고리를 통과하는지도 확인하도록 안내합니다. 체인 몸통은 가늘어도 끝부분이 통과하지 못할 수 있으므로, 상담 사진에는 목걸이 전체와 잠금장치 반대편 끝부분도 담아 주세요.",
      "고리를 바꾸거나 연결 부위를 조정해야 한다면 처음 견적에 그 작업이 포함됐는지 확인합니다. 기존 체인에 마모나 손상이 있다면 재사용 가능성부터 점검해야 합니다. 구체적인 호환 확인 항목은 아래 관련 글 ‘목걸이 줄 교체와 펜던트 호환’에서 이어 볼 수 있습니다."
    ],
    "bullets": [
      "새 펜던트 고리는 보유 체인을 기준으로 정한 규격인가요?",
      "기존 체인을 바꾸지 않고 연결할 수 있나요?",
      "연결 부위의 조정이 필요하다면 현재 견적에 포함돼 있나요?"
    ],
    "table": null
  },
  {
    "title": "두 견적을 같은 조건으로 비교하려면?",
    "paragraphs": [
      "먼저 두 안에서 유지할 펜던트 사양을 정하세요. 금속의 종류·색상, 본체 크기와 앞뒤 형태, 보석 유무, 고리와 마감이 같은지 확인한 다음 체인 관련 차이를 비교합니다. 재료나 디자인까지 함께 바뀌었다면 차액을 체인 가격만으로 해석하기 어렵습니다.",
      "가령 A안은 보유 체인을 그대로 쓰는 조건이고, B안은 새 체인까지 구입하는 조건일 수 있습니다. 이때 “A안에는 기존 체인에 연결하는 작업도 포함돼 있나요?”, “B안의 체인은 잠금장치까지 갖춘 완성 구성인가요?”라고 물어보세요. Rio Grande도 완성 체인과 잠금장치 부착이 필요한 체인을 구분해 설명합니다.",
      "처음 안내받은 조건과 최종 선택이 달라졌다면 바뀐 항목을 짧게 정리해 다시 확인하세요. 예를 들어 뒷면 각인을 추가했거나 고리를 크게 바꾸었다면, 변경 후 총액과 수령 일정을 함께 안내받는 것이 좋습니다. 따로 요청한 작업까지 포함된 최종 금액인지 확인하고 주문을 결정하세요."
    ],
    "bullets": [
      "같게 둘 항목: 펜던트 본체·금속·보석·고리·마감",
      "다르게 비교할 항목: 보유 체인 활용 또는 새 체인 포함",
      "마지막 확인: 추가 요청을 반영한 총액과 실제 수령 가능일"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 펜던트만 주문하려면 무엇을 보내나요?",
    "paragraphs": [
      "원하는 펜던트 사진이나 스케치에 “체인 제외” 또는 “기존 체인에 연결까지 희망”이라고 적어 주세요. 사용할 체인이 있다면 전체 사진, 잠금장치와 반대편 끝부분 사진, 알고 있는 소재 정보를 함께 보내면 됩니다. 펜던트 크기나 소재를 아직 정하지 못했다면 미정이라고 알려 주세요.",
      "문의 예시: “가지고 있는 금목걸이 체인에 달 타원형 펜던트만 새로 만들고 싶습니다. 참고 사진처럼 앞면은 매끈하게, 뒷면에는 짧은 각인을 원해요. 고리 제작과 기존 체인 연결까지 포함한 견적을 상담받고 싶습니다. 예산과 희망 수령일도 함께 보내드립니다.”",
      "귀족 주문제작은 최소 3주를 기준으로 상담합니다. 디자인·소재·보석·각인과 연결 작업을 정한 뒤 실제 수령 가능일을 확인하세요. 선물 날짜가 있다면 견적을 문의할 때 함께 알려 주세요.",
      "기존 금제품을 녹이거나 보석을 옮겨 쓰려는 경우에는 새 펜던트 단독 제작과 확인할 범위가 달라집니다. 보유 제품을 어떻게 활용하고 싶은지 먼저 알려주시고, 아래 금 리폼 비용 안내도 참고하세요. 서울 종로구 종로 173 종묘귀금속백화점 101호 귀족에 카카오톡으로 사진과 원하는 구성을 보내 상담할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "체인 제외 금액이 공임만의 견적이라는 뜻은 아닙니다. 새 펜던트의 금속·보석·고리·마감과 연결 작업 중 무엇이 포함됐는지 확인하세요.",
  "보유 체인의 사용 가능 여부와 추가 작업은 실제 구조·상태를 확인한 뒤 달라질 수 있습니다. 최종 사양을 정한 후 견적과 수령일을 다시 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "목걸이 줄 교체와 펜던트 호환",
    "description": "보유 체인과 펜던트 고리의 연결 조건을 자세히 확인하세요."
  },
  {
    "to": "/guide/gold-jewelry-remodeling-cost",
    "label": "가지고 있는 금을 활용하는 리폼 비용",
    "description": "새 금속으로 제작하는 주문과 기존 금을 활용하는 주문을 구분하세요."
  },
  {
    "to": "/guide/jongno-initial-necklace-custom-order",
    "label": "이니셜 펜던트 형태 고르기",
    "description": "글자형·네임형·각인형 중 원하는 장식의 모습을 정할 때 참고하세요."
  },
  {
    "to": "/custom",
    "label": "귀족 주문제작 상담 안내",
    "description": "참고 사진과 예산·희망 수령일로 제작 범위와 견적을 상담하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '금 펜던트 주문제작 비용, 체인 제외 견적'
const gmArticleLead = '금 펜던트 주문제작 비용은 본체·고리 제작, 보석, 각인·마감과 체인 연결 작업의 포함 범위를 정한 뒤 비교하세요. 이미 체인이 있어도 새 펜던트의 금속과 제작 작업은 필요하므로, 체인을 제외한 견적이 공임만의 금액이라는 뜻은 아닙니다. 처음 문의할 때 “기존 체인에 달 새 펜던트만 만들고 싶다”고 알려주면 상담 범위를 정하기 좋습니다.'
const gmArticleCategory = '비용'
const gmArticleKeyword = '금 펜던트 주문제작 비용'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '체인 제외 금 펜던트 제작 범위·견적 상담'
const gmHeroAlt = '물방울·타원형·원형 금빛 펜던트 세 개와 따로 놓인 체인'
const gmHeroCaption = '펜던트와 체인을 구분해 보여주는 AI 생성 예시입니다. 실제 판매 제품이나 확정 사양을 나타내지 않습니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA는 설계와 제작 조건의 관계, Rio Grande는 체인과 펜던트의 연결 및 구성 차이를 참고했습니다. 외부 자료는 귀족의 가격표나 별도 요금 규정을 뜻하지 않습니다. 비교표와 문의 문장은 상담 준비를 위한 예시이며, 실제 견적은 최종 사양을 확인한 뒤 안내합니다.'
const gmSources = [
  {
    "label": "GIA — 주얼리 설계와 제작 조건",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design-technology",
    "note": "크기·비례·요소의 관계를 비용·시간·제조 방식과 함께 고려하는 교육 안내입니다."
  },
  {
    "label": "Rio Grande — 체인과 펜던트 연결 가이드",
    "url": "https://products.riogrande.com/content/Instruction-Sheets/Guide-To-Jewelery-Chain-IS.pdf",
    "note": "체인 끝 고리의 통과 여부, 체인 폭·두께, 완성 체인과 부속 조립 전 체인의 차이를 참고했습니다."
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
