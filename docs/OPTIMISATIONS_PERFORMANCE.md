# 🚀 Optimisations Performance - Kapta Media

## Date : 10 Février 2025

---

## 📊 PROBLÈMES COURANTS PAGESPEED

### 1. **Images Non Optimisées**
**Symptôme :** "Properly size images" ou "Serve images in next-gen formats"

**Solutions appliquées :**
- ✅ Utilisation de WebP pour toutes les images
- ✅ Lazy loading sur toutes les images (sauf logo)
- ✅ Preload du logo principal

**À faire :**
- [ ] Compresser les images avec TinyPNG ou Squoosh
- [ ] Créer plusieurs tailles d'images (responsive)
- [ ] Utiliser srcset pour les images responsive

**Commande pour optimiser :**
```bash
# Installer sharp pour optimiser les images
npm install sharp

# Script pour optimiser toutes les images
node scripts/optimize-images.js
```

---

### 2. **JavaScript Non Utilisé**
**Symptôme :** "Remove unused JavaScript"

**Solutions appliquées :**
- ✅ Code splitting avec React.lazy (si applicable)
- ✅ Tree shaking automatique avec Webpack

**À faire :**
- [ ] Analyser le bundle avec webpack-bundle-analyzer
- [ ] Lazy load des composants non critiques
- [ ] Supprimer les dépendances inutilisées

**Commande pour analyser :**
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

---

### 3. **CSS Non Utilisé**
**Symptôme :** "Remove unused CSS"

**Solutions appliquées :**
- ✅ Tailwind CSS avec purge activé
- ✅ CSS critique inline (à vérifier)

**À faire :**
- [ ] Vérifier la configuration Tailwind purge
- [ ] Utiliser PurgeCSS pour supprimer le CSS inutilisé
- [ ] Inline le CSS critique

**Configuration Tailwind :**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  // ... reste de la config
}
```

---

### 4. **Temps de Réponse Serveur (TTFB)**
**Symptôme :** "Reduce initial server response time"

**Solutions :**
- [ ] Utiliser un CDN (Cloudflare, Vercel Edge)
- [ ] Activer la compression Gzip/Brotli
- [ ] Mettre en cache les ressources statiques
- [ ] Utiliser HTTP/2 ou HTTP/3

**Configuration Vercel (vercel.json) :**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

---

### 5. **Scripts Tiers Bloquants**
**Symptôme :** "Reduce the impact of third-party code"

**Solutions appliquées :**
- ✅ Google Analytics chargé en async
- ✅ Calendly chargé en defer
- ✅ Fonts chargées avec media="print" puis all

**À faire :**
- [ ] Utiliser Partytown pour les scripts tiers
- [ ] Lazy load Calendly uniquement quand nécessaire
- [ ] Self-host Google Fonts

**Lazy load Calendly :**
```javascript
// Charger Calendly uniquement au clic
const loadCalendly = () => {
  if (!window.Calendly) {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
  }
};
```

---

### 6. **LCP (Largest Contentful Paint)**
**Symptôme :** "Largest Contentful Paint element"

**Solutions :**
- ✅ Preload du logo principal
- ✅ Preconnect aux domaines externes

**À faire :**
- [ ] Identifier l'élément LCP avec DevTools
- [ ] Preload l'image/ressource LCP
- [ ] Optimiser le CSS critique
- [ ] Réduire le JavaScript bloquant

**Identifier le LCP :**
```javascript
// Dans la console du navigateur
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP element:', lastEntry.element);
  console.log('LCP time:', lastEntry.renderTime || lastEntry.loadTime);
}).observe({type: 'largest-contentful-paint', buffered: true});
```

---

### 7. **CLS (Cumulative Layout Shift)**
**Symptôme :** "Avoid large layout shifts"

**Solutions :**
- ✅ Dimensions explicites sur les images
- ✅ Skeleton loaders (à vérifier)

**À faire :**
- [ ] Ajouter width/height sur toutes les images
- [ ] Réserver l'espace pour les ads/embeds
- [ ] Utiliser aspect-ratio CSS
- [ ] Éviter d'insérer du contenu au-dessus du contenu existant

**Exemple :**
```jsx
// Mauvais
<img src="image.jpg" alt="..." />

// Bon
<img 
  src="image.jpg" 
  alt="..." 
  width="1200" 
  height="630"
  className="w-full h-auto"
