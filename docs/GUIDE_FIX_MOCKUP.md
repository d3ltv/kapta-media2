# 🔧 Guide Rapide - Fix Google Maps Mockup

## 🎯 Problème

Les éléments de la section "01 - La Réalité" (mockups Google Maps) semblent cassés.

## ✅ Solution Rapide (3 étapes)

### 1. Tester le mockup isolé

Ouvrez `test-mockup.html` dans votre navigateur pour voir si le mockup fonctionne correctement en isolation.

```bash
open test-mockup.html
# ou
firefox test-mockup.html
# ou
chrome test-mockup.html
```

Si ça fonctionne ici, le problème vient du build ou du cache.

### 2. Nettoyer et rebuild

```bash
cd frontend
rm -rf build node_modules/.cache
npm run build
cd ..
```

### 3. Redéployer

```bash
vercel --prod
```

Puis tester en navigation privée (Cmd+Shift+N).

## 🎨 Ce qui devrait être visible

### Carte AVANT (gauche)
- Opacité 70% (grisée)
- Logo Google "G" bleu
- Image de couverture grise
- "Votre Commerce"
- 3.2 étoiles (3 jaunes, 2 grises)
- Adresse
- "Pas de téléphone visible" (gris)
- "Horaires non renseignés" (gris)
- Badge rouge "VOUS AUJOURD'HUI" (haut gauche)
- Badge gris "Position 15+" (bas droite)

### Carte APRÈS (droite)
- Border bleu 2px
- Effet glow bleu (animation pulse)
- Effet shimmer (animation brillance)
- Logo Google "G" bleu
- Image de couverture avec gradient bleu
- "Votre Commerce"
- 4.9 étoiles (5 jaunes avec animation twinkle)
- Section "Vidéos" avec 2 miniatures
- Adresse (icône bleue)
- "Ouvert · Ferme à 19h00" (vert)
- Téléphone "06 86 01 80 54" (icône bleue)
- 2 boutons "Appeler" (bleu) et "Itinéraire" (blanc)
- Badge vert "AVEC KAPTA" (haut gauche, animation bounce)
- Badge bleu "Position N°1 ✓" (haut droite)

## 🐛 Si ça ne fonctionne toujours pas

### Option 1 : Vérifier les animations CSS

```bash
grep -A 5 "animate-pulse-glow\|animate-shimmer\|animate-twinkle\|animate-bounce-slow" frontend/src/App.css
```

Devrait afficher les 4 animations.

### Option 2 : Comparer avec la version 'seo'

```bash
git diff 2a2ed818 HEAD -- frontend/src/App.js | grep -C 10 "BeforeAfter"
```

Si des différences apparaissent, restaurer :

```bash
git checkout 2a2ed818 -- frontend/src/App.js
```

### Option 3 : Vérifier en DevTools

1. F12 → Elements
2. Chercher `data-testid="before-after-section"`
3. Vérifier que les classes CSS sont appliquées
4. Vérifier que les animations sont actives

## 📸 Capture d'écran de référence

Le fichier `test-mockup.html` montre exactement comment ça devrait être.

## ✅ Checklist

- [ ] `test-mockup.html` fonctionne correctement
- [ ] Build nettoyé et refait
- [ ] Redéployé sur Vercel
- [ ] Testé en navigation privée
- [ ] Les 2 cartes sont visibles
- [ ] Les animations fonctionnent
- [ ] Les badges sont bien positionnés

## 🆘 Besoin d'aide ?

Voir `FIX_GOOGLE_MAPS_MOCKUP.md` pour plus de détails.

---

**TL;DR** : Ouvrir `test-mockup.html` → Si OK, rebuild + redéployer → Tester en navigation privée
