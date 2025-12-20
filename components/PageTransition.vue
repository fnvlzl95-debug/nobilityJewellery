<script setup lang="ts">
import { gsap } from 'gsap'

const isTransitioning = ref(false)
const transitionRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)

// Expose methods for programmatic control
const startTransition = (callback?: () => void) => {
  if (!transitionRef.value || !overlayRef.value) return

  isTransitioning.value = true

  const tl = gsap.timeline({
    onComplete: () => {
      callback?.()
    },
  })

  // Gold curtain slides in from bottom
  tl.to(transitionRef.value, {
    scaleY: 1,
    transformOrigin: 'bottom',
    duration: 0.6,
    ease: 'power3.inOut',
  })

  // Overlay fades in
  tl.to(
    overlayRef.value,
    {
      opacity: 1,
      duration: 0.3,
    },
    '-=0.3'
  )

  return tl
}

const endTransition = () => {
  if (!transitionRef.value || !overlayRef.value) return

  const tl = gsap.timeline({
    onComplete: () => {
      isTransitioning.value = false
    },
  })

  // Overlay fades out
  tl.to(overlayRef.value, {
    opacity: 0,
    duration: 0.2,
  })

  // Gold curtain slides out to top
  tl.to(
    transitionRef.value,
    {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.6,
      ease: 'power3.inOut',
    },
    '-=0.1'
  )

  return tl
}

defineExpose({
  startTransition,
  endTransition,
  isTransitioning,
})
</script>

<template>
  <Teleport to="body">
    <div class="page-transition" aria-hidden="true">
      <!-- Gold curtain -->
      <div ref="transitionRef" class="page-transition__curtain">
        <!-- Subtle light sweep effect on curtain -->
        <div class="page-transition__sweep"></div>
      </div>

      <!-- Dark overlay -->
      <div ref="overlayRef" class="page-transition__overlay"></div>
    </div>
  </Teleport>
</template>

<style scoped>
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.page-transition__curtain {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--gold-dark) 0%,
    var(--gold) 40%,
    var(--gold-light) 60%,
    var(--gold) 100%
  );
  transform: scaleY(0);
  transform-origin: bottom;
}

.page-transition__sweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.15) 50%,
    transparent 100%
  );
  animation: sweep 1.5s ease-in-out infinite;
}

@keyframes sweep {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.page-transition__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(26, 26, 26, 0.3);
  opacity: 0;
}
</style>
