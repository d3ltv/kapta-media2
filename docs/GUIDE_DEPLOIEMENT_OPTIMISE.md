# 🚀 GUIDE DE DÉPLOIEMENT OPTIMISÉ - PAGE BTP

## 📋 Pré-requis

- Node.js 16+ installé
- Compte Vercel configuré
- Git configuré
- Accès au repository

---

## 🔧 Étape 1: Vérification locale

### 1.1 Installer les dépendances
```bash
cd frontend
npm install
```

### 1.2 Lancer en mode développement
```bash
npm start
```

### 1.3 Vérifier dans le navigateur
- Ouvrir http://localhost:3000/btp
- Tester le responsive (DevTools)
- Vérifier les animations
- Tester les interactions

### 1.4 Build de production
```bash
npm run build
```

### 1.5 Tester le build
```bash
npx serve -s build
```
Ouvrir http://localhost:3000/btp

---

## 📊 Étape 2: Tests de performance

### 2.1 Lighthouse (Chrome DevTools)
```bash
# Ouvrir Chrome DevTools (F12)
# Onglet Lighthouse
# Cocher: Performance, Accessibility, Best Practices, SEO
# Mode: Desktop ET Mobile
# Cliquer "Generate report"
```

**Objectifs:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

### 2.2 Bundle Analyzer (optionnel)
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

---

## 🔐 Étape 3: Sécurité

### 3.1 Vérifier les dépendances
```bash
npm audit
npm audit fix
```

### 3.2 Vérifier les secrets
```bash
# S'assurer qu'aucun secret n'est commité
git secrets --scan
```

---

## 📦 Étape 4: Commit et push

### 4.1 Vérifier les changements
```bash
git status
git diff
```

### 4.2 Commit
```bash
git add .
git commit -m "feat(btp): optimisations complètes - 20 corrections appliquées

- Hero alignement mobile/desktop
- Contraste WCAG AA conforme
- Images WebP optimisées
- Tableau Diff responsive
- Pages légales créées
- Prix structured data corrigé
- Performance améliorée
- Accessibilité renforcée"
```

### 4.3 Push
```bash
git push origin main
```

---

## 🌐 Étape 5: Déploiement Vercel

### 5.1 Configuration Vercel

Créer/vérifier `vercel.json` à la racine:
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
      "src": "/btp",
      "dest": "/frontend/build/index.html"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/build/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 5.2 Déployer via CLI
```bash
# Installer Vercel CLI si nécessaire
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

### 5.3 Déployer via Git (recommandé)
```bash
# Push sur main déclenche automatiquement le déploiement
git push origin main

# Vercel détecte le push et déploie
# Suivre sur https://vercel.com/dashboard
```

---

## ✅ Étape 6: Vérification post-déploiement

### 6.1 Vérifier l'URL de production
```bash
# Exemple: https://kaptamedia.fr/btp
```

### 6.2 Tests rapides
- [ ] Page charge correctement
- [ ] Images s'affichent
- [ ] Formulaire fonctionne
- [ ] Modal appel s'ouvre
- [ ] WhatsApp float apparaît
- [ ] Liens footer fonctionnent

### 6.3 Lighthouse en production
```bash
# Chrome DevTools sur l'URL de production
# Lighthouse > Generate report
```

### 6.4 Core Web Vitals
```bash
# Ouvrir Google Search Console
# Expérience > Core Web Vitals
# Attendre 24-48h pour les données
```

---

## 🔍 Étape 7: SEO et indexation

### 7.1 Soumettre le sitemap
```bash
# Google Search Console
# Sitemaps > Ajouter un sitemap
# URL: https://kaptamedia.fr/sitemap.xml
```

### 7.2 Tester les rich results
```bash
# Ouvrir https://search.google.com/test/rich-results
# Entrer: https://kaptamedia.fr/btp
# Vérifier que LocalBusiness est détecté
```

### 7.3 Tester mobile-friendly
```bash
# Ouvrir https://search.google.com/test/mobile-friendly
# Entrer: https://kaptamedia.fr/btp
# Vérifier "Page is mobile friendly"
```

---

## 📈 Étape 8: Monitoring

### 8.1 Configurer Google Analytics (si pas déjà fait)
```javascript
// Ajouter dans index.html ou via GTM
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 8.2 Configurer Vercel Analytics
```bash
# Dans le dashboard Vercel
# Project > Analytics > Enable
```

### 8.3 Configurer les alertes
```bash
# Vercel > Project > Settings > Notifications
# Activer:
# - Deployment Failed
# - Deployment Ready
# - Performance Degradation
```

---

## 🐛 Étape 9: Rollback (si problème)

### 9.1 Via Vercel Dashboard
```bash
# Vercel > Project > Deployments
# Trouver le dernier déploiement stable
# Cliquer "..." > Promote to Production
```

### 9.2 Via Git
```bash
# Revenir au commit précédent
git revert HEAD
git push origin main

# Ou reset (attention, destructif)
git reset --hard HEAD~1
git push origin main --force
```

---

## 📝 Checklist finale

### Avant déploiement
- [ ] Tests locaux passés
- [ ] Lighthouse >90 en local
- [ ] Pas d'erreurs console
- [ ] Pas de warnings React
- [ ] Build réussi
- [ ] Commit avec message clair

### Après déploiement
- [ ] URL production accessible
- [ ] Tests rapides passés
- [ ] Lighthouse >90 en production
- [ ] Sitemap soumis
- [ ] Rich results validés
- [ ] Mobile-friendly validé
- [ ] Analytics configuré

### Suivi (24-48h après)
- [ ] Core Web Vitals vérifiés
- [ ] Indexation Google vérifiée
- [ ] Pas d'erreurs Search Console
- [ ] Trafic normal (pas de chute)

---

## 🆘 Troubleshooting

### Problème: Build échoue
```bash
# Vérifier les logs
npm run build

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problème: Images ne chargent pas
```bash
# Vérifier que les images sont dans /public
ls -la frontend/public/

# Vérifier les URLs dans le code
grep -r "logo-kapta-btp.png" frontend/src/
```

### Problème: Formulaire ne fonctionne pas
```bash
# Vérifier la console navigateur (F12)
# Vérifier que l'API endpoint est correct
# Vérifier les CORS si API externe
```

### Problème: Performance dégradée
```bash
# Vérifier la taille du bundle
npm run build
ls -lh build/static/js/

# Analyser avec webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

---

## 📞 Support

En cas de problème:
1. Vérifier les logs Vercel
2. Vérifier la console navigateur
3. Vérifier Google Search Console
4. Contacter le support Vercel si nécessaire

---

## 🎉 Déploiement réussi !

Une fois toutes les étapes validées:
- ✅ Page en production
- ✅ Performance optimale
- ✅ SEO configuré
- ✅ Monitoring actif

**Prochaines étapes:**
1. Monitorer les Core Web Vitals
2. Analyser le comportement utilisateur
3. Itérer sur les optimisations
4. Ajouter la vraie photo dans About

---

**Date de création:** 27 février 2026  
**Version:** 1.0  
**Statut:** ✅ Prêt pour déploiement
