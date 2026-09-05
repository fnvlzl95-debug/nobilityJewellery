<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { buildBreadcrumbJsonLd } from '~/utils/seo'
import { guideCategories, guidePosts } from '~/data/guide-posts'

const pagePath = '/guide'
const basePageTitle = '귀금속 가이드 | 가격·수리·제작기간·소재 비교 | 귀족'
const pageDescription = '귀금속 가격과 비용, 제작 기간부터 수리·관리·선택·소재·보석·주문 기준까지 주제별로 정리했습니다.'
const ogImage = `${siteConfig.url}/Image/ring/NN0701.webp`
const postsPerPage = 10
const categoryOptions = ['전체', ...guideCategories] as const

type CategoryFilter = typeof categoryOptions[number]

const categoryContexts: Record<CategoryFilter, string> = {
  '전체': '비용과 기간을 먼저 확인한 뒤 수리·관리·소재 선택으로 좁혀보세요. 실제 상담 전에 필요한 기준을 한곳에서 찾을 수 있습니다.',
  '가격': '제품 가격은 금속 시세만이 아니라 순도·중량·공임·보석·구성에 따라 달라집니다. 같은 조건으로 견적을 비교하는 방법부터 확인하세요.',
  '비용': '수리와 주문제작 비용은 작업 범위와 제품 상태가 핵심입니다. 확정가 대신 견적을 바꾸는 항목과 상담 전 준비할 사진을 정리했습니다.',
  '기간': '제작·수리 기간은 사양 확정일, 부속 수급, 표면 마감과 검수 범위에 따라 달라집니다. 필요한 날짜에서 역산해 확인하세요.',
  '수리': '파손 부위만 보지 말고 소재·보석 세팅·도금·마모 범위를 함께 점검해야 합니다. 증상별 가능 여부와 접수 기준을 모았습니다.',
  '관리': '세척과 보관법은 금속, 보석, 도금과 접착 여부마다 다릅니다. 손상을 키울 수 있는 방법을 먼저 피하고 안전한 순서로 관리하세요.',
  '선택': '착용 목적과 빈도, 예산, 관리 부담을 먼저 정하면 소재·길이·사이즈 선택이 쉬워집니다. 비교 기준을 실제 질문 순서로 정리했습니다.',
  '소재·보석': '순도·경도·처리·감별 정보를 서로 다른 기준으로 읽어야 합니다. 금속과 보석의 특성을 비교하고 착용·관리까지 연결해 보세요.',
  '주문': '원하는 디자인뿐 아니라 예산, 소재, 치수와 수령일을 함께 확정해야 제작이 시작됩니다. 상담부터 검수까지 필요한 정보를 확인하세요.',
}

const route = useRoute()
const router = useRouter()
const { trackKakaoClick } = useGtag()
const listTop = ref<HTMLElement | null>(null)
const categoryList = ref<HTMLElement | null>(null)

/* 가로 스크롤되는 카테고리 줄에서 선택된 항목을 화면 안으로 (세로 스크롤은 건드리지 않음) */
const centerActiveCategory = (behavior: ScrollBehavior = 'auto') => {
  const list = categoryList.value
  const current = list?.querySelector<HTMLElement>('.guide-category-link.is-current')
  if (!list || !current || list.scrollWidth <= list.clientWidth) {
    return
  }

  const target = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2
  list.scrollTo({
    left: Math.max(0, Math.min(target, list.scrollWidth - list.clientWidth)),
    behavior,
  })
}

