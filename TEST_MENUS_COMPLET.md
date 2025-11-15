# 🔍 TEST COMPLET DES MENUS - Instructions

## 🎯 OBJECTIF

Diagnostiquer **EXACTEMENT** pourquoi le menu CONSOLE n'apparaît pas dans Google Sheets.

---

## 📋 ÉTAPE 1 : PUSH LE CODE

```bash
cd /chemin/vers/BASE-15-VIEUX-SCRIPTS
clasp push
```

**Résultat attendu :**
```
└─ Code.gs
└─ Initialisation.gs
└─ Structure.gs
└─ ...
Pushed XX files.
```

---

## 🧪 ÉTAPE 2 : EXÉCUTER LA FONCTION DE TEST

### **2.1 Ouvrir Apps Script**

```
Dans Google Sheets :
Extensions → Apps Script
```

### **2.2 Sélectionner testMenus**

```
Menu déroulant en haut → Chercher "testMenus"
```

### **2.3 Exécuter**

```
Cliquer ▶️ "Exécuter"
```

### **2.4 Autoriser si demandé**

```
1. Popup "Autorisation nécessaire"
2. Cliquer "Consulter les autorisations"
3. Choisir votre compte Google
4. Cliquer "Autoriser"
5. Ignorer avertissement "Application non vérifiée"
6. Cliquer "Accéder à ... (non sécurisé)"
```

---

## 📊 ÉTAPE 3 : CONSULTER LES LOGS

### **3.1 Ouvrir les logs**

```
Dans Apps Script :
View → Logs
OU
Ctrl+Enter
```

### **3.2 Analyser les résultats**

**Si TOUT fonctionne, vous verrez :**

```
=== TEST MENUS ===
Test 1: Exécution onOpen()...
onOpen() démarré
Menu CONSOLE créé
Menu LEGACY créé
onOpen() terminé avec succès
✅ onOpen() réussi
Test 2: Test showPanneauControle()...
Vérification fonction existe: function
✅ showPanneauControle existe
Test 3: Vérification PanneauControle.html...
✅ PanneauControle.html existe et peut être chargé
=== FIN TEST MENUS ===
```

**Si ERREUR, vous verrez :**

```
❌ onOpen() échoué: [MESSAGE ERREUR]
OU
❌ showPanneauControle problème: [MESSAGE ERREUR]
OU
❌ PanneauControle.html problème: Template PanneauControle not found
```

---

## 🔧 ÉTAPE 4 : SOLUTIONS SELON ERREUR

### **Erreur : "Template PanneauControle not found"**

**Cause :** Le fichier `PanneauControle.html` n'existe pas dans Apps Script

**Solution :**

```
1. Dans Apps Script : Fichiers → + → HTML
2. Nommer : "PanneauControle"
3. Copier contenu depuis GitHub :
   https://github.com/FredtoAlpha/BASE-15-VIEUX-SCRIPTS/blob/claude/essai-011CUxjaabobyj7vtTao9MkT/PanneauControle.html
4. Coller dans l'éditeur
5. Sauvegarder (Ctrl+S)
6. Re-exécuter testMenus
```

---

### **Erreur : "showPanneauControle is not defined"**

**Cause :** La fonction n'existe pas (impossible normalement)

**Solution :**

```
Vérifier que Code.gs contient bien :

function showPanneauControle() {
  try {
    Logger.log('showPanneauControle() appelée');
    const html = HtmlService.createHtmlOutputFromFile('PanneauControle')
      .setWidth(450)
      .setTitle('🎯 Panneau de Contrôle');
    Logger.log('HTML créé, affichage sidebar...');
    SpreadsheetApp.getUi().showSidebar(html);
    Logger.log('Sidebar affichée avec succès');
  } catch (error) {
    Logger.log('ERREUR dans showPanneauControle: ' + error.toString());
    SpreadsheetApp.getUi().alert('Erreur: ' + error.toString());
  }
}
```

---

### **Erreur : "Exception: You do not have permission to call..."**

**Cause :** Autorisations refusées

**Solution :**

```
1. Apps Script → Projet → Paramètres
2. Vérifier scopes dans appsscript.json
3. Ré-exécuter testMenus
4. Autoriser TOUTES les permissions
```

---

### **Pas d'erreur mais menu CONSOLE absent**

**Cause :** Script exécuté, mais menu pas affiché dans Sheets

**Solution :**

