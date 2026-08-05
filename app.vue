<script setup lang="ts">
// App-level setup
useHead({
  bodyAttrs: {
    class: 'overflow-x-hidden',
  },
})
</script>

<template>
  <CustomCursor />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <MobileConversionBar />
</template>
