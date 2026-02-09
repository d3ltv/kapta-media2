# 📊 Configuration Google Analytics & Google Ads - KAPTA Media

## 🎯 Vue d'ensemble

Ce guide explique comment configurer Google Analytics 4 (GA4) et Google Ads pour tracker les conversions et optimiser les campagnes publicitaires de kaptamedia.fr.

---

## 📋 Prérequis

- [ ] Compte Google Analytics 4 créé
- [ ] Compte Google Ads créé (optionnel mais recommandé)
- [ ] Accès administrateur au site web
- [ ] Accès au code source

---

## 🚀 Étape 1 : Configuration Google Analytics 4

### 1.1 Créer une propriété GA4

1. Va sur [Google Analytics](https://analytics.google.com/)
2. Clique sur **Admin** (roue dentée en bas à gauche)
3. Clique sur **Créer une propriété**
4. Remplis les informations :
   - **Nom de la propriété** : KAPTA Media
   - **Fuseau horaire** : (GMT+01:00) Paris
   - **Devise** : Euro (EUR)
5. Clique sur **Suivant** puis **Créer**

### 1.2 Récupérer l'ID de mesure

1. Dans **Admin** → **Flux de données**
2. Clique sur ton flux de données web
3. Copie l'**ID de mesure** (format : `G-XXXXXXXXXX`)

### 1.3 Configurer dans le code

Ouvre `frontend/public/index.html` et remplace :

```html
<!-- Ligne 56 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>

<!-- Ligne 62 -->
gtag('config', 'G-XXXXXXXXXX', {
```

Par ton vrai ID de mesure.

Ouvre aussi `frontend/src/utils/analytics.js` et remplace :

```javascript
// Ligne 10
GA4_ID: 'G-XXXXXXXXXX', // Remplace par ton ID GA4
```

---

## 💰 Étape 2 : Configuration Google Ads (Optionnel)

### 2.1 Créer un compte Google Ads

1. Va sur [Google Ads](https://ads.google.com/)
2. Crée un compte si tu n'en as pas
3. Configure ton premier compte publicitaire

### 2.2 Récupérer l'ID de conversion

1. Dans Google Ads, va dans **Outils et paramètres** → **Mesure** → **Conversions**
2. Clique sur **+ Nouvelle action de conversion**
3. Sélectionne **Site web**
4. Configure les conversions suivantes :

#### Conversion 1 : Demande d'audit gratuit
- **Nom** : Demande d'audit gratuit
- **Catégorie** : Génération de prospects
- **Valeur** : 350 EUR (valeur du service)
- **Comptage** : Une seule fois

#### Conversion 2 : Clic sur téléphone
- **Nom** : Clic téléphone
- **Catégorie** : Contact
- **Valeur** : 1 EUR
- **Comptage** : Chaque fois

#### Conversion 3 : Ouverture Calendly
- **Nom** : Ouverture calendrier
- **Catégorie** : Engagement
- **Valeur** : 1 EUR
- **Comptage** : Une seule fois

5. Pour chaque conversion, copie le **Label de conversion** (format : `xxxxx`)

### 2.3 Configurer dans le code

Ouvre `frontend/public/index.html` et remplace :

```html
<!-- Ligne 68 -->
gtag('config', 'AW-XXXXXXXXXX');

<!-- Ligne 74 -->
'send_to': 'AW-XXXXXXXXXX/' + conversionLabel,
```

Ouvre `frontend/src/utils/analytics.js` et remplace :

```javascript
// Ligne 11
GOOGLE_ADS_ID: 'AW-XXXXXXXXXX', // Remplace par ton ID Google Ads

// Lignes 14-18
CONVERSION_LABELS: {
  AUDIT_REQUEST: 'xxxxx', // Label de la conversion "Demande d'audit"
  PHONE_CLICK: 'xxxxx',   // Label de la conversion "Clic téléphone"
  CALENDLY_OPEN: 'xxxxx', // Label de la conversion "Ouverture calendrier"
  FORM_SUBMIT: 'xxxxx',   // Label de la conversion "Formulaire"
}
```

---

## 📈 Étape 3 : Événements trackés automatiquement

### Événements de base
- ✅ **Page view** : Chaque chargement de page
- ✅ **Scroll depth** : 25%, 50%, 75%, 90%
- ✅ **Section view** : Quand une section entre dans le viewport

### Événements de conversion
- 🎯 **generate_lead** : Demande d'audit gratuit
- 📞 **phone_click** : Clic sur le numéro de téléphone
- 📅 **calendly_open** : Ouverture du calendrier Calendly
- 💬 **whatsapp_click** : Clic sur WhatsApp

### Événements d'engagement
- 🖱️ **cta_click** : Clic sur tous les CTA
- 📺 **video_play/pause** : Interactions vidéo
- ❓ **faq_click** : Ouverture d'une question FAQ
- 🔄 **slider_swipe** : Interaction avec le slider avant/après
- 🧭 **menu_click** : Navigation dans le menu

### E-commerce (pour Google Ads)
- 👁️ **view_item** : Vue du service (page chargée)
- 🛒 **add_to_cart** : Intérêt pour le service
- 💳 **begin_checkout** : Début du processus de conversion

---

## 🧪 Étape 4 : Tester la configuration

### 4.1 Mode Debug

Ouvre la console du navigateur (F12) et tape :

```javascript
Analytics.enableDebugMode();
```

Tu verras tous les événements trackés en temps réel.

### 4.2 Google Analytics DebugView

1. Va dans Google Analytics
2. **Admin** → **DebugView**
3. Navigue sur ton site
4. Vérifie que les événements apparaissent en temps réel

### 4.3 Google Tag Assistant

1. Installe l'extension [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Active-la sur ton site
3. Vérifie que les tags GA4 et Google Ads se déclenchent

---

## 📊 Étape 5 : Créer des rapports personnalisés

### Dans Google Analytics 4

1. Va dans **Rapports** → **Bibliothèque**
2. Crée un rapport personnalisé avec :
   - **Conversions par source** : D'où viennent tes leads
   - **Parcours utilisateur** : Comment les visiteurs naviguent
   - **Engagement par section** : Quelles sections performent le mieux

### Dans Google Ads

1. Va dans **Rapports** → **Conversions**
2. Analyse :
   - **Taux de conversion** par campagne
   - **Coût par conversion**
   - **ROI** de chaque campagne

---

## 🎯 Étape 6 : Optimiser les campagnes Google Ads

### Audiences recommandées

1. **Remarketing** : Visiteurs qui n'ont pas converti
2. **Lookalike** : Audiences similaires aux convertis
3. **Géographique** : Focus sur Tours et environs

### Mots-clés recommandés

**Haute intention :**
- "optimisation google maps tours"
- "vidéo professionnelle commerce tours"
- "référencement local tours"
- "fiche google business tours"

**Longue traîne :**
- "comment être premier sur google maps"
- "améliorer visibilité google maps"
- "vidéo pour google business"

### Extensions d'annonces

- ✅ **Liens annexes** : Mécanisme, Tarifs, FAQ
- ✅ **Accroches** : "Top Google Maps en 14 jours", "Garantie satisfait ou remboursé"
- ✅ **Extraits structurés** : Services (Vidéo, Photos, Optimisation, NFC)
- ✅ **Appel** : 06 86 01 80 54

---

## 🔒 Étape 7 : Conformité RGPD

### Bannière de consentement (à ajouter)

Tu dois ajouter une bannière de consentement pour être conforme au RGPD. Recommandations :

1. **Cookiebot** (gratuit jusqu'à 100 pages)
2. **Axeptio** (français, UX excellente)
3. **Tarteaucitron.js** (open source, gratuit)

### Configuration minimale

```javascript
// Attendre le consentement avant d'initialiser GA4
window.addEventListener('consent-granted', () => {
  Analytics.initAnalytics();
});
```

---

## 📞 Support

Si tu as des questions sur la configuration :

1. **Documentation GA4** : https://support.google.com/analytics/answer/9304153
2. **Documentation Google Ads** : https://support.google.com/google-ads/answer/6331314
3. **Console du site** : Tape `Analytics.enableDebugMode()` pour voir les logs

---

## ✅ Checklist finale

- [ ] ID Google Analytics 4 configuré dans `index.html`
- [ ] ID Google Analytics 4 configuré dans `analytics.js`
- [ ] ID Google Ads configuré (si applicable)
- [ ] Labels de conversion configurés
- [ ] Tests effectués avec DebugView
- [ ] Rapports personnalisés créés
- [ ] Bannière RGPD ajoutée
- [ ] Campagnes Google Ads lancées

---

**🚀 Ton site est maintenant prêt pour tracker les conversions et optimiser tes campagnes publicitaires !**