const handleKakaoClick = () => {
  trackKakaoClick('guide', {
    placement: 'guide_header',
    intent: 'general',
    topic: activeCategory.value === '전체' ? '귀금속 가이드' : `${activeCategory.value} 가이드`,
  })
}

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
const activeCategoryContext = computed(() => categoryContexts[activeCategory.value])
const contextualHeading = computed(() => activeCategory.value === '전체' ? '귀금속 가이드' : `귀금속 가이드 ${activeCategory.value}`)
const contextualDescription = computed(() => activeCategory.value === '전체' ? pageDescription : activeCategoryContext.value)
const searchTerm = computed(() => String(Array.isArray(route.query.q) ? route.query.q[0] || '' : route.query.q || '').trim().slice(0, 100))
const searchInput = ref(searchTerm.value)
watch(searchTerm, value => { searchInput.value = value })
const searchGuides = () => router.push({ path: pagePath, query: { ...guideQuery(1), q: searchInput.value.trim() || undefined } })
const categoryPosts = computed(() => activeCategory.value === '전체'
  ? guidePosts
  : guidePosts.filter((post) => post.category === activeCategory.value))
const filteredPosts = computed(() => categoryPosts.value.filter(post => !searchTerm.value || `${post.title} ${post.description} ${post.keyword}`.toLocaleLowerCase().includes(searchTerm.value.toLocaleLowerCase())))
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
  if (searchTerm.value) query.q = searchTerm.value
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
  const categoryTitle = contextualHeading.value
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
  centerActiveCategory()

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
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  centerActiveCategory(reduceMotion ? 'auto' : 'smooth')
  listTop.value?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
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
    // 2페이지 이후는 목록 이동용이므로 색인에서 제외해 /guide 1페이지로 검색 신호를 모은다.
    { name: 'robots', content: searchTerm.value || currentPage.value > 1 ? 'noindex, follow' : 'index, follow' },
    { name: 'description', content: contextualDescription.value },
    { property: 'og:title', content: contextualPageTitle.value },
    { property: 'og:description', content: contextualDescription.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: ogImage },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: contextualPageTitle.value },
    { name: 'twitter:description', content: contextualDescription.value },
    { name: 'twitter:image', content: ogImage },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildBreadcrumbJsonLd([
        { name: '홈', path: '/' },
        { name: '귀금속 가이드', path: '/guide' },
      ])).replace(/</g, '\\u003c'),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: contextualPageTitle.value,
        description: contextualDescription.value,
        url: canonicalUrl.value,
        hasPart: paginatedPosts.value.map((post) => ({
          '@type': 'Article',
          headline: post.title,
          url: `${siteConfig.url}${post.path}`,
        })),
      }).replace(/</g, '\\u003c'),
    },
  ],
}))
</script>

<template>
  <div class="guide-list-page">

    <section class="guide-list-wrap">
      <header class="guide-header">
        <p class="guide-label">Guide</p>
        <h1>{{ contextualHeading }}</h1>
        <p>가격, 수리, 관리, 선택, 제작 기간 등 자주 물어보시는 내용을 주제별로 모았습니다. 읽어보시고 궁금한 점이 있으면 편하게 문의해주세요.</p>
        <div class="guide-header-cta">
          <a
            :href="siteConfig.social.kakaoOpenChat"
            target="_blank"
            rel="noopener"
            class="guide-header-btn guide-header-btn-primary"
            @click="handleKakaoClick"
          >카톡 문의</a>
          <NuxtLink to="/buy-gold" class="guide-header-btn">금·은 매입 안내</NuxtLink>
          <NuxtLink to="/repair" class="guide-header-btn">수리·AS 안내</NuxtLink>
        </div>
      </header>

      <form class="guide-search" role="search" @submit.prevent="searchGuides">
        <label for="guide-search-input">궁금한 내용을 검색하세요</label>
        <div><input id="guide-search-input" v-model="searchInput" type="search" maxlength="100" placeholder="예: 반지 사이즈, 도금 변색, 금 무게"><button type="submit">검색</button></div>
      </form>
      <nav class="guide-categories" aria-label="가이드 종류">
        <p class="guide-categories-label">주제별 보기</p>
        <div ref="categoryList" class="guide-category-list">
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

      <p class="guide-category-context" aria-live="polite">
        <strong>{{ activeCategory }}</strong>
        <span>{{ activeCategoryContext }}</span>
      </p>

      <GuideClusterLinks
        v-if="activeCategory === '소재·보석'"
        cluster-id="gemstone"
        current-path="/guide?category=소재·보석"
      />

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
            <small>{{ post.updatedAt ? `${post.updatedAt} 업데이트` : post.publishedAt }}</small>
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

      <!-- 전체 글 목록: 크롤러가 모든 가이드에 링크로 도달할 수 있도록 프리렌더 HTML에 항상 노출 -->
      <section class="guide-all-list" aria-label="전체 가이드 목록">
        <h2>전체 가이드 목록</h2>
        <div v-for="category in guideCategories" :key="`all-${category}`" class="guide-all-group">
          <h3>{{ category }}</h3>
          <ul>
            <li v-for="post in guidePosts.filter((p) => p.category === category)" :key="`all-${post.slug}`">
              <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
            </li>
          </ul>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
