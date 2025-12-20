<script setup lang="ts">
interface Props {
  opacity?: number
  blend?: 'overlay' | 'soft-light' | 'multiply' | 'normal'
  animated?: boolean
}

withDefaults(defineProps<Props>(), {
  opacity: 0.04,
  blend: 'overlay',
  animated: true,
})
</script>

<template>
  <div
    class="grain-overlay"
    :class="{ 'grain-overlay--animated': animated }"
    :style="{
      opacity: opacity,
      mixBlendMode: blend,
    }"
    aria-hidden="true"
  />
</template>

<style scoped>
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

.grain-overlay--animated {
  animation: grain 0.5s steps(10) infinite;
}

@keyframes grain {
  0%, 100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-2%, -2%);
  }
  20% {
    transform: translate(2%, 2%);
  }
  30% {
    transform: translate(-1%, 2%);
  }
  40% {
    transform: translate(2%, -1%);
  }
  50% {
    transform: translate(-2%, 1%);
  }
  60% {
    transform: translate(1%, -2%);
  }
  70% {
    transform: translate(-1%, -1%);
  }
  80% {
    transform: translate(1%, 1%);
  }
  90% {
    transform: translate(-2%, 2%);
  }
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  .grain-overlay--animated {
    animation: none;
  }
}
</style>
