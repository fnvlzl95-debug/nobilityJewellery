import { siteConfig } from '~/config/site'

// GA4 이벤트 추적 composable
export const useGtag = () => {
  const trackEvent = (eventName: string, params?: Record<string, string | number>) => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params)
    }
  }

  // CTA 클릭 추적
  const trackCtaClick = (ctaType: 'phone_call' | 'online_inquiry' | 'kakao_chat', pageName: string) => {
    trackEvent('cta_click', {
      cta_type: ctaType,
      page_name: pageName,
    })
  }

  // 전화 버튼 클릭
  const trackPhoneClick = (pageName: string) => {
    trackEvent('phone_click', {
      page_name: pageName,
      phone_number: siteConfig.phone,
    })
    trackCtaClick('phone_call', pageName)
  }

  // 온라인 문의 클릭
  const trackInquiryClick = (pageName: string) => {
    trackEvent('inquiry_click', {
      page_name: pageName,
    })
    trackCtaClick('online_inquiry', pageName)
  }

  // 카카오톡 클릭
  const trackKakaoClick = (pageName: string) => {
    trackEvent('kakao_click', {
      page_name: pageName,
    })
    trackCtaClick('kakao_chat', pageName)
  }

  return {
    trackEvent,
    trackCtaClick,
    trackPhoneClick,
    trackInquiryClick,
    trackKakaoClick,
  }
}
