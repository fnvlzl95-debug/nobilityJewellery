<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cursorRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const isVisible = ref(false)

const onMouseMove = (e: MouseEvent) => {
  if (cursorRef.value) {
    cursorRef.value.style.left = e.clientX + 'px'
    cursorRef.value.style.top = e.clientY + 'px'
  }
  if (!isVisible.value) isVisible.value = true
}

const onMouseEnter = () => {
  isHovering.value = true
}

const onMouseLeave = () => {
  isHovering.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)

  // Add hover listeners to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea, label, .cursor-hover-target')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
  })

  // Use MutationObserver to handle dynamically added elements
  const observer = new MutationObserver(() => {
    const newElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover-target')
    newElements.forEach(el => {
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <Teleport to="body">
    <div
      ref="cursorRef"
      class="custom-cursor"
      :class="{ 'cursor-hover': isHovering, 'cursor-visible': isVisible }"
    >
      <div class="cursor-dot"></div>
      <div class="cursor-ring"></div>
    </div>
  </Teleport>
</template>

<style>
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  pointer-events: none;
  z-index: 99999;
  opacity: 0;
  transition: opacity 0.3s;
  will-change: left, top;
  transform: translate(-50%, -50%);
}

.custom-cursor.cursor-visible {
  opacity: 1;
}

.cursor-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #c9a227;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s;
}

.cursor-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #c9a227;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.4;
  transition: width 0.3s, height 0.3s, opacity 0.3s;
}

.cursor-hover .cursor-dot {
  width: 12px;
  height: 12px;
}

.cursor-hover .cursor-ring {
  width: 72px;
  height: 72px;
  opacity: 0.2;
}

@media (max-width: 768px), (hover: none), (pointer: coarse) {
  .custom-cursor {
    display: none !important;
  }
}
</style>
