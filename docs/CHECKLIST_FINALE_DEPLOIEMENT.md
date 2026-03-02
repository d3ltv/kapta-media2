# ✅ CHECKLIST FINALE AVANT DÉPLOIEMENT

> Vérification complète avant mise en production

## 📋 Pré-déploiement

### Code
- [x] Aucune erreur de syntaxe (getDiagnostics ✅)
- [x] 20/20 problèmes corrigés
- [x] Prix cohérent partout (1250€)
- [x] Images optimisées (WebP 600x400)
- [x] Contraste WCAG AA conforme
- [ ] Vraie photo ajoutée dans About (⚠️ À faire)
- [ ] Logo /logo-kapta-btp.png existe (⚠️ À vérifier)

### Pages légales
- [x] mentions-legales.html créée
- [x] confidentialite.html créée
- [x] offres.html créée
- [x] Liens footer mis à jour

### Configuration
- [x] .htaccess créé
- [x] manifest.json créé
- [x] robots.txt créé
- [x] vercel.json créé

### Documentation
- [x] 10 fichiers de documentation créés
- [x] README principal créé
- [x] Guide de déploiement créé
- [x] Tests de validation créés

---

## 🧪 Tests locaux

### Installation
```bash
cd frontend
npm install
```
- [ ] Installation réussie sans erreurs

### Développement
```bash
npm start
```
- [ ] Serveur démarre sur http://localhost:3000
- [ ] Page /btp charge correctement
- [ ] Aucune erreur console
- [ ] Aucun warning React

### Build
```bash
npm run build
```
- [ ] Build réussi sans erreurs
- [ ] Dossier build/ créé
- [ ] Taille du bundle raisonnable (<500KB)

### Test du build
```bash
npx serve -s build
```
- [ ] Page fonctionne en mode production
- [ ] Images chargent correctement
- [ ] Formulaire fonctionne
- [ ] Modal s'ouvre

---

## 🎨 Tests visuels

### Desktop (>900px)
- [ ] Hero aligné à gauche
- [ ] Trait orange sous "chantier." aligné
- [ ] 5 photos visibles dans strip
- [ ] About: photo à gauche, texte à droite
- [ ] Diff: tableau 2 colonnes
- [ ] Offer: 4 cartes en grid
- [ ] SMS: hauteur 400-500px

### Mobile (<900px)
- [ ] Hero centré (titre, CTAs, proof)
- [ ] Trait orange centré
- [ ] Hero strip: scroll horizontal
- [ ] About: titre mobile visible
- [ ] Diff: tableau 1 colonne
- [ ] Offer: scroll avec indication
- [ ] SMS: hauteur 320px+

### Interactions
- [ ] CTA "Voir si ma zone est libre" → scroll
- [ ] Bouton "J'appelle" → modal
- [ ] Modal: clic overlay ferme (desktop)
- [ ] Modal: confirmation mobile
- [ ] WhatsApp: apparaît après 45s
- [ ] WhatsApp: bulle après 47s
- [ ] WhatsApp: bouton X ferme (24x24px)
- [ ] Footer: tous les liens fonctionnent

---

## 📊 Tests de performance

### Lighthouse (local)
```bash
# Chrome DevTools > Lighthouse
```
- [ ] Performance: >90
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

### Vérifications spécifiques
- [ ] LCP: <2.5s
- [ ] FID: <100ms
- [ ] CLS: <0.1
- [ ] Images WebP chargées
- [ ] Pas d'images cassées

---

## ♿ Tests d'accessibilité

### Contraste
- [ ] Google Maps mockup: texte lisible (dark)
- [ ] Tableau Diff: texte lisible
- [ ] Footer: liens lisibles
- [ ] Tous les textes: ratio >4.5:1

### Navigation clavier
- [ ] Tab: navigation logique
- [ ] Enter: activation boutons
- [ ] Esc: fermeture modal
- [ ] Focus visible partout

### Lecteur d'écran
- [ ] aria-label présents
- [ ] aria-hidden sur décoratifs
- [ ] Titres hiérarchiques (h1, h2, h3)
- [ ] Alt text sur images

---

## 🔍 Tests SEO

### Meta tags
- [ ] Title présent et optimisé
- [ ] Description <160 caractères
- [ ] Keywords présents
- [ ] Canonical URL correct
- [ ] Lang="fr"

### Open Graph
- [ ] og:title présent
- [ ] og:description présent
- [ ] og:type: website
- [ ] og:url correct
- [ ] og:image présent

