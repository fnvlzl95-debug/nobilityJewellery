import { siteConfig } from '~/config/site'

declare global {
  interface Window {
    wcs?: {
      inflow?: (domain: string) => void
    }
    wcs_do?: (nasa?: Record<string, unknown>) => void
    _nasa?: Record<string, unknown>
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.env.PROD) return

  const router = useRouter()

  const trackVirtualPageView = (expectedPath: string, attempt = 0) => {
    // 느린 스크립트 로드 중 다른 경로로 이동했다면 이전 페이지를 기록하지 않는다.
    if (router.currentRoute.value.fullPath !== expectedPath) return

    if (window.wcs && typeof window.wcs_do === 'function') {
      window.wcs.inflow?.(siteConfig.domain)
      window.wcs_do(window._nasa || {})
      return
    }

    // 최초 네이버 스크립트가 아직 로드 중일 때만 제한적으로 재시도한다.
    if (attempt < 20) {
      window.setTimeout(() => trackVirtualPageView(expectedPath, attempt + 1), 100)
    }
  }

  nuxtApp.hook('app:mounted', () => {
    // 최초 로드는 nuxt.config.ts의 기존 wcs_do가 기록하므로 중복 호출하지 않는다.
    let lastTrackedPath = router.currentRoute.value.fullPath

    router.afterEach(async (to) => {
      if (to.fullPath === lastTrackedPath) return

      lastTrackedPath = to.fullPath
      await nextTick()
      trackVirtualPageView(to.fullPath)
    })
  })
})
