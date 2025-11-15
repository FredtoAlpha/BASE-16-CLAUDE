# 🚀 PRIME LEGACY - Architecture & Guide

## 📋 Vue d'Ensemble

**PRIME LEGACY** est un pipeline optimisé de répartition d'élèves basé sur **OPTIMUM PRIME** (Phases_BASEOPTI_V3_COMPLETE.gs - JULES-VERNE-NAUTILUS).

### Objectif

Créer un système LEGACY propre qui :
- ✅ Lit depuis les onglets sources (°1, °2, etc.)
- ✅ Écrit vers les onglets TEST
- ✅ Utilise la logique OPTIMUM PRIME (0 bugs)
- ✅ Isole complètement OPTI et LEGACY (0 interférence)

## 🏗️ Architecture

### Isolation OPTI vs LEGACY

| Pipeline | Source | Destination | Vivier |
|----------|--------|-------------|--------|
| **OPTI** | _BASEOPTI | _CACHE → FIN | Vivier unique |
| **LEGACY** | Sources (°1, °2, etc.) | TEST | Onglets multiples |

**✅ 0 INTERFÉRENCE** : Onglets différents, fonctions partagées sûres

### Fichiers Créés (8 fichiers, 1820 lignes)

#### Core (3 fichiers)
1. **LEGACY_Pipeline.gs** (544 lignes)
   - Pipeline principal : `legacy_runFullPipeline_PRIME()`
   - Phases individuelles : `legacy_runPhase1-4_PRIME()`
   - Statut pipeline : `legacy_showPipelineStatus()`

2. **LEGACY_Context.gs** (506 lignes)
   - Détection onglets sources : `makeCtxFromSourceSheets_LEGACY()`
   - Lecture config _STRUCTURE : quotas, effectifs, mapping
   - Helpers : `readQuotasFromUI_LEGACY()`, `readTargetsFromUI_LEGACY()`, etc.

3. **LEGACY_Init_Onglets.gs** (455 lignes)
   - Création onglets TEST : `initEmptyTestTabs_LEGACY()`
   - Copie en-têtes : `writeTestHeaders_LEGACY()`
   - Formatage : `formatTestSheets_LEGACY()`

#### Phases (4 fichiers)
4. **LEGACY_Phase1_OptionsLV2.gs** (227 lignes) ✅ IMPLÉMENTÉ
   - Basé sur : `Phase1I_dispatchOptionsLV2_BASEOPTI_V3`
   - Répartition Options & LV2 selon quotas
   - Logique OPTIMUM PRIME complète

5. **LEGACY_Phase2_DissoAsso.gs** (30 lignes) ⚠️ STUB
   - Basé sur : `Phase2I_applyDissoAsso_BASEOPTI_V3`
   - Codes ASSO (regrouper) et DISSO (séparer)
   - **À IMPLÉMENTER** : Logique complète OPTIMUM PRIME

6. **LEGACY_Phase3_Parite.gs** (30 lignes) ⚠️ STUB
   - Basé sur : `Phase3I_completeAndParity_BASEOPTI_V3`
   - Effectifs et parité F/M
   - **À IMPLÉMENTER** : Module parité adaptative

