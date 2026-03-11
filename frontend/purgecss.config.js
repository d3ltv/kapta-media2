// Configuration PurgeCSS pour supprimer le CSS inutilisé
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  css: ['./src/**/*.css'],
  
  // Classes à toujours garder (dynamiques ou critiques)
  safelist: {
    standard: [
      /^dark/,
      /^glassmorphism/,
      /^gradient/,
      /^btn/,
      /^cta/,
      /^animate/,
      /^transition/,
      /^hover/,
      /^focus/,
      /^active/,
      /^group/,
      /^peer/,
    ],
    deep: [
      /^radix/,
      /^lucide/,
      /^framer/,
    ],
    greedy: [
      /data-\[state/,
      /data-\[side/,
      /data-\[align/,
    ]
  },
  
  // Options d'optimisation
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  
  // Variables CSS à préserver
  variables: true,
  
  // Keyframes à préserver
  keyframes: true,
  
  // Rejeter les commentaires
  rejected: false,
  rejectedCss: false,
};
