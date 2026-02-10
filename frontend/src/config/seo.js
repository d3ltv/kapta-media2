/**
 * KAPTA Media - Configuration SEO Centralisée
 * Toutes les métadonnées SEO en un seul endroit
 */

export const SEO_CONFIG = {
  // Informations de base
  siteName: 'Kapta Media',
  siteUrl: 'https://kaptamedia.fr',
  defaultTitle: 'KAPTA Media - Top Google Maps en 14 jours | Tours',
  titleTemplate: '%s | Kapta Media',
  defaultDescription: 'Votre concurrent est N°1 sur Google Maps ? On vous met dans le Top 5 en 14 jours avec une vidéo pro + fiche optimisée. Agence marketing local à Tours.',
  
  // Images par défaut
  defaultImage: 'https://kaptamedia.fr/og-image.jpg',
  logo: 'https://kaptamedia.fr/logo2.webp',
  favicon: 'https://kaptamedia.fr/favicon.webp',
  
  // Réseaux sociaux
  social: {
    twitter: '@kaptamedia',
    facebook: 'kaptamedia',
    instagram: 'kaptamedia',
    linkedin: 'company/kaptamedia'
  },
  
  // Informations de contact
  contact: {
    email: 'contact@kaptamedia.fr',
    phone: '+33686018054',
    address: {
      street: '',
      city: 'Tours',
      region: 'Centre-Val de Loire',
      postalCode: '37000',
      country: 'FR'
    }
  },
  
  // Géolocalisation
  geo: {
    latitude: 47.394144,
    longitude: 0.68484,
    region: 'FR-37',
    placename: 'Tours'
  },
  
  // Mots-clés principaux
  keywords: [
    'google maps',
    'référencement local',
    'vidéo professionnelle',
    'commerce Tours',
    'fiche google business',
    'optimisation locale',
    'visibilité google',
    'marketing local',
    'SEO local Tours',
    'agence marketing Tours'
  ],
  
  // Configuration Open Graph
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    site_name: 'Kapta Media'
  },
  
  // Configuration Twitter Card
  twitter: {
    cardType: 'summary_large_image',
    site: '@kaptamedia',
    creator: '@kaptamedia'
  },
  
  // Structured Data - Organization
  organization: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'KAPTA Media',
    description: 'Agence de marketing local spécialisée dans l\'optimisation Google Maps et la création de contenu vidéo professionnel',
    url: 'https://kaptamedia.fr',
    telephone: '+33686018054',
    email: 'contact@kaptamedia.fr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tours',
      addressRegion: 'Centre-Val de Loire',
      postalCode: '37000',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.394144,
      longitude: 0.68484
    },
    areaServed: {
      '@type': 'City',
      name: 'Tours'
    },
    serviceType: [
      'Optimisation Google Maps',
      'Vidéo professionnelle',
      'Marketing local',
      'Référencement local'
    ],
    priceRange: '€€',
    openingHours: 'Mo-Fr 09:00-18:00'
  },
  
  // Pages principales avec métadonnées
  pages: {
    home: {
      title: 'KAPTA Media - Top Google Maps en 14 jours | Tours',
      description: 'Votre concurrent est N°1 sur Google Maps ? On vous met dans le Top 5 en 14 jours avec une vidéo pro + fiche optimisée. Agence marketing local à Tours.',
      keywords: 'google maps tours, référencement local tours, vidéo professionnelle, optimisation google business',
      path: '/'
    },
    blog: {
      title: 'Blog Marketing Local & SEO | Conseils d\'Experts',
      description: 'Découvrez nos conseils d\'experts en marketing local, SEO et optimisation Google Business Profile. Articles pratiques pour booster votre visibilité locale.',
      keywords: 'blog marketing local, SEO local, google business profile, conseils marketing, optimisation google maps',
      path: '/blog'
    }
  },
  
  // FAQ Schema pour la page d'accueil
  faqSchema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Combien de temps pour voir des résultats ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '14 jours pour entrer dans le top 5 local. Résultats visibles dès la première semaine avec notre méthode éprouvée.'
        }
      },
      {
        '@type': 'Question',
        name: 'Ça marche pour tous les secteurs ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui ! Restaurants, garages, salons, commerces de proximité... Tous les secteurs locaux bénéficient de notre optimisation Google Maps.'
        }
      },
      {
        '@type': 'Question',
        name: 'Que se passe-t-il après les 14 jours ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Votre fiche reste optimisée. Nous vous formons pour maintenir votre position et continuer à progresser de manière autonome.'
        }
      }
    ]
  },
  
  // Breadcrumb Schema
  getBreadcrumbSchema: (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://kaptamedia.fr${item.path}`
    }))
  }),
  
  // Article Schema
  getArticleSchema: (article) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || 'https://kaptamedia.fr/og-image.jpg',
    author: {
      '@type': 'Organization',
      name: 'Kapta Media'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kapta Media',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kaptamedia.fr/logo2.webp'
      }
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kaptamedia.fr${article.path}`
    }
  })
};

export default SEO_CONFIG;
