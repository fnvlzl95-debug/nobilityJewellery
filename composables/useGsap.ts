import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * GSAP composable for consistent animation patterns
 * Used for the One Bold Moment section and subtle page animations
 */
export const useGsap = () => {
  const isClient = import.meta.client

  // Register plugins once
  if (isClient) {
    gsap.registerPlugin(ScrollTrigger)
  }

  /**
   * Fade in element on scroll
   */
  const fadeInOnScroll = (
    element: HTMLElement | string,
    options: {
      y?: number
      duration?: number
      delay?: number
      start?: string
    } = {}
  ) => {
    if (!isClient) return

    const { y = 40, duration = 0.8, delay = 0, start = 'top 80%' } = options

    return gsap.from(element, {
      opacity: 0,
      y,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none none',
      },
    })
  }

  /**
   * Stagger fade in for multiple elements
   */
  const staggerFadeIn = (
    elements: HTMLElement[] | string,
    options: {
      y?: number
      duration?: number
      stagger?: number
      start?: string
    } = {}
  ) => {
    if (!isClient) return

    const { y = 30, duration = 0.6, stagger = 0.1, start = 'top 80%' } = options
    const targets = typeof elements === 'string'
      ? gsap.utils.toArray(elements)
      : elements

    if (!targets.length) return

    return gsap.from(targets, {
      opacity: 0,
      y,
      duration,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: targets[0] as Element,
        start,
        toggleActions: 'play none none none',
      },
    })
  }

  /**
   * Light sweep animation for One Bold Moment
   */
  const createLightSweep = (
    trigger: HTMLElement,
    sweepElement: HTMLElement,
    options: {
      start?: string
      end?: string
      scrub?: boolean | number
    } = {}
  ) => {
    if (!isClient) return

    const { start = 'top 60%', end = 'bottom 40%', scrub = 1 } = options

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    })

    tl.fromTo(
      sweepElement,
      { xPercent: -100, rotate: 15 },
      { xPercent: 100, rotate: 15, ease: 'power2.inOut' }
    )

    return tl
  }

  /**
   * Parallax effect for hero section
   */
  const createParallax = (
    element: HTMLElement,
    options: {
      yPercent?: number
      start?: string
      end?: string
    } = {}
  ) => {
    if (!isClient) return

    const { yPercent = 30, start = 'top top', end = 'bottom top' } = options

    return gsap.to(element, {
      yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: 1,
      },
    })
  }

  /**
   * Refresh all ScrollTriggers (useful after dynamic content changes)
   */
  const refresh = () => {
    if (!isClient) return
    ScrollTrigger.refresh()
  }

  /**
   * Kill all ScrollTriggers (cleanup)
   */
  const killAll = () => {
    if (!isClient) return
    ScrollTrigger.killAll()
  }

  return {
    gsap,
    ScrollTrigger,
    fadeInOnScroll,
    staggerFadeIn,
    createLightSweep,
    createParallax,
    refresh,
    killAll,
  }
}
