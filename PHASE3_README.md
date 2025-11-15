# Phase 3 - Parité Adaptative V3

## 🎯 Nouveau système de gestion de la parité F/M

Ce dossier contient la nouvelle implémentation de la Phase 3 avec un système de parité adaptative qui corrige les défauts de l'ancien algorithme.

## 📦 Fichiers créés

### 1. `Phase3_PariteAdaptive_V3.gs` (Principal)
Le code principal du nouveau système avec toutes les fonctions :

- **`Phase3I_completeAndParity_PariteAdaptive_V3(ctx)`** : Fonction principale
- **`calculateParityTargets_V3()`** : Calcul des quotas F/M avec méthode des plus forts restes
- **`decideSexForSeat_V3()`** : Décision du sexe à placer (avec tolérance)
- **`pickStudentFromPool_V3()`** : Sélection d'un élève compatible
- **`parityPenaltyAfterPlacement_V3()`** : Calcul de la pénalité de parité (pour fallback)
- **`logParityDecision_V3()`** : Logging détaillé des décisions

### 2. `PHASE3_INTEGRATION_GUIDE.md` (Documentation)
Guide complet d'intégration avec :

- Comparaison ancien vs nouveau système
- Instructions d'intégration pas à pas
- Configuration requise (`parityTolerance`)
- Format de logging et monitoring
- Troubleshooting

### 3. `Phase3_PariteAdaptive_Tests.gs` (Tests)
Suite de tests unitaires :

- 9 tests unitaires couvrant toutes les fonctions
- Test d'intégration complet
- Fonction `runAllPhase3Tests()` pour lancer tous les tests

### 4. `PHASE3_README.md` (Ce fichier)
Résumé et vue d'ensemble

## 🚀 Quick Start

### Étape 1 : Ajouter les fichiers au projet

1. Copier `Phase3_PariteAdaptive_V3.gs` dans votre projet Apps Script
2. Copier `Phase3_PariteAdaptive_Tests.gs` (optionnel mais recommandé)

### Étape 2 : Configurer le contexte

```javascript
ctx.parityTolerance = 1; // ±1 élève de différence F/M accepté
```

### Étape 3 : Appeler la nouvelle fonction

**Option A : Remplacement direct**
```javascript
// Remplacer
const p3Result = Phase3I_completeAndParity_BASEOPTI_V3(ctx);

// Par
const p3Result = Phase3I_completeAndParity_PariteAdaptive_V3(ctx);
```

**Option B : Mode test avec flag**
```javascript
if (ctx.useAdaptiveParity) {
  const p3Result = Phase3I_completeAndParity_PariteAdaptive_V3(ctx);
} else {
  const p3Result = Phase3I_completeAndParity_BASEOPTI_V3(ctx);
}
```

### Étape 4 : Tester

```javascript
// Lancer les tests unitaires
runAllPhase3Tests();

// Ou tester sur un vrai jeu de données
testFullIntegration();
```

## ✨ Améliorations majeures

| Aspect | Ancien système | Nouveau système |
|--------|---------------|-----------------|
| **Ratio F/M** | Calculé sur _BASEOPTI complet | Calculé sur poolF/poolM uniquement ✅ |
| **Distribution quotas** | Arrondis indépendants par classe | Méthode des plus forts restes ✅ |
| **Tolérance de parité** | Ignorée | Vraiment appliquée ✅ |
| **Tie-break** | Biais vers garçons (`wantF = false`) | Alternance neutre F/M ✅ |
| **Fallback** | Non contrôlé | Avec scoring et pénalité ✅ |
| **Logging** | Minimal | Détaillé (PLACE, FALLBACK, SKIP, BLOCKED) ✅ |

## 📊 Exemple de résultat

```
📌 PHASE 3 V3 - PARITÉ ADAPTATIVE (Nouveau système)
⚙️ Tolérance de parité : ±1 élève(s)

📊 Ratio vivier restant : 48.2% F / 51.8% M
   Pool : 42 F, 45 M (87 élèves)

🎯 Quotas globaux pour 87 sièges : 42 F / 45 M

  📌 6°1 : cible=14F/16M (actuel=0F/0M, à placer=14F/16M)
  📌 6°2 : cible=14F/15M (actuel=0F/0M, à placer=14F/15M)
  📌 6°3 : cible=14F/14M (actuel=0F/0M, à placer=14F/14M)

[PHASE3_PARITY] 6°1 | PLACE | F | DUPONT Marie | primary_parity_choice
[PHASE3_PARITY] 6°1 | PLACE | M | MARTIN Paul | primary_parity_choice
...

✅ PHASE 3 V3 - PARITÉ ADAPTATIVE terminée
  Placés : 87 élèves (42 F / 45 M)
  Pool restant : 0 F, 0 M

📊 État final par classe :
  ✅ 6°1 : 30/30 (14F/16M = 46.7% F)
  ✅ 6°2 : 29/30 (14F/15M = 48.3% F)
  ✅ 6°3 : 28/30 (14F/14M = 50.0% F)
```

## 🔧 Configuration de la tolérance

### Valeurs recommandées

```javascript
// Parité très stricte (peut bloquer certaines classes)
ctx.parityTolerance = 0;

// Parité équilibrée (RECOMMANDÉ)
ctx.parityTolerance = 1;

// Parité tolérante (pour petites classes ou contraintes fortes)
ctx.parityTolerance = 2;
```

