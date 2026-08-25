<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/necklace-untangling-guide'
const pageTitle = '목걸이 엉켰을 때 푸는 법: 당기지 말고 매듭 중심부터 | 귀족'
const pageDescription = '엉킨 목걸이는 양끝을 당기지 말고 잠금장치를 연 뒤 매듭 중심의 빈 공간부터 넓히세요. 가는 체인·펜던트·여러 목걸이 분리 순서와 작업을 멈출 손상 신호를 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/guide/necklace-untangling-hero.webp`
const publishedAt = '2026-07-24'

const faqItems = [
  {
    "question": "목걸이가 엉켰을 때 가장 먼저 무엇을 해야 하나요?",
    "answer": "목에서 힘으로 당기지 말고 제품을 분리한 뒤 잠금장치를 엽니다. 밝고 평평한 바닥에 체인 전체를 놓고, 매듭으로 들어가는 체인의 방향과 펜던트 위치를 확인하세요."
  },
  {
    "question": "엉킨 목걸이에 오일이나 가루를 사용해도 되나요?",
    "answer": "소재와 장식 상태를 확인하지 않은 경우에는 권하지 않습니다. 제품별 관리 지침을 확인하기 전에는 먼저 깨끗하고 마른 상태에서 매듭 중심의 빈 공간을 넓히는 방법을 시도하세요."
  },
  {
    "question": "바늘로 목걸이 매듭을 풀어도 되나요?",
    "answer": "끝이 날카로운 바늘로 체인을 긁거나 찍는 행동은 피하세요. 사용한다면 끝이 둥글고 표면이 매끄러운 도구 두 개를 매듭의 빈 공간에 얕게 넣고, 체인 끝을 당기지 않은 채 중심만 조금씩 넓힙니다."
  },
  {
    "question": "어떤 상태면 집에서 풀지 말아야 하나요?",
    "answer": "링크가 찌그러지거나 납작하게 꺾인 경우, 체인이 늘어난 경우, 잠금장치 손상이 보이는 경우, 보석 세팅이나 진주 실매듭이 매듭에 함께 걸린 경우에는 작업을 멈추고 실물 상담으로 확인하세요."
  },
  {
    "question": "목걸이가 다시 엉키지 않게 보관하려면 어떻게 하나요?",
    "answer": "잠금장치를 닫은 상태로 체인을 곧게 펴 제품별로 분리 보관하세요. 공식 보관 안내도 장신구를 서로 분리해 보관해 엉킴과 걸림을 줄이도록 권합니다."
  }
]

const quickAnswers = [
  "가장 먼저 잠금장치를 열고 목걸이를 밝고 평평한 바닥에 내려놓으세요.",
  "체인 양끝을 당기지 말고, 매듭 중심의 빈 공간을 둥근 도구로 조금씩 넓힌 뒤 느슨한 고리를 하나씩 빼세요.",
  "링크가 꺾이거나 늘어난 경우, 진주 실매듭·보석 세팅이 함께 걸린 경우에는 자가 작업을 멈추고 실물 점검을 받으세요."
]