.guide-search { margin:28px 0; }
.guide-search label { display:block; margin-bottom:10px; color:#fafafa; }
.guide-search div { display:flex; gap:10px; }
.guide-search input { flex:1; min-width:0; padding:12px; border:1px solid #7c7047; background:#161616; color:#fafafa; }
.guide-search button { padding:12px 20px; background:#c9a227; color:#111; border:0; cursor:pointer; }

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
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
}

.guide-category-list::-webkit-scrollbar {
  display: none;
}

.guide-category-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;               /* 좁은 화면에서 칩이 찌그러져 글자가 겹치지 않게 */
  gap: 6px;
  min-height: 44px;
  padding: 0 14px;
  margin-bottom: -1px;
  border-bottom: 2px solid transparent;
  color: rgba(250, 250, 250, 0.64);
  text-decoration: none;
  white-space: nowrap;
  scroll-snap-align: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.guide-category-link small {
  color: rgba(250, 250, 250, 0.6);
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

.guide-category-context {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 18px;
  margin: 0 0 22px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
  color: rgba(250, 250, 250, 0.76);
  font-size: 14px;
  line-height: 1.75;
}

.guide-category-context strong {
  color: #d4b44a;
}

@media (max-width: 640px) {
  .guide-category-context {
    grid-template-columns: 1fr;
    gap: 4px;
  }
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
  color: rgba(250, 250, 250, 0.6);
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
    display: block;
    margin-bottom: 18px;
    border-bottom: 0;
  }

  .guide-categories-label {
    padding-bottom: 6px;
  }

  .guide-category-list {
    /* 좌우 페이지 여백을 상쇄해 화면 끝까지 스크롤 — 잘린 칩이 스크롤 힌트가 된다 */
    margin-right: -18px;
    margin-left: -18px;
    padding-right: 18px;
    padding-left: 18px;
    gap: 2px;
    /* 스크롤되지 않는 밑줄 (border는 콘텐츠와 함께 잘려 보임) */
    box-shadow: inset 0 -1px 0 rgba(201, 162, 39, 0.22);
  }

  .guide-category-link {
    min-height: 42px;
    padding-right: 11px;
    padding-left: 11px;
    margin-bottom: 0;
    gap: 5px;
    font-size: 14px;
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

/* 전체 가이드 목록 */
.guide-all-list {
  margin-top: 72px;
  padding-top: 40px;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.guide-all-list h2 {
  font-size: 20px;
  font-weight: 700;
  color: #fafafa;
  margin-bottom: 24px;
}

.guide-all-group {
  margin-bottom: 28px;
}

.guide-all-group h3 {
  font-size: 14px;
  font-weight: 700;
  color: #c9a227;
  margin-bottom: 10px;
}

.guide-all-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 6px 24px;
}

.guide-all-group a {
  font-size: 14px;
  line-height: 1.7;
  color: rgba(250, 250, 250, 0.72);
  text-decoration: none;
  transition: color 0.2s;
}

.guide-all-group a:hover {
  color: #c9a227;
}
</style>
