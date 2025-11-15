# 🔧 DÉBOGAGE - Menu CONSOLE n'apparaît pas

## ⚠️ PROBLÈME

Le menu **🎯 CONSOLE** n'apparaît pas dans Google Sheets après déploiement.

---

## ✅ VÉRIFICATIONS RAPIDES

### 1. **Recharger la page**
```
Appuyez sur F5 ou Ctrl+R
Attendez 10 secondes
```

### 2. **Script lié au bon fichier ?**
```
Dans Google Sheets :
Extensions → Apps Script
→ Vérifier que vous êtes dans le BON projet
→ Vérifier que Code.gs contient bien la fonction onOpen()
```

### 3. **Autorisations accordées ?**
```
Première fois : une popup demande autorisation
Si refusée → menu ne s'affiche pas

Solution :
1. Apps Script → Exécuter → onOpen
2. Autoriser toutes permissions
3. Retour Sheets → F5
```

---

## 🐛 TEST MANUEL

### **Exécuter onOpen() manuellement**

1. **Ouvrir Apps Script** : Extensions → Apps Script
2. **Sélectionner fonction** : En haut, menu déroulant → choisir `onOpen`
3. **Exécuter** : Cliquer bouton ▶️ "Exécuter"
4. **Vérifier logs** :
   - Si **erreur** → Lire message et corriger
   - Si **succès** → Retour Sheets et F5

### **Erreurs possibles :**

#### ❌ Erreur : "showPanneauControle is not defined"
**Cause :** Fonction manquante
**Solution :**
```javascript
// Ajouter dans Code.gs si manquant :
function showPanneauControle() {
  const html = HtmlService.createHtmlOutputFromFile('PanneauControle')
    .setWidth(450)
    .setTitle('🎯 Panneau de Contrôle');
  SpreadsheetApp.getUi().showSidebar(html);
}
```

#### ❌ Erreur : "PanneauControle.html not found"
**Cause :** Fichier HTML manquant
**Solution :**
- Vérifier que `PanneauControle.html` existe dans Apps Script
- Le créer si absent (voir fichier dans GitHub)

#### ❌ Pas d'erreur mais menu absent
**Cause :** Cache navigateur ou problème UI
**Solution :**
1. Vider cache navigateur (`Ctrl+Shift+Del`)
2. Ouvrir en navigation privée
3. Essayer autre navigateur (Chrome/Firefox)

---

## 🔧 SOLUTION ALTERNATIVE : Menu sans emoji

Si les emojis posent problème, version simplifiée :

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  // Menu CONSOLE (sans emoji si problème)
  ui.createMenu('CONSOLE')
    .addItem('Panneau de Controle', 'showPanneauControle')
    .addSeparator()
    .addItem('Initialiser Systeme', 'ouvrirInitialisation')
    .addItem('Generer ID', 'genererNomPrenomEtID')
    .addItem('Listes Deroulantes', 'ajouterListesDeroulantes')
    .addSeparator()
    .addItem('COMPTER Sources', 'compterEffectifsOptionsEtLangues')
    .addItem('COMPTER Test', 'compterEffectifsOptionsEtLanguesTest')
    .addSeparator()
    .addItem('Consolider', 'consoliderDonnees')
    .addItem('Verifier Donnees', 'verifierDonnees')
    .addSeparator()
    .addItem('Config Structure', 'ouvrirConfigurationStructure')
    .addItem('Config Complete', 'ouvrirConfigurationComplete')
    .addToUi();

  // Menu LEGACY
  ui.createMenu('LEGACY')
    .addItem('Voir Classes Sources', 'legacy_viewSourceClasses')
    .addItem('Configurer STRUCTURE', 'legacy_openStructure')
    .addSeparator()
    .addItem('Creer Onglets TEST', 'legacy_runFullPipeline')
    .addSeparator()
    .addSubMenu(ui.createMenu('Phases')
      .addItem('Phase 1', 'legacy_runPhase1')
      .addItem('Phase 2', 'legacy_runPhase2')
      .addItem('Phase 3', 'legacy_runPhase3')
      .addItem('Phase 4', 'legacy_runPhase4'))
    .addSeparator()
    .addItem('Voir Resultats TEST', 'legacy_viewTestResults')
    .addToUi();
}
```

---

## 📋 CHECKLIST DE DÉBOGAGE

- [ ] Recharger page Google Sheets (`F5`)
- [ ] Attendre 10-15 secondes
- [ ] Vérifier Apps Script lié au bon fichier
- [ ] Exécuter `onOpen` manuellement dans Apps Script
- [ ] Vérifier aucune erreur dans logs
- [ ] Autoriser toutes permissions si demandé
- [ ] Vérifier que `PanneauControle.html` existe
- [ ] Vérifier que `showPanneauControle()` existe
- [ ] Essayer en navigation privée
- [ ] Vider cache navigateur
- [ ] Essayer autre navigateur

---

## 🎯 TEST SIMPLE

**Fonction de test minimaliste :**

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
1. Remplacer temporairement `onOpen()` par ce code
2. Exécuter dans Apps Script
3. Retour Sheets → F5
4. Si menu "TEST" apparaît → Script fonctionne, problème ailleurs
5. Si menu "TEST" n'apparaît pas → Problème d'autorisation ou script non lié

---

## 💡 SOLUTIONS SELON ERREUR

### **Si script non lié au Sheets**
```
Solution :
1. Copier tout le code
2. Dans Sheets : Extensions → Apps Script
3. Coller code dans l'éditeur qui s'ouvre
4. Sauvegarder (Ctrl+S)
5. Retour Sheets → F5
```

### **Si autorisations refusées**
```
Solution :
1. Apps Script → Projet → Paramètres
2. Activer "Afficher le fichier manifest appsscript.json"
3. Vérifier scopes dans appsscript.json
4. Réautoriser : Exécuter onOpen → Autoriser
```

### **Si plusieurs projets Apps Script**
```
Problème : Script exécuté dans mauvais projet
Solution :
1. Sheets : Vérifier URL du fichier
2. Apps Script : Vérifier URL du projet
3. S'assurer même projet (ID dans URL identique)
```

---

## 📞 DERNIER RECOURS

Si RIEN ne fonctionne :

### **Créer nouveau fichier test**
```
1. Nouveau Google Sheets vierge
2. Extensions → Apps Script
3. Coller juste fonction onOpen + showPanneauControle
4. Créer PanneauControle.html minimal :
   <h1>Test</h1>
5. Sauvegarder
6. Retour Sheets → F5
7. Menu doit apparaître
```

Si ça marche → Problème avec fichier original
Si ça marche pas → Problème compte Google ou restrictions admin

---

## ✅ CONFIRMATION FONCTIONNEMENT

Quand ça marche, vous verrez :

```
┌──────────────────────────────────────┐
│ Fichier  Édition  🎯 CONSOLE  ⚙️ LEGACY │
└──────────────────────────────────────┘
```

Cliquer **CONSOLE** → Liste complète fonctions
Cliquer **Panneau de Contrôle** → Sidebar s'ouvre

---

**Version :** 1.0
**Date :** 2025-11-09
**Auteur :** Claude
