// Chargement optimisé de PostHog - uniquement après consentement/interaction
let posthogLoaded = false;
let posthogInstance = null;

export async function loadPosthog() {
  if (posthogLoaded) return posthogInstance;
  
  posthogLoaded = true;
  
  try {
    const posthog = (await import('posthog-js')).default;
    
    posthog.init('phc_xAvL2Iq4tFmANRE7kzbKwaSqp1HJjN7x48s3vr0CMjs', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // On capture manuellement
      disable_session_recording: true, // Désactivé pour la performance
      disable_surveys: true, // Désactivé pour la performance
      loaded: (ph) => {
        posthogInstance = ph;
        // Capture la pageview initiale
        ph.capture('$pageview');
      }
    });
    
    return posthog;
  } catch (error) {
    console.error('Failed to load PostHog:', error);
    return null;
  }
}

// Charger après interaction utilisateur
if (typeof window !== 'undefined') {
  // Charger après 5 secondes OU première interaction
  const loadTimer = setTimeout(() => loadPosthog(), 5000);
  
  ['click', 'scroll', 'touchstart', 'keydown'].forEach(event => {
    document.addEventListener(event, () => {
      clearTimeout(loadTimer);
      loadPosthog();
    }, { once: true, passive: true });
  });
}

export function trackEvent(eventName, properties = {}) {
  if (posthogInstance) {
    posthogInstance.capture(eventName, properties);
  }
}
