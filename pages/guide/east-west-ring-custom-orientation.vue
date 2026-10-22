<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/east-west-ring-custom-orientation'
const pageTitle = '이스트웨스트 반지 주문제작, 가로 세팅 고르기 | 귀족'
const pageDescription = '이스트웨스트 반지는 길쭉한 보석을 손가락을 가로지르는 방향으로 놓은 디자인입니다. 같은 보석의 가로·세로 배치, 테두리를 포함한 전체 폭과 측면 높이를 비교해 종로 귀족에 주문제작 상담을 문의해 보세요.'
const ogImage = `${siteConfig.url}/Image/guide/east-west-ring-custom-orientation-hero-d0641865.webp`
const publishedAt = '2026-10-13'
const updatedAt = '2026-10-22'
const faqItems = [
  {
    "question": "이스트웨스트는 다이아몬드 컷의 한 종류인가요?",
    "answer": "아닙니다. 보석의 긴 방향을 손가락을 가로지르도록 놓는 배치 방식입니다. 오벌 같은 보석 모양과 가로 배치라는 방향을 구분해 문의하세요."
  },
  {
    "question": "가로 세팅을 보려면 세로 반지 사진을 돌려 보면 되나요?",
    "answer": "사진 전체를 돌리면 밴드와 손가락 방향도 바뀌므로 실제 가로 세팅의 모습과 다를 수 있습니다. 손가락 방향을 고정한 채 보석 방향만 바뀐 자료로 비교하는 것이 좋습니다."
  },
  {
    "question": "이스트웨스트 반지는 베젤 세팅으로만 만드나요?",
    "answer": "가로 배치는 베젤이나 프롱 등 서로 다른 고정 방식과 결합한 사례가 있습니다. 원하는 보석과 디자인에서 가능한 방식은 별도로 상담해야 합니다."
  },
  {
    "question": "이스트웨스트 반지를 주문하면 보석 높이도 낮아지나요?",
    "answer": "가로 배치만으로 높이가 정해지지는 않습니다. 정면에서 보이는 폭과 함께 보석을 받치는 측면 구조를 확인해 원하는 높이를 상담하세요."
  }
]
const quickAnswers = [
  "이스트웨스트는 새로운 보석 컷 이름이 아니라, 보석을 가로로 놓는 배치 방향을 뜻합니다.",
  "사진 전체를 돌리는 것과 보석만 가로로 세팅한 제작안은 다릅니다. 밴드와 손가락 방향을 고정해 비교하세요.",
  "가로 배치라고 세팅 높이까지 낮아지는 것은 아닙니다. 정면의 전체 폭과 측면 구조를 나누어 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  links?: { to: string; label: string }[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "이스트웨스트 반지는 어떤 방향으로 놓인 건가요?",
    "paragraphs": [
      "손가락을 위아래로 세워 바라볼 때 보석의 긴 쪽이 좌우로 놓인 배치를 이스트웨스트(East-West)라고 합니다. 긴 쪽이 손가락 길이와 나란한 세로 배치와 구분할 수 있습니다. 같은 보석을 쓰더라도 손 위에서 강조되는 방향이 달라지는 선택입니다.",
      "Brilliant Earth는 Haiden Bezel Ring을 중심 보석이 가로로 놓인 이스트웨스트 디자인으로 소개합니다. 여기서 이스트웨스트는 배치, 베젤은 보석을 감싸는 고정 방식을 설명합니다. “가로로 놓고 싶다”는 요청과 “어떤 금속 테두리가 좋다”는 요청을 나누어 전달해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "가로와 세로 중 어느 쪽이 어울리는지 어떻게 비교하나요?",
    "paragraphs": [
      "가능하면 같은 보석 후보와 비슷한 밴드 조건에서 방향만 바꾼 안을 비교하세요. 한쪽은 큰 오벌이고 다른 쪽은 작은 사각형이면 방향 때문인지 보석 자체 때문인지 판단하기 어렵습니다. 먼저 마음에 드는 윤곽을 고르고 가로·세로 배치의 차이를 보는 편이 명확합니다.",
      "기존 사진을 통째로 회전하면 밴드와 손가락 방향까지 함께 돌아갑니다. 이것만으로 가로 세팅의 착용 모습을 확인했다고 보기는 어렵습니다. 손가락이 놓이는 방향은 그대로 두고 보석의 긴 방향이 달라진 자료를 요청해 보세요.",
      "길쭉한 보석에서는 방향 차이가 잘 드러나지만, 어느 쪽이 모든 손에 더 잘 어울린다는 정답은 없습니다. 착용할 손가락에서 가로로 펼쳐진 모습을 원하는지, 손가락을 따라 길게 놓인 모습을 원하는지 직접 비교하는 것이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "가로 세팅에서는 보석 폭만 보면 되나요?",
    "paragraphs": [
      "보석만의 가로 길이와 완성된 장식의 전체 폭을 함께 보세요. 금속 발이나 테두리가 더해진 모습이 실제로 손 위에 놓일 형태입니다. 보석 사진만 보고 골랐다면 세팅을 포함한 정면 자료도 요청해 주세요.",
      "양끝이 손가락 어디까지 오는지 확인하고 손을 자연스럽게 모았을 때 옆 손가락에 닿는지도 살펴보세요. 정면에서 원하는 만큼 돋보이는지와 손을 움직일 때의 편안함을 함께 비교하면, 가로 배치의 폭을 정하는 데 도움이 됩니다.",
      "아래 표는 가로 배치의 주문안을 살펴보는 기준입니다. 특정 치수나 비율을 정답으로 삼기보다 선택할 보석과 착용할 손가락을 기준으로 상담해 보세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "비교할 부분",
        "자료에서 볼 것",
        "상담할 질문"
      ],
      "rows": [
        [
          "배치 방향",
          "손가락 기준으로 가로·세로가 바뀐 모습",
          "같은 후보를 두 방향으로 비교할 수 있나요?"
        ],
        [
          "전체 가로 폭",
          "보석과 금속 발·테두리를 포함한 양끝",
          "세팅까지 포함하면 어느 범위까지 보이나요?"
        ],
        [
          "손가락과의 관계",
          "정면 비례와 옆 손가락 접촉",
          "착용할 손가락에서 양끝이 부담스럽지 않은지 어떻게 확인하나요?"
        ],
        [
          "측면 높이",
          "밴드 위로 올라오는 보석과 고정 구조",
          "가로 배치와 별도로 높이를 확인할 수 있나요?"
        ]
      ]
    }
  },
  {
    "title": "이스트웨스트는 베젤이나 낮은 세팅만 가능한가요?",
    "paragraphs": [
      "가로 배치와 고정 방식은 따로 고를 항목입니다. Brilliant Earth에는 베젤을 사용한 Haiden 디자인뿐 아니라, 가로 중심석을 프롱 바스켓으로 잡는 East West Tapered Baguette 디자인도 있습니다. 이 사례는 이스트웨스트가 한 가지 고정 방식만을 가리키지 않는다는 점을 보여 줍니다.",
      "베젤 테두리가 보이는 인상을 원하는지, 금속 발로 잡은 보석 윤곽을 원하는지 참고 사진에서 표시해 주세요. 모든 보석에 두 방식이 그대로 적용된다고 가정하지 말고, 선택한 후보와 반지 형태로 가능한 구조를 상담합니다.",
      "가로로 놓으면 자동으로 낮아진다고 생각하지 마세요. 정면의 방향을 정한 뒤 옆에서 보이는 보석 높이와 받침 구조를 별도로 확인해야 합니다. 기존 세로 세팅 반지의 방향을 바꾸려는 경우에도 단순히 돌리는 작업으로 단정하지 말고 현재 제품을 기준으로 검토받으세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 가로 세팅 반지를 어떻게 문의하나요?",
    "paragraphs": [
      "가로로 놓인 참고 사진과 사용할 보석 후보, 착용할 손가락을 함께 알려 주세요. 사진 속 어떤 부분이 좋은지 “보석의 가로 윤곽”과 “밴드·테두리의 느낌”으로 나누어 표시하면 원하는 배치를 설명하기 쉽습니다. 옆모습이 확인되지 않았다면 그 부분은 미정이라고 적어 주세요.",
      "문의 예시: “오벌 보석을 가로로 놓은 이스트웨스트 반지를 주문하고 싶습니다. 같은 후보의 세로 배치와도 비교하고 싶어요. 금속 테두리까지 포함했을 때 손 위에서 보이는 폭과 옆모습을 확인하고, 가능한 고정 방식을 상담받고 싶습니다.”",
      "아래 카카오톡 상담에 가로 세팅 참고 사진·보석 후보·착용할 손가락·예산·희망일을 보내 주세요. 서울 종로 173 종묘귀금속백화점 101호 귀족에서 제작 가능한 배치와 고정 구조, 견적·일정을 상담합니다."
    ],
    "bullets": [],
    "table": null
  },
{
  "title": "공개 반지 사진에서 방향과 세팅을 구분해 보기",
  "paragraphs": [
    "귀족의 팬시 옐로우 다이아몬드 솔리테어 반지는 쿠션컷 중심석과 프롱·숄더 파베 구성을 볼 수 있는 공개 디자인입니다. 가로 배치로 완성한 제작 사례로 제시하는 사진은 아니며, 중심석을 둘러싼 금속과 밴드로 이어지는 부분을 비교하는 참고로 사용하세요.",
    "이 디자인을 출발점으로 문의한다면 중심석의 긴 방향을 손가락에 대해 어떻게 놓고 싶은지 표시하세요. 사진 전체를 돌려 보이는 모양과 실제 반지의 세팅 방향 변경은 다릅니다. 보석 후보의 형태, 프롱 위치, 밴드 접합부와 높이를 함께 확인한 뒤 가능한 구성을 정합니다."
  ],
  "bullets": [
    "정면 사진: 손가락 방향과 보석의 원하는 긴 방향을 각각 표시",
    "측면 사진: 중심석 높이와 밴드 연결부 확인 요청",
    "함께 낄 반지: 나란히 착용할 때 닿는 부분 확인"
  ],
  "links": [
    {
      "to": "/gallery/fancy-yellow-diamond-solitaire-ring",
      "label": "쿠션컷 솔리테어의 공개 세팅 사진"
    },
    {
      "to": "/custom",
      "label": "중심석 방향과 밴드 연결 구조 상담"
    }
  ]
}
]
const cautions = [
  "외부 브랜드 제품은 가로 배치와 고정 방식의 사례입니다. 해당 제품의 사양·재고·제작 조건이 귀족에 그대로 적용되는 것은 아닙니다.",
  "사진의 방향과 확대 비율만으로 완성 폭이나 착용감을 판단하지 말고, 실제 후보를 기준으로 전체 형태를 확인하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "이스트웨스트 반지 주문제작 상담",
    "description": "가로 배치 참고 사진과 보석 후보를 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "반지 디자인 살펴보기",
    "description": "밴드와 전체 형태의 선호를 정할 때 참고하세요."
  },
  {
    "to": "/guide/diamond-cut-shapes-guide",
    "label": "보석의 기본 윤곽 비교하기",
    "description": "방향을 고르기 전 오벌·사각형 등 모양을 살펴보세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "보석 고정 방식 확인하기",
    "description": "프롱과 베젤 등 고정 구조의 차이를 확인하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '이스트웨스트 반지 주문제작, 가로 세팅 고르기'
const gmArticleLead = '이스트웨스트 반지는 보석의 긴 방향을 손가락을 가로지르도록 배치한 반지입니다. 오벌이나 길쭉한 사각형 보석을 골랐다면 가로·세로로 놓은 모습을 같은 조건에서 비교해 보세요. 주문제작에서는 배치 방향과 함께 금속 테두리까지 포함한 폭이 손 위에서 어떻게 보이는지 확인하는 것이 좋습니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '이스트웨스트 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '이스트웨스트 반지 가로 세팅 주문제작'
const gmHeroAlt = '금빛 밴드의 양쪽 어깨를 잇는 가로 방향으로 긴 타원형 무색 보석을 놓은 이스트웨스트 반지'
const gmHeroCaption = '보석의 가로 배치를 보여 주는 디자인 예시입니다. 실제 판매 제품 사진이나 제작 확정안이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '가로 배치와 고정 방식의 조합은 Brilliant Earth의 제품 원문을 참고했습니다. 같은 조건의 가로·세로 비교, 착용 폭 확인표와 문의 예시는 주문 상담을 준비하기 위한 제안입니다.'
const gmSources = [
  {
    "label": "Brilliant Earth — 가로 배치와 베젤의 조합 사례",
    "url": "https://www.brilliantearth.com/Haiden-Bezel-Ring-Gold-BE1D90270-12404903/?did=None&first=diamond&is_tab=1",
    "note": "가로 중심석에 베젤을 적용한 브랜드 제품 사례입니다."
  },
  {
    "label": "Brilliant Earth — 가로 배치와 프롱의 조합 사례",
    "url": "https://www.brilliantearth.com/East-West-Tapered-Baguette-Diamond-Ring-Platinum-BE1D1964-16189742/",
    "note": "가로 중심석에 프롱 바스켓을 적용한 브랜드 제품 사례입니다."
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
