declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.env.PROD) return

  const router = useRouter()
  const { trackMetaEvent } = useGtag()

  const getContentCategory = (path: string) => {
    const segments = path.split('/').filter(Boolean)
    if (segments.length === 0) return 'home'
    if (segments[0] === 'guide') return segments.length > 1 ? 'guide_article' : 'guide'
    if (segments[0] === 'gallery') return 'gallery'
    if (segments[0] === 'contact') return 'contact'
    return 'service'
  }

  const trackContentView = () => {
    const route = router.currentRoute.value
    trackMetaEvent('ViewContent', {
      content_name: document.title,
      content_category: getContentCategory(route.path),
      content_path: route.path,
    })
  }

  nuxtApp.hook('app:mounted', () => {
    let lastTrackedPath = router.currentRoute.value.fullPath
    trackContentView()

    router.afterEach(async (to) => {
      if (to.fullPath === lastTrackedPath) return

      lastTrackedPath = to.fullPath
      await nextTick()
      trackMetaEvent('PageView')
      trackContentView()
    })
  })
})
