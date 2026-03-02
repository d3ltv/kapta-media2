# 🛠️ COMMANDES UTILES - PROJET BTP

## 📦 Installation et setup

```bash
# Cloner le repository
git clone <repository-url>
cd <project-name>

# Installer les dépendances
cd frontend
npm install

# Vérifier la version de Node
node --version  # Doit être 16+
npm --version
```

## 🚀 Développement

```bash
# Lancer le serveur de développement
npm start
# Ouvrir http://localhost:3000/btp

# Lancer avec port spécifique
PORT=3001 npm start

# Lancer en mode verbose
VERBOSE=true npm start
```

## 🔨 Build

```bash
# Build de production
npm run build

# Build avec analyse
npm run build -- --stats
npx webpack-bundle-analyzer build/static/js/*.js

# Nettoyer avant build
rm -rf build
npm run build

# Tester le build localement
npx serve -s build
# Ouvrir http://localhost:3000/btp
```

## 🧪 Tests

```bash
# Tests unitaires (si configurés)
npm test

# Tests avec coverage
npm test -- --coverage

# Tests en mode watch
npm test -- --watch

# Lighthouse CLI
npm install -g lighthouse
lighthouse http://localhost:3000/btp --view

# Lighthouse avec options
lighthouse http://localhost:3000/btp \
  --only-categories=performance,accessibility,seo \
  --output=html \
  --output-path=./lighthouse-report.html
```

## 🔍 Analyse et debug

```bash
# Vérifier les erreurs ESLint
npm run lint

# Fixer automatiquement
npm run lint -- --fix

# Analyser les dépendances
npm audit
npm audit fix

# Vérifier les dépendances obsolètes
npm outdated

# Mettre à jour les dépendances
npm update

# Analyser la taille du bundle
npm run build
ls -lh build/static/js/
du -sh build/

# Trouver les gros fichiers
find build -type f -size +100k -exec ls -lh {} \;
```

## 🔐 Sécurité

```bash
# Audit de sécurité
npm audit

# Fixer les vulnérabilités
npm audit fix
npm audit fix --force  # Attention: peut casser des choses

# Vérifier les secrets dans le code
git secrets --scan

# Vérifier les variables d'environnement
printenv | grep -i react
```

## 📊 Performance

```bash
# Analyser le bundle
npm run build
npx source-map-explorer build/static/js/*.js

# Mesurer le temps de build
time npm run build

# Profiler React
# Ajouter ?react_perf dans l'URL
# Ouvrir React DevTools > Profiler

# Analyser les images
find frontend/public -name "*.jpg" -o -name "*.png" | xargs ls -lh

# Convertir images en WebP
for img in frontend/public/*.jpg; do
  cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done
```

## 🌐 Déploiement

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Lister les déploiements
vercel ls

# Voir les logs
vercel logs <deployment-url>

# Rollback
vercel rollback <deployment-url>
```

## 🔄 Git

```bash
# Statut
git status

# Voir les changements
git diff
git diff --staged

# Commit
git add .
git commit -m "feat(btp): description"

# Push
git push origin main

# Créer une branche
git checkout -b feature/nouvelle-fonctionnalite

# Merger
git checkout main
git merge feature/nouvelle-fonctionnalite

# Annuler le dernier commit (garder les changements)
git reset --soft HEAD~1

# Annuler le dernier commit (supprimer les changements)
git reset --hard HEAD~1

# Voir l'historique
git log --oneline --graph --all
```

## 📝 Documentation

```bash
# Générer la documentation des composants
npx jsdoc src/pages/BTP.jsx -d docs

# Compter les lignes de code
find frontend/src -name "*.jsx" -o -name "*.js" | xargs wc -l

# Rechercher dans le code
grep -r "TODO" frontend/src/
grep -r "FIXME" frontend/src/
grep -r "console.log" frontend/src/

# Trouver les fichiers modifiés récemment
find frontend/src -type f -mtime -7  # 7 derniers jours
```

## 🧹 Nettoyage

```bash
# Nettoyer node_modules
rm -rf node_modules package-lock.json
npm install

# Nettoyer le cache npm
npm cache clean --force

# Nettoyer le build
rm -rf build

