/**
 * KAPTA Media - Analytics & Conversion Tracking
 * Gestion centralisée de Google Analytics 4 et Google Ads
 */

// ============================================
// CONFIGURATION
// ============================================

export const ANALYTICS_CONFIG = {
  GA4_ID: 'G-4QS20YLNE2', // ID Google Analytics 4 - KAPTA Media
  GOOGLE_ADS_ID: 'AW-XXXXXXXXXX', // Remplace par ton ID Google Ads quand tu l'auras
  
  // Labels de conversion Google Ads (à configurer quand tu auras Google Ads)
  CONVERSION_LABELS: {
    AUDIT_REQUEST: 'xxxxx', // Demande d'audit gratuit
    PHONE_CLICK: 'xxxxx',   // Clic sur numéro de téléphone
    CALENDLY_OPEN: 'xxxxx', // Ouverture du calendrier
    FORM_SUBMIT: 'xxxxx',   // Soumission de formulaire
  }
};

// ============================================
// ÉVÉNEMENTS GOOGLE ANALYTICS 4
// ============================================

/**
 * Track page view
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href
    });
  }
};

/**
 * Track CTA clicks (Call-to-Action)
 */
export const trackCTAClick = (ctaName, ctaLocation) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: ctaName,
      cta_location: ctaLocation,
      value: 1
    });
  }
  
  console.log('📊 CTA Click tracked:', ctaName, 'at', ctaLocation);
};

/**
 * Track audit request (conversion principale)
 */
export const trackAuditRequest = (source) => {
  if (typeof window.gtag !== 'undefined') {
    // Événement GA4
    window.gtag('event', 'generate_lead', {
      event_category: 'conversion',
      event_label: 'audit_request',
      source: source,
      value: 350, // Valeur du service
      currency: 'EUR'
    });
    
    // Conversion Google Ads
    window.gtag('event', 'conversion', {
      'send_to': `${ANALYTICS_CONFIG.GOOGLE_ADS_ID}/${ANALYTICS_CONFIG.CONVERSION_LABELS.AUDIT_REQUEST}`,
      'value': 350,
      'currency': 'EUR'
    });
  }
  
  console.log('🎯 Audit Request tracked from:', source);
};

/**
 * Track phone click
 */
export const trackPhoneClick = (phoneNumber, location) => {
  if (typeof window.gtag !== 'undefined') {
    // Événement GA4
    window.gtag('event', 'phone_click', {
      event_category: 'engagement',
      event_label: phoneNumber,
      location: location,
      value: 1
    });
    
    // Conversion Google Ads
    window.gtag('event', 'conversion', {
      'send_to': `${ANALYTICS_CONFIG.GOOGLE_ADS_ID}/${ANALYTICS_CONFIG.CONVERSION_LABELS.PHONE_CLICK}`,
      'value': 1,
      'currency': 'EUR'
    });
  }
  
  console.log('📞 Phone Click tracked:', phoneNumber, 'from', location);
};

/**
 * Track Calendly open
 */
export const trackCalendlyOpen = (source) => {
  if (typeof window.gtag !== 'undefined') {
    // Événement GA4
    window.gtag('event', 'calendly_open', {
      event_category: 'engagement',
      event_label: 'calendar_opened',
      source: source,
      value: 1
    });
    
    // Conversion Google Ads
    window.gtag('event', 'conversion', {
      'send_to': `${ANALYTICS_CONFIG.GOOGLE_ADS_ID}/${ANALYTICS_CONFIG.CONVERSION_LABELS.CALENDLY_OPEN}`,
      'value': 1,
      'currency': 'EUR'
    });
  }
  
  console.log('📅 Calendly Open tracked from:', source);
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage
    });
  }
};

/**
 * Track section view
 */
export const trackSectionView = (sectionName) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'section_view', {
      event_category: 'engagement',
      event_label: sectionName,
      value: 1
    });
  }
  
  console.log('👁️ Section viewed:', sectionName);
};

/**
 * Track video interaction
 */
export const trackVideoInteraction = (action, videoTitle) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'video_' + action, {
      event_category: 'video',
      event_label: videoTitle,
      value: 1
    });
  }
  
  console.log('🎥 Video', action, ':', videoTitle);
};

/**
 * Track navigation menu click
 */
export const trackMenuClick = (menuItem) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'menu_click', {
      event_category: 'navigation',
      event_label: menuItem,
      value: 1
    });
  }
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url, linkText) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      link_text: linkText,
      transport_type: 'beacon'
    });
  }
  
  console.log('🔗 Outbound link clicked:', url);
};

/**
 * Track form field interactions
 */
export const trackFormInteraction = (fieldName, action) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'form_interaction', {
      event_category: 'form',
      event_label: fieldName,
      action: action, // 'focus', 'blur', 'error'
      value: 1
    });
  }
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'time_on_page', {
      event_category: 'engagement',
      event_label: `${Math.floor(seconds / 60)} minutes`,
      value: seconds
    });
  }
};

