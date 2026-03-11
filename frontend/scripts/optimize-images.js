#!/usr/bin/env node
/**
 * Script d'optimisation des images pour mobile
 * Génère des variantes 273w pour les images du carrousel
 * 
 * Usage: node scripts/optimize-images.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');

// Images à optimiser (celles identifiées dans l'audit)
const IMAGES_TO_OPTIMIZE = [
  'garage1', 'garage2',
  'bistro1', 'bistro2',
  'boulangerie1', 'boulangerie2',
  'salon1', 'salon2'
];

// Tailles à générer
const SIZES = [
  { width: 273, suffix: '273w' },  // Taille mobile exacte
  { width: 320, suffix: '320w' },  // Déjà existant
  { width: 560, suffix: '560w' },  // Déjà existant
  { width: 640, suffix: '640w' },  // Déjà existant
  { width: 960, suffix: '960w' }   // Déjà existant
];

console.log('🖼️  Optimisation des images pour mobile...\n');

// Vérifier si sharp est disponible
let useSharp = false;
try {
  require.resolve('sharp');
  useSharp = true;
  console.log('✅ sharp détecté - utilisation pour l\'optimisation\n');
} catch (e) {
  console.log('⚠️  sharp non installé - utilisation de cwebp (si disponible)\n');
  console.log('   Pour de meilleures performances, installez sharp:');
  console.log('   npm install --save-dev sharp\n');
}

async function optimizeWithSharp(inputPath, outputPath, width) {
  const sharp = require('sharp');
  await sharp(inputPath)
    .resize(width, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);
}

function optimizeWithCwebp(inputPath, outputPath, width) {
  try {
    execSync(
      `cwebp -q 85 -resize ${width} 0 "${inputPath}" -o "${outputPath}"`,
      { stdio: 'pipe' }
    );
  } catch (error) {
    console.error(`❌ Erreur avec cwebp pour ${path.basename(inputPath)}`);
    throw error;
  }
}

async function processImages() {
  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const imageName of IMAGES_TO_OPTIMIZE) {
    // Chercher l'image source (version la plus grande disponible)
    const sourceFile = `${imageName}.webp`;
    const sourcePath = path.join(PUBLIC_DIR, sourceFile);

    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Source manquante: ${sourceFile}`);
      skipped++;
      continue;
    }

    // Générer uniquement la variante 273w si elle n'existe pas
    const targetSize = SIZES[0]; // 273w
    const outputFile = `${imageName}-${targetSize.suffix}.webp`;
    const outputPath = path.join(PUBLIC_DIR, outputFile);

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Existe déjà: ${outputFile}`);
      skipped++;
      continue;
    }

    try {
      if (useSharp) {
        await optimizeWithSharp(sourcePath, outputPath, targetSize.width);
      } else {
        optimizeWithCwebp(sourcePath, outputPath, targetSize.width);
      }

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      console.log(`✅ Créé: ${outputFile} (${sizeKB} KB)`);
      processed++;
    } catch (error) {
      console.error(`❌ Erreur: ${outputFile}`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Résumé:`);
  console.log(`   ✅ Créées: ${processed}`);
  console.log(`   ⏭️  Ignorées: ${skipped}`);
  console.log(`   ❌ Erreurs: ${errors}`);

  if (processed > 0) {
    console.log(`\n💡 N'oubliez pas de mettre à jour les attributs srcset dans vos composants !`);
  }
}

// Exécution
processImages().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
