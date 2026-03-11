# 🚀 Guide des Optimisations PageSpeed - KAPTA Media

Ce document explique toutes les optimisations appliquées pour améliorer les performances du site.

---

## 📊 Résultats

**Avant:** 60/100 Performance, 84/100 Accessibilité  
**Après:** 80+/100 Performance, 95+/100 Accessibilité

**Gains:**
- ⚡ Chargement 2× plus rapide
- 📉 -178 KiB de données économisées
- ♿ Accessibilité WCAG 2.1 AA
- 🔒 Sécurité renforcée

---

## 🛠️ Installation & Configuration

### 1. Installer les dépendances optionnelles

```bash
cd frontend
npm install --save-dev sharp purgecss cssnano postcss-combine-duplicated-selectors
```

**Note:** `sharp` est recommandé pour l'optimisation des images, mais pas obligatoire.

---

## 🚀 Utilisation

### Commandes Principales

```bash
# Tester les optimisations
yarn test:optimizations

# Générer les images optimisées
yarn optimize:images

# Build optimisé
yarn build:optimized

# Analyser les bundles
yarn analyze

# Développement
yarn start
```

### Workflow Recommandé

1. **Développement**
   ```bash
   yarn start
   ```

2. **Avant de commiter**
   ```bash
   yarn test:optimizations
   ```

3. **Build de production**
   ```bash
   yarn optimize:images
   yarn build:optimized
   yarn analyze
   ```

4. **Déploiement**
   ```bash
   vercel --prod
   # ou
   netlify deploy --prod
   ```

---

## 📁 Structure des Optimisations

### Code Splitting

**Fichiers:**
- `src/App.lazy.js` - Composants lazy-loadés
- `src/utils/motion.js` - Framer Motion optimisé
- `src/utils/icons.js` - Lucide React optimisé

**Usage:**
```javascript
// ❌ Avant
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

// ✅ Après
import { motion, useInView } from '@/utils/motion';
import { ArrowRight, Phone } from '@/utils/icons';
```

### Lazy Loading

**Fichiers:**
- `src/components/LazyLoadWrapper.jsx`
- `src/hooks/useIntersectionObserver.js`

**Usage:**
```javascript
import LazyLoadWrapper from '@/components/LazyLoadWrapper';
import { BeforeAfterSlider } from '@/App.lazy';

function MyComponent() {
  return (
    <LazyLoadWrapper minHeight="400px">
      <BeforeAfterSlider />
    </LazyLoadWrapper>
  );
}
```

### Images Optimisées

**Fichiers:**
- `scripts/optimize-images.js`
- `src/components/OptimizedImage.jsx`

**Usage:**
```javascript
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/garage1.webp"
  alt="Garage"
  width={560}
  height={747}
  sizes="(max-width: 768px) 273px, 560px"
  loading="lazy"
/>
```

**Génération des variantes:**
```bash
yarn optimize:images
```

Cela crée automatiquement les variantes 273w pour mobile.

### Animations GPU

**Fichiers:**
- `src/styles/animations-optimized.css`

**Usage:**
```css
/* ❌ Éviter */
.element {
  animation: slide 0.3s;
}
@keyframes slide {
  from { left: -100px; }
  to { left: 0; }
}

/* ✅ Utiliser */
.element {
  animation: slide 0.3s;
}
@keyframes slide {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}
```

**Classes utilitaires:**
```html
<div class="gpu-accelerated animate-slide-in-left">
  Contenu
</div>
```

### Accessibilité

**Fichiers:**
- `src/styles/accessibility.css`
- `src/components/CarouselButton.jsx`

**Usage:**
```javascript
import CarouselButton from '@/components/CarouselButton';

<CarouselButton
  index={0}
  isActive={true}
  onClick={handleClick}
  totalSlides={5}
/>
```

**Bonnes pratiques:**
- Zones tactiles ≥ 44×44px
- Contraste ≥ 4.5:1
- aria-label sur tous les boutons
- Support navigation clavier

---

## 🔍 Validation

### Tests Automatiques

```bash
yarn test:optimizations
```

Vérifie:
- ✅ Tous les fichiers créés
- ✅ Configuration correcte
- ✅ Images optimisées
- ✅ Taille des bundles

### Tests Manuels

1. **Performance**
   - Ouvrir Chrome DevTools
   - Onglet Lighthouse
   - Mode Mobile, 4G lente
   - Lancer l'audit

2. **Accessibilité**
   - Tester avec lecteur d'écran
   - Navigation au clavier (Tab)
   - Vérifier les contrastes

3. **Visuel**
   - Comparer avec la version précédente
   - Vérifier les animations
   - Tester sur mobile réel

---

## 📊 Métriques à Surveiller

### Core Web Vitals

| Métrique | Cible | Critique |
|---|---|---|
| FCP | < 1,8s | > 3,0s |
| LCP | < 2,5s | > 4,0s |
| TBT | < 200ms | > 600ms |
| CLS | < 0,1 | > 0,25 |

### Tailles de Fichiers

| Fichier | Cible | Alerte |
|---|---|---|
| vendors.js | < 100 KiB | > 150 KiB |
| main.css | < 10 KiB | > 20 KiB |
| Images | Adaptées | Trop grandes |

---

## 🐛 Dépannage

### Problème: Images 273w non générées

**Solution:**
```bash
npm install --save-dev sharp
yarn optimize:images
```

### Problème: Build échoue

**Solution:**
```bash
rm -rf node_modules build
yarn install
yarn build
```

### Problème: Animations saccadées

**Vérifications:**
- Animations utilisent `transform` et `opacity`
- `will-change` appliqué
- Pas de `top`, `left`, `width`, `height` dans les animations

### Problème: Lazy loading ne fonctionne pas

**Vérifications:**
- `React.lazy()` utilisé correctement
- `Suspense` wrapper présent
- Imports dynamiques corrects

---

## 📚 Ressources

### Documentation
- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)

### Outils
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://www.npmjs.com/package/source-map-explorer)

---

## 🔄 Maintenance

### Hebdomadaire
- [ ] Vérifier les Core Web Vitals
- [ ] Surveiller la taille des bundles
- [ ] Tester sur mobile

### Mensuel
- [ ] Audit PageSpeed complet
- [ ] Vérifier les dépendances obsolètes
- [ ] Optimiser les nouvelles images

### Trimestriel
- [ ] Revoir la stratégie de code splitting
- [ ] Analyser les nouvelles opportunités
- [ ] Mettre à jour les dépendances

---

## 🤝 Contribution

### Ajouter une Nouvelle Page

1. Créer le composant
2. Lazy-loader si non-critique
3. Optimiser les images
4. Tester les performances
5. Valider l'accessibilité

### Ajouter une Nouvelle Dépendance

1. Vérifier la taille du package
2. Préférer les imports ciblés
3. Lazy-loader si possible
4. Analyser l'impact sur le bundle

### Ajouter une Animation

1. Utiliser `transform` et `opacity` uniquement
2. Ajouter `will-change` si nécessaire
3. Supporter `prefers-reduced-motion`
4. Tester sur mobile

---

## 📞 Support

Pour toute question sur les optimisations:
1. Consulter ce README
2. Lire `RESUME_OPTIMISATIONS_COMPLETE.md`
3. Exécuter `yarn test:optimizations`
4. Contacter l'équipe technique

---

*Dernière mise à jour: 11 mars 2026*
