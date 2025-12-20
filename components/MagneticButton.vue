<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  tag?: 'button' | 'a'
  href?: string
  variant?: 'primary' | 'outline' | 'ghost'
  strength?: number
  radius?: number
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  variant: 'primary',
  strength: 0.35,
  radius: 120,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const isHovering = ref(false)

// Magnetic effect handlers
const handleMouseMove = (e: MouseEvent) => {
  if (!buttonRef.value) return

  const rect = buttonRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const distanceX = e.clientX - centerX
  const distanceY = e.clientY - centerY
  const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

  if (distance < props.radius) {
    isHovering.value = true
    const pullStrength = (1 - distance / props.radius) * props.strength

    // Button follows cursor
    gsap.to(buttonRef.value, {
      x: distanceX * pullStrength,
      y: distanceY * pullStrength,
      duration: 0.4,
      ease: 'power2.out',
    })

    // Text has slightly different movement for depth
    if (textRef.value) {
      gsap.to(textRef.value, {
        x: distanceX * pullStrength * 0.5,
        y: distanceY * pullStrength * 0.5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  } else if (isHovering.value) {
    resetPosition()
  }
}

const resetPosition = () => {
  isHovering.value = false

  gsap.to(buttonRef.value, {
    x: 0,
    y: 0,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  })

  if (textRef.value) {
    gsap.to(textRef.value, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.6)',
    })
  }
}

const handleClick = (e: MouseEvent) => {
  emit('click', e)
}

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
})

const variantClasses = computed(() => {
  const base = 'magnetic-btn'
  const variants = {
    primary: 'magnetic-btn--primary',
    outline: 'magnetic-btn--outline',
    ghost: 'magnetic-btn--ghost',
  }
  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    :href="href"
    :class="variantClasses"
    @mouseleave="resetPosition"
    @click="handleClick"
  >
    <span ref="textRef" class="magnetic-btn__text">
      <slot />
    </span>
    <span class="magnetic-btn__bg"></span>
  </component>
</template>

<style scoped>
.magnetic-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-family: var(--font-body);
  font-size: clamp(0.875rem, 1vw, 1rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  overflow: hidden;
  will-change: transform;
}

.magnetic-btn__text {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  will-change: transform;
}

.magnetic-btn__bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Primary variant */
.magnetic-btn--primary {
  color: var(--cream-100);
  background: transparent;
}

.magnetic-btn--primary .magnetic-btn__bg {
  background-color: var(--charcoal-900);
}

.magnetic-btn--primary:hover .magnetic-btn__bg {
  transform: scale(1.05);
}

/* Outline variant */
.magnetic-btn--outline {
  color: var(--charcoal-900);
  background: transparent;
  border: 1px solid rgba(26, 26, 26, 0.2);
}

.magnetic-btn--outline:hover {
  border-color: rgba(26, 26, 26, 0.4);
}

.magnetic-btn--outline .magnetic-btn__bg {
  background-color: transparent;
}

.magnetic-btn--outline:hover .magnetic-btn__bg {
  background-color: rgba(26, 26, 26, 0.03);
  transform: scale(1);
}

/* Ghost variant */
.magnetic-btn--ghost {
  color: var(--charcoal-700);
  background: transparent;
  padding: 0.5rem 1rem;
}

.magnetic-btn--ghost:hover {
  color: var(--charcoal-900);
}
</style>
