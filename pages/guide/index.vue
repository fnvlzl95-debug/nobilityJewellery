<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'
import { guidePosts } from '~/data/guide-posts'

const pagePath = '/guide'
const basePageTitle = '귀금속 가이드 | 가격·수리·제작기간·주문방법 | 귀족'
const pageDescription = '귀걸이 침 수리, 진주 등급과 가치 요소, 목걸이 잠금장치, 다이아몬드 등급 및 금·은 수리 기준을 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/NN0701.webp`
const postsPerPage = 10
const categoryOptions = ['전체', '가격', '비용', '기간', '방법'] as const

type CategoryFilter = typeof categoryOptions[number]

const route = useRoute()
const router = useRouter()
const listTop = ref<HTMLElement | null>(null)

const rawPage = computed(() => {
  const value = route.query.page
  return Array.isArray(value) ? value[0] : value
})
const rawCategory = computed(() => {
  const value = route.query.category
  return Array.isArray(value) ? value[0] : value
})
const activeCategory = computed<CategoryFilter>(() => (
  categoryOptions.find((category) => category === rawCategory.value) ?? '전체'
))
const filteredPosts = computed(() => activeCategory.value === '전체'
  ? guidePosts
  : guidePosts.filter((post) => post.category === activeCategory.value))
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / postsPerPage)))
const requestedPage = computed(() => {
  if (!rawPage.value || !/^\d+$/.test(rawPage.value)) {
    return 1
  }

  return Number.parseInt(rawPage.value, 10)
})
const currentPage = computed(() => Math.min(Math.max(requestedPage.value, 1), totalPages.value))
const pageStartIndex = computed(() => (currentPage.value - 1) * postsPerPage)
const paginatedPosts = computed(() => filteredPosts.value.slice(pageStartIndex.value, pageStartIndex.value + postsPerPage))
const visibleStart = computed(() => filteredPosts.value.length === 0 ? 0 : pageStartIndex.value + 1)
const visibleEnd = computed(() => Math.min(pageStartIndex.value + postsPerPage, filteredPosts.value.length))

const guideQuery = (page: number, category: CategoryFilter = activeCategory.value) => {
  const query: Record<string, string> = {}
  if (category !== '전체') {
    query.category = category
  }
  if (page > 1) {
    query.page = String(page)
  }
  return query
}

const guideLink = (page: number, category: CategoryFilter = activeCategory.value) => {
  const query = guideQuery(page, category)
  return Object.keys(query).length === 0 ? pagePath : { path: pagePath, query }
}

const guideUrl = (page: number, category: CategoryFilter = activeCategory.value) => {
  const query = new URLSearchParams(guideQuery(page, category)).toString()
  return `${siteConfig.url}${pagePath}${query ? `?${query}` : ''}`
}

const categoryCount = (category: CategoryFilter) => category === '전체'
  ? guidePosts.length
  : guidePosts.filter((post) => post.category === category).length

const canonicalUrl = computed(() => guideUrl(currentPage.value))
const contextualPageTitle = computed(() => {
  const categoryTitle = activeCategory.value === '전체' ? '귀금속 가이드' : `귀금속 가이드 ${activeCategory.value}`
  if (currentPage.value > 1) {
    return `${categoryTitle} ${currentPage.value}페이지 | 귀족`
  }
  return activeCategory.value === '전체' ? basePageTitle : `${categoryTitle} | 귀족`
})

type PaginationItem = number | `ellipsis-${string}`

const paginationItems = computed<PaginationItem[]>(() => {
  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, index) => index + 1)
  }

  const pages = new Set([1, totalPages.value, currentPage.value - 1, currentPage.value, currentPage.value + 1])
  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages.value)
    .sort((a, b) => a - b)
  const items: PaginationItem[] = []

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1]
    if (previousPage && page - previousPage > 1) {
      items.push(`ellipsis-${previousPage}`)
    }
    items.push(page)
  })

  return items
})

const pageLink = (page: number) => guideLink(page)
const categoryLink = (category: CategoryFilter) => guideLink(1, category)