# Nettoyer tout
rm -rf node_modules package-lock.json build
npm install
npm run build
```

## 🔧 Maintenance

```bash
# Mettre à jour React
npm install react@latest react-dom@latest

# Mettre à jour toutes les dépendances (attention!)
npm update --save

# Vérifier les dépendances inutilisées
npx depcheck

# Optimiser package.json
npm prune
```

## 📱 Tests mobile

```bash
# Exposer le serveur local sur le réseau
# Trouver l'IP locale
ifconfig | grep "inet " | grep -v 127.0.0.1

# Lancer avec l'IP
HOST=0.0.0.0 npm start
# Accéder depuis mobile: http://<votre-ip>:3000/btp

# Tester avec différents user agents
curl -A "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)" \
  http://localhost:3000/btp
```

## 🎨 Design

```bash
# Extraire les couleurs utilisées
grep -r "color:" frontend/src/ | grep -o "#[0-9A-Fa-f]\{6\}" | sort -u

# Extraire les tailles de police
grep -r "font-size:" frontend/src/ | grep -o "[0-9.]*rem" | sort -u

# Compter les composants
grep -r "function.*() {" frontend/src/pages/BTP.jsx | wc -l
```

## 📊 SEO

```bash
# Vérifier le sitemap
curl http://localhost:3000/sitemap.xml

# Vérifier robots.txt
curl http://localhost:3000/robots.txt

# Tester les meta tags
curl -s http://localhost:3000/btp | grep -i "<meta"

# Valider le HTML
curl -s http://localhost:3000/btp | \
  curl -s -F "out=gnu" -F "content=<-" \
  https://validator.w3.org/nu/
```

## 🐛 Debug

```bash
# Voir les erreurs React
REACT_APP_DEBUG=true npm start

# Activer les source maps
GENERATE_SOURCEMAP=true npm run build

# Voir les warnings
npm start 2>&1 | grep -i "warning"

# Profiler le build
NODE_OPTIONS=--max-old-space-size=4096 npm run build

# Debug avec Chrome DevTools
node --inspect-brk node_modules/.bin/react-scripts start
# Ouvrir chrome://inspect
```

## 📈 Monitoring

```bash
# Surveiller les fichiers
watch -n 5 'ls -lh build/static/js/'

# Surveiller les logs Vercel
vercel logs --follow

# Surveiller les erreurs
tail -f /var/log/nginx/error.log  # Si serveur custom

# Ping le site
watch -n 10 'curl -o /dev/null -s -w "%{http_code}\n" https://kaptamedia.fr/btp'
```

## 🔗 Liens utiles

```bash
# Ouvrir dans le navigateur
open http://localhost:3000/btp  # macOS
xdg-open http://localhost:3000/btp  # Linux
start http://localhost:3000/btp  # Windows

# Ouvrir les docs
open https://react.dev
open https://vercel.com/docs
open https://web.dev/vitals/
```

## 💡 Astuces

```bash
# Créer un alias pour les commandes fréquentes
alias btp-start="cd frontend && npm start"
alias btp-build="cd frontend && npm run build"
alias btp-deploy="cd frontend && vercel --prod"

# Ajouter dans ~/.bashrc ou ~/.zshrc
echo "alias btp-start='cd frontend && npm start'" >> ~/.bashrc

# Créer un script de déploiement rapide
cat > deploy.sh << 'EOF'
#!/bin/bash
cd frontend
npm run build
vercel --prod
EOF
chmod +x deploy.sh
./deploy.sh
```

## 🎯 Commandes rapides

```bash
# Setup complet
npm install && npm start

# Build et test
npm run build && npx serve -s build

# Audit complet
npm audit && npm outdated && npm run build

# Déploiement complet
git add . && git commit -m "update" && git push && vercel --prod

# Nettoyage complet
rm -rf node_modules package-lock.json build && npm install
```

---

**Astuce:** Créez un fichier `Makefile` pour simplifier:

```makefile
.PHONY: install start build deploy clean

install:
	cd frontend && npm install

start:
	cd frontend && npm start

build:
	cd frontend && npm run build

deploy:
	cd frontend && vercel --prod

clean:
	rm -rf frontend/node_modules frontend/build
```

Puis utilisez: `make install`, `make start`, etc.

---

**Date:** 27 février 2026  
**Version:** 1.0
