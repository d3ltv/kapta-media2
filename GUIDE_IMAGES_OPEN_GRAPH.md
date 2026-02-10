# 🎨 Guide de Création des Images Open Graph - Kapta Media

## Qu'est-ce qu'une image Open Graph ?

C'est l'image qui s'affiche quand tu partages un lien sur :
- Facebook
- LinkedIn
- Twitter
- WhatsApp
- Slack
- Discord

**Exemple :** Quand tu partages https://kaptamedia.fr/blog/article1, l'image Open Graph s'affiche avec le titre et la description.

---

## 📐 Spécifications Techniques

### Dimensions
- **Largeur :** 1200px
- **Hauteur :** 630px
- **Ratio :** 1.91:1

### Format
- **Préféré :** JPG (meilleure compression)
- **Alternatif :** PNG (si transparence nécessaire)
- **Poids max :** 300KB (idéalement < 200KB)

### Zone de sécurité
- **Titre :** Centré, 80% de la largeur
- **Logo :** En haut à gauche ou en bas à droite
- **Texte :** Lisible même en petit (preview 400x210px)

---

## 🎨 Design Guidelines Kapta Media

### Couleurs
- **Primaire :** #1c3ff9 (Bleu Kapta)
- **Secondaire :** #6366f1 (Violet)
- **Accent :** #10B981 (Vert)
- **Fond :** Blanc ou dégradé léger
- **Texte :** #0A0A0A (Noir) ou blanc sur fond foncé

### Typographie
- **Titre :** Inter Bold, 60-80px
- **Sous-titre :** Inter Regular, 30-40px
- **Logo :** Toujours visible

### Éléments visuels
- Emoji ou icône en rapport avec le sujet
- Quadrillage subtil en arrière-plan (optionnel)
- Artefacts blur légers (optionnel)
- Ombre portée sur le texte pour la lisibilité

---

## 📋 Images à Créer

### 1. og-image.jpg (Image par défaut)
**Utilisation :** Page d'accueil + fallback

