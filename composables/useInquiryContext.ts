import { sanitizeAcquisition, type AcquisitionContext } from '~/utils/analytics-policy'

const storageKey = 'ng_acquisition_v1'
export const useInquiryContext = () => {
  const capture = (): AcquisitionContext => {
    if (import.meta.server) return sanitizeAcquisition(null)
    try {
      const saved = sessionStorage.getItem(storageKey)
      if (saved) return sanitizeAcquisition(JSON.parse(saved))
    } catch { /* Storage can be blocked; inquiry submission still works. */ }
    const query = new URLSearchParams(window.location.search)
    let referrerHost = ''
    try { referrerHost = document.referrer ? new URL(document.referrer).hostname : '' } catch { /* invalid referrer */ }
    const context = sanitizeAcquisition({
      landingPath: window.location.pathname,
      referrerHost: referrerHost === window.location.hostname ? '' : referrerHost,
      utmSource: query.get('utm_source'), utmMedium: query.get('utm_medium'), utmCampaign: query.get('utm_campaign'),
    })
    try { sessionStorage.setItem(storageKey, JSON.stringify(context)) } catch { /* optional persistence */ }
    return context
  }
  return { capture }
}