### Structured Data
```bash
# https://search.google.com/test/rich-results
```
- [ ] LocalBusiness détecté
- [ ] Prix: 1250 (pas 497)
- [ ] Téléphone: +33686018054
- [ ] Adresse: Tours
- [ ] Validation réussie

### Fichiers
- [ ] /sitemap.xml accessible
- [ ] /robots.txt accessible
- [ ] Sitemap référencé dans robots.txt

---

## 🔐 Tests de sécurité

### Headers HTTP
- [ ] X-XSS-Protection configuré
- [ ] X-Content-Type-Options configuré
- [ ] X-Frame-Options configuré
- [ ] Strict-Transport-Security (si HTTPS)

### Liens externes
- [ ] rel="noopener noreferrer" sur WhatsApp
- [ ] target="_blank" sur externes

### Formulaire
- [ ] Validation côté client
- [ ] Pas de secrets exposés
- [ ] Données sensibles protégées

---

## 📄 Tests légaux

### Pages
- [ ] /mentions-legales accessible
- [ ] /confidentialite accessible
- [ ] /offres accessible
- [ ] Contenu complet et conforme

### RGPD
- [ ] Mention "Données confidentielles"
- [ ] Lien vers politique de confidentialité
- [ ] Pas de cookies sans consentement

---

## 🚀 Déploiement

### Git
```bash
git status
git add .
git commit -m "feat(btp): optimisations complètes - 20 corrections"
git push origin main
```
- [ ] Commit créé
- [ ] Push réussi
- [ ] Pas de conflits

### Vercel
- [ ] Auto-deploy déclenché
- [ ] Build réussi sur Vercel
- [ ] Déploiement terminé
- [ ] URL de production accessible

---

## ✅ Post-déploiement

### Vérification production
- [ ] https://kaptamedia.fr/btp accessible
- [ ] Page charge <3 secondes
- [ ] Images s'affichent
- [ ] Formulaire fonctionne
- [ ] Modal s'ouvre
- [ ] WhatsApp float apparaît
- [ ] Liens footer fonctionnent

### Lighthouse (production)
```bash
# Chrome DevTools sur URL production
```
- [ ] Performance: >90
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

### Tests mobile (production)
```bash
# https://search.google.com/test/mobile-friendly
```
- [ ] Page is mobile friendly
- [ ] Pas d'erreurs affichées

### Rich Results (production)
```bash
# https://search.google.com/test/rich-results
```
- [ ] LocalBusiness détecté
- [ ] Pas d'erreurs
- [ ] Pas d'avertissements

---

## 📈 Monitoring

### Google Search Console
- [ ] Sitemap soumis
- [ ] URL inspectée
- [ ] Indexation demandée

### Vercel Analytics
- [ ] Analytics activé
- [ ] Données collectées

### Alertes
- [ ] Notifications configurées
- [ ] Alertes de performance activées

---

## 🎯 Validation finale

### Checklist globale
- [ ] Tous les tests locaux passés
- [ ] Tous les tests de performance passés
- [ ] Tous les tests d'accessibilité passés
- [ ] Tous les tests SEO passés
- [ ] Tous les tests de sécurité passés
- [ ] Déploiement réussi
- [ ] Tests production passés
- [ ] Monitoring configuré

### Statut
- [ ] ✅ PRÊT POUR PRODUCTION

---

## ⚠️ Points d'attention

### À faire immédiatement après déploiement
1. Ajouter la vraie photo dans About
2. Vérifier que logo-kapta-btp.png existe
3. Tester le formulaire avec vraie API
4. Configurer Google Analytics (si pas fait)

### À surveiller (24-48h)
1. Core Web Vitals dans Search Console
2. Erreurs 404 éventuelles
3. Temps de chargement
4. Taux de rebond
5. Conversions formulaire

### À faire (1 semaine)
1. Analyser comportement utilisateur
2. Vérifier indexation Google
3. Monitorer les performances
4. Collecter les premiers retours

---

## 📞 En cas de problème

### Rollback rapide
```bash
# Via Vercel Dashboard
# Deployments > Dernier stable > Promote to Production
```

### Support
1. Vérifier logs Vercel
2. Vérifier console navigateur
3. Consulter GUIDE_DEPLOIEMENT_OPTIMISE.md
4. Consulter COMMANDES_UTILES.md

---

## 🎉 Déploiement réussi !

Une fois toutes les cases cochées:
- ✅ Page en production
- ✅ Performance optimale
- ✅ Accessibilité conforme
- ✅ SEO configuré
- ✅ Monitoring actif

**Félicitations ! La page est en ligne ! 🚀**

---

**Date:** 27 février 2026  
**Version:** 1.0  
**Statut:** Prêt pour validation
