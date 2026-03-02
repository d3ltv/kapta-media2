# ✅ Checklist de Déploiement SEO & Analytics - Kapta Media

## Date : 10 Février 2025

---

## 🎯 AMÉLIORATIONS IMPLÉMENTÉES

### ✅ Analytics
- [x] Nouveaux événements de tracking ajoutés
  - [x] trackOutboundLink()
  - [x] trackFormInteraction()
  - [x] trackTimeOnPage()
  - [x] trackSearch()
  - [x] track404Error()
  - [x] trackEngagementScore()
- [x] Score d'engagement automatique configuré
- [x] Tracking de recherche dans le blog
- [x] Compteur d'interactions dans sessionStorage

### ✅ SEO
- [x] Sitemap enrichi avec Google News + images
- [x] Configuration SEO centralisée (seo.js)
- [x] Base de données articles (blogArticles.js)
- [x] Robots.txt optimisé
- [x] Breadcrumb structured data sur tous les articles
- [x] Breadcrumb visible sur tous les articles
- [x] Flux RSS créé et lié
- [x] Lazy loading déjà présent sur les images

---

## 📋 ACTIONS À FAIRE MANUELLEMENT

### 🎨 Créer les Images Open Graph
**Priorité : HAUTE**

Créer les images suivantes (1200x630px) :
- [ ] `og-image.jpg` - Image par défaut du site
- [ ] `og-article1.jpg` - Article 1 (5 Raisons d'Optimiser)
- [ ] `og-article2.jpg` - Article 2 (Avis en Ligne)
- [ ] `og-article3.jpg` - Article 3 (Photos et Vidéos)
- [ ] `og-article4.jpg` - Article 4 (Copywriting)
- [ ] `og-article5.jpg` - Article 5 (Dépasser Concurrents)

**Outils recommandés :**
- Canva (templates Open Graph)
- Figma
- Photoshop

**Spécifications :**
- Dimensions : 1200x630px
- Format : JPG ou PNG
- Poids : < 300KB
- Texte lisible même en petit
- Logo Kapta Media visible
- Couleur principale : #1c3ff9

### 🔍 Google Search Console
**Priorité : HAUTE**

1. **Vérifier la propriété du site**
   - [ ] Aller sur https://search.google.com/search-console
   - [ ] Ajouter la propriété kaptamedia.fr
   - [ ] Vérifier via balise HTML ou DNS

2. **Soumettre le sitemap**
   - [ ] Aller dans Sitemaps
   - [ ] Ajouter : https://kaptamedia.fr/sitemap.xml
   - [ ] Attendre l'indexation (24-48h)

3. **Soumettre le flux RSS**
   - [ ] Ajouter : https://kaptamedia.fr/rss.xml

4. **Vérifier les structured data**
   - [ ] Aller dans Améliorations
   - [ ] Vérifier les erreurs de structured data
   - [ ] Corriger si nécessaire

### 🔧 Tests à Effectuer
**Priorité : MOYENNE**

1. **Test Structured Data**
   - [ ] Aller sur https://search.google.com/test/rich-results
   - [ ] Tester : https://kaptamedia.fr/
   - [ ] Tester : https://kaptamedia.fr/blog/article1
   - [ ] Vérifier que les schemas sont valides

2. **Test Open Graph**
   - [ ] Aller sur https://www.opengraph.xyz/
   - [ ] Tester toutes les pages
   - [ ] Vérifier l'affichage des images

3. **Test Twitter Card**
   - [ ] Aller sur https://cards-dev.twitter.com/validator
   - [ ] Tester toutes les pages
   - [ ] Vérifier l'affichage

4. **Test RSS Feed**
   - [ ] Aller sur https://validator.w3.org/feed/
   - [ ] Valider : https://kaptamedia.fr/rss.xml
   - [ ] Corriger les erreurs éventuelles

5. **Test Analytics**
   - [ ] Ouvrir la console du navigateur
   - [ ] Naviguer sur le site
   - [ ] Vérifier que les événements sont trackés
   - [ ] Vérifier dans GA4 (temps réel)

### 📊 Configuration Google Analytics
**Priorité : MOYENNE**

1. **Créer des objectifs de conversion**
   - [ ] Audit request
   - [ ] Phone click
   - [ ] Calendly open
   - [ ] Form submit

2. **Configurer les audiences**
   - [ ] Visiteurs engagés (score > 60)
   - [ ] Lecteurs de blog
   - [ ] Visiteurs récurrents

3. **Créer des rapports personnalisés**
   - [ ] Engagement par page
   - [ ] Parcours utilisateur
   - [ ] Sources de trafic

### 🔗 Autres Outils à Connecter
**Priorité : BASSE**

1. **Bing Webmaster Tools**
   - [ ] Créer un compte
   - [ ] Ajouter le site
   - [ ] Soumettre le sitemap

2. **Google Tag Manager** (optionnel)
   - [ ] Créer un compte
   - [ ] Installer le conteneur
   - [ ] Migrer les tags GA4

3. **Hotjar** (optionnel)
   - [ ] Créer un compte
   - [ ] Installer le script
   - [ ] Configurer les heatmaps

---

## 🧪 TESTS DE VALIDATION

### Test 1 : Recherche Blog
1. [ ] Aller sur /blog
2. [ ] Taper "google maps" dans la recherche
3. [ ] Vérifier dans la console : "🔍 Search tracked: google maps"
4. [ ] Vérifier dans GA4 (temps réel) l'événement "search"

### Test 2 : Breadcrumb
1. [ ] Aller sur /blog/article1
2. [ ] Vérifier le breadcrumb visible : Accueil / Blog / Article
3. [ ] Cliquer sur "Blog" → doit rediriger vers /blog
4. [ ] Vérifier dans le code source : script breadcrumb JSON-LD

### Test 3 : Score d'Engagement
1. [ ] Ouvrir une page
2. [ ] Scroller jusqu'à 75%
3. [ ] Attendre 2 minutes
4. [ ] Cliquer sur 3 éléments
5. [ ] Fermer la page
6. [ ] Vérifier dans GA4 : événement "engagement_score"

### Test 4 : RSS Feed
1. [ ] Aller sur https://kaptamedia.fr/rss.xml
2. [ ] Vérifier que le XML s'affiche correctement
3. [ ] Vérifier les 5 articles
4. [ ] Tester dans un lecteur RSS (Feedly, Inoreader)

### Test 5 : Sitemap
1. [ ] Aller sur https://kaptamedia.fr/sitemap.xml
2. [ ] Vérifier que le XML s'affiche correctement
3. [ ] Vérifier les balises <news:news>
4. [ ] Vérifier les balises <image:image>

---

## 📈 MÉTRIQUES À SURVEILLER (30 JOURS)

### Analytics
- [ ] Temps moyen sur page : objectif > 2 min
- [ ] Taux de scroll 75% : objectif > 40%
- [ ] Score d'engagement moyen : objectif > 60/100
- [ ] Recherches blog : identifier les sujets populaires
- [ ] Taux de rebond : objectif < 50%

### SEO
- [ ] Impressions Google : suivre l'évolution
- [ ] Clics organiques : objectif +50% en 90 jours
- [ ] Position moyenne : objectif top 10
- [ ] Pages indexées : vérifier que toutes les pages sont indexées
- [ ] Erreurs d'exploration : objectif 0

### Conversions
- [ ] Taux de conversion : objectif > 3%
- [ ] Demandes d'audit : suivre le nombre
- [ ] Clics téléphone : suivre le nombre
- [ ] Ouvertures Calendly : suivre le nombre

---

## 🚨 PROBLÈMES POTENTIELS

### Problème 1 : Structured Data non reconnue
**Symptôme :** Google ne détecte pas les schemas
**Solution :**
1. Vérifier avec Rich Results Test
2. Vérifier que les scripts sont bien dans <head>
3. Attendre 7 jours pour l'indexation

### Problème 2 : Images Open Graph non affichées
**Symptôme :** Pas d'image lors du partage
**Solution :**
1. Vérifier que les images existent
2. Vérifier les dimensions (1200x630px)
3. Forcer le rafraîchissement du cache Facebook/Twitter

### Problème 3 : RSS non valide
**Symptôme :** Erreurs dans le validateur
**Solution :**
1. Vérifier les caractères spéciaux (&, <, >)
2. Utiliser CDATA pour le contenu HTML
3. Vérifier les dates (format RFC 822)

### Problème 4 : Analytics ne track pas
**Symptôme :** Pas d'événements dans GA4
**Solution :**
1. Vérifier que gtag est chargé (console)
2. Vérifier l'ID GA4 : G-4QS20YLNE2
3. Désactiver les bloqueurs de pub
4. Vérifier en mode incognito

---

## 📞 RESSOURCES UTILES

### Documentation
- Google Search Console : https://search.google.com/search-console
- Rich Results Test : https://search.google.com/test/rich-results
- Open Graph Debugger : https://www.opengraph.xyz/
- RSS Validator : https://validator.w3.org/feed/
- GA4 Documentation : https://support.google.com/analytics

### Outils de Test
- PageSpeed Insights : https://pagespeed.web.dev/
- GTmetrix : https://gtmetrix.com/
- Screaming Frog : https://www.screamingfrog.co.uk/
- Ahrefs Webmaster Tools : https://ahrefs.com/webmaster-tools

### Support
- Email : contact@kaptamedia.fr
- Documentation : Voir AMELIORATIONS_ANALYTICS_SEO.md

---

## ✅ VALIDATION FINALE

Une fois toutes les tâches effectuées :

- [ ] Toutes les images Open Graph créées et uploadées
- [ ] Site vérifié dans Google Search Console
- [ ] Sitemap soumis et indexé
- [ ] Structured data validées sans erreur
- [ ] Analytics trackant correctement
- [ ] RSS feed valide et fonctionnel
- [ ] Tous les tests passés avec succès
- [ ] Métriques de base enregistrées (pour comparaison)

**Date de validation finale : _______________**

**Validé par : _______________**

---

**Dernière mise à jour : 10 Février 2025**
