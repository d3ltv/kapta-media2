# 🔍 Audit PageSpeed — kaptamedia.fr
> Rapport basé sur Google PageSpeed Insights — 11 mars 2026 — Mobile (4G lente)

---

## 📊 Scores globaux

| Indicateur | Score | Statut |
|---|---|---|
| ⚡ Performances | **60 / 100** | 🔴 Critique |
| ♿ Accessibilité | **84 / 100** | 🟡 Moyen |
| ✅ Bonnes pratiques | **100 / 100** | 🟢 Excellent |
| 🔎 SEO | **100 / 100** | 🟢 Excellent |

---

## ⏱️ Core Web Vitals

| Métrique | Valeur | Seuil vert | Statut |
|---|---|---|---|
| FCP (First Contentful Paint) | 1,7 s | < 1,8 s | 🟡 Borderline |
| LCP (Largest Contentful Paint) | 2,3 s | < 2,5 s | 🟡 Borderline |
| TBT (Total Blocking Time) | **3 440 ms** | < 200 ms | 🔴 Critique (17x au-dessus) |
| CLS (Cumulative Layout Shift) | 0,047 | < 0,1 | 🟢 OK |
| Speed Index | **8,2 s** | < 3,4 s | 🔴 Critique |

---

## 🐛 Problèmes identifiés

### 🔴 Critique — JavaScript surdimensionné (`vendors.js`)

Le fichier `vendors.6b214384.js` est le **coupable principal**. Il monopolise le thread principal pendant **25+ secondes** et génère **20 tâches longues** consécutives.

- Taille : **138,1 KiB** transférés
- Code inutilisé : **60 KiB** (43% du bundle jamais exécuté)
- Temps CPU total : **25 656 ms** (contre 213 ms pour main.js)
- 20 tâches longues détectées entre 86 ms et 152 ms chacune
- Layout thrashing : **121 ms** de recalculs forcés de mise en page

---

### 🔴 Critique — CSS bloquant le rendu

Le fichier `main.0e167f70.css` (24,1 KiB) est chargé en mode **synchrone**, ce qui bloque le rendu initial pendant **300 ms**.

- CSS inutilisé : **18,2 KiB** sur 23,5 KiB chargés (77% de gaspillage)
- Bloque directement le LCP et le FCP

---

### 🟡 Important — Images non optimisées

8 images sont servies en **560×747 px** alors qu'elles s'affichent en **273×364 px** sur mobile.

| Image | Taille actuelle | Économie possible |
|---|---|---|
| garage2-560w.webp | 25,4 KiB | 19,4 KiB |
| bistro2-560w.webp | 22,1 KiB | 16,8 KiB |
| boulangerie2-560w.webp | 22,0 KiB | 16,8 KiB |
| salon2-560w.webp | 20,2 KiB | 15,4 KiB |
| garage1-560w.webp | 18,9 KiB | 14,4 KiB |
| bistro1-560w.webp | 18,3 KiB | 14,0 KiB |
| salon1-560w.webp | 16,5 KiB | 12,6 KiB |
| **Total** | **143,4 KiB** | **🔽 109 KiB économisables** |

---

### 🟡 Important — Animations non composées (6 éléments)

Des animations CSS utilisent des propriétés qui forcent le navigateur à recalculer le layout à chaque frame (`top`, `left`, `width`…) au lieu de `transform` et `opacity`.

---

## ✅ Tâches à réaliser

### 🔴 Phase 1 — Urgent (Semaine 1-2) — Objectif : 70-80/100

#### JavaScript

