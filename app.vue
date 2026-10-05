<script setup lang="ts">
// App-level setup
useHead({
  bodyAttrs: {
    class: 'overflow-x-hidden',
  },
})

// 관리 페이지는 운영자 화면이라 고객용 상담 바를 띄우지 않는다.
const route = useRoute()
const isAdminPage = computed(() => route.path === '/admin' || route.path.startsWith('/admin/'))
</script>

<template>
  <ClientOnly><CustomCursor /></ClientOnly>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <MobileConversionBar v-if="!isAdminPage" />
</template>
