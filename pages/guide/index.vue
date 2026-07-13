<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'
import { guidePosts } from '~/data/guide-posts'

const pagePath = '/guide'
const pageTitle = '귀금속 가이드 | 가격·수리·제작기간·주문방법 | 귀족'
const pageDescription = '웨딩밴드 무광 유광 차이, 귀금속 각인 585·750·925 뜻, 결혼반지 가드링, 다이아몬드 컷과 금·은 수리 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/NN0701.webp`

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: `${siteConfig.url}${pagePath}` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
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
      ])),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description: pageDescription,
        url: `${siteConfig.url}${pagePath}`,
        hasPart: guidePosts.map((post) => ({
          '@type': 'Article',
          headline: post.title,
          url: `${siteConfig.url}${post.path}`,
        })),
      }),
    },
  ],
})
</script>

<template>
  <div class="guide-list-page">
    <CustomCursor />

    <section class="guide-list-wrap">
      <header class="guide-header">
        <p class="guide-label">Guide</p>
        <h1>귀금속 가이드</h1>
        <p>가격, 수리, 제작 기간 등 자주 물어보시는 내용을 모았습니다. 읽어보시고 궁금한 점이 있으면 편하게 문의해주세요.</p>
        <div class="guide-header-cta">
          <NuxtLink to="/contact" class="guide-header-btn guide-header-btn-primary">문의하기</NuxtLink>
          <NuxtLink to="/buy-gold" class="guide-header-btn">금·은 매입 안내</NuxtLink>
          <NuxtLink to="/repair" class="guide-header-btn">수리·AS 안내</NuxtLink>
        </div>
      </header>

      <div class="guide-grid">
        <NuxtLink v-for="post in guidePosts" :key="post.slug" :to="post.path" class="guide-card">
          <img :src="post.image" :alt="post.title" loading="lazy">
          <div class="guide-card-body">
            <span class="guide-badge">{{ post.category }}</span>
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <small>{{ post.publishedAt }}</small>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.guide-list-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #fafafa;
  padding: 120px 20px 80px;
  font-family: var(--font-body);
}

.guide-list-wrap {
  max-width: 1160px;
  margin: 0 auto;
}

.guide-header {
  margin-bottom: 34px;
}

.guide-label {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #c9a227;
  margin-bottom: 10px;
}

.guide-header h1 {
  font-family: var(--font-display);
  font-size: clamp(30px, 4vw, 44px);
  margin-bottom: 12px;
}

.guide-header p {
  color: rgba(250, 250, 250, 0.8);
  line-height: 1.8;
}

.guide-header-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.guide-header-btn {
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.45);
  padding: 10px 14px;
  font-size: 14px;
}

.guide-header-btn-primary {
  background: #c9a227;
  color: #0a0a0a;
  border-color: #c9a227;
  font-weight: 700;
}

.guide-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.guide-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: #fafafa;
  border: 1px solid rgba(201, 162, 39, 0.35);
  background: rgba(201, 162, 39, 0.06);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.guide-card:hover {
  transform: translateY(-3px);
  border-color: #c9a227;
}

.guide-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.guide-card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 18px;
}

.guide-badge {
  align-self: flex-start;       /* flex 컬럼에서 배지가 가로로 늘어나지 않게 */
  display: inline-block;
  font-size: 11px;
  color: #0a0a0a;
  background: #c9a227;
  padding: 3px 8px;
  margin-bottom: 10px;
}

.guide-card h2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.35em * 2); /* 제목 1~2줄 모두 같은 높이 */
  font-size: 22px;
  font-weight: 700;             /* 제목을 굵게 — 설명과 위계 분리 */
  line-height: 1.35;
  color: #fafafa;
  margin: 0 0 8px;
}

.guide-card p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.7em * 2);  /* 설명도 항상 2줄 높이 */
  color: rgba(250, 250, 250, 0.72);
  line-height: 1.7;
  margin: 0 0 12px;
}

.guide-card small {
  margin-top: auto;             /* 날짜를 카드 하단에 고정 */
  font-size: 12px;
  color: rgba(250, 250, 250, 0.5);
}

@media (max-width: 900px) {
  .guide-grid {
    grid-template-columns: 1fr;
  }
}
</style>
