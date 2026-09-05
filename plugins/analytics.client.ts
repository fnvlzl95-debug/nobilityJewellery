import { siteConfig } from '~/config/site'
import { shouldTrackAnalytics } from '~/utils/analytics-policy'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    wcs_add?: Record<string, string>
    wcs?: { inflow?: (domain: string) => void }
    wcs_do?: (params?: Record<string, unknown>) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  useInquiryContext().capture()
  if (!shouldTrackAnalytics(import.meta.env.PROD, window.location.hostname, window.location.search)) return

  // Queues are ready before mounted CTA handlers; third-party execution waits for the first paint.
  window.dataLayer ||= []
  window.gtag = function () { window.dataLayer!.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', siteConfig.analytics.ga4)
  const pixel = function (...args: unknown[]) {
    if (pixel.callMethod) pixel.callMethod(...args)
    else pixel.queue.push(args)
  } as ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push: unknown; loaded: boolean; version: string }
  pixel.queue = []; pixel.push = pixel; pixel.loaded = true; pixel.version = '2.0'
  window.fbq = pixel
  window.fbq('init', siteConfig.analytics.metaPixel)
  window.fbq('track', 'PageView')
  window.wcs_add = { wa: siteConfig.analytics.naver }

  const loadScript = (src: string, loaded?: () => void) => {
    const script = document.createElement('script')
    script.src = src; script.async = true
    if (loaded) script.onload = loaded
    document.head.appendChild(script)
  }
  const router = useRouter()
  let naverReady = false
  let lastNaverPath = ''
  const naverPageView = () => {
    const path = router.currentRoute.value.path
    if (!naverReady || path === lastNaverPath || typeof window.wcs_do !== 'function') return
    window.wcs_do({})
    lastNaverPath = path
  }
  const contentView = () => {
    const path = router.currentRoute.value.path
    // Gallery details send a richer ViewContent with their product ID themselves.
    if (path.startsWith('/gallery/')) return
    window.fbq?.('track', 'ViewContent', { content_name: document.title, content_path: path })
  }
  nuxtApp.hook('app:mounted', () => {
    contentView()
    let lastPath = router.currentRoute.value.path
    router.afterEach(async (to, _from, failure) => {
      if (failure || to.path === lastPath) return
      lastPath = to.path
      await nextTick()
      naverPageView()
      window.fbq?.('track', 'PageView')
      contentView()
      // GA4 history pageviews stay owned by Enhanced Measurement; no second manual page_view.
    })
    const start = () => {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4}`)
      loadScript('https://connect.facebook.net/en_US/fbevents.js')
      loadScript('https://wcs.pstatic.net/wcslog.js', () => {
        window.wcs?.inflow?.(siteConfig.domain)
        naverReady = true
        naverPageView()
      })
    }
    // Bounded scheduling; a blocked tracker never creates an endless polling loop.
    window.setTimeout(start, 0)
  })
})
