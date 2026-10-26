<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/three-stone-ring-custom-proportions'
const pageTitle = '스리스톤 반지 주문제작, 보석 비율 정하기 | 귀족'
const pageDescription = '스리스톤 반지 주문제작은 중심 보석과 양옆 한 쌍의 비율부터 비교하세요. 보이는 크기·모양·전체 폭, 총 캐럿 표기와 실제 보석 조합을 확인하는 방법을 종로 귀족이 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/three-stone-ring-custom-proportions-hero-b1fc02c0.webp`
const publishedAt = '2026-10-26'
const updatedAt = ''
const faqItems = [
  {
    "question": "스리스톤 반지의 양옆은 중심석보다 꼭 작아야 하나요?",
    "answer": "꼭 작아야 하는 것은 아닙니다. 중심과 같거나 더 작은 크기의 구성을 비교할 수 있습니다. 중심을 강조할지 세 알의 연결감을 강조할지 정하고, 실제 보이는 크기와 전체 폭을 살펴보세요."
  },
  {
    "question": "스리스톤 반지 세 알을 서로 다른 모양으로 만들 수 있나요?",
    "answer": "중심과 양옆에 다른 모양을 조합하는 디자인이 있습니다. 좌우 대칭을 원한다면 양옆은 한 쌍으로 비교하고, 실제 보석 치수와 고정 구조에 맞는 제작 가능 여부를 상담하세요."
  },
  {
    "question": "총 캐럿이 같으면 스리스톤 반지의 모습도 비슷한가요?",
    "answer": "같다고 볼 수 없습니다. 중심과 양옆에 중량이 어떻게 나뉘는지, 각 보석의 모양과 보이는 치수에 따라 인상이 달라질 수 있습니다. 총 중량과 개별 사양을 함께 확인하세요."
  },
  {
    "question": "보유한 중심석에 양옆 보석만 골라 주문제작할 수 있나요?",
    "answer": "보유석을 기준으로 상담할 수 있지만 사용 가능 여부는 실물 상태와 치수, 원하는 디자인을 확인해야 합니다. 보유석 사진과 알고 있는 정보를 보내고, 실제 사용할 양옆 한 쌍을 어떤 방식으로 선정할지 문의하세요."
  }
]
const quickAnswers = [
  "중심석을 강조하려면 양옆을 보조하는 크기로, 세 알의 연결감을 원하면 크기 차이를 줄이는 방향으로 비교해 보세요. 어느 쪽이든 모든 반지에 적용되는 정답 비율은 없습니다.",
  "양옆 보석은 한 쌍으로 확인하세요. 같은 모양이라는 설명만으로 결정하지 말고 보이는 길이·너비와 색·반짝임의 인상이 서로 어울리는지 살펴봅니다.",
  "총 캐럿은 보석 중량의 합계입니다. 중심석 한 알의 캐럿, 양옆 각각 또는 두 알 합계의 표기를 구분하고 실제 치수도 함께 확인하세요."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "스리스톤 반지, 중심석과 양옆 크기는 어떻게 정하나요?",
    "paragraphs": [
      "먼저 중심 보석이 눈에 들어오는 반지인지, 세 알이 나란히 이어지는 반지인지를 선택해 보세요. GIA는 스리스톤을 중심석과 양쪽 보석으로 구성하며, 양옆은 중심과 같거나 더 작은 크기로 만들 수 있다고 설명합니다. “양옆은 반드시 중심의 몇 분의 일”이라는 숫자 하나로 결정할 필요는 없습니다.",
      "참고 사진을 고를 때는 중심석 모양뿐 아니라 양옆 보석이 얼마나 존재감을 갖는지도 표시해 주세요. 중심의 타원형이 좋은데 양옆이 지나치게 크게 느껴진다면, “타원형 중심은 유지하고 양옆은 조금 덜 눈에 띄게”라고 말할 수 있습니다.",
      "캐럿만 나란히 적힌 목록보다 위에서 보이는 가로·세로 치수와 실제 조합을 함께 보세요. 모양과 깊이가 다른 보석은 중량 숫자만으로 보이는 크기의 관계를 판단하기 어렵습니다. 중심을 정했다면 그 보석을 기준으로 양옆 한 쌍의 후보를 비교하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "양옆 사이드스톤은 같은 모양이면 충분한가요?",
    "paragraphs": [
      "같은 모양에 더해 두 알이 한 쌍으로 어울리는지 확인하세요. 여기서 사이드스톤은 중심 보석의 양옆에 놓이는 보석을 뜻합니다. 좌우 대칭을 원하는 디자인이라면 길이와 너비, 외곽선, 위에서 본 색과 반짝임의 인상을 같이 살펴봅니다.",
      "GIA는 사이드스톤을 고를 때 중심석과의 색·컷 등의 조화와 손 크기를 함께 고려하도록 안내합니다. 중심석과 양옆을 모두 똑같이 맞춰야 한다는 뜻은 아닙니다. 유색 중심석에 무색 양옆을 조합하는 것처럼 대비를 선택할 수도 있고, 이 경우에도 좌우 한 쌍의 균형은 따로 확인할 수 있습니다.",
      "아래는 원하는 인상을 상담 언어로 바꾸는 예시입니다. 특정 보석의 재고나 제작 가능 여부를 뜻하지 않으며, 실제 후보의 치수와 고정 구조에 따라 검토해야 합니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 인상",
        "비교해 볼 조합",
        "주문 전 확인할 점"
      ],
      "rows": [
        [
          "중심 보석을 또렷하게",
          "큰 중심석과 더 작은 좌우 한 쌍",
          "양옆이 중심 외곽을 가리지 않는지"
        ],
        [
          "세 알이 이어지는 느낌",
          "중심과 양옆의 크기 차이가 적은 구성",
          "손가락 위에서 전체 폭이 부담스럽지 않은지"
        ],
        [
          "부드러운 외곽선",
          "타원형 중심과 둥근 양옆",
          "양옆 두 알의 보이는 크기와 곡선이 어울리는지"
        ],
        [
          "옆으로 좁아지는 선",
          "중심석과 테이퍼드 바게트 형태의 양옆",
          "좌우의 길이·폭·벌어지는 각도를 어떻게 맞출지"
        ],
        [
          "색 대비가 있는 구성",
          "유색 중심과 무색 양옆 등",
          "중심과의 대비, 좌우 두 알끼리의 색 균형을 구분해 보기"
        ]
      ]
    }
  },
  {
    "title": "손가락 위 전체 폭과 옆모습은 왜 확인하나요?",
    "paragraphs": [
      "보석 세 개가 예뻐도 착용했을 때 양옆이 어떻게 보이는지는 별도 확인이 필요합니다. GIA는 사이드스톤이 인접한 손가락에 가려지지 않는지도 살펴보라고 안내합니다. 보석만의 치수를 더한 숫자와 금속 고정부까지 포함한 완성 반지의 가로폭을 구분해 보세요.",
      "가능한 확인 자료에서 정면은 세 알의 배치, 위에서 본 모습은 전체 폭, 옆모습은 보석 높이와 고정부를 살펴보는 식으로 나누면 좋습니다. 양옆이 중심석 아래로 기울어지는지, 세 알이 비슷한 높이로 이어지는지에 따라서도 모습이 달라집니다. 어떤 자료나 실물로 확인할 수 있는지는 상담 때 물어보세요.",
      "손가락을 편 모습뿐 아니라 모았을 때 옆 손가락에 닿는 느낌도 생각해 주세요. 평소 함께 낄 다른 반지가 있다면 그 반지와의 간격도 상담할 수 있습니다. 사진만 보고 “낮아서 절대 걸리지 않는다”거나 “넓어도 누구에게나 편하다”고 확정하기는 어렵습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "스리스톤 반지 견적의 총 캐럿은 어떻게 읽나요?",
    "paragraphs": [
      "총 캐럿을 중심 보석 한 알의 크기로 읽지 마세요. 세 알의 중량을 합친 표기인지, 중심석만의 표기인지 먼저 확인합니다. GIA는 다이아몬드만 있는 주얼리의 총 캐럿 중량과 다른 보석까지 포함한 전체 보석 중량을 구분합니다. 유색보석을 섞었다면 표기된 합계에 어떤 보석이 포함됐는지도 물어보세요. 양옆에 대해서도 “각각의 중량”과 “두 알 합계”를 구분해야 다른 견적과 같은 조건으로 비교할 수 있습니다.",
      "예를 들어 두 제안의 총 중량이 같더라도 하나는 중심석에 무게가 더 배분되고, 다른 하나는 양옆 비중이 더 클 수 있습니다. 그러면 중심을 강조하는 정도도 달라질 수 있습니다. 총 캐럿뿐 아니라 중심·왼쪽·오른쪽 각각의 보석 종류와 치수, 안내받은 중량을 나누어 적어 보세요.",
      "중심석만 정하고 양옆은 사진 속 예시인 상태라면 세 알의 조합이 확정된 것은 아닙니다. 실제 사용할 한 쌍인지, 같은 조건으로 다시 선정할 예정인지 물어보세요. 보석 구성이 바뀌면 견적과 전체 비율도 다시 확인하는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 스리스톤 반지 주문제작을 어떻게 문의하나요?",
    "paragraphs": [
      "참고 이미지와 함께 중심을 강조할지, 세 알의 균형을 강조할지 알려 주세요. 중심 보석을 갖고 있다면 보유 여부와 알고 있는 치수를 적고, 양옆은 아직 미정이라고 보내셔도 됩니다. 보유석 사용과 원하는 조합의 제작 가능 여부는 실물 상태와 디자인을 보고 상담해야 합니다.",
      "문의 예시: “타원형 중심 보석에 작은 둥근 보석을 양옆으로 넣는 스리스톤 반지를 원합니다. 가운데가 먼저 보이고 양옆은 보조하는 느낌이면 좋겠습니다. 손가락 사이로 너무 넓게 퍼지지 않도록 가능한 구성을 보고 싶어요. 중심석 보유 여부는 ○○, 예산은 ○○원 안팎이고 희망일은 ○월 ○일입니다.”",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 이미지를 보내 주세요. 만들 손가락과 평소 착용 빈도, 선호 금속도 함께 알려 주시면 상담 방향을 정하는 데 도움이 됩니다. 사용할 보석 세 개와 금속·고정 방식이 구체화되면 해당 구성의 견적과 일정을 확인해 주세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "본문의 조합은 비교를 돕기 위한 예시입니다. 특정 보석의 재고, 고정된 크기 비율이나 모든 조합의 제작 가능성을 보증하지 않습니다.",
  "실제 보석의 종류·치수·상태와 고정 구조를 함께 검토하세요. 총 캐럿 숫자나 참고 이미지 한 장만으로 완성 크기와 착용감을 확정하지 마세요."
]
const relatedLinks = [
  {
    "to": "/guide/toi-et-moi-ring-custom-selection",
    "label": "두 보석을 주인공으로 고르는 투아에무아 반지",
    "description": "중심과 양옆 구성이 아닌 두 보석 조합도 비교해 보세요."
  },
  {
    "to": "/guide/family-birthstone-ring-custom-order",
    "label": "가족 탄생석 반지 주문 준비",
    "description": "보석마다 가족의 의미를 담으려면 배열 기준을 살펴보세요."
  },
  {
    "to": "/guide/diamond-ring-setting-types",
    "label": "반지 보석 고정 방식 알아보기",
    "description": "비율을 고른 뒤 세팅 방식도 확인하세요."
  },
  {
    "to": "/custom",
    "label": "스리스톤 반지 주문제작 상담",
    "description": "원하는 중심석과 양옆 조합을 이미지와 함께 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 보기",
    "description": "보석과 금속의 다양한 구성을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '스리스톤 반지 주문제작, 보석 비율 정하기'
const gmArticleLead = '스리스톤 반지는 중심 보석 하나와 양옆 보석 두 개가 한 구성을 이루는 반지입니다. 주문제작할 때는 중심석을 돋보이게 할지, 세 알이 이어지는 모습을 강조할지 먼저 정하세요. 정해진 캐럿 비율을 찾기보다 실제 보석 세 개를 함께 놓았을 때의 크기 차이와 손가락 위 전체 폭을 비교하는 것이 선택에 도움이 됩니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = '스리스톤 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '스리스톤 반지 보석 구성 주문제작 상담'
const gmHeroAlt = '타원형 중심 보석과 양옆의 작은 원형 보석으로 구성한 은빛 스리스톤 반지 AI 디자인 예시'
const gmHeroCaption = '중심 보석과 양옆 한 쌍의 비율을 설명하기 위한 AI 생성 이미지입니다. 실제 판매 제품이나 완성된 주문제작 사례가 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '스리스톤 구성과 사이드스톤 선택의 기본 원칙은 GIA 자료를 참고했습니다. 비교표와 견적 확인 질문, 문의 문장은 주문 상담을 돕기 위해 작성한 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 스리스톤 반지의 구성과 모양",
    "url": "https://4cs.gia.edu/en-us/blog/how-to-buy-three-stone-engagement-ring/",
    "note": "중심석과 양옆 보석으로 이루어지는 구성 및 다양한 모양 조합을 참고했습니다."
  },
  {
    "label": "GIA — 사이드스톤의 조화와 착용 시 크기",
    "url": "https://4cs.gia.edu/en-us/blog/select-diamond-side-stones-engagement-rings/",
    "note": "중심석과 사이드스톤의 조화, 손 크기와 착용 시 보이는 범위를 함께 고려하는 설명을 참고했습니다."
  },
  {
    "label": "GIA — 개별 캐럿과 총 캐럿 구분",
    "url": "https://4cs.gia.edu/en-us/blog/gia-diamond-grading-reports-understanding-carat-weight/",
    "note": "보석의 중량과 보이는 크기, 개별 중량과 총 중량을 구분하는 설명을 참고했습니다."
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
