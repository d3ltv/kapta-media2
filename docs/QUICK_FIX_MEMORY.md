# ⚡ Quick Fix - Erreur Mémoire Vercel

## ❌ Erreur
```
Your build failed because it exceeded the amount of memory available.
```

## ✅ Solution Rapide (2 options)

### Option 1 : Build Local + Déploiement (RECOMMANDÉ)

```bash
./deploy-prebuilt.sh
```

**Avantages** :
- ✅ Pas de limite mémoire
- ✅ Build plus rapide
- ✅ Fonctionne toujours

### Option 2 : Réessayer avec Config Optimisée

```bash
vercel --prod
```

**Changements appliqués** :
- Mémoire réduite : 4096 MB → 2048 MB
- Source maps désactivées
- Fichiers inutiles exclus

## 🎯 Quelle Option Choisir ?

| Situation | Option |
|-----------|--------|
| Première fois | Option 2 (plus simple) |
| Échec Option 2 | Option 1 (toujours fonctionne) |
| Build très lent | Option 1 (plus rapide) |

## 📝 Fichiers Modifiés

- ✅ `vercel.json` - Configuration optimisée
- ✅ `frontend/package.json` - Mémoire réduite
- ✅ `.vercelignore` - Fichiers exclus
- ✅ `deploy-prebuilt.sh` - Script build local

## 🆘 Si Ça Ne Fonctionne Toujours Pas

Voir `FIX_VERCEL_MEMORY_ERROR.md` pour plus de solutions.

---

**TL;DR** : Essayer `vercel --prod`. Si échec, utiliser `./deploy-prebuilt.sh`
