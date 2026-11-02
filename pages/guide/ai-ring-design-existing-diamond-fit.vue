<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-ring-design-existing-diamond-fit'
const pageTitle = '보유 다이아로 AI 반지 디자인 맞추기 | 귀족'
const pageDescription = '가지고 있는 다이아로 AI 반지를 맞추려면 실물 보석을 기준으로 디자인을 조정하세요. 원본 사진과 생성 이미지 구분, 치수·중심석 비율·주변 장식 비교법을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-ring-design-existing-diamond-fit-hero-d308fb8e.webp`
const publishedAt = '2026-11-02'
const updatedAt = ''
const faqItems = [
  {
    "question": "내 다이아 사진을 AI에 넣었으면 결과물도 같은 보석인가요?",
    "answer": "같은 보석의 모습이 그대로 보존됐다고 단정할 수 없습니다. 생성 과정에서 외곽 모양이나 비율, 표면 표현이 달라질 수 있으므로 원본 사진과 결과 이미지를 따로 보내고 실제 보석 정보로 확인해야 합니다."
  },
  {
    "question": "보유 다이아보다 AI 반지의 중심석이 커 보이면 어떻게 하나요?",
    "answer": "보유 다이아를 유지할지부터 알려 주세요. 같은 보석 치수를 적용한 상태에서 밴드와 주변 장식을 조정하는 안을 비교하면 됩니다. 화면에서 커 보이는 그림을 실제 보석 크기나 제작 사양으로 받아들이지 마세요."
  },
  {
    "question": "둥근 다이아로 타원형 중심석의 AI 반지를 맞출 수 있나요?",
    "answer": "둥근 다이아를 유지하는 조건에서 어떤 특징을 살릴지 상담해야 합니다. 타원형 보석 자체를 원하는지, 길쭉한 주변 윤곽이나 밴드 곡선을 원하는지 구분하세요. 가능한 변경 범위는 실제 다이아와 구조를 보고 확인합니다."
  },
  {
    "question": "보유 다이아를 쓰는 수정안 두 개는 어떤 조건으로 비교하나요?",
    "answer": "중심석의 형태와 치수를 같게 두고 바뀐 밴드·주변 장식을 비교하세요. 전체 크기가 달라졌다면 보석 자체의 변화인지 장식의 변화인지 나누어 묻고, 실제 보석 조건이 반영된 자료인지 확인하면 좋습니다."
  }
]
const quickAnswers = [
  "보유 다이아의 실물 사진과 AI 반지 이미지를 따로 보내세요. AI에 실물 사진을 넣어 생성했더라도 결과물이 같은 보석의 치수나 특징을 보존했다는 증거는 아닙니다.",
  "캐럿은 중량이며 실제 가로·세로·깊이를 대신하지 않습니다. 알고 있는 치수는 자료와 함께 보내고, 확인되지 않은 수치는 미확인으로 남겨 두세요.",
  "기존 다이아를 쓰는 안에서는 중심석을 같은 조건으로 두고 밴드·둘레 장식을 비교하세요. 원안의 인상을 유지하려고 보석까지 바꾸는 제안인지도 구분합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "가지고 있는 다이아와 AI 반지 사진은 어떻게 보내나요?",
    "paragraphs": [
      "실물 다이아를 확인할 자료와 원하는 반지 모양을 설명할 자료를 구분해 보내세요. 보유 다이아가 들어 있는 반지 사진에는 “사용하고 싶은 실제 보석”, AI 이미지에는 “바꾸고 싶은 반지 디자인”이라고 표시하면 됩니다. 나석으로 보관 중인지 기존 반지에 세팅돼 있는지도 함께 알려 주세요.",
      "실물 사진을 AI로 편집한 결과만 보내면 어느 부분이 원래 모습이고 어느 부분이 새로 만들어졌는지 구분하기 어렵습니다. 편집하지 않은 원본도 함께 보관해 주세요. 사진에서 다이아가 여러 개 보인다면 이번에 사용할 중심석을 표시하고, 주변의 작은 보석도 옮기려는지는 별도로 적습니다.",
      "GIA의 2024년 주얼리 AI 연구는 생성 이미지를 실제 주얼리로 옮길 때 소재와 치수, 제조 방식 등을 검토할 전문성이 필요하다고 설명합니다. 보유 다이아를 사용하는 경우에도 그림 속 보석보다 실제 사용할 다이아를 기준으로 제작 가능 범위를 확인해야 합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "AI 그림의 중심석이 내 다이아와 달라지면 어떻게 하나요?",
    "paragraphs": [
      "보유 다이아를 유지하는 것이 우선이라면, 생성 결과에서 중심석이 달라진 부분을 먼저 표시하세요. 둥근 다이아를 넣었는데 타원형으로 표현됐거나, 밴드에 비해 중심석이 훨씬 커진 그림은 그대로 비교 기준으로 삼기 어렵습니다. AI가 그린 장식과 실제 보석의 조건을 나누어 검토해야 합니다.",
      "예를 들어 둥근 다이아를 갖고 있는데 타원형 중심석의 AI 반지가 마음에 들었다면, 무엇이 좋은지 다시 골라 보세요. 타원형 보석 자체가 좋은지, 길쭉한 금속 테두리나 부드러운 밴드 곡선이 좋은지에 따라 수정 방향이 달라집니다. 기존 다이아를 유지하면서 주변 금속의 윤곽을 조정할 수 있는지부터 상담할 수 있습니다.",
      "이때 “보유 다이아 유지”와 “새 보석으로 교체 가능”을 구분해 알려 주세요. AI 그림에 맞춰 기존 보석의 모양이 저절로 바뀌는 것은 아닙니다. 재연마나 새 보석 구매까지 동의한 뜻으로 전달되지 않도록, 우선 검토할 범위를 명확히 적는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 캐럿이면 AI 디자인에 크기가 맞을까요?",
    "paragraphs": [
      "같은 캐럿이라는 이유만으로 크기가 맞는다고 볼 수는 없습니다. IGI는 같은 중량의 다이아도 형태와 위에서 보이는 치수에 따라 크기 인상이 달라질 수 있다고 설명합니다. AI 이미지에 적힌 “1캐럿” 같은 문구 역시 실측값이나 제작 치수로 사용할 수 없습니다.",
      "보유한 GIA 보고서가 있다면 Shape and Cutting Style과 Measurements 항목을 확인해 보내세요. GIA의 보고서 읽기 안내에서 라운드는 최소 직경–최대 직경과 깊이, 팬시 형태는 길이·너비·깊이로 치수를 설명합니다. 다른 기관의 보고서는 해당 항목과 단위를 원문 그대로 전달하면 됩니다.",
      "자료가 없거나 이미 세팅돼 일부가 가려졌다면 모르는 수치를 채워 넣을 필요는 없습니다. 전체 사진과 정면·옆면 사진으로 먼저 문의하고, 어떤 치수와 상태를 실물에서 확인해야 하는지 상담하세요. 아래 표는 다이아를 유지하면서 디자인을 바꿀 때 정리할 항목입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "비교 항목",
        "보유 다이아를 사용하는 안",
        "상담에서 확인할 것"
      ],
      "rows": [
        [
          "중심석 형태",
          "보유한 다이아의 실제 외곽을 기준으로 함",
          "AI 결과에서 원형·타원형 등이 바뀌지 않았는지"
        ],
        [
          "중심석 치수",
          "자료로 확인한 치수와 미확인 수치를 구분함",
          "후보 디자인에도 같은 보석 치수가 반영됐는지"
        ],
        [
          "사용할 보석 범위",
          "기존 중심석 한 알과 추가 보석을 구분함",
          "그림 속 주변 보석이 새로 필요한 구성인지"
        ],
        [
          "밴드의 폭과 곡선",
          "중심석을 같은 조건으로 두고 비교함",
          "밴드가 달라져 중심석의 존재감이 어떻게 바뀌는지"
        ],
        [
          "둘레 장식과 고정부",
          "선호하는 윤곽을 실물에 맞게 검토함",
          "실제 다이아를 받치는 부분과 장식의 변경 범위는 무엇인지"
        ]
      ]
    }
  },
  {
    "title": "내 다이아에 맞춘 수정안은 무엇을 비교하나요?",
    "paragraphs": [
      "수정안끼리 중심석의 형태와 치수가 같은지부터 확인하세요. 한 그림에서는 중심석이 크고 다른 그림에서는 작다면 밴드 차이만 비교하는 자료가 아닙니다. “같은 다이아를 넣은 상태에서 밴드 폭과 둘레 장식만 비교하고 싶다”고 요청하고, 확인 가능한 자료의 종류를 상담해 보세요.",
      "예를 들어 넓은 밴드와 가는 밴드 중 하나를 고를 때는 같은 중심석이 각각 얼마나 눈에 들어오는지 봅니다. 둘레 장식을 추가한 안에서는 다이아 자체가 커진 것인지, 금속이나 작은 보석까지 포함한 전체 윤곽이 커진 것인지 구분하세요. 생성 이미지의 확대 비율을 실제 치수 차이로 읽지 않는 것이 중요합니다.",
      "정면에서 마음에 드는 안을 골랐다면 보석 아래 받침과 고정 부분도 실물에 맞게 검토해야 합니다. AI 그림을 낮게 그렸다는 이유로 보유 다이아가 그 높이에 들어간다고 확정할 수는 없습니다. 원안에서 살릴 인상과 실제 보석 때문에 달라지는 부분을 나누어 설명받으세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 보유 다이아와 AI 디자인을 어떻게 문의하나요?",
    "paragraphs": [
      "보유 다이아의 원본 사진, 알고 있는 보석 정보, AI 반지 이미지와 함께 “이 다이아를 계속 사용할 계획”이라고 알려 주세요. 기존 반지의 금속도 활용하고 싶은지, 보석만 사용하는 방향인지도 구분하면 상담 범위가 선명해집니다. 보유석 사용 가능 여부는 실제 상태와 원하는 디자인을 확인한 뒤 판단합니다.",
      "문의 예시: “지금 반지에 있는 둥근 다이아를 계속 쓰면서 첨부한 AI 반지처럼 밴드를 바꾸고 싶습니다. AI 그림에서는 중심석이 더 크게 보이지만 새 보석 구매는 우선 생각하지 않고 있어요. 실제 다이아에 맞춰 밴드 곡선과 주변 장식을 조정할 수 있는지 상담받고 싶습니다. 알고 있는 보석 자료를 함께 보내며, 예산은 ○○원 안팎이고 희망일은 ○월 ○일입니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 자료를 보내 주세요. 유지할 다이아와 바꿀 디자인을 구분한 뒤 제작 가능한 구조, 실제 주문 사양과 견적·일정을 상담합니다. 생성 이미지만으로 보석 재사용이나 동일한 완성 모습을 확정하지는 않습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "보유 다이아 사진을 AI로 편집한 결과는 보석의 동일성·등급·실제 치수 확인 자료가 아닙니다. 편집 전 원본과 보유 자료를 따로 제시하세요.",
  "기존 반지에서 보석을 직접 빼거나 고정부를 벌려 확인하지 마세요. 상담을 위한 확인 범위와 필요한 작업은 실물 상태에 따라 안내받으세요."
]
const relatedLinks = [
  {
    "to": "/guide/ai-jewelry-custom-budget-guide",
    "label": "AI 디자인 주문제작 예산 조정하기",
    "description": "유지할 다이아를 정한 뒤 주변 구성과 견적 항목을 살펴보세요."
  },
  {
    "to": "/guide/gemstone-grading-vs-identification-report",
    "label": "보석 보고서에서 확인할 정보",
    "description": "보유 자료가 알려 주는 내용과 확인 범위를 구분하세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "다이아를 고정하는 세팅 종류",
    "description": "장식의 모양과 보석을 받치는 고정 방식을 나누어 보세요."
  },
  {
    "to": "/custom",
    "label": "보유 다이아에 맞춘 AI 반지 상담",
    "description": "실제 보석 사진과 원하는 AI 디자인을 함께 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 참고하기",
    "description": "밴드와 주변 장식을 설명할 디자인을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '보유 다이아로 AI 반지 디자인 맞추기'
const gmArticleLead = '보유 다이아로 AI 반지 디자인을 맞추려면, 사용할 다이아의 형태와 치수를 기준으로 밴드와 주변 장식을 조정하는 방향부터 상담하세요. AI 그림에서 중심석이 더 커지거나 다른 모양으로 바뀌었다면 그 부분도 짚어야 합니다. 실제 보석 사진과 AI 디자인을 나누어 보내면 “이 다이아는 유지하고 반지 모양을 바꾸고 싶다”는 요청이 분명해집니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '보유 다이아 AI 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '보유 다이아에 맞춘 AI 반지 디자인 상담'
const gmHeroAlt = '흰 보석 포장지 위의 둥근 무색 보석과 서로 다른 밴드를 그린 반지 스케치의 AI 예시'
const gmHeroCaption = '보유 보석을 기준으로 반지 디자인을 비교하는 상황을 표현한 AI 생성 이미지입니다. 실제 고객 보석·제작 사례나 치수가 검증된 도면이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA와 IGI의 자료를 참고했습니다. 보유 다이아를 고정 조건으로 정리한 표와 AI 수정안 비교·문의 문장은 상담을 돕는 예시이며, 보석 재사용이나 특정 구조의 제작 가능성을 보증하지 않습니다.'
const gmSources = [
  {
    "label": "GIA — AI 이미지를 실제 주얼리로 옮길 때의 검토",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "생성 이미지와 실제 제작 사양을 구분하는 근거로 참고했습니다."
  },
  {
    "label": "IGI — 같은 캐럿과 보이는 크기의 차이",
    "url": "https://www.igi.org/advice-on-carat-weight-advice-shape-spread-and-brightness/",
    "note": "캐럿과 위에서 보이는 크기를 구분하는 설명을 참고했습니다."
  },
  {
    "label": "GIA — 다이아 보고서의 형태·치수·중량 항목",
    "url": "https://4cs.gia.edu/files/GIA-how-to-read-a-diamond-dossier-EN.pdf",
    "note": "보고서에서 보석의 형태와 실제 치수를 읽는 정의를 참고했습니다."
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
