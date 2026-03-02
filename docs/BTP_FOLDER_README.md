# Dossier BTP - Landing Page HTML Originale

## Contenu

Ce dossier contient le fichier HTML original de la landing page BTP qui a servi de base pour créer les composants React.

### Fichiers

- `kapta-index.html` - Landing page HTML statique complète (1581 lignes)

## Utilisation

Ce fichier HTML est conservé comme :
- ✅ **Référence de design** - Pour maintenir la cohérence visuelle
- ✅ **Backup** - Version standalone fonctionnelle
- ✅ **Template** - Base pour créer d'autres variantes HTML si nécessaire

## Conversion React

Ce fichier a été converti en composant React moderne :

**Fichier source :** `btp/kapta-index.html`  
**Fichier React :** `frontend/src/pages/BTP.js`

Pour plus de détails sur la conversion, consultez :
- `CONVERSION_HTML_TO_REACT.md` - Documentation complète de la conversion
- `GUIDE_LANDING_PAGES_METIERS.md` - Guide pour créer de nouvelles landing pages
- `LANDING_PAGES_METIERS_RESUME.md` - Résumé du projet

## Caractéristiques du fichier HTML

### Design
- Design moderne avec mode sombre/clair
- Animations CSS personnalisées
- Responsive mobile-first
- Typographie Bricolage Grotesque + Instrument Serif

### Sections
1. Navigation fixe avec toggle thème
2. Hero avec appel manqué animé
3. Ticker défilant
4. Section problème avec mockup Google Maps
5. Strip statistique (88%)
6. Solution en 3 piliers
7. Tableau comparatif
8. Témoignages SMS
9. Offre "Monopole Local BTP™"
10. Process en 5 étapes
11. CTA final avec formulaire
12. Footer

### Technologies utilisées
- HTML5 sémantique
- CSS3 avec variables CSS
- JavaScript vanilla
- Google Fonts (Bricolage Grotesque, Instrument Serif)
- Animations CSS natives

## Pourquoi conserver ce fichier ?

1. **Référence visuelle** - Le design original peut être consulté à tout moment
2. **Backup fonctionnel** - Version standalone qui fonctionne sans dépendances
3. **Comparaison** - Permet de comparer avec la version React
4. **Documentation** - Montre l'évolution du projet

## Utilisation standalone

Pour utiliser ce fichier HTML directement :

```bash
# Ouvrir dans un navigateur
open btp/kapta-index.html

# Ou avec un serveur local
cd btp
python3 -m http.server 8000
# Visitez http://localhost:8000/kapta-index.html
```

## Différences avec la version React

### Avantages de la version HTML
- ✅ Aucune dépendance
- ✅ Fonctionne partout
- ✅ Léger (un seul fichier)

### Avantages de la version React
- ✅ Maintenable et modulaire
- ✅ Réutilisable (composants)
- ✅ Intégré à l'application
- ✅ SEO optimisé
- ✅ Analytics intégré
- ✅ Routing dynamique

## Notes

- Ce fichier n'est **pas** utilisé en production
- La version React (`frontend/src/pages/BTP.js`) est la version active
- Ce fichier est conservé pour référence uniquement

## Voir aussi

- `../CONVERSION_HTML_TO_REACT.md` - Documentation de conversion
- `../GUIDE_LANDING_PAGES_METIERS.md` - Guide complet
- `../LANDING_PAGES_METIERS_RESUME.md` - Résumé du projet
- `../frontend/src/pages/BTP.js` - Version React active

---

**Statut :** 📦 Archivé (référence uniquement)  
**Version active :** `frontend/src/pages/BTP.js`  
**Date :** 25 février 2026
