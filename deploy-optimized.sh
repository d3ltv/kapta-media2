#!/bin/bash

# Script de déploiement avec optimisations performance
# KAPTA Media - Performance 52 → 75-85

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║         DÉPLOIEMENT OPTIMISÉ - KAPTA MEDIA                            ║"
echo "║              Performance 52 → 75-85                                   ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -d "frontend" ]; then
    echo "❌ Erreur : Répertoire 'frontend' non trouvé"
    echo "   Assurez-vous d'exécuter ce script depuis la racine du projet"
    exit 1
fi

# Vérifier que les fichiers optimisés existent
echo "🔍 Vérification des fichiers optimisés..."
echo ""

MISSING_FILES=0

if [ ! -f "frontend/public/logo.webp" ]; then
    echo "❌ frontend/public/logo.webp manquant"
    MISSING_FILES=1
fi

if [ ! -f "frontend/public/Inter-SemiBold.woff2" ]; then
    echo "❌ frontend/public/Inter-SemiBold.woff2 manquant"
    MISSING_FILES=1
fi

if [ ! -f "frontend/src/utils/posthog.js" ]; then
    echo "❌ frontend/src/utils/posthog.js manquant"
    MISSING_FILES=1
fi

if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json manquant"
    MISSING_FILES=1
fi

if [ $MISSING_FILES -eq 1 ]; then
    echo ""
    echo "❌ Fichiers manquants détectés"
    echo "   Les optimisations ne sont peut-être pas complètes"
    echo ""
    read -p "Continuer quand même ? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Tous les fichiers optimisés sont présents"
fi

echo ""
echo "📦 Étape 1/3 : Installation des dépendances..."
echo ""

cd frontend

if [ ! -d "node_modules" ]; then
    echo "   Installation de node_modules..."
    npm install
else
    echo "   ✅ node_modules déjà installé"
fi

echo ""
echo "🔨 Étape 2/3 : Build de production..."
echo ""

npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo ""
echo "✅ Build réussi !"
echo ""

# Afficher la taille du build
if [ -d "build" ]; then
    BUILD_SIZE=$(du -sh build | cut -f1)
    echo "📊 Taille du build : $BUILD_SIZE"
fi

cd ..

echo ""
echo "🚀 Étape 3/3 : Déploiement sur Vercel..."
echo ""

# Vérifier que vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "   Installation : npm install -g vercel"
    exit 1
fi

# Déployer
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du déploiement"
    exit 1
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ DÉPLOIEMENT RÉUSSI !                            ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎯 Prochaines étapes :"
echo ""
echo "1. Ouvrir votre site déployé"
echo "2. F12 → Lighthouse → Performance"
echo "3. Vérifier Score > 75"
echo ""
echo "📊 Résultat attendu :"
echo "   • Performance : 75-85 (au lieu de 52)"
echo "   • LCP : ~2.5s (au lieu de 4.2s)"
echo "   • FCP : ~1.5s (au lieu de 2.5s)"
echo "   • TBT : ~300ms (au lieu de 900ms)"
echo ""
echo "🎨 BONUS : Pour atteindre 85-90"
echo "   Optimiser le logo : voir OPTIMISATION_LOGO_SUPPLEMENTAIRE.md"
echo ""
echo "📚 Documentation : INDEX_OPTIMISATIONS.md"
echo ""
