/** Operational measurement only; previews and local builds must never send production events. */
export const isAnalyticsHost = (hostname: string) => hostname.toLowerCase() === 'noblessegold.com'

export const shouldTrackAnalytics = (production: boolean, hostname: string, search = '') =>
  production && isAnalyticsHost(hostname) && new URLSearchParams(search).get('analytics') !== 'off'

export const analyticsEventVersion = '2026-09-05'

export const cleanPath = (value: unknown): string => {
  if (typeof value !== 'string' || !/^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(value)) return ''
  return value.slice(0, 240).replace(/\/$/, '') || '/'
}

// Campaign labels are identifiers, never names, phone numbers, emails or free text.
export const cleanCampaign = (value: unknown): string => {
  if (typeof value !== 'string' || !/^[a-zA-Z][a-zA-Z0-9_-]{0,79}$/.test(value)) return ''
  return value
}

export interface AcquisitionContext {
  landingPath: string
  referrerHost: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
}

export const sanitizeAcquisition = (value: unknown): AcquisitionContext => {
  const v = value && typeof value === 'object' ? value as Record<string, unknown> : {}
  return {
    landingPath: cleanPath(v.landingPath),
    referrerHost: typeof v.referrerHost === 'string' && /^[a-zA-Z0-9.-]{1,120}$/.test(v.referrerHost) ? v.referrerHost : '',
    utmSource: cleanCampaign(v.utmSource),
    utmMedium: cleanCampaign(v.utmMedium),
    utmCampaign: cleanCampaign(v.utmCampaign),
  }
}