- [ ] **Implémenter le code splitting sur vendors.js**
  - Utiliser `React.lazy()` + `Suspense` pour les composants non critiques
  - Configurer Webpack/Vite pour séparer les chunks par route
  - Activer le lazy loading des librairies tierces (ex: librairies d'animation, graphiques…)
  ```js
  // Exemple React.lazy
  const MonComposant = React.lazy(() => import('./MonComposant'));
  ```

- [ ] **Supprimer le code JavaScript inutilisé (tree-shaking)**
  - Analyser le bundle avec `webpack-bundle-analyzer` ou `vite-bundle-visualizer`
  - Remplacer les imports globaux par des imports ciblés
  ```js
  // ❌ Mauvais
  import _ from 'lodash'
  // ✅ Bon
  import debounce from 'lodash/debounce'
  ```

- [ ] **Corriger le layout thrashing dans vendors.js**
  - Regrouper toutes les lectures DOM **avant** les écritures
  - Utiliser `requestAnimationFrame` pour les batchs de modifications
  ```js
  // ❌ Mauvais — lecture/écriture alternées
  el.style.width = el.offsetWidth + 10 + 'px'
  
  // ✅ Bon — lecture d'abord, écriture ensuite
  const width = el.offsetWidth;
  requestAnimationFrame(() => { el.style.width = width + 10 + 'px' });
  ```

#### CSS

- [ ] **Rendre le CSS non-bloquant**
  - Remplacer le `<link>` CSS standard par un preload avec fallback
  ```html
  <!-- ❌ Mauvais — bloque le rendu -->
  <link rel="stylesheet" href="/css/main.css">

  <!-- ✅ Bon — chargement non bloquant -->
  <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
  ```

- [ ] **Inliner les styles critiques above-the-fold dans le `<head>`**
  - Identifier les styles utilisés dans la zone visible au premier chargement
  - Les intégrer directement en `<style>` dans le HTML

- [ ] **Supprimer le CSS inutilisé (18,2 KiB)**
  - Si Tailwind CSS : vérifier que la config `content` est correcte
  ```js
  // tailwind.config.js
  module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // bien pointer tous les fichiers
  }
  ```
  - Sinon, utiliser PurgeCSS en post-build

---

### 🟡 Phase 2 — Important (Semaine 2-4) — Objectif : 80-90/100

#### Images

- [ ] **Générer des variantes d'images adaptées au mobile**
  - Créer des variantes `200w`, `250w`, `300w` pour les images du carrousel
  - Mettre à jour l'attribut `sizes` dans le HTML
  ```html
  <!-- ❌ Actuel — charge une image trop grande -->
  <img sizes="(max-width: 768px) 273px, 300px"
       srcset="/garage2-320w.webp 320w, /garage2-560w.webp 560w"
       src="/garage2-560w.webp">

  <!-- ✅ Corrigé — variante 273w ajoutée pour mobile -->
  <img sizes="(max-width: 768px) 273px, 300px"
       srcset="/garage2-273w.webp 273w, /garage2-320w.webp 320w, /garage2-560w.webp 560w"
       src="/garage2-273w.webp">
  ```

- [ ] **Vérifier que `loading="lazy"` est présent sur toutes les images hors viewport**

#### Animations

- [ ] **Remplacer les animations non composées**
  - Identifier les 6 éléments animés signalés par Lighthouse
  - Remplacer `top/left/width/height` par `transform` et `opacity`
  ```css
  /* ❌ Mauvais — force recalcul du layout */
  .element { animation: slide 0.3s; }
  @keyframes slide { from { left: -100px; } to { left: 0; } }

  /* ✅ Bon — GPU uniquement, pas de recalcul */
  .element { animation: slide 0.3s; }
  @keyframes slide { from { transform: translateX(-100px); } to { transform: translateX(0); } }
  ```

- [ ] **Ajouter `will-change: transform` sur les éléments animés critiques** (avec parcimonie)

---

### ♿ Phase 3 — Accessibilité (Semaine 3-5) — Objectif : 95+/100

#### Boutons sans nom accessible

- [ ] **Ajouter `aria-label` sur tous les boutons du carrousel mobile**
  ```html
  <!-- ❌ Mauvais -->
  <button class="h-1.5 rounded-full transition-all w-8 bg-[#1c3ff9]"></button>

  <!-- ✅ Bon -->
  <button aria-label="Slide 1 (actif)" aria-current="true" class="h-1.5 ..."></button>
  <button aria-label="Slide 2" class="h-1.5 ..."></button>
  ```

- [ ] **Marquer le slide actif avec `aria-current="true"` ou `aria-pressed="true"`**
- [ ] **Envisager un composant `role="tablist"` + `role="tab"` pour le carrousel**

#### Contraste insuffisant

- [ ] **Corriger la couleur du texte secondaire `#A1A1AA`** (ratio actuel ~2,4:1 — insuffisant)
  ```css
  /* ❌ Mauvais — ratio 2.4:1 sur fond blanc */
  color: #A1A1AA;

  /* ✅ Minimum acceptable — ratio 4.5:1 sur fond blanc */
  color: #767676;
  ```

- [ ] **Vérifier le ratio de contraste de `"— LA VISIBILITÉ, C'EST NOUS —"` dans le footer**
- [ ] **Vérifier le texte bleu `#1c3ff9` en petit format sur fond sombre**
- [ ] Utiliser [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) pour valider chaque paire

#### Zones tactiles trop petites

- [ ] **Agrandir la zone cliquable des boutons du carrousel** (actuellement 6×6 px → minimum 44×44 px)
  ```css
  /* Solution avec padding invisible */
  .carousel-dot {
    position: relative;
    padding: 20px;         /* agrandit la zone de clic */
    margin: -20px;         /* compense visuellement */
    /* ou utiliser min-width/min-height */
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ```

---

### 🔒 Phase 4 — Sécurité (Semaine 4-6)

- [ ] **Ajouter le header HSTS**
  ```nginx
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  ```

- [ ] **Définir une Content Security Policy (CSP)**
  ```nginx
  add_header Content-Security-Policy "default-src 'self'; script-src 'self';" always;
  ```

- [ ] **Ajouter X-Frame-Options contre le clickjacking**
  ```nginx
  add_header X-Frame-Options "SAMEORIGIN" always;
  ```

- [ ] **Ajouter Cross-Origin-Opener-Policy**
  ```nginx
  add_header Cross-Origin-Opener-Policy "same-origin" always;
  ```

---

## 🗺️ Roadmap résumée

| Phase | Délai | Actions clés | Score visé |
|---|---|---|---|
| 🔴 Phase 1 | Semaine 1-2 | Code splitting JS + CSS non-bloquant + Purge inutilisé | **70-80 / 100** |
| 🟡 Phase 2 | Semaine 2-4 | Images srcset + Animations composées + Layout thrashing | **80-90 / 100** |
| ♿ Phase 3 | Semaine 3-5 | aria-label + Contraste + Zones tactiles | **Accessibilité 95+** |
| 🔒 Phase 4 | Semaine 4-6 | Headers de sécurité HTTP | **Bonnes pratiques 100** |

---

## 🎯 Top 3 — Actions à faire en premier

> Ces 3 actions seules peuvent faire passer le score de **60 → 80+**

1. **Code splitting de vendors.js** → TBT passe de 3 440 ms à < 500 ms estimé
2. **CSS non-bloquant** → supprime 300 ms du chemin critique de rendu
3. **Correction des srcset images** → économise 109 KiB de données mobiles

---

*Rapport généré à partir de Google PageSpeed Insights — 11 mars 2026*