onMounted(() => {
  const expectedPage = currentPage.value === 1 ? undefined : String(currentPage.value)
  const expectedCategory = activeCategory.value === '전체' ? undefined : activeCategory.value
  if (
    rawPage.value !== expectedPage
    || rawCategory.value !== expectedCategory
    || Array.isArray(route.query.page)
    || Array.isArray(route.query.category)
  ) {
    router.replace(pageLink(currentPage.value))
  }
})

watch([currentPage, activeCategory], async ([page, category], [previousPage, previousCategory]) => {
  if (page === previousPage && category === previousCategory) {
    return
  }

  await nextTick()
  listTop.value?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
  listTop.value?.focus({ preventScroll: true })
})

useHead(() => ({
  title: contextualPageTitle.value,
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    ...(currentPage.value > 1 ? [{ rel: 'prev', href: guideUrl(currentPage.value - 1) }] : []),
    ...(currentPage.value < totalPages.value ? [{ rel: 'next', href: guideUrl(currentPage.value + 1) }] : []),
  ],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: contextualPageTitle.value },
    { property: 'og:description', content: pageDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: contextualPageTitle.value },
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
        name: basePageTitle,
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
}))
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

      <nav class="guide-categories" aria-label="가이드 종류">
        <p class="guide-categories-label">종류별 보기</p>
        <div class="guide-category-list">
          <NuxtLink
            v-for="category in categoryOptions"
            :key="category"
            :to="categoryLink(category)"
            class="guide-category-link"
            :class="{ 'is-current': category === activeCategory }"
            :aria-current="category === activeCategory ? 'page' : undefined"
          >
            <span>{{ category }}</span>
            <small>{{ categoryCount(category) }}</small>
          </NuxtLink>
        </div>
      </nav>

      <div ref="listTop" class="guide-list-meta" tabindex="-1">
        <p>
          <strong>{{ visibleStart }}–{{ visibleEnd }}</strong>
          / {{ activeCategory }} {{ filteredPosts.length }}개
        </p>
        <span>{{ currentPage }} / {{ totalPages }} 페이지</span>
      </div>

      <div :key="`${activeCategory}-${currentPage}`" class="guide-grid">
        <NuxtLink v-for="post in paginatedPosts" :key="post.slug" :to="post.path" class="guide-card">
          <img :src="post.image" :alt="post.title" loading="lazy">
          <div class="guide-card-body">
            <span class="guide-badge">{{ post.category }}</span>
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <small>{{ post.publishedAt }}</small>
          </div>
        </NuxtLink>
      </div>

      <nav v-if="totalPages > 1" class="guide-pagination" aria-label="가이드 목록 페이지">
        <NuxtLink
          v-if="currentPage > 1"
          :to="pageLink(currentPage - 1)"
          class="guide-pagination-control"
          aria-label="이전 페이지"
        >
          <span aria-hidden="true">←</span>
          <span>이전</span>
        </NuxtLink>
        <span v-else class="guide-pagination-control is-disabled" aria-hidden="true">
          <span>←</span>
          <span>이전</span>
        </span>

        <div class="guide-pagination-pages">
          <template v-for="item in paginationItems" :key="item">
            <span v-if="typeof item === 'string'" class="guide-pagination-ellipsis" aria-hidden="true">…</span>
            <NuxtLink
              v-else
              :to="pageLink(item)"
              class="guide-pagination-page"
              :class="{ 'is-current': item === currentPage }"
              :aria-label="`${item}페이지`"
              :aria-current="item === currentPage ? 'page' : undefined"
            >
              {{ item }}
            </NuxtLink>
          </template>
        </div>

        <span class="guide-pagination-status" aria-live="polite">{{ currentPage }} / {{ totalPages }}</span>

        <NuxtLink
          v-if="currentPage < totalPages"
          :to="pageLink(currentPage + 1)"
          class="guide-pagination-control"
          aria-label="다음 페이지"
        >
          <span>다음</span>
          <span aria-hidden="true">→</span>
        </NuxtLink>
        <span v-else class="guide-pagination-control is-disabled" aria-hidden="true">
          <span>다음</span>
          <span>→</span>
        </span>
      </nav>
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

