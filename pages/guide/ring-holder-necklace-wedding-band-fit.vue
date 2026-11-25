<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/ring-holder-necklace-wedding-band-fit'
const pageTitle = '링홀더 목걸이, 내 결혼반지가 들어갈까? | 귀족'
const pageDescription = '결혼반지를 목걸이로 걸 때 반지 안지름, 밴드 폭·두께, 보석 옆면을 확인하세요. 체인에 바로 거는 방식과 링홀더 펜던트의 차이, 종로 제작 상담에 보낼 사진을 안내합니다.'
const ogImage = `${siteConfig.url}/Image/guide/ring-holder-necklace-wedding-band-fit-hero.webp`
const publishedAt = '2026-11-25'
const updatedAt = ''
const faqItems = [
  {
    "question": "결혼반지를 목걸이로 쓰려면 반지에 고리를 달아야 하나요?",
    "answer": "체인을 반지 안으로 통과시키거나 별도 링홀더에 걸면 반지 자체 가공 없이 착용할 수 있습니다. 사용할 반지와 체인의 실제 치수부터 확인하세요."
  },
  {
    "question": "링홀더는 목걸이를 풀지 않고 반지를 뺄 수 있나요?",
    "answer": "여닫는 고리나 펜던트의 굴곡을 이용해 가능한 제품이 있습니다. 모델별로 거는 방식이 다르므로 착용한 채로 넣고 빼는 모습을 확인하세요."
  },
  {
    "question": "같은 호수라면 폭이 넓은 반지도 들어가나요?",
    "answer": "호수만으로는 알기 어렵습니다. 밴드 폭과 두께, 홀더 입구와 안쪽 공간이 모두 맞아야 하므로 반지 옆면까지 보고 판단하세요."
  },
  {
    "question": "웨딩밴드와 가드링을 한 홀더에 같이 걸어도 되나요?",
    "answer": "두 반지를 포갠 상태에서 지나는 공간과 걸렸을 때의 접촉 부위를 확인해야 합니다. 보석이나 세팅 발이 다른 반지와 계속 부딪히면 따로 보관하는 편이 좋습니다."
  },
  {
    "question": "링홀더 펜던트만 제작 문의하려면 무엇을 보내나요?",
    "answer": "반지 정면·옆면, 체인 끝장식 사진과 원하는 탈착 방식을 보내 주세요. 실물 확인이 필요한 부분과 제작 가능 범위, 최소 3주 기준의 수령 일정을 상담합니다."
  }
]
const quickAnswers = [
  "가끔 반지를 목에 걸고 체인 잠금장치를 쉽게 여닫을 수 있다면 체인에 직접 끼우는 방법부터 비교하세요. 자주 뺐다 걸 계획이라면 목걸이를 풀지 않고 사용할 수 있는 홀더 구조를 살펴보세요.",
  "호수가 같아도 밴드 폭과 두께, 돌출된 보석의 위치에 따라 걸리는 지점이 다릅니다. 반지 정면과 옆면을 자와 함께 찍고, 홀더에 넣어 끝까지 닫히는지 확인하세요.",
  "홀더만 주문한다면 가진 체인의 끝장식도 확인하세요. 체인과 홀더가 맞는지, 홀더와 반지가 맞는지는 따로 확인해야 하는 두 가지 조건입니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "결혼반지를 체인에 바로 끼울까요, 홀더에 걸까요?",
    "paragraphs": [
      "체인에 직접 끼우려면 목걸이 잠금장치를 풀고 체인 한쪽 끝을 반지 안으로 통과시킨 뒤 다시 잠급니다. 별도 장식 없이 결혼반지만 보이고, 손에 다시 끼려면 목걸이를 한 번 더 풀어야 합니다. 자주 착용하는 체인이 있다면 끝장식이 반지 안쪽을 무리 없이 지나는지부터 보세요.",
      "반지를 하루에도 몇 번씩 뺐다 낀다면 탈착 동작이 달라집니다. 홀더에는 옆이 열리는 고리형도 있고, 체인을 잠근 채 반지를 펜던트의 굴곡을 따라 걸어 넣는 형태도 있습니다. 어느 쪽이 편한지는 여는 동작과 다시 빼내는 동작을 모두 해 봐야 알 수 있습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반지 호수 외에 어떤 치수를 재야 하나요?",
    "paragraphs": [
      "반지를 평평하게 놓고 구멍 안쪽의 한 끝에서 반대편 끝까지 잰 값이 안지름입니다. 밴드 폭은 손가락에 꼈을 때 손가락 길이 방향으로 덮는 너비이고, 두께는 안쪽 표면에서 바깥 표면까지의 높이입니다. 같은 호수라도 이 두 수치는 각각 다를 수 있습니다.",
      "예를 들어 같은 호수의 민자 반지라도 폭 3mm와 6mm는 홀더의 굴곡을 돌아가는 데 필요한 공간이 다를 수 있습니다. 그렇다고 폭 6mm인 반지에 고리 입구가 반드시 6mm여야 한다는 뜻은 아닙니다. 옆으로 넣을 수 있는 구조인지, 들어간 뒤 방향을 바꿀 공간이 있는지까지 볼 수 있도록 반지 옆면 사진을 함께 보내세요."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "사진",
        "표시할 부분",
        "확인할 내용"
      ],
      "rows": [
        [
          "반지를 정면에서",
          "안지름과 끼울 방향",
          "홀더 몸체가 반지 안을 지나는지"
        ],
        [
          "밴드 옆면",
          "밴드 폭·두께와 돌출 장식",
          "입구를 지나 돌릴 공간이 있는지"
        ],
        [
          "체인 끝을 옆에서",
          "끝장식의 가장 넓은 폭과 두께",
          "홀더 위쪽 고리에 체인을 끼울 수 있는지"
        ]
      ]
    }
  },
  {
    "title": "보석 반지는 걸린 다음의 방향도 보세요",
    "paragraphs": [
      "보석이 솟아 있는 반지는 밴드만 보면 잘 들어가도, 걸어 놓으면 무게 중심을 따라 돌아갈 수 있습니다. 돌을 잡은 발이 홀더 안쪽에 닿는지, 보석이 옷이나 피부 쪽으로 향하는지 확인하세요. 반지 장식을 정면으로 보이고 싶은 분이라면 착용 상태에서 바라본 방향이 특히 중요합니다.",
      "매장에서 맞춰 볼 때는 부드러운 받침 위에서 반지를 홀더에 건 뒤 체인을 천천히 들어 보세요. 여닫는 고리는 반지가 놓인 채로 완전히 닫혀야 하고, 굴곡에 걸어 넣는 홀더는 해당 제품의 사용 순서대로 다시 빠지는지까지 확인하세요. 넣는 중에 금속이나 보석이 걸리면 힘을 주어 밀지 말고 그 위치를 보여 주세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반지 두 개와 기존 체인을 함께 쓰려면",
    "paragraphs": [
      "결혼반지와 가드링을 같이 걸 계획이라면 두 개를 포갠 옆면도 찍으세요. 각각 잘 들어가더라도 함께 걸었을 때 남는 공간과 보석끼리 닿는 자리가 달라집니다. 밴드 폭을 단순히 더한 값만으로 판단하기 어려우므로 두 반지의 정면·옆면과 함께 착용할 개수를 알려 주세요.",
      "홀더 단품을 살 때는 체인의 가는 줄보다 끝에 달린 연결판이나 잠금장치가 더 클 수 있습니다. 홀더 위쪽 고리에 통과시킬 체인 끝을 자 옆에 놓고 폭과 두께가 보이게 찍으세요. 반지를 목에서 내려 보관할 때는 단단한 보석과 다른 장식이 부딪히지 않도록 반지별로 안감이 있는 칸이나 주머니를 쓰면 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "종로 귀족에 링홀더 제작을 상담하는 방법",
    "paragraphs": [
      "“지금 끼는 결혼반지를 가공하지 않고 목걸이에 걸고 싶습니다. 민자 밴드 한 개이고, 사진에 안지름과 밴드 폭을 표시했습니다. 목걸이를 푸는 일이 적었으면 합니다. 가진 체인에 맞는 홀더를 제작할 수 있는지, 가능하다면 홀더 단품 견적을 알고 싶습니다.” 보석 반지라면 옆으로 솟은 장식 사진을, 두 개를 걸고 싶다면 두 반지를 함께 찍은 사진을 덧붙이세요.",
      "방문 상담에는 실제 반지와 체인을 함께 가져오면 치수와 닿는 부분을 살피기 좋습니다. 카톡으로 먼저 문의할 때는 홀더 소재, 예산, 희망 수령일도 적어 주세요. 종로 귀족 주문제작은 최소 3주이며, 반지와 체인에 맞는 구조의 제작 가능 여부를 확인한 뒤 견적과 일정을 안내합니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "제조사가 안내하는 허용 크기·무게와 사용 순서는 해당 모델의 기준입니다. 모양이 비슷한 다른 홀더에도 같은 조건이 적용된다고 보기 어렵습니다.",
  "고리가 제대로 닫히지 않거나 체인 연결부가 벌어진 상태에서는 반지를 걸지 마세요. 분실을 막기 위해 반지를 넣고 빼는 동작은 받침 위에서 확인하세요."
]
const relatedLinks = [
  {
    "to": "/guide/necklace-chain-replacement-guide",
    "label": "체인과 펜던트 고리 호환 확인하기",
    "description": "가지고 있는 체인 끝장식이 홀더를 통과하는지 점검하세요."
  },
  {
    "to": "/guide/gold-pendant-only-custom-cost",
    "label": "홀더 단품 견적 준비하기",
    "description": "체인을 제외하고 펜던트만 주문할 때의 견적 항목을 확인하세요."
  },
  {
    "to": "/custom",
    "label": "종로 귀족 주문제작 안내",
    "description": "반지와 체인 사진으로 제작 가능 범위를 상담하세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '링홀더 목걸이, 내 결혼반지가 들어갈까?'
const gmArticleLead = '링홀더 목걸이는 손에서 뺀 반지를 펜던트에 걸어 착용하는 목걸이입니다. 내 결혼반지가 맞는지 보려면 반지 호수와 함께 밴드의 폭·두께를 확인하세요. 보석이 높게 올라온 반지는 들어가는지뿐 아니라 걸린 뒤 보석과 고리가 어디서 맞닿는지도 봐야 합니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '링홀더 목걸이'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '결혼반지용 링홀더 목걸이 상담'
const gmHeroAlt = '옆면이 열리는 타원형 금빛 링홀더 펜던트와 걸기 전의 매끈한 결혼반지를 나란히 놓은 모습'
const gmHeroCaption = '체인에 연결된 홀더와 따로 거는 반지를 보여 주는 AI 디자인 예시입니다. 실제 맞물림과 잠금 상태는 사용할 제품으로 확인하세요.'
const gmHeroWidth = 1672
const gmHeroHeight = 941
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '홀더별 반지 탈착 방식과 적용 범위는 제조사의 개별 모델 설명을, 보관 방법은 GIA 자료를 참고했습니다. 본문의 치수는 비교 예시입니다.'
const gmSources = [
  {
    "label": "Emily C — 더 드롭 링홀더 사용 안내",
    "url": "https://emilyc.com/products/the-drop",
    "note": "이 모델은 반지를 펜던트 끝에서 걸어 넣는 구조이며 밴드 형태별 사용 예시를 안내합니다."
  },
  {
    "label": "Emily Snadden Design — 링홀더 호환 안내",
    "url": "https://www.emilysnadden.com.au/products/ring-holder-necklace",
    "note": "제조사는 해당 모델에 맞는 반지 무게와 크기를 안내하며 다른 반지는 별도 상담을 권합니다."
  },
  {
    "label": "GIA — 주얼리 보관과 관리",
    "url": "https://www.gia.edu/gia-news-research-tips-caring-jewelry",
    "note": "반지별로 안감이 있는 칸이나 케이스를 이용하면 보관 중 긁힘과 충격을 줄이는 데 도움이 됩니다."
  },
  {
    "label": "귀족 — 종로 주얼리 주문제작",
    "url": "https://noblessegold.com/custom",
    "note": "참고 사진과 소재에 맞춰 제작 범위와 견적을 상담하며 제작은 최소 3주 기준입니다."
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
