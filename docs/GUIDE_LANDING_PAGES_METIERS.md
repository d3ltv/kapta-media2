# Guide : Landing Pages Personnalisées par Corps de Métier

## Vue d'ensemble

Ce guide explique comment créer des landing pages personnalisées pour chaque corps de métier que vous ciblez (plombiers, électriciens, cuisinistes, etc.).

## Structure mise en place

### Page BTP créée : `/btp`

Une landing page complète a été créée pour les artisans du BTP à l'URL `/btp`. Cette page sert de modèle pour créer d'autres landing pages personnalisées.

**Fichiers créés/modifiés :**
- `frontend/src/pages/BTP.js` - Composant React de la landing page
- `frontend/src/index.js` - Route ajoutée
- `frontend/scripts/generate-static-seo-pages.js` - Configuration SEO ajoutée

## Caractéristiques de la landing page BTP

### Sections incluses :
1. **Hero Section** - Accroche forte avec CTA principal
2. **Stats Section** - Statistiques clés (88%, ×4, 90 min)
3. **Problem Section** - Visualisation du problème (classement Google Maps)
4. **Solution Section** - Méthode GVA™ (Google · Vidéo · Avis)
5. **Pricing Section** - Offre "Monopole Local BTP™" à 1 250€
6. **Contact Section** - Formulaire + téléphone + WhatsApp
7. **Footer** - Navigation simple

### Éléments de conversion :
- ✅ Multiples CTA stratégiquement placés
- ✅ Formulaire de contact avec sélection de métier
- ✅ Téléphone cliquable avec tracking
- ✅ Lien WhatsApp direct
- ✅ Garantie "Chantier Signé"
- ✅ Animations Framer Motion
- ✅ Mode sombre/clair
- ✅ SEO optimisé

## Comment créer une nouvelle landing page

### Étape 1 : Dupliquer le composant

```bash
cp frontend/src/pages/BTP.js frontend/src/pages/Plombier.js
```

### Étape 2 : Personnaliser le contenu

Modifiez dans le nouveau fichier :

```javascript
// Changez le titre
<h1>
  Plombiers à Tours : Devenez{" "}
  <span className="text-[#1c3ff9]">N°1</span>
  <br />
  <span>sur Google Maps</span>
</h1>

// Adaptez la description
<p>
  Spécialiste de la visibilité locale pour <span>plombiers-chauffagistes</span> à Tours.
  Vidéo pro + fiche Google optimisée = Plus d'appels clients.
</p>

// Personnalisez les exemples
<div className="font-semibold">Martin Plomberie · Tours Nord</div>

// Ajustez le formulaire
<option>Plombier-chauffagiste</option>
<option>Plomberie générale</option>
<option>Chauffage et climatisation</option>
```

### Étape 3 : Ajouter la route

Dans `frontend/src/index.js` :

```javascript
// Import
const Plombier = lazy(() => import("@/pages/Plombier"));

// Route
<Route path="/plombier" element={<Plombier />} />
```

### Étape 4 : Configurer le SEO

Dans `frontend/scripts/generate-static-seo-pages.js` :

```javascript
{
  route: "/plombier",
  title: "Plombiers Tours - Visibilité Google Maps | Kapta Media",
  description: "Spécialiste du marketing local pour plombiers à Tours. Vidéo pro + fiche Google optimisée. Devenez N°1 sur Google Maps. Audit gratuit sous 48h.",
  keywords: "plombier tours, plombier chauffagiste tours, google maps plombier, marketing local plombier, visibilité locale plomberie",
  type: "website",
}
```

### Étape 5 : Tester

```bash
cd frontend
npm start
```

Visitez : `http://localhost:3000/plombier`

## Landing pages suggérées

### Par métier :
- `/plombier` - Plombiers-chauffagistes
- `/electricien` - Électriciens
- `/cuisiniste` - Cuisinistes
- `/pisciniste` - Piscinistes
- `/pompe-chaleur` - Installateurs PAC
- `/menuisier` - Menuisiers
- `/peintre` - Peintres en bâtiment
- `/carreleur` - Carreleurs

