/**
 * ===================================================================
 * PIPELINE OPTI INDÉPENDANT - Utilisé depuis InterfaceV2
 * ===================================================================
 * 
 * Ce pipeline est COMPLÈTEMENT INDÉPENDANT du pipeline classique.
 * 
 * ARCHITECTURE :
 * - Lit depuis _OPTI_CONFIG (PAS _STRUCTURE)
 * - Utilise buildCtx_V2() (PAS makeCtxFromUI_())
 * - Phases BASEOPTI V3
 * - Interface : InterfaceV2.html
 * 
 * SÉPARATION CLAIRE :
 * ┌─────────────────────────────────────────────────────────────┐
 * │ PIPELINE CLASSIQUE (Google Sheets direct)                  │
 * │ - _STRUCTURE                                                │
 * │ - Orchestration_V14I.gs → makeCtxFromUI_()                 │
 * │ - Phases legacy                                             │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────┐
 * │ PIPELINE OPTI (InterfaceV2 indépendant) ← CE FICHIER       │
 * │ - _OPTI_CONFIG                                              │
 * │ - OptiConfig_System.gs → buildCtx_V2()                     │
 * │ - Phases BASEOPTI V3                                        │
 * │ - InterfaceV2.html                                          │
 * └─────────────────────────────────────────────────────────────┘
 */

// ===================================================================
// POINT D'ENTRÉE PRINCIPAL : LANCEMENT OPTIMISATION DEPUIS UI
// ===================================================================

/**
 * Lance l'optimisation complète depuis InterfaceV2
 * 
 * APPELÉ PAR : InterfaceV2_CoreScript.html → google.script.run.runOptimizationOPTI()
 * 
 * @param {Object} options - Options depuis l'UI
 * @returns {Object} Résultat avec statut de chaque phase
 */
