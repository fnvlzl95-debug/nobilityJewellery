<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/rose-cut-diamond-ring-buying-guide'
const pageTitle = '로즈컷 다이아 반지, 은은한 빛 고르기 | 귀족'
const pageDescription = '로즈컷 다이아 반지는 평평한 바닥과 돔 형태의 윗면이 특징입니다. 강한 반짝임과 다른 은은한 빛이 취향에 맞는지 보고, 실제 보석의 윤곽과 완성 반지 높이를 구분해 귀족에 구매·제작 가능 범위를 문의하세요.'
const ogImage = `${siteConfig.url}/Image/guide/rose-cut-diamond-ring-buying-guide-hero-92f4b606.webp`
const publishedAt = '2026-09-25'
const updatedAt = ''
const faqItems = [
  {
    "question": "로즈컷 다이아 반지는 로즈골드 반지인가요?",
    "answer": "아닙니다. 로즈컷은 보석의 커팅 스타일이고 로즈골드는 금속 색을 설명하는 말입니다. 원하는 커팅과 금속 색을 따로 알려 주세요."
  },
  {
    "question": "로즈컷 다이아는 왜 브릴리언트 컷과 반짝임이 다른가요?",
    "answer": "평평한 바닥과 돔 형태의 윗면을 가진 커팅 구조가 다르기 때문입니다. GIA는 로즈컷을 부드럽고 은은한 반짝임으로 설명합니다. 실제 후보를 같은 빛에서 비교해 취향에 맞는지 살펴보세요."
  },
  {
    "question": "로즈컷 다이아 반지는 모두 낮게 착용되나요?",
    "answer": "보석의 바닥이 평평하더라도 완성 반지의 높이는 받침과 세팅에 따라 달라집니다. 낮은 형태를 원한다면 보석만 보지 말고 완성 반지의 측면을 확인하세요."
  },
  {
    "question": "로즈컷 반지는 오래된 빈티지 제품만 있나요?",
    "answer": "로즈컷은 현대적인 반지에도 사용되는 스타일입니다. 커팅의 분위기를 원하는 것인지 실제 앤티크 제품을 찾는 것인지 구분하고 해당 제품의 설명을 확인하세요."
  }
]
const quickAnswers = [
  "로즈컷은 평평한 바닥과 돔 형태의 윗면을 가진 커팅 스타일로, 로즈골드 색이나 장미 모양 반지를 뜻하지 않습니다.",
  "강한 번쩍임보다 은은한 빛이 취향에 맞는지 실제 후보를 같은 조명과 거리에서 비교해 보세요.",
  "보석 바닥이 평평해도 완성 반지의 높이는 세팅에 따라 달라지므로 측면을 따로 확인해야 합니다."
]
const sections: Array<{
  title: string
  paragraphs: string[]
  bullets?: string[]
  table?: { headers: string[]; rows: string[][] } | null
  image?: { src: string; alt: string; caption: string; width?: number; height?: number }
}> = [
  {
    "title": "로즈컷은 색이나 꽃 모양이 아닌 커팅입니다",
    "paragraphs": [
      "GIA는 로즈컷을 평평한 바닥 위에 돔 형태의 윗면이 있고, 여러 면이 꼭짓점으로 모이는 커팅 스타일로 설명합니다. 로즈골드는 금속의 색을 설명하는 말이므로 로즈컷과는 다른 선택 사항입니다. 장미꽃을 본뜬 반지 장식과도 구분해 문의하세요.",
      "오래된 주얼리에서 볼 수 있는 스타일이지만, 로즈컷이라는 이유만으로 오래된 골동품이라고 볼 수는 없습니다. GIA는 현대적인 디자인에서도 로즈컷을 사용한다고 안내합니다. 찾는 것이 커팅의 분위기인지 실제 앤티크 제품인지 먼저 구분해 보세요."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "반짝임의 세기보다 좋아하는 빛을 고르세요",
    "paragraphs": [
      "GIA는 로즈컷의 빛을 현대 브릴리언트 컷의 강한 광채와 대비되는 부드럽고 은은한 반짝임으로 소개합니다. 따라서 브릴리언트 컷처럼 강하게 번쩍이지 않는다는 이유 하나로 원하는 후보를 제외하기보다, 그 차이가 자신의 취향에 맞는지 살펴보는 것이 좋습니다.",
      "비교할 때는 같은 조명과 거리에서 정면을 보고 천천히 기울인 모습을 확인해 보세요. 짧은 영상이 있다면 각도를 바꿀 때 어느 부분에 빛이 머무는지 관찰할 수 있습니다. 이 비교는 빛의 취향을 고르는 방법이며 다이아몬드의 품질이나 진위를 판정하는 방법은 아닙니다."
    ],
    "bullets": [],
    "table": {
      "headers": [
        "원하는 인상",
        "후보에서 볼 부분",
        "상담에 남길 말"
      ],
      "rows": [
        [
          "잔잔하게 빛을 받는 느낌",
          "정면과 기울였을 때 표정",
          "강한 번쩍임보다 이런 은은한 빛을 원해요."
        ],
        [
          "윗면의 면 구성이 드러나는 느낌",
          "가까이 본 돔과 패싯",
          "이 면의 모습이 잘 보이는 후보를 보고 싶어요."
        ],
        [
          "손 위에서 마음에 드는 윤곽",
          "실제 후보의 외곽과 착용 모습",
          "사진 속 윤곽을 우선으로 비교하고 싶어요."
        ]
      ]
    }
  },
  {
    "title": "보석의 바닥과 완성 반지 높이는 별개입니다",
    "paragraphs": [
      "로즈컷의 바닥이 평평하다는 설명만으로 완성 반지가 손가락에 낮게 붙는다고 단정할 수는 없습니다. 보석 아래 받침과 금속 테두리 등 세팅이 더해진 완성 형태를 봐야 합니다. 낮은 착용감을 원한다면 보석만 찍은 사진과 함께 반지의 측면 자료를 요청하세요.",
      "측면에서는 보석의 돔이 올라오는 부분과 보석 아래 금속 구조를 나누어 보세요. “로즈컷이니까 낮게”라고만 전달하기보다, 참고 반지의 어느 높이가 마음에 드는지 표시하면 좋습니다. 원하는 높이와 보석을 함께 구현할 수 있는지는 상담에서 확인합니다.",
      "정면 크기 역시 캐럿 이름만으로 같은 모습을 기대하지 말고 실제 후보의 윤곽과 크기를 확인하세요. 같은 각도와 확대율이 아닌 사진끼리 비교하면 보이는 면적을 오해할 수 있습니다. 손 위의 모습이나 크기를 판단할 수 있는 자료를 함께 보는 편이 좋습니다."
    ],
    "bullets": [],
    "table": null
  },
  {
    "title": "빛의 취향과 옆모습을 함께 보내 주세요",
    "paragraphs": [
      "문의 예시: “로즈컷 다이아 반지를 찾고 있습니다. 강한 번쩍임보다 첨부 영상처럼 은은하게 빛을 받는 느낌을 좋아해요. 둥근 윤곽을 우선으로 보고 싶고, 완성 반지의 측면 높이도 비교하고 싶습니다. 이런 보석과 디자인으로 구매 또는 제작 상담이 가능할까요?”",
      "귀족 카카오톡에 원하는 로즈컷 사진이나 영상·선호하는 윤곽·좋아하는 빛의 느낌·참고 반지의 측면·착용할 손가락·예산·희망일을 보내 주세요. 로즈컷 보석의 준비 가능 여부와 디자인 범위부터 확인하며, 견적과 일정은 상담에서 안내합니다.",
      "종로 173 종묘귀금속백화점 101호 귀족에 문의할 때 “로즈골드 반지”와 “로즈컷 다이아 반지” 중 무엇을 원하는지 구분해 알려 주세요. 금속 색도 정해 두었다면 커팅 요청과 별도로 적어 주시면 됩니다."
    ],
    "bullets": [],
    "table": null
  }
]
const cautions = [
  "로즈컷이라는 이름만으로 천연·합성 여부, 품질, 앤티크 여부를 확정할 수 없습니다. 해당 보석의 설명을 별도로 확인하세요.",
  "예시 사진의 빛과 높이가 모든 로즈컷 반지에 같게 나타나는 것은 아닙니다. 실제 후보와 완성 세팅을 기준으로 상담하세요."
]
const relatedLinks = [
  {
    "to": "/custom",
    "label": "로즈컷 다이아 반지 상담하기",
    "description": "좋아하는 빛과 원하는 완성 형태를 보내 주세요."
  },
  {
    "to": "/gallery",
    "label": "귀족 반지 디자인 살펴보기",
    "description": "참고할 금속 색과 반지 형태를 찾아보세요."
  },
  {
    "to": "/guide/diamond-cut-shapes-guide",
    "label": "다른 다이아몬드 컷 모양 비교",
    "description": "로즈컷과 함께 고려할 윤곽을 살펴보세요."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '로즈컷 다이아 반지, 은은한 빛 고르기'
const gmArticleLead = '강하게 번쩍이는 다이아보다 잔잔하게 빛을 받는 반지가 마음에 든다면 로즈컷을 살펴볼 수 있습니다. 다만 로즈컷이라는 이름만으로 같은 모습을 기대하기보다는, 실제 후보의 빛과 옆모습을 확인해 보세요. 원하는 분위기를 고른 뒤 완성 반지의 형태를 상담하는 순서가 좋습니다.'
const gmArticleCategory = '선택'
const gmArticleKeyword = '로즈컷 다이아 반지'
const gmInquiryType = 'custom' as const
const gmInquiryTopic = '로즈컷 다이아 반지의 빛과 완성 형태'
const gmHeroAlt = '짙은 회색 바탕의 금빛 반지에 삼각형 패싯이 보이는 투명한 돔 형태 보석이 둘러싸여 세팅된 모습'
const gmHeroCaption = '형태를 설명하기 위해 만든 예시 이미지입니다. 실제 판매 제품 사진이 아닙니다.'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '로즈컷의 구조와 빛의 특징, 현대적인 사용 사례는 GIA 안내를 참고했습니다. 같은 조건에서 빛을 비교하고 보석과 완성 반지의 높이를 구분해 상담하는 방법은 구매 준비를 위한 제안입니다.'
const gmSources = [
  {
    "label": "GIA — Gem Cutting Styles: Definitions",
    "url": "https://www.gia.edu/gia-news-research-value-factors-gem-cutting-styles-definitions",
    "note": "로즈컷의 평평한 바닥과 돔 형태의 윗면에 관한 설명입니다."
  },
  {
    "label": "GIA — Guide to Diamond Engagement Ring Shapes",
    "url": "https://4cs.gia.edu/en-us/blog/guide-diamond-shapes-engagement-rings/",
    "note": "로즈컷의 은은한 빛과 반지 디자인 활용에 관한 안내입니다."
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
