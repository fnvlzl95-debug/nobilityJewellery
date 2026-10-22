import { siteConfig } from '~/config/site'
import { shouldTrackAnalytics, analyticsEventVersion, analyticsOptOut, analyticsService, cleanPublicPath } from '~/utils/analytics-policy'

const submittedLeadIds = new Set<string>()
const trackingAllowed = () => {
  if (typeof window === 'undefined' || window.ngAnalyticsDisabled) return false
  let storage: Storage | undefined
  try { storage = window.sessionStorage } catch { /* blocked storage */ }
  return !analyticsOptOut(window.location.search, storage) && shouldTrackAnalytics(import.meta.env.PROD, window.location.hostname, window.location.search, window.location.pathname)
}

// GA4 이벤트 추적 composable
export const useGtag = () => {
  type EventParams = Record<string, string | number | undefined>
  type MetaEventParams = Record<string, string | number>
  type MetaStandardEvent = 'PageView' | 'ViewContent' | 'Contact' | 'Lead' | 'FindLocation'
  type ConversionParams = {
    placement?: string
    intent?: string
    topic?: string
    destination?: string
  }
  type GuideServiceLinkParams = {
    sourcePath: string
    targetPath: string
    anchorText: string
    placement: string
    topicCluster?: string
  }

  const trackMeta = (
    method: 'track' | 'trackCustom',
    eventName: MetaStandardEvent | string,
    params?: MetaEventParams,
  ) => {
    if (trackingAllowed() && typeof window.fbq === 'function') {
      if (params) {
        (window as any).fbq(method, eventName, params)
      } else {
        (window as any).fbq(method, eventName)
      }
    }
  }

  const trackMetaEvent = (eventName: MetaStandardEvent, params?: MetaEventParams) => {
    trackMeta('track', eventName, params)
  }

  const trackMetaCustomEvent = (eventName: string, params?: MetaEventParams) => {
    trackMeta('trackCustom', eventName, params)
  }

  const trackEvent = (eventName: string, params?: Record<string, string | number>) => {
    if (!trackingAllowed()) return
    const safeParams = Object.fromEntries(Object.entries(params || {}).flatMap(([key, value]) => {
      if (['topic', 'lead_topic', 'name', 'email', 'phone', 'message', 'address'].includes(key)) return []
      if (['source_path', 'target_path', 'page_path'].includes(key)) return [[key, cleanPublicPath(value)]]
      if (key === 'destination') {
        try {
          const url = new URL(String(value), siteConfig.url)
          if (url.protocol === 'tel:') return [[key, 'phone']]
          return [[key, url.origin === siteConfig.url ? cleanPublicPath(url.pathname) : url.origin + url.pathname]]
        } catch { return [] }
      }
      return [[key, value]]
    }))
    params = { ...safeParams, event_version: analyticsEventVersion, page_path: cleanPublicPath(window.location.pathname) }
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params)
    }

    trackMetaCustomEvent(eventName, params)
    const naverEvents: Record<string, string> = { kakao_click: 'KakaoClick', phone_click: 'PhoneClick', inquiry_click: 'InquiryClick', naver_map_click: 'MapClick', kakao_map_click: 'MapClick', form_start: 'FormStart', generate_lead: 'LeadAccepted', guide_to_service_click: 'GuideToService' }
    if (naverEvents[eventName]) window.ngTrackNaverEvent?.(naverEvents[eventName])
  }

  const withOptionalParams = (params: EventParams) => {
    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
    ) as Record<string, string | number>
  }

  const buildConversionParams = (pageName: string, params?: ConversionParams) => {
    return withOptionalParams({
      page_name: pageName,
      source_path: typeof window !== 'undefined' ? cleanPublicPath(window.location.pathname) : undefined,
      placement: params?.placement,
      intent: params?.intent,
      service_type: analyticsService(params?.intent || pageName, typeof window !== 'undefined' ? window.location.pathname : ''),
    })
  }

  // CTA 클릭 추적
  const trackCtaClick = (
    ctaType: 'phone_call' | 'online_inquiry' | 'kakao_chat' | 'directions',
    pageName: string,
    params?: ConversionParams
  ) => {
    trackEvent('cta_click', {
      cta_type: ctaType,
      ...buildConversionParams(pageName, params),
    })
  }

  // 전화 버튼 클릭
  const trackPhoneClick = (pageName: string, params?: ConversionParams) => {
    const destination = params?.destination || `tel:${siteConfig.phone}`
    const conversionParams = buildConversionParams(pageName, { ...params, destination })
    trackEvent('phone_click', {
      phone_number: siteConfig.phone,
      ...conversionParams,
    })
    trackMetaEvent('Contact', { contact_method: 'phone', ...conversionParams })
    trackCtaClick('phone_call', pageName, { ...params, destination })
  }

  // 온라인 문의 클릭
  const trackInquiryClick = (pageName: string, params?: ConversionParams) => {
    const destination = params?.destination || '/contact'
    const conversionParams = buildConversionParams(pageName, { ...params, destination })
    trackEvent('inquiry_click', conversionParams)
    trackCtaClick('online_inquiry', pageName, { ...params, destination })
  }

  // 카카오톡 클릭
  const trackKakaoClick = (pageName: string, params?: ConversionParams) => {
    const destination = params?.destination || siteConfig.social.kakaoOpenChat
    const conversionParams = buildConversionParams(pageName, { ...params, destination })
    trackEvent('kakao_click', conversionParams)
    trackMetaEvent('Contact', { contact_method: 'kakao', ...conversionParams })
    trackCtaClick('kakao_chat', pageName, { ...params, destination })
  }

  const trackMapClick = (
    pageName: string,
    mapType: 'naver' | 'kakao',
    params?: ConversionParams
  ) => {
    const destination = params?.destination || (mapType === 'naver'
      ? 'https://naver.me/xen7hRCZ'
      : 'https://map.kakao.com/link/search/서울 종로구 종로 173 귀족')

    const conversionParams = buildConversionParams(pageName, {
      ...params,
      intent: params?.intent || 'directions',
      destination,
    })
    trackEvent(`${mapType}_map_click`, conversionParams)
    trackMetaEvent('FindLocation', { map_type: mapType, ...conversionParams })
    trackCtaClick('directions', pageName, {
      ...params,
      intent: params?.intent || 'directions',
      destination,
    })
  }

  const trackPageInquiryClick = (pageName: string, params?: ConversionParams) => {
    trackInquiryClick(pageName, params)
  }

  const trackLeadSubmitted = (
    leadType: string,
    leadSource?: string,
    _leadTopic?: string,
    leadId?: string,
    sourcePath?: string,
  ) => {
    if (!trackingAllowed() || !leadId || submittedLeadIds.has(leadId)) return
    submittedLeadIds.add(leadId)
    const leadParams = withOptionalParams({
      lead_type: analyticsService(leadType),
      lead_source: ['home', 'gallery', 'guide_article', 'service', 'contact'].includes(leadSource || '') ? leadSource : 'contact',
      lead_id: leadId,
      source_path: cleanPublicPath(sourcePath),
    })
    trackEvent('generate_lead', leadParams)
    trackMetaEvent('Lead', leadParams)
  }

  const trackGuideToServiceClick = (params: GuideServiceLinkParams) => {
    trackEvent('guide_to_service_click', withOptionalParams({
      source_path: params.sourcePath,
      target_path: params.targetPath,
      anchor_text: params.anchorText,
      placement: params.placement,
      topic_cluster: params.topicCluster,
    }))
  }

  const trackFormError = (pageName: string, errorMessage: string, errorType = 'submission') => {
    trackEvent('contact_form_error', {
      page_name: pageName,
      error_code: /^(missing_type|missing_consent|[A-Z_]{3,40})$/.test(errorMessage) ? errorMessage : 'UNKNOWN_ERROR',
      error_type: ['validation', 'api_error', 'submission'].includes(errorType) ? errorType : 'submission',
    })
  }

  return {
    trackEvent,
    trackMetaEvent,
    trackMetaCustomEvent,
    trackCtaClick,
    trackPhoneClick,
    trackInquiryClick,
    trackKakaoClick,
    trackMapClick,
    trackPageInquiryClick,
    trackGuideToServiceClick,
    trackLeadSubmitted,
    trackFormError,
  }
}