function runOptimizationOPTI(options) {
  const startTime = new Date();
  
  // ===================================================================
  // 🔒 SCRIPTLOCK : EMPÊCHER LES LANCEMENTS CONCURRENTS
  // ===================================================================
  // Acquérir le verrou AVANT toute opération pour éviter les interférences
  // entre plusieurs utilisateurs lançant l'optimisation simultanément.
  // Le verrou garantit qu'une seule optimisation s'exécute à la fois.
  const lock = LockService.getScriptLock();
  
  try {
    // Tentative d'acquisition du verrou (timeout 30s)
    // Si un autre utilisateur a déjà le verrou, cette fonction échoue immédiatement
    const hasLock = lock.tryLock(30000);
    
    if (!hasLock) {
      // ❌ VERROU OCCUPÉ : Une autre optimisation est en cours
      logLine('WARN', '🔒 PIPELINE OPTI VERROUILLÉ : Une optimisation est déjà en cours');
      logLine('WARN', '   → Un autre utilisateur a lancé l\'optimisation');
      logLine('WARN', '   → Veuillez attendre la fin de l\'optimisation en cours');
      
      return {
        success: false,
        ok: false,
        locked: true,
        error: 'Une optimisation est déjà en cours. Veuillez patienter.',
        message: 'Pipeline verrouillé : une autre optimisation est en cours d\'exécution.'
      };
    }
    
    // ✅ VERROU ACQUIS : L'optimisation peut démarrer
    logLine('INFO', '='.repeat(80));
    logLine('INFO', '🚀 LANCEMENT PIPELINE OPTI INDÉPENDANT (depuis InterfaceV2)');
    logLine('INFO', '🔒 Verrou acquis : optimisation exclusive démarrée');
    logLine('INFO', '='.repeat(80));

    // ✅ CONSTRUIRE LE CONTEXTE DEPUIS _OPTI_CONFIG (PAS _STRUCTURE)
    const ctx = buildCtx_V2(options);
    
    logLine('INFO', '📋 Contexte OPTI créé :');
    logLine('INFO', '  - Mode: ' + ctx.modeSrc);
    logLine('INFO', '  - Classes: ' + ctx.niveaux.join(', '));
    logLine('INFO', '  - Max swaps: ' + ctx.maxSwaps);
    logLine('INFO', '  - Weights: ' + JSON.stringify(ctx.weights));
    logLine('INFO', '  - Runtime: ' + ctx.runtimeSec + 's');

    const phasesOut = [];
    let ok = true;

    // ===== INIT : VIDER CACHE ET CRÉER _BASEOPTI =====
    logLine('INFO', '\n🔧 INIT : Préparation _BASEOPTI...');
    const initResult = initOptimization_V3(ctx);
    phasesOut.push({ phase: 'INIT', ok: initResult.ok, total: initResult.total });
    ok = ok && initResult.ok;
    logLine('INFO', '✅ INIT terminé : ' + initResult.total + ' élèves dans _BASEOPTI');

    // ===== PHASE 1 : OPTIONS & LV2 =====
    logLine('INFO', '\n📌 PHASE 1 : Options & LV2...');
    const p1 = Phase1I_dispatchOptionsLV2_BASEOPTI_V3(ctx);
    phasesOut.push({ phase: 'Phase 1', ok: p1.ok, counts: p1.counts });
    ok = ok && p1.ok;
    logLine('INFO', '✅ Phase 1 terminée : ' + JSON.stringify(p1.counts || {}));

    // ===== PHASE 2 : CODES ASSO/DISSO =====
    logLine('INFO', '\n📌 PHASE 2 : Codes ASSO/DISSO...');
    const p2 = Phase2I_applyDissoAsso_BASEOPTI_V3(ctx);
    phasesOut.push({ phase: 'Phase 2', ok: p2.ok, asso: p2.asso, disso: p2.disso });
    ok = ok && p2.ok;
    logLine('INFO', '✅ Phase 2 terminée : ASSO=' + p2.asso + ', DISSO=' + p2.disso);

    // ===== PHASE 3 : EFFECTIFS & PARITÉ =====
    logLine('INFO', '\n📌 PHASE 3 : Effectifs & Parité...');
    const p3 = Phase3I_completeAndParity_BASEOPTI_V3(ctx);
    phasesOut.push({ phase: 'Phase 3', ok: p3.ok });
    ok = ok && p3.ok;
    logLine('INFO', '✅ Phase 3 terminée');

    // ===== PHASE 4 : SWAPS SCORES =====
    logLine('INFO', '\n📌 PHASE 4 : Swaps scores...');
    const p4 = Phase4_balanceScoresSwaps_BASEOPTI_V3(ctx);
    phasesOut.push({ phase: 'Phase 4', ok: p4.ok, swaps: p4.swapsApplied });
    ok = ok && p4.ok;
    logLine('INFO', '✅ Phase 4 terminée : ' + (p4.swapsApplied || 0) + ' swaps appliqués');

    const endTime = new Date();
    const durationSec = (endTime - startTime) / 1000;

    logLine('INFO', '='.repeat(80));
    logLine('INFO', '✅ PIPELINE OPTI TERMINÉ EN ' + durationSec.toFixed(2) + 's');
    logLine('INFO', 'Swaps totaux : ' + (p4.swapsApplied || 0));
    logLine('INFO', '='.repeat(80));

    // ===================================================================
    // 🔄 SYNCHRONISATION UI : FORCER L'AFFICHAGE DES ONGLETS CACHE
    // ===================================================================
    // Après optimisation réussie, synchroniser l'interface pour afficher
    // les onglets CACHE et déclencher un reload côté front
    if (ok && typeof forceCacheInUIAndReload_ === 'function') {
      logLine('INFO', '🔄 Synchronisation UI : basculement vers onglets CACHE...');
      forceCacheInUIAndReload_(ctx);
      logLine('INFO', '✅ UI synchronisée : onglets CACHE activés');
    }

    // ===================================================================
    // 📊 ANALYTICS : SAUVEGARDER UN SNAPSHOT
    // ===================================================================
    // Après optimisation réussie, générer et sauvegarder un snapshot analytique
    if (ok && typeof buildAnalyticsSnapshot === 'function' && typeof saveAnalyticsSnapshot === 'function') {
      logLine('INFO', '📊 Génération du snapshot analytique...');
      
      const snapshotResult = buildAnalyticsSnapshot({ pipeline: 'OPTI' });
      
      if (snapshotResult.success) {
        const optimizationResult = {
          nbSwaps: p4.swapsApplied || 0,
          durationSec: durationSec,
          success: ok
        };
        
        saveAnalyticsSnapshot(snapshotResult.snapshot, optimizationResult);
        logLine('INFO', '✅ Snapshot analytique sauvegardé');
      } else {
        logLine('WARN', '⚠️ Erreur génération snapshot : ' + snapshotResult.error);
      }
    }

    return {
      success: ok,
      ok: ok,
      phases: phasesOut,
      nbSwaps: p4.swapsApplied || 0,
      swaps: p4.swapsApplied || 0,
      tempsTotalMs: Math.round(durationSec * 1000),
      durationSec: durationSec,
      writeSuffix: 'CACHE',
      sourceSuffix: ctx.modeSrc || 'TEST'
    };

  } catch (e) {
    logLine('ERROR', '❌ Erreur pipeline OPTI : ' + e.message);
    logLine('ERROR', e.stack);
    
    return {
      success: false,
      ok: false,
      error: e.message,
      stack: e.stack
    };
    
  } finally {
    // ===================================================================
    // 🔓 LIBÉRATION DU VERROU : TOUJOURS EXÉCUTÉ
    // ===================================================================
    // Le bloc finally garantit que le verrou est TOUJOURS libéré,
    // même en cas d'erreur, de return anticipé ou d'exception.
    // Sans finally, une erreur pourrait laisser le verrou retenu
    // jusqu'au timeout Google Apps Script (~30s), bloquant les
    // lancements suivants.
    try {
      if (lock && lock.hasLock()) {
        lock.releaseLock();
        logLine('INFO', '🔓 Verrou libéré : pipeline OPTI disponible pour d\'autres utilisateurs');
      }
    } catch (releaseError) {
      // En cas d'erreur lors de la libération (très rare),
      // logger l'erreur mais ne pas bloquer le retour de la fonction
      logLine('ERROR', '⚠️ Erreur lors de la libération du verrou : ' + releaseError.message);
    }
  }
}

