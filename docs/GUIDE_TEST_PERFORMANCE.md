# Guide de Test des Optimisations Performance

## 🚀 Déploiement Rapide

```bash
# 1. Installer les dépendances (si nécessaire)
cd frontend
npm install

# 2. Build de production
npm run build

# 3. Déployer sur Vercel
cd ..
vercel --prod
```

## 🧪 Tests à Effectuer

### 1. Test Lighthouse (Chrome DevTools)

```bash
# Ouvrir Chrome en mode navigation privée
# Aller sur votre site déployé
# F12 → Onglet "Lighthouse"
# Cocher "Performance" uniquement
# Device: Mobile
# Cliquer "Analyze page load"
```

**Métriques à vérifier** :
- ✅ Performance Score: > 75 (objectif 80-85)
- ✅ FCP (First Contentful Paint): < 1.8s
- ✅ LCP (Largest Contentful Paint): < 2.5s
- ✅ TBT (Total Blocking Time): < 300ms
- ✅ CLS (Cumulative Layout Shift): < 0.1

### 2. Test du Logo

**Vérifier** :
1. Le logo s'affiche correctement dans la navbar
2. DevTools Network → Filtrer "logo" → Vérifier que c'est `/logo.webp` (pas l'URL distante)
3. Vérifier le header `Cache-Control: public, max-age=31536000, immutable`
4. Taille: ~446 KiB → devrait être optimisé si converti en SVG ou compressé

**Si le logo ne s'affiche pas** :
```bash
# Vérifier que le fichier existe
ls -lh frontend/public/logo.webp

# Si absent, re-télécharger
curl -o frontend/public/logo.webp "https://customer-assets.emergentagent.com/job_e9af3148-6038-40b0-a95f-b7160e86bcee/artifacts/v4yy8wt0_logo2.webp"
```

### 3. Test de la Font Inter

**Vérifier** :
1. DevTools Network → Filtrer "woff2"
2. Voir `Inter-SemiBold.woff2` chargé depuis `/Inter-SemiBold.woff2`
3. Vérifier le header `Cache-Control: public, max-age=31536000, immutable`
4. Pas de requête vers `fonts.googleapis.com` ou `fonts.gstatic.com`

**Si la font ne charge pas** :
```bash
# Vérifier que le fichier existe
ls -lh frontend/public/Inter-SemiBold.woff2

# Si absent, re-télécharger
curl -o frontend/public/Inter-SemiBold.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2"
```

### 4. Test des Scripts Tiers (Chargement Différé)

**Google Analytics** :
1. DevTools Network → Filtrer "gtag"
2. Vérifier que `gtag/js` se charge APRÈS le chargement initial (waterfall)
3. Console → Taper `window.gtag` après 2-3 secondes → devrait être défini

**Calendly** :
1. DevTools Network → Filtrer "calendly"
2. Vérifier que `widget.js` se charge APRÈS le chargement initial
3. Scroll jusqu'à la section Contact → Le widget devrait apparaître

**Microsoft Clarity** :
1. DevTools Network → Filtrer "clarity"
2. Vérifier que le script se charge APRÈS le chargement initial

### 5. Test du Cache Vercel

**Première visite** :
1. DevTools Network → Désactiver le cache
2. Recharger la page
3. Vérifier les headers des assets :
   - Images `.webp` : `Cache-Control: public, max-age=31536000, immutable`
   - Fonts `.woff2` : `Cache-Control: public, max-age=31536000, immutable`
   - JS/CSS dans `/static/` : `Cache-Control: public, max-age=31536000, immutable`

**Deuxième visite** :
1. Réactiver le cache
2. Recharger la page
3. Vérifier que les assets viennent du cache (colonne "Size" = "disk cache")

### 6. Test des Images Responsives

**Desktop** :
1. DevTools Network → Filtrer "webp"
2. Vérifier que les images "avant/après" chargent les bonnes tailles
3. Exemple: `bistro1-960w.webp` sur desktop

**Mobile** :
1. DevTools → Toggle device toolbar (Ctrl+Shift+M)
2. Sélectionner "iPhone 12 Pro"
3. Recharger la page
4. Vérifier que les images chargent les versions `-320w` ou `-640w`

