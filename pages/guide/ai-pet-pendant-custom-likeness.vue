<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ai-pet-pendant-custom-likeness'
const pageTitle = 'AI 반려동물 펜던트, 닮은 특징 살려 주문하기 | 귀족'
const pageDescription = 'AI로 만든 강아지·고양이 펜던트를 주문하려면 실제 사진과 비교해 귀·얼굴·꼬리의 특징을 정하세요. 보호자가 착용할 목걸이의 윤곽, 표면 표현, 크기와 종로 귀족 상담 준비를 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ai-pet-pendant-custom-likeness-hero-1916600c.webp`
const publishedAt = '2026-11-04'
const updatedAt = ''
const faqItems = [
  {
    "question": "AI로 만든 반려동물 이미지와 실제 사진을 둘 다 보내야 하나요?",
    "answer": "두 자료를 함께 보내면 닮음과 디자인 취향을 나누어 설명하기 좋습니다. 실제 사진에는 귀·얼굴·꼬리 등 꼭 남길 특징을 표시하고, AI 이미지에는 원하는 금속 형태와 분위기를 표시해 주세요."
  },
  {
    "question": "반려동물의 털 무늬를 단색 금속 펜던트에도 넣을 수 있나요?",
    "answer": "무늬를 선이나 표면 질감, 높낮이로 표현하고 싶은지 알려 주세요. 구현할 수 있는 범위는 무늬의 복잡함과 펜던트 크기, 소재 및 가공 방식에 맞춰 상담해야 합니다."
  },
  {
    "question": "AI가 반려동물의 얼굴을 좌우로 뒤집었다면 어떻게 하나요?",
    "answer": "원본 사진을 기준으로 무늬와 접힌 귀가 있는 쪽을 표시하세요. 사진 속 동물의 오른쪽인지 화면 오른쪽인지 혼동하지 않도록, 해당 부위에 직접 표시하고 최종 디자인에서 방향을 다시 대조하면 좋습니다."
  },
  {
    "question": "얼굴형과 전신형 중 어떤 반려동물 펜던트가 좋을까요?",
    "answer": "귀와 얼굴 표정이 중요한 경우에는 얼굴 중심을, 자세와 꼬리의 곡선이 중요한 경우에는 전신형을 먼저 비교해 보세요. 원하는 완성 크기에서 특징이 구분되는지 확인하고 남길 요소를 정하면 됩니다."
  }
]
const quickAnswers = [
  "실제 반려동물 사진과 마음에 드는 AI 디자인을 함께 준비하세요. 사진에는 닮게 만들 특징을, AI 이미지에는 원하는 금속 형태와 분위기를 표시합니다.",
  "얼굴 중심인지 전신 옆모습인지 한 가지 대표 구도를 먼저 고르세요. 귀·주둥이·꼬리 중 꼭 남길 특징 두세 가지를 적으면 디자인을 줄여도 유지할 기준이 생깁니다.",
  "얼룩이나 털 무늬는 금속의 선·면·높낮이 중 어떤 방식으로 표현할지 상담하세요. 원하는 완성 크기로 윤곽을 살펴보고 제작 가능한 표현 범위를 확인합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "AI 반려동물 펜던트는 어떤 사진으로 주문 상담하나요?",
    "paragraphs": [
      "원하는 자세가 잘 보이는 실제 사진 한 장을 기준으로 정하고, 특징을 보충할 사진을 더 준비하세요. 정면 얼굴을 담고 싶다면 양쪽 귀와 얼굴 윤곽이 보이는 사진이 좋습니다. 옆모습 전신을 원한다면 주둥이부터 등, 꼬리까지 이어지는 선이 드러난 사진을 고르세요.",
      "AI 디자인은 그 옆에 놓고 비교합니다. 실제 사진에는 “이 귀가 접힌 모양을 살리고 싶어요”, AI 이미지에는 “이 정도로 단순한 금속 형태가 좋아요”처럼 각 자료에서 참고할 부분을 적어 주세요. 서로 다른 사진의 자세를 섞었다면 최종적으로 원하는 시선을 한 가지로 정하는 편이 상담에 도움이 됩니다.",
      "귀나 꼬리가 잘린 사진만 있다면 보이는 범위를 설명하고 다른 각도의 사진을 보충하세요. AI가 채워 넣은 부분은 실제 모습을 아는 보호자가 먼저 대조할 항목입니다. 어느 부분이 닮았다고 느끼는지 짧게 적어 두면 일반적인 동물 모양에서 원하는 개체의 특징으로 대화를 좁힐 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "AI 디자인에서 꼭 살릴 특징은 어떻게 고르나요?",
    "paragraphs": [
      "윤곽만 보아도 떠오르는 특징부터 고르세요. 귀 끝의 기울기, 이마에서 코로 이어지는 선, 몸에 붙어 말린 꼬리처럼 위치와 모양을 구체적으로 적어 봅니다. “귀엽게”라는 요청에 “오른쪽 귀만 살짝 접힌 모습”을 더하면 선택 기준이 선명해집니다.",
      "눈·코·무늬까지 모두 같은 중요도로 표시하면 작은 펜던트에 남길 요소를 정하기 어렵습니다. 가장 중요한 특징, 간단히 바꿔도 되는 부분, 생략해도 되는 배경으로 나누어 보세요. 아래 표는 닮음을 설명하기 위한 상담 예시입니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "사진에서 볼 부분",
        "AI 디자인과 대조할 내용",
        "전달할 요청 예시"
      ],
      "rows": [
        [
          "귀",
          "접힌 쪽·끝의 각도·양쪽 크기",
          "오른쪽 귀가 접힌 특징을 우선 살리고 싶어요."
        ],
        [
          "얼굴 윤곽",
          "이마와 주둥이의 길이·턱선",
          "코가 길어 보이지 않도록 짧은 옆얼굴을 남겨 주세요."
        ],
        [
          "꼬리",
          "말리는 방향·몸과의 거리",
          "몸 옆으로 붙어 말린 꼬리가 잘 보이면 좋겠어요."
        ],
        [
          "털 무늬",
          "좌우 위치·큰 얼룩의 경계",
          "한쪽 눈 주변 무늬를 선이나 면으로 표현하고 싶어요."
        ],
        [
          "자세",
          "앉은 모습·고개 방향·다리 위치",
          "앉아서 왼쪽을 보는 사진의 자세를 기준으로 할게요."
        ]
      ]
    }
  },
  {
    "title": "털 무늬와 얼굴은 금속에서 어떻게 표현하나요?",
    "paragraphs": [
      "윤곽으로 알아보는 형태, 표면에 선을 넣는 형태, 얼굴 일부에 낮은 높낮이를 주는 형태 중 마음에 드는 방향을 알려 주세요. 이 구분은 상담 때 원하는 모습을 설명하기 위한 표현입니다. 실제 가공 방법과 가능한 세부 묘사는 소재·크기·디자인을 보고 확인합니다.",
      "단색 금속을 원한다면 사진 속 흰 털과 갈색 털의 경계를 어떻게 남길지 물어보세요. 얼룩의 위치를 가는 선으로 표시할지, 표면 질감의 차이로 구분할지, 윤곽에 집중할지를 고를 수 있습니다. 눈동자나 털의 색도 함께 넣고 싶다면 원하는 색 표현을 별도 요청으로 적어 상담하세요.",
      "AI 그림의 어두운 털 무늬가 실제 금속에서 파인 홈인지, 돌출된 면인지, 표면 색인지도 구체적으로 정해야 합니다. GIA의 2024년 AI 주얼리 연구는 생성 이미지를 실제 모델로 옮기는 과정과 개인화의 중요성을 설명합니다. 이를 주문에 적용할 때는 원본에서 좋아하는 시각적 특징과 실제로 만들 선·면·높낮이를 연결해 질문해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "작은 펜던트에서도 닮은 모습을 확인하려면 어떻게 하나요?",
    "paragraphs": [
      "희망하는 완성 크기에서 귀와 얼굴 윤곽이 구분되는지 살펴보세요. 화면을 크게 확대해 본 뒤에는 같은 도안을 실제 크기에 맞춰 출력하거나 크기 기준과 함께 비교해 봅니다. GIA의 주얼리 디자인 교육도 기술 도면에서 축척에 맞춘 표현을 다룹니다. 상담에서는 장식 본체의 가로·세로와 연결 고리를 포함한 전체 길이를 나누어 확인하세요.",
      "작게 보았을 때 수염이나 잔털이 서로 붙어 보이면 어떤 부분을 단순하게 바꿀지 정합니다. 꼬리를 강조하고 싶다면 꼬리의 방향과 곡선이 읽히는지, 얼굴을 강조하고 싶다면 귀와 주둥이의 비율이 남는지 보세요. 사진과 똑같이 느껴지는 정도는 보호자의 판단이 들어가므로 수정할 위치를 직접 표시하는 편이 좋습니다.",
      "최종 디자인에서는 가늘게 튀어나온 귀 끝·꼬리와 목걸이 고리의 연결도 함께 검토해야 합니다. 고리 위치가 고개 윤곽을 가리거나 원하는 자세에 영향을 주는지 물어보세요. 크기 비교 자료를 통해 외관을 고른 뒤, 두께와 연결 구조는 제작 검토에서 확인합니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 AI 반려동물 펜던트를 어떻게 문의하나요?",
    "paragraphs": [
      "실제 사진, 선택한 AI 이미지, 꼭 남길 특징을 함께 보내 주세요. 먼저 “제가 착용할 강아지 모양 목걸이”처럼 착용자를 적고, 얼굴 중심 또는 전신 중 원하는 구도를 설명합니다. 희망하는 펜던트 크기와 금속 색, 체인 포함 여부, 예산과 필요한 날짜도 알려 주세요.",
      "“제가 착용할 고양이 펜던트를 상담하고 싶어요. 원본 사진의 짧은 주둥이와 몸 옆으로 말린 꼬리가 꼭 남았으면 합니다. 첨부한 AI 디자인처럼 단순한 금색 윤곽이 좋고, 수염은 간단히 표현해도 괜찮아요. 본체 크기는 ○○mm 정도를 생각하고 있어요. 체인 포함 구성으로 제작 가능한 형태와 견적, 일정을 확인하고 싶습니다.”처럼 문의할 수 있습니다.",
      "서울 종로 173 종묘귀금속백화점 101호 귀족에 아래 카카오톡으로 자료를 보내 주세요. 실제 사진에서 살릴 특징과 AI 디자인의 표현 방식을 함께 보고 제작 가능 범위를 상담합니다. 디자인을 확정하기 전에 어떤 자료로 윤곽과 세부 표현을 확인할 수 있는지도 물어보세요."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "AI 이미지의 귀·다리·꼬리 수와 좌우 무늬를 실제 사진과 대조하고, 닮게 남길 특징을 직접 표시해 주세요.",
  "금속에서 표현할 수 있는 잔털·무늬·부조의 범위와 두께는 완성 크기 및 제작 방식에 맞춰 확인합니다."
]
const relatedLinks = [
  {
    "to": "/guide/ai-image-jewelry-custom-order",
    "label": "AI 이미지 주문제작 기본 안내",
    "description": "참고 이미지를 준비하고 실제 제작 사양을 상담하는 순서를 살펴보세요."
  },
  {
    "to": "/guide/openwork-pendant-custom-pattern",
    "label": "윤곽 안에 빈 공간을 넣고 싶다면",
    "description": "투각 펜던트의 남길 금속과 연결선을 구분하는 방법입니다."
  },
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "가지고 있는 체인에 달고 싶다면",
    "description": "체인 끝과 펜던트 고리의 호환 조건을 함께 확인하세요."
  },
  {
    "to": "/custom",
    "label": "반려동물 모티브 주문제작 상담",
    "description": "실제 사진과 AI 디자인, 남기고 싶은 특징을 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 주얼리 디자인 둘러보기",
    "description": "원하는 금속 윤곽과 표면 느낌을 설명할 디자인을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = 'AI 반려동물 펜던트, 닮은 특징 살려 주문하기'
const gmArticleLead = 'AI로 만든 반려동물 펜던트를 주문할 때는 실제 사진에서 꼭 살리고 싶은 특징을 먼저 고르세요. 한쪽 접힌 귀, 짧은 주둥이, 말린 꼬리처럼 우리 강아지나 고양이를 떠올리게 하는 부분을 AI 디자인과 대조합니다. 보호자가 착용할 목걸이의 크기 안에서 어떤 윤곽과 표면 표현으로 남길지 정하면 주문 의도가 분명해집니다.'
const gmArticleCategory = '주문'
const gmArticleKeyword = 'AI 반려동물 펜던트 주문제작'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = 'AI 반려동물 모티브 펜던트 주문 상담'
const gmHeroAlt = '몸 옆으로 말린 꼬리와 뾰족한 귀를 단순한 금색 윤곽으로 표현한 고양이 펜던트의 AI 디자인 예시'
const gmHeroCaption = '반려동물 모티브의 윤곽과 표면 표현을 설명하는 AI 생성 디자인 예시입니다. 실제 제품과 제작 가능 범위는 상담에서 확인해 주세요.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = 'GIA의 2024년 AI 주얼리 연구와 주얼리 디자인 교육 안내를 참고했습니다. 반려동물 사진 대조표와 특징을 고르는 순서는 주문 의도를 설명하기 위한 편집 예시입니다.'
const gmSources = [
  {
    "label": "GIA — 생성 AI 이미지와 실제 주얼리 모델 설계",
    "url": "https://www.gia.edu/gems-gemology/fall-2024-artificial-intelligence-in-jewelry-design",
    "note": "AI 이미지와 실제 금속 디자인, 축척을 확인하는 일반 원칙에 참고했습니다."
  },
  {
    "label": "GIA — 모티브·금속 표현과 축척에 맞춘 주얼리 도면",
    "url": "https://www.gia.edu/gem-education/program-jewelry-design",
    "note": "AI 이미지와 실제 금속 디자인, 축척을 확인하는 일반 원칙에 참고했습니다."
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
