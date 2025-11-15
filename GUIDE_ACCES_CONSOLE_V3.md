# 🚀 Guide d'Accès - Console de Pilotage V3

## 📍 Comment Ouvrir la Console V3 ?

### Méthode 1 : Menu Google Sheets (RECOMMANDÉE)

1. **Ouvrir** votre fichier Google Sheets BASE-16 RENEW
2. **Cliquer** sur le menu `🎯 CONSOLE` (en haut)
3. **Sélectionner** `🚀 Console de Pilotage V3 (EXPERT)`

```
┌─────────────────────────────────────────┐
│  Fichier  Édition  Affichage  🎯 CONSOLE│
└─────────────────────────────────────────┘
                               │
                               ▼
           ┌──────────────────────────────────────────┐
           │ 🚀 Console de Pilotage V3 (EXPERT)       │ ← CLIQUER ICI
           │ 📊 Console de Pilotage V2                │
           │ ───────────────────────────────────      │
           │ 🏗️ Initialiser Système                   │
           │ ...                                      │
           └──────────────────────────────────────────┘
```

### Méthode 2 : Script Editor (Pour développeurs)

1. **Ouvrir** Extensions → Apps Script
2. **Trouver** la fonction `ouvrirConsolePilotageV3()` dans ConsolePilotageV3_Server.gs
3. **Sélectionner** la fonction dans le dropdown
4. **Cliquer** sur ▶️ Exécuter

```
┌─────────────────────────────────────────────────┐
│ ouvrirConsolePilotageV3 ▼  |  ▶️ Exécuter       │
└─────────────────────────────────────────────────┘
```

---

## 🖥️ Ce qui s'Affiche

### Console V3 - Modal Dialog (1600x900px)

```
┌────────────────────────────────────────────────────────────────┐
│ Console de Pilotage V3 - Expert Edition                    ✕  │
├───────────┬────────────────────────────────┬──────────────────┤
│           │                                │                  │
│ SIDEBAR   │      MAIN CONTENT              │  DIAGNOSTIC     │
│ 320px     │      (flexible)                │  PANEL 380px    │
│           │                                │                  │
│ • Phase 1 │  ┌──────────────────────┐     │  Métriques:     │
│ • Phase 2 │  │ Phase 1: Init        │     │  👥 0 Élèves    │
│ • Phase 3 │  │                      │     │  🏫 0 Classes   │
│ • Phase 4 │  │ [Bouton d'action]    │     │                 │
│ • Phase 5 │  └──────────────────────┘     │  Alerts:        │
│ • Phase 6 │                                │  ℹ️ Démarrez... │
│           │                                │                  │
│ Progress: │                                │                  │
│ ▓▓░░░░ 0% │                                │                  │
└───────────┴────────────────────────────────┴──────────────────┘
```

### Console V2 - Sidebar (500px)

```
┌────────────────────────┐
│ Console de Pilotage V2 │
├────────────────────────┤
│                        │
│ • Phase 1              │
│ • Phase 2              │
│ • Phase 3              │
│ • Phase 4              │
│ • Phase 5              │
│ • Phase 6              │
│                        │
│                        │
│                        │
└────────────────────────┘
```

**Différence** : V3 = Grande fenêtre centrale | V2 = Sidebar à droite

---

## ✅ Vérification Rapide

### Si le menu n'apparaît pas :

1. **Recharger** la page Google Sheets (F5 ou Ctrl+R)
2. **Attendre** 5-10 secondes (le menu se charge automatiquement)
3. **Vérifier** que le script Apps Script est bien déployé

### Si "Erreur : Fonction introuvable" :

1. **Ouvrir** Extensions → Apps Script
2. **Vérifier** que le fichier `ConsolePilotageV3_Server.gs` existe
3. **Vérifier** que la fonction `ouvrirConsolePilotageV3()` est bien présente
4. **Sauvegarder** le projet (Ctrl+S)
5. **Réessayer** d'ouvrir depuis le menu

---

## 🎯 Workflow Complet

### 1. Ouvrir la Console

```
Menu 🎯 CONSOLE → 🚀 Console de Pilotage V3 (EXPERT)
```

### 2. Suivre les Phases

```
Phase 1: Initialisation
  ↓
Phase 2: Diagnostic
  ↓
Phase 3: Génération
  ↓
Phase 4: Optimisation
  ↓
Phase 5: Swaps Manuels
  ↓
Phase 6: Finalisation
```

### 3. Vérifier la Progression

- **Badges** : Changent de couleur (Jaune → Vert)
- **Barre** : Se remplit progressivement (0% → 100%)
- **Toasts** : Notifications en haut à droite
- **Alerts** : Messages dans le panel diagnostic

---

## 🔧 Fichiers Requis

Pour que la Console V3 fonctionne, vous devez avoir ces fichiers dans Apps Script :

### Frontend
- ✅ `ConsolePilotageV3.html` (2209 lignes)

### Backend
- ✅ `ConsolePilotageV3_Server.gs` (276 lignes)
- ✅ `Code.gs` (avec fonction `onOpen()` modifiée)

### Backend Existant (requis)
- ✅ `Initialisation.gs` (pour Phase 1)
- ✅ `DiagnosticService.gs` (pour Phase 2)
- ✅ `Code.gs` avec `legacy_runFullPipeline()` (pour Phase 3)
- ✅ `Code.gs` avec `showOptimizationPanel()` (pour Phase 4)
- ✅ `ConsolePilotage_Server.gs` (pour Phase 5 & 6)

---

## 📚 Documentation Complète

Pour plus d'informations, consulter :

- **Architecture** : `CONSOLE_PILOTAGE_V3_README.md`
- **Câblage** : `CONSOLE_V3_WIRING_FIX.md`
- **Code Source** : `ConsolePilotageV3.html` (commenté)

---

## 🆘 Problèmes Courants

### Problème 1 : Menu ne s'affiche pas

**Solution** :
```javascript
// Dans Apps Script, exécuter manuellement :
onOpen();
```

### Problème 2 : Console s'ouvre mais boutons ne fonctionnent pas

**Solution** :
1. Vérifier que `ConsolePilotageV3_Server.gs` est bien déployé
2. Autoriser les permissions (première ouverture)
3. Consulter les logs (Ctrl+Entrée dans Apps Script)

### Problème 3 : "Fonction v3_runInitialisation not found"

**Solution** :
1. Vérifier que le fichier `ConsolePilotageV3_Server.gs` est bien présent
2. Sauvegarder le projet (Ctrl+S)
3. Recharger Google Sheets

---

## 🎓 Comparaison V2 vs V3

| Critère | V2 | V3 |
|---------|----|----|
| **Ouverture** | Sidebar 500px | Modal Dialog 1600px |
| **Position** | Droite | Centre |
| **Colonnes** | 2 | 3 |
| **Métriques Live** | ❌ | ✅ |
| **Dark Mode** | ❌ | ✅ |
| **Animations** | Basiques | Avancées |
| **Câblage** | Incomplet | 100% Fonctionnel |

---

**Date** : 2025-11-15
**Version** : 3.0.1
**Auteur** : Claude
**Statut** : ✅ Prêt à l'Emploi
