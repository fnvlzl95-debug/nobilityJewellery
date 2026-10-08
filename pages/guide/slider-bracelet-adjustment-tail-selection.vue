<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/slider-bracelet-adjustment-tail-selection'
const pageTitle = '슬라이더 팔찌, 길이 조절과 꼬리 체인 확인법 | 귀족'
const pageDescription = '슬라이더 팔찌는 조절 장식을 움직여 착용 둘레를 바꾸는 팔찌입니다. 볼로형의 조절 방식, 손 통과와 착용 범위의 차이, 남는 꼬리 체인을 확인하는 방법을 정리했습니다. 구매·선물 전 실제 후보의 조절 모습을 비교해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/slider-bracelet-adjustment-tail-selection-hero-e6e0df74.webp`
const publishedAt = '2026-10-08'
const updatedAt = ''
const faqItems = [
  {
    "question": "볼로 팔찌와 슬라이더 팔찌는 어떤 관계인가요?",
    "answer": "볼로 팔찌는 슬라이딩 장식으로 착용 둘레를 조절하는 형태를 말합니다. 이름만으로 모든 제품의 내부 부품이나 개방 방식이 같다고 판단하지 말고 실제 구조를 확인하세요."
  },
  {
    "question": "슬라이더 팔찌는 완전히 열어서 착용하나요?",
    "answer": "제품에 따라 다릅니다. 별도 잠금을 열 수 있는지, 둘레를 넓혀 손을 통과시켜야 하는지 해당 제품의 사용 설명이나 시범으로 확인하세요."
  },
  {
    "question": "볼로 팔찌 꼬리 체인이 너무 길면 잘라도 되나요?",
    "answer": "임의로 자르거나 끝 장식을 떼지 마세요. 조절 범위와 끝부분의 구조에 영향을 줄 수 있으므로, 선택한 제품에서 변경이 가능한지 먼저 확인하세요."
  },
  {
    "question": "슬라이더 팔찌가 자꾸 느슨해지면 더 세게 조여야 하나요?",
    "answer": "반복해서 세게 당기기보다 착용을 멈추고 조절 장치의 상태를 문의하세요. 움직임을 영상으로 남기면 어떤 상황에서 느슨해지는지 설명하는 데 도움이 됩니다."
  }
]
const quickAnswers = [
  "길이 조절이 된다는 말이 모든 손목에 맞는다는 뜻은 아닙니다. 제품의 착용 가능 범위와 손을 통과시킬 때의 최대 벌림을 구분해 확인하세요.",
  "조절 장식이 움직이는 기능과 팔찌가 완전히 열리는 기능은 별개입니다. 분리되는 잠금이 있는지 제품별로 확인하세요.",
  "양갈래 체인이 남는 볼로형은 원하는 착용감으로 맞춘 뒤 꼬리 끝이 어디에 닿는지도 살펴보세요. 남는 체인은 전체 디자인의 일부입니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "슬라이더 팔찌는 어떻게 길이를 조절하나요?",
    "paragraphs": [
      "조절 장식을 체인 위에서 움직여 손목을 감싸는 구간을 줄이거나 늘립니다. Pandora는 자사 슬라이더 팔찌를 설명하면서 볼 형태의 장식을 손목 쪽으로 옮기면 조여지고 반대쪽으로 옮기면 느슨해진다고 안내합니다.",
      "이 글에서 다루는 볼로형은 조절 장식 아래로 체인 끝이 남는 형태입니다. 그 부분을 꼬리 체인이라고 부르겠습니다. 착용 구간이 줄어들면 밖으로 남는 부분도 달라질 수 있으므로, 조절 전후의 전체 모습을 함께 보는 것이 좋습니다.",
      "슬라이더라는 이름만으로 내부 부품이 모두 같다고 생각하지 마세요. Marahlago의 볼로 팔찌 안내에는 실리콘을 사용하는 조절 부품이 소개되지만, 이는 해당 제품의 구조입니다. 다른 팔찌나 귀족 갤러리의 슬라이더 장식까지 같은 방식이라고 단정할 수는 없습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "조절형이면 손목 크기를 몰라도 괜찮나요?",
    "paragraphs": [
      "조절형에도 사용할 수 있는 범위가 있습니다. Marahlago는 볼로 제품 설명에서 착용 가능한 손목 범위와 손을 통과시키는 최대 벌림을 따로 안내합니다. 제품이 손목에 맞게 조여지더라도 손을 넣고 빼기 어려우면 원하는 방식으로 사용할 수 없습니다.",
      "팔찌가 열리는지도 별도 질문입니다. Pandora는 자사 조절형 체인 팔찌와 조절형 테니스 팔찌의 개방 방식이 다르다고 안내합니다. 조절 장식이 있다고 모두 끝까지 분리되는 것은 아니므로, 실제 후보의 착용·분리 시범을 요청해 보세요.",
      "선물할 때는 “프리사이즈”라는 표현만으로 결정하지 말고 받는 분에게 맞는 조절 범위를 확인하세요. 직접 착용 확인이 어렵다면 확인 가능한 치수와 평소 착용하는 팔찌 정보를 전달하고, 맞지 않을 때 조정 가능한 부분이 있는지도 구매 전에 물어보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "꼬리 체인은 어느 정도 남는지 봐야 하나요?",
    "paragraphs": [
      "원하는 착용감으로 맞춘 상태에서 꼬리 체인이 어디에 놓이는지 보세요. 팔찌를 넓게 펼쳐 놓은 상품 사진만으로는 손목 아래에 남는 길이나 끝 장식의 움직임을 알기 어렵습니다. 손등 쪽과 손바닥 쪽 사진을 함께 요청하면 비교하기 쉽습니다.",
      "평소 긴소매를 입거나 키보드를 자주 사용한다면 그 동작을 가볍게 해 보세요. 끝 장식이 소매 안으로 들어가거나 책상에 닿는 느낌이 마음에 드는지 확인하는 과정입니다. 꼬리가 길수록 나쁘거나 짧을수록 좋다는 고정 기준보다 자신의 사용 장면에 맞춰 선택하세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인할 부분",
        "어떤 상태에서 보나요?",
        "구매 전에 물어볼 내용"
      ],
      "rows": [
        [
          "착용 구간",
          "원하는 밀착감으로 조절한 상태",
          "이 위치가 제품의 사용 가능 범위 안인가요?"
        ],
        [
          "손 통과",
          "해당 제품의 안내대로 넓힌 상태",
          "분리되는 곳이 있나요, 손을 통과시켜야 하나요?"
        ],
        [
          "꼬리 체인",
          "착용 후 손을 자연스럽게 내린 상태",
          "끝 장식이 어느 위치까지 내려오나요?"
        ],
        [
          "조절 장식",
          "착용 전후 실제로 조작하는 모습",
          "어느 부분을 잡고 어떻게 움직이나요?"
        ]
      ]
    }
  },
  {
    "title": "착용 전 조절 장치에서 무엇을 확인하나요?",
    "paragraphs": [
      "판매처가 안내하는 위치를 잡고 천천히 조절해 보세요. 처음 사용하는 제품은 사진보다 짧은 시범 영상이 이해에 도움이 될 수 있습니다. 움직이지 않는 부품을 체인 끝만 잡아 세게 당겨 해결하려고 하지 마세요.",
      "원하는 위치에 맞춘 뒤 손목을 자연스럽게 움직여 착용감이 유지되는지 확인하세요. 장식이 저절로 미끄러져 팔찌가 느슨해지거나 체인이 걸리는 느낌이 있다면 계속 조여 쓰기보다 판매처에 상태를 문의하는 편이 좋습니다.",
      "이상 움직임의 원인을 사진만으로 금속이 늘어났다거나 특정 부품이 닳았다고 확정할 수는 없습니다. 어떤 동작에서 달라지는지 영상으로 남기되, 조절 장식을 공구로 누르거나 임의로 윤활제를 넣지 말고 점검 방법을 안내받으세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로에서 슬라이더 팔찌 상담은 어떻게 하나요?",
    "paragraphs": [
      "귀족에 문의할 때는 원하는 팔찌의 전체 사진과 조절 장식의 가까운 사진을 함께 보내 주세요. 손목에 밀착되는 느낌을 원하는지, 여유 있게 움직이길 원하는지와 꼬리 체인이 얼마나 드러나길 원하는지도 알려 주세요.",
      "“길이를 조절하는 팔찌를 찾습니다. 손을 넣고 빼는 방법과 손목에 맞춘 뒤 남는 체인 모습을 보고 싶습니다”처럼 문의하면 됩니다. 금속 색상 선호, 예산, 선물 여부와 희망 수령일을 함께 적어 주세요.",
      "귀족 갤러리의 메시 체인 슬라이더 팔찌도 디자인 참고로 살펴볼 수 있습니다. 다만 이 글의 볼로형 예시와 잠금 내부 구조가 같다는 뜻은 아닙니다. 선택한 디자인에서 가능한 조절 방식과 변경 범위, 견적·일정은 상담으로 확인합니다.",
      "귀족은 종로 173 종묘귀금속백화점 101호에 있습니다. 방문 전 참고 사진을 카카오톡으로 보내면 원하는 디자인과 확인하고 싶은 부분을 구체적으로 전달할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "조절 가능 범위 밖까지 무리하게 당기거나 끝 장식을 임의로 분리하지 마세요. 탈착 방법은 해당 제품 설명을 우선하세요.",
  "슬라이더가 계속 풀리는 경우 다른 장식을 끼워 임시로 막기보다 상태를 확인받으세요. 부품 교체·수리 가능 여부는 제품을 검토한 뒤 안내받아야 합니다."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "슬라이더 팔찌 구매·제작 상담",
    "description": "조절 방식과 꼬리 체인의 선호를 함께 알려 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 팔찌 디자인 살펴보기",
    "description": "귀족 갤러리의 디자인을 참고하고 실제 조절 구조를 문의하세요."
  },
  {
    "to": "/guide/bracelet-size-measuring-guide",
    "label": "팔찌 치수 확인 방법",
    "description": "손목 둘레와 제품 치수의 차이를 살펴보세요."
  },
  {
    "to": "/guide/tennis-bracelet-structure-selection-guide",
    "label": "테니스 팔찌 세팅과 잠금 보기",
    "description": "연속 보석 디자인을 원할 때 함께 비교하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '슬라이더 팔찌, 길이 조절과 꼬리 체인 확인법'
const gmArticleLead = '슬라이더 팔찌는 체인을 따라 움직이는 조절 장식으로 착용 둘레를 바꾸는 팔찌입니다. 볼로 팔찌라고 부르는 형태도 여기에 포함됩니다. 구매할 때는 손목에 맞게 조여지는지만 보지 말고, 손을 넣고 뺄 수 있는지와 조절 뒤 남는 꼬리 체인의 위치까지 확인하세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '슬라이더 팔찌'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '슬라이더 팔찌 조절 범위와 꼬리 체인 선택'
const gmHeroAlt = '금빛 슬라이더 팔찌의 타원형 체인 고리와 아래쪽 조절 장식, 그 아래로 이어지는 두 갈래 꼬리 체인'
const gmHeroCaption = '슬라이더와 꼬리 체인의 위치를 보여 주는 디자인 예시입니다. 실제 판매 제품 사진이나 내부 부품 구조도가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '조절 방식과 제품별 구조 차이는 Pandora와 Marahlago의 브랜드 원문을 참고했습니다. 꼬리 체인의 위치와 일상 동작을 비교하는 방법은 구매 상담을 위한 제안이며, 브랜드별 사용 설명을 대신하지 않습니다.'
const gmSources = [
  {
    "label": "Pandora — 슬라이더 조절과 개방 방식 안내",
    "url": "https://us.pandora.net/en/bracelets/sliding-bracelets/",
    "note": "자사 슬라이더 팔찌의 조절 방법과 제품별 개방 차이를 설명합니다."
  },
  {
    "label": "Marahlago — 볼로 팔찌 조절 범위와 부품 사례",
    "url": "https://www.marahlago.com/larimar-jewelry/adella-bolo-bracelet",
    "note": "착용 가능한 범위와 최대 벌림, 해당 제품의 실리콘 조절 부품을 설명하는 브랜드 사례입니다."
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
