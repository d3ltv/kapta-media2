# 🔄 Alternative: Déployer sur Netlify

> Si Vercel continue à poser problème

---

## 🎯 Pourquoi Netlify ?

- Configuration plus simple
- Meilleure gestion des monorepos
- Déploiement plus fiable

---

## 🚀 Déploiement Netlify

### Étape 1: Créer un Compte

1. Aller sur https://netlify.com
2. Sign up (gratuit)
3. Connecter votre compte Git

### Étape 2: Nouveau Site

1. Cliquer **Add new site** > **Import an existing project**
2. Choisir **GitHub** (ou votre provider)
3. Sélectionner le repo `kapta-media`

### Étape 3: Configuration Build

```
Base directory: frontend

Build command: yarn build

Publish directory: frontend/build

Node version: 18
```

### Étape 4: Variables d'Environnement

Ajouter dans **Site settings** > **Environment variables**:

```
NODE_ENV=production
CI=false
GENERATE_SOURCEMAP=false
NODE_OPTIONS=--max_old_space_size=2048
```

### Étape 5: Deploy

Cliquer **Deploy site**

---

## 📁 Fichier netlify.toml

Créer à la racine:

```toml
[build]
  base = "frontend"
  command = "yarn build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
  NODE_ENV = "production"
  CI = "false"
  GENERATE_SOURCEMAP = "false"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## ✅ Avantages Netlify

- ✅ Configuration plus simple
- ✅ Meilleure gestion des redirects
- ✅ Deploy previews automatiques
- ✅ Rollback facile
- ✅ Analytics intégrés

---

## 🔄 Migration Vercel → Netlify

1. Créer le fichier `netlify.toml`
2. Push sur Git
3. Importer sur Netlify
4. Configurer le domaine
5. Supprimer le projet Vercel

---

*Alternative recommandée si Vercel pose problème*
