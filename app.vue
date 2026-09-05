<script setup lang="ts">
// App-level setup
useHead({
  bodyAttrs: {
    class: 'overflow-x-hidden',
  },
})
</script>

<template>
  <ClientOnly><CustomCursor /></ClientOnly>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <MobileConversionBar />
</template>
