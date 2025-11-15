# 🔐 PROBLÈME RÉSOLU - Autorisations OAuth insuffisantes

## 🎯 Erreur rencontrée

```
Exception: Les autorisations spécifiées ne sont pas suffisantes pour appeler Ui.showSidebar.
Autorisations requises : https://www.googleapis.com/auth/script.container.ui
```

Cette erreur apparaît lorsque :
- Les menus s'affichent correctement ✅
- Mais cliquer sur "Panneau de Contrôle" ou toute fonction UI provoque une erreur ❌

---

## 🔍 Cause racine

**Apps Script utilise OAuth 2.0 pour autoriser les scripts.**

Le fichier `appsscript.json` contient la liste des **scopes** (permissions) que le script demande à l'utilisateur. Si un scope manque, le script ne peut pas utiliser les fonctionnalités correspondantes.

### État initial de `appsscript.json` :
```json
{
  "oauthScopes": ["https://www.googleapis.com/auth/spreadsheets"]
}
```

**Problème :** Ce scope permet seulement de lire/modifier les données du tableur, mais **PAS** d'afficher des interfaces utilisateur (sidebars, dialogs, alertes).

---

## ✅ Correction appliquée

### Fichier : `appsscript.json`

**Ajout du scope manquant :**
```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/script.container.ui"
  ]
}
```

### Fonctions débloquées par `script.container.ui` :
- ✅ `SpreadsheetApp.getUi().showSidebar()` - Sidebar 450px à droite
- ✅ `SpreadsheetApp.getUi().showModalDialog()` - Dialog modal
- ✅ `SpreadsheetApp.getUi().showModelessDialog()` - Dialog non-modal
- ✅ `SpreadsheetApp.getUi().alert()` - Alertes
- ✅ `SpreadsheetApp.getUi().prompt()` - Prompts
- ✅ `HtmlService.createHtmlOutput()` utilisé dans les UI

---

## 🚀 INSTRUCTIONS POUR TOI

### 1️⃣ Récupérer la correction
```powershell
cd "C:\OUTIL 25 26\DOSSIER BASE 15 VIEUX SCRIPTS\BASE 15 v1"
git pull origin claude/migrate-base14-to-base15-011CUxjaabobyj7vtTao9MkT
```

### 2️⃣ Déployer vers Apps Script
```powershell
clasp push --force
```

**⚠️ IMPORTANT :** Après le push, Apps Script va **demander une nouvelle autorisation** car les scopes ont changé.

### 3️⃣ Réautoriser le script

#### Dans Google Sheets :
1. Ouvrir Google Sheets
2. Rafraîchir (F5)
3. Attendre les menus (10-15 sec)
4. Cliquer **🎯 CONSOLE** → **📋 Panneau de Contrôle**
5. Une popup apparaît : **"Autorisation requise"**
6. Cliquer **"Examiner les autorisations"**
7. Sélectionner ton compte Google
8. Cliquer **"Autoriser"**

#### Ou dans Apps Script :
1. Ouvrir : https://script.google.com/home/projects/1DPLbFgn109nQm8PW4rnYuo1L8uyG-uFaUymbf3tWQwummzF3fjQF_qsZ/edit
2. Sélectionner fonction `testMenus`
3. Cliquer ▶️ **Exécuter**
4. Popup "Autorisation requise" → **Autoriser**
5. Réexécuter `testMenus`

### 4️⃣ Vérifier que ça fonctionne

Après autorisation :
```
Google Sheets → Menu 🎯 CONSOLE → 📋 Panneau de Contrôle
```

**Résultat attendu :** Sidebar de 450px s'ouvre à droite avec 6 sections accordéon ✅

---

## 📋 Scopes OAuth courants dans Apps Script

| Scope | Description | Fonctions débloquées |
|-------|-------------|---------------------|
| `spreadsheets` | Lire/modifier tableurs | `getRange()`, `setValue()`, `getValues()` |
| `script.container.ui` | Interfaces utilisateur | `showSidebar()`, `alert()`, `showModalDialog()` |
| `drive` | Accès Google Drive | `DriveApp.getFiles()`, créer fichiers |
| `gmail` | Accès Gmail | `GmailApp.sendEmail()` |
| `calendar` | Accès Google Calendar | `CalendarApp.getEvents()` |

**Notre projet nécessite :** `spreadsheets` + `script.container.ui`

---

## 🎓 Comprendre le système d'autorisation Apps Script

### 1. Déclaration (appsscript.json)
Le développeur déclare les scopes nécessaires dans `appsscript.json`.

### 2. Demande d'autorisation (première exécution)
Lors de la première exécution, Apps Script demande à l'utilisateur d'autoriser ces scopes.

### 3. Token OAuth stocké
Une fois autorisé, le token est stocké et les exécutions suivantes ne redemandent pas.

### 4. Modification des scopes
Si tu ajoutes/changes un scope dans `appsscript.json` et fais `clasp push`, Apps Script détecte le changement et redemande l'autorisation.

### 5. Révocation
L'utilisateur peut révoquer l'accès dans : https://myaccount.google.com/permissions

---

## ⚠️ Sécurité et bonnes pratiques

### Principe du moindre privilège
- ✅ **BON :** Demander uniquement les scopes nécessaires
- ❌ **MAUVAIS :** Demander tous les scopes "au cas où"

### Notre projet
```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",      // Nécessaire pour lire/modifier données
    "https://www.googleapis.com/auth/script.container.ui" // Nécessaire pour sidebars/dialogs
  ]
}
```

Nous ne demandons **PAS** :
- ❌ Drive (pas besoin d'accès aux autres fichiers)
- ❌ Gmail (pas d'envoi d'emails)
- ❌ Calendar (pas d'accès calendrier)
- ❌ Contacts (pas d'accès contacts)

---

## 📊 Résumé des bugs résolus

| # | Bug | Symptôme | Solution | Commit |
|---|-----|----------|----------|--------|
| 1 | Fichiers HTML manquants | Menus n'apparaissent pas | Retrait références manquantes | 77277f2 |
| 2 | Déclarations en double | SyntaxError `ERROR_CODES` | Suppression doublons | b0aaf8a |
| 3 | **Scope OAuth manquant** | **"Autorisations insuffisantes"** | **Ajout `script.container.ui`** | **a4c8856** |

---

## ✅ Étapes complètes de déploiement

### Résumé final :
1. `git pull` - Récupérer tous les correctifs (3 bugs résolus)
2. `clasp push --force` - Pousser vers Apps Script
3. **Réautoriser** - Accepter les nouvelles permissions OAuth
4. Tester - Menu CONSOLE → Panneau de Contrôle → Sidebar s'ouvre ✅

---

## 🎯 Commit actuel

**Branche :** `claude/migrate-base14-to-base15-011CUxjaabobyj7vtTao9MkT`
**Commit :** `a4c8856`
**Message :** 🔐 Ajout scope OAuth pour UI (sidebar/dialogs)

**Fichiers modifiés :**
- `appsscript.json` - Ajout scope `script.container.ui`

**Prochaine action :** `git pull` + `clasp push --force` + **réautoriser** 🚀