```
1. Retourner dans Google Sheets
2. Fermer COMPLÈTEMENT l'onglet
3. Rouvrir le fichier Sheets
4. Attendre 15 secondes
5. Vérifier barre de menu
```

**Si toujours absent :**

```
1. Vider cache navigateur (Ctrl+Shift+Del)
2. Fermer navigateur
3. Rouvrir en navigation privée
4. Ouvrir le fichier Sheets
5. Attendre 15 secondes
```

---

## 🎯 ÉTAPE 5 : EXÉCUTER onOpen MANUELLEMENT

Si `testMenus` réussit mais menu toujours absent :

```
1. Apps Script → Menu déroulant → "onOpen"
2. Cliquer ▶️ "Exécuter"
3. Voir logs (View > Logs)
4. Vérifier :
   - onOpen() démarré
   - Menu CONSOLE créé
   - Menu LEGACY créé
   - onOpen() terminé avec succès
5. Retour Sheets
6. F5 (recharger)
7. Attendre 15 secondes
8. Menu doit apparaître
```

---

## 📝 ÉTAPE 6 : RAPPORT

**Si ça marche :**

```
✅ Menu CONSOLE apparaît !
✅ Cliquer CONSOLE → Panneau de Contrôle
✅ Sidebar s'ouvre à droite
```

**Si ça ne marche toujours pas :**

**Envoyer ce rapport :**

```
1. Logs de testMenus (copier-coller)
2. Logs de onOpen (copier-coller)
3. Navigateur utilisé (Chrome/Firefox/Safari)
4. Système d'exploitation (Windows/Mac/Linux)
5. Compte Google (personnel/professionnel/éducation)
6. Screenshot de la barre de menu Sheets
```

---

## 🚀 FONCTION ALTERNATIVE : Menu minimal

Si le problème persiste, tester avec menu ultra-simple :

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('TEST')
    .addItem('Coucou', 'testFunction')
    .addToUi();
}

function testFunction() {
  SpreadsheetApp.getUi().alert('Ca marche !');
}
```

**Instructions :**

```
1. Remplacer onOpen() dans Code.gs par ce code
2. Sauvegarder
3. Exécuter onOpen
4. Retour Sheets → F5
5. Si menu TEST apparaît → Problème dans code original
6. Si menu TEST absent → Problème système/autorisations
```

---

## 📊 CHECKLIST COMPLÈTE

- [ ] Code pushé avec `clasp push`
- [ ] Fonction `testMenus` exécutée dans Apps Script
- [ ] Autorisations accordées
- [ ] Logs consultés (View → Logs)
- [ ] Tous tests ✅ (onOpen, showPanneauControle, PanneauControle.html)
- [ ] `onOpen` exécuté manuellement
- [ ] Sheets rechargé (`F5`)
- [ ] Attendu 15 secondes
- [ ] Cache vidé si nécessaire
- [ ] Navigation privée testée si nécessaire
- [ ] Menu CONSOLE apparaît dans Sheets

---

## 💡 ASTUCES

### **Logs en temps réel**

```
Dans Apps Script :
View → Logs → Laisser ouvert
Exécuter testMenus
Voir logs s'afficher en direct
```

### **Vérifier script lié**

```
1. Noter URL du fichier Sheets
2. Noter URL de Apps Script
3. Vérifier même ID projet
4. Si différent → Script non lié au bon fichier
```

### **Forcer refresh menu**

```
1. Apps Script → Exécuter onOpen
2. Sheets → F5
3. Attendre
4. Si absent → Cache navigateur
```

---

## 🎉 RÉSULTAT ATTENDU

**Quand tout fonctionne :**

```
Google Sheets ouvert
Barre de menu :
┌──────────────────────────────────────┐
│ Fichier  Édition  🎯 CONSOLE  ⚙️ LEGACY │
└──────────────────────────────────────┘

Cliquer CONSOLE :
├─ 📋 Panneau de Contrôle
├─ 🏗️ Initialiser Système
├─ 🆔 Générer NOM_PRENOM & ID
└─ ... (10 items total)

Cliquer "Panneau de Contrôle" :
→ Sidebar s'ouvre à droite
→ 6 sections accordéon
→ Interface complète opérationnelle
```

---

**Version :** 1.0
**Date :** 2025-11-09
**Auteur :** Claude
**Branche :** `claude/essai-011CUxjaabobyj7vtTao9MkT`
