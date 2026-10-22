/** Operational measurement only; previews and local builds must never send production events. */
export const isAnalyticsHost = (hostname: string) => hostname.toLowerCase() === 'noblessegold.com'

/** 1대1 주문서·견적서와 관리 페이지. 주소 자체가 비밀이라 방문 기록을 어디에도 보내지 않는다. */
export const isPrivatePath = (pathname: string) => {
  let candidate = pathname.replace(/\\/g, '/')
  // Vue Router matches static route names case-insensitively. Also fail closed for
  // encoded private-looking error URLs so tokens cannot leak through a 404 page.
  for (let attempt = 0; attempt < 4; attempt++) {
    if (/^\/+(order|quote|admin)(\/|$)/i.test(candidate)) return true
    try {
      const normalized = new URL(candidate, 'https://noblessegold.com').pathname
      if (/^\/+(order|quote|admin)(\/|$)/i.test(normalized)) return true
      const decoded = decodeURIComponent(normalized).replace(/\\/g, '/')
      if (decoded === candidate) return false
      candidate = decoded
    } catch { return false }
  }
  return /^\/+(order|quote|admin)(\/|$)/i.test(candidate)
}

export const shouldTrackAnalytics = (production: boolean, hostname: string, search = '', pathname = '') =>
  production && isAnalyticsHost(hostname) && hasSafeAnalyticsQuery(search) && new URLSearchParams(search).get('analytics') !== 'off' && !isPrivatePath(pathname)

export const analyticsEventVersion = '2026-10-22'

export const analyticsOptOutKey = 'ng_analytics_off'
export const analyticsOptOut = (search: string, storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>): boolean => {
  const requested = new URLSearchParams(search).get('analytics') === 'off'
  try {
    if (requested) { storage?.setItem(analyticsOptOutKey, '1'); storage?.removeItem('ng_acquisition_v1') }
    return requested || storage?.getItem(analyticsOptOutKey) === '1'
  } catch { return requested }
}

const services = ['custom', 'repair', 'wholesale', 'couple-ring', 'baby-gold', 'buy-gold', 'wedding', 'other']
export const analyticsService = (value: unknown, pathname = '') => {
  if (typeof value === 'string' && services.includes(value)) return value
  const segment = pathname.split('/')[1]
  return services.includes(segment) ? segment : 'other'
}

const inquiryTopicKey = 'ng_inquiry_topic_v1'
let pendingInquiryTopic: { topic: string; type: string; from: string; at: number } | null = null
// Local form context only. This value is never used as an analytics parameter.
export const rememberInquiryTopic = (fullPath: string, storage?: Pick<Storage, 'setItem'>) => {
  const url = new URL(fullPath, 'https://noblessegold.com')
  const topic = url.searchParams.get('topic') || ''
  if (url.pathname !== '/contact' || !topic || services.includes(topic)) return
  pendingInquiryTopic = { topic: topic.slice(0, 120), type: url.searchParams.get('type') || '', from: cleanPublicPath(url.searchParams.get('from')), at: Date.now() }
  try { storage?.setItem(inquiryTopicKey, JSON.stringify(pendingInquiryTopic)) } catch { /* form can use in-memory context */ }
}
export const takeInquiryTopic = (type: string, from: string, storage?: Pick<Storage, 'getItem' | 'removeItem'>, currentFullPath = ''): string => {
  // location.replace is asynchronous: the original document can mount before it
  // unloads. Leave its context intact for the normalized destination document.
  if (currentFullPath && normalizeAnalyticsContactUrl(currentFullPath) !== currentFullPath) return ''
  let value = pendingInquiryTopic
  pendingInquiryTopic = null
  try {
    const saved = storage?.getItem(inquiryTopicKey)
    storage?.removeItem(inquiryTopicKey)
    if (saved) value = JSON.parse(saved)
  } catch { /* optional context */ }
  return value && value.type === type && value.from === cleanPublicPath(from) && Date.now() - value.at < 15 * 60000 && typeof value.topic === 'string' ? value.topic.slice(0, 120) : ''
}

// Legacy contact links contain article/product titles. Replace them with a fixed service
// label BEFORE loading third-party scripts, which also read the real document URL.
export const normalizeAnalyticsContactUrl = (fullPath: string) => {
  const url = new URL(fullPath, 'https://noblessegold.com')
  if (url.pathname !== '/contact' || !url.searchParams.has('topic')) return fullPath
  const topic = analyticsService(url.searchParams.get('type'))
  if (url.searchParams.get('topic') === topic) return fullPath
  url.searchParams.set('topic', topic)
  return url.pathname + url.search + url.hash
}

export const hasSafeAnalyticsQuery = (search: string) => {
  for (const [key, value] of new URLSearchParams(search)) {
    if (key === 'analytics' && value === 'off') continue
    if (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].includes(key) && cleanCampaign(value)) continue
    if (['gclid', 'dclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'].includes(key) && /^[a-zA-Z0-9._~-]{1,512}$/.test(value)) continue
    if (['n_media', 'n_rank', 'n_ad_group', 'n_ad', 'n_keyword_id', 'n_campaign', 'n_campaign_type', 'n_ad_group_type', 'n_match', 'n_network'].includes(key) && /^[a-zA-Z0-9_-]{1,120}$/.test(value)) continue
    if (key === 'type' && services.includes(value)) continue
    if (key === 'topic' && services.includes(value)) continue
    if (key === 'source' && ['home', 'gallery', 'guide_article', 'service', 'contact', 'wedding_overview'].includes(value)) continue
    if (key === 'from' && cleanPublicPath(value)) continue
    if (key === 'page' && /^[1-9]\d{0,3}$/.test(value)) continue
    if (key === 'category' && ['전체', '가격', '비용', '기간', '수리', '관리', '선택', '소재·보석', '주문'].includes(value)) continue
    // Free search, personal fields and unknown parameters never reach pixels.
    return false
  }
  return true
}

export const cleanPath = (value: unknown): string => {
  if (typeof value !== 'string' || !/^\/(?!\/)[a-zA-Z0-9/_-]*$/.test(value)) return ''
  return value.slice(0, 240).replace(/\/$/, '') || '/'
}

export const cleanPublicPath = (value: unknown) => {
  const path = cleanPath(value)
  return isPrivatePath(path) ? '' : path
}

export const analyticsReferrer = (value: string, origin: string) => {
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || isPrivatePath(url.pathname)) return ''
    return url.origin === origin ? origin + cleanPublicPath(url.pathname) : url.origin + '/'
  } catch { return '' }
}

export const analyticsPageLocation = (pathname: string, search: string, origin: string) => {
  const query = new URLSearchParams()
  for (const [key, value] of new URLSearchParams(search)) {
    if (['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].includes(key) && cleanCampaign(value)) query.append(key, value)
    if (['gclid', 'dclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid'].includes(key) && /^[a-zA-Z0-9._~-]{1,512}$/.test(value)) query.append(key, value)
  }
  return origin + cleanPublicPath(pathname) + (query.size ? '?' + query.toString() : '')
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
    landingPath: cleanPublicPath(v.landingPath),
    referrerHost: typeof v.referrerHost === 'string' && /^[a-zA-Z0-9.-]{1,120}$/.test(v.referrerHost) ? v.referrerHost : '',
    utmSource: cleanCampaign(v.utmSource),
    utmMedium: cleanCampaign(v.utmMedium),
    utmCampaign: cleanCampaign(v.utmCampaign),
  }
}
