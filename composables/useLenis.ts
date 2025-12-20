import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Lenis smooth scroll composable
 * Creates a buttery smooth scrolling experience
 */
export const useLenis = () => {
  const lenis = ref<Lenis | null>(null)
  const isReady = ref(false)

  const initLenis = () => {
    if (!import.meta.client) return

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis with luxury settings
    lenis.value = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.value.on('scroll', ScrollTrigger.update)

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.value?.raf(time * 1000)
    })

    // Disable GSAP lag smoothing for immediate response
    gsap.ticker.lagSmoothing(0)

    isReady.value = true
  }

  const scrollTo = (
    target: string | number | HTMLElement,
    options: {
      offset?: number
      duration?: number
      immediate?: boolean
      onComplete?: () => void
    } = {}
  ) => {
    lenis.value?.scrollTo(target, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 1.2,
      immediate: options.immediate ?? false,
      onComplete: options.onComplete,
    })
  }

  const stop = () => {
    lenis.value?.stop()
  }

  const start = () => {
    lenis.value?.start()
  }

  const destroy = () => {
    lenis.value?.destroy()
    lenis.value = null
    isReady.value = false
  }

  // Auto-initialize on mount
  onMounted(() => {
    initLenis()
  })

  // Cleanup on unmount
  onUnmounted(() => {
    destroy()
  })

  return {
    lenis: readonly(lenis),
    isReady: readonly(isReady),
    scrollTo,
    stop,
    start,
    destroy,
  }
}
