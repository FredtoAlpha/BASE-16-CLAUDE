# 🚀 DÉPLOIEMENT vers Apps Script - GUIDE COMPLET

## ⚠️ PROBLÈMES RÉSOLUS

### Problème 1 : Fichiers HTML manquants
**Symptôme :** `onOpen()` référençait des fichiers HTML manquants (Dashboard.html, Analytics.html, groupsModuleComplete.html)

**Solution appliquée :**
- ✅ Retrait des références aux fichiers manquants
- ✅ Ajout try-catch pour capturer les erreurs
- ✅ 3 menus fonctionnels : CONSOLE, Répartition, LEGACY
- ✅ Fonction `testMenus()` pour diagnostic
- ✅ Logger.log à chaque étape

### Problème 2 : Déclarations en double (CRITIQUE)
**Symptôme :** `SyntaxError: Identifier 'ERROR_CODES' has already been declared` dans Phase4_Optimisation_V15.gs:1
**Cause :** Apps Script concatène tous les fichiers .gs dans un seul scope global. Les déclarations `const ERROR_CODES` et `function getConfig()` existaient dans Config.gs ET Phase4_Optimisation_V15.gs

**Solution appliquée :**
- ✅ Supprimé `const ERROR_CODES` de Phase4_Optimisation_V15.gs (déjà dans Config.gs)
- ✅ Renommé `getConfig()` → `getConfig_V14Shim()` dans Phase4_Optimisation_V15.gs
- ✅ Mis à jour tous les appels dans le fichier

**Impact :** Ce bug bloquait le chargement complet du script, empêchant l'apparition de TOUS les menus dans Google Sheets

### Problème 3 : Autorisations OAuth manquantes (CRITIQUE)
**Symptôme :** `Exception: Les autorisations spécifiées ne sont pas suffisantes pour appeler Ui.showSidebar. Autorisations requises : https://www.googleapis.com/auth/script.container.ui`
**Cause :** Le fichier `appsscript.json` ne déclarait que le scope `spreadsheets`, mais pas `script.container.ui` nécessaire pour afficher les sidebars, dialogs et alertes

**Solution appliquée :**
- ✅ Ajout du scope `https://www.googleapis.com/auth/script.container.ui` dans appsscript.json
- ✅ Ce scope permet : showSidebar(), showModalDialog(), showModelessDialog(), alert(), prompt()

**Impact :** Sans ce scope, aucune interface (sidebar, dialog) ne peut s'ouvrir, même si le menu apparaît

---

## 📋 ÉTAPES DE DÉPLOIEMENT

### 1️⃣ Récupérer la dernière version

```powershell
cd "C:\OUTIL 25 26\DOSSIER BASE 15 VIEUX SCRIPTS\BASE 15 v1"
git fetch origin
git checkout claude/migrate-base14-to-base15-011CUxjaabobyj7vtTao9MkT
git pull origin claude/migrate-base14-to-base15-011CUxjaabobyj7vtTao9MkT
```

### 2️⃣ Vérifier la configuration CLASP

Vérifier que `.clasp.json` contient :
```json
{
  "scriptId": "1DPLbFgn109nQm8PW4rnYuo1L8uyG-uFaUymbf3tWQwummzF3fjQF_qsZ",
  "rootDir": "."
}
```

### 3️⃣ Pousser vers Apps Script

```powershell
clasp push --force
```

**Si erreur "file already exists" :** Répondez `Yes` à chaque fois, ou utilisez `--force` qui écrase tout.

### 4️⃣ Vérifier dans Apps Script

Ouvrir : https://script.google.com/home/projects/1DPLbFgn109nQm8PW4rnYuo1L8uyG-uFaUymbf3tWQwummzF3fjQF_qsZ/edit

Vérifier que **Code.gs** contient :
- Ligne 6 : `function onOpen()` avec try-catch
- Ligne 13 : Menu `🎯 CONSOLE`
- Ligne 34 : Menu `🎓 Répartition`
- Ligne 46 : Menu `⚙️ LEGACY`
- Ligne 74 : `function testMenus()`

### 5️⃣ Tester les menus

Dans Apps Script :
1. Sélectionner fonction `testMenus` dans le menu déroulant
2. Cliquer ▶️ **Exécuter**
3. Autoriser si demandé
4. Consulter les logs : **View → Logs** (ou Ctrl+Enter)

