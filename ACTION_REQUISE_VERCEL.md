# ⚡ ACTION REQUISE - Configuration Vercel Dashboard

**Status:** 🟡 En attente de configuration manuelle  
**Temps estimé:** 5 minutes

---

## ✅ Ce qui a été fait

1. ✅ Problème identifié (configuration obsolète)
2. ✅ `vercel.json` corrigé
3. ✅ `.vercel/project.json` créé
4. ✅ Script `build.sh` ajouté
5. ✅ Build testé localement (fonctionne ✅)
6. ✅ Changements poussés sur GitHub

---

## 🎯 Ce qu'il reste à faire (VOUS)

### Étape 1: Aller sur Vercel Dashboard

👉 https://vercel.com/dashboard

### Étape 2: Sélectionner votre projet

Cliquer sur le projet **kapta-media2** (ou le nom de votre projet)

### Étape 3: Configurer Build & Development

1. Aller dans **Settings** (en haut)
2. Cliquer sur **Build & Development** (menu gauche)
3. Configurer:

```
Framework Preset: Other
Root Directory: ./
Node.js Version: 18.x (ou 20.x)

Build Command: ./build.sh
Output Directory: frontend/build
Install Command: cd frontend && yarn install
```

4. Cliquer sur **Save**

### Étape 4: Ajouter les Variables d'Environnement

1. Toujours dans **Settings**
2. Cliquer sur **Environment Variables** (menu gauche)
3. Ajouter ces 4 variables pour **Production**, **Preview**, ET **Development**:

| Name | Value |
|------|-------|
| `NODE_OPTIONS` | `--max_old_space_size=4096` |
| `GENERATE_SOURCEMAP` | `false` |
| `CI` | `false` |
| `DISABLE_ESLINT_PLUGIN` | `true` |

**Comment ajouter:**
- Cliquer sur "Add New"
- Entrer le Name et Value
- Cocher les 3 environnements (Production, Preview, Development)
- Cliquer sur "Save"
- Répéter pour les 4 variables

### Étape 5: Redéployer

1. Aller dans **Deployments** (en haut)
2. Trouver le dernier déploiement (commit `c756fac0`)
3. Cliquer sur les 3 points `...` à droite
4. Cliquer sur **Redeploy**
5. Confirmer

---

## 🎉 Résultat Attendu

Après ces étapes:

1. ⏳ Le build démarre automatiquement
2. ⏳ Installation des dépendances (~30s)
3. ⏳ Build de l'application (~2-3 min)
4. ✅ Déploiement réussi
5. ✅ Site en ligne sur votre URL Vercel

---

## 🔍 Vérifier que ça fonctionne

Une fois déployé, vérifier:

- [ ] Le site s'affiche correctement
- [ ] Les routes fonctionnent (pas de 404)
- [ ] Les images se chargent
- [ ] https://votre-site.vercel.app/sitemap.xml est accessible
- [ ] https://votre-site.vercel.app/robots.txt est accessible

---

## 🚨 Si ça ne fonctionne pas

### Le build échoue sur Vercel

1. **Lire les logs** (Deployments > Cliquer sur le déploiement > Logs)
2. **Copier l'erreur exacte**
3. **Me la partager** pour que je puisse aider

### Le déploiement ne démarre pas

1. **Vérifier la connexion Git:**
   - Settings > Git
   - Vérifier que le repo est bien connecté
   - Vérifier que la branche est `main`

2. **Forcer un redéploiement:**
   - Deployments > Dernier déploiement > Redeploy

### Erreur de permissions

Si vous voyez une erreur comme:
```
Git author MatSouesme must have access to the project
```

**Solution:**
1. Settings > Members
2. Inviter MatSouesme (ou l'auteur Git mentionné)
3. Accepter l'invitation
4. Redéployer

---

## 📊 Checklist Complète

- [ ] Aller sur Vercel Dashboard
- [ ] Sélectionner le projet
- [ ] Configurer Build & Development
  - [ ] Build Command: `./build.sh`
  - [ ] Output Directory: `frontend/build`
  - [ ] Install Command: `cd frontend && yarn install`
- [ ] Ajouter les 4 variables d'environnement
  - [ ] NODE_OPTIONS
  - [ ] GENERATE_SOURCEMAP
  - [ ] CI
  - [ ] DISABLE_ESLINT_PLUGIN
- [ ] Redéployer
- [ ] Vérifier que le site fonctionne

---

## 💡 Pourquoi ces étapes sont nécessaires

Vercel a changé sa façon de gérer la configuration:

- **Avant:** Tout dans `vercel.json`
- **Maintenant:** Configuration dans le Dashboard + `vercel.json` simplifié

C'est pourquoi il faut configurer manuellement le Dashboard une fois.

**Après cette configuration initiale:**
- ✅ Tous les futurs déploiements seront automatiques
- ✅ Chaque push sur `main` déclenchera un déploiement
- ✅ Plus besoin de configuration manuelle

---

## 🎯 Temps Estimé

- Configuration Dashboard: **3 minutes**
- Build + Déploiement: **2-3 minutes**
- **Total: ~5-6 minutes**

---

## 📞 Besoin d'Aide?

Si vous êtes bloqué:

1. **Partager les logs Vercel** (copier-coller l'erreur)
2. **Partager des screenshots** de votre configuration
3. **Me dire à quelle étape vous êtes bloqué**

---

**Note:** Le code est prêt et testé. Il ne reste que la configuration du Dashboard Vercel! 🚀
