# Guide d'intégration - Phase 3 Parité Adaptative

## Vue d'ensemble

Le nouveau système de Phase 3 (`Phase3_PariteAdaptive_V3.gs`) remplace l'ancien algorithme par une approche plus équilibrée et traçable qui :

✅ **Calcule les ratios à partir du vivier restant uniquement** (poolF/poolM), pas de _BASEOPTI complet
✅ **Utilise la méthode des plus forts restes** pour une distribution mathématiquement juste
✅ **Applique réellement la tolérance de parité** configurée dans l'UI
✅ **Élimine les biais systématiques** avec un tie-break par alternance F/M
✅ **Implémente un fallback contrôlé** avec scoring et logging détaillé
✅ **Respecte toujours les contraintes LV2/OPT/ASSO/DISSO** via canPlaceInClass_V3

## Différences avec l'ancien système

### Ancien système (Phase3I_completeAndParity_BASEOPTI_V3)
```javascript
// ❌ Problèmes :
- Ratio calculé sur TOUS les élèves (_BASEOPTI complet)
- Pas d'utilisation de parityTolerance
- Biais systématique : wantF = ecartF < ecartM (favorise les garçons en cas d'égalité)
- Fallback non contrôlé qui peut dégrader la parité
- Pas de traçabilité des décisions
```

### Nouveau système (Phase3I_completeAndParity_PariteAdaptive_V3)
```javascript
// ✅ Améliorations :
- Ratio calculé uniquement sur poolF/poolM (vivier restant)
- Tolérance de parité vraiment appliquée
- Tie-break neutre avec alternance lastSexUsed
- Fallback avec calcul de pénalité (ne prend que si améliore/maintient parité)
- Logging détaillé de chaque décision
```

## Intégration

### Option 1 : Remplacement complet

Dans votre fichier d'orchestration principal (ex: `Orchestration_V14I.gs`), remplacez l'appel à l'ancienne fonction :

```javascript
// AVANT
const p3Result = Phase3I_completeAndParity_BASEOPTI_V3(ctx);

// APRÈS
const p3Result = Phase3I_completeAndParity_PariteAdaptive_V3(ctx);
```

### Option 2 : Mode test (recommandé)

Gardez les deux versions et permettez de choisir via un paramètre :

```javascript
// Dans ctx, ajouter un flag
ctx.useAdaptiveParity = true; // ou lire depuis UI

// Dans l'orchestration
if (ctx.useAdaptiveParity) {
  const p3Result = Phase3I_completeAndParity_PariteAdaptive_V3(ctx);
} else {
  const p3Result = Phase3I_completeAndParity_BASEOPTI_V3(ctx);
}
```

## Configuration requise

### Paramètre obligatoire : parityTolerance

Le nouveau système nécessite le paramètre `parityTolerance` dans le contexte :

```javascript
ctx.parityTolerance = 1; // ±1 élève de différence F/M accepté par classe
```

Valeurs recommandées :
- **0** : Parité parfaite (très stricte, peut bloquer certaines classes)
- **1** : Équilibrée (recommandé pour la plupart des cas)
- **2** : Tolérante (pour les petites classes ou contraintes fortes)

### Paramètres existants utilisés

Le nouveau système utilise les mêmes paramètres que l'ancien :

```javascript
ctx.ss = SpreadsheetApp.getActive(); // Spreadsheet
ctx.levels = ['6°1', '6°2', '6°3']; // Noms des classes
ctx.targets = { '6°1': 30, '6°2': 30, '6°3': 30 }; // Effectifs cibles
ctx.quotas = { // Quotas LV2/OPT par classe
  '6°1': { 'ITA': 5, 'CHAV': 10 },
  '6°2': { 'ESP': 5, 'CHAV': 10 }
  // ...
};
```

## Fonctions exportées

### Fonction principale

```javascript
Phase3I_completeAndParity_PariteAdaptive_V3(ctx)
```

**Retour :**
```javascript
{
  ok: true,
  placed: 85,           // Nombre total d'élèves placés
  placedF: 42,          // Filles placées
  placedM: 43,          // Garçons placés
  remaining: 0,         // Élèves non placés (bloqués par contraintes)
  iterations: 47        // Nombre d'itérations de la boucle
}
```

### Fonctions utilitaires (réutilisables)

Ces fonctions peuvent être appelées indépendamment pour des diagnostics :

```javascript
// Calcul des quotas F/M avec méthode des plus forts restes
calculateParityTargets_V3(ctx, classes, poolF, poolM)

// Décision du sexe à placer pour un siège
decideSexForSeat_V3(C, ctx, meta)

// Sélection d'un élève compatible
pickStudentFromPool_V3(sex, C, ctx)

// Calcul de la pénalité de parité après placement
parityPenaltyAfterPlacement_V3(C, sex, parityTolerance)

// Logging d'une décision
logParityDecision_V3(C, details)
```

## Logging et traçabilité

Le nouveau système logue chaque décision avec le format suivant :

