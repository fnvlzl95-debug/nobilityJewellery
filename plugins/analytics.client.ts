import { siteConfig } from '~/config/site'
import { analyticsOptOut, analyticsPageLocation, analyticsReferrer, cleanCampaign, cleanPublicPath, isPrivatePath, normalizeAnalyticsContactUrl, rememberInquiryTopic, shouldTrackAnalytics } from '~/utils/analytics-policy'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    wcs_add?: Record<string, string>
    wcs?: { inflow?: (domain: string) => void; event?: (category: string, name: string) => void }
    wcs_do?: (params?: Record<string, unknown>) => void
    ngAnalyticsDisabled?: boolean
    ngTrackNaverEvent?: (name: string) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let storage: Storage | undefined
  try { storage = window.sessionStorage } catch { /* blocked storage */ }
  let optedOut = analyticsOptOut(window.location.search, storage)
  const allowed = (fullPath: string) => {
    const url = new URL(fullPath, siteConfig.url)
    return !optedOut && shouldTrackAnalytics(import.meta.env.PROD, window.location.hostname, url.search, url.pathname)
  }
  const initialPath = window.location.pathname + window.location.search + window.location.hash
  const normalizedInitial = normalizeAnalyticsContactUrl(initialPath)
  const noReferrer = () => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="referrer"]')
    if (!meta) { meta = document.createElement('meta'); meta.name = 'referrer'; document.head.appendChild(meta) }
    meta.content = 'no-referrer'
  }
  if (normalizedInitial !== initialPath) {
    window.ngAnalyticsDisabled = true
    rememberInquiryTopic(initialPath, storage)
    noReferrer()
    window.location.replace(normalizedInitial)
    return
  }
  window.ngAnalyticsDisabled = !allowed(initialPath)
  if (window.ngAnalyticsDisabled) noReferrer()
  try {
    const referrer = new URL(document.referrer)
    if (referrer.origin === siteConfig.url && !shouldTrackAnalytics(true, referrer.hostname, referrer.search, referrer.pathname)) {
      window.ngAnalyticsDisabled = true
      noReferrer()
      window.location.replace(initialPath)
      return
    }
  } catch { /* empty or invalid referrer */ }

  // Private and untracked documents cannot join a document with loaded pixels.
  router.beforeEach((to, from) => {
    const normalized = normalizeAnalyticsContactUrl(to.fullPath)
    if (normalized !== to.fullPath) {
      rememberInquiryTopic(to.fullPath, storage)
      const target = router.resolve(normalized)
      return { path: target.path, query: target.query, hash: target.hash, replace: true }
    }
    const destination = new URL(to.fullPath, siteConfig.url)
    const nextOptOut = analyticsOptOut(destination.search, storage)
    const wasAllowed = allowed(from.fullPath)
    if (nextOptOut) optedOut = true
    const boundary = isPrivatePath(to.path) !== isPrivatePath(from.path) || wasAllowed !== allowed(to.fullPath)
    if (boundary) {
      window.ngAnalyticsDisabled = true
      noReferrer()
      if (optedOut) destination.searchParams.set('analytics', 'off')
      window.location.assign(destination.pathname + destination.search + destination.hash)
      return false
    }
  })
  if (window.ngAnalyticsDisabled) return
  useInquiryContext().capture()

  const active = () => !window.ngAnalyticsDisabled && allowed(window.location.pathname + window.location.search)
  window.dataLayer ||= []
  window.gtag = function () { if (active()) window.dataLayer!.push(arguments) }
  window.gtag('js', new Date())
  const campaign = new URLSearchParams(window.location.search)
  const initialReferrer = analyticsReferrer(document.referrer, siteConfig.url)
  window.gtag('config', siteConfig.analytics.ga4, {
    send_page_view: false,
    page_location: analyticsPageLocation(window.location.pathname, window.location.search, siteConfig.url),
    page_referrer: initialReferrer,
    ...(cleanCampaign(campaign.get('utm_source')) ? { campaign_source: cleanCampaign(campaign.get('utm_source')) } : {}),
    ...(cleanCampaign(campaign.get('utm_medium')) ? { campaign_medium: cleanCampaign(campaign.get('utm_medium')) } : {}),
    ...(cleanCampaign(campaign.get('utm_campaign')) ? { campaign_name: cleanCampaign(campaign.get('utm_campaign')) } : {}),
  })
  const pixel = function (...args: unknown[]) {
    if (!active()) return
    if (pixel.callMethod) pixel.callMethod(...args)
    else pixel.queue.push(args)
  } as ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push: unknown; loaded: boolean; version: string }
  pixel.queue = []; pixel.push = pixel; pixel.loaded = true; pixel.version = '2.0'
  window.fbq = pixel
  window.fbq('set', 'autoConfig', false, siteConfig.analytics.metaPixel)
  window.fbq('init', siteConfig.analytics.metaPixel)
  window.wcs_add = { wa: siteConfig.analytics.naver }

  let naverReady = false
  let lastNaverPath = ''
  const pendingNaverEvents: string[] = []
  const naverNames = new Set(['KakaoClick', 'PhoneClick', 'InquiryClick', 'MapClick', 'FormStart', 'LeadAccepted', 'GuideToService'])
  window.ngTrackNaverEvent = (name) => {
    if (!active() || !naverNames.has(name)) return
    if (naverReady && typeof window.wcs?.event === 'function') window.wcs.event('Consultation', name)
    else if (pendingNaverEvents.length < 20) pendingNaverEvents.push(name)
  }
  const naverPageView = () => {
    const path = router.currentRoute.value.path
    if (!active() || !naverReady || path === lastNaverPath || typeof window.wcs_do !== 'function') return
    window.wcs_do({})
    lastNaverPath = path
  }
  const contentView = () => {
    const path = router.currentRoute.value.path
    if (!active() || path.startsWith('/gallery/')) return
    window.fbq?.('track', 'ViewContent', { content_path: cleanPublicPath(path) })
  }
  let lastPath = ''
  let previousLocation = initialReferrer
  const pageView = () => {
    const path = cleanPublicPath(router.currentRoute.value.path)
    if (!active() || !path || lastPath === path) return
    const page = { page_location: analyticsPageLocation(path, window.location.search, siteConfig.url), page_referrer: previousLocation, page_path: path }
    // Config overrides global set. Update it so engagement also uses the current safe URL.
    window.gtag?.('config', siteConfig.analytics.ga4, { ...page, send_page_view: false })
    window.gtag?.('event', 'page_view', page)
    window.fbq?.('track', 'PageView')
    naverPageView()
    contentView()
    lastPath = path
    previousLocation = siteConfig.url + path
  }
  const loadScript = (src: string, loaded?: () => void) => {
    if (!active()) return
    const script = document.createElement('script')
    script.src = src; script.async = true
    if (loaded) script.onload = loaded
    document.head.appendChild(script)
  }
  nuxtApp.hook('app:mounted', () => {
    pageView()
    router.afterEach(async (_to, _from, failure) => {
      if (failure) return
      await nextTick()
      pageView()
    })
    window.setTimeout(() => {
      if (!active()) return
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + siteConfig.analytics.ga4)
      loadScript('https://connect.facebook.net/en_US/fbevents.js')
      loadScript('https://wcs.pstatic.net/wcslog.js', () => {
        if (!active()) { pendingNaverEvents.length = 0; return }
        window.wcs?.inflow?.(siteConfig.domain)
        naverReady = true
        naverPageView()
        for (const name of pendingNaverEvents.splice(0)) window.ngTrackNaverEvent?.(name)
      })
    }, 0)
  })
})