const sections = [
  {
    "title": "양쪽 끝을 잡아당기기 전에 장력부터 없애세요",
    "paragraphs": [
      "목걸이가 엉켰을 때 잠금장치와 체인 끝을 양쪽으로 당기면 느슨한 고리가 조여져 매듭이 더 작아질 수 있습니다. 가는 링크와 연결 고리에 힘이 집중되지 않도록 먼저 잠금장치를 열고 체인을 편평하게 내려놓으세요.",
      "착용 중 엉킨 경우에는 목에 건 상태에서 도구를 사용하지 말고 제품을 먼저 분리합니다. 머리카락이 함께 끼었다면 체인과 피부를 분리한 뒤, 충분히 밝은 작업대에서 매듭을 확인하세요."
    ],
    "bullets": [
      "체인 양끝을 반대 방향으로 세게 당기지 않기",
      "목에 건 상태에서 날카로운 도구를 사용하지 않기",
      "잠금장치를 열어 체인에 걸린 장력 없애기",
      "매듭을 풀기 전 링크의 꺾임과 늘어짐 살피기"
    ]
  },
  {
    "title": "밝고 평평한 바닥에서 체인 경로를 확인하세요",
    "paragraphs": [
      "밝은색의 매끈한 작업면에 목걸이를 놓으면 가는 링크와 매듭의 빈 공간을 확인하기 쉽습니다. 체인이 매듭으로 들어가고 나오는 방향을 따라가며 한 줄의 매듭인지, 여러 목걸이가 서로 통과해 생긴 엉킴인지 구분하세요.",
      "잠금장치를 열고 펜던트나 참이 움직이는 제품은 매듭에서 조금 떨어뜨립니다. 펜던트가 매듭 가까이에 있으면 체인을 당겨 이동시키기보다, 매듭을 느슨하게 만든 다음 충분한 공간을 확보해 옮기는 편이 좋습니다."
    ],
    "bullets": [
      "충분한 조명과 밝은 작업면 준비",
      "잠금장치를 열어 체인 전체를 편평하게 놓기",
      "펜던트와 참을 매듭 바깥쪽으로 옮기기",
      "매듭으로 들어가는 체인 줄 수와 방향 확인"
    ]
  },
  {
    "title": "매듭 중심을 넓힌 뒤 느슨한 고리부터 빼세요",
    "paragraphs": [
      "매듭 바깥의 체인을 잡아당기지 말고 중심에 보이는 작은 빈 공간을 찾습니다. 끝이 둥글고 표면이 매끄러운 도구 두 개를 서로 다른 방향에서 얕게 넣고, 링크가 눌리지 않도록 간격을 아주 조금씩 넓혀 보세요.",
      "중심이 느슨해지면 매듭 바깥으로 가장 많이 나온 고리 하나를 손끝으로 빼냅니다. 한 번에 완전히 풀려고 하지 말고 중심 넓히기와 고리 빼기를 반복하세요. 도구가 링크를 누르거나 긁는 느낌이 들면 각도를 바꾸거나 작업을 멈춥니다."
    ],
    "bullets": [
      "매듭 중심의 빈 공간 찾기",
      "둥근 도구 두 개를 얕게 넣기",
      "도구 간격을 조금씩 넓혀 중심 느슨하게 만들기",
      "바깥으로 나온 고리를 한 개씩 빼기",
      "중간마다 링크의 꺾임 여부 확인"
    ]
  },
  {
    "title": "여러 목걸이는 잠금장치별 경로를 나누세요",
    "paragraphs": [
      "여러 목걸이가 함께 엉켰다면 잠금장치와 반대쪽 고리를 한 쌍씩 찾아 각 목걸이의 경로를 구분합니다. 가장 바깥에 걸린 체인이 어느 매듭을 통과했는지 확인하고, 완전히 분리되는 한 줄부터 작업대의 다른 위치로 옮기세요.",
      "같은 길이와 굵기의 목걸이가 섞였다면 잠금장치 모양을 기준으로 줄을 추적할 수 있습니다. 분리한 목걸이는 잠금장치를 닫아 다른 체인과 구분하고, 펜던트가 좁은 고리 사이에 걸렸다면 매듭 공간이 충분히 넓어진 뒤 이동합니다."
    ],
    "bullets": [
      "잠금장치와 반대쪽 고리를 한 제품씩 짝지어 확인",
      "바깥쪽에서 분리 가능한 체인부터 옮기기",
      "펜던트가 지나갈 공간을 충분히 확보하기",
      "분리한 목걸이는 잠금장치를 닫아 구분하기"
    ]
  },
  {
    "title": "오일과 날카로운 공구는 소재 확인 전 사용하지 마세요",
    "paragraphs": [
      "오일, 가루, 세제 같은 물질을 매듭에 임의로 바르는 방법은 목걸이의 소재와 장식 상태에 따라 적합하지 않을 수 있습니다. 먼저 마른 상태에서 매듭 중심을 느슨하게 하는 방법을 시도하고, 제품별 관리 지침을 확인하기 전에는 액체나 화학제품 사용을 피하세요.",
      "칼끝, 송곳, 절단 도구처럼 날카롭거나 힘이 강한 공구는 링크를 찍거나 긁을 수 있습니다. 스네이크 체인이나 헤링본 체인처럼 표면이 연속된 형태에서 꺾임이나 눌림이 보이면 계속 펴려 하지 말고 상태를 확인하세요."
    ],
    "bullets": [
      "세제·오일·화장품을 임의로 매듭에 바르지 않기",
      "칼과 날카로운 바늘로 링크 사이를 찍지 않기",
      "펜치로 체인을 직접 잡아당기거나 비틀지 않기",
      "납작한 꺾임과 눌림이 보이면 작업 멈추기"
    ]
  },
  {
    "title": "푼 뒤에는 링크와 잠금장치를 확인해 분리 보관하세요",
    "paragraphs": [
      "매듭이 풀린 뒤에는 체인을 손바닥 위나 평평한 곳에 곧게 놓고 전체 흐름을 확인하세요. 특정 부분이 꺾여 올라오거나 링크 간격이 달라 보이고, 연결 고리 틈이나 잠금장치의 닫힘 상태가 평소와 다르다면 억지로 착용하지 말고 실물 상담으로 확인하는 것이 좋습니다.",
      "보관할 때는 잠금장치를 닫고 체인을 곧게 펴 제품별로 분리합니다. 공식 보관 안내도 장신구를 분리해 보관해 엉킴과 걸림을 줄이도록 권합니다. 관리 방식은 소재와 제품 상태에 따라 다를 수 있으므로 제품별 관리 지침을 함께 확인하세요.",
      "진주 실매듭이나 진주 장식이 포함된 목걸이의 세척과 보관은 관련 가이드에서 확인할 수 있습니다. 링크가 늘어나거나 꺾여 있다면 목걸이 끊어짐의 물리적 원인과 점검 항목도 이어서 살펴보세요."
    ],
    "bullets": [
      "링크 벌어짐, 눌림, 비정상적인 꺾임 확인",
      "잠금장치와 연결 고리가 제대로 닫히는지 확인",
      "체인을 제품별 파우치나 칸막이에 분리 보관",
      "여행할 때도 서로 닿지 않는 수납칸 사용"
    ]
  }
]