// ===================================================================
// GESTION CONFIGURATION UI
// ===================================================================

/**
 * Récupère la configuration OPTI pour l'afficher dans l'UI
 * 
 * APPELÉ PAR : InterfaceV2 → google.script.run.getOptiConfigForUI()
 * 
 * @returns {Object} Configuration avec mode, weights, maxSwaps, etc.
 */
function getOptiConfigForUI() {
  try {
    const ctx = getOptimizationContext_V2();
    
    return {
      success: true,
      config: {
        mode: ctx.mode,
        weights: ctx.weights,
        maxSwaps: ctx.maxSwaps,
        runtimeSec: ctx.runtimeSec,
        parityTolerance: ctx.parityTolerance,
        targets: ctx.targetsByClass,
        quotas: ctx.offersByClass
      }
    };
  } catch (e) {
    logLine('ERROR', '❌ Erreur getOptiConfigForUI : ' + e.message);
    return {
      success: false,
      error: e.message
    };
  }
}

/**
 * Sauvegarde la configuration OPTI depuis l'UI
 * 
 * APPELÉ PAR : InterfaceV2 → google.script.run.saveOptiConfigFromUI(config)
 * 
 * @param {Object} config - Configuration depuis l'UI
 * @returns {Object} Résultat de la sauvegarde
 */
