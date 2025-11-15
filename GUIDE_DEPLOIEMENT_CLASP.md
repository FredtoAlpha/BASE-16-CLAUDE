# 🚀 GUIDE DÉPLOIEMENT CLASP - Apps Script

## 📌 PRÉSENTATION

**Clasp** (Command Line Apps Script Projects) permet de déployer votre code Apps Script directement depuis le terminal, sans copier-coller manuel !

**Avantages :**
- ✅ Déploiement en 1 commande
- ✅ Versioning Git + Apps Script synchronisés
- ✅ Workflow développeur professionnel
- ✅ Pas de copier-coller manuel

---

## 🛠️ PRÉREQUIS

### **1. Node.js installé**

```bash
node --version  # Doit afficher v14+ ou v16+
```

Si pas installé : [https://nodejs.org](https://nodejs.org)

### **2. Installer clasp**

```bash
npm install -g @google/clasp
```

Vérifier installation :

```bash
clasp --version  # Doit afficher 2.4.x ou supérieur
```

---

## 🔐 AUTHENTIFICATION

### **Connexion Google**

```bash
clasp login
```

**Ce qui se passe :**
1. Navigateur s'ouvre
2. Sélectionner votre compte Google
3. Autoriser clasp
4. Retour terminal : "✔ Logged in!"

**Fichier créé :** `~/.clasprc.json` (credentials)

---

## 📦 DÉPLOIEMENT COMPLET

### **ÉTAPE 1 : Créer projet Apps Script**

```bash
cd /chemin/vers/BASE-15-VIEUX-SCRIPTS
clasp create --title "BASE-15 Répartition" --type sheets
```

**Ce qui se passe :**
- Crée nouveau projet Apps Script
- Lie à Google Sheets
- Génère `scriptId` dans `.clasp.json`

**Résultat :** `.clasp.json` mis à jour avec `scriptId`

**Alternative (si projet existe déjà) :**

```bash
# Récupérer scriptId depuis l'URL Apps Script
# URL : https://script.google.com/.../.../edit?mid=ABC123...
# scriptId = ABC123...

clasp clone ABC123...
```

---

### **ÉTAPE 2 : Push initial**

```bash
clasp push
```

**Ce qui se passe :**
- Upload **TOUS** les fichiers `.gs` et `.html`
- Ignore fichiers dans `.claspignore` (*.md, *.txt...)
- Crée/met à jour projet Apps Script

**Sortie attendue :**

```
└─ Code.gs
└─ Initialisation.gs
└─ Structure.gs
└─ Config.gs
└─ GenereNOMprenomID.gs
└─ ListesDeroulantes.gs
└─ COMPTER.gs
└─ Consolidation.gs
└─ Utils_VIEUX.gs
└─ PanneauControle.html
└─ ConfigurationComplete.html
└─ appsscript.json
Pushed 12 files.
```

---

### **ÉTAPE 3 : Ouvrir dans l'éditeur**

```bash
clasp open
```

**Ce qui se passe :**
- Navigateur s'ouvre sur l'éditeur Apps Script
- Tous vos fichiers sont là !

**Vérifier :**
- ✅ 9 fichiers `.gs`
- ✅ 2 fichiers `.html`
- ✅ `appsscript.json`

---

### **ÉTAPE 4 : Ouvrir Google Sheets lié**

```bash
clasp open --webapp
```

**OU récupérer l'URL :**

```bash
clasp deploy
```

Ouvrir l'URL Sheets dans navigateur.

---

### **ÉTAPE 5 : Tester le menu**

1. Ouvrir Google Sheets (étape 4)
2. Recharger (`F5`)
3. Attendre 10 secondes
4. **Menus apparaissent :**
   - **🎓 Répartition Classes**
   - **⚙️ LEGACY Pipeline**

**Si menus absents :**

```bash
# Forcer exécution onOpen
clasp run onOpen
```

---

## 🔄 WORKFLOW DÉVELOPPEMENT

### **Modifier code localement**

1. Éditer fichiers `.gs` ou `.html` avec votre éditeur favori (VS Code, etc.)
2. Sauvegarder

### **Push vers Apps Script**

```bash
clasp push
```

**Options utiles :**

```bash
clasp push --watch  # Auto-push à chaque sauvegarde
clasp push --force  # Force push (écrase différences)
```

### **Pull depuis Apps Script**

Si modifications faites dans l'éditeur web :

```bash
clasp pull
```

⚠️ **Attention :** Écrase fichiers locaux !

---

## 📋 COMMANDES CLASP UTILES

| Commande | Description |
|----------|-------------|
| `clasp login` | Connexion Google |
| `clasp logout` | Déconnexion |
| `clasp create` | Créer nouveau projet |
| `clasp clone <scriptId>` | Cloner projet existant |
| `clasp push` | Upload fichiers locaux → Apps Script |
| `clasp pull` | Download Apps Script → fichiers locaux |
| `clasp push --watch` | Auto-push à chaque sauvegarde |
| `clasp open` | Ouvrir éditeur Apps Script |
| `clasp open --webapp` | Ouvrir Google Sheets lié |
| `clasp deploy` | Créer déploiement (web app) |
| `clasp deployments` | Lister déploiements |
| `clasp logs` | Voir logs exécution |
| `clasp run <function>` | Exécuter fonction |
| `clasp apis list` | Lister APIs activées |
| `clasp apis enable sheets` | Activer API Sheets |

---

## 🎯 WORKFLOW RECOMMANDÉ

### **Setup initial (1 fois)**

```bash
# 1. Installer clasp
npm install -g @google/clasp

# 2. Login
clasp login

# 3. Créer projet
cd /chemin/vers/BASE-15-VIEUX-SCRIPTS
clasp create --title "BASE-15 Répartition" --type sheets

# 4. Push initial
clasp push

# 5. Ouvrir Sheets
clasp open --webapp
```

### **Développement quotidien**

```bash
# Modifier fichiers localement (VS Code, etc.)

# Push changements
clasp push

# Vérifier dans Apps Script
clasp open

# Tester dans Sheets
# (recharger F5)
```

### **Collaboration**

```bash
# Pull derniers changements
clasp pull

# Modifier localement
# ...

# Commit Git
git add -A
git commit -m "Feature X"
git push

# Push Apps Script
clasp push
```

---

## 🔧 CONFIGURATION AVANCÉE

### **Fichier `.clasp.json`**

```json
{
  "scriptId": "ABC123...",
  "rootDir": ".",
  "fileExtension": "gs"
}
```

**Options :**
- `scriptId` : ID projet Apps Script (auto-généré)
- `rootDir` : Dossier racine à push (défaut: `.`)
- `fileExtension` : Extension fichiers (défaut: `gs`)

### **Fichier `.claspignore`**

```
# Ignorer documentation
*.md
*.txt
README
LICENSE

# Ignorer Git
.git
.gitignore

# Ignorer node_modules si présent
node_modules
```

### **Fichier `appsscript.json`**

```json
{
  "timeZone": "Europe/Paris",
  "dependencies": {},
  "webapp": {
    "access": "ANYONE",
    "executeAs": "USER_DEPLOYING"
  },
  "exceptionLogging": "STACKDRIVER",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets"
  ],
  "runtimeVersion": "V8"
}
```

**Options importantes :**
- `timeZone` : Fuseau horaire
- `webapp.access` : `ANYONE` = public, `MYSELF` = privé
- `oauthScopes` : Permissions (Sheets, Drive, etc.)
- `runtimeVersion` : `V8` (moderne) ou `DEPRECATED_ES5`

---

## 🐛 DÉPANNAGE

### **Erreur : "User has not enabled the Apps Script API"**

```bash
# Activer API
clasp apis enable appsscript
```

**OU** aller sur : [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)
→ Activer "Google Apps Script API"

---

### **Erreur : "Detected `ts` files, but no tsconfig.json"**

Ignorer (on n'utilise pas TypeScript).

---

### **Erreur : "Permission denied"**

```bash
# Re-login
clasp logout
clasp login
```

---

### **Fichiers non pushés**

Vérifier `.claspignore` :

```bash
cat .claspignore

# Supprimer ligne qui bloque
# Puis re-push
clasp push
```

---

### **Différences pull vs push**

⚠️ **clasp pull ÉCRASE fichiers locaux** !

**Workflow sûr :**

```bash
# Sauvegarder d'abord
git add -A
git commit -m "Backup avant pull"

# Puis pull
clasp pull

# Vérifier différences
git diff

# Si OK, commit
git add -A
git commit -m "Sync from Apps Script"
```

---

## 📊 STRUCTURE PROJET

```
BASE-15-VIEUX-SCRIPTS/
├── .clasp.json              # Config clasp
├── .claspignore             # Fichiers à ignorer
├── appsscript.json          # Manifest Apps Script
│
├── Code.gs                  # Menu principal
├── Initialisation.gs        # Création onglets
├── Structure.gs             # Gestion _STRUCTURE
├── Config.gs                # Configuration
├── GenereNOMprenomID.gs     # Génération ID
├── ListesDeroulantes.gs     # Validations
├── COMPTER.gs               # Rapports stats
├── Consolidation.gs         # Fusion sources
├── Utils_VIEUX.gs           # Utilitaires
│
├── PanneauControle.html     # Interface principale
├── ConfigurationComplete.html # Config avancée
│
├── (autres fichiers .gs BASE-15)
│
└── (documentation .md - non pushée)
```

---

## ✅ CHECKLIST DÉPLOIEMENT

### **Setup (1 fois)**

- [ ] Node.js installé (`node --version`)
- [ ] Clasp installé (`clasp --version`)
- [ ] Login Google (`clasp login`)
- [ ] Projet créé (`clasp create`) OU cloné (`clasp clone`)
- [ ] `.clasp.json` contient `scriptId`

### **Push initial**

- [ ] `clasp push` exécuté
- [ ] 12 fichiers pushés (9 .gs + 2 .html + appsscript.json)
- [ ] Aucune erreur affichée
- [ ] `clasp open` ouvre éditeur avec tous fichiers

### **Vérification Sheets**

- [ ] `clasp open --webapp` ouvre Sheets
- [ ] Sheets rechargé (`F5`)
- [ ] Menus apparaissent : **🎓 Répartition** + **⚙️ LEGACY**
- [ ] Panneau de Contrôle s'ouvre (sidebar)

**Si TOUTES cases cochées :** ✅ **DÉPLOIEMENT CLASP RÉUSSI !**

---

## 🚀 AVANTAGES CLASP

### **vs Copier-coller manuel**

| Méthode | Temps | Erreurs | Versioning |
|---------|-------|---------|------------|
| **Copier-coller** | 30 min | Risque élevé | ❌ |
| **Clasp** | 2 min | Quasi nul | ✅ |

### **Workflow professionnel**

```
Local (Git) ←→ Apps Script ←→ Google Sheets
    ↓              ↓              ↓
 Versioning    Exécution      Utilisateur
```

- **Git** : Historique, branches, collaboration
- **Clasp** : Synchronisation bidirectionnelle
- **Apps Script** : Exécution serveur
- **Sheets** : Interface utilisateur

---

## 📚 RESSOURCES

### **Documentation officielle**

- [Clasp GitHub](https://github.com/google/clasp)
- [Clasp Docs](https://developers.google.com/apps-script/guides/clasp)
- [Apps Script API](https://developers.google.com/apps-script/api/quickstart/nodejs)

### **Tutoriels**

- [Getting Started with Clasp](https://codelabs.developers.google.com/codelabs/clasp)
- [Clasp TypeScript](https://github.com/google/clasp/blob/master/docs/typescript.md)

---

## 🎯 RÉSUMÉ COMMANDES

### **Installation**

```bash
npm install -g @google/clasp
clasp login
```

### **Création projet**

```bash
cd /chemin/vers/BASE-15-VIEUX-SCRIPTS
clasp create --title "BASE-15 Répartition" --type sheets
```

### **Déploiement**

```bash
clasp push                # Push fichiers
clasp open                # Ouvrir éditeur
clasp open --webapp       # Ouvrir Sheets
```

### **Développement**

```bash
clasp push --watch        # Auto-push
clasp pull                # Pull changements
clasp logs                # Voir logs
```

---

## ✅ APRÈS DÉPLOIEMENT

1. **Ouvrir Sheets** : `clasp open --webapp`
2. **Recharger** (`F5`)
3. **Tester menu** : `🎯 PANNEAU DE CONTRÔLE`
4. **Suivre guide** : `GUIDE_PANNEAU_CONTROLE.md`

---

**Version :** 1.0
**Date :** 2025-11-09
**Auteur :** Claude

**BON DÉPLOIEMENT CLASP ! 🚀**
