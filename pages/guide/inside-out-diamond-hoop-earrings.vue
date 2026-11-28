<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/inside-out-diamond-hoop-earrings'
const pageTitle = '다이아 링귀걸이, 인사이드 아웃 세팅 고르는 법 | 귀족'
const pageDescription = '다이아 링귀걸이의 앞쪽 바깥면과 뒤쪽 안쪽 면을 사진으로 구분해 보세요. 인사이드 아웃 후프의 보석 배치, 지름, 한 쌍 견적을 비교하는 방법입니다.'
const ogImage = `${siteConfig.url}/Image/guide/inside-out-diamond-hoop-earrings-hero.webp`
const publishedAt = '2026-11-28'
const updatedAt = ''
const faqItems = [
  {
    "question": "인사이드 아웃 링귀걸이는 안팎 전체에 보석이 있나요?",
    "answer": "주로 정면에서 보이는 앞쪽 바깥면과 뒤쪽 안쪽 면에 보석을 넣습니다. 두 줄의 길이는 제품마다 달라 사선 사진이나 세팅 도안으로 확인하세요."
  },
  {
    "question": "귀에 붙는 작은 후프에도 안쪽 장식이 잘 보일까요?",
    "answer": "착용 각도와 링 안쪽의 여유 공간에 따라 다릅니다. 비슷한 지름의 후프를 착용한 사선 사진에서 뒤쪽 안면이 얼마나 드러나는지 보세요."
  },
  {
    "question": "외경과 내경 중 어떤 치수를 보내야 하나요?",
    "answer": "전체 크기를 맞출 때는 바깥 끝끼리 잰 외경을 보내세요. 귓불이 들어가는 여유까지 맞추고 싶다면 안쪽 빈 공간의 치수도 함께 적어 주세요."
  },
  {
    "question": "한 쌍 총 1캐럿이면 알 하나가 1캐럿인가요?",
    "answer": "한 쌍 총 1캐럿은 두 귀걸이에 들어간 다이아 전체 무게입니다. 알 하나의 크기는 보석 지름이나 개별 중량으로 확인하세요."
  },
  {
    "question": "종로에서 주문제작할 때 준비할 것은 무엇인가요?",
    "answer": "선호하는 링 외경, 보석을 넣을 앞뒤 구간, 예산과 희망 수령일을 알려 주세요. 제작은 최소 3주 기준으로 가능 범위를 상담합니다."
  }
]
const quickAnswers = [
  "링 하나를 비스듬히 바라보면 가까운 쪽의 겉면과 먼 쪽의 속면이 함께 보입니다. 인사이드 아웃은 이 두 면에 작은 보석을 배치합니다.",
  "안팎에 장식이 있다는 말만으로 링 한 바퀴 전체의 세팅 범위를 알 수는 없습니다. 한쪽 귀걸이의 앞줄과 뒷줄이 각각 어디서 끝나는지 확인하세요.",
  "같은 예산으로 비교할 때는 링 외경, 한쪽의 앞·뒤 보석 수, 한 쌍 다이아 총중량, 한쪽 귀걸이 완성 무게를 구분해 요청하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "거울에서 보이는 두 줄은 링의 어느 면일까요?",
    "paragraphs": [
      "대표 사진에서 왼쪽 귀걸이 한 개만 보세요. 왼편 곡선에서는 보석이 링 밖을 향합니다. 오른편 곡선에서는 빈 공간 너머로 보석의 윗면이 보입니다. 링을 눕혀서 찍은 사진보다 이렇게 세워서 살짝 돌린 사진에서 차이를 찾기 쉽습니다.",
      "장식 구간은 디자인마다 달라집니다. 예를 들어 리타니가 공개한 모델은 귀걸이 한쪽에 앞줄 11개와 뒤쪽 안줄 7개를 배치합니다. 이런 식으로 구간을 나눠 물으면 사진 속 반짝임이 앞줄에서 온 것인지, 뒤쪽까지 보석을 넣어 생긴 것인지 알 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "앞면 세팅과 인사이드 아웃 중 무엇을 고를까요?",
    "paragraphs": [
      "머리를 귀 뒤로 넘겼을 때 링의 빈 공간이 넓게 보이는 후프를 즐겨 낀다면, 그 공간 너머의 금속 면을 보석으로 채우고 싶은지 생각해 보세요. 반대로 귓불 가까이 붙는 작은 링에서 앞쪽의 가는 보석 선만 보이길 원한다면, 기존 귀걸이 착용 사진에 그 선을 표시하는 편이 주문 의도를 전하기 쉽습니다.",
      "비교용 사진은 양쪽 제품을 같은 방향으로 세워 찍어 달라고 해보세요. 하나는 정면, 다른 하나는 옆면을 보여주는 상품 사진끼리 비교하면 안쪽 장식이 가려질 수 있습니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "받아볼 사진",
        "사진에서 볼 곳",
        "결정할 항목"
      ],
      "rows": [
        [
          "얼굴을 정면에서 본 착용 사진",
          "귓불 아래로 내려오는 길이",
          "평소 착용할 링의 크기"
        ],
        [
          "귀걸이를 비스듬히 세운 사진",
          "앞줄과 뒤쪽 안줄의 시작·끝",
          "보석을 넣을 구간"
        ],
        [
          "잠금장치를 연 옆면 사진",
          "침과 잠금쇠 주변의 빈 자리",
          "손으로 잡고 여닫을 공간"
        ]
      ]
    }
  },
  {
    "title": "링 지름과 한쪽 무게를 따로 확인하는 이유",
    "paragraphs": [
      "외경은 링의 바깥쪽 끝에서 반대쪽 바깥 끝까지 잰 값입니다. 원형 외경 20mm와 30mm 중 망설인다면 종이에 두 원을 그려 잘라 귀 옆에 대 보세요. 타원형은 가로와 세로가 달라 가장 긴 쪽과 가장 넓은 쪽을 모두 물어보면 좋습니다.",
      "같은 외경이라도 링 폭과 금속 구조, 보석 세팅에 따라 무게가 달라집니다. 하루 종일 낄 귀걸이를 고를 때는 평소 편한 후프 한쪽을 기준으로 삼으세요. 비교하려는 제품도 한쪽 완성 무게를 g 단위로 요청하면 실제 착용감을 가늠하는 데 도움이 됩니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "같은 총캐럿인데 보석 줄이 달라 보이는 이유",
    "paragraphs": [
      "한 쌍에 들어가는 다이아의 무게를 모두 더하면 총캐럿이 됩니다. 같은 총중량이라도 작은 알을 긴 구간에 촘촘히 물리거나, 비교적 큰 알을 짧게 이어 붙일 수 있습니다. 귀걸이 한쪽에 다이아가 몇 개 들어가는지, 앞뒤에 같은 크기의 알을 쓰는지도 함께 보세요.",
      "예를 들어 얇은 보석 선이 길게 이어진 모습을 원한다면 “한 쌍 1캐럿”이라는 조건에 더해 “안쪽 장식이 잠금쇠 가까이까지 보였으면 합니다”라고 말해보세요. 견적에서는 소재, 천연 또는 랩그로운 여부, 세팅 구간을 같은 조건으로 맞춰야 어느 부분에서 차이가 나는지 읽을 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 보낼 제작 문의 예시",
    "paragraphs": [
      "“지금 쓰는 외경 25mm 후프의 크기가 편합니다. 첨부한 사진에 표시한 앞면과 뒤쪽 안면에 작은 다이아 한 줄을 넣고 싶습니다. 한쪽 무게와 한 쌍 기준 견적을 함께 알려주실 수 있을까요?” 평소 귀걸이와 참고 디자인을 각각 한 장씩 보내면 원하는 크기와 보석 배치를 함께 설명할 수 있습니다.",
      "예산이나 무게가 걱정된다면 앞면만 세팅한 안과 뒤 안쪽까지 넣은 안을 같은 지름으로 요청해 보세요. 귀족 주문제작은 최소 3주가 필요하며, 실제 보석 수급과 잠금 구조 등 사양을 확인한 뒤 견적과 수령 가능일을 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "착용 사진에서 보이는 길이는 귀를 뚫은 위치와 촬영 각도에 따라 달라집니다. 지름을 비교할 때는 자를 댄 제품 사진도 함께 보세요.",
  "한 쌍의 다이아 총중량은 캐럿(ct), 귀걸이 한쪽 전체의 무게는 그램(g)으로 기록하면 견적과 착용 기준을 구분하기 쉽습니다. 다이아 1ct은 0.2g입니다."
]
const relatedLinks = [
  {
    "to": "/guide/earring-closure-selection-guide",
    "label": "귀걸이 잠금 방식 고르기",
    "description": "여닫는 구조와 평소 착용 습관을 함께 살펴보세요."
  },
  {
    "to": "/guide/diamond-stud-earrings-pair-total-carat",
    "label": "다이아 한 쌍 총캐럿 읽는 법",
    "description": "한쪽 중량과 두 짝 합계의 표기 차이를 비교하세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 상담",
    "description": "원하는 크기와 디자인 사진으로 제작 범위를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '다이아 링귀걸이, 인사이드 아웃 세팅 고르는 법'
const gmArticleLead = '인사이드 아웃 다이아 링귀걸이는 귓불 앞쪽으로 오는 링의 바깥면과, 링 너머로 보이는 뒤쪽의 안쪽 면에 보석을 물린 디자인입니다. 거울을 볼 때 앞뒤 두 곡선에서 다이아가 보이는 이유입니다. 구매 전에는 귀에 건 방향으로 찍은 사선 사진에서 두 줄이 어디까지 이어지는지 확인하세요.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '다이아 링귀걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '인사이드 아웃 다이아 링귀걸이 제작 상담'
const gmHeroAlt = '금빛 후프 귀걸이 한 쌍을 비스듬히 보았을 때 앞쪽 바깥면과 뒤쪽 안쪽 면에 이어진 둥근 보석 줄'
const gmHeroCaption = '보석이 놓이는 두 면을 보여주는 AI 생성 디자인 예시입니다. 앞쪽 호를 따라간 뒤 링 안으로 보이는 반대편 호도 살펴보세요.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '안팎의 보석 배치는 리타니의 제품 사양, 지름과 다이아 총중량 표기는 블루나일의 후프 귀걸이 사양을 참고했습니다. 본문의 외경과 주문 문구는 상담 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 다이아몬드 품질 요소와 캐럿",
    "url": "https://www.gia.edu/diamond-quality-factor",
    "note": "1캐럿은 0.2g으로 다이아의 중량을 나타내는 단위입니다."
  },
  {
    "label": "Ritani — 인사이드 아웃 후프의 앞뒤 보석 배치",
    "url": "https://www.ritani.com/products/round-lab-grown-diamond-inside-out-hoop-earrings-igi-certified-kj01916h-round-carat-2-00-metal-14kt-white-gold",
    "note": "개별 제품 예시에서 한쪽에 18알을 앞곡선과 뒤쪽 안면으로 나눕니다."
  },
  {
    "label": "Blue Nile — 라운드 인사이드 아웃 후프 사양",
    "url": "https://www.bluenile.com/jewelry/earrings/inside-out-round-hoops-1-inch-diameter-in-14k-white-gold-1-ct-tw-h-i-si1-si2-item-251089",
    "note": "후프의 지름 및 세팅된 다이아 총중량을 별도의 사양으로 안내합니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "소재와 참고 디자인, 희망 수령일을 확인하고 최소 3주 기준으로 제작 기간을 안내합니다."
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
