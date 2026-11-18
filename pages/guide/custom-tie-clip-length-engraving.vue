<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/custom-tie-clip-length-engraving'
const pageTitle = '넥타이핀 주문제작, 길이와 각인 정하는 법 | 귀족'
const pageDescription = '넥타이핀 주문제작 전 착용 위치에서 타이 폭을 재고 앞판 길이와 각인 위치를 골라보세요. 신랑 예물 타이핀 소재·클립·견적과 종로 귀족 사진 상담 준비를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/custom-tie-clip-length-engraving-hero.webp`
const publishedAt = '2026-11-18'
const updatedAt = ''
const faqItems = [
  {
    "question": "넥타이 폭을 모르면 어떻게 주문하나요?",
    "answer": "넥타이를 맨 뒤 핀을 끼울 자리에 자를 가로로 대고 촬영하세요. 선물이라 실측이 어렵다면 자주 매는 넥타이 사진과 가지고 있는 타이핀 치수로 후보를 상담할 수 있습니다."
  },
  {
    "question": "앞면에 이름 전체도 각인할 수 있나요?",
    "answer": "원하는 이름을 실제 표기로 보내 주세요. 앞판의 평평한 면과 글자 높이, 끝 여백을 보고 문구 전체 또는 이니셜 구성을 검토합니다."
  },
  {
    "question": "커프스 버튼과 세트로 제작할 수 있나요?",
    "answer": "귀족은 신랑 예물로 커프스와 타이핀 구성을 상담합니다. 함께 사용할 커프스 사진과 맞추고 싶은 색·마감을 보내고 품목별 가능 범위와 견적을 확인하세요."
  },
  {
    "question": "넥타이핀 제작 비용은 무엇에 따라 달라지나요?",
    "answer": "앞장식 소재·치수·두께, 뒷클립 부속, 각인 위치와 마감 범위에 따라 달라집니다. 단품인지 세트인지와 예산을 정해 같은 구성으로 견적을 받으세요."
  },
  {
    "question": "촬영 전에 받으려면 언제 문의해야 하나요?",
    "answer": "귀족 주문제작은 최소 3주를 기준으로 합니다. 처음 문의할 때 촬영일과 희망 수령일을 함께 적고, 도안 확정과 부속 준비에 필요한 시간을 확인하세요."
  }
]
const quickAnswers = [
  "핀을 끼울 높이에서 넥타이 앞판의 가로 폭을 재세요. 자와 넥타이가 같이 나온 사진에 원하는 핀 길이를 표시하면 비율을 상담하기 쉽습니다.",
  "이니셜은 착용자를 마주 본 사진에 표시하세요. 앞판의 빈 공간, 글씨 방향, 대소문자와 마침표를 도안에서 함께 확인합니다.",
  "견적은 앞장식 소재와 크기, 뒷클립 부속, 각인과 마감에 따라 달라집니다. 귀족 주문제작은 최소 3주이며 사양 확정 후 수령 일정을 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "타이핀 길이는 넥타이의 어디를 재야 하나요?",
    "paragraphs": [
      "셔츠에 넥타이를 맨 뒤 핀을 끼우고 싶은 높이를 표시하세요. 그 자리에서 넥타이 앞판의 왼쪽 가장자리부터 오른쪽 가장자리까지 잰 값이 디자인을 정할 때 쓸 폭입니다. 아래쪽의 가장 넓은 부분을 재면 실제로 핀이 놓일 자리와 폭이 달라질 수 있습니다.",
      "예를 들어 착용 위치의 폭이 60mm라면 종이를 40mm와 50mm 길이로 잘라 한쪽 가장자리에 번갈아 대 보세요. 앞판에 남는 여백은 각각 20mm와 10mm입니다. 두 사진 중 마음에 드는 쪽을 보내면 어느 정도 길이를 원하는지 설명하기 쉽습니다. 이 치수는 비율을 비교하기 위한 예시입니다.",
      "여러 넥타이에 돌려 쓸 예정이라면 가장 자주 매는 것과 가장 좁은 것 두 장을 같은 방법으로 재세요. 양쪽 사진에 같은 종이 견본을 대 보면 한 넥타이에서는 적당해 보이던 핀이 다른 넥타이에서는 끝까지 닿는지도 알 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "재킷을 입은 사진과 클립 옆면이 필요한 이유",
    "paragraphs": [
      "제작할 앞판의 길이를 골랐다면 재킷 단추를 잠그고 거울을 보세요. 재킷 깃 사이로 드러나는 면적이 달라지면 같은 핀도 다른 위치에 놓인 듯 보입니다. 예식 촬영용으로 맞춘다면 실제로 입을 셔츠·넥타이·재킷을 함께 찍은 사진이 가장 좋은 참고가 됩니다.",
      "타이 클립은 넥타이를 셔츠에 함께 고정하는 장식입니다. 넥타이 앞뒤 자락과 셔츠 앞여밈을 겹친 상태를 옆에서 보여 주세요. 평소 쓰던 핀이 있다면 벌어지는 방향과 물리는 부분을 함께 찍고, 끼우기 편했는지 원단에 자국이 남았는지 알려 주세요. 세공 상담에서는 앞장식과 뒷부분의 고정 구조를 함께 검토합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "보낼 사진",
        "사진에 표시할 것",
        "결정할 내용"
      ],
      "rows": [
        [
          "넥타이를 맨 정면",
          "핀을 끼울 높이와 그 자리의 폭",
          "앞판 길이와 남길 여백"
        ],
        [
          "셔츠 앞여밈 옆면",
          "넥타이와 셔츠가 겹치는 두께",
          "원단에 맞는 고정 방식"
        ],
        [
          "재킷 착용 정면",
          "깃 사이로 보이는 위치",
          "착용 방향과 각인 위치"
        ]
      ]
    }
  },
  {
    "title": "이니셜을 어느 쪽에 새기면 잘 보일까요?",
    "paragraphs": [
      "앞판 한쪽 끝에 새길 때는 착용자를 마주 본 방향으로 도안을 놓고 글자 위치를 표시하세요. 단순히 “오른쪽 끝”이라고 적으면 착용하는 사람이 보는 방향과 사진을 보는 방향이 엇갈릴 수 있습니다. 끝부분을 둥글게 다듬거나 테두리에 무늬를 넣으면 실제로 글자가 들어갈 평평한 면도 달라집니다.",
      "이니셜의 대소문자, 마침표와 띄어쓰기까지 원하는 표기 그대로 적어 주세요. 예를 들어 ‘JH’와 ‘J.H.’는 글자 높이를 같게 해도 차지하는 폭이 다릅니다. 실제 크기로 출력한 도안에서 글자와 가장자리 사이 여백을 확인하면 화면을 확대한 상태에서 놓치기 쉬운 차이가 보입니다.",
      "날짜를 겉에서 보이지 않게 담고 싶다면 뒷면 후보 위치를 물어보세요. 집게가 움직이거나 셔츠와 맞닿는 곳에는 새길 공간이 부족할 수 있습니다. 제작을 결정하기 전에 어느 면에 어떤 문구를 넣을지 한 장의 도안에 모아 확인하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "소재와 견적은 어디까지 맞춰 비교하나요?",
    "paragraphs": [
      "금빛 타이핀을 원한다면 색상과 함께 앞장식에 희망하는 금속을 알려 주세요. 14K와 18K를 비교할 때는 앞판 크기와 두께, 뒷클립의 소재, 각인 조건을 같은 기준으로 놓고 보세요. 앞장식의 소재 표시만 보고 움직이는 부속까지 같은 소재라고 단정하기 어렵습니다.",
      "신랑 예물로 커프스와 함께 맞출 때는 두 품목을 나란히 놓은 모습을 떠올려 보세요. 예를 들어 커프스에 가는 무광 결이 있다면 타이핀 앞판의 결 방향만 맞춰도 함께 착용할 때 공통점이 보입니다. 타이핀 단품 견적과 커프스를 더한 견적은 품목별로 요청하세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 넥타이핀 제작을 문의하는 방법",
    "paragraphs": [
      "카톡에는 넥타이 사진과 착용 위치의 폭, 종이로 대 본 핀 길이, 각인할 문구를 보내 주세요. “신랑 예물로 타이핀 한 개를 맞추려 합니다. 사진에 표시한 위치의 폭은 60mm이고 짧은 종이 견본이 마음에 듭니다. 앞면 끝에 JH를 새기고 싶습니다. 이 비율로 가능한 소재와 뒷클립, 각인을 포함한 견적을 알려 주세요.”처럼 쓰면 됩니다.",
      "귀족의 주문제작 기간은 최소 3주입니다. 예식 전에 촬영이 있다면 촬영일을 먼저 알려 주세요. 각인 도안과 부속, 소재를 정한 뒤 실제 수령 가능한 날을 확인합니다. 종로 매장에 방문한다면 착용할 넥타이나 함께 쓸 커프스를 가져오면 길이와 금속 색을 비교하기 좋습니다.",
      "종로 귀족 매장은 서울 종로구 종로 173 종묘귀금속백화점 101호입니다. 아래 상담 버튼에서 준비 항목을 복사하고 예산과 희망 수령일을 적어 사진을 보내 주세요. 전화 02-766-4789로 방문 준비도 문의할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "집게를 힘으로 벌려 원단에 맞추면 고정 상태가 달라질 수 있습니다. 실제 착용할 넥타이에 맞는 구조를 상담하세요.",
  "거울 셀카는 좌우가 뒤집혀 보일 수 있습니다. 각인 위치를 고를 때는 다른 사람이 정면에서 찍은 사진에 표시해 주세요."
]
const relatedLinks = [
  {
    "to": "/guide/cufflinks-shirt-fastening-selection",
    "label": "커프스와 셔츠 소매 맞추기",
    "description": "타이핀과 함께 착용할 소매 장식을 고를 때 참고하세요."
  },
  {
    "to": "/wedding",
    "label": "신랑 예물 구성 살펴보기",
    "description": "타이핀 단품과 커프스 세트의 구성 범위를 상담하세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "소재 선택과 제작 일정을 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '넥타이핀 주문제작, 길이와 각인 정하는 법'
const gmArticleLead = '넥타이핀 주문제작은 핀을 끼울 자리의 넥타이 폭을 재는 것부터 시작하세요. 그 폭에 종이 견본을 대면 타이핀 길이와 이니셜 위치를 함께 정할 수 있습니다. 신랑 예물이나 기념 선물로 맞출 때는 실제 착용할 넥타이 사진과 각인 문구, 필요한 날짜를 준비하세요.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '넥타이핀 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '이니셜 넥타이핀 맞춤 제작'
const gmHeroAlt = '남색 넥타이에 JH 이니셜이 새겨진 금빛 타이핀을 댄 디자인 예시'
const gmHeroCaption = '앞판의 무광 결과 끝부분 이니셜 위치를 보여주기 위해 AI로 만든 디자인 예시입니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '착용 용도는 Tateossian, 예물 품목과 제작 일정은 귀족의 안내를 참고했습니다. 종이 견본 치수는 원하는 길이를 설명하기 위한 비교 예시입니다.'
const gmSources = [
  {
    "label": "귀족 — 신랑 예물 구성",
    "url": "https://noblessegold.com/wedding",
    "note": "귀족은 신랑 예물 구성으로 타이핀과 커프스를 안내합니다."
  },
  {
    "label": "귀족 — 주문제작 상담",
    "url": "https://noblessegold.com/custom",
    "note": "귀족은 디자인·소재를 상담해 견적을 정하고 주문제작에 최소 3주를 안내합니다."
  },
  {
    "label": "Tateossian — 타이 클립 착용 안내",
    "url": "https://us.tateossian.com/community/blog/what-to-wear-when-to-wear-it-a-men-s-accessory-guide",
    "note": "타이 클립은 넥타이를 셔츠에 함께 고정하는 용도로 사용합니다."
  },
  {
    "label": "Tiffany & Co. — 각인 위치와 소재",
    "url": "https://www.tiffany.com/client-services/personalization.html/",
    "note": "티파니는 제품의 형태와 소재에 따라 각인 가능 여부가 달라진다고 안내합니다."
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
