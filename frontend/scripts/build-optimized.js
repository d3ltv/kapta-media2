#!/usr/bin/env node
/**
 * Script de build optimisé avec PurgeCSS et compression
 * 
 * Usage: node scripts/build-optimized.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Build optimisé - Phase 1: Compilation React\n');

// 1. Build React avec optimisations
try {
  execSync('yarn build', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Erreur lors du build React');
  process.exit(1);
}

console.log('\n✅ Build React terminé\n');

// 2. Analyser le CSS inutilisé (optionnel - nécessite PurgeCSS)
console.log('🧹 Phase 2: Nettoyage du CSS inutilisé\n');

try {
  const { PurgeCSS } = require('purgecss');
  const purgeCSSConfig = require('../purgecss.config.js');
  
  const buildDir = path.join(__dirname, '../build');
  const cssFiles = fs.readdirSync(path.join(buildDir, 'static/css'))
    .filter(file => file.endsWith('.css') && !file.endsWith('.map'));
  
  for (const cssFile of cssFiles) {
    const cssPath = path.join(buildDir, 'static/css', cssFile);
    const originalSize = fs.statSync(cssPath).size;
    
    const purgeCSSResult = await new PurgeCSS().purge({
      content: [
        path.join(buildDir, '**/*.html'),
        path.join(buildDir, 'static/js/**/*.js'),
      ],
      css: [cssPath],
      ...purgeCSSConfig,
    });
    
    if (purgeCSSResult[0]) {
      fs.writeFileSync(cssPath, purgeCSSResult[0].css);
      const newSize = fs.statSync(cssPath).size;
      const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
      console.log(`   ✅ ${cssFile}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${saved}% économisé)`);
    }
  }
  
  console.log('\n✅ CSS optimisé\n');
} catch (error) {
  console.log('⚠️  PurgeCSS non disponible - ignoré');
  console.log('   Pour activer: npm install --save-dev purgecss\n');
}

// 3. Rapport de taille des bundles
console.log('📊 Phase 3: Analyse des bundles\n');

try {
  const buildDir = path.join(__dirname, '../build/static/js');
  const jsFiles = fs.readdirSync(buildDir)
    .filter(file => file.endsWith('.js') && !file.endsWith('.map'))
    .map(file => ({
      name: file,
      size: fs.statSync(path.join(buildDir, file)).size,
    }))
    .sort((a, b) => b.size - a.size);
  
  console.log('   Fichiers JavaScript:');
  jsFiles.forEach(file => {
    const sizeKB = (file.size / 1024).toFixed(1);
    const type = file.name.includes('vendors') ? '📦 Vendors' :
                 file.name.includes('main') ? '🎯 Main' :
                 file.name.includes('runtime') ? '⚙️  Runtime' : '📄 Chunk';
    console.log(`   ${type}: ${file.name} (${sizeKB} KB)`);
  });
  
  const totalSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
  console.log(`\n   📊 Total JS: ${(totalSize / 1024).toFixed(1)} KB`);
  
  // Vérifier si vendors.js est trop gros
  const vendorsFile = jsFiles.find(f => f.name.includes('vendors'));
  if (vendorsFile && vendorsFile.size > 150 * 1024) {
    console.log(`\n   ⚠️  vendors.js est encore gros (${(vendorsFile.size/1024).toFixed(1)} KB)`);
    console.log('   💡 Conseil: Vérifiez le code splitting dans craco.config.js');
  }
  
} catch (error) {
  console.log('⚠️  Impossible d\'analyser les bundles');
}

console.log('\n✅ Build optimisé terminé!\n');
console.log('💡 Prochaines étapes:');
console.log('   1. Testez avec: yarn start');
console.log('   2. Analysez avec: yarn analyze');
console.log('   3. Déployez avec: yarn deploy\n');
