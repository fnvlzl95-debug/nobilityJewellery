import { gsap } from 'gsap'

/**
 * Magnetic button effect composable
 * Creates a subtle attraction effect when cursor approaches button
 */
export const useMagneticButton = (
  buttonRef: Ref<HTMLElement | null>,
  options: {
    strength?: number // How much the button moves (0-1)
    radius?: number // Detection radius in pixels
    ease?: string
    duration?: number
  } = {}
) => {
  const {
    strength = 0.3,
    radius = 100,
    ease = 'power2.out',
    duration = 0.4,
  } = options

  const isHovering = ref(false)
  const position = reactive({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.value) return

    const rect = buttonRef.value.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    if (distance < radius) {
      isHovering.value = true

      // Calculate magnetic pull (stronger when closer)
      const pullStrength = (1 - distance / radius) * strength
      position.x = distanceX * pullStrength
      position.y = distanceY * pullStrength

      gsap.to(buttonRef.value, {
        x: position.x,
        y: position.y,
        duration,
        ease,
      })
    } else if (isHovering.value) {
      resetPosition()
    }
  }

  const resetPosition = () => {
    if (!buttonRef.value) return

    isHovering.value = false
    position.x = 0
    position.y = 0

    gsap.to(buttonRef.value, {
      x: 0,
      y: 0,
      duration,
      ease,
    })
  }

  const handleMouseLeave = () => {
    resetPosition()
  }

  onMounted(() => {
    if (!import.meta.client) return

    document.addEventListener('mousemove', handleMouseMove)
    buttonRef.value?.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (!import.meta.client) return

    document.removeEventListener('mousemove', handleMouseMove)
    buttonRef.value?.removeEventListener('mouseleave', handleMouseLeave)
  })

  return {
    isHovering: readonly(isHovering),
    position: readonly(position),
  }
}
