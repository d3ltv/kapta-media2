# ⚙️ Configuration Vercel Dashboard - SOLUTION DÉFINITIVE

> Configuration manuelle dans le dashboard Vercel

---

## 🎯 Le Problème

Vercel ne trouve pas les fichiers car il cherche au mauvais endroit.

---

## ✅ Solution: Configuration Manuelle

### Étape 1: Aller dans le Dashboard

1. Ouvrir https://vercel.com/dashboard
2. Sélectionner votre projet `kapta-media`
3. Cliquer sur **Settings**

---

### Étape 2: Configurer Build & Development

Dans **Settings > General > Build & Development Settings**

Cliquer sur **Override** et configurer:

```
Framework Preset: Other

Root Directory: ./

Build Command: cd frontend && yarn build

Output Directory: frontend/build

Install Command: cd frontend && yarn install --frozen-lockfile

Development Command: cd frontend && yarn start
```

**IMPORTANT:** Bien mettre `frontend/build` et pas juste `build`

---

### Étape 3: Sauvegarder

1. Cliquer sur **Save**
2. Aller dans **Deployments**
3. Cliquer sur les 3 points du dernier déploiement
4. Cliquer sur **Redeploy**

---

### Étape 4: Vérifier

Une fois le déploiement terminé:

1. Cliquer sur **Visit**
2. Le site devrait s'afficher ✅
3. Tester les routes: `/`, `/blog`, `/btp`

---

## 📸 Captures d'Écran de la Config

### Build Command
```
cd frontend && yarn build
```

### Output Directory
```
frontend/build
```
☝️ **C'est le plus important !**

### Install Command
```
cd frontend && yarn install --frozen-lockfile
```

---

## 🔍 Vérification

Après redéploiement, vérifier dans les logs:

```
✓ Build completed
✓ Uploading build outputs
✓ Deployment ready
```

Et dans les fichiers déployés, vous devriez voir:
```
/index.html
/static/js/...
/static/css/...
```

---

## ⚠️ Si Ça Ne Marche Toujours Pas

### Option 1: Supprimer et Réimporter

1. **Settings > General > Delete Project**
2. Confirmer la suppression
3. **Dashboard > New Project**
4. Importer depuis Git
5. Configurer comme ci-dessus

### Option 2: Vérifier les Logs

1. Aller dans **Deployments**
2. Cliquer sur le déploiement
3. Cliquer sur **View Function Logs**
4. Chercher les erreurs

---

## 💡 Astuce

Si vous voyez dans les logs:
```
Error: Could not find a production build in the '/vercel/path0/build' directory
```

C'est que `Output Directory` est mal configuré.
Il doit être: `frontend/build` (avec le préfixe `frontend/`)

---

*Configuration testée et validée*
