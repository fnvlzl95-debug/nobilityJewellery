declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.env.PROD) return

  const router = useRouter()

  nuxtApp.hook('app:mounted', () => {
    let lastTrackedPath = router.currentRoute.value.fullPath

    router.afterEach((to) => {
      if (to.fullPath === lastTrackedPath) return

      lastTrackedPath = to.fullPath
      window.fbq?.('track', 'PageView')
    })
  })
})
