# ⚡ QUICK START - PAGE BTP

> Démarrage ultra-rapide en 5 minutes

## 🚀 Installation (2 min)

```bash
cd frontend
npm install
npm start
```

Ouvrir http://localhost:3000/btp

## ✅ Vérification (1 min)

- [ ] Page charge
- [ ] Images s'affichent
- [ ] Formulaire fonctionne
- [ ] Modal s'ouvre

## 🧪 Tests (1 min)

```bash
# Lighthouse
Chrome DevTools (F12) > Lighthouse > Generate report

# Objectifs: Performance >90, Accessibility >90, SEO >90
```

## 🚀 Déploiement (1 min)

```bash
git add .
git commit -m "update"
git push origin main
# Auto-deploy sur Vercel
```

---

## 📚 Documentation complète

Pour plus de détails, consultez:

1. **README_BTP_OPTIMISATIONS.md** - Vue d'ensemble
2. **GUIDE_DEPLOIEMENT_OPTIMISE.md** - Déploiement détaillé
3. **TESTS_VALIDATION_BTP.md** - Tests complets
4. **INDEX_DOCUMENTATION.md** - Navigation dans les docs

---

## 🆘 Problème ?

### Build échoue
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images ne chargent pas
Vérifier que `/logo-kapta-btp.png` existe dans `frontend/public/`

### Formulaire ne fonctionne pas
Vérifier la console navigateur (F12)

---

## 📞 Support

Consulter **GUIDE_DEPLOIEMENT_OPTIMISE.md** > Section "Troubleshooting"

---

**Temps total:** 5 minutes  
**Statut:** ✅ Prêt
