# 🧪 TESTS DE VALIDATION - PAGE /BTP

## 📋 Checklist de tests à effectuer

### ✅ Tests visuels

#### Desktop (>900px)
- [ ] Hero: titre aligné à gauche, CTAs alignés à gauche
- [ ] Hero: trait orange sous "chantier." aligné à gauche
- [ ] Hero strip: 5 photos visibles, hover pour agrandir
- [ ] About: photo à gauche, texte à droite (grid 2 colonnes)
- [ ] Diff: tableau 2 colonnes lisible
- [ ] Offer: 4 cartes en grid, pas de scroll
- [ ] SMS: hauteur 400-500px avec scroll si nécessaire

#### Mobile (<900px)
- [ ] Hero: tout centré (titre, CTAs, social proof)
- [ ] Hero: trait orange centré sous "chantier."
- [ ] Hero strip: 5 photos visibles, scroll horizontal
- [ ] About: titre mobile visible avant la photo
- [ ] About: titre desktop caché
- [ ] Diff: tableau 1 colonne (pas de scroll horizontal)
- [ ] Offer: scroll horizontal avec indication "← Faites défiler →"
- [ ] SMS: hauteur 320px+ avec scroll si nécessaire

#### Tablette (640-900px)
- [ ] Layout adaptatif entre mobile et desktop
- [ ] Pas de débordement horizontal
- [ ] Texte lisible sans zoom

---

### ✅ Tests de contraste (WCAG AA)

#### Mode Light
- [ ] Google Maps mockup: texte header lisible (ratio >4.5:1)
- [ ] Google Maps mockup: étoiles grises visibles
- [ ] Diff tableau: texte "eux" lisible
- [ ] Footer: liens lisibles

#### Mode Dark
- [ ] Google Maps mockup: texte header lisible (ratio >4.5:1)
- [ ] Google Maps mockup: étoiles grises visibles (#3A3A35)
- [ ] Diff tableau: texte "eux" lisible
- [ ] Footer: liens lisibles

**Outil recommandé:** WebAIM Contrast Checker

---

### ✅ Tests d'interaction

#### Boutons et liens
- [ ] CTA Hero "Voir si ma zone est libre" → scroll vers #cta-final
- [ ] Bouton "J'appelle" → ouvre le modal d'appel
- [ ] Modal appel: clic overlay sur desktop → ferme
- [ ] Modal appel: clic overlay sur mobile → demande confirmation
- [ ] Modal appel: bouton X → ferme
- [ ] WhatsApp float: apparaît après 45 secondes
- [ ] WhatsApp float: bulle avec message après 47 secondes
- [ ] WhatsApp float: bouton X ferme la bulle (24x24px)
- [ ] Footer liens: mentions-legales.html, confidentialite.html, offres.html

#### Formulaire
- [ ] Champs prénom, métier, téléphone requis
- [ ] Select métier avec options
- [ ] Bouton submit désactivé après envoi
- [ ] Message de confirmation affiché

#### SMS Conversation
- [ ] 3 onglets cliquables (Mathieu, Thomas, Audrey)
- [ ] Changement de conversation au clic
- [ ] Auto-switch toutes les 8 secondes
- [ ] Barre de progression visible
- [ ] Animation des bulles au changement

---

### ✅ Tests de performance

#### Lighthouse (Chrome DevTools)
- [ ] Performance: >90
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

#### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): <2.5s
- [ ] FID (First Input Delay): <100ms
- [ ] CLS (Cumulative Layout Shift): <0.1

#### Images
- [ ] Hero strip: images WebP chargées
- [ ] Hero strip: taille 600x400 (pas 300x300)
- [ ] Hero strip: loading="eager" + fetchpriority="high"
- [ ] Pas d'images cassées

---

### ✅ Tests d'accessibilité

#### Navigation clavier
- [ ] Tab: navigation logique entre éléments
- [ ] Enter: activation des boutons
- [ ] Esc: fermeture du modal
- [ ] Focus visible sur tous les éléments interactifs

#### Lecteur d'écran
- [ ] Attributs aria-label présents
- [ ] Attributs aria-hidden sur éléments décoratifs
- [ ] Titres hiérarchiques (h1, h2, h3)
- [ ] Texte alternatif sur images

#### Prefers-reduced-motion
- [ ] Animations désactivées si préférence utilisateur
- [ ] Grain texture statique
- [ ] Reveal animations instantanées

---

### ✅ Tests de compatibilité navigateurs

#### Chrome/Edge (Chromium)
- [ ] Affichage correct
- [ ] Animations fluides
- [ ] Scrollbar stylée

#### Firefox
- [ ] Affichage correct
- [ ] Animations fluides
- [ ] Scrollbar stylée (scrollbar-width, scrollbar-color)

#### Safari (macOS/iOS)
- [ ] Affichage correct
- [ ] Animations fluides
- [ ] Pas de problème avec backdrop-filter

#### Mobile (iOS Safari, Chrome Android)
- [ ] Scroll fluide
- [ ] Touch events fonctionnels
- [ ] Pas de zoom involontaire
- [ ] Viewport correct (100svh)

---

### ✅ Tests SEO

#### Meta tags
- [ ] Title: "Kapta Media BTP — Visibilité Google Maps pour Artisans à Tours"
- [ ] Description: présente et <160 caractères
- [ ] Keywords: présents
- [ ] Canonical URL: https://kaptamedia.fr/btp
- [ ] Lang: fr

#### Open Graph
- [ ] og:title présent
- [ ] og:description présent
- [ ] og:type: website
- [ ] og:url: https://kaptamedia.fr/btp
- [ ] og:image: /logo-kapta-btp.png

#### Twitter Card
- [ ] twitter:card: summary_large_image

#### Structured Data (JSON-LD)
- [ ] @type: LocalBusiness
- [ ] name: Kapta Media
- [ ] telephone: +33686018054
- [ ] address: Tours
- [ ] offers.price: 1250 (pas 497)
- [ ] Validation: https://search.google.com/test/rich-results

#### Sitemap & Robots
- [ ] /sitemap.xml accessible
- [ ] /robots.txt accessible
- [ ] Sitemap référencé dans robots.txt

---

### ✅ Tests de sécurité

#### Headers HTTP
- [ ] X-XSS-Protection: 1; mode=block
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] Strict-Transport-Security (si HTTPS)

