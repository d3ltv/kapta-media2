# Quick Start - Landing Pages Métiers

## ✅ Ce qui est fait

Deux landing pages sont opérationnelles :
- `/btp` - Landing page générique artisans BTP
- `/plombier` - Landing page spécifique plombiers

## 🚀 Créer une nouvelle landing page (5 minutes)

### 1. Dupliquer
```bash
cp frontend/src/pages/BTP.js frontend/src/pages/Electricien.js
```

### 2. Personnaliser le fichier
Ouvrir `frontend/src/pages/Electricien.js` et modifier :

```javascript
// Ligne ~10 : Nom du composant
const Electricien = () => {

// Ligne ~18 : Tracking
Analytics.trackPageView("/electricien");

// Ligne ~25 : SEO
title="Électriciens Tours - Visibilité Google Maps | Kapta Media"
canonicalUrl="https://kapta-media.fr/electricien"

// Ligne ~45 : Badge
<span>Spécialiste Électriciens à Tours</span>

// Ligne ~55 : Titre H1
<h1>
  Électriciens à Tours :{" "}
  <span className="text-[#1c3ff9]">Devenez N°1</span>
  <br />
  <span>sur Google Maps</span>
</h1>

// Dernière ligne : Export
export default Electricien;
```

### 3. Ajouter la route
Dans `frontend/src/index.js` :

```javascript
// Ligne ~9 : Import
const Electricien = lazy(() => import("@/pages/Electricien"));

// Ligne ~42 : Route
<Route path="/electricien" element={<Electricien />} />
```

### 4. Configurer le SEO
Dans `frontend/scripts/generate-static-seo-pages.js` :

```javascript
// Après la config /plombier, ajouter :
{
  route: "/electricien",
  title: "Électriciens Tours - Visibilité Google Maps | Kapta Media",
  description: "Spécialiste du marketing local pour électriciens à Tours...",
  keywords: "electricien tours, google maps electricien, ...",
  type: "website",
},
```

### 5. Tester
```bash
cd frontend
npm start
# Visitez http://localhost:3000/electricien
```

## 📋 Landing pages à créer (priorité)

1. `/electricien` - Électriciens
2. `/cuisiniste` - Cuisinistes
3. `/pisciniste` - Piscinistes
4. `/pompe-chaleur` - Installateurs PAC

## 📚 Documentation complète

- `GUIDE_LANDING_PAGES_METIERS.md` - Guide détaillé
- `LANDING_PAGES_METIERS_RESUME.md` - Résumé complet
- `URLS_LANDING_PAGES.md` - Liste de toutes les URLs
- `CONVERSION_HTML_TO_REACT.md` - Documentation technique

## 🎯 Résultat

Chaque landing page inclut :
- ✅ Design professionnel responsive
- ✅ Formulaire de contact
- ✅ Téléphone + WhatsApp cliquables
- ✅ Tracking Analytics
- ✅ SEO optimisé
- ✅ Mode sombre/clair

## 💡 Astuce

Pour créer rapidement plusieurs pages :

```bash
# Créer 3 pages d'un coup
for metier in electricien cuisiniste pisciniste; do
  cp frontend/src/pages/BTP.js frontend/src/pages/${metier^}.js
done
```

Puis personnaliser chaque fichier selon le métier.

---

**Temps estimé par page :** 5-10 minutes  
**Pages actives :** 2 (/btp, /plombier)  
**Prêt à créer :** Toutes les autres pages métiers
