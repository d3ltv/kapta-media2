# 🔍 Optimisations SEO - KAPTA Media

## ✅ Optimisations déjà en place

### Meta Tags
- ✅ Title optimisé : "KAPTA Media - Top Google Maps en 14 jours"
- ✅ Description : 160 caractères, mots-clés inclus
- ✅ Keywords : Ciblés sur le référencement local
- ✅ Open Graph (Facebook/LinkedIn)
- ✅ Twitter Cards
- ✅ Geo Tags (Tours, Centre-Val de Loire)

### Structured Data (Schema.org)
- ✅ LocalBusiness schema
- ✅ Coordonnées GPS
- ✅ Horaires d'ouverture
- ✅ Services proposés
- ✅ Zone de service (Tours)

### Performance
- ✅ Images WebP (optimisées)
- ✅ Lazy loading
- ✅ Preconnect pour ressources externes
- ✅ Fonts optimisées

---

## 🚀 Optimisations supplémentaires recommandées

### 1. Ajouter un sitemap.xml

Crée `frontend/public/sitemap.xml` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kaptamedia.fr/</loc>
    <lastmod>2025-02-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 2. Ajouter un robots.txt

Crée `frontend/public/robots.txt` :

```
User-agent: *
Allow: /
Sitemap: https://kaptamedia.fr/sitemap.xml

# Bloquer les ressources inutiles
Disallow: /static/
Disallow: /*.json$
```

### 3. Ajouter des FAQ en Schema.org

Ajoute dans `index.html` après le LocalBusiness schema :

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Combien de temps ça prend vraiment ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Audit gratuit : 15 minutes par téléphone. Tournage : 2h chez vous. Mise en ligne : 48h après le tournage. Premiers résultats : 14 jours en moyenne."
      }
    },
    {
      "@type": "Question",
      "name": "C'est un abonnement ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Paiement unique de 350€. Pas de frais cachés, pas d'engagement. Vous gardez tout à vie : vidéo, photos, optimisations, borne NFC."
      }
    }
  ]
}
</script>
```

### 4. Ajouter un Service Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Optimisation Google Maps",
  "provider": {
    "@type": "LocalBusiness",
    "name": "KAPTA Media"
  },
  "areaServed": {
    "@type": "City",
    "name": "Tours"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services KAPTA",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Offre Pilote KAPTA",
          "description": "Vidéo 4K + Photos HD + Optimisation Google + Borne NFC"
        },
        "price": "350",
        "priceCurrency": "EUR"
      }
    ]
  }
}
</script>
```

---

## 📱 Google My Business

### Optimisations GMB recommandées

1. **Créer/Optimiser ta fiche GMB**
   - Nom : KAPTA Media
   - Catégorie : Agence de marketing
   - Description : Utilise le texte de ton site
   - Photos : Logo, équipe, exemples de travaux
   - Horaires : Bien renseignés
   - Site web : https://kaptamedia.fr

2. **Posts réguliers**
   - Publie 2-3 fois par semaine
   - Partage des cas clients
   - Annonce des offres spéciales
   - Conseils marketing local

3. **Avis clients**
   - Demande des avis après chaque projet
   - Réponds à tous les avis (positifs et négatifs)
   - Utilise la borne NFC pour faciliter

---

## 🎯 Mots-clés à cibler

### Primaires (haute priorité)
- optimisation google maps tours
- référencement local tours
- vidéo professionnelle commerce tours
- fiche google business tours
- marketing local tours

### Secondaires
- améliorer visibilité google maps
- premier sur google maps
- vidéo google business
- borne nfc avis google
- agence marketing local tours

### Longue traîne
- comment être premier sur google maps tours
- optimiser fiche google my business tours
- vidéo professionnelle pour commerce
- augmenter avis google maps
- borne nfc pour avis clients

---

## 📊 Outils de suivi SEO

### Google Search Console

1. Ajoute ton site : https://search.google.com/search-console
2. Vérifie la propriété (méthode HTML tag)
3. Soumets ton sitemap
4. Surveille :
   - Impressions
   - Clics
   - Position moyenne
   - Erreurs d'indexation

### Outils recommandés

- **Ubersuggest** : Recherche de mots-clés (gratuit)
- **AnswerThePublic** : Questions des utilisateurs
- **Google Trends** : Tendances de recherche
- **PageSpeed Insights** : Performance
- **Mobile-Friendly Test** : Compatibilité mobile

---

## 🔗 Stratégie de backlinks

### Annuaires locaux (gratuits)
- [ ] Pages Jaunes
- [ ] Yelp France
- [ ] Foursquare
- [ ] Tripadvisor (si applicable)
- [ ] Annuaire des entreprises Tours

### Partenariats locaux
- [ ] Chambres de commerce Tours
- [ ] Associations de commerçants
- [ ] Blogs locaux
- [ ] Médias locaux (La Nouvelle République)

### Contenu
- [ ] Blog sur le site (conseils marketing local)
- [ ] Études de cas détaillées
- [ ] Guides pratiques
- [ ] Infographies partageables

---

## 📈 Métriques à suivre

### Google Analytics
- Sessions
- Taux de rebond
- Durée moyenne de session
- Pages par session
- Conversions

### Google Search Console
- Impressions
- Clics
- CTR (taux de clic)
- Position moyenne
- Requêtes de recherche

### Google Ads
- Impressions
- Clics
- CTR
- CPC (coût par clic)
- Taux de conversion
- Coût par conversion

---

## ✅ Checklist SEO mensuelle

- [ ] Vérifier positions sur mots-clés cibles
- [ ] Analyser Google Search Console
- [ ] Publier 2-4 posts GMB
- [ ] Répondre aux avis Google
- [ ] Vérifier backlinks (Ahrefs/Ubersuggest)
- [ ] Optimiser contenu selon performances
- [ ] Mettre à jour sitemap si changements
- [ ] Vérifier vitesse du site
- [ ] Analyser concurrents

---

**🎯 Avec ces optimisations, ton site sera parfaitement positionné pour attirer des leads qualifiés !**
