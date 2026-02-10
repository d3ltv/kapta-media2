# 🔒 Révoquer l'accès de MatSouesme

**Date:** 10 Février 2025  
**Action:** Révocation d'accès

---

## 🎯 Étapes pour révoquer l'accès

### 1. GitHub Repository

#### Option A: Retirer des Collaborateurs
1. Aller sur https://github.com/d3ltv/kapta-media2
2. Cliquer sur **Settings** (en haut)
3. Cliquer sur **Collaborators** (menu gauche)
4. Trouver **MatSouesme** dans la liste
5. Cliquer sur **Remove** à côté de son nom
6. Confirmer la suppression

#### Option B: Vérifier les équipes (si organisation)
1. Aller sur https://github.com/orgs/VOTRE_ORG/teams
2. Vérifier si MatSouesme est dans une équipe
3. Le retirer de l'équipe

---

### 2. Vercel Project

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet **kapta-media2**
3. Aller dans **Settings** > **Members**
4. Trouver **MatSouesme** dans la liste
5. Cliquer sur **Remove** ou les 3 points `...` > **Remove**
6. Confirmer

---

### 3. Vérifier les clés SSH/Tokens

#### Sur GitHub:
1. Aller sur https://github.com/settings/keys
2. Vérifier les **SSH keys** et **GPG keys**
3. Supprimer toute clé suspecte ou appartenant à MatSouesme

#### Tokens d'accès personnel:
1. Aller sur https://github.com/settings/tokens
2. Vérifier les **Personal access tokens**
3. Révoquer tout token suspect

---

### 4. Changer l'auteur Git (si nécessaire)

Si vous voulez que les futurs commits soient sous votre nom:

```bash
# Configurer votre identité Git
git config user.name "VotreNom"
git config user.email "votre-email@example.com"

# Vérifier la configuration
git config user.name
git config user.email
```

---

### 5. Protéger la branche main

Pour éviter les accès non autorisés futurs:

1. GitHub > Settings > Branches
2. Cliquer sur **Add rule** (ou modifier la règle existante)
3. Branch name pattern: `main`
4. Cocher:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1 minimum)
   - ✅ Dismiss stale pull request approvals
   - ✅ Require review from Code Owners
5. Sauvegarder

---

### 6. Vérifier les webhooks

1. GitHub > Settings > Webhooks
2. Vérifier qu'il n'y a pas de webhooks suspects
3. Supprimer tout webhook non reconnu

---

### 7. Audit des accès récents

#### Sur GitHub:
1. Settings > Security log
2. Vérifier les activités récentes
3. Chercher des actions de MatSouesme

#### Sur Vercel:
1. Dashboard > Activity
2. Vérifier les déploiements récents
3. Vérifier qui a fait quoi

---

## 🔍 Vérifications Post-Révocation

- [ ] MatSouesme n'apparaît plus dans GitHub Collaborators
- [ ] MatSouesme n'apparaît plus dans Vercel Members
- [ ] Aucune clé SSH suspecte sur GitHub
- [ ] Aucun token d'accès suspect
- [ ] Branche main protégée
- [ ] Webhooks vérifiés
- [ ] Votre identité Git configurée

---

## 🚨 Si MatSouesme a encore accès

### Vérifier les accès indirects:

1. **Organisation GitHub:**
   - Vérifier s'il est membre de l'organisation
   - Le retirer de l'organisation si nécessaire

2. **Équipe Vercel:**
   - Vérifier s'il est dans l'équipe Vercel
   - Le retirer de l'équipe

3. **Accès via fork:**
   - Vérifier s'il a forké le repo
   - Les forks ne donnent pas accès au repo principal

---

## 🔐 Sécurité Renforcée (Recommandé)

### 1. Activer 2FA (Two-Factor Authentication)

**Sur GitHub:**
1. Settings > Password and authentication
2. Activer Two-factor authentication
3. Utiliser une app comme Google Authenticator

**Sur Vercel:**
1. Account Settings > Security
2. Activer Two-factor authentication

### 2. Utiliser des Deploy Keys (au lieu de collaborateurs)

Pour Vercel, utiliser un token de déploiement au lieu d'ajouter des membres:

1. Vercel > Settings > Tokens
2. Créer un token de déploiement
3. Utiliser ce token dans GitHub Actions (si nécessaire)

### 3. Activer les notifications de sécurité

**GitHub:**
1. Settings > Notifications
2. Activer les alertes de sécurité
3. Activer les notifications pour les pushs

---

## 📊 Checklist Complète

### GitHub:
- [ ] Retirer MatSouesme des Collaborators
- [ ] Vérifier les équipes (si organisation)
- [ ] Vérifier les clés SSH
- [ ] Vérifier les tokens d'accès
- [ ] Protéger la branche main
- [ ] Vérifier les webhooks
- [ ] Consulter le security log

### Vercel:
- [ ] Retirer MatSouesme des Members
- [ ] Vérifier l'équipe Vercel
- [ ] Consulter l'Activity log

### Configuration locale:
- [ ] Configurer votre identité Git
- [ ] Vérifier git config

### Sécurité:
- [ ] Activer 2FA sur GitHub
- [ ] Activer 2FA sur Vercel
- [ ] Configurer les notifications

---

## 💡 Pourquoi révoquer l'accès?

- ✅ Sécurité: Limiter l'accès au code
- ✅ Contrôle: Savoir qui peut modifier le code
- ✅ Traçabilité: Éviter les commits non autorisés
- ✅ Conformité: Respecter les bonnes pratiques

---

## 🎯 Après la révocation

Une fois l'accès révoqué:

1. ✅ Seuls les membres autorisés peuvent accéder au code
2. ✅ Les déploiements Vercel fonctionneront toujours
3. ✅ Vous gardez le contrôle total du projet
4. ✅ L'historique Git reste intact

---

## 📞 Besoin d'aide?

Si vous avez des questions:

1. **GitHub Support:** https://support.github.com
2. **Vercel Support:** https://vercel.com/support
3. **Documentation GitHub:** https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories

---

**Note:** La révocation d'accès n'affecte pas le code existant ni l'historique Git. Elle empêche simplement les futurs accès et modifications.
