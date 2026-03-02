# URLs des Landing Pages - Kapta Media

## Landing Pages Actives

### Pages Métiers

#### BTP (Générique)
- **URL :** https://kapta-media.fr/btp
- **Cible :** Tous les artisans du BTP
- **Statut :** ✅ Actif
- **Fichier :** `frontend/src/pages/BTP.js`

#### Plombiers
- **URL :** https://kapta-media.fr/plombier
- **Cible :** Plombiers-chauffagistes
- **Statut :** ✅ Actif
- **Fichier :** `frontend/src/pages/Plombier.js`

## Landing Pages à Créer

### Priorité Haute

#### Électriciens
- **URL :** https://kapta-media.fr/electricien
- **Cible :** Électriciens
- **Statut :** ⏳ À créer
- **Action :** Dupliquer `BTP.js` et personnaliser

#### Cuisinistes
- **URL :** https://kapta-media.fr/cuisiniste
- **Cible :** Cuisinistes
- **Statut :** ⏳ À créer
- **Action :** Dupliquer `BTP.js` et personnaliser

#### Piscinistes
- **URL :** https://kapta-media.fr/pisciniste
- **Cible :** Piscinistes
- **Statut :** ⏳ À créer
- **Action :** Dupliquer `BTP.js` et personnaliser

#### Pompes à Chaleur
- **URL :** https://kapta-media.fr/pompe-chaleur
- **Cible :** Installateurs de pompes à chaleur
- **Statut :** ⏳ À créer
- **Action :** Dupliquer `BTP.js` et personnaliser

### Priorité Moyenne

#### Menuisiers
- **URL :** https://kapta-media.fr/menuisier
- **Cible :** Menuisiers
- **Statut :** ⏳ À créer

#### Peintres
- **URL :** https://kapta-media.fr/peintre
- **Cible :** Peintres en bâtiment
- **Statut :** ⏳ À créer

#### Carreleurs
- **URL :** https://kapta-media.fr/carreleur
- **Cible :** Carreleurs
- **Statut :** ⏳ À créer

#### Maçons
- **URL :** https://kapta-media.fr/macon
- **Cible :** Maçons
- **Statut :** ⏳ À créer

### Priorité Basse

#### Couvreurs
- **URL :** https://kapta-media.fr/couvreur
- **Cible :** Couvreurs
- **Statut :** ⏳ À créer

#### Charpentiers
- **URL :** https://kapta-media.fr/charpentier
- **Cible :** Charpentiers
- **Statut :** ⏳ À créer

## Landing Pages Géographiques

### Secteurs de Tours

#### Tours Nord
- **URL :** https://kapta-media.fr/tours-nord
- **Cible :** Artisans secteur Tours Nord
- **Statut :** ⏳ À créer

#### Joué-lès-Tours
- **URL :** https://kapta-media.fr/joue-les-tours
- **Cible :** Artisans Joué-lès-Tours
- **Statut :** ⏳ À créer

#### Saint-Cyr-sur-Loire
- **URL :** https://kapta-media.fr/saint-cyr
- **Cible :** Artisans Saint-Cyr-sur-Loire
- **Statut :** ⏳ À créer

#### Fondettes
- **URL :** https://kapta-media.fr/fondettes
- **Cible :** Artisans Fondettes
- **Statut :** ⏳ À créer

## Landing Pages Combinées

### Métier + Géographie

#### Plombier Tours Nord
- **URL :** https://kapta-media.fr/plombier-tours-nord
- **Cible :** Plombiers secteur Tours Nord
- **Statut :** ⏳ À créer

#### Électricien Joué-lès-Tours
- **URL :** https://kapta-media.fr/electricien-joue-les-tours
- **Cible :** Électriciens Joué-lès-Tours
- **Statut :** ⏳ À créer

#### Cuisiniste Saint-Cyr
- **URL :** https://kapta-media.fr/cuisiniste-saint-cyr
- **Cible :** Cuisinistes Saint-Cyr-sur-Loire
- **Statut :** ⏳ À créer

