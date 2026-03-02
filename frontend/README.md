# KAPTA Media - Frontend

Application React pour le site web de KAPTA Media.

## 🚀 Démarrage

```bash
# Installation des dépendances
yarn install

# Lancer le serveur de développement
yarn start
# → http://localhost:3000

# Build de production
yarn build

# Analyser la taille du bundle
yarn analyze
```

## 📦 Technologies

- **React 19** - Framework UI
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Composants accessibles
- **Lucide React** - Icônes
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation

## 📁 Structure

```
src/
├── components/     # Composants réutilisables
│   ├── ui/        # Composants UI (Radix)
│   ├── SEOHead.jsx
│   └── ThemeToggle.jsx
├── pages/         # Pages/Routes
│   ├── Blog.jsx
│   ├── BTP.jsx
│   ├── Plombier.jsx
│   └── blog/      # Articles de blog
├── hooks/         # Custom hooks
├── utils/         # Utilitaires
├── App.js         # Page d'accueil
└── index.js       # Point d'entrée

public/
├── index.html     # Template HTML avec fallback sans JS
├── sitemap.xml    # Sitemap SEO
└── assets/        # Images, fonts, etc.
```

## 🎨 Features

- ✅ Design responsive mobile-first
- ✅ Mode sombre/clair
- ✅ Animations fluides (Framer Motion)
- ✅ SEO optimisé (meta tags, sitemap, structured data)
- ✅ Performance optimisée (lazy loading, code splitting)
- ✅ Fallback HTML statique sans JavaScript
- ✅ Analytics (Google Analytics, Clarity)
- ✅ Accessibilité (ARIA, keyboard navigation)

## 🔧 Scripts

- `yarn start` - Dev server avec hot reload
- `yarn build` - Build optimisé pour production
- `yarn test` - Lancer les tests
- `yarn analyze` - Analyser la taille du bundle

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle size optimisé avec code splitting

## 🌐 Déploiement

Le site est déployé sur Vercel avec CI/CD automatique.

```bash
# Déployer en production
vercel --prod
```

## 📚 Documentation

Voir `/docs/` à la racine du projet pour la documentation complète.