**Contenu :**
- Logo Kapta Media (grand)
- Titre : "Top Google Maps en 14 jours"
- Sous-titre : "Vidéo pro + Fiche optimisée"
- Emoji : 🎯 ou 🚀
- Fond : Dégradé bleu (#1c3ff9 → #6366f1)

### 2. og-article1.jpg
**Article :** 5 Raisons d'Optimiser Votre Fiche Google en 2026

**Contenu :**
- Titre : "5 Raisons d'Optimiser Votre Fiche Google"
- Sous-titre : "126% de clics en plus dans le top 3"
- Emoji : 🎯
- Badge : "Google Maps"
- Fond : Blanc avec quadrillage bleu subtil

### 3. og-article2.jpg
**Article :** Avis en Ligne : Pourquoi Sont-ils Essentiels ?

**Contenu :**
- Titre : "Avis en Ligne : Pourquoi Essentiels ?"
- Sous-titre : "81% des clients lisent les avis"
- Emoji : ⭐
- Badge : "Marketing Local"
- Fond : Blanc avec étoiles en arrière-plan

### 4. og-article3.jpg
**Article :** Le Pouvoir des Photos et Vidéos

**Contenu :**
- Titre : "Le Pouvoir des Photos et Vidéos"
- Sous-titre : "35% de clics en plus avec des visuels"
- Emoji : 📸
- Badge : "Vidéo"
- Fond : Dégradé léger avec icônes caméra

### 5. og-article4.jpg
**Article :** La Puissance du Copywriting

**Contenu :**
- Titre : "La Puissance du Copywriting"
- Sous-titre : "30% de conversions en plus"
- Emoji : ✍️
- Badge : "Conseils"
- Fond : Blanc avec lignes d'écriture stylisées

### 6. og-article5.jpg
**Article :** Comment Dépasser Vos Concurrents

**Contenu :**
- Titre : "Dépasser Vos Concurrents en 2026"
- Sous-titre : "5 clés pour dominer votre marché"
- Emoji : 🏆
- Badge : "Conseils"
- Fond : Dégradé or/bleu avec effet champion

---

## 🛠️ Outils Recommandés

### Option 1 : Canva (Le plus simple)
**Avantages :** Templates prêts, facile à utiliser, gratuit

**Étapes :**
1. Aller sur canva.com
2. Chercher "Open Graph" ou créer design personnalisé (1200x630px)
3. Utiliser les templates ou partir de zéro
4. Ajouter texte, logo, emoji
5. Télécharger en JPG (qualité 80%)

**Templates recommandés :**
- "Social Media Post"
- "Facebook Post"
- "LinkedIn Post"

### Option 2 : Figma (Plus professionnel)
**Avantages :** Contrôle total, composants réutilisables

**Étapes :**
1. Créer un frame 1200x630px
2. Créer un composant "OG Template"
3. Dupliquer pour chaque article
4. Exporter en JPG (2x pour la qualité)

### Option 3 : Photoshop (Le plus avancé)
**Avantages :** Effets avancés, retouche photo

**Étapes :**
1. Nouveau document 1200x630px, 72dpi
2. Créer les calques (fond, texte, logo)
3. Appliquer les effets
4. Enregistrer pour le web (JPG, qualité 80%)

---

## ✅ Checklist de Validation

Avant de publier une image Open Graph :

### Technique
- [ ] Dimensions exactes : 1200x630px
- [ ] Poids < 300KB
- [ ] Format JPG ou PNG
- [ ] Nom de fichier correct (og-image.jpg, og-article1.jpg, etc.)

### Design
- [ ] Logo Kapta Media visible
- [ ] Titre lisible (même en petit)
- [ ] Couleurs de la charte respectées
- [ ] Emoji ou icône présent
- [ ] Pas de texte coupé sur les bords

### Contenu
- [ ] Titre correspond à l'article
- [ ] Sous-titre accrocheur
- [ ] Badge catégorie (si article)
- [ ] Cohérent avec le branding Kapta

### Test
- [ ] Testé sur Facebook Debugger
- [ ] Testé sur Twitter Card Validator
- [ ] Testé sur LinkedIn Post Inspector
- [ ] Preview correct sur mobile

---

## 🧪 Tester les Images

### Facebook Debugger
1. Aller sur https://developers.facebook.com/tools/debug/
2. Entrer l'URL : https://kaptamedia.fr/blog/article1
3. Cliquer "Debug"
4. Vérifier l'image affichée
5. Si besoin, cliquer "Scrape Again" pour rafraîchir

### Twitter Card Validator
1. Aller sur https://cards-dev.twitter.com/validator
2. Entrer l'URL
3. Vérifier le preview
4. Ajuster si nécessaire

### LinkedIn Post Inspector
1. Aller sur https://www.linkedin.com/post-inspector/
2. Entrer l'URL
3. Vérifier le preview
4. Rafraîchir le cache si besoin

### Test Manuel
1. Partager le lien sur WhatsApp (à soi-même)
2. Vérifier que l'image s'affiche
3. Vérifier la qualité et la lisibilité

---

## 📦 Où Placer les Images

### Emplacement
Toutes les images doivent être dans :
```
frontend/public/
```

### Noms de fichiers
- `og-image.jpg` - Image par défaut
- `og-article1.jpg` - Article 1
- `og-article2.jpg` - Article 2
- `og-article3.jpg` - Article 3
- `og-article4.jpg` - Article 4
- `og-article5.jpg` - Article 5

### URLs finales
- https://kaptamedia.fr/og-image.jpg
- https://kaptamedia.fr/og-article1.jpg
- https://kaptamedia.fr/og-article2.jpg
- etc.

---

## 🎯 Exemples de Bonnes Pratiques

### ✅ BON
```
┌─────────────────────────────────────┐
│  [Logo]                             │
│                                     │
│     5 Raisons d'Optimiser          │
│     Votre Fiche Google             │
│                                     │
│     126% de clics en plus 🎯       │
│                                     │
│  [Google Maps]                      │
└─────────────────────────────────────┘
```
- Titre clair et lisible
- Chiffre accrocheur
- Emoji pertinent
- Badge catégorie
- Logo visible

### ❌ MAUVAIS
```
┌─────────────────────────────────────┐
│ Découvrez pourquoi il est important │
│ d'optimiser votre fiche Google      │
│ Business Profile en 2026 pour       │
│ améliorer votre visibilité locale   │
│ et attirer plus de clients dans     │
│ votre commerce à Tours et alentours │
└─────────────────────────────────────┘
```
- Trop de texte
- Pas de hiérarchie
- Pas d'élément visuel
- Illisible en petit

---

## 💡 Astuces Pro

### 1. Utiliser des Templates
Crée un template de base et duplique-le pour chaque article. Ça garantit la cohérence.

### 2. Tester en Petit
Réduis ton image à 400x210px pour voir si elle reste lisible. C'est la taille du preview sur mobile.

### 3. Contraste Élevé
Assure-toi que le texte se détache bien du fond. Utilise des ombres portées si nécessaire.

### 4. Emoji de Qualité
Utilise des emoji haute résolution ou des icônes vectorielles pour éviter le pixelisé.

### 5. Optimiser le Poids
Utilise TinyPNG ou Squoosh pour compresser les images sans perte de qualité visible.

### 6. Versionner
Garde les fichiers sources (PSD, Figma) pour pouvoir modifier facilement plus tard.

---

## 📞 Besoin d'Aide ?

Si tu as besoin d'aide pour créer les images :
- Fiverr : Cherche "Open Graph image design"
- Upwork : Cherche "Social media graphics"
- 99designs : Lance un concours
- Canva Pro : Utilise les templates premium

**Budget estimé :** 50-150€ pour les 6 images

---

**Dernière mise à jour : 10 Février 2025**
