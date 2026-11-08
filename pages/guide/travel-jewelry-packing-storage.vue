<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/travel-jewelry-packing-storage'
const pageTitle = '여행 주얼리 보관, 엉킴·분실 줄이는 법 | 귀족'
const pageDescription = '여행 주얼리 보관은 제품별 분리 수납과 수량 확인부터 시작하세요. 목걸이·반지·귀걸이·진주를 나눠 챙기는 표, 보관함을 닫기 전 확인할 점, 숙소와 퇴실 전 체크 순서를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/travel-jewelry-packing-storage-hero.webp`
const publishedAt = '2026-11-09'
const updatedAt = ''
const faqItems = [
  {
    "question": "여러 목걸이를 한 파우치에 넣어도 되나요?",
    "answer": "각 목걸이의 체인과 장식이 서로 닿지 않도록 개별 칸이나 주머니를 나누는 편이 좋습니다. 큰 주머니 하나에 여러 줄을 그대로 넣으면 이동 중 섞일 수 있습니다."
  },
  {
    "question": "여행용 보관함은 무엇을 보고 고르나요?",
    "answer": "가지고 갈 제품 수뿐 아니라 체인 길이, 반지 장식 높이, 귀걸이 침의 위치를 확인하세요. 뚜껑이 보석을 누르지 않고 체인이 지퍼에 끼지 않는 구성이 중요합니다."
  },
  {
    "question": "진주도 다른 귀금속과 함께 보관하나요?",
    "answer": "진주는 금속이나 단단한 보석이 표면에 닿지 않게 별도로 담으세요. 부드럽고 통기성 있는 천 주머니를 쓰고, 지나치게 건조한 환경과 높은 열을 피합니다."
  },
  {
    "question": "숙소에서 잠깐 벗을 때도 케이스를 써야 하나요?",
    "answer": "벗은 제품을 되돌려 놓을 자리를 정해 두는 방법을 권합니다. 휴지·수건 위나 세면대 가장자리보다 제품을 구분해 담는 케이스를 쓰고, 퇴실 전 출발 사진과 수량을 대조하세요."
  },
  {
    "question": "출발 전에 잠금장치가 헐거우면 바로 수리되나요?",
    "answer": "제품 상태와 필요한 작업에 따라 달라집니다. 전체 사진과 잠금장치 사진, 출발일을 보내 가능 여부와 수령 일정을 먼저 상담하세요. 사진만으로 당일 수리를 약속할 수는 없습니다."
  }
]
const quickAnswers = [
  "여러 제품을 큰 파우치 하나에 그대로 넣기보다, 서로 닿지 않는 개별 칸이나 안감 있는 주머니를 사용하세요.",
  "보관함은 넣을 때뿐 아니라 닫을 때도 확인하세요. 체인이 지퍼에 끼거나 솟은 보석과 귀걸이 침이 뚜껑에 눌리면 안 됩니다.",
  "숙소에서는 벗은 주얼리를 정해 둔 케이스로 돌려놓고, 퇴실 전 출발 사진과 제품·뒷마개 수량을 대조하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "여행에 가져갈 주얼리는 어떻게 추리나요?",
    "paragraphs": [
      "여행 일수만큼 새 조합을 챙기기보다 실제 착용할 장면부터 적어 보세요. 식사 자리에서만 쓸 목걸이인지, 이동 중에도 낄 반지인지 나누면 가져갈 제품을 줄이기 쉽습니다. 물놀이나 활동이 많은 일정에는 계속 벗어 두어야 하는 제품이 얼마나 되는지도 생각해 보세요.",
      "GIA는 여행에 가져갈 주얼리를 사진으로 기록하고, 필요한 만큼만 준비하도록 안내합니다. 사진에는 귀걸이 양쪽과 뒷마개처럼 작은 부속도 함께 담으세요. 귀족에서는 제품별로 수납 위치를 정한 뒤 그 배치도 한 장 남겨 두는 방법을 제안합니다. 사진은 소지품 확인을 돕는 기록이며 분실 방지를 보장하지는 않습니다."
    ],
    "bullets": [
      "목걸이 1개, 반지 1개, 귀걸이 1쌍처럼 제품 단위로 적기",
      "분리되는 뒷마개와 별도 장식도 함께 확인하기",
      "착용 계획이 없는 제품은 짐에서 빼기"
    ],
    "table": null
  },
  {
    "title": "목걸이·반지·귀걸이는 어떻게 나눠 담나요?",
    "paragraphs": [
      "제품끼리 닿지 않는 공간을 먼저 확보하세요. GIA의 보관 안내는 부드럽게 구분된 반지 칸과 개별 케이스 같은 완충 수납을 권합니다. 같은 금빛 제품끼리도 장식이나 보석이 다른 제품의 표면에 닿을 수 있으므로, 소재별로 한데 모으는 것만으로는 충분하지 않습니다.",
      "아래 표는 휴대용 보관함에 배치할 때의 확인 순서입니다. 칸 수가 많아도 내 주얼리의 길이와 높이에 맞지 않으면 무리하게 채우지 마세요. 특히 목걸이 두 줄을 한 칸에 겹쳐 넣고 펜던트만 나누는 방식은 체인이 섞일 여지를 남깁니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "제품",
        "수납할 때",
        "닫기 전 확인"
      ],
      "rows": [
        [
          "목걸이·체인 팔찌",
          "제품마다 별도 공간을 쓰고 체인을 급하게 꺾지 않기",
          "체인과 펜던트가 칸막이·지퍼 사이로 나오지 않는지"
        ],
        [
          "반지",
          "크기에 맞는 부드러운 슬롯이나 개별 칸에 넣기",
          "솟은 보석을 뚜껑이 누르지 않는지"
        ],
        [
          "귀걸이",
          "짝과 뒷마개를 구분해 전용 홀이나 작은 칸에 넣기",
          "침이 휘거나 다른 제품을 찌를 위치인지"
        ],
        [
          "진주 장식",
          "다른 금속·보석과 떨어진 부드러운 천 주머니에 넣기",
          "진주 표면에 단단한 장식이 닿지 않는지"
        ]
      ]
    }
  },
  {
    "title": "작은 보관함이면 안전하게 가져갈 수 있나요?",
    "paragraphs": [
      "작은 크기보다 안쪽의 여유와 분리 상태가 중요합니다. 제품을 넣은 뒤 뚜껑을 힘으로 눌러 닫아야 한다면 배치를 바꾸거나 더 알맞은 케이스를 쓰세요. 케이스 밖으로 체인이 나온 채 지퍼를 닫지 않도록 가장자리를 한 번 더 확인합니다.",
      "진주는 다른 금속 장식과 따로 보관하고, 부드럽고 통기성 있는 파우치를 선택하세요. GIA는 진주와 오팔을 지나치게 건조한 환경에 두지 않도록 안내합니다. 모든 주얼리에 같은 밀폐·건조 방식을 적용하기보다 제품별 관리 지침을 따르는 것이 좋습니다.",
      "로션과 향수 등 액체류는 주얼리와 다른 주머니에 넣어 누출 시 바로 닿지 않게 하세요. 이동 중에는 주얼리 케이스를 직접 관리할 수 있는 가방에 챙기는 편이 좋습니다. 가방 속에서도 무거운 물건 아래에 눌리지 않는 자리를 정해 둡니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "숙소에서 벗은 반지와 목걸이는 어디에 두나요?",
    "paragraphs": [
      "세면대·침대·화장대에 각각 놓기보다, 벗으면 되돌려 놓을 케이스를 먼저 정하세요. 샤워나 수영 전에 주얼리를 빼야 한다면 외출 직전 급하게 주머니에 넣지 않도록 미리 수납합니다. GIA도 염소 처리된 수영장에 들어가기 전에 주얼리를 벗도록 안내합니다.",
      "작은 귀걸이를 휴지에 싸 놓거나 반지를 수건 위에 두면 정리 과정에서 함께 치우기 쉽습니다. 잠깐 벗을 때도 제품을 구분해 담을 수 있는 케이스를 사용하세요. 젖은 세면대 주변에서 귀걸이 뒷마개를 분리하는 대신, 밝고 평평한 마른 곳에서 한 쌍씩 정리하는 방법을 권합니다.",
      "퇴실할 때는 케이스가 가방에 있다는 사실만 확인하지 말고 내용물을 대조하세요. 빈 칸이 있다면 착용 중인 제품인지, 다른 곳에 벗어 둔 것인지 확인한 뒤 짐을 닫습니다. 아래 순서는 숙소를 옮길 때마다 반복할 수 있는 소지품 확인 예시입니다."
    ],
    "bullets": [
      "출발 때 찍은 사진과 현재 제품 수량 비교하기",
      "귀걸이 양쪽과 뒷마개가 모두 있는지 확인하기",
      "비어 있는 수납칸과 현재 착용 중인 제품 맞춰 보기",
      "케이스를 닫은 뒤 정해 둔 가방 위치에 넣기"
    ],
    "table": null
  },
  {
    "title": "여행 전 어떤 상태면 매장에 문의하나요?",
    "paragraphs": [
      "잠금장치가 완전히 닫히지 않거나 연결 고리에 벌어진 틈이 보이면 여행용 파우치부터 고르기보다 상태를 확인하세요. 보석이 흔들리는 느낌이 있거나 귀걸이 침이 휘었다면 억지로 착용하거나 손으로 펴지 말고 사진과 함께 문의하는 것이 좋습니다. GIA의 여행 안내도 출발 전 세팅과 잠금장치를 확인하도록 권합니다.",
      "종로 귀족에는 제품 전체와 걱정되는 부분의 사진, 알고 있는 소재, 출발일을 함께 보내 주세요. “여행에 가져갈 목걸이인데 잠금이 전보다 헐거운 것 같습니다”처럼 변화가 생긴 부분을 적으면 상담에 도움이 됩니다. 사진만으로 수리 가능 여부나 완료일이 확정되는 것은 아니며, 제품 상태와 필요한 작업을 확인한 뒤 안내합니다.",
      "여행이나 기념일에 맞춰 새 주얼리를 주문제작하려면 최소 3주를 기준으로 상담하세요. 이는 수리 기간을 뜻하지 않습니다. 귀족은 서울 종로구 종로 173 종묘귀금속백화점 101호에 있으며, 방문 전 카카오톡으로 필요한 작업과 희망 수령일을 문의할 수 있습니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "보관함과 파우치는 접촉과 눌림을 줄이는 용도입니다. 과도하게 채우거나 강한 충격을 주어도 제품이 보호되는 것은 아닙니다.",
  "엉킨 체인을 여행 준비 중 급하게 잡아당기지 마세요. 링크가 꺾였거나 보석·진주 장식이 매듭에 걸렸다면 상태부터 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/necklace-untangling-guide",
    "label": "이미 엉킨 목걸이 확인 순서",
    "description": "매듭을 풀기 전에 손상과 중단 기준을 확인하세요."
  },
  {
    "to": "/guide/pearl-necklace-cleaning-storage",
    "label": "진주 목걸이 세척·보관법",
    "description": "착용 후 관리와 실·매듭 건조 방법을 이어서 살펴보세요."
  },
  {
    "to": "/guide/earring-back-lost-types",
    "label": "귀걸이 뒷마개를 잃어버렸다면",
    "description": "남은 귀걸이에 맞는 뒷마개 확인 기준을 보세요."
  },
  {
    "to": "/repair",
    "label": "귀족 수리·AS 상담",
    "description": "잠금장치와 연결부 상태를 출발 전에 문의하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '여행 주얼리 보관, 엉킴·분실 줄이는 법'
const gmArticleLead = '여행 주얼리는 제품마다 수납 공간을 나누고, 가져갈 수량과 벗어 둘 장소를 미리 정해 보관하세요. 목걸이는 서로 얽히지 않게, 반지와 귀걸이는 눌리거나 부딪히지 않게 챙기는 것이 기본입니다. 출발 전에 사진을 남겨 두면 숙소를 옮길 때 빠진 물건이 없는지 비교하기 좋습니다.'
const gmArticleCategory = '관리'
const gmArticleKeyword = '여행 주얼리 보관'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '여행 전 주얼리 잠금장치·보관 상태 상담'
const gmHeroAlt = '여행용 보관함에 나눠 담은 금빛 반지·귀걸이·목걸이와 별도 천 파우치의 진주 팔찌'
const gmHeroCaption = '분리 수납을 설명하기 위한 AI 생성 예시입니다. 귀족의 실제 판매 제품이나 보관함 구성은 아닙니다.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 분리 수납·사진 기록·보석별 관리 안내를 참고했습니다. 제품별 수납표와 숙소 확인 순서는 이를 일상적인 여행 준비에 적용한 제안입니다. 제품의 소재·처리·상태에 따라 관리법이 달라질 수 있으며, 귀족의 수리 가능 여부와 일정은 별도 상담으로 확인합니다.'
const gmSources = [
  {
    "label": "GIA — 여행 중 보석별 보관과 착용",
    "url": "https://4cs.gia.edu/en-us/blog/traveling-style-guide-traveling-jewelry/",
    "note": "진주의 분리 보관, 화장품과의 분리, 출발 전 잠금장치·세팅 점검을 참고했습니다."
  },
  {
    "label": "GIA — 주얼리를 가지고 여행할 때의 준비",
    "url": "https://4cs.gia.edu/en-us/blog/traveling-with-jewelry/",
    "note": "가져갈 제품의 사진 기록, 직접 휴대하기, 적은 수량으로 준비하기를 참고했습니다."
  },
  {
    "label": "GIA — 주얼리 보관 기본 원칙",
    "url": "https://www.gia.edu/gia-news-research-tips-caring-jewelry",
    "note": "부드러운 칸막이와 완충 보관, 진주·오팔의 지나치게 건조한 환경 주의를 참고했습니다."
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