### Impact de la tolérance

| Tolérance | Classes 30 élèves | Comportement |
|-----------|------------------|--------------|
| **0** | Exactement 15F/15M | Très strict, peut bloquer |
| **1** | 14-16F / 14-16M | Équilibré, flexible |
| **2** | 13-17F / 13-17M | Tolérant, priorité aux contraintes |

## 📈 Monitoring

### Logs à surveiller

```
✅ PLACE : Placement normal (90%+ attendu)
⚠️ FALLBACK_SEX : Fallback accepté (5-10% acceptable)
⚠️ SKIP_SLOT : Fallback refusé (rare, <5%)
❌ BLOCKED_SLOT : Aucun candidat (doit être 0 ou investigation nécessaire)
```

### KPI de qualité

1. **Taux de placement** : `totalPlaced / poolSize` > 95%
2. **Parité par classe** : Toutes les classes dans la tolérance ✅
3. **Taux de fallback** : `FALLBACK_SEX / PLACE` < 10%
4. **Élèves bloqués** : `remaining = 0` ✅

## 🔍 Diagnostic des problèmes

### Problème : Classes déséquilibrées

```
📊 État final par classe :
  ⚠️ 6°3 : 27/30 (11F/16M = 40.7% F)  ← Déséquilibrée
```

**Solutions :**
1. Vérifier `parityTolerance` (augmenter si nécessaire)
2. Chercher dans les logs : `[PHASE3_PARITY] 6°3 | BLOCKED_SLOT`
3. Identifier les contraintes bloquantes (DISSO/ASSO/LV2/OPT)

### Problème : Trop de fallbacks

```
[PHASE3_PARITY] 6°2 | FALLBACK_SEX | F→M | no_compatible_candidate_primary_sex
[PHASE3_PARITY] 6°2 | FALLBACK_SEX | F→M | no_compatible_candidate_primary_sex
...
```

**Solutions :**
1. Vérifier les quotas LV2/OPT de la classe concernée
2. Revoir les codes DISSO/ASSO
3. Assouplir les contraintes si possible

### Problème : Pool restant non vide

```
⚠️ 5 élèves non placés après Phase 3 (contraintes bloquantes)
```

**Solutions :**
1. Chercher `BLOCKED_SLOT` dans les logs
2. Vérifier la cohérence : `Sum(targets) = nombre total d'élèves`
3. Identifier les élèves non placés et leurs contraintes

## 🧪 Tests

### Lancer les tests unitaires

```javascript
// Dans l'éditeur Apps Script
runAllPhase3Tests();
```

**Résultat attendu :**
```
🧪 TESTS UNITAIRES - PHASE 3 PARITÉ ADAPTATIVE
✅ testCalculateParityTargets
✅ testDecideSexForSeat_WithinTolerance
✅ testDecideSexForSeat_OutsideTolerance
✅ testDecideSexForSeat_TieBreak
✅ testParityPenaltyCalculation
✅ testPickStudentFromPool
✅ testOppositeSex
✅ testGlobalNeed
✅ testLargestRemainderMethod

📊 RÉSUMÉ DES TESTS
Total : 9
✅ Réussis : 9
❌ Échoués : 0
Taux de réussite : 100.0%
```

### Test d'intégration

```javascript
// Sur un vrai jeu de données
testFullIntegration();
```

## 🔄 Migration

### Plan de migration recommandé

**Semaine 1 : Test en parallèle**
- Garder l'ancien système actif
- Activer le nouveau via flag `useAdaptiveParity`
- Tester sur plusieurs jeux de données
- Comparer les résultats

**Semaine 2 : Validation**
- Analyser les logs
- Vérifier les KPI (parité, placement, contraintes)
- Ajuster `parityTolerance` si nécessaire
- Valider avec les utilisateurs finaux

**Semaine 3 : Basculement**
- Activer par défaut le nouveau système
- Garder l'ancien en fallback
- Monitorer les premiers lancements

**Semaine 4 : Nettoyage**
- Supprimer l'ancien code si validation OK
- Mettre à jour la documentation utilisateur

## 📚 Documentation complète

- **Guide d'intégration** : `PHASE3_INTEGRATION_GUIDE.md`
- **Code source** : `Phase3_PariteAdaptive_V3.gs`
- **Tests** : `Phase3_PariteAdaptive_Tests.gs`

## 🤝 Support

En cas de problème :

1. Consulter le guide d'intégration (`PHASE3_INTEGRATION_GUIDE.md`)
2. Vérifier les logs détaillés
3. Lancer les tests unitaires
4. Comparer avec l'ancien système en mode parallèle

## ✅ Checklist de déploiement

- [ ] Fichiers copiés dans le projet Apps Script
- [ ] `ctx.parityTolerance` configuré
- [ ] Tests unitaires exécutés (100% de réussite)
- [ ] Test d'intégration sur données réelles
- [ ] Logs vérifiés (taux de PLACE > 90%)
- [ ] Parité validée sur toutes les classes
- [ ] Contraintes LV2/OPT respectées
- [ ] Pool restant = 0 (ou explication des blocages)
- [ ] Validation avec utilisateurs finaux
- [ ] Documentation mise à jour

---

**Version** : 1.0.0
**Date** : 2025-11-13
**Auteur** : Claude Code Assistant
