# 🧪 Test du Loader Optimisé

> Guide pour vérifier que le loader fonctionne correctement

---

## ✅ Ce Qui Doit Se Passer

### Séquence Normale

1. **0-100ms:** Loader HTML apparaît immédiatement
   - Logo KAPTA visible
   - 3 points animés
   - Texte "Chargement..."

2. **100-400ms:** React se charge en arrière-plan
   - Loader reste visible
   - Animation des points continue

3. **400ms:** React est prêt
   - Loader commence à disparaître (fade out)
   - Transition fluide de 250ms

4. **650ms:** Site complètement visible
   - Loader supprimé du DOM
   - Contenu interactif

---

## 🔍 Tests à Effectuer

### Test 1: Chargement Normal

```bash
# 1. Démarrer le serveur
cd frontend
yarn start

# 2. Ouvrir http://localhost:3000
# 3. Observer le loader
```

**Vérifications:**
- [ ] Loader apparaît immédiatement
- [ ] Animation des 3 points fluide
- [ ] Disparaît en <500ms
- [ ] Pas de flash blanc
- [ ] Transition fluide

---

### Test 2: Connexion Lente (Throttling)

```bash
# 1. Ouvrir Chrome DevTools (F12)
# 2. Onglet Network
# 3. Throttling: "Slow 3G"
# 4. Rafraîchir la page (Cmd+R)
```

**Vérifications:**
- [ ] Loader visible plus longtemps
- [ ] Animation continue sans saccade
- [ ] Disparaît dès que React est prêt
- [ ] Pas de double loader

---

### Test 3: Dark Mode

```bash
# 1. Activer le dark mode du système
# 2. Rafraîchir la page
```

**Vérifications:**
- [ ] Loader a fond noir (#050505)
- [ ] Texte visible (couleur claire)
- [ ] Points bleus visibles
- [ ] Transition fluide

---

### Test 4: Reduced Motion

```bash
# 1. Activer "Reduce motion" dans les préférences système
# 2. Rafraîchir la page
```

**Vérifications:**
- [ ] Loader apparaît sans animation
- [ ] Points statiques (pas de bounce)
- [ ] Disparaît rapidement
- [ ] Pas de transition longue

---

### Test 5: Cache Désactivé

```bash
# 1. Chrome DevTools (F12)
# 2. Network tab
# 3. Cocher "Disable cache"
# 4. Rafraîchir (Cmd+Shift+R)
```

**Vérifications:**
- [ ] Loader apparaît immédiatement
- [ ] Reste visible pendant le chargement
- [ ] Disparaît dès que prêt
- [ ] Pas d'erreur console

---

## ❌ Problèmes Possibles

### Problème 1: Loader ne disparaît pas

**Symptôme:** Loader reste visible indéfiniment

**Causes possibles:**
- Erreur JavaScript bloque React
- `hideLoader()` non appelé
- Transition CSS cassée

**Solution:**
```bash
# Vérifier la console pour erreurs
# Ouvrir DevTools > Console
# Chercher erreurs en rouge
```

---

### Problème 2: Flash blanc

**Symptôme:** Écran blanc avant le loader

**Causes possibles:**
- Critical CSS non inline
- Loader CSS non chargé
- `#app-loader` mal positionné

**Solution:**
Vérifier que le CSS du loader est bien inline dans `<head>` de `index.html`

---

### Problème 3: Double loader

**Symptôme:** Deux loaders successifs

**Causes possibles:**
- LoadingScreen React encore présent
- État `isLoading` encore dans App.js

**Solution:**
```bash
# Vérifier que LoadingScreen est supprimé
ls frontend/src/components/LoadingScreen.jsx
# Doit retourner: No such file or directory
```

---

### Problème 4: Animation saccadée

**Symptôme:** Points qui sautent

**Causes possibles:**
- CPU surchargé
- Animation non GPU
- Trop d'animations simultanées

**Solution:**
Vérifier que l'animation utilise `transform` dans le CSS

---

## 📊 Métriques à Vérifier

### Chrome DevTools Performance

```bash
# 1. Ouvrir DevTools (F12)
# 2. Onglet Performance
# 3. Cliquer Record
# 4. Rafraîchir la page
# 5. Arrêter l'enregistrement
```

**Vérifier:**
- [ ] FCP < 1,5s
- [ ] LCP < 2,5s
- [ ] Pas de long tasks pendant le loader
- [ ] Transition fluide (60fps)

---

### Lighthouse Audit

```bash
# 1. Ouvrir DevTools (F12)
# 2. Onglet Lighthouse
# 3. Mode: Mobile
# 4. Catégories: Performance
# 5. Lancer l'audit
```

**Vérifier:**
- [ ] Performance: 80+/100
- [ ] FCP: Vert
- [ ] LCP: Vert
- [ ] TBT: Vert

---

## ✅ Checklist Finale

### Visuel
- [ ] Logo KAPTA visible
- [ ] 3 points animés
- [ ] Texte "Chargement..." lisible
- [ ] Fond blanc (light) / noir (dark)

### Comportement
- [ ] Apparaît immédiatement
- [ ] Disparaît en <500ms
- [ ] Transition fluide
- [ ] Pas de flash

### Performance
- [ ] FCP < 1,5s
- [ ] Pas de long tasks
- [ ] Animation 60fps
- [ ] Pas de layout shift

### Accessibilité
- [ ] Dark mode fonctionne
- [ ] Reduced motion respecté
- [ ] Contraste suffisant
- [ ] Pas de clignotement

---

## 🎯 Résultat Attendu

**Expérience idéale:**
1. Page s'ouvre → Loader visible instantanément
2. 200-400ms → Animation des points
3. React prêt → Fade out fluide
4. Site visible → Navigation possible

**Temps total:** <650ms du clic à l'interaction

---

## 📝 Notes

### Comparaison Avant/Après

**Avant (avec LoadingScreen React):**
- Loader visible: 1200ms minimum
- Double chargement visible
- Délai artificiel frustrant

**Après (loader HTML uniquement):**
- Loader visible: 200-400ms
- Un seul loader simple
- Disparaît dès que prêt

**Amélioration:** -800ms perçus

---

*Guide de test créé le 11 mars 2026*
