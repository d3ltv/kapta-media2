# ✅ Test Google Analytics 4 - KAPTA Media

## 🎯 Configuration actuelle

**ID Google Analytics 4** : `G-4QS20YLNE2` ✅ Configuré

---

## 🧪 Comment tester que ça fonctionne

### Méthode 1 : Console du navigateur (Rapide)

1. **Ouvre ton site** : http://localhost:3000 (ou https://kaptamedia.fr)

2. **Ouvre la console** : 
   - Windows/Linux : `F12` ou `Ctrl + Shift + J`
   - Mac : `Cmd + Option + J`

3. **Active le mode debug** :
   ```javascript
   Analytics.enableDebugMode();
   ```

4. **Navigue sur le site** et tu verras des logs comme :
   ```
   ✅ Analytics initialized
   📊 CTA Click tracked: RÉSERVER MON AUDIT GRATUIT at Hero Section
   👁️ Section viewed: Mécanisme
   📞 Phone Click tracked: 06 86 01 80 54 from Footer
   ```

---

### Méthode 2 : Google Analytics DebugView (Recommandé)

1. **Va dans Google Analytics** : https://analytics.google.com/

2. **Sélectionne ta propriété** : KAPTA Media

3. **Va dans Admin** (roue dentée en bas à gauche)

4. **Clique sur DebugView** (dans la colonne de gauche)

5. **Ouvre ton site** dans un nouvel onglet

6. **Tu devrais voir en temps réel** :
   - 🟢 Un utilisateur actif (toi)
   - 📊 Événements qui se déclenchent :
     - `page_view`
     - `view_item` (vue du service)
     - `scroll` (quand tu scrolles)
     - `cta_click` (quand tu cliques sur un CTA)
     - `section_view` (quand tu vois une section)

---

### Méthode 3 : Google Tag Assistant (Extension Chrome)

1. **Installe l'extension** : [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

2. **Active-la** sur ton site (icône dans la barre d'outils)

3. **Clique sur "Enable"** puis **rafraîchis la page**

4. **Tu devrais voir** :
   - ✅ Google Analytics 4 : `G-4QS20YLNE2` détecté
   - ✅ Tags qui se déclenchent en vert

---

## 🎯 Événements à tester

### Test 1 : Page View
- ✅ **Action** : Charge la page
- ✅ **Événement attendu** : `page_view`
- ✅ **Où vérifier** : DebugView ou Console

### Test 2 : CTA Click
- ✅ **Action** : Clique sur "RÉSERVER MON AUDIT GRATUIT"
- ✅ **Événement attendu** : `cta_click` + `begin_checkout`
- ✅ **Où vérifier** : Console (tu verras "📊 CTA Click tracked")

### Test 3 : Scroll
- ✅ **Action** : Scrolle jusqu'à 50% de la page
- ✅ **Événement attendu** : `scroll` avec valeur 50
- ✅ **Où vérifier** : DebugView

### Test 4 : Phone Click
- ✅ **Action** : Clique sur le numéro de téléphone
- ✅ **Événement attendu** : `phone_click`
- ✅ **Où vérifier** : Console (tu verras "📞 Phone Click tracked")

### Test 5 : Section View
- ✅ **Action** : Scrolle pour voir différentes sections
- ✅ **Événement attendu** : `section_view`
- ✅ **Où vérifier** : Console (tu verras "👁️ Section viewed")

---

## 📊 Vérifier les données dans Google Analytics

### Après 24-48 heures

1. **Va dans Google Analytics** : https://analytics.google.com/

2. **Rapports** → **Temps réel**
   - Tu verras les utilisateurs actifs en ce moment
   - Les événements en temps réel

3. **Rapports** → **Engagement** → **Événements**
   - Tu verras tous les événements trackés :
     - `page_view`
     - `cta_click`
     - `phone_click`
     - `scroll`
     - `section_view`
     - `view_item`
     - `begin_checkout`

4. **Rapports** → **Acquisition** → **Acquisition de trafic**
   - Tu verras d'où viennent tes visiteurs :
     - Direct
     - Organic Search (Google)
     - Social
     - Referral

---

## 🐛 Problèmes courants

### "Je ne vois rien dans DebugView"

**Solutions** :
1. Vérifie que tu es sur le bon compte GA4
2. Rafraîchis la page DebugView
3. Ouvre ton site dans un nouvel onglet
4. Vérifie que tu n'as pas de bloqueur de pub (désactive-le pour ton site)

### "Les événements ne se déclenchent pas"

**Solutions** :
1. Ouvre la console (F12) et cherche des erreurs
2. Vérifie que `gtag` est défini : tape `typeof gtag` dans la console (doit retourner "function")
3. Active le mode debug : `Analytics.enableDebugMode()`
4. Vérifie que tu n'as pas de bloqueur de pub

### "Je vois des erreurs dans la console"

**Solutions** :
1. Vérifie que le fichier `analytics.js` est bien importé
2. Vérifie qu'il n'y a pas d'erreurs de syntaxe
3. Rafraîchis la page avec `Ctrl + F5` (vide le cache)

---

## ✅ Checklist de validation

- [ ] DebugView montre des événements en temps réel
- [ ] Console montre les logs de tracking
- [ ] Google Tag Assistant détecte GA4
- [ ] Événement `page_view` se déclenche au chargement
- [ ] Événement `cta_click` se déclenche au clic sur CTA
- [ ] Événement `scroll` se déclenche au scroll
- [ ] Pas d'erreurs dans la console

---

## 🎉 Prochaines étapes

Une fois que tout fonctionne :

1. **Laisse tourner 24-48h** pour collecter des données
2. **Analyse les rapports** dans Google Analytics
3. **Configure Google Ads** si tu veux lancer des campagnes
4. **Ajoute une bannière RGPD** pour être conforme

---

## 📞 Support

Si tu as des questions ou des problèmes :

1. **Vérifie la console** pour les erreurs
2. **Active le mode debug** : `Analytics.enableDebugMode()`
3. **Consulte la doc** : `GOOGLE_ANALYTICS_SETUP.md`

**Ton Google Analytics 4 est maintenant actif ! 🚀**
