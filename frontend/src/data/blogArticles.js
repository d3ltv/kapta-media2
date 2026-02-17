/**
 * KAPTA Media - Base de données des articles de blog
 * Métadonnées centralisées pour SEO et affichage
 */

export const BLOG_ARTICLES = [
  {
    id: 1,
    slug: 'article1',
    title: '5 Raisons d\'Optimiser Votre Fiche Google en 2026',
    excerpt: 'Découvrez pourquoi optimiser votre fiche Google est crucial. Les entreprises du top 3 reçoivent 126% de clics en plus.',
    description: 'Découvrez pourquoi optimiser votre fiche Google est crucial en 2026. Les entreprises du top 3 reçoivent 126% de clics en plus. Guide complet avec statistiques et conseils.',
    category: 'Google Maps',
    readTime: '12 min',
    date: '9 Février 2025',
    publishedTime: '2025-02-09T10:00:00+01:00',
    modifiedTime: '2025-02-09T10:00:00+01:00',
    emoji: '🎯',
    link: '/blog/article1',
    keywords: 'fiche google, google business profile, référencement local, SEO local, optimisation google maps, visibilité locale, google my business, avis google, top 3 google maps',
    author: 'Kapta Media',
    image: 'https://kaptamedia.fr/og-article1.jpg',
    featured: true
  },
  {
    id: 2,
    slug: 'article2',
    title: 'Avis en Ligne : Pourquoi Sont-ils Essentiels ?',
    excerpt: '81% des clients lisent systématiquement les avis avant de décider. Découvrez comment les gérer efficacement.',
    description: '81% des clients lisent systématiquement les avis avant de décider. Découvrez pourquoi les avis Google sont cruciaux pour votre référencement local et comment les gérer efficacement.',
    category: 'Marketing Local',
    readTime: '10 min',
    date: '6 Février 2025',
    publishedTime: '2025-02-06T10:00:00+01:00',
    modifiedTime: '2025-02-06T10:00:00+01:00',
    emoji: '⭐',
    link: '/blog/article2',
    keywords: 'avis google, avis clients, e-réputation, gestion avis, référencement local, google reviews, avis en ligne, réputation en ligne, collecte avis',
    author: 'Kapta Media',
    image: 'https://kaptamedia.fr/og-article2.jpg',
    featured: true
  },
  {
    id: 3,
    slug: 'article3',
    title: 'Le Pouvoir des Photos et Vidéos sur Votre Fiche Google',
    excerpt: 'Les fiches avec photos génèrent 35% de clics en plus. Guide complet avec statistiques.',
    description: 'Les fiches avec photos génèrent 35% de clics en plus. Découvrez comment les visuels transforment votre fiche Google en machine à clients. Guide complet avec statistiques.',
    category: 'Vidéo',
    readTime: '9 min',
    date: '3 Février 2025',
    publishedTime: '2025-02-03T10:00:00+01:00',
    modifiedTime: '2025-02-03T10:00:00+01:00',
    emoji: '📸',
    link: '/blog/article3',
    keywords: 'photos google, vidéo google business, visuels fiche google, photos professionnelles, vidéo entreprise, marketing visuel, contenu visuel, google maps photos',
    author: 'Kapta Media',
    image: 'https://kaptamedia.fr/og-article3.jpg',
    featured: true
  },
  {
    id: 4,
    slug: 'article4',
    title: 'La Puissance du Copywriting pour Votre SEO Local',
    excerpt: '75% des internautes jugent votre crédibilité à la qualité de vos textes. Améliorez vos conversions de 30%.',
    description: '75% des internautes jugent votre crédibilité à la qualité de vos textes. Découvrez comment le copywriting améliore votre SEO local et vos conversions de 30%.',
    category: 'Conseils',
    readTime: '10 min',
    date: '31 Janvier 2025',
    publishedTime: '2025-01-31T10:00:00+01:00',
    modifiedTime: '2025-01-31T10:00:00+01:00',
    emoji: '✍️',
    link: '/blog/article4',
    keywords: 'copywriting, seo local, rédaction web, conversion, textes optimisés, description google, contenu persuasif',
    author: 'Kapta Media',
    image: 'https://kaptamedia.fr/og-article4.jpg',
    featured: false
  },
  {
    id: 5,
    slug: 'article5',
    title: 'Comment Dépasser Vos Concurrents sur Google en 2026',
    excerpt: 'Les 5 clés pour dominer votre marché local. IA, recherche vocale, optimisation Google.',
    description: 'Les 5 clés pour dominer votre marché local en 2026. IA, recherche vocale, optimisation Google. Stratégies concrètes pour dépasser vos concurrents.',
    category: 'Conseils',
    readTime: '11 min',
    date: '28 Janvier 2025',
    publishedTime: '2025-01-28T10:00:00+01:00',
    modifiedTime: '2025-01-28T10:00:00+01:00',
    emoji: '🏆',
    link: '/blog/article5',
    keywords: 'concurrence google, stratégie seo, domination locale, intelligence artificielle, recherche vocale, tendances 2026',
    author: 'Kapta Media',
    image: 'https://kaptamedia.fr/og-article5.jpg',
    featured: false
  },
  {
    id: 6,
    slug: 'article6',
    title: 'Votre Profil Google Business est-il Prêt pour 2026 ?',
    excerpt: "En 2026, un profil incomplet vous rend invisible. Ce que révèle l'étude Birdeye et comment agir concrètement.",
    description: "Pourquoi votre visibilité locale dépend d'un profil Google Business complet en 2026. Données Birdeye et plan d'action concret.",
    category: 'Google Maps',
    readTime: '8 min',
    date: '14 Février 2026',
    publishedTime: '2026-02-14T10:00:00+01:00',
    modifiedTime: '2026-02-14T10:00:00+01:00',
    emoji: '📍',
    link: '/blog/article6',
    keywords: 'google business profile 2026, visibilité locale, seo local, fiche google, avis google',
    image: 'https://kaptamedia.fr/og-article6.jpg',
    featured: true,
    isNew: true
  }
];

// Helper functions
export const getArticleBySlug = (slug) => {
  return BLOG_ARTICLES.find(article => article.slug === slug);
};

export const getFeaturedArticles = () => {
  return BLOG_ARTICLES.filter(article => article.featured);
};

export const getArticlesByCategory = (category) => {
  if (category === 'Tous') return BLOG_ARTICLES;
  return BLOG_ARTICLES.filter(article => article.category === category);
};

export const getRelatedArticles = (currentArticleId, limit = 3) => {
  const currentArticle = BLOG_ARTICLES.find(a => a.id === currentArticleId);
  if (!currentArticle) return [];
  
  return BLOG_ARTICLES
    .filter(a => a.id !== currentArticleId && a.category === currentArticle.category)
    .slice(0, limit);
};

export default BLOG_ARTICLES;
