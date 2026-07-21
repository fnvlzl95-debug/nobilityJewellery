import { siteConfig } from '~/config/site'

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

  const trackMeta = (
    method: 'track' | 'trackCustom',
    eventName: MetaStandardEvent | string,
    params?: MetaEventParams,
  ) => {
    if (typeof window !== 'undefined' && typeof (window as any).fbq === 'function') {
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
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params)
    }

    trackMetaCustomEvent(eventName, params)
  }

  const withOptionalParams = (params: EventParams) => {
    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
    ) as Record<string, string | number>
  }

  const buildConversionParams = (pageName: string, params?: ConversionParams) => {
    return withOptionalParams({
      page_name: pageName,
      placement: params?.placement,
      intent: params?.intent,
      topic: params?.topic,
      destination: params?.destination,
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
    trackMetaEvent('Contact', { contact_method: 'inquiry_form', ...conversionParams })
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

  const pageInquiryEvents: Record<string, string> = {
    gallery: 'gallery_inquiry_click',
    repair: 'repair_inquiry_click',
    custom: 'custom_inquiry_click',
    wholesale: 'wholesale_inquiry_click',
  }

  const trackPageInquiryClick = (pageName: string, params?: ConversionParams) => {
    const eventName = pageInquiryEvents[pageName]
    if (eventName) {
      trackEvent(eventName, buildConversionParams(pageName, params))
    }
    trackInquiryClick(pageName, params)
  }

  const trackLeadSubmitted = (leadType: string, leadSource?: string, leadTopic?: string) => {
    const leadParams = withOptionalParams({
      lead_type: leadType,
      lead_source: leadSource,
      lead_topic: leadTopic,
    })
    trackEvent('generate_lead', leadParams)
    trackMetaEvent('Lead', leadParams)
  }

  const trackFormError = (pageName: string, errorMessage: string, errorType = 'submission') => {
    trackEvent('contact_form_error', {
      page_name: pageName,
      error_message: errorMessage,
      error_type: errorType,
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
    trackLeadSubmitted,
    trackFormError,
  }
}
