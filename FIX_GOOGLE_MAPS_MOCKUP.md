# 🔧 Fix Google Maps Mockup - Section "La Réalité"

## 🎯 Problème Identifié

La section "01 - La Réalité" avec les mockups Google Maps peut avoir des éléments qui semblent "cassés" visuellement.

## ✅ Vérifications

Le code est correct et complet. Les problèmes potentiels peuvent être :

1. **Cache du navigateur** - Les anciens styles sont en cache
2. **Build non à jour** - Le build ne reflète pas les derniers changements
3. **CSS manquant** - Les animations ne sont pas chargées

## 🔧 Solution Rapide

### Étape 1 : Nettoyer le cache et rebuild

```bash
# Nettoyer le build
cd frontend
rm -rf build node_modules/.cache

# Rebuild
npm run build

cd ..
```

### Étape 2 : Vérifier que les animations CSS sont présentes

Le fichier `frontend/src/App.css` doit contenir :

```css
/* Animation pulse-glow */
.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(28, 63, 249, 0.15);
  }
  50% {
    box-shadow: 0 0 20px rgba(28, 63, 249, 0.3);
  }
}

/* Animation shimmer */
.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

/* Animation twinkle (étoiles) */
.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Animation bounce-slow */
.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
```

### Étape 3 : Redéployer

```bash
vercel --prod
```

### Étape 4 : Tester en navigation privée

1. Ouvrir le site en navigation privée (Cmd+Shift+N)
2. Vérifier que les mockups Google Maps s'affichent correctement
3. Vérifier les animations (shimmer, glow, twinkle)

## 🎨 Ce qui devrait être visible

### Version Mobile
- Slider horizontal avec 2 cartes (AVANT / APRÈS)
- Boutons "AVANT" et "APRÈS" pour naviguer
- Indicateurs de progression (points)
- Animations fluides lors du swipe

### Version Desktop
- 2 cartes côte à côte
- Carte AVANT : Opacité 70%, grise
- Carte APRÈS : Border bleu, effet glow, animations

### Éléments de la carte AVANT
- Header Google avec logo "G"
- Image de couverture grise
- Nom du commerce
- 3.2 étoiles (3 jaunes, 2 grises)
- Adresse
- "Pas de téléphone visible" (gris)
- "Horaires non renseignés" (gris)
- Badge "VOUS AUJOURD'HUI" (rouge, en haut à gauche)
- Badge "Position 15+" (gris, en bas à droite)

### Éléments de la carte APRÈS
- Header Google avec logo "G"
- Image de couverture avec gradient bleu
- Nom du commerce
- 4.9 étoiles (5 jaunes avec animation twinkle)
- Section "Vidéos" avec 2 miniatures
- Adresse (avec icône bleue)
- "Ouvert · Ferme à 19h00" (vert)
- Téléphone "06 86 01 80 54" (avec icône bleue)
- 2 boutons "Appeler" (bleu) et "Itinéraire" (blanc)
- Badge "AVEC KAPTA" (vert, en haut à gauche, animation bounce)
- Badge "Position N°1 ✓" (bleu, en haut à droite)

## 🐛 Problèmes Courants

### Les cartes sont trop petites
**Solution** : Vérifier que `min-h-[500px]` est présent sur mobile et `h-[320px]` sur desktop

### Les badges sont mal positionnés
**Solution** : Vérifier que `absolute` et `z-20` sont présents sur les badges

### Les animations ne fonctionnent pas
**Solution** : Vérifier que `App.css` contient les @keyframes et rebuild

### Le slider mobile ne fonctionne pas
**Solution** : Vérifier que les événements `onTouchStart` et `onTouchEnd` sont présents

## 📸 Capture d'écran de référence

Si vous avez accès au commit 'seo' (2a2ed818), vous pouvez voir la version de référence :

```bash
git show 2a2ed818:frontend/src/App.js | grep -A 300 "// Avant/Après Section"
```

## 🔍 Debug en Live

Pour voir ce qui ne va pas en temps réel :

1. Ouvrir DevTools (F12)
2. Onglet "Elements"
3. Chercher la section avec `data-testid="before-after-section"`
4. Vérifier que :
   - Les classes CSS sont appliquées
   - Les animations sont actives
   - Les éléments ont les bonnes dimensions
   - Les z-index sont corrects

## ✅ Checklist de Vérification

- [ ] `App.css` contient toutes les animations
- [ ] Build est à jour (`npm run build`)
- [ ] Cache navigateur vidé (navigation privée)
- [ ] Les 2 cartes sont visibles (mobile et desktop)
- [ ] Les badges sont bien positionnés
- [ ] Les animations fonctionnent (glow, shimmer, twinkle, bounce)
- [ ] Le slider mobile fonctionne (swipe ou boutons)
- [ ] Les étoiles s'animent (twinkle)
- [ ] Le badge "AVEC KAPTA" bounce

## 🆘 Si ça ne fonctionne toujours pas

1. Vérifier les erreurs console (F12 → Console)
2. Vérifier les erreurs de build
3. Comparer avec le commit 'seo' :
   ```bash
   git diff 2a2ed818 HEAD -- frontend/src/App.js
   ```
4. Restaurer la version du commit 'seo' si nécessaire :
   ```bash
   git checkout 2a2ed818 -- frontend/src/App.js
   git checkout 2a2ed818 -- frontend/src/App.css
   ```

## 📝 Notes

- Le code actuel est identique à la version 'seo'
- Les animations CSS sont présentes
- Le problème est probablement lié au cache ou au build

**Solution la plus probable** : Rebuild + navigation privée