function saveOptiConfigFromUI(config) {
  try {
    logLine('INFO', '💾 Sauvegarde configuration OPTI depuis UI...');
    
    // Sauvegarder dans _OPTI_CONFIG
    if (config.mode) {
      kvSet_('mode.selected', config.mode);
    }
    
    if (config.weights) {
      kvSet_('weights', JSON.stringify(config.weights));
    }
    
    if (config.maxSwaps !== undefined) {
      kvSet_('swaps.max', String(config.maxSwaps));
    }
    
    if (config.runtimeSec !== undefined) {
      kvSet_('swaps.runtime', String(config.runtimeSec));
    }
    
    if (config.parityTolerance !== undefined) {
      kvSet_('parity.tolerance', String(config.parityTolerance));
    }
    
    if (config.targets) {
      kvSet_('targets.byClass', JSON.stringify(config.targets));
      
      // Sauvegarder aussi individuellement pour overrides
      for (const classe in config.targets) {
        kvSet_('targets.override.' + classe, String(config.targets[classe]));
      }
    }
    
    if (config.quotas) {
      kvSet_('offers.byClass', JSON.stringify(config.quotas));
    }
    
    SpreadsheetApp.flush();
    
    logLine('INFO', '✅ Configuration OPTI sauvegardée dans _OPTI_CONFIG');
    
    return {
      success: true,
      message: 'Configuration sauvegardée avec succès'
    };
    
  } catch (e) {
    logLine('ERROR', '❌ Erreur saveOptiConfigFromUI : ' + e.message);
    return {
      success: false,
      error: e.message
    };
  }
}

/**
 * Initialise _OPTI_CONFIG avec des valeurs par défaut
 * 
 * APPELÉ PAR : InterfaceV2 au démarrage ou manuellement
 * 
 * @returns {Object} Résultat de l'initialisation
 */
function initOptiConfig() {
  try {
    logLine('INFO', '🔧 Initialisation _OPTI_CONFIG...');
    
    // Valeurs par défaut
    kvSet_('mode.selected', 'TEST');
    kvSet_('weights', JSON.stringify({
      parity: 0.3,
      com: 0.4,
      tra: 0.1,
      part: 0.1,
      abs: 0.1
    }));
    kvSet_('parity.tolerance', '2');
    kvSet_('swaps.max', '500');  // ✅ VALEUR PAR DÉFAUT (PAS 0 !)
    kvSet_('swaps.runtime', '180');
    
    // Targets par défaut (sera recalculé dynamiquement)
    const defaultTargets = {
      '6°1': 25,
      '6°2': 25,
      '6°3': 25,
      '6°4': 25,
      '6°5': 25
    };
    kvSet_('targets.byClass', JSON.stringify(defaultTargets));
    
    SpreadsheetApp.flush();
    
    logLine('INFO', '✅ _OPTI_CONFIG initialisé avec valeurs par défaut');
    
    return {
      success: true,
      message: '_OPTI_CONFIG initialisé'
    };
    
  } catch (e) {
    logLine('ERROR', '❌ Erreur initOptiConfig : ' + e.message);
    return {
      success: false,
      error: e.message
    };
  }
}

// ===================================================================
// FONCTIONS DE TEST
// ===================================================================

/**
 * Teste la configuration OPTI
 */
function testOptiConfig() {
  console.log('='.repeat(80));
  console.log('TEST CONFIGURATION OPTI');
  console.log('='.repeat(80));
  
  const ctx = getOptimizationContext_V2();
  
  console.log('Mode:', ctx.mode);
  console.log('Max Swaps:', ctx.maxSwaps);
  console.log('Runtime:', ctx.runtimeSec + 's');
  console.log('Weights:', JSON.stringify(ctx.weights, null, 2));
  console.log('Parité tolérance:', ctx.parityTolerance);
  console.log('Targets:', JSON.stringify(ctx.targetsByClass, null, 2));
  console.log('Quotas:', JSON.stringify(ctx.offersByClass, null, 2));
  
  console.log('='.repeat(80));
  
  return ctx;
}

/**
 * Teste le pipeline OPTI complet
 */
function testOptiPipeline() {
  console.log('='.repeat(80));
  console.log('TEST PIPELINE OPTI COMPLET');
  console.log('='.repeat(80));
  
  const result = runOptimizationOPTI({
    sourceFamily: 'TEST'
  });
  
  console.log('Résultat:', JSON.stringify(result, null, 2));
  
  return result;
}
