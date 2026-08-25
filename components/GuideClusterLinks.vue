<script setup lang="ts">
import type { GuideClusterId } from '~/data/guide-clusters'
import { getGuideCluster, normalizeGuidePath } from '~/data/guide-clusters'

const props = withDefaults(defineProps<{
  clusterId: GuideClusterId
  currentPath?: string
}>(), {
  currentPath: '',
})

const route = useRoute()
const cluster = computed(() => getGuideCluster(props.clusterId))
const resolvedCurrentPath = computed(() => props.currentPath || route.fullPath)
const normalizedCurrentPath = computed(() => normalizeGuidePath(resolvedCurrentPath.value))
const visibleLinks = computed(() => cluster.value?.links.filter((link) => (
  normalizeGuidePath(link.to) !== normalizedCurrentPath.value
)) ?? [])
const isHub = computed(() => cluster.value && (
  normalizeGuidePath(cluster.value.hubPath) === normalizedCurrentPath.value
))
const titleId = computed(() => `guide-cluster-${props.clusterId}`)
</script>

<template>
  <section v-if="cluster" class="guide-cluster" :aria-labelledby="titleId">
    <div class="guide-cluster-heading">
      <div>
        <h2 :id="titleId">{{ cluster.title }}</h2>
        <p>{{ cluster.description }}</p>
      </div>
      <NuxtLink v-if="!isHub" :to="cluster.hubPath" class="guide-cluster-hub">
        {{ cluster.hubLabel }}
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <ul class="guide-cluster-list">
      <li v-for="link in visibleLinks" :key="link.to">
        <NuxtLink :to="link.to">
          <strong>{{ link.label }}</strong>
          <span>{{ link.description }}</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.guide-cluster {
  margin: 52px 0;
  padding: 28px 0 0;
  border-top: 1px solid rgba(201, 162, 39, 0.42);
  color: #fafafa;
}

.guide-cluster-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}

.guide-cluster h2 {
  margin: 0 0 8px;
  color: #fafafa;
  font-size: clamp(20px, 3vw, 24px);
}

.guide-cluster-heading p {
  max-width: 62ch;
  margin: 0;
  color: rgba(250, 250, 250, 0.72);
  font-size: 14px;
  line-height: 1.7;
}

.guide-cluster-hub {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  color: #d4b44a;
  font-size: 13px;
  text-decoration: none;
}

.guide-cluster-hub:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.guide-cluster-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
  list-style: none;
}

.guide-cluster-list li {
  min-width: 0;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.guide-cluster-list li:nth-child(odd) {
  padding-right: 18px;
}

.guide-cluster-list li:nth-child(even) {
  padding-left: 18px;
  border-left: 1px solid rgba(250, 250, 250, 0.08);
}

.guide-cluster-list a {
  display: grid;
  gap: 5px;
  padding: 16px 0;
  color: #fafafa;
  text-decoration: none;
}

.guide-cluster-list strong {
  font-size: 14px;
}

.guide-cluster-list span {
  color: rgba(250, 250, 250, 0.62);
  font-size: 12px;
  line-height: 1.55;
}

.guide-cluster-list a:hover strong {
  color: #d4b44a;
}

@media (max-width: 680px) {
  .guide-cluster-heading {
    flex-direction: column;
    gap: 12px;
  }

  .guide-cluster-list {
    grid-template-columns: 1fr;
  }

  .guide-cluster-list li:nth-child(odd),
  .guide-cluster-list li:nth-child(even) {
    padding: 0;
    border-left: 0;
  }
}
</style>
