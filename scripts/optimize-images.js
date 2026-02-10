/**
 * Script d'optimisation des images
 * Utilise Sharp pour compresser et convertir les images en WebP
 * 
 * Installation : npm install sharp
 * Utilisation : node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(__dirname, '../frontend/public'),
  outputDir: path.join(__dirname, '../frontend/public/optimized'),
  quality: 80,
  formats: ['webp', 'jpg'],
  sizes: [
    { name: 'thumbnail', width: 400 },
    { name: 'medium', width: 800 },
    { name: 'large', width: 1200 },
    { name: 'original', width: null }
  ]
};

// Créer le dossier de sortie
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Fonction pour optimiser une image
async function optimizeImage(inputPath, filename) {
  const ext = path.extname(filename).toLowerCase();
  const name = path.basename(filename, ext);
  
  // Ignorer les fichiers non-images
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }
  
  console.log(`📸 Optimisation de ${filename}...`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Pour chaque taille
    for (const size of CONFIG.sizes) {
      const width = size.width || metadata.width;
      
      // Pour chaque format
      for (const format of CONFIG.formats) {
        const outputFilename = `${name}-${size.name}.${format}`;
        const outputPath = path.join(CONFIG.outputDir, outputFilename);
        
        await image
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, {
            quality: CONFIG.quality,
            progressive: true
          })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`  ✅ ${outputFilename} (${sizeMB} MB)`);
      }
    }
    
    console.log(`✨ ${filename} optimisé avec succès!\n`);
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${filename}:`, error.message);
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Démarrage de l\'optimisation des images...\n');
  console.log(`📁 Dossier d'entrée: ${CONFIG.inputDir}`);
  console.log(`📁 Dossier de sortie: ${CONFIG.outputDir}\n`);
  
  // Lire tous les fichiers du dossier
  const files = fs.readdirSync(CONFIG.inputDir);
  
  // Filtrer les images
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
  });
  
  console.log(`📊 ${imageFiles.length} images trouvées\n`);
  
  // Optimiser chaque image
  for (const file of imageFiles) {
    const inputPath = path.join(CONFIG.inputDir, file);
    await optimizeImage(inputPath, file);
  }
  
  console.log('✅ Optimisation terminée!');
  console.log(`📁 Images optimisées dans: ${CONFIG.outputDir}`);
}

// Exécuter
main().catch(console.error);