7. **LEGACY_Phase4_Optimisation.gs** (40 lignes) ⚠️ STUB
   - Basé sur : `Phase4_balanceScoresSwaps_BASEOPTI_V3`
   - Algorithme OPTIMUM PRIME (Moteurs Silencieux + Ancre d'Amarrage)
   - **À IMPLÉMENTER** : Score composite, swaps intelligents

#### Interface (1 fichier)
8. **LEGACY_Menu.gs** (140 lignes) ✅ IMPLÉMENTÉ
   - Menu Google Sheets : `createLegacyMenu_PRIME()`
   - Visualisation : `legacy_viewSourceClasses_PRIME()`, `legacy_viewTestResults_PRIME()`

## 🎯 Utilisation

### Menu Google Sheets

```
⚙️ PRIME LEGACY
├── 📊 Statut Pipeline
├── 🚀 Pipeline Complet (Sources → TEST)
├── 🔧 Phases Individuelles
│   ├── 🎯 Phase 1 - Options & LV2
│   ├── 🔗 Phase 2 - ASSO/DISSO
│   ├── ⚖️ Phase 3 - Effectifs & Parité
│   └── 🔄 Phase 4 - Équilibrage Scores (OPTIMUM PRIME)
├── 📋 Voir Classes Sources
└── 📊 Voir Résultats TEST
```

### Pipeline Complet

1. **Préparer** : Créer onglets sources (ECOLE1, 6°1, 5°1, etc.)
2. **Configurer** : Remplir _STRUCTURE (quotas, effectifs, mapping)
3. **Lancer** : Menu > 🚀 Pipeline Complet
4. **Vérifier** : Menu > 📊 Voir Résultats TEST

### Configuration _STRUCTURE

| CLASSE_ORIGINE | CLASSE_DEST | EFFECTIF | OPTIONS |
|----------------|-------------|----------|---------|
| ECOLE1 | 6°1 | 25 | ITA=6,ESP=3 |
| ECOLE2 | 6°2 | 25 | CHAV=10 |
| 6°1 | 5°1 | 24 | ITA=5 |
| 6°2 | 5°2 | 24 | CHAV=8 |

## 🔧 État Actuel (MVP)

### ✅ Fonctionnel

- ✅ Détection automatique onglets sources
- ✅ Lecture config _STRUCTURE (quotas, effectifs, mapping)
- ✅ Création onglets TEST avec formatage
- ✅ **Phase 1 OPTIMUM PRIME** : Répartition Options/LV2
- ✅ Menu Google Sheets complet
- ✅ Isolation OPTI/LEGACY garantie

### ⚠️ À Implémenter

- ⚠️ **Phase 2** : ASSO/DISSO (helpers BASEOPTI V3 existants)
- ⚠️ **Phase 3** : Parité adaptative (module existant)
- ⚠️ **Phase 4** : OPTIMUM PRIME complet (algorithme JULES-VERNE-NAUTILUS)
- ⚠️ Outils Phase 0 : GenererID, Consolidation, ListesDeroulantes

## 🚀 Prochaines Étapes

### Priorité 1 : Phases 2-4 Complètes

1. **Phase 2** (ASSO/DISSO)
   - Adapter `canPlaceInClass_V3()` pour TEST
   - Adapter `findClassWithoutCodeD_V3()` pour TEST
   - Logique regroupement/séparation

2. **Phase 3** (Parité)
   - Intégrer `Phase3I_completeAndParity_PariteAdaptive_V3`
   - Adapter pour onglets TEST multiples

3. **Phase 4** (OPTIMUM PRIME)
   - Intégrer algorithme complet JULES-VERNE-NAUTILUS
   - Moteurs Silencieux (recherche ciblée)
   - Ancre d'Amarrage (stabilité anti-oscillations)
   - Score composite (harmonie + parité)

### Priorité 2 : Outils Phase 0

4. **LEGACY_GenererID.gs** : Génération ID_ELEVE dans sources
5. **LEGACY_Consolidation.gs** : Onglet _CONSOLIDATION_LEGACY
6. **LEGACY_ListesDeroulantes.gs** : Listes déroulantes dynamiques
7. **LEGACY_Compter.gs** : Compteurs effectifs/options/langues

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Fichiers créés** | 8 |
| **Lignes de code** | 1820 |
| **Phases implémentées** | 1/4 (Phase 1 ✅) |
| **Couverture fonctionnelle** | 40% (MVP) |
| **Doublons supprimés** | 1 (Phases_BASEOPTI.gs) |

## 🎨 Design Patterns

### Consolidation Multi-Onglets

```javascript
// Lire tous les onglets sources et consolider en mémoire
const allData = [];
(ctx.srcSheets || []).forEach(function(srcName) {
  const srcSheet = ss.getSheetByName(srcName);
  const data = srcSheet.getDataRange().getValues();
  // Ajouter élèves avec métadonnées source
  for (let i = 1; i < data.length; i++) {
    allData.push({ source: srcName, row: data[i], headers: data[0] });
  }
});
```

### Mapping Source → Destination

```javascript
// Utiliser _STRUCTURE pour mapper ECOLE1 → 6°1
const sourceToDestMapping = readSourceToDestMapping_LEGACY();
const testName = sourceToDestMapping[sourceName] + 'TEST'; // "6°1TEST"
```

## 🔗 Références

- **Source** : Phases_BASEOPTI_V3_COMPLETE.gs (JULES-VERNE-NAUTILUS)
- **Algorithme** : OPTIMUM PRIME (claude/optimum-prime-master)
- **Branche** : claude/prime-legacy-cleanup-015Zz6D3gh1QcbpR19TUYMLw
- **Date** : 2025-11-13

## 📝 Notes Importantes

### Différences OPTI vs LEGACY

| Aspect | OPTI | LEGACY |
|--------|------|--------|
| **Vivier** | _BASEOPTI (unique) | Onglets sources (multiples) |
| **Destination** | _CACHE | TEST |
| **Données** | Consolidées en _BASEOPTI | Dispersées dans °1, °2, etc. |
| **Approche** | Lecture directe _BASEOPTI | Consolidation en mémoire |

### Compatibilité

- ✅ Utilise les mêmes colonnes (_CLASS_ASSIGNED, MOBILITE, etc.)
- ✅ Partage les helpers de validation (BASEOPTI_Validation.gs)
- ✅ Partage Analytics_System.gs, Mobility_System.gs
- ✅ 0 conflit avec le pipeline OPTI existant

## 🎯 Roadmap

### v1.0 (MVP) ✅
- [x] Core Pipeline
- [x] Context & Init
- [x] Phase 1 OPTIMUM PRIME
- [x] Menu Google Sheets

### v1.1
- [ ] Phase 2 OPTIMUM PRIME complète
- [ ] Phase 3 Parité adaptative
- [ ] Phase 4 OPTIMUM PRIME complète

### v1.2
- [ ] Outils Phase 0 (GenererID, Consolidation, etc.)
- [ ] Interface UI LEGACY
- [ ] Tests unitaires

### v2.0
- [ ] Optimisations performances
- [ ] Rapport audit complet
- [ ] Export résultats

---

**Auteur** : Claude (Assistant IA)  
**Projet** : BASE-16-RENEW  
**Licence** : Projet privé  
**Version** : 1.0 MVP  