### Par zone géographique :
- `/tours-nord` - Secteur Tours Nord
- `/joue-les-tours` - Joué-lès-Tours
- `/saint-cyr` - Saint-Cyr-sur-Loire
- `/fondettes` - Fondettes

### Par combinaison :
- `/plombier-tours-nord`
- `/electricien-joue-les-tours`

## Personnalisation avancée

### Témoignages spécifiques

Ajoutez des témoignages réels d'artisans du métier ciblé :

```javascript
const testimonials = [
  {
    name: "Mathieu B.",
    job: "Plombier-chauffagiste · Joué-lès-Tours",
    text: "J'avais 2-3 appels par semaine depuis Google. Maintenant j'en ai entre 10 et 15.",
    avatar: "MB"
  }
];
```

### Images métier

Remplacez les mockups génériques par des visuels spécifiques :

```javascript
<img 
  src="/images/plombier-chantier.webp" 
  alt="Plombier en intervention à Tours"
/>
```

### Offres spécifiques

Adaptez le pricing selon le métier :

```javascript
// Pour les cuisinistes (ticket moyen plus élevé)
<div className="text-4xl font-bold">2 500 €</div>

// Pour les électriciens (ticket moyen standard)
<div className="text-4xl font-bold">1 250 €</div>
```

## Tracking Analytics

Chaque landing page track automatiquement :
- Page views : `Analytics.trackPageView("/plombier")`
- CTA clicks : `Analytics.trackCTAClick("AUDIT GRATUIT PLOMBIER", "Hero Plombier")`
- Phone clicks : `Analytics.trackPhoneClick("06 86 01 80 54", "Plombier Landing Page")`

## SEO et Performance

### Optimisations incluses :
- ✅ Meta tags personnalisés par page
- ✅ Canonical URL
- ✅ Open Graph tags
- ✅ Schema.org markup
- ✅ Lazy loading des composants
- ✅ Images optimisées WebP
- ✅ Animations performantes (Framer Motion)

### Génération des pages statiques

Après avoir ajouté une nouvelle page, régénérez les pages SEO :

```bash
cd frontend
npm run build
node scripts/generate-static-seo-pages.js
```

## Déploiement

### Vercel (recommandé)

Les routes sont automatiquement gérées par React Router. Aucune configuration supplémentaire nécessaire.

### Build de production

```bash
cd frontend
npm run build
```

Les pages seront générées dans `frontend/build/` avec leurs dossiers respectifs :
- `build/btp/index.html`
- `build/plombier/index.html`
- etc.

## Maintenance

### Mise à jour globale

Pour mettre à jour toutes les landing pages en même temps :

1. Modifiez le composant de base (BTP.js)
2. Créez un script de génération automatique
3. Ou utilisez un composant partagé avec props

### Exemple de composant partagé :

```javascript
// frontend/src/pages/LandingPageMetier.js
const LandingPageMetier = ({ metier, config }) => {
  // Logique commune
  // Contenu personnalisé via config
};

// frontend/src/pages/Plombier.js
import LandingPageMetier from './LandingPageMetier';

const Plombier = () => (
  <LandingPageMetier 
    metier="plombier"
    config={{
      title: "Plombiers à Tours",
      description: "...",
      testimonials: [...]
    }}
  />
);
```

## Checklist de création

- [ ] Dupliquer le fichier BTP.js
- [ ] Personnaliser le contenu (titres, descriptions, exemples)
- [ ] Ajouter la route dans index.js
- [ ] Configurer le SEO dans generate-static-seo-pages.js
- [ ] Tester en local
- [ ] Vérifier les diagnostics (pas d'erreurs)
- [ ] Générer les pages statiques
- [ ] Déployer
- [ ] Tester en production
- [ ] Vérifier le tracking Analytics

## Support

Pour toute question sur la création de landing pages personnalisées, consultez :
- La page BTP existante : `frontend/src/pages/BTP.js`
- Ce guide
- La documentation React Router
- La documentation Framer Motion

---

**Créé le :** 25 février 2026  
**Dernière mise à jour :** 25 février 2026
