<script setup lang="ts">
// Default layout with navigation
</script>

<template>
  <div class="min-h-screen">
    <a href="#main-content" class="skip-link">본문 바로가기</a>

    <!-- Global Navigation -->
    <TheNavigation />

    <!-- Main content -->
    <main id="main-content">
      <slot />
    </main>

    <TheFooter />
  </div>
</template>
