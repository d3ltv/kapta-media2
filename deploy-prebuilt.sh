#!/bin/bash

# Script de déploiement avec build local (contourne les limites mémoire Vercel)
# KAPTA Media

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║         DÉPLOIEMENT AVEC BUILD LOCAL - KAPTA MEDIA                    ║"
echo "║         (Contourne les limites mémoire Vercel)                        ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""

# Vérifier que nous sommes dans le bon répertoire
if [ ! -d "frontend" ]; then
    echo "❌ Erreur : Répertoire 'frontend' non trouvé"
    exit 1
fi

echo "🧹 Étape 1/4 : Nettoyage du cache..."
echo ""

cd frontend

# Nettoyer le cache et le build existant
rm -rf build
rm -rf node_modules/.cache
echo "   ✅ Cache nettoyé"

echo ""
echo "📦 Étape 2/4 : Installation des dépendances..."
echo ""

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "   Installation de node_modules..."
    npm install
else
    echo "   ✅ node_modules déjà installé"
fi

echo ""
echo "🔨 Étape 3/4 : Build local (peut prendre 2-3 minutes)..."
echo ""

# Build avec plus de mémoire disponible localement
NODE_OPTIONS='--max_old_space_size=4096' npm run build

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
    
    # Afficher les plus gros fichiers
    echo ""
    echo "📁 Plus gros fichiers :"
    find build -type f -exec du -h {} + | sort -rh | head -5
fi

cd ..

echo ""
echo "🚀 Étape 4/4 : Déploiement sur Vercel (build pré-compilé)..."
echo ""

# Vérifier que vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "   Installation : npm install -g vercel"
    exit 1
fi

# Déployer avec le build pré-compilé
vercel --prod --prebuilt

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du déploiement"
    exit 1
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════════════╗"
echo "║                    ✅ DÉPLOIEMENT RÉUSSI !                            ║"
echo "╚═══════════════════════════════════════════════════════════════════════╝"
echo ""
echo "🎯 Avantages du build local :"
echo "   • Pas de limite mémoire Vercel"
echo "   • Build plus rapide (machine locale)"
echo "   • Déploiement instantané (juste upload)"
echo ""
echo "📊 Prochaines étapes :"
echo "   1. Ouvrir votre site déployé"
echo "   2. Tester en navigation privée"
echo "   3. Vérifier que tout fonctionne"
echo ""
