<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/diamond-ring-lower-setting-remodel'
const pageTitle = '다이아 반지 낮추기, 리세팅 전 확인할 것 | 귀족'
const pageDescription = '다이아 반지 높이가 불편하다면 보석을 잡는 부분과 옆면 구조부터 확인하세요. 낮은 세팅 리폼의 검토 범위, 견적 항목, 종로 귀족 사진 상담과 최소 3주 제작 기준을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/diamond-ring-lower-setting-remodel-hero.webp`
const publishedAt = '2026-11-14'
const updatedAt = ''
const faqItems = [
  {
    "question": "높은 다이아 반지를 낮은 디자인으로 바꿀 수 있나요?",
    "answer": "기존 다이아의 치수와 상태, 난집과 밴드의 연결 구조를 확인한 뒤 낮은 세팅 리폼을 검토할 수 있습니다. 정면·옆면·안쪽 사진과 원하는 변화를 먼저 보내 주세요."
  },
  {
    "question": "다이아 반지가 옷에 걸리면 높이를 낮춰야 하나요?",
    "answer": "높이와 함께 보석을 잡는 발의 상태와 마감을 점검해 보세요. 언제부터 어느 위치가 걸렸는지 알려 주고, 보수 가능한 범위와 디자인 변경 필요성을 상담합니다."
  },
  {
    "question": "기존 반지 밴드를 살리면서 난집만 바꿀 수 있나요?",
    "answer": "난집과 밴드의 연결 방식, 금속 상태와 새 세팅 구조를 확인해야 합니다. 기존 밴드를 유지하고 싶다는 요청을 먼저 전달하고 활용 가능한 범위를 상담하세요."
  },
  {
    "question": "낮은 세팅 리폼 비용은 사진으로 확정할 수 있나요?",
    "answer": "사진은 구조와 희망 변경을 설명하는 데 활용합니다. 보석과 반지의 실물 상태, 재사용할 부분과 새로 제작할 범위를 확인한 뒤 최종 견적을 정합니다."
  },
  {
    "question": "종로 귀족의 다이아 반지 주문제작은 얼마나 걸리나요?",
    "answer": "새 반지를 만드는 주문제작은 최소 3주를 기준으로 합니다. 기존 보석 활용 범위와 디자인·소재 등 최종 사양을 확인한 뒤 수령 일정을 안내하므로 필요한 날짜를 먼저 알려 주세요."
  }
]
const quickAnswers = [
  "반지 높이를 낮추려면 다이아의 크기·깊이, 보석을 받치는 부분과 밴드의 연결을 함께 확인해야 합니다. 기존 반지를 활용할 수 있는 범위를 먼저 상담하세요.",
  "옷에 걸리기 시작한 시점과 위치를 알려 주세요. 보석을 잡는 발의 상태와 표면 마감도 살펴보고, 점검할 부분과 디자인 변경 범위를 정합니다.",
  "정면·옆면·안쪽 사진, 원하는 디자인, 예산과 수령 희망일을 보내 주세요. 새 반지를 만드는 주문제작은 최소 3주를 기준으로 일정을 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "다이아 반지 높이를 낮출 수 있나요?",
    "paragraphs": [
      "기존 다이아를 활용해 낮은 세팅의 반지로 바꾸는 방향을 상담할 수 있습니다. 먼저 다이아를 받치는 난집, 난집과 밴드가 이어진 부분, 보석 아래 공간을 살펴봅니다. 기존 밴드를 활용할지 새 반지를 만들지도 이 구조와 제품 상태에 맞춰 검토합니다.",
      "다이아는 옆에서 보면 깊이가 있는 보석이므로 원하는 높이를 정할 때 실제 치수를 함께 확인해야 합니다. 현재 반지에서 무엇을 얼마나 바꿀 수 있는지, 보석 아래쪽과 손가락 사이 공간을 어떻게 확보할지 물어보세요. 상담 전에 몇 mm까지 낮출 수 있다고 정해 두기보다 원하는 착용감을 구체적으로 설명하면 좋습니다.",
      "Stuller는 중심 보석의 높이가 착용감에 영향을 주며, 착용자의 활동과 선호를 함께 고려하도록 안내합니다. “니트를 입을 때 자주 걸린다”, “반지가 높아 일상에서 잘 끼지 않게 된다”처럼 실제로 불편한 상황을 알려 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "옷에 걸린다면 어느 부분부터 살펴보나요?",
    "paragraphs": [
      "처음부터 높이가 부담스러웠는지, 최근에 특정 부분이 걸리기 시작했는지 구분해 알려 주세요. 정면 장식의 크기, 옆면 돌출, 보석을 잡는 발 끝 중 어디가 닿는지 사진에 표시하면 점검할 위치를 전달하기 쉽습니다.",
      "GIA는 반지의 착용감과 걸림에 세팅 구조뿐 아니라 프롱의 형태·마감·위치도 영향을 준다고 설명합니다. 기존 디자인을 살리고 싶다면 걸리는 부위를 점검하고 가능한 보수 범위를 먼저 확인하세요. 디자인까지 바꾸고 싶다면 낮은 세팅 후보를 함께 상담할 수 있습니다.",
      "보석이 흔들리는 느낌이나 눈에 보이는 발의 변형이 있다면 현재 상태를 사진으로 전달하고 착용·점검 안내를 받아 보세요. 집에서 발을 누르거나 보석을 빼려고 하기보다 실물 점검을 거쳐 작업 범위를 정하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "낮은 세팅을 고를 때 함께 확인할 것",
    "paragraphs": [
      "마음에 드는 참고 사진은 정면과 옆면을 함께 준비하세요. 같은 프롱 세팅 안에서도 받침의 높이와 연결 모양이 다를 수 있습니다. 베젤 세팅은 금속 테두리가 보석 둘레를 감싸는 구성이므로, 다이아 가장자리가 보이는 정도와 테두리 두께까지 살펴보세요.",
      "GIA는 매끄러운 베젤 가장자리가 옷감에 걸릴 가능성을 줄이는 데 도움이 된다고 설명합니다. 실제 후보를 볼 때는 보석 윗면의 높이, 금속 테두리와 밴드의 비율, 손가락에 닿는 안쪽을 함께 확인하세요. 원하는 인상과 착용감을 도안이나 샘플에서 어떤 방식으로 확인할지도 상담합니다.",
      "웨딩밴드나 가드링을 함께 끼고 있다면 두 반지를 나란히 보여 주세요. 새 난집이 옆 반지와 닿는 위치, 함께 착용했을 때의 간격과 폭도 확인할 수 있습니다. 단독 착용을 원하는지 겹쳐 끼는 조합을 유지하고 싶은지 알려 주면 디자인을 정하는 데 도움이 됩니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "확인 항목",
        "사진이나 실물에서 볼 부분",
        "상담할 질문"
      ],
      "rows": [
        [
          "보석과 난집 높이",
          "다이아 옆면과 받침 아래 공간",
          "현재 보석으로 가능한 높이를 확인할 수 있나요?"
        ],
        [
          "고정 방식과 마감",
          "프롱 끝 또는 베젤 테두리",
          "유지할 디자인과 걸리는 부분을 함께 점검할 수 있나요?"
        ],
        [
          "기존 밴드 활용",
          "난집과 밴드가 이어진 부분",
          "기존 밴드를 활용하는 안도 검토할 수 있나요?"
        ],
        [
          "다른 반지와 조합",
          "함께 꼈을 때의 옆면과 접촉 위치",
          "평소 끼는 웨딩밴드와 함께 확인할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "리세팅 견적과 제작기간은 어떻게 문의하나요?",
    "paragraphs": [
      "“현재 다이아를 유지하면서 높이를 낮추고 싶다”는 요청과 예산 범위를 먼저 전달하세요. 견적을 받을 때는 기존 보석 확인과 탈착·재세팅, 새 난집이나 밴드 제작, 마감 중 실제 포함되는 작업을 물어봅니다. 기존 반지를 활용하는 안과 새 반지를 제작하는 안을 검토한다면 각 안의 변경 범위를 적어 두세요.",
      "보유한 감정서나 구매 정보가 있으면 사진과 함께 준비해 주세요. 다이아의 실제 상태와 치수, 새 디자인의 소재·폭·보조석을 확인한 뒤 견적 조건을 맞춥니다. 기존 금속이나 분리한 부품의 처리 방법도 작업을 결정할 때 함께 확인하세요.",
      "귀족에서 새 반지를 만드는 주문제작은 최소 3주를 기준으로 상담합니다. 원하는 디자인과 기존 보석 활용 범위를 정한 뒤 수령 일정을 확인하므로, 기념일이나 촬영 날짜가 있다면 첫 문의 때 알려 주세요. 사양이 바뀌면 최종 금액과 예정일을 다시 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "사진 상담에는 무엇을 보내면 좋나요?",
    "paragraphs": [
      "밝은 곳에서 반지 정면을 찍고, 옆면 사진에는 보석 높이와 난집·밴드의 연결이 보이도록 담아 주세요. 안쪽 사진과 확인 가능한 소재 각인, 함께 착용하는 반지가 있으면 조합 사진도 준비합니다. 크기 참고가 필요할 때는 반지 옆에 자를 두되 보석에 힘을 가하지 않도록 놓아 주세요.",
      "현재 반지에서 남기고 싶은 부분과 원하는 변화를 한 문장씩 적어 주세요. 예를 들어 “가운데 다이아는 유지하고 싶어요”, “밴드는 매끈한 형태가 좋아요”, “높이와 옷감 걸림을 줄이고 싶어요”처럼 전달할 수 있습니다. 사진 상담 후 실물 확인이 필요한 부분과 방문 준비사항을 안내받으세요."
    ],
    "bullets": [
      "반지 정면·옆면·안쪽과 소재 각인 사진",
      "걸리는 위치와 불편함이 시작된 시점",
      "유지할 보석·디자인과 바꾸고 싶은 부분",
      "원하는 디자인 참고 사진, 예산 범위와 수령 희망일"
    ],
    "table": null
  },
  {
    "title": "종로 귀족에 낮은 세팅 리폼 상담하기",
    "paragraphs": [
      "보관만 하게 되는 높은 다이아 반지가 있다면 현재 반지 사진부터 카톡으로 보내 주세요. 디자인을 아직 고르지 못했어도 불편한 점과 유지하고 싶은 부분을 알려 주면 상담에 필요한 정보를 확인할 수 있습니다. 아래 상담 내용 복사 버튼에서 준비 항목을 복사한 뒤 본인의 내용을 적어 보내세요.",
      "문의할 때는 이렇게 적어 보세요. “가지고 있는 다이아 반지가 높아 옷에 자주 걸립니다. 가운데 보석을 유지하면서 낮은 세팅으로 바꾸고 싶습니다. 정면·옆면·안쪽 사진을 보냅니다. 기존 밴드를 활용할 수 있는지와 새로 제작하는 경우의 견적을 상담하고 싶습니다. 예산은 ○○원 정도이고 희망 수령일은 ○월 ○일입니다.”",
      "귀족 매장은 서울 종로구 종로 173 종묘귀금속백화점 101호입니다. 전화 02-766-4789 또는 카카오톡으로 문의할 수 있습니다. 종로 방문 전 사진으로 원하는 변경을 전달하고, 반지 실물과 보유한 감정서를 함께 확인할 일정을 상의해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "보석을 잡는 발을 직접 굽히거나 난집을 눌러 높이를 조정하지 마세요. 현재 상태를 확인한 뒤 작업 방법을 상담하세요.",
  "재사용할 보석과 부품, 새로 제작할 부분, 최종 금액과 수령일을 작업 전에 확인하고 상담 내용을 보관하세요."
]
const relatedLinks = [
  {
    "to": "/guide/diamond-ring-resetting-cost",
    "label": "다이아 반지 리세팅 견적 항목",
    "description": "보석 탈착과 새 금속·세팅·마감 비용을 확인할 때 참고하세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "프롱·베젤 등 세팅 종류 비교",
    "description": "보석을 고정하는 방식과 원하는 외관을 함께 살펴보세요."
  },
  {
    "to": "/guide/wedding-band-guard-ring-guide",
    "label": "웨딩밴드·가드링과 함께 착용하기",
    "description": "겹쳐 끼는 반지의 높이와 접촉 위치를 확인하세요."
  },
  {
    "to": "/custom",
    "label": "귀족 리폼·주문제작 상담 안내",
    "description": "참고 사진과 예산을 보내 제작 가능 범위를 확인하세요."
  },
  {
    "to": "/contact",
    "label": "종로 매장 위치와 문의하기",
    "description": "사진 상담 후 방문 시 필요한 준비물을 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '다이아 반지 낮추기, 리세팅 전 확인할 것'
const gmArticleLead = '다이아 반지의 높은 세팅이 불편하다면 기존 다이아와 반지 구조를 확인해 낮은 디자인으로 리세팅할 수 있는지 상담하세요. 현재 반지의 정면·옆면·안쪽 사진에 옷에 걸리는 위치와 바꾸고 싶은 부분을 표시하면 상담을 시작하기 좋습니다. 가능한 높이와 제작 범위는 보석의 실제 치수와 고정 상태를 확인한 뒤 정합니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '다이아 반지 낮추기'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '다이아 반지 낮은 세팅 리폼'
const gmHeroAlt = '높은 프롱 세팅과 낮은 베젤 세팅의 금빛 다이아 반지를 옆면에서 비교한 가상 디자인'
const gmHeroCaption = '세팅 높이와 옆면 구성을 설명하기 위해 AI로 생성한 두 가지 가상 디자인 예시입니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '세팅 높이와 착용 활동의 관계는 Stuller, 프롱·베젤의 구조와 마감·점검 원칙은 GIA 자료를 참고했습니다. 사진 준비와 문의 예시는 이 글의 상담 목적에 맞춰 작성했습니다. 제작 가능 범위와 일정은 귀족의 공식 안내 및 개별 제품 확인을 기준으로 상담합니다.'
const gmSources = [
  {
    "label": "GIA — 반지 세팅과 일상 착용 안내",
    "url": "https://4cs.gia.edu/en-us/blog/guide-to-ring-settings/",
    "note": "프롱·베젤의 구조와 걸림, 세팅의 마감·점검에 관한 설명을 참고했습니다."
  },
  {
    "label": "Stuller — 중심 보석 높이와 착용감",
    "url": "https://blog.stuller.com/5-countersketch-design-options/",
    "note": "Center Gem Height 항목에서 보석 높이와 착용 활동을 함께 고려하는 원칙을 확인했습니다."
  },
  {
    "label": "귀족 — 리폼·주문제작 안내",
    "url": "https://noblessegold.com/custom",
    "note": "소재·상태별 제작 가능 범위 상담과 최소 3주 제작 기준을 확인했습니다."
  },
  {
    "label": "귀족 — 사진 상담과 종로 매장 위치",
    "url": "https://noblessegold.com/contact",
    "note": "사진·예산·수령일 준비 항목, 주소와 전화번호를 확인했습니다."
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
