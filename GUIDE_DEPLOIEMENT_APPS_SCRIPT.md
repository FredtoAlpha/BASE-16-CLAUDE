# 📦 GUIDE DE DÉPLOIEMENT - Apps Script

## ⚠️ IMPORTANT

Les fichiers dans ce dépôt GitHub **NE SONT PAS automatiquement** dans Google Apps Script !

Il faut **COPIER-COLLER MANUELLEMENT** chaque fichier dans l'éditeur Apps Script de votre Google Sheets.

---

## 🚀 DÉPLOIEMENT COMPLET (30 minutes)

### **PRÉREQUIS**

- ✅ Compte Google avec accès Google Sheets
- ✅ Navigateur web (Chrome recommandé)
- ✅ Accès à ce dépôt GitHub

---

## 📋 ÉTAPE PAR ÉTAPE

### **ÉTAPE 1 : Créer/Ouvrir Google Sheets**

1. Aller sur [Google Sheets](https://sheets.google.com)
2. Créer nouveau tableur : `Fichier` → `Nouveau` → `Feuille de calcul`
3. Nommer : "BASE-15 Répartition Classes"

---

### **ÉTAPE 2 : Ouvrir l'éditeur Apps Script**

1. Dans votre Google Sheets
2. Menu `Extensions` → `Apps Script`
3. Une nouvelle fenêtre s'ouvre : **l'éditeur Apps Script**

**Vous devriez voir :**
- Fichier par défaut : `Code.gs` (vide ou avec code exemple)
- Barre latérale gauche avec liste fichiers
- Éditeur central

---

### **ÉTAPE 3 : Supprimer le code par défaut**

1. Dans `Code.gs`
2. **Supprimer tout** le contenu (s'il y en a)
3. Laisser fichier vide pour l'instant

---

### **ÉTAPE 4 : Créer les fichiers .gs (Scripts)**

**Cliquer sur `+` à côté de "Fichiers"** → **"Script"**

Créer **dans cet ordre** (renommer avec l'icône 3 points → Renommer) :

| # | Nom fichier | Type |
|---|-------------|------|
| 1 | Code | Script (.gs) - **déjà existe** |
| 2 | Initialisation | Script (.gs) |
| 3 | Structure | Script (.gs) |
| 4 | Config | Script (.gs) |
| 5 | GenereNOMprenomID | Script (.gs) |
| 6 | ListesDeroulantes | Script (.gs) |
| 7 | COMPTER | Script (.gs) |
| 8 | Consolidation | Script (.gs) |
| 9 | Utils_VIEUX | Script (.gs) |

**Résultat :** Vous devez avoir **9 fichiers .gs** dans la liste.

---

### **ÉTAPE 5 : Créer les fichiers .html (Interfaces)**

**Cliquer sur `+` à côté de "Fichiers"** → **"HTML"**

Créer :

| # | Nom fichier | Type |
|---|-------------|------|
| 10 | PanneauControle | HTML |
| 11 | ConfigurationComplete | HTML |

**Résultat :** Vous devez avoir **9 fichiers .gs + 2 fichiers .html = 11 fichiers total**.

---

### **ÉTAPE 6 : Copier-coller le contenu**

Pour **CHAQUE fichier**, suivre cette procédure :

#### **Pour les fichiers .gs :**

1. **GitHub** : Ouvrir le fichier dans ce dépôt
   - Exemple : `Code.js`
2. **Cliquer** sur bouton "Raw" (en haut à droite)
3. **Sélectionner tout** (`Ctrl+A` ou `Cmd+A`)
4. **Copier** (`Ctrl+C` ou `Cmd+C`)
5. **Apps Script** : Ouvrir fichier correspondant
   - Exemple : `Code.gs`
6. **Supprimer** tout le contenu actuel
7. **Coller** (`Ctrl+V` ou `Cmd+V`)
8. **Sauvegarder** (`Ctrl+S` ou `Cmd+S`)

#### **Pour les fichiers .html :**

1. **GitHub** : Ouvrir le fichier `.html`
   - Exemple : `PanneauControle.html`
2. **Cliquer** "Raw"
3. **Copier** tout
4. **Apps Script** : Ouvrir fichier `.html` correspondant
5. **Coller**
6. **Sauvegarder**

---

### **ÉTAPE 7 : Tableau de correspondance**

| Fichier GitHub | Fichier Apps Script | Statut |
|----------------|---------------------|--------|
| `Code.js` | `Code.gs` | ☐ Copié |
| `Initialisation.js` | `Initialisation.gs` | ☐ Copié |
| `Structure.js` | `Structure.gs` | ☐ Copié |
| `Config.js` | `Config.gs` | ☐ Copié |
| `GenereNOMprenomID.js` | `GenereNOMprenomID.gs` | ☐ Copié |
| `ListesDeroulantes.js` | `ListesDeroulantes.gs` | ☐ Copié |
| `COMPTER.js` | `COMPTER.gs` | ☐ Copié |
| `Consolidation.js` | `Consolidation.gs` | ☐ Copié |
| `Utils_VIEUX.js` | `Utils_VIEUX.gs` | ☐ Copié |
| `PanneauControle.html` | `PanneauControle.html` | ☐ Copié |
| `ConfigurationComplete.html` | `ConfigurationComplete.html` | ☐ Copié |

**Cochez chaque case** au fur et à mesure !

---

### **ÉTAPE 8 : Enregistrer le projet**

1. En haut de l'éditeur : **"Projet sans titre"**
2. Cliquer dessus
3. Renommer : **"BASE-15 Répartition"**
4. Cliquer **"Enregistrer"**

---

### **ÉTAPE 9 : Vérifier l'absence d'erreurs**

1. Dans l'éditeur, sélectionner `Code.gs`
2. Chercher fonction `onOpen`
3. En haut : sélectionner **"onOpen"** dans le menu déroulant des fonctions
4. Cliquer **"Exécuter"** (▶️)

**Si première exécution :**
- Message : "Autorisation nécessaire"
- Cliquer **"Consulter les autorisations"**
- Choisir votre compte Google
- Cliquer **"Autoriser"**
- **Ignorer** l'avertissement "Application non vérifiée" (c'est votre code)
- Cliquer **"Accéder à ... (non sécurisé)"**

**Résultat attendu :**
- ✅ "Exécution terminée" (sans erreur)
- ✅ Retour dans Google Sheets
- ✅ **RECHARGER** la page Google Sheets (`F5`)

---

### **ÉTAPE 10 : Vérifier le menu**

1. **Recharger** Google Sheets (`F5`)
2. Attendre 5-10 secondes
3. **Vérifier** que vous voyez **2 nouveaux menus** :
   - **🎓 Répartition Classes**
   - **⚙️ LEGACY Pipeline**

**Si menus n'apparaissent pas :**
- Attendre 30 secondes
- Recharger à nouveau (`F5`)
- Vérifier autorisations (étape 9)

---

### **ÉTAPE 11 : Tester le Panneau de Contrôle**

1. Menu **🎓 Répartition Classes**
2. Cliquer **🎯 PANNEAU DE CONTRÔLE**
3. **Résultat attendu :** Sidebar s'ouvre sur la droite avec 6 sections

**Si erreur "Fonction introuvable" :**
- Vérifier que **TOUS** les fichiers ont été copiés
- Vérifier noms exacts (majuscules/minuscules)
- Relancer étape 9 (Exécuter `onOpen`)

---

## ✅ VÉRIFICATION FINALE

### **Checklist de déploiement :**

- [ ] 11 fichiers créés dans Apps Script
- [ ] Contenu de chaque fichier copié depuis GitHub
- [ ] Projet renommé "BASE-15 Répartition"
- [ ] Fonction `onOpen` exécutée sans erreur
- [ ] Autorisations accordées
- [ ] Google Sheets rechargé (`F5`)
- [ ] 2 menus apparaissent : **🎓 Répartition** + **⚙️ LEGACY**
- [ ] Panneau de Contrôle s'ouvre (sidebar droite)

**Si TOUTES les cases cochées :** ✅ **DÉPLOIEMENT RÉUSSI !**

---

## 🔧 DÉPANNAGE

### **Problème 1 : Menus n'apparaissent pas**

**Causes possibles :**
- Autorisation refusée
- Code non exécuté
- Cache navigateur

**Solutions :**
1. Recharger plusieurs fois (`F5`)
2. Vider cache navigateur
3. Apps Script : Exécuter `onOpen` manuellement
4. Fermer/rouvrir Google Sheets

---

### **Problème 2 : Erreur "Fonction introuvable"**

**Causes possibles :**
- Fichier manquant
- Nom fichier incorrect
- Contenu non copié

**Solutions :**
1. Vérifier que **TOUS** fichiers copiés
2. Vérifier noms exacts (pas d'espaces, respect majuscules)
3. Ouvrir chaque fichier et vérifier contenu non vide

---

### **Problème 3 : "Application non vérifiée"**

**C'est normal !** Google affiche cet avertissement car :
- Vous êtes le développeur
- Script non publié sur Google Workspace Marketplace

**Solution :**
1. Cliquer **"Paramètres avancés"**
2. Cliquer **"Accéder à ... (non sécurisé)"**
3. Continuer autorisation

**Sécurité :** Vous êtes le seul à avoir accès à ce code.

---

### **Problème 4 : Erreur syntaxe**

**Causes possibles :**
- Copie partielle
- Encodage caractères

**Solutions :**
1. Recopier fichier concerné
2. Utiliser bouton "Raw" sur GitHub
3. Vérifier pas de caractères bizarres

---

### **Problème 5 : Panneau vide/blanc**

**Causes possibles :**
- Fichier HTML non copié
- Erreur JavaScript

**Solutions :**
1. Vérifier `PanneauControle.html` copié
2. Ouvrir console navigateur (`F12`)
3. Vérifier erreurs JavaScript

---

## 📊 ARCHITECTURE FINALE

```
Google Sheets : "BASE-15 Répartition Classes"
  └─ Apps Script : "BASE-15 Répartition"
      ├─ Scripts (.gs)
      │   ├─ Code.gs                   [Menu + fonctions principales]
      │   ├─ Initialisation.gs         [Création onglets]
      │   ├─ Structure.gs              [Gestion _STRUCTURE]
      │   ├─ Config.gs                 [Configuration centralisée]
      │   ├─ GenereNOMprenomID.gs      [Génération ID]
      │   ├─ ListesDeroulantes.gs      [Validations]
      │   ├─ COMPTER.gs                [Rapports stats]
      │   ├─ Consolidation.gs          [Fusion sources]
      │   └─ Utils_VIEUX.gs            [Utilitaires]
      │
      └─ Interfaces (.html)
          ├─ PanneauControle.html      [Interface principale]
          └─ ConfigurationComplete.html [Config avancée]
```

---

## 🎯 APRÈS DÉPLOIEMENT

### **Utilisation :**

1. Menu **🎓 Répartition Classes** → **🎯 PANNEAU DE CONTRÔLE**
2. Suivre workflow dans `GUIDE_PANNEAU_CONTROLE.md`
3. Commencer par section **🏗️ Initialisation**

### **Documentation :**

| Fichier | Usage |
|---------|-------|
| `GUIDE_PANNEAU_CONTROLE.md` | Guide utilisateur complet |
| `INTEGRATION_TERMINEE.md` | Vue d'ensemble fonctionnalités |
| `RESUME_EXECUTIF.md` | Synthèse rapide |

---

## 💡 ASTUCES

### **Raccourcis clavier Apps Script :**
- `Ctrl+S` / `Cmd+S` : Sauvegarder
- `Ctrl+Enter` : Exécuter fonction
- `Ctrl+F` : Rechercher
- `Ctrl+H` : Remplacer

### **Organiser fichiers :**
- Apps Script affiche fichiers par ordre alphabétique
- Impossible de créer dossiers (limitation Google)
- Préfixer avec numéros si besoin (ex: `01_Code.gs`)

### **Versions :**
- Apps Script sauvegarde automatiquement
- Historique : `Fichier` → `Historique des versions`
- Possibilité restaurer version antérieure

---

## 🔐 SÉCURITÉ

### **Autorisations demandées :**

Le script demande accès à :
- ✅ **Google Sheets** : Lecture/écriture données
- ✅ **UI** : Afficher menus/dialogues

**Pourquoi ?**
- Créer onglets automatiquement
- Lire/écrire données élèves
- Afficher interface Panneau de Contrôle

**Ces autorisations sont normales** pour un script Google Sheets.

### **Qui a accès ?**

- **Vous** : Créateur du script, accès total
- **Autres** : Seulement si vous partagez Google Sheets
- **Google** : N'accède pas à vos données privées

---

## 📞 SUPPORT

### **Si blocage :**

1. Consulter section **Dépannage** ci-dessus
2. Vérifier **Checklist de déploiement**
3. Relire étape où ça bloque

### **Erreurs fréquentes :**

| Erreur | Solution |
|--------|----------|
| Menu absent | Recharger + attendre 30s |
| Fonction introuvable | Vérifier tous fichiers copiés |
| Autorisation refusée | Exécuter `onOpen` + autoriser |
| Panneau vide | Vérifier `PanneauControle.html` |

---

## ✅ RÉSUMÉ

**Temps estimé :** 30 minutes

**Étapes :**
1. Créer Google Sheets
2. Ouvrir Apps Script
3. Créer 11 fichiers (9 .gs + 2 .html)
4. Copier-coller contenu depuis GitHub
5. Exécuter `onOpen` + autoriser
6. Recharger Google Sheets
7. Tester Panneau de Contrôle

**Résultat :** Interface complète opérationnelle !

---

**Version :** 1.0
**Date :** 2025-11-09
**Auteur :** Claude

**BON DÉPLOIEMENT ! 🚀**
