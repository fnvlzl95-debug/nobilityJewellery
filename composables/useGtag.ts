import { siteConfig } from '~/config/site'

// GA4 이벤트 추적 composable
export const useGtag = () => {
  type EventParams = Record<string, string | number | undefined>
  type ConversionParams = {
    placement?: string
    intent?: string
    topic?: string
    destination?: string
  }

  const trackEvent = (eventName: string, params?: Record<string, string | number>) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params)
    }
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
    trackEvent('phone_click', {
      phone_number: siteConfig.phone,
      ...buildConversionParams(pageName, { ...params, destination }),
    })
    trackCtaClick('phone_call', pageName, { ...params, destination })
  }

  // 온라인 문의 클릭
  const trackInquiryClick = (pageName: string, params?: ConversionParams) => {
    const destination = params?.destination || '/contact'
    trackEvent('inquiry_click', buildConversionParams(pageName, { ...params, destination }))
    trackCtaClick('online_inquiry', pageName, { ...params, destination })
  }

  // 카카오톡 클릭
  const trackKakaoClick = (pageName: string, params?: ConversionParams) => {
    const destination = params?.destination || siteConfig.social.kakaoOpenChat
    trackEvent('kakao_click', buildConversionParams(pageName, { ...params, destination }))
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

    trackEvent(`${mapType}_map_click`, buildConversionParams(pageName, {
      ...params,
      intent: params?.intent || 'directions',
      destination,
    }))
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
    trackEvent('generate_lead', withOptionalParams({
      lead_type: leadType,
      lead_source: leadSource,
      lead_topic: leadTopic,
    }))
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