const cautions = [
  "힘을 줘도 매듭 중심이 움직이지 않으면 계속 당기지 말고 체인 종류와 손상 상태를 먼저 확인하세요.",
  "체인 변형이나 잠금장치 손상이 보이거나 심하게 엉킨 경우에는 억지로 풀지 말고 실물 상담으로 확인하세요.",
  "진주 실매듭, 보석 세팅, 접착 장식이 매듭에 함께 걸린 경우에는 도구나 액체를 사용하기 전에 작업을 멈추세요."
]

const relatedLinks = [
  {
    "to": "/guide/pearl-necklace-cleaning-storage",
    "label": "진주 목걸이 세척·보관법, 광택과 실 손상 줄이는 관리 순서",
    "description": "진주 실매듭이나 진주 장식이 포함된 목걸이의 세척과 보관 시 확인할 점을 정리했습니다."
  },
  {
    "to": "/guide/necklace-breakage-meaning-and-causes",
    "label": "목걸이 끊어짐은 징조일까? 의미보다 먼저 확인할 물리적 원인과 수리 점검",
    "description": "엉킴을 푼 뒤 링크 늘어짐·꺾임·끊어짐 징후가 보일 때 확인할 물리적 원인과 점검 항목입니다."
  },
  {
    "to": "/guide/necklace-clasp-types",
    "label": "목걸이 잠금장치 종류, 스프링링·랍스터·토글 차이",
    "description": "목걸이 잠금장치의 결합 구조와 연결부 점검 기준을 비교했습니다."
  },
  {
    "to": "/guide/necklace-chain-types-guide",
    "label": "목걸이 체인 종류, 베네치아·커브·로프·스네이크 차이",
    "description": "체인 구조별 특징과 관리 시 살펴볼 점을 안내합니다."
  }
]

const updatedAt = '2026-08-25'
// guide-manager:data:start
const gmArticleTitle = '목걸이 엉켰을 때 푸는 법: 당기지 말고 매듭 중심부터'
const gmArticleLead = '엉킨 목걸이는 양쪽 끝을 당기지 말고 잠금장치를 연 뒤 밝고 평평한 바닥에 내려놓으세요. 매듭 중심의 빈 공간을 조금씩 넓혀 느슨한 고리부터 빼는 것이 핵심입니다. 링크가 납작하게 꺾였거나 보석 세팅·진주 실매듭이 매듭에 함께 걸렸다면 도구를 넣지 말고 실물 점검을 받으세요.'
const gmArticleCategory = '관리'
const gmArticleKeyword = '목걸이 엉켰을 때 푸는 법'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '엉킨 목걸이와 체인 손상 점검'
const gmHeroAlt = '밝은 주얼리 트레이 위에 작은 매듭이 생긴 가는 옐로우골드 목걸이 체인'
const gmSourceNote = '보관 시 장신구를 분리하면 엉킴과 걸림을 줄이는 데 도움이 된다는 내용은 Tiffany & Co.의 공식 보관 안내를 참고했습니다. 제품 관리 방식은 소재와 상태에 따라 달라질 수 있으므로 공식 관리 안내의 적용 범위를 함께 확인하세요.'
const gmSources = [
  {
    "label": "Tiffany & Co. How to Store Jewelry",
    "url": "https://www.tiffany.com/faq/care-and-repair-faq/how-to-store-jewelry/",
    "note": "장신구를 서로 분리해 보관해 엉킴과 걸림을 줄이도록 안내합니다."
  },
  {
    "label": "Tiffany & Co. Jewelry Care",
    "url": "https://www.tiffany.com/care-and-repair/jewelry-care.html",
    "note": "장신구를 다룰 때 제품 상태와 소재에 맞는 주의가 필요하다는 제조사 관리 안내입니다."
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
    { property: 'og:locale', content: 'ko_KR' },
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
        { name: '목걸이 엉켰을 때 푸는 법', path: pagePath },
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: pageTitle,
        description: pageDescription,
        image: ogImage,
        datePublished: publishedAt,
        dateModified: updatedAt || publishedAt,
        mainEntityOfPage: `${siteConfig.url}${pagePath}`,
        author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        publisher: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
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
    :quick-answers="quickAnswers"
    :sections="sections"
    :cautions="cautions"
    :faq-items="faqItems"
    :related-links="relatedLinks"
    :source-note="gmSourceNote"
    :sources="gmSources"
  />
</template>
