# 🚀 Guide de Déploiement Vercel - KAPTA Media

> Solution complète pour le déploiement sur Vercel

---

## ❌ Problème: 404 NOT_FOUND

**Symptôme:**
```
404: NOT_FOUND
Code: NOT_FOUND
ID: cdg1::mbmtj-1773238939854-5983ec859db2
```

**Cause:**
Vercel ne trouve pas les fichiers buildés car la configuration est incorrecte.

---

## ✅ Solution Complète

### Étape 1: Vérifier la Structure du Projet

```
kapta-media/
├── frontend/
│   ├── build/          ← Doit contenir index.html après build
│   ├── public/
│   ├── src/
│   └── package.json
├── vercel.json         ← Configuration Vercel
└── .vercel/
    └── project.json
```

---

### Étape 2: Configuration Vercel Correcte

**Fichier: `vercel.json` (à la racine)**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      },
      "dest": "/static/$1"
    },
    {
      "src": "/(.*\\.(js|css|webp|jpg|png|svg|ico|woff2))",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      },
      "dest": "/$1"
    },
    {
      "src": "/(.*)",
      "headers": {
        "Strict-Transport-Security": "max-age=31536000",
        "X-Frame-Options": "SAMEORIGIN",
        "X-Content-Type-Options": "nosniff"
      },
      "dest": "/index.html"
    }
  ]
}
```

---

### Étape 3: Script vercel-build

**Fichier: `frontend/package.json`**

Ajouter dans `"scripts"`:
```json
{
  "scripts": {
    "vercel-build": "NODE_OPTIONS='--max_old_space_size=2048' CI=false GENERATE_SOURCEMAP=false craco build"
  }
}
```

---

### Étape 4: Tester Localement

```bash
# 1. Nettoyer
rm -rf frontend/build
rm -rf frontend/node_modules

# 2. Installer
cd frontend
yarn install

# 3. Builder
yarn build

# 4. Vérifier que build/index.html existe
ls -la build/index.html
```

**Résultat attendu:**
```
-rw-r--r-- 1 user staff 262123 Mar 11 14:42 build/index.html
```

---

### Étape 5: Déployer sur Vercel

#### Option A: Via CLI (Recommandé)

```bash
# 1. Installer Vercel CLI si nécessaire
npm i -g vercel

# 2. Login
vercel login

# 3. Déployer en preview
vercel

# 4. Déployer en production
vercel --prod
```

#### Option B: Via Dashboard Vercel

1. Aller sur https://vercel.com/dashboard
2. Importer le projet depuis Git
3. Configurer:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** `cd frontend && yarn build`
   - **Output Directory:** `frontend/build`
   - **Install Command:** `cd frontend && yarn install`

4. Cliquer "Deploy"

---

## 🔍 Vérifications Post-Déploiement

### 1. Vérifier que le Site Charge

```bash
curl -I https://votre-site.vercel.app
```

**Résultat attendu:**
```
HTTP/2 200
content-type: text/html
```

### 2. Vérifier les Headers de Sécurité

```bash
curl -I https://votre-site.vercel.app | grep -i "strict-transport"
```

**Résultat attendu:**
```
strict-transport-security: max-age=31536000
```

### 3. Vérifier les Routes React

Tester plusieurs URLs:
- https://votre-site.vercel.app/
- https://votre-site.vercel.app/blog
- https://votre-site.vercel.app/btp

Toutes doivent retourner 200 (pas 404).

---

## 🐛 Dépannage

### Problème 1: Build échoue sur Vercel

**Logs à vérifier:**
```bash
vercel logs [deployment-url]
```

**Solutions:**
1. Vérifier que `yarn build` fonctionne localement
2. Vérifier les dépendances dans `package.json`
3. Augmenter la mémoire: `NODE_OPTIONS='--max_old_space_size=4096'`

---

### Problème 2: 404 sur toutes les pages

**Cause:** Routes mal configurées

**Solution:**
Vérifier que `vercel.json` contient:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

### Problème 3: Assets (CSS/JS) ne chargent pas

**Cause:** Mauvais chemin vers les assets

**Solution:**
1. Vérifier que `homepage` dans `package.json` est correct:
   ```json
   {
     "homepage": "."
   }
   ```

2. Ou supprimer complètement `homepage`

---

### Problème 4: Build réussit mais site vide

**Cause:** `outputDirectory` incorrect

**Solution:**
Dans `.vercel/project.json`:
```json
{
  "outputDirectory": "frontend/build"
}
```

---

## 📊 Configuration Recommandée

### Variables d'Environnement Vercel

Dans le dashboard Vercel, ajouter:

| Variable | Valeur |
|---|---|
| `NODE_ENV` | `production` |
| `CI` | `false` |
| `GENERATE_SOURCEMAP` | `false` |

---

### Domaine Personnalisé

1. Aller dans Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions

---

## ✅ Checklist Finale

### Avant de Déployer
- [ ] `yarn build` fonctionne localement
- [ ] `frontend/build/index.html` existe
- [ ] `vercel.json` à la racine
- [ ] Script `vercel-build` dans `package.json`
- [ ] Pas d'erreurs dans la console

### Après Déploiement
- [ ] Site accessible (pas de 404)
- [ ] Routes React fonctionnent
- [ ] Assets chargent correctement
- [ ] Headers de sécurité présents
- [ ] Performance OK (PageSpeed)

---

## 🎯 Commandes Rapides

```bash
# Build local
cd frontend && yarn build

# Déployer preview
vercel

# Déployer production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel ls

# Supprimer un déploiement
vercel rm [deployment-url]
```

---

## 📚 Ressources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Create React App on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

*Guide créé le 11 mars 2026*
*Testé et validé*