**Logs attendus :**
```
=== TEST MENUS ===
Test 1: Exécution onOpen()...
onOpen() démarré
Menu CONSOLE créé
Menu Répartition créé
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

### 6️⃣ Vérifier dans Google Sheets

1. Ouvrir votre Google Sheets lié au script
2. Rafraîchir la page (F5)
3. Attendre 10-15 secondes
4. Vérifier la barre de menu : vous devriez voir **3 menus** :
   - 🎯 **CONSOLE**
   - 🎓 **Répartition**
   - ⚙️ **LEGACY**

---

## 🎯 MENUS DISPONIBLES

### Menu CONSOLE (VIEUX-SCRIPTS)
- 📋 Panneau de Contrôle
- 🏗️ Initialiser Système
- 🆔 Générer NOM_PRENOM & ID
- 📋 Listes Déroulantes
- 📊 COMPTER Sources
- 🔗 Consolider Sources
- ✅ Vérifier Données
- ⚙️ Configuration Structure
- ⚙️ Configuration Complète
- 🔧 Test Menus

### Menu Répartition (BASE-15)
- ⚙️ Configuration Optimisation
- 🎯 Lancer Optimisation
- 👥 Interface Répartition V2
- 📄 Finalisation & Export

### Menu LEGACY
- 📋 Voir Classes Sources
- ⚙️ Configurer _STRUCTURE
- ▶️ Pipeline Complet
- 🔧 Phases (sous-menu)
  - Phase 1 - Options & LV2
  - Phase 2 - ASSO/DISSO
  - Phase 3 - Effectifs & Parité
  - Phase 4 - Équilibrage
- 📊 Voir Résultats TEST

---

## ❌ SI LES MENUS N'APPARAISSENT PAS

### Cause 1 : Script pas lié au bon Sheets
**Solution :** Dans Apps Script, aller dans **Projet Settings** → vérifier que "Container type" = "Spreadsheet" et que le bon Google Sheets est lié.

### Cause 2 : Autorisations manquantes
**Solution :** Exécuter `testMenus()` une fois depuis Apps Script pour déclencher l'autorisation.

### Cause 3 : Cache navigateur
**Solution :** Vider le cache (Ctrl+Shift+Delete) ou ouvrir en navigation privée.

### Cause 4 : Erreur dans le code
**Solution :** Consulter les logs dans Apps Script (View → Logs). Si erreur, elle sera visible dans le catch de onOpen().

---

## 📊 FICHIERS DÉPLOYÉS

**Total : 66 fichiers**
- 28 fichiers .gs (scripts)
- 38 fichiers .html (interfaces)

**Fichiers essentiels :**
- ✅ Code.gs (menus + fonctions principales)
- ✅ PanneauControle.html (sidebar CONSOLE)
- ✅ Initialisation.gs, Config.gs, COMPTER.gs, etc. (VIEUX-SCRIPTS)
- ✅ Tous les fichiers BASE-15 existants

---

## 🎓 UTILISATION

### Lancer le Panneau de Contrôle
1. Google Sheets → Menu **🎯 CONSOLE**
2. Cliquer **📋 Panneau de Contrôle**
3. Sidebar s'ouvre à droite (450px)
4. 6 sections accordéon disponibles

### Tester le Pipeline LEGACY
1. Google Sheets → Menu **⚙️ LEGACY**
2. Cliquer **📋 Voir Classes Sources** pour vérifier
3. Cliquer **▶️ Pipeline Complet** pour créer onglets TEST

---

## ✅ COMMITS RÉCENTS

**Branche :** `claude/migrate-base14-to-base15-011CUxjaabobyj7vtTao9MkT`

### Commit a4c8856 (DERNIER) 🔥
**Message :** 🔐 Ajout scope OAuth pour UI (sidebar/dialogs)

**Modifications critiques :**
- Ajout scope `script.container.ui` dans appsscript.json
- Résolution erreur "autorisations insuffisantes pour Ui.showSidebar"
- Permet affichage sidebars, dialogs, alertes

### Commit b819722
**Message :** 📘 Documentation SyntaxError - Explication complète résolution

**Modifications :**
- Documentation technique complète du bug SyntaxError
- Explication scope global Apps Script

### Commit b0aaf8a
**Message :** 🐛 FIX conflits déclarations - ERROR_CODES + getConfig

**Modifications critiques :**
- Supprimé déclaration `ERROR_CODES` en double dans Phase4_Optimisation_V15.gs
- Renommé `getConfig()` → `getConfig_V14Shim()` dans Phase4_Optimisation_V15.gs
- Résolution SyntaxError qui bloquait le chargement des menus

### Commit 77277f2
**Message :** 🔧 FIX onOpen() - Menus CONSOLE + RÉPARTITION + LEGACY

**Modifications :**
- onOpen() refactorisé avec try-catch
- Retrait fichiers HTML manquants
- 3 menus fonctionnels
- Fonction testMenus() ajoutée
- Logger.log pour diagnostic
