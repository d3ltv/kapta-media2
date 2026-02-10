# 🚀 Instructions de Déploiement Vercel

## ✅ Problème Résolu

Le problème de déploiement était causé par une **configuration obsolète de vercel.json**.

### Changements Effectués:

1. **vercel.json simplifié** - Suppression des champs obsolètes
2. **.vercel/project.json créé** - Configuration moderne de Vercel
3. **build.sh ajouté** - Script de build simplifié

---

## 🔧 Configuration Vercel Dashboard

### Étape 1: Settings > General

```
Framework Preset: Other
Root Directory: ./
Node.js Version: 18.x (ou 20.x)
```

### Étape 2: Settings > Build & Development

```
Build Command: ./build.sh
Output Directory: frontend/build
Install Command: cd frontend && yarn install
```

### Étape 3: Settings > Environment Variables

Ajouter ces variables pour **Production**, **Preview**, et **Development**:

```
NODE_OPTIONS=--max_old_space_size=4096
GENERATE_SOURCEMAP=false
CI=false
DISABLE_ESLINT_PLUGIN=true
```

---

## 🎯 Déploiement Automatique

Une fois configuré, chaque push sur `main` déclenchera automatiquement:

1. ✅ Installation des dépendances
2. ✅ Build de l'application
3. ✅ Déploiement sur Vercel
4. ✅ Mise en ligne

---

## 🧪 Test Local

Pour tester le build localement:

```bash
# Option 1: Script automatique
./build.sh

# Option 2: Commandes manuelles
cd frontend
yarn install
yarn build
```

---

## 🔍 Vérifications Post-Déploiement

Après le déploiement, vérifier:

- [ ] Le site est accessible
- [ ] Les routes fonctionnent (pas de 404)
- [ ] Les images se chargent
- [ ] Le sitemap.xml est accessible
- [ ] Le robots.txt est accessible
- [ ] Google Analytics fonctionne
- [ ] Les redirections fonctionnent

---

## 🚨 Troubleshooting

### Build échoue sur Vercel

1. Vérifier les logs Vercel
2. Tester `./build.sh` localement
3. Vérifier que yarn.lock est à jour

### Site ne se charge pas

1. Vérifier que `outputDirectory` est `frontend/build`
2. Vérifier que `_redirects` est présent dans le build
3. Vérifier les routes dans vercel.json

### Erreur de permissions

Suivre les instructions dans `SOLUTION_VERCEL_PERMISSIONS.md`

---

## 📞 Support

Si le problème persiste:

1. Partager les logs Vercel complets
2. Vérifier `git status` et `git log`
3. Tester le build local avec `./build.sh`

---

**Date:** 10 Février 2025  
**Status:** ✅ Prêt pour le déploiement