/**
 * Track search queries (blog search)
 */
export const trackSearch = (searchTerm, resultsCount) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  }
  
  console.log('🔍 Search tracked:', searchTerm, 'Results:', resultsCount);
};

/**
 * Track 404 errors
 */
export const track404Error = (path) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'exception', {
      description: `404_error: ${path}`,
      fatal: false
    });
  }
  
  console.log('❌ 404 Error tracked:', path);
};

/**
 * Track user engagement score
 */
export const trackEngagementScore = (score) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'engagement_score', {
      event_category: 'engagement',
      event_label: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low',
      value: score
    });
  }
};

/**
 * Track FAQ interaction
 */
export const trackFAQClick = (question) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'faq_click', {
      event_category: 'engagement',
      event_label: question,
      value: 1
    });
  }
  
  console.log('❓ FAQ clicked:', question);
};

/**
 * Track before/after slider interaction
 */
export const trackSliderInteraction = (direction) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'slider_swipe', {
      event_category: 'engagement',
      event_label: direction,
      value: 1
    });
  }
};

/**
 * Track WhatsApp click
 */
export const trackWhatsAppClick = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: 'whatsapp_contact',
      value: 1
    });
  }
  
  console.log('💬 WhatsApp clicked');
};

// ============================================
// ENHANCED E-COMMERCE (pour Google Ads)
// ============================================

/**
 * Track product view (service view)
 */
export const trackServiceView = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_item', {
      currency: 'EUR',
      value: 350,
      items: [{
        item_id: 'kapta_pilot_offer',
        item_name: 'Offre Pilote KAPTA',
        item_category: 'Service',
        price: 350,
        quantity: 1
      }]
    });
  }
};

/**
 * Track add to cart (interest in service)
 */
export const trackServiceInterest = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: 350,
      items: [{
        item_id: 'kapta_pilot_offer',
        item_name: 'Offre Pilote KAPTA',
        item_category: 'Service',
        price: 350,
        quantity: 1
      }]
    });
  }
};

/**
 * Track begin checkout (audit request initiated)
 */
export const trackCheckoutBegin = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'begin_checkout', {
      currency: 'EUR',
      value: 350,
      items: [{
        item_id: 'kapta_pilot_offer',
        item_name: 'Offre Pilote KAPTA',
        item_category: 'Service',
        price: 350,
        quantity: 1
      }]
    });
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Initialize analytics on page load
 */
export const initAnalytics = () => {
  // Track initial page view
  trackPageView(window.location.pathname, document.title);
  
  // Track service view
  trackServiceView();
  
  // Setup scroll tracking
  let scrollTracked = {
    25: false,
    50: false,
    75: false,
    90: false
  };
  
  let scrollTicking = false;
  const handleScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;

    window.requestAnimationFrame(() => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = totalScrollable > 0
        ? Math.round((window.scrollY / totalScrollable) * 100)
        : 0;
      
      Object.keys(scrollTracked).forEach(threshold => {
        if (scrollPercent >= threshold && !scrollTracked[threshold]) {
          trackScrollDepth(threshold);
          scrollTracked[threshold] = true;
        }
      });

      scrollTicking = false;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Track time on page
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    if (timeSpent > 10) { // Only track if more than 10 seconds
      trackTimeOnPage(timeSpent);
    }
  });
  
  // Calculate and track engagement score on page exit
  let engagementScore = 0;
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Score based on time (max 40 points)
    engagementScore += Math.min(timeSpent / 3, 40);
    
    // Score based on scroll (max 30 points)
    const maxScroll = Math.max(...Object.keys(scrollTracked).filter(k => scrollTracked[k]).map(Number));
    engagementScore += (maxScroll / 90) * 30;
    
    // Score based on interactions (max 30 points)
    const interactions = parseInt(sessionStorage.getItem('kapta_interactions') || '0');
    engagementScore += Math.min(interactions * 5, 30);
    
    trackEngagementScore(Math.round(engagementScore));
  });
  
  console.log('✅ Analytics initialized');
};

/**
 * Debug mode - log all tracking calls
 */
export const enableDebugMode = () => {
  window.KAPTA_DEBUG = true;
  console.log('🐛 Analytics Debug Mode enabled');
};

export default {
  trackPageView,
  trackCTAClick,
  trackAuditRequest,
  trackPhoneClick,
  trackCalendlyOpen,
  trackScrollDepth,
  trackSectionView,
  trackVideoInteraction,
  trackMenuClick,
  trackOutboundLink,
  trackFormInteraction,
  trackTimeOnPage,
  trackSearch,
  track404Error,
  trackEngagementScore,
  trackFAQClick,
  trackSliderInteraction,
  trackWhatsAppClick,
  trackServiceView,
  trackServiceInterest,
  trackCheckoutBegin,
  initAnalytics,
  enableDebugMode
};
