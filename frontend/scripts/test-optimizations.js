#!/usr/bin/env node
/**
 * Script de validation des optimisations PageSpeed
 * Vérifie que toutes les optimisations sont bien appliquées
 * 
 * Usage: node scripts/test-optimizations.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validation des optimisations PageSpeed\n');

let errors = 0;
let warnings = 0;
let success = 0;

// Helper functions
const checkFileExists = (filePath, description) => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`);
    success++;
    return true;
  } else {
    console.log(`❌ ${description} - Fichier manquant: ${filePath}`);
    errors++;
    return false;
  }
};

const checkFileContent = (filePath, searchString, description) => {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  ${description} - Fichier non trouvé: ${filePath}`);
    warnings++;
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes(searchString)) {
    console.log(`✅ ${description}`);
    success++;
    return true;
  } else {
    console.log(`❌ ${description} - Contenu manquant dans ${filePath}`);
    errors++;
    return false;
  }
};

const checkBuildSize = () => {
  const buildDir = path.join(__dirname, '../build/static/js');
  if (!fs.existsSync(buildDir)) {
    console.log('⚠️  Build non trouvé - Exécutez "yarn build" d\'abord');
    warnings++;
    return;
  }
  
  const jsFiles = fs.readdirSync(buildDir)
    .filter(file => file.endsWith('.js') && !file.endsWith('.map'));
  
  const vendorsFile = jsFiles.find(f => f.includes('vendors'));
  if (vendorsFile) {
    const size = fs.statSync(path.join(buildDir, vendorsFile)).size;
    const sizeKB = (size / 1024).toFixed(1);
    
    if (size < 100 * 1024) {
      console.log(`✅ vendors.js optimisé (${sizeKB} KB < 100 KB)`);
      success++;
    } else if (size < 138 * 1024) {
      console.log(`⚠️  vendors.js réduit mais peut être optimisé (${sizeKB} KB)`);
      warnings++;
    } else {
      console.log(`❌ vendors.js trop gros (${sizeKB} KB > 138 KB)`);
      errors++;
    }
  }
};

const checkImages = () => {
  const publicDir = path.join(__dirname, '../public');
  const imagesToCheck = [
    'garage1-273w.webp',
    'garage2-273w.webp',
    'bistro1-273w.webp',
    'bistro2-273w.webp',
    'boulangerie1-273w.webp',
    'boulangerie2-273w.webp',
    'salon1-273w.webp',
    'salon2-273w.webp'
  ];
  
  let found = 0;
  imagesToCheck.forEach(img => {
    if (fs.existsSync(path.join(publicDir, img))) {
      found++;
    }
  });
  
  if (found === imagesToCheck.length) {
    console.log(`✅ Toutes les images 273w générées (${found}/${imagesToCheck.length})`);
    success++;
  } else if (found > 0) {
    console.log(`⚠️  Images 273w partiellement générées (${found}/${imagesToCheck.length})`);
    warnings++;
  } else {
    console.log(`❌ Aucune image 273w générée - Exécutez "yarn optimize:images"`);
    errors++;
  }
};

// Tests
console.log('📦 1. Code Splitting & Lazy Loading\n');
checkFileExists('src/App.lazy.js', 'Fichier lazy loading créé');
checkFileExists('src/utils/motion.js', 'Imports Framer Motion optimisés');
checkFileExists('src/utils/icons.js', 'Imports Lucide optimisés');
checkFileExists('src/components/LazyLoadWrapper.jsx', 'Wrapper Suspense créé');
checkFileContent('craco.config.js', 'splitChunks', 'Configuration Webpack optimisée');

console.log('\n🎨 2. CSS Non-Bloquant\n');
checkFileExists('src/utils/loadCSS.js', 'Utilitaire loadCSS créé');
checkFileExists('purgecss.config.js', 'Configuration PurgeCSS créée');
checkFileContent('public/index.html', 'Critical CSS inline', 'Critical CSS inline dans index.html');
checkFileContent('src/index.js', 'inlineCriticalCSS', 'Inline CSS au démarrage');

console.log('\n🖼️  3. Images Optimisées\n');
checkFileExists('scripts/optimize-images.js', 'Script d\'optimisation créé');
checkFileContent('src/components/OptimizedImage.jsx', '273w', 'srcset 273w ajouté');
checkImages();

console.log('\n⚡ 4. Animations GPU\n');
checkFileExists('src/styles/animations-optimized.css', 'Animations GPU créées');
checkFileContent('src/styles/animations-optimized.css', 'transform', 'Animations utilisent transform');
checkFileContent('src/styles/animations-optimized.css', 'prefers-reduced-motion', 'Support reduced motion');

console.log('\n♿ 5. Accessibilité\n');
checkFileExists('src/styles/accessibility.css', 'Styles accessibilité créés');
checkFileExists('src/components/CarouselButton.jsx', 'Boutons carrousel accessibles');
checkFileContent('src/components/CarouselButton.jsx', 'aria-label', 'aria-label présent');
checkFileContent('src/components/CarouselButton.jsx', 'min-w-[44px]', 'Zone tactile 44px');

console.log('\n🔒 6. Sécurité\n');
checkFileExists('public/_headers', 'Headers de sécurité créés');
checkFileContent('public/_headers', 'Strict-Transport-Security', 'HSTS configuré');
checkFileContent('public/_headers', 'Content-Security-Policy', 'CSP configuré');

console.log('\n🏗️  7. Build & Configuration\n');
checkFileExists('scripts/build-optimized.js', 'Script de build optimisé');
checkFileContent('package.json', 'build:optimized', 'Script build:optimized ajouté');
checkFileContent('package.json', 'optimize:images', 'Script optimize:images ajouté');
checkFileContent('tailwind.config.js', 'hoverOnlyWhenSupported', 'Tailwind optimisé');
checkFileContent('postcss.config.js', 'cssnano', 'PostCSS optimisé');

console.log('\n📊 8. Analyse du Build\n');
checkBuildSize();

// Résumé
console.log('\n' + '='.repeat(60));
console.log('📊 RÉSUMÉ\n');
console.log(`✅ Succès: ${success}`);
console.log(`⚠️  Avertissements: ${warnings}`);
console.log(`❌ Erreurs: ${errors}`);
console.log('='.repeat(60));

if (errors === 0 && warnings === 0) {
  console.log('\n🎉 Toutes les optimisations sont correctement appliquées!');
  console.log('\n📝 Prochaines étapes:');
  console.log('   1. Exécutez "yarn build:optimized" pour builder');
  console.log('   2. Testez avec "yarn start"');
  console.log('   3. Déployez en production');
  console.log('   4. Testez sur PageSpeed Insights\n');
  process.exit(0);
} else if (errors === 0) {
  console.log('\n⚠️  Optimisations appliquées avec quelques avertissements.');
  console.log('   Vérifiez les points ci-dessus avant de déployer.\n');
  process.exit(0);
} else {
  console.log('\n❌ Certaines optimisations sont manquantes.');
  console.log('   Corrigez les erreurs ci-dessus avant de continuer.\n');
  process.exit(1);
}
