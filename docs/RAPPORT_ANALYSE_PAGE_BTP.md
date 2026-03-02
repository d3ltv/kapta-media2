# 📋 RAPPORT D'ANALYSE VISUELLE - PAGE /BTP

## 🎯 Vue d'ensemble
Analyse complète des problèmes visuels, de mise en forme et d'ergonomie détectés sur la page BTP de Kapta Media.

---

## 🔴 PROBLÈMES CRITIQUES

### 1. **Section Hero - Alignement incohérent**
**Localisation:** `#hero` (lignes 150-350)

**Problèmes identifiés:**
- Le titre principal utilise `text-align: left` dans `.hero-h1`, `.h1-ghost`, `.h1-main`, `.h1-accent` mais le conteneur parent `.hero-main` a `align-items: flex-start`
- Sur mobile, cela crée un alignement à gauche qui peut sembler déséquilibré
- Le trait orange sous "chantier." (`.h1-accent::after`) est positionné avec `left: 0` et `width: 52px`, ce qui peut ne pas être centré visuellement sous le mot

**Impact visuel:** Titre qui semble "collé" à gauche sur certains écrans

---

### 2. **Section About - Duplication de titres**
**Localisation:** `#about` (lignes 1100-1300)

**Problèmes identifiés:**
- Le titre "Charly S." et l'eyebrow "Qui sommes-nous" / "Derrière Kapta Media" apparaissent DEUX FOIS dans le code:
  - Une fois dans `.about-mobile-header` (visible mobile uniquement)
  - Une fois dans `.about-copy` avec classes `.about-eyebrow` et `.about-name`
- Sur desktop, les classes `.about-eyebrow` et `.about-name` sont affichées (`display: block`)
- Sur mobile (<859px), elles sont cachées (`display: none`)
- **MAIS** le texte "Derrière Kapta Media" dans `.about-copy` est différent de "Qui sommes-nous" dans `.about-mobile-header`

**Impact visuel:** Incohérence de contenu entre mobile et desktop

---

### 3. **Photo placeholder dans About**
**Localisation:** `.about-photo-wrap` (ligne ~1150)

**Problèmes identifiés:**
- La section photo affiche uniquement un placeholder avec texte "Votre photo ici"
- Aucune vraie image n'est chargée
- Le SVG d'icône utilisateur est très basique
- L'aspect ratio `4/5` est défini mais sans contenu réel

**Impact visuel:** Section "À propos" qui manque de crédibilité sans photo réelle

---

## 🟠 PROBLÈMES MAJEURS

### 4. **Hero Strip - Photos Unsplash non optimisées**
**Localisation:** `PHOTOS` array (ligne ~1770)

**Problèmes identifiés:**
- Les URLs Unsplash utilisent des paramètres `w=300&h=300` mais les images sont affichées dans une bande de `height: 140px`
- Pas de version WebP ou AVIF pour de meilleures performances
- Les images sont chargées avec `loading="lazy"` mais dans le hero (above the fold), elles devraient être en eager loading
- Le badge "88% appellent le 1er" sur la première photo peut être masqué par l'image selon le crop

**Impact visuel:** Temps de chargement plus long, images potentiellement floues

---

### 5. **Ticker - Animation qui peut causer des problèmes**
**Localisation:** `.km-ticker` (ligne ~400)

**Problèmes identifiés:**
- L'animation `tick` dure 30 secondes et translate de `-50%` à `0`
- Les items sont dupliqués `[...items, ...items]` pour créer l'effet infini
- Sur mobile, si le contenu est trop long, il peut y avoir des sauts visuels
- Le `white-space: nowrap` peut causer des débordements sur très petits écrans

**Impact visuel:** Animation saccadée ou texte coupé sur mobile

---

### 6. **Google Maps Mockup - Contraste insuffisant**
**Localisation:** `.gmaps-mock` (ligne ~850)

**Problèmes identifiés:**
- En mode dark, le header `.gmaps-header` a `background: #0C0C09` avec texte `color: #6A6660`
- Le ratio de contraste est probablement < 4.5:1 (non conforme WCAG AA)
- Le résultat "Votre entreprise — introuvable" utilise `opacity: .7` sur le nom, réduisant encore le contraste
- Les étoiles grises `.gr-star.g` ont `color: #E8E8E8` en light et `color: var(--bg3)` en dark, potentiellement invisibles

**Impact visuel:** Texte difficile à lire, surtout pour les utilisateurs malvoyants

---

### 7. **Section Diff - Tableau responsive problématique**
**Localisation:** `#diff` (ligne ~800)

**Problèmes identifiés:**
- Le tableau utilise `grid-template-columns: 1fr 1fr` même sur mobile
- Sur écrans < 640px, le padding des cellules est réduit à `16px 14px` mais le texte peut être long
- Les icônes `✗` et `✓` ont `font-size: 1.1rem` sur desktop mais `.95rem` sur mobile, créant une incohérence
- Le `overflow-x: auto` sur `.diff-table-wrap` peut créer un scroll horizontal non désiré