```
[PHASE3_PARITY] 6°1 | PLACE | F | DUPONT Marie | primary_parity_choice
[PHASE3_PARITY] 6°2 | FALLBACK_SEX | F→M | no_compatible_candidate_primary_sex | penalty: orig=2.00, fallback=1.00
[PHASE3_PARITY] 6°3 | SKIP_SLOT | fallback_would_worsen_parity | F→M
[PHASE3_PARITY] 6°1 | BLOCKED_SLOT | no_candidate_any_sex
```

### Types de décisions loggées

| Type | Description |
|------|-------------|
| `PLACE` | Placement normal d'un élève |
| `FALLBACK_SEX` | Fallback vers l'autre sexe (avec calcul de pénalité) |
| `SKIP_SLOT` | Siège sauté (fallback refusé car dégraderait la parité) |
| `BLOCKED_SLOT` | Siège bloqué (aucun candidat compatible) |

## Monitoring

### Après la Phase 3, vérifier :

1. **Parité par classe** : Toutes les classes doivent être dans la tolérance
2. **Pool restant** : Doit être proche de 0 (sauf si contraintes bloquantes)
3. **Logs de fallback** : Nombre de fallbacks acceptés vs refusés
4. **Élèves bloqués** : Si > 0, vérifier les contraintes DISSO/ASSO/LV2/OPT

### Exemple de rapport final

```
✅ PHASE 3 V3 - PARITÉ ADAPTATIVE terminée
  Placés : 85 élèves (42 F / 43 M)
  Pool restant : 0 F, 0 M

📊 État final par classe :
  ✅ 6°1 : 30/30 (15F/15M = 50.0% F)
  ✅ 6°2 : 28/30 (14F/14M = 50.0% F)
  ⚠️ 6°3 : 27/30 (13F/14M = 48.1% F)
```

## Compatibilité

Le nouveau système est **100% compatible** avec le code existant :

- ✅ Utilise les mêmes structures de données (_BASEOPTI, colonnes _CLASS_ASSIGNED)
- ✅ Appelle `canPlaceInClass_V3` pour valider toutes les contraintes
- ✅ Synchronise les colonnes legacy via `syncClassAssignedToLegacy_`
- ✅ Recalcule la mobilité via `computeMobilityFlags_`
- ✅ Retourne le même format de résultat `{ ok: true, ... }`

## Migration progressive

### Phase 1 : Test en parallèle

1. Ajouter `Phase3_PariteAdaptive_V3.gs` au projet
2. Garder l'ancien code actif par défaut
3. Créer un flag `useAdaptiveParity` dans l'UI
4. Tester sur quelques jeux de données

### Phase 2 : Comparaison

Exécuter les deux versions et comparer :
- Variance de parité entre classes
- Nombre d'élèves placés
- Respect des contraintes LV2/OPT

### Phase 3 : Basculement

Une fois validé :
1. Activer par défaut le nouveau système
2. Garder l'ancien en fallback pendant 1-2 semaines
3. Supprimer l'ancien code

## Troubleshooting

### Problème : Classes déséquilibrées après Phase 3

**Cause possible :** Tolérance trop élevée ou contraintes DISSO/ASSO bloquantes

**Solution :**
```javascript
// Réduire la tolérance
ctx.parityTolerance = 1; // au lieu de 2

// Vérifier les logs pour identifier les contraintes bloquantes
// Rechercher : BLOCKED_SLOT, SKIP_SLOT
```

### Problème : Boucle infinie (rare)

**Cause possible :** Configuration incohérente (target > élèves disponibles)

**Solution :**
```javascript
// La boucle a une limite de sécurité à 1000 itérations
// Vérifier dans les logs :
⚠️ Limite d'itérations atteinte (1000)

// Vérifier la cohérence des données :
- Sum(targets) <= nombre total d'élèves
- Quotas LV2/OPT cohérents avec le vivier
```

### Problème : Trop de fallbacks

**Cause possible :** Contraintes LV2/OPT trop restrictives

**Solution :**
```javascript
// Analyser les logs FALLBACK_SEX
// Si beaucoup de fallbacks pour une classe spécifique :
// -> Revoir les quotas LV2/OPT de cette classe
```

## Support

Pour toute question sur l'intégration :

1. Vérifier les logs détaillés de la Phase 3
2. Consulter ce guide
3. Comparer avec l'ancien système en mode parallèle
4. Ajuster `parityTolerance` selon les besoins

## Checklist d'intégration

- [ ] Fichier `Phase3_PariteAdaptive_V3.gs` ajouté au projet
- [ ] Paramètre `ctx.parityTolerance` configuré
- [ ] Appel à `Phase3I_completeAndParity_PariteAdaptive_V3(ctx)` intégré
- [ ] Tests sur plusieurs jeux de données
- [ ] Vérification des logs de parité
- [ ] Validation des résultats (parité, contraintes respectées)
- [ ] Documentation mise à jour pour les utilisateurs finaux
