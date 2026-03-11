# ⚙️ Configuration Vercel Dashboard

> Configuration exacte à utiliser dans le dashboard Vercel

---

## 🎯 Paramètres du Projet

### General Settings

| Paramètre | Valeur |
|---|---|
| **Framework Preset** | Other |
| **Root Directory** | `./` (racine) |
| **Node.js Version** | 18.x (ou 20.x) |

---

### Build & Development Settings

| Paramètre | Valeur |
|---|---|
| **Build Command** | `cd frontend && yarn build` |
| **Output Directory** | `frontend/build` |
| **Install Command** | `cd frontend && yarn install` |
| **Development Command** | `cd frontend && yarn start` |

---

### Environment Variables

Ajouter ces variables dans Settings > Environment Variables:

| Name | Value | Environment |
|---|---|---|
| `NODE_ENV` | `production` | Production |
| `CI` | `false` | Production |
| `GENERATE_SOURCEMAP` | `false` | Production |
| `NODE_OPTIONS` | `--max_old_space_size=2048` | Production |

---

## 🚀 Étapes de Configuration

### 1. Créer un Nouveau Projet

1. Aller sur https://vercel.com/new
2. Importer depuis Git (GitHub/GitLab/Bitbucket)
3. Sélectionner le repository `kapta-media`

### 2. Configurer le Build

Dans "Configure Project":

```
Framework Preset: Other
Root Directory: ./
Build Command: cd frontend && yarn build
Output Directory: frontend/build
Install Command: cd frontend && yarn install
```

### 3. Ajouter les Variables d'Environnement

Cliquer sur "Environment Variables" et ajouter:
- `NODE_ENV` = `production`
- `CI` = `false`
- `GENERATE_SOURCEMAP` = `false`

### 4. Déployer

Cliquer sur "Deploy" et attendre ~2-3 minutes.

---

## ✅ Vérification

Une fois déployé, vérifier:

1. **URL de déploiement** (ex: `kapta-media.vercel.app`)
2. **Status:** Ready ✅
3. **Build Logs:** Pas d'erreurs
4. **Site accessible:** Ouvrir l'URL

---

## 🔧 Si le Déploiement Échoue

### Vérifier les Logs

1. Aller dans le déploiement
2. Cliquer sur "View Function Logs"
3. Chercher les erreurs en rouge

### Erreurs Communes

**Erreur: "Command failed"**
- Vérifier que `yarn build` fonctionne localement
- Vérifier les dépendances dans `package.json`

**Erreur: "Output directory not found"**
- Vérifier que `Output Directory` = `frontend/build`
- Vérifier que le build crée bien `frontend/build/index.html`

**Erreur: "Out of memory"**
- Augmenter `NODE_OPTIONS` à `--max_old_space_size=4096`

---

## 🎯 Configuration Finale

Après le premier déploiement réussi, aller dans:

**Settings > General**
- Vérifier que tout est correct

**Settings > Domains**
- Ajouter votre domaine personnalisé si nécessaire

**Settings > Environment Variables**
- Vérifier que toutes les variables sont présentes

---

*Configuration testée et validée*