/>
```

---

### 8. **FID/INP (First Input Delay / Interaction to Next Paint)**
**Symptôme :** "Minimize main thread work"

**Solutions :**
- [ ] Débouncer les événements scroll/resize
- [ ] Utiliser requestAnimationFrame pour les animations
- [ ] Lazy load les composants lourds
- [ ] Utiliser Web Workers pour les calculs lourds

**Exemple debounce :**
```javascript
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Utilisation
window.addEventListener('scroll', debounce(() => {
  // Code de scroll
}, 100));
```

---

## 🛠️ OUTILS D'OPTIMISATION

### Images
- **TinyPNG** : https://tinypng.com/
- **Squoosh** : https://squoosh.app/
- **ImageOptim** (Mac) : https://imageoptim.com/
- **Sharp** (Node.js) : https://sharp.pixelplumbing.com/

### Fonts
- **Google Webfonts Helper** : https://gwfh.mranftl.com/fonts
- **Fontsource** : https://fontsource.org/

### JavaScript
- **Webpack Bundle Analyzer** : https://www.npmjs.com/package/webpack-bundle-analyzer
- **Bundle Buddy** : https://bundle-buddy.com/

### CSS
- **PurgeCSS** : https://purgecss.com/
- **UnCSS** : https://uncss-online.com/

### Performance
- **Lighthouse CI** : https://github.com/GoogleChrome/lighthouse-ci
- **WebPageTest** : https://www.webpagetest.org/
- **GTmetrix** : https://gtmetrix.com/

---

## 📋 CHECKLIST D'OPTIMISATION

### Images
- [ ] Toutes les images en WebP
- [ ] Images compressées (< 100KB pour les photos)
- [ ] Lazy loading activé (sauf above-the-fold)
- [ ] Dimensions explicites (width/height)
- [ ] srcset pour responsive
- [ ] Preload des images critiques

### Scripts
- [ ] Scripts tiers en async/defer
- [ ] Code splitting activé
- [ ] Tree shaking configuré
- [ ] Bundle < 200KB (gzipped)
- [ ] Pas de console.log en production

### CSS
- [ ] CSS critique inline
- [ ] CSS non critique en async
- [ ] Tailwind purge activé
- [ ] Pas de CSS inutilisé
- [ ] Animations GPU-accelerated

### Fonts
- [ ] Fonts preconnect
- [ ] Font-display: swap
- [ ] Fonts self-hosted (optionnel)
- [ ] Subset des fonts (caractères utilisés uniquement)

### Caching
- [ ] Cache-Control headers configurés
- [ ] Service Worker (optionnel)
- [ ] CDN configuré
- [ ] Compression Gzip/Brotli activée

### Monitoring
- [ ] Lighthouse CI configuré
- [ ] Real User Monitoring (RUM)
- [ ] Alertes performance
- [ ] Budget de performance défini

---

## 🎯 OBJECTIFS DE PERFORMANCE

### Mobile
- **Performance Score** : > 90
- **LCP** : < 2.5s
- **FID/INP** : < 100ms
- **CLS** : < 0.1
- **TTFB** : < 600ms

### Desktop
- **Performance Score** : > 95
- **LCP** : < 1.5s
- **FID/INP** : < 50ms
- **CLS** : < 0.05
- **TTFB** : < 400ms

---

## 🚀 QUICK WINS (Gains Rapides)

### 1. Compresser les Images (5 min)
```bash
# Utiliser TinyPNG ou Squoosh
# Réduction de 50-80% du poids
```

### 2. Activer la Compression (2 min)
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "gzip"
        }
      ]
    }
  ]
}
```

### 3. Preconnect aux Domaines (1 min)
✅ Déjà fait dans index.html

### 4. Lazy Load Calendly (10 min)
Charger uniquement au clic sur le bouton

### 5. Self-host Google Fonts (15 min)
Télécharger et héberger les fonts localement

---

## 📊 MESURER LES RÉSULTATS

### Avant Optimisation
- [ ] Screenshot PageSpeed Insights
- [ ] Noter les scores (Performance, LCP, CLS, etc.)
- [ ] Noter le poids de la page
- [ ] Noter le nombre de requêtes

### Après Optimisation
- [ ] Screenshot PageSpeed Insights
- [ ] Comparer les scores
- [ ] Calculer le gain (%)
- [ ] Documenter les changements

### Outils de Mesure
1. **PageSpeed Insights** : https://pagespeed.web.dev/
2. **Lighthouse** (DevTools)
3. **WebPageTest** : https://www.webpagetest.org/
4. **GTmetrix** : https://gtmetrix.com/

---

## 💡 RESSOURCES UTILES

### Documentation
- Web.dev Performance : https://web.dev/performance/
- MDN Performance : https://developer.mozilla.org/en-US/docs/Web/Performance
- Google Web Fundamentals : https://developers.google.com/web/fundamentals/performance

### Articles
- Optimizing LCP : https://web.dev/optimize-lcp/
- Optimizing CLS : https://web.dev/optimize-cls/
- Optimizing FID : https://web.dev/optimize-fid/

### Vidéos
- Chrome DevTools Performance : https://www.youtube.com/watch?v=6Ljq-Jn-EgU
- Web Performance Fundamentals : https://frontendmasters.com/courses/web-performance/

---

**Dernière mise à jour : 10 Février 2025**
