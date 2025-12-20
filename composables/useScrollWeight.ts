import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Scroll-based font weight animation composable
 * Creates elegant typography that "breathes" with scroll
 */
export const useScrollWeight = (
  elementRef: Ref<HTMLElement | null>,
  options: {
    minWeight?: number
    maxWeight?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) => {
  const {
    minWeight = 300,
    maxWeight = 500,
    start = 'top 80%',
    end = 'top 20%',
    scrub = true,
  } = options

  const currentWeight = ref(minWeight)

  onMounted(() => {
    if (!import.meta.client || !elementRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    // Create scroll-triggered weight animation
    gsap.fromTo(
      elementRef.value,
      {
        fontWeight: minWeight,
        fontVariationSettings: `'wght' ${minWeight}`,
      },
      {
        fontWeight: maxWeight,
        fontVariationSettings: `'wght' ${maxWeight}`,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.value,
          start,
          end,
          scrub,
          onUpdate: (self) => {
            currentWeight.value = Math.round(
              minWeight + (maxWeight - minWeight) * self.progress
            )
          },
        },
      }
    )
  })

  return {
    currentWeight: readonly(currentWeight),
  }
}

/**
 * Apply scroll weight to multiple elements
 */
export const useScrollWeightGroup = (
  selector: string,
  options: {
    minWeight?: number
    maxWeight?: number
    stagger?: number
  } = {}
) => {
  const { minWeight = 300, maxWeight = 450, stagger = 0.1 } = options

  onMounted(() => {
    if (!import.meta.client) return

    gsap.registerPlugin(ScrollTrigger)

    const elements = document.querySelectorAll(selector)

    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          fontWeight: minWeight,
          fontVariationSettings: `'wght' ${minWeight}`,
        },
        {
          fontWeight: maxWeight,
          fontVariationSettings: `'wght' ${maxWeight}`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    })
  })
}
