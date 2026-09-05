<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'

const pagePath = '/guide/plated-jewelry-discoloration-care-guide'
const pageTitle = '도금 변색, 닦기 전 원인 확인 | 귀족'
const pageDescription = '도금 반지와 목걸이가 변색됐을 때 오염과 도금 마모를 구분하고, 닦기 전에 피해야 할 방법과 상담 준비 사항을 정리합니다.'
const ogImage = `${siteConfig.url}/Image/guide/plated-jewelry-discoloration-care-guide-hero-77e889ed.webp`
const publishedAt = '2026-09-05'
const updatedAt = ''
const faqItems = [
  {
    "question": "도금 반지가 변색되면 바로 닦아도 되나요?",
    "answer": "먼저 전체 변색인지 부분적인 색 벗겨짐인지 확인하세요. 다른 색 금속이 보이거나 표면이 들떴다면 도금 마모 가능성이 있어 강하게 닦기보다 상태 점검을 우선하는 편이 좋습니다."
  },
  {
    "question": "도금 목걸이에 은 세척액을 써도 되나요?",
    "answer": "제품의 도금 사양과 제조사 지침을 확인하지 않은 상태에서는 사용하지 않는 것이 좋습니다. 은 세척액과 연마성 세척액은 도금 표면에 적합하지 않을 수 있습니다."
  },
  {
    "question": "도금이 벗겨진 부분은 닦으면 다시 금색이 되나요?",
    "answer": "닦는 행위만으로 벗겨진 도금층이 복원된다고 단정할 수 없습니다. 판매처나 주얼리 전문가에게 상태 점검과 재도금 가능 여부를 문의하세요."
  },
  {
    "question": "변색된 제품을 초음파 세척해도 되나요?",
    "answer": "제품의 소재, 도금 상태와 보석 종류를 확인하기 전에는 임의로 초음파 세척을 하지 마세요. 제조사의 관리 지침을 먼저 확인하는 것이 안전합니다."
  }
]
const quickAnswers = [
  "부분적으로 금색이 벗겨져 다른 색 금속이 보이면 오염보다 도금 마모 가능성을 먼저 살펴야 합니다.",
  "향수, 로션, 화장품, 염소와 가정용 세제는 금속 표면의 손상이나 변색에 영향을 줄 수 있습니다.",
  "강한 세제와 연마 세척액으로 먼저 닦지 말고 제조사의 도금 관리 지침과 전문가 상담을 우선 확인하세요."
]
const sections = [
  {
    "title": "변색 범위를 먼저 살펴보세요",
    "paragraphs": [
      "전체가 뿌옇게 보이는지, 손가락이나 옷에 닿는 가장자리만 달라졌는지 확인하세요. 변색이 표면에 고르게 보이는지와 특정 부분에 집중되는지도 함께 살펴보는 것이 좋습니다.",
      "금색이 부분적으로 벗겨지고 아래의 다른 색 금속이 보인다면 단순한 표면 오염보다 도금층 마모 가능성을 먼저 고려해야 합니다. 사진을 남길 때는 앞면과 뒷면, 마찰이 많은 가장자리를 나누어 촬영하세요."
    ],
    "bullets": [
      "전체적인 광택 저하인지 부분적인 색 벗겨짐인지 확인",
      "반지 안쪽과 목걸이 연결 부위처럼 마찰이 잦은 곳도 확인",
      "색 변화와 함께 긁힘, 들뜸, 벗겨짐이 있는지 관찰"
    ]
  },
  {
    "title": "생활 물질과 접촉했는지 확인하세요",
    "paragraphs": [
      "향수, 로션, 화장품, 염소와 암모니아가 포함될 수 있는 가정용 세제는 금속 표면을 손상시키거나 변색시킬 수 있습니다. 최근 착용 중 어떤 제품이나 물질에 닿았는지 떠올려 보세요.",
      "땀과 마찰이 많은 상태로 착용했거나 물놀이와 청소 중 계속 착용했다면 표면 변화가 생긴 시점과 생활 상황을 함께 기록해 두는 것이 상담에 도움이 될 수 있습니다."
    ],
    "bullets": [
      "향수와 로션을 바른 뒤 바로 착용했는지 확인",
      "수영장, 목욕, 청소 중 착용했는지 확인",
      "변색이 시작된 시점과 착용 빈도를 메모"
    ],
    "image": {
      "src": "/Image/guide/plated-jewelry-discoloration-care-guide-section-2-0a26224b.webp",
      "alt": "생활 물질과 접촉했는지 확인하세요 예시 이미지",
      "caption": "생활 물질과 접촉했는지 확인하세요에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "닦기 전에 피해야 할 방법",
    "paragraphs": [
      "도금 제품은 바탕 금속 위에 금속층을 입힌 구조이므로 사용 빈도와 도금 두께, 마찰에 따라 도금층이 점차 마모될 수 있습니다. 이미 도금이 약해진 상태라면 강한 문지름이 표면 상태를 더 바꿀 수 있습니다.",
      "강한 화학 세제, 은 세척액, 연마성 세척액과 초음파 세척은 임의로 사용해서는 안 됩니다. 제품 제조사가 도금용 관리 방법을 안내한 경우에는 해당 지침부터 확인해야 합니다."
    ],
    "bullets": [
      "거친 천이나 연마제가 든 제품으로 문지르지 않기",
      "은 세척액과 가정용 세제를 임의로 사용하지 않기",
      "초음파 세척을 하기 전에 제품 사양과 제조사 지침 확인"
    ]
  },
  {
    "title": "표면 오염처럼 보일 때의 대응",
    "paragraphs": [
      "변색이 오염처럼 보이고 도금 손상이나 민감한 보석이 확인되지 않는 경우에 한해, 제조사가 허용한 범위에서 미지근한 물과 순한 세정 방법, 부드러운 천을 고려할 수 있습니다.",
      "세척 전후의 상태를 비교할 수 있도록 사진을 남겨 두면 상담 때 설명하기 쉽습니다. 세척한 뒤에는 물기와 잔여물을 부드럽게 제거해야 하며, 색이 벗겨진 부분은 반복해서 문지르지 않아야 합니다."
    ],
    "bullets": [
      "제품 제조사의 관리 가능 범위를 먼저 확인",
      "부드러운 천으로 힘을 주지 않고 상태를 관찰",
      "세척 후 색 벗겨짐이나 표면 들뜸이 보이면 중단"
    ],
    "image": {
      "src": "/Image/guide/plated-jewelry-discoloration-care-guide-section-4-6a5ec53e.webp",
      "alt": "표면 오염처럼 보일 때의 대응 예시 이미지",
      "caption": "표면 오염처럼 보일 때의 대응에서 확인할 부분을 보여주는 이미지입니다.",
      "width": 1024,
      "height": 1024
    }
  },
  {
    "title": "도금이 벗겨졌다면 상담을 준비하세요",
    "paragraphs": [
      "도금이 벗겨졌을 때 닦기만 해서 도금층이 복원된다고 단정하기는 어렵습니다. 현재 상태를 판매처 또는 주얼리 전문가에게 보여 주고, 점검과 재도금 가능 여부를 문의하는 편이 적절합니다.",
      "상담을 받기 전에는 제품의 앞면과 뒷면, 변색 부위 확대 사진을 준비해야 하며, 사용 중 접촉한 물질과 세척 여부도 알려 주어야 합니다. 제품의 표면 상태와 소재, 보석 유무를 확인한 뒤 실제 처리 방법이 달라질 수 있습니다."
    ],
    "bullets": [
      "변색 부위의 전체 사진과 확대 사진 준비",
      "도금 색, 바탕 금속 색, 긁힘 여부를 함께 설명",
      "재도금 가능 여부와 필요한 점검 항목을 상담"
    ]
  }
]
const cautions = [
  "도금 두께와 바탕 소재, 보석 종류를 확인하지 않은 상태에서는 세척 방법을 단정하기 어렵습니다.",
  "금색이 벗겨졌거나 표면이 들뜬 제품은 반복해서 닦지 말고 상태 사진을 남긴 뒤 상담하세요.",
  "제조사 관리 지침과 실제 제품 상태가 다를 수 있으므로 강한 세척이나 초음파 사용은 임의로 진행하지 마세요."
]
const relatedLinks = [
  {
    "to": "/guide/gold-plating-repair",
    "label": "금반지·화이트골드 도금 수리, 변색·광택 상담 전 기준",
    "description": "변색과 광택 저하가 있을 때 표면 상태를 확인하고 도금 상담을 준비하는 기준을 정리했습니다."
  },
  {
    "to": "/guide/white-gold-discoloration-care",
    "label": "화이트골드 변색 원인과 도금 관리, 반지·목걸이 맡기기 전 기준",
    "description": "화이트골드가 달라 보이는 원인과 세척, 광택, 재도금 상담 전 확인할 내용을 안내합니다."
  },
  {
    "to": "/guide/ring-metal-allergy-guide",
    "label": "반지 금속 알레르기: 니켈·합금·도금 확인 전 체크리스트",
    "description": "착용 뒤 가려움이나 발진이 있을 때 도금과 합금 정보를 확인하는 순서를 살펴봅니다."
  },
  {
    "to": "/guide/necklace-breakage-meaning-and-causes",
    "label": "목걸이 끊어짐은 징조일까? 물리적 원인과 수리 점검",
    "description": "목걸이 상태를 점검하고 수리 상담 전에 손상 부위를 확인하는 방법을 정리했습니다."
  }
]
const articleImages = [ogImage, ...sections.flatMap(({ image }) => image?.src ? [`${siteConfig.url}${image.src}`] : [])]

// guide-manager:data:start
const gmArticleTitle = '도금 변색, 닦기 전 원인 확인'
const gmArticleLead = '도금 제품의 변색은 표면 오염일 수도 있지만, 마찰과 사용으로 도금이 닳은 상태일 수도 있습니다. 바로 세척하기보다 색 변화의 범위와 제품 표면을 먼저 확인해야 합니다.'
const gmArticleCategory = '관리'
const gmArticleKeyword = '도금 반지 목걸이 변색 관리'
const gmInquiryType = 'repair' as const
const gmInquiryTopic = '도금 반지와 목걸이 변색 원인 확인 및 수리 상담'
const gmHeroAlt = '금색 도금 반지와 목걸이가 부드러운 천 옆에 놓여 있고 표면의 색 차이를 살펴보는 장면'
const gmHeroWidth = 1536
const gmHeroHeight = 1024
const gmReviewedBy = '귀족 주얼리 상담팀'
const gmSourceNote = '도금의 구조와 마모 가능성은 미국 연방거래위원회 자료를, 화학물질과 세척 주의사항은 미국 보석학 연구소 자료를 바탕으로 정리했습니다. 제품별 관리 방법은 제조사 지침과 실제 상태에 따라 달라질 수 있습니다.'
const gmSources = [
  {
    "label": "Buying Platinum, Gold, and Silver Jewelry",
    "url": "https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry",
    "note": "도금의 구조와 사용, 두께, 마찰에 따른 도금층 마모 가능성을 설명합니다."
  },
  {
    "label": "Tips on Caring for Jewelry",
    "url": "https://www.gia.edu/gia-news-research-tips-caring-jewelry",
    "note": "화학물질, 화장품, 염소와 가정용 세제가 금속과 보석에 미칠 수 있는 영향을 안내합니다."
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
