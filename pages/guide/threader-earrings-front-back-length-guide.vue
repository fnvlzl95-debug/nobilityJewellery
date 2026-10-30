<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/threader-earrings-front-back-length-guide'
const pageTitle = '실귀걸이 고르는 법, 앞뒤 길이와 구조 | 귀족'
const pageDescription = '실귀걸이는 상품의 총길이와 착용 후 앞뒤로 내려오는 길이를 나누어 확인하세요. 체인 통과형의 구조, 끝 장식·고정 부품과 구매 전 비교할 항목을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/threader-earrings-front-back-length-guide-hero-72939f69.webp`
const publishedAt = '2026-10-30'
const updatedAt = ''
const faqItems = [
  {
    "question": "체인이 달린 귀걸이는 모두 실귀걸이인가요?",
    "answer": "체인 장식이 보인다고 모두 체인 통과형인 것은 아닙니다. 스터드 아래에 체인이 달린 구조인지, 체인 자체가 귀 구멍을 지나 앞뒤로 늘어지는 구조인지 제품 사진과 착용 안내로 확인하세요."
  },
  {
    "question": "실귀걸이 총길이는 앞에서 보이는 길이인가요?",
    "answer": "꼭 그렇지는 않습니다. 총길이에 침과 장식이 포함되는지, 펼친 상태에서 어디부터 어디까지 잰 수치인지 먼저 확인하세요. 착용한 앞쪽 길이와 뒤쪽 길이는 별도로 물어보는 것이 좋습니다."
  },
  {
    "question": "실귀걸이에 일반 귀걸이 뒷마개를 끼워도 되나요?",
    "answer": "임의로 끼우지 말고 해당 제품에 맞는 부품인지 확인하세요. 맞지 않는 부품을 밀어 넣으면 가는 체인이나 연결 부분을 손상시킬 수 있습니다. 스토퍼가 필요한 제품이라면 종류와 사용 위치를 안내받으세요."
  },
  {
    "question": "실귀걸이를 맞출 때 앞뒤 길이를 따로 알려야 하나요?",
    "answer": "원하는 착용 모습을 전달하려면 앞뒤 길이를 나누어 설명하는 편이 좋습니다. 총길이만 지정하기보다 앞 장식 끝과 뒤 체인 끝이 보이는 참고 사진을 보내고, 그 배분이 가능한 구조인지 상담하세요."
  }
]
const quickAnswers = [
  "체인이 달린 귀걸이라도 모두 체인 통과형은 아닙니다. 귀에 닿는 침과 고정 부분을 보고, 체인 자체가 통과하는 구조인지 확인하세요.",
  "총길이, 앞쪽 장식 끝까지의 길이, 뒤쪽 끝까지의 길이를 나누어 물어보세요. 앞뒤 배분을 바꿀 수 있는지도 해당 제품에서 확인합니다.",
  "뒷마개가 없다는 이유로 일반 귀걸이용 부품을 임의로 끼우지 마세요. 필요한 고정 부품과 사용 방법은 제품에 맞춰 안내받으세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "실귀걸이와 체인이 달린 드롭 귀걸이는 어떻게 다른가요?",
    "paragraphs": [
      "앞에서 가는 체인이 길게 보이는 모습만으로 착용 구조를 알기는 어렵습니다. 스터드 아래에 체인 장식을 달고 뒤에서는 뒷마개로 고정하는 귀걸이도 있고, 가는 체인 자체를 통과시켜 앞뒤로 늘어뜨리는 귀걸이도 있습니다. 구매할 때는 장식의 길이와 함께 귀에 닿는 부분을 확인하세요.",
      "Threader Earrings 판매사의 구조 안내에는 가는 침·체인·장식으로 이어지는 형태와 체인의 양 끝에 침이 달린 형태가 소개돼 있습니다. 이 글에서 다루는 것은 이런 체인 통과형입니다. 이름이 실귀걸이, 체인 귀걸이 또는 스레더로 적혀 있더라도 실제 제품의 정면과 뒷면, 착용 안내를 함께 보세요.",
      "제품 사진에서 한쪽 끝의 침부터 체인을 따라가 반대쪽 장식까지 살펴보면 구성을 이해하기 쉽습니다. 장식이 앞에 붙어 있고 뒤쪽 체인만 길게 보이는 모습인지, 앞뒤 모두 가는 선이 내려오는 모습인지도 구분해 보세요. 같은 길이의 제품을 찾더라도 원하는 착용 모습에 따라 비교할 후보가 달라집니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "총길이가 같으면 착용했을 때 길이도 같나요?",
    "paragraphs": [
      "총길이만으로 앞쪽 장식이 어디까지 내려오는지 확정하기 어렵습니다. 펼쳐 놓은 제품의 끝에서 끝까지인지, 체인 부분만 잰 것인지부터 확인하세요. 침과 끝 장식이 포함된 수치인지에 따라 같은 숫자의 의미도 달라질 수 있습니다.",
      "Le Serey는 자사 스레더 컬렉션을 귀 앞뒤로 늘어뜨리고 길이를 조절하는 형태로 소개합니다. 이런 조절이 가능한 제품이라면 앞쪽으로 더 길게 내려오는 만큼 뒤쪽에 남는 길이도 달라집니다. 앞과 뒤를 각각 독립적으로 늘리는 장치가 있다는 뜻은 아니므로, 원하는 배분이 실제 제품에서 가능한지 확인하세요.",
      "상담할 때는 “전체 ○cm”와 함께 “앞쪽은 이 정도, 뒤쪽은 이 정도로 보였으면 한다”는 착용 사진을 보내 보세요. 상품의 총길이를 절반으로 나누면 원하는 앞뒤 길이가 된다고 계산하기보다, 귀에 걸리는 부분과 끝 장식을 포함한 착용 상태로 확인하는 편이 좋습니다. 아래 표는 후보의 길이를 묻는 질문 예시입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "나누어 볼 항목",
        "확인할 기준",
        "상담 질문 예시"
      ],
      "rows": [
        [
          "총길이",
          "펼친 제품에서 측정한 시작점과 끝점",
          "침과 끝 장식까지 포함한 길이인가요?"
        ],
        [
          "앞쪽 길이",
          "귀 구멍 위치에서 앞 장식 끝까지",
          "이 착용 사진에서는 앞쪽이 얼마나 내려오나요?"
        ],
        [
          "뒤쪽 길이",
          "귀 뒤에 남는 체인과 침 끝까지",
          "앞을 이 길이로 맞추면 뒤에는 어느 정도 남나요?"
        ],
        [
          "끝 장식",
          "장식 자체의 크기와 체인 연결 위치",
          "장식 크기를 포함한 착용 모습을 볼 수 있나요?"
        ],
        [
          "귀에 닿는 부분",
          "통과하는 부분과 위치 조절 범위",
          "원하는 앞뒤 길이로 조절해 착용할 수 있는 구조인가요?"
        ]
      ]
    }
  },
  {
    "title": "뒷마개가 없는 실귀걸이는 무엇을 확인하나요?",
    "paragraphs": [
      "먼저 해당 제품이 어떤 방식으로 위치를 유지하는지 물어보세요. 체인을 통과시키는 형태라도 끝 장식과 귀에 닿는 부분, 추가 부품 사용 여부가 같다고 가정하지 않는 것이 좋습니다. 정면 사진에 뒷마개가 보이지 않는다는 이유만으로 구성품이 빠졌다고 판단할 수도 없습니다.",
      "Threader Earrings 판매사는 일부 착용 상황에서 부드러운 스토퍼를 사용하는 방법을 안내하면서, 단단한 부품은 귀걸이를 손상시킬 수 있다고 설명합니다. 이는 모든 실귀걸이에 같은 스토퍼를 끼우라는 뜻이 아닙니다. 사용 가능한 부품이 있는지, 어느 위치에 어떻게 쓰는지 해당 제품의 안내를 확인하세요.",
      "평소 쓰던 스터드 뒷마개를 억지로 밀어 넣거나 체인을 잡아당겨 고정하지 마세요. 스토퍼가 제공되거나 추가로 권장된다면 호환 여부와 구성품 포함 여부를 함께 확인합니다. 어떤 고정 방식을 사용하더라도 분실을 완전히 막아 준다는 전제로 선택하지는 마세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "구매 전에 착용 사진과 구성품은 어떻게 보나요?",
    "paragraphs": [
      "한 장의 정면 사진보다 앞뒤가 함께 보이는 착용 사진을 요청해 보세요. 앞에서는 짧아 보이지만 뒤로 긴 체인이 남는 디자인도 있으므로, 머리카락을 묶었을 때 보일 모습까지 비교할 수 있습니다. 마음에 드는 사진에는 앞 장식 끝과 뒤 체인 끝을 각각 표시해 두면 원하는 길이를 설명하기 좋습니다.",
      "한쪽 무게와 장식 크기, 판매 수량도 확인하세요. 사진에 귀걸이 두 개가 보여도 구매 옵션이 한쪽인지 한 쌍인지 따로 읽어야 합니다. 길게 내려오는 부분이 옷깃이나 머리카락과 겹치는지도 살펴보고, 걸렸을 때 체인 끝을 세게 당겨 풀지 않도록 주의하세요.",
      "보관할 때는 가는 체인이 다른 주얼리와 뒤섞이지 않게 정리하세요. GIA의 주얼리 관리 안내는 여러 제품을 서랍 등에 무심히 쌓아 두지 말고 상자나 파우치를 활용하도록 설명합니다. 실귀걸이를 넣기 전에도 체인이 서로 엉키지 않았는지 보고, 가는 부분이 뚜껑이나 여밈에 끼이지 않도록 두면 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 실귀걸이 구매·제작 상담은 어떻게 하나요?",
    "paragraphs": [
      "원하는 실귀걸이의 전체 사진과 착용 사진을 보내 주세요. 체인이 귀를 통과하는 형태를 원하는지, 스터드에 가는 체인이 달린 형태를 원하는지 먼저 구분하면 상담 범위가 분명해집니다. 앞과 뒤 중 어느 쪽을 길게 보이게 하고 싶은지도 함께 적어 주세요.",
      "문의 예시: “가는 체인이 앞뒤로 내려오는 실귀걸이를 찾고 있습니다. 앞쪽은 첨부 사진 정도로 짧게, 뒤쪽은 조금 더 길게 보였으면 해요. 끝에는 작은 물방울 장식이 있는 디자인을 원합니다. 한 쌍 기준 예산은 ○○원 안팎이고, 가능한 총길이와 착용·고정 방식을 함께 상담받고 싶습니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 참고 자료를 보내 주세요. 취급 및 제작 상담이 가능한 구성을 확인한 뒤 금속, 체인과 끝 장식, 길이와 수량을 정하고 견적·일정을 상담하세요. 사진 속 형태나 길이를 그대로 제작할 수 있는지는 실제 구조를 보고 확인해야 합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "이 글은 체인 통과형 실귀걸이의 구매 기준입니다. 비슷한 상품명이라도 고정 구조가 다를 수 있으므로 실제 제품의 착용 안내를 확인하세요.",
  "체인이나 부품이 잘 통과하지 않으면 힘으로 당기거나 구부리지 마세요. 제품에 맞는 사용 방법과 부품인지 먼저 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/earring-types-guide",
    "label": "드롭·스터드 등 귀걸이 종류 비교",
    "description": "원하는 착용 구조를 다른 귀걸이 형태와 비교해 보세요."
  },
  {
    "to": "/guide/earring-jacket-stud-compatibility-guide",
    "label": "스터드에 장식을 더하고 싶다면",
    "description": "기존 스터드와 추가 장식을 조합하는 이어재킷을 살펴보세요."
  },
  {
    "to": "/guide/gold-filled-vermeil-plated-difference",
    "label": "금색 귀걸이의 재질 표기 확인",
    "description": "골드필드·버메일·금도금 등 소재 설명을 구분하세요."
  },
  {
    "to": "/custom",
    "label": "실귀걸이 길이·디자인 상담",
    "description": "앞뒤로 보일 길이와 원하는 끝 장식을 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "가는 체인과 장식의 전체적인 분위기를 참고하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '실귀걸이 고르는 법, 앞뒤 길이와 구조'
const gmArticleLead = '실귀걸이는 착용했을 때 앞뒤로 내려오는 길이를 따로 보고 고르세요. 이 글에서는 가는 체인을 귀 구멍에 통과시켜 양쪽으로 늘어뜨리는 체인형을 다룹니다. 상품에 적힌 총길이가 앞쪽에서 보이는 길이와 같은 것은 아니므로, 실제 착용 모습과 길이 조절 범위를 함께 확인하는 것이 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '실귀걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '실귀걸이 앞뒤 길이·디자인 상담'
const gmHeroAlt = '가는 금색 체인 양 끝에 침과 작은 물방울 장식이 연결된 실귀걸이 한 쌍의 AI 디자인 예시'
const gmHeroCaption = '체인과 양 끝 부품의 구성을 설명하는 AI 생성 이미지입니다. 실제 판매 제품·완성된 제작 사례가 아니며, 착용 길이와 고정 방식은 실제 제품에서 확인해야 합니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '구조와 착용 모습은 각 판매사·브랜드의 제품 안내, 보관 원칙은 GIA 자료를 참고했습니다. 길이 비교표와 문의 문장은 구매 상담을 돕기 위한 예시이며 모든 실귀걸이의 공통 규격은 아닙니다.'
const gmSources = [
  {
    "label": "Threader Earrings — 체인 통과형의 구조와 부품 안내",
    "url": "https://www.threaderearrings.co.uk/threader-earrings/",
    "note": "판매사가 안내하는 체인형 구조와 부품 사용 시 주의점을 참고했습니다."
  },
  {
    "label": "Le Serey — 앞뒤로 늘어뜨리는 스레더 형태",
    "url": "https://leserey.com/collections/threader-earrings",
    "note": "브랜드가 설명하는 앞뒤 길이 조절형 제품의 특징을 참고했습니다."
  },
  {
    "label": "GIA — 주얼리 보관 안내",
    "url": "https://www.gia.edu/gia-news-research-tips-caring-jewelry",
    "note": "주얼리를 뒤섞어 쌓아 두지 않는 보관 원칙을 참고했습니다."
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