## Pages Principales (Existantes)

### Accueil
- **URL :** https://kapta-media.fr/
- **Statut :** ✅ Actif
- **Fichier :** `frontend/src/App.js`

### Blog
- **URL :** https://kapta-media.fr/blog
- **Statut :** ✅ Actif
- **Fichier :** `frontend/src/pages/Blog.js`

### Articles de Blog
- https://kapta-media.fr/blog/article1 ✅
- https://kapta-media.fr/blog/article2 ✅
- https://kapta-media.fr/blog/article3 ✅
- https://kapta-media.fr/blog/article4 ✅
- https://kapta-media.fr/blog/article5 ✅
- https://kapta-media.fr/blog/article6 ✅
- https://kapta-media.fr/blog/article7 ✅
- https://kapta-media.fr/blog/article8 ✅
- https://kapta-media.fr/blog/article9 ✅
- https://kapta-media.fr/blog/article10 ✅
- https://kapta-media.fr/blog/article11 ✅
- https://kapta-media.fr/blog/article12 ✅

## Structure des URLs

### Convention de nommage

```
Métier seul : /[metier]
Exemple : /plombier, /electricien

Géographie seule : /[ville]
Exemple : /tours-nord, /joue-les-tours

Métier + Géographie : /[metier]-[ville]
Exemple : /plombier-tours-nord
```

### Règles
- ✅ Tout en minuscules
- ✅ Tirets pour les espaces
- ✅ Pas d'accents dans les URLs
- ✅ Court et descriptif
- ✅ SEO-friendly

## Checklist de création d'URL

Pour chaque nouvelle landing page :

- [ ] Choisir l'URL selon la convention
- [ ] Créer le composant React
- [ ] Ajouter la route dans `index.js`
- [ ] Configurer le SEO dans `generate-static-seo-pages.js`
- [ ] Tester en local
- [ ] Vérifier le SEO (meta tags, canonical)
- [ ] Déployer
- [ ] Tester en production
- [ ] Ajouter à ce fichier

## Statistiques

### Pages actives
- **Total :** 15 pages
- **Landing pages métiers :** 2 (/btp, /plombier)
- **Blog :** 1 page principale + 12 articles
- **Accueil :** 1 page

### Pages à créer
- **Priorité haute :** 4 pages
- **Priorité moyenne :** 4 pages
- **Priorité basse :** 2 pages
- **Géographiques :** 4 pages
- **Combinées :** 3 pages
- **Total :** 17 pages

### Objectif
- **Court terme (1 mois) :** 8 landing pages métiers
- **Moyen terme (3 mois) :** 15 landing pages métiers + 4 géographiques
- **Long terme (6 mois) :** Toutes les combinaisons pertinentes

## Notes

### SEO
- Chaque URL a ses propres meta tags
- Canonical URL défini pour éviter le duplicate content
- Sitemap généré automatiquement

### Analytics
- Chaque page track les visites
- CTAs trackés individuellement
- Conversions mesurées par page

### Performance
- Lazy loading des composants
- Code splitting automatique
- Images optimisées

## Commandes utiles

### Tester une URL en local
```bash
cd frontend
npm start
# Visitez http://localhost:3000/[url]
```

### Générer les pages SEO
```bash
cd frontend
node scripts/generate-static-seo-pages.js
```

### Vérifier les routes
```bash
# Voir toutes les routes dans index.js
cat frontend/src/index.js | grep "path="
```

## Voir aussi

- `GUIDE_LANDING_PAGES_METIERS.md` - Guide complet
- `LANDING_PAGES_METIERS_RESUME.md` - Résumé
- `CONVERSION_HTML_TO_REACT.md` - Documentation technique

---

**Dernière mise à jour :** 25 février 2026  
**Pages actives :** 15  
**Pages à créer :** 17  
**Statut :** 🚀 En expansion
