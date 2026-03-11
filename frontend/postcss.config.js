module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Optimisations CSS en production
    ...(process.env.NODE_ENV === 'production' ? {
      'postcss-combine-duplicated-selectors': {
        removeDuplicatedProperties: true
      },
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          colormin: true,
          minifyFontValues: true,
          minifyGradients: true,
          reduceTransforms: true,
          svgo: true,
        }]
      }
    } : {})
  },
}