.guide-categories {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
  border-bottom: 1px solid rgba(201, 162, 39, 0.22);
}

.guide-categories-label {
  flex: 0 0 auto;
  margin: 0;
  padding-bottom: 13px;
  color: rgba(250, 250, 250, 0.52);
  font-size: 12px;
  letter-spacing: 0.04em;
}

.guide-category-list {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
}

.guide-category-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 14px;
  margin-bottom: -1px;
  border-bottom: 2px solid transparent;
  color: rgba(250, 250, 250, 0.64);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.guide-category-link small {
  color: rgba(250, 250, 250, 0.34);
  font-size: 11px;
  transition: color 0.2s ease;
}

.guide-category-link:hover,
.guide-category-link:focus-visible {
  color: #fafafa;
  border-color: rgba(201, 162, 39, 0.5);
}

.guide-category-link.is-current {
  color: #c9a227;
  border-color: #c9a227;
  font-weight: 700;
}

.guide-category-link.is-current small {
  color: rgba(201, 162, 39, 0.68);
}

.guide-list-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
  color: rgba(250, 250, 250, 0.58);
  font-size: 13px;
  scroll-margin-top: 104px;
  outline: none;
}

.guide-list-meta p {
  margin: 0;
}

.guide-list-meta strong {
  color: #fafafa;
  font-weight: 600;
}

.guide-list-meta span {
  white-space: nowrap;
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

.guide-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 36px;
}

.guide-pagination-control,
.guide-pagination-page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  color: rgba(250, 250, 250, 0.78);
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.guide-pagination-control {
  gap: 8px;
  min-width: 78px;
  padding: 0 12px;
  border: 1px solid rgba(201, 162, 39, 0.32);
  font-size: 13px;
}

.guide-pagination-control:not(.is-disabled):hover,
.guide-pagination-control:not(.is-disabled):focus-visible {
  color: #fafafa;
  border-color: #c9a227;
  background: rgba(201, 162, 39, 0.08);
}

.guide-pagination-control.is-disabled {
  opacity: 0.3;
}

.guide-pagination-pages {
  display: flex;
  align-items: center;
  gap: 4px;
}

.guide-pagination-page {
  min-width: 44px;
  padding: 0 8px;
  border-bottom: 1px solid transparent;
  font-size: 14px;
}

.guide-pagination-page:hover,
.guide-pagination-page:focus-visible {
  color: #c9a227;
  border-color: rgba(201, 162, 39, 0.5);
}

.guide-pagination-page.is-current {
  color: #0a0a0a;
  background: #c9a227;
  border-color: #c9a227;
  font-weight: 700;
}

.guide-pagination-ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  color: rgba(250, 250, 250, 0.38);
}

.guide-pagination-status {
  display: none;
  min-width: 70px;
  color: rgba(250, 250, 250, 0.72);
  text-align: center;
  font-size: 13px;
}

@media (max-width: 900px) {
  .guide-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .guide-list-page {
    padding-right: 18px;
    padding-left: 18px;
  }

  .guide-categories {
    align-items: stretch;
    flex-direction: column;
    gap: 2px;
    border-bottom: 0;
  }

  .guide-categories-label {
    padding-bottom: 4px;
  }

  .guide-category-list {
    border-bottom: 1px solid rgba(201, 162, 39, 0.22);
  }

  .guide-category-link {
    padding-right: 12px;
    padding-left: 12px;
  }

  .guide-pagination {
    justify-content: space-between;
    gap: 8px;
  }

  .guide-pagination-pages {
    display: none;
  }

  .guide-pagination-status {
    display: inline-block;
  }

  .guide-pagination-control {
    min-width: 76px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .guide-card,
  .guide-category-link,
  .guide-category-link small,
  .guide-pagination-control,
  .guide-pagination-page {
    transition: none;
  }
}
</style>