**Impact visuel:** Tableau difficile à lire sur mobile, texte tassé

---

## 🟡 PROBLÈMES MODÉRÉS

### 8. **SMS Conversation - Hauteur fixe problématique**
**Localisation:** `.sms-body` (ligne ~1050)

**Problèmes identifiés:**
- Hauteur fixe: `min-height: 280px; max-height: 280px` sur mobile
- Hauteur fixe: `min-height: 400px; max-height: 400px` sur desktop
- Si une conversation a plus de messages, ils seront coupés ou nécessiteront un scroll
- L'animation des bulles utilise `ref` et `requestAnimationFrame` mais avec des délais fixes qui peuvent ne pas s'adapter au nombre de messages

**Impact visuel:** Messages potentiellement coupés, scroll dans un petit conteneur

---

### 9. **Piliers Solution - Espacement incohérent**
**Localisation:** `.pilier` (ligne ~900)

**Problèmes identifiés:**
- Sur mobile, le numéro `.pilier-num` a `margin-bottom: 16px`
- Sur desktop (>700px), il n'y a plus de margin-bottom car le layout passe en grid
- Le texte `.pilier-p` est caché sur mobile (`display: none`) mais visible sur desktop
- Cela crée une expérience très différente entre mobile et desktop

**Impact visuel:** Contenu manquant sur mobile, utilisateurs mobiles ont moins d'informations

---

### 10. **Offer Cards - Scroll horizontal sur mobile**
**Localisation:** `.offer-simple-scroll` (ligne ~1200)

**Problèmes identifiés:**
- Sur mobile, les cartes sont dans un conteneur avec `overflow-x: scroll`
- Chaque carte a `min-width: 260px` et `flex-shrink: 0`
- Les gradients `::before` et `::after` indiquent qu'il y a plus de contenu, mais c'est subtil
- Sur desktop, le layout passe en grid 4 colonnes, ce qui est bien

**Impact visuel:** Utilisateurs mobiles peuvent ne pas réaliser qu'il faut scroller horizontalement

---

### 11. **WhatsApp Float - Timing de la bulle**
**Localisation:** `WaFloat` component (ligne ~2350)

**Problèmes identifiés:**
- La bulle apparaît après 30 secondes (`setTimeout 30000`)
- Elle affiche un message "typing" pendant 2 secondes
- Puis le message réel pendant 15 secondes
- Total: 47 secondes avant de disparaître
- Si l'utilisateur scroll rapidement, il peut manquer la bulle
- Le bouton de fermeture `×` est petit (18x18px) et peut être difficile à cliquer

**Impact visuel:** Bulle intrusive qui peut apparaître au mauvais moment

---

### 12. **Call Modal - Overlay click**
**Localisation:** `CallModal` component (ligne ~2450)

**Problèmes identifiés:**
- Le modal s'ouvre avec `document.getElementById('call-modal').classList.add('active')`
- Il se ferme en cliquant sur l'overlay OU le bouton close
- Mais l'overlay a `onClick={closeModal}` et le modal intérieur a `onClick={(e) => e.stopPropagation()}`
- Sur mobile, un clic accidentel à côté du modal le ferme immédiatement

**Impact visuel:** Modal qui se ferme trop facilement, frustrant pour l'utilisateur

---

## 🔵 PROBLÈMES MINEURS

### 13. **Preloader - Logo manquant**
**Localisation:** Preloader (ligne ~2550)

**Problèmes identifiés:**
- Le preloader charge une image `/logo-kapta-btp.png`
- Si cette image n'existe pas, le preloader affichera une image cassée
- Pas de fallback ou de vérification

**Impact visuel:** Image cassée pendant le chargement

---

### 14. **Footer - Liens sans destination**
**Localisation:** `Footer` component (ligne ~2300)

**Problèmes identifiés:**
- Les liens "Mentions légales", "Confidentialité", "Nos offres" pointent vers `#`
- Cela ne mène nulle part et peut frustrer les utilisateurs
- Le lien "Contact" pointe vers `#cta-final`, ce qui est correct

**Impact visuel:** Liens non fonctionnels, mauvaise UX

---

### 15. **Favicon - Duplication potentielle**
**Localisation:** `useEffect` dans KaptaMedia (ligne ~2600)

**Problèmes identifiés:**
- Le code vérifie `if (!existingFavicon)` avant d'ajouter un favicon
- Mais il ajoute aussi un `apple-touch-icon` sans vérifier s'il existe déjà
- Cela peut créer des doublons si la page est rechargée

**Impact visuel:** Pas d'impact visuel direct, mais code non optimal

---

### 16. **Structured Data - Prix incorrect**
**Localisation:** JSON-LD schema (ligne ~2700)

**Problèmes identifiés:**
- Le prix dans le structured data est `"price": "497"`
- Mais dans la page, le prix affiché est `1 250 €` (ligne ~1300 dans Offer)
- Incohérence entre les données structurées et le contenu visible