### 7. Test PostHog (Optionnel)

**Vérifier le chargement différé** :
1. DevTools Network → Filtrer "posthog"
2. Recharger la page
3. PostHog ne devrait PAS charger immédiatement
4. Attendre 5 secondes OU cliquer/scroller
5. PostHog devrait alors charger

**Vérifier la configuration** :
```javascript
// Console DevTools après chargement
window.posthog
// Devrait être défini après 5s ou interaction
```

## 📊 Comparaison Avant/Après

### Lighthouse Scores

| Métrique | Avant | Après (Objectif) |
|----------|-------|------------------|
| Performance | 52 | 75-85 |
| FCP | 2.5s | < 1.8s |
| LCP | 4.2s | < 2.5s |
| TBT | 900ms | < 300ms |
| CLS | 0.15 | < 0.1 |

### Taille des Ressources

| Ressource | Avant | Après |
|-----------|-------|-------|
| Logo | 446 KiB (distant) | 446 KiB (local, caché) |
| Font Inter | ~50 KiB (Google) | 23 KiB (local) |
| JS Initial | ~800 KiB | ~800 KiB |
| JS Tiers (immédiat) | ~400 KiB | ~0 KiB (différé) |

## 🐛 Troubleshooting

### Le logo ne s'affiche pas
```bash
# Vérifier le fichier
ls -lh frontend/public/logo.webp

# Vérifier dans le build
ls -lh frontend/build/logo.webp

# Re-build si nécessaire
cd frontend && npm run build
```

### La font ne charge pas
```bash
# Vérifier le fichier
ls -lh frontend/public/Inter-SemiBold.woff2

# Vérifier dans index.html
grep "Inter-SemiBold" frontend/public/index.html
```

### Google Analytics ne track pas
```javascript
// Console DevTools après 2-3 secondes
window.gtag
// Devrait être défini

// Tester un événement
window.trackEvent('test_event', { test: true })
```

### Les images ne sont pas responsives
```bash
# Vérifier que les variants existent
ls -lh frontend/public/*-320w.webp
ls -lh frontend/public/*-640w.webp
ls -lh frontend/public/*-960w.webp
```

### Le cache ne fonctionne pas
```bash
# Vérifier vercel.json
cat vercel.json

# Re-déployer
vercel --prod --force
```

## 🎯 Checklist Finale

- [ ] Performance Score > 75
- [ ] Logo local s'affiche
- [ ] Font Inter charge depuis local
- [ ] Pas de requêtes Google Fonts
- [ ] gtag charge après 1-2s
- [ ] Calendly charge après 2-3s
- [ ] PostHog charge après 5s ou interaction
- [ ] Headers Cache-Control présents
- [ ] Images responsives fonctionnent
- [ ] Pas d'erreurs console
- [ ] Site fonctionne normalement

## 📈 Analyse du Bundle (Optionnel)

```bash
cd frontend
npm run build
npm run analyze
```

Cela ouvrira une visualisation interactive montrant :
- Taille de chaque dépendance
- Ce qui pèse le plus dans le bundle
- Opportunités d'optimisation supplémentaires

## 🔗 Outils Utiles

- **PageSpeed Insights** : https://pagespeed.web.dev/
- **WebPageTest** : https://www.webpagetest.org/
- **Chrome DevTools** : F12 → Lighthouse
- **Vercel Analytics** : Dashboard Vercel → Analytics

## 💡 Optimisations Futures

Si vous voulez aller encore plus loin (85-95) :

1. **Convertir le logo en SVG** (si possible)
   - Gain: 446 KiB → ~5 KiB
   - Impact: Énorme sur LCP

2. **Code Splitting React**
   - Extraire sections lourdes
   - Lazy load avec React.lazy()
   - Gain: -200 KiB JS initial

3. **Optimiser Framer Motion**
   - Lazy load uniquement pour sections animées
   - Gain: -100 KiB JS

4. **Critical CSS Inline**
   - Extraire CSS du Hero
   - Inline dans <head>
   - Gain: -200ms FCP

5. **Service Worker**
   - Précache assets critiques
   - Gain: Chargements instantanés