#### Liens externes
- [ ] rel="noopener noreferrer" sur liens WhatsApp
- [ ] target="_blank" sur liens externes

#### Formulaire
- [ ] Pas d'injection SQL possible
- [ ] Validation côté client ET serveur
- [ ] Données sensibles non exposées

---

### ✅ Tests légaux (RGPD)

#### Pages légales
- [ ] /mentions-legales.html accessible et complète
- [ ] /confidentialite.html accessible et conforme RGPD
- [ ] /offres.html accessible et détaillée

#### Formulaire
- [ ] Mention "Données confidentielles" visible
- [ ] Pas de cookies de tracking sans consentement
- [ ] Lien vers politique de confidentialité

---

### ✅ Tests de contenu

#### Cohérence
- [ ] Prix: 1 250 € partout (pas 497 €)
- [ ] Téléphone: 06 86 01 80 54 partout
- [ ] Nom: Charly S. ou Charly D. Silva (cohérent)
- [ ] Eyebrow About: "Derrière Kapta Media" (mobile et desktop)

#### Orthographe et grammaire
- [ ] Pas de fautes d'orthographe
- [ ] Ponctuation correcte
- [ ] Majuscules cohérentes

#### Liens
- [ ] Tous les liens internes fonctionnels
- [ ] Tous les liens externes fonctionnels
- [ ] Pas de liens cassés (#)

---

## 🔧 Outils recommandés

### Performance
- **Lighthouse** (Chrome DevTools)
- **WebPageTest** (https://www.webpagetest.org/)
- **GTmetrix** (https://gtmetrix.com/)

### Accessibilité
- **WAVE** (https://wave.webaim.org/)
- **axe DevTools** (extension Chrome)
- **NVDA** ou **JAWS** (lecteurs d'écran)

### SEO
- **Google Search Console**
- **Rich Results Test** (https://search.google.com/test/rich-results)
- **Mobile-Friendly Test** (https://search.google.com/test/mobile-friendly)

### Contraste
- **WebAIM Contrast Checker** (https://webaim.org/resources/contrastchecker/)
- **Colour Contrast Analyser** (application desktop)

### Validation
- **W3C HTML Validator** (https://validator.w3.org/)
- **W3C CSS Validator** (https://jigsaw.w3.org/css-validator/)

---

## 📊 Résultats attendus

### Performance
- Lighthouse Performance: **>90**
- LCP: **<2.5s**
- FID: **<100ms**
- CLS: **<0.1**

### Accessibilité
- Lighthouse Accessibility: **>95**
- WAVE: **0 erreurs**
- Contraste: **WCAG AA conforme**

### SEO
- Lighthouse SEO: **100**
- Rich Results: **Valide**
- Mobile-Friendly: **Oui**

---

## 🐛 Bugs connus à surveiller

1. **Safari iOS**: backdrop-filter peut causer des problèmes de performance
2. **Firefox**: scrollbar-color peut ne pas s'appliquer sur certaines versions
3. **Chrome Android**: 100svh peut ne pas fonctionner sur anciennes versions
4. **Edge**: mix-blend-mode peut avoir un rendu différent

---

## ✅ Validation finale

Une fois tous les tests passés:
- [ ] Créer un tag Git: `v1.0-btp-optimized`
- [ ] Déployer sur Vercel
- [ ] Tester en production
- [ ] Monitorer les Core Web Vitals
- [ ] Vérifier l'indexation Google (Search Console)

---

**Date de création:** 27 février 2026  
**Dernière mise à jour:** 27 février 2026  
**Statut:** ✅ Prêt pour tests
