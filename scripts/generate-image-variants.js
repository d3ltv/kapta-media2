#!/usr/bin/env node

/**
 * Script pour générer les variants d'images responsive
 * Crée automatiquement les versions 320w, 640w, 960w de chaque image
 * 
 * Installation : npm install sharp
 * Utilisation : node scripts/generate-image-variants.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../frontend/public'),
  sizes: [320, 640, 960],
  quality: 75,
  formats: ['webp'],
  // Images à traiter
  images: [
    'garage1.webp',
    'garage2.webp',
    'salon1.webp',
    'salon2.webp',
    'bistro1.webp',
    'bistro2.webp',
    'boulangerie1.webp',
    'boulangerie2.webp'
  ]
};

// Fonction pour générer les variants d'une image
async function generateVariants(imageName) {
  const inputPath = path.join(CONFIG.inputDir, imageName);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Image non trouvée: ${imageName}`);
    return;
  }
  
  console.log(`\n📸 Traitement de ${imageName}...`);
  
  const baseName = imageName.replace(/\.(webp|jpg|jpeg|png)$/, '');
  const ext = imageName.match(/\.(webp|jpg|jpeg|png)$/)?.[0] || '.webp';
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`   Dimensions originales: ${metadata.width}x${metadata.height}`);
    
    // Générer chaque taille
    for (const width of CONFIG.sizes) {
      const outputName = `${baseName}-${width}w${ext}`;
      const outputPath = path.join(CONFIG.inputDir, outputName);
      
      await image
        .clone()
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: CONFIG.quality,
          effort: 6
        })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`   ✅ ${outputName} (${sizeKB} KB)`);
    }
    
    // Optimiser l'image originale aussi
    const optimizedPath = path.join(CONFIG.inputDir, `${baseName}-optimized${ext}`);
    await image
      .clone()
      .webp({
        quality: CONFIG.quality,
        effort: 6
      })
      .toFile(optimizedPath);
    
    const optimizedStats = fs.statSync(optimizedPath);
    const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(1);
    console.log(`   ✅ ${baseName}-optimized${ext} (${optimizedSizeKB} KB)`);
    
    // Remplacer l'original par la version optimisée
    fs.renameSync(optimizedPath, inputPath);
    console.log(`   ✨ Original remplacé par la version optimisée`);
    
  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`);
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Génération des variants d\'images responsive...\n');
  console.log(`📁 Dossier: ${CONFIG.inputDir}`);
  console.log(`📏 Tailles: ${CONFIG.sizes.join(', ')}px`);
  console.log(`🎨 Qualité: ${CONFIG.quality}%`);
  console.log(`📦 Format: WebP\n`);
  
  // Vérifier que Sharp est installé
  try {
    require.resolve('sharp');
  } catch (e) {
    console.error('❌ Sharp n\'est pas installé!');
    console.error('   Installez-le avec: npm install sharp');
    process.exit(1);
  }
  
  // Traiter chaque image
  for (const imageName of CONFIG.images) {
    await generateVariants(imageName);
  }
  
  console.log('\n✅ Génération terminée!');
  console.log('\n📋 Prochaines étapes:');
  console.log('   1. Vérifier les images générées dans frontend/public/');
  console.log('   2. Utiliser le composant OptimizedImage dans le code');
  console.log('   3. Tester avec PageSpeed Insights');
}

// Exécuter
main().catch(console.error);
