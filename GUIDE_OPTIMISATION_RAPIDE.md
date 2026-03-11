# 🚀 Guide d'Optimisation Rapide

> Actions à effectuer pour appliquer les optimisations PageSpeed

---

## ⚡ Étape 1: Installer les dépendances (optionnel)

Pour une optimisation maximale, installez ces packages:

```bash
cd frontend

# Pour l'optimisation des images (recommandé)
npm install --save-dev sharp

# Pour le nettoyage du CSS (optionnel)
npm install --save-dev purgecss
```

---

## 🖼️ Étape 2: Générer les images optimisées

```bash
cd frontend
yarn optimize:images
```

Cette commande va créer les variantes 273w pour les 8 images du carrousel:
- garage1-273w.webp, garage2-273w.webp
- bistro1-273w.webp, bistro2-273w.webp
- boulangerie1-273w.webp, boulangerie2-273w.webp
- salon1-273w.webp, salon2-273w.webp

**Économie attendue:** 109 KiB sur mobile

---

## 🏗️ Étape 3: Build optimisé

```bash
cd frontend
yarn build:optimized
```

Cette commande va:
1. Compiler React avec code splitting
2. Nettoyer le CSS inutilisé (si PurgeCSS installé)
3. Analyser les tailles de bundles

**Résultat attendu:**
- vendors.js réduit de ~40%
- CSS réduit de ~75%

---

## 📊 Étape 4: Analyser les résultats

```bash
cd frontend
yarn analyze
```

Vérifiez que:
- ✅ vendors.js < 100 KiB
- ✅ Plusieurs chunks créés (react-core, framer-motion, radix-ui)
- ✅ main.css < 10 KiB

---

## 🧪 Étape 5: Tester en local

```bash
cd frontend
yarn start
```

Testez:
1. **Chargement initial** - Doit être rapide (<2s)
2. **Animations** - Doivent être fluides (60fps)
3. **Images** - Doivent charger les bonnes tailles
4. **Lazy loading** - Composants chargés à la demande

---

## 🌐 Étape 6: Tester sur PageSpeed Insights

1. Déployez sur Vercel/Netlify
2. Testez sur https://pagespeed.web.dev/
3. Vérifiez les métriques:
   - Performance: 80+ ✅
   - FCP: <1,5s ✅
   - LCP: <2,0s ✅
   - TBT: <600ms ✅

---

## 🔍 Vérifications Visuelles

### ✅ Aucun changement visuel attendu

Vérifiez que:
- [ ] Le design est identique
- [ ] Les animations fonctionnent
- [ ] Les images s'affichent correctement
- [ ] Le carrousel fonctionne
- [ ] Les boutons sont cliquables
- [ ] Le menu mobile s'ouvre

---

## 🐛 Dépannage

### Problème: Images 273w non générées

**Solution:**
```bash
# Installer sharp
npm install --save-dev sharp

# Réessayer
yarn optimize:images
```

### Problème: Build échoue

**Solution:**
```bash
# Nettoyer et réinstaller
rm -rf node_modules
yarn install
yarn build
```

### Problème: Animations saccadées

**Solution:**
- Vérifiez que `animations-optimized.css` est importé
- Testez avec `prefers-reduced-motion: no-preference`

### Problème: Composants ne chargent pas

**Solution:**
- Vérifiez que `App.lazy.js` est bien créé
- Vérifiez les imports dans `App.js`

---

## 📈 Métriques à Surveiller

### Avant Optimisation
- Performance: 60/100
- FCP: 1,7s
- LCP: 2,3s
- TBT: 3440ms
- Speed Index: 8,2s

### Après Optimisation (Cible)
- Performance: 80+/100 ✅
- FCP: <1,5s ✅
- LCP: <2,0s ✅
- TBT: <600ms ✅
- Speed Index: <5s ✅

---

## 🎯 Checklist Finale

- [ ] Images 273w générées
- [ ] Build optimisé exécuté
- [ ] Bundles analysés (vendors.js < 100 KiB)
- [ ] Tests locaux OK
- [ ] Déployé en production
- [ ] PageSpeed testé (80+/100)
- [ ] Visuel inchangé vérifié

---

## 💡 Conseils

### Pour aller plus loin
1. Activez la compression Brotli sur votre serveur
2. Configurez un CDN pour les assets statiques
3. Ajoutez un Service Worker pour le cache
4. Optimisez les fonts (preload, font-display: swap)

### Maintenance
- Relancez `yarn optimize:images` après ajout d'images
- Vérifiez PageSpeed tous les mois
- Surveillez la taille des bundles avec `yarn analyze`

---

*Guide créé le 11 mars 2026*