**Impact visuel:** Pas d'impact visuel, mais problème SEO potentiel

---

### 17. **Scrollbar styling - Peut être masqué**
**Localisation:** CSS global (ligne ~2200)

**Problèmes identifiés:**
- Le scrollbar est stylé avec `::-webkit-scrollbar` (width: 10px)
- Sur Firefox, le style ne s'applique pas (nécessite `scrollbar-width` et `scrollbar-color`)
- Sur mobile, les scrollbars sont souvent masquées par défaut

**Impact visuel:** Scrollbar invisible ou non stylée sur certains navigateurs

---

### 18. **Grain texture animation**
**Localisation:** `#hero::before` (ligne ~650)

**Problèmes identifiés:**
- L'animation `grainMove` translate le background de `0 0` à `64px 64px` en 8 secondes
- Cela crée un effet de grain animé, mais peut être distrayant
- Sur mobile, cela peut consommer de la batterie
- L'opacité est à `.85` et le `mix-blend-mode: soft-light` peut ne pas être supporté partout

**Impact visuel:** Animation subtile mais potentiellement distrayante

---

### 19. **Reveal animations - Peut causer des CLS**
**Localisation:** `.reveal` class (ligne ~2150)

**Problèmes identifiés:**
- Les éléments avec `.reveal` ont `opacity: 0` et `transform: translateY(20px)` par défaut
- Quand ils deviennent visibles, ils passent à `opacity: 1` et `transform: translateY(0)`
- Cela peut causer un Cumulative Layout Shift (CLS) si les éléments prennent de la place avant d'être visibles
- Les délais `.d1`, `.d2`, etc. sont fixes et peuvent ne pas s'adapter au contenu

**Impact visuel:** Éléments qui "sautent" pendant le chargement

---

### 20. **Proof metrics - Grid cassé sur mobile**
**Localisation:** `.proof-metrics` (ligne ~1000)

**Problèmes identifiés:**
- Le grid est `grid-template-columns: repeat(3, 1fr)`
- Sur très petits écrans (<480px), il y a une règle media query qui change en `grid-template-columns: 1fr 1fr`
- La dernière cellule utilise `grid-column: 1/-1` pour prendre toute la largeur
- Mais cela crée un layout asymétrique qui peut sembler cassé

**Impact visuel:** Layout déséquilibré sur très petits écrans

---

## 📊 RÉSUMÉ PAR CATÉGORIE

### Alignement et espacement
- Hero titre aligné à gauche (peut sembler déséquilibré)
- Piliers avec espacement différent mobile/desktop
- Proof metrics avec layout asymétrique sur mobile

### Contenu manquant ou dupliqué
- Photo placeholder dans About (pas de vraie photo)
- Titres dupliqués dans About (mobile vs desktop)
- Texte pilier caché sur mobile

### Contraste et lisibilité
- Google Maps mockup avec contraste insuffisant
- Tableau Diff difficile à lire sur mobile
- Scrollbar non stylée sur Firefox

### Performance et animations
- Images Unsplash non optimisées
- Grain texture animation qui consomme de la batterie
- Reveal animations qui peuvent causer des CLS

### Interactions et UX
- WhatsApp bulle avec timing fixe
- Call modal qui se ferme trop facilement
- Liens footer non fonctionnels
- Offer cards avec scroll horizontal non évident

### Données et SEO
- Prix incohérent entre structured data et contenu
- Favicon potentiellement dupliqué

---

## 🎯 RECOMMANDATIONS PRIORITAIRES

### Priorité 1 (À corriger immédiatement)
1. Ajouter une vraie photo dans la section About
2. Corriger le contraste du Google Maps mockup
3. Fixer le prix dans le structured data (497€ → 1250€)
4. Rendre les liens footer fonctionnels ou les masquer

### Priorité 2 (À corriger rapidement)
5. Optimiser les images Unsplash (WebP, tailles adaptées)
6. Améliorer le tableau Diff sur mobile (peut-être passer en liste)
7. Rendre le scroll horizontal des offer cards plus évident
8. Afficher le texte des piliers sur mobile (ou un résumé)

### Priorité 3 (Améliorations)
9. Ajuster le timing de la bulle WhatsApp (ou la rendre optionnelle)
10. Améliorer la fermeture du call modal (confirmation avant fermeture)
11. Centrer le titre hero ou le justifier mieux
12. Ajouter un fallback pour le preloader logo

---

## 📝 NOTES TECHNIQUES

- Le fichier fait 2696 lignes, dont ~1800 lignes de CSS inline
- Utilisation intensive de CSS custom properties (variables)
- Animations et transitions nombreuses (peut impacter les performances)
- Pas de lazy loading pour les images du hero (correct)
- Structured data présent (bon pour SEO)
- Meta tags Open Graph et Twitter Card présents

---

**Date du rapport:** 27 février 2026  
**Analysé par:** Kiro AI  
**Fichier source:** `frontend/src/pages/BTP.jsx`
