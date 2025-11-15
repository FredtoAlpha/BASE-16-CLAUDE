/**
 * ===================================================================
 * 🚀 PRIME LEGACY - PIPELINE PRINCIPAL
 * ===================================================================
 *
 * Pipeline LEGACY optimisé basé sur OPTIMUM PRIME (BASEOPTI V3)
 *
 * ARCHITECTURE :
 * - LECTURE : Onglets sources (°1, °2, etc.)
 * - ÉCRITURE : Onglets TEST
 * - LOGIQUE : Phases BASEOPTI V3 (OPTIMUM PRIME - 0 bugs)
 *
 * ISOLATION COMPLÈTE :
 * - OPTI : _BASEOPTI → _CACHE → FIN
 * - LEGACY : Sources (°1, °2) → TEST
 * - 0 INTERFÉRENCE : Onglets différents, fonctions partagées sûres
 *
 * Date : 2025-11-13
 * Branche : claude/PRIME-LEGACY-01SJDcJv7zHGGBXWhHpzfnxr
 *
 * ===================================================================
 */

// ===================================================================
// PIPELINE COMPLET LEGACY
// ===================================================================

/**
 * Lance le pipeline LEGACY complet
 * Sources (6°1, 6°2...) → TEST (6°1TEST, 6°2TEST...)
 *
 * @returns {Object} Résultat du pipeline avec statistiques
 */
function legacy_runFullPipeline_PRIME() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    '🚀 PRIME LEGACY - Pipeline Complet',
    'Cette action va :\n\n' +
    '1. Détecter automatiquement les onglets sources (°1, °2, etc.)\n' +
    '2. Créer les onglets TEST\n' +
    '3. Lancer les 4 phases OPTIMUM PRIME :\n' +
    '   • Phase 1 : Options & LV2\n' +
    '   • Phase 2 : ASSO/DISSO\n' +
    '   • Phase 3 : Effectifs & Parité\n' +
    '   • Phase 4 : Équilibrage Scores (OPTIMUM PRIME)\n\n' +
    'Durée estimée : 2-5 minutes\n\n' +
    'Continuer ?',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    logLine('INFO', '❌ Pipeline LEGACY annulé par l\'utilisateur');
    return { ok: false, message: 'Annulé par l\'utilisateur' };
  }

  try {
    const startTime = new Date();
    SpreadsheetApp.getActiveSpreadsheet().toast('🚀 Lancement PRIME LEGACY...', 'En cours', -1);

    logLine('INFO', '='.repeat(80));
    logLine('INFO', '🚀 PRIME LEGACY - PIPELINE COMPLET');
    logLine('INFO', '='.repeat(80));

    // ========== ÉTAPE 0 : AUTO-DIAGNOSTIC ==========
    SpreadsheetApp.getActiveSpreadsheet().toast('Diagnostic pré-lancement...', 'Vérifications', -1);

    if (typeof runLegacyDiagnostic === 'function') {
      const diagnostic = runLegacyDiagnostic(false);

      if (!diagnostic.ok && diagnostic.errors.length > 0) {
        // Erreurs critiques détectées
        ui.alert(
          '❌ Diagnostic Échoué',
          'Le diagnostic a détecté des erreurs critiques :\n\n' +
          diagnostic.errors.join('\n\n') +
          '\n\nCorrigez ces erreurs avant de relancer le pipeline.',
          ui.ButtonSet.OK
        );
        return { ok: false, message: 'Diagnostic échoué' };
      }

      if (diagnostic.warnings.length > 0) {
        // Avertissements détectés - demander confirmation
        const warningResponse = ui.alert(
          '⚠️ Avertissements Détectés',
          'Le diagnostic a détecté des avertissements :\n\n' +
          diagnostic.warnings.join('\n\n') +
          '\n\nVoulez-vous continuer malgré tout ?',
          ui.ButtonSet.YES_NO
        );

        if (warningResponse !== ui.Button.YES) {
          logLine('INFO', '❌ Pipeline annulé suite aux avertissements du diagnostic');
          return { ok: false, message: 'Annulé par l\'utilisateur (avertissements)' };
        }
      }

      logLine('INFO', '✅ Diagnostic pré-lancement réussi');
    } else {
      logLine('WARN', '⚠️ runLegacyDiagnostic() non disponible, diagnostic ignoré');
    }

    // ========== ÉTAPE 1 : CONSTRUIRE CONTEXTE LEGACY ==========
    SpreadsheetApp.getActiveSpreadsheet().toast('Détection onglets sources...', 'Initialisation', -1);

    // ✅ FIX: Détection automatique des onglets sources (°1, °2, etc.)
    const ctx = typeof makeCtxFromSourceSheets_LEGACY === 'function'
      ? makeCtxFromSourceSheets_LEGACY()
      : null;

    if (!ctx) {
      throw new Error('❌ makeCtxFromSourceSheets_LEGACY() non trouvée ! Vérifier LEGACY_Context.gs');
    }

    logLine('INFO', '📋 Contexte LEGACY créé :');
    logLine('INFO', '  • Sources : ' + (ctx.srcSheets || []).join(', '));
    logLine('INFO', '  • Destinations TEST : ' + (ctx.cacheSheets || []).join(', '));
    logLine('INFO', '  • Niveaux : ' + (ctx.niveaux || []).join(', '));

    // ========== ÉTAPE 2 : CRÉER ONGLETS TEST ==========
    SpreadsheetApp.getActiveSpreadsheet().toast('Création onglets TEST...', 'Initialisation', -1);

    if (typeof initEmptyTestTabs_LEGACY === 'function') {
      const initResult = initEmptyTestTabs_LEGACY(ctx);
      logLine('INFO', '✅ Onglets TEST créés : ' + (initResult.opened || []).join(', '));
    } else {
      throw new Error('❌ initEmptyTestTabs_LEGACY() non trouvée ! Vérifier LEGACY_Init_Onglets.gs');
    }

    // ========== ÉTAPE 3 : PHASE 1 - OPTIONS & LV2 ==========
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 1/4...', 'Options & LV2', -1);
    logLine('INFO', '');

    if (typeof Phase1I_dispatchOptionsLV2_LEGACY === 'function') {
      // ✅ OPTIMISATION : Passer le contexte partagé avec flag useSharedContext
      ctx._useSharedContext = true;
      const p1Result = Phase1I_dispatchOptionsLV2_LEGACY(ctx);
      logLine('INFO', '✅ Phase 1 terminée : ' + JSON.stringify(p1Result.counts || {}));
    } else {
      throw new Error('❌ Phase1I_dispatchOptionsLV2_LEGACY() non trouvée ! Vérifier LEGACY_Phase1_OptionsLV2.gs');
    }

    // ========== ÉTAPE 4 : PHASE 2 - ASSO/DISSO ==========
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 2/4...', 'ASSO/DISSO', -1);
    logLine('INFO', '');

    if (typeof Phase2I_applyDissoAsso_LEGACY === 'function') {
      // ✅ OPTIMISATION : Réutiliser le même contexte
      const p2Result = Phase2I_applyDissoAsso_LEGACY(ctx);
      logLine('INFO', '✅ Phase 2 terminée : ASSO=' + (p2Result.asso || 0) + ', DISSO=' + (p2Result.disso || 0));
    } else {
      throw new Error('❌ Phase2I_applyDissoAsso_LEGACY() non trouvée ! Vérifier LEGACY_Phase2_DissoAsso.gs');
    }

    // ========== CONFIGURATION : JULES CODEX OU MODE LEGACY ==========
    const useJulesCodex = ctx.useJulesCodex !== undefined ? ctx.useJulesCodex : true;  // JULES CODEX par défaut
    const useIntegratedPhase3 = ctx.useIntegratedPhase3 !== undefined ? ctx.useIntegratedPhase3 : true;

    // ========== ÉTAPE 5 : PHASE 3 - EFFECTIFS & PARITÉ (MODE LEGACY UNIQUEMENT) ==========
    if (useJulesCodex && useIntegratedPhase3) {
      // Phase 3 intégrée dans Phase 4 JULES CODEX
      logLine('INFO', '⏭️ Phase 3 sera intégrée dans Phase 4 JULES CODEX');
    } else {
      // Mode legacy : Phase 3 séparée
      SpreadsheetApp.getActiveSpreadsheet().toast('Phase 3/4...', 'Effectifs & Parité', -1);
      logLine('INFO', '');

      if (typeof Phase3I_completeAndParity_LEGACY === 'function') {
        // ✅ OPTIMISATION : Réutiliser le même contexte
        const p3Result = Phase3I_completeAndParity_LEGACY(ctx);
        logLine('INFO', '✅ Phase 3 terminée : ' + (p3Result.message || 'Effectifs équilibrés'));
      } else {
        throw new Error('❌ Phase3I_completeAndParity_LEGACY() non trouvée ! Vérifier LEGACY_Phase3_Parite.gs');
      }
    }

    // ========== ÉTAPE 6 : PHASE 4 - OPTIMISATION ==========
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 4/4...', 'Équilibrage Intelligent', -1);
    logLine('INFO', '');

    let p4Result;

    if (useJulesCodex && typeof Phase4_JulesCodex_LEGACY === 'function') {
      // 🎯 MODE JULES CODEX : Moteurs Silencieux + Distance Distribution
      logLine('INFO', '🎯 Utilisation Phase 4 JULES CODEX (Moteurs Silencieux)');
      p4Result = Phase4_JulesCodex_LEGACY(ctx);

      if (p4Result.phase3Integrated) {
        logLine('INFO', '✅ Phase 3+4 JULES CODEX terminée : ' + (p4Result.swapsApplied || 0) + ' swaps, score=' + p4Result.finalScore.toFixed(3));
      } else {
        logLine('INFO', '✅ Phase 4 JULES CODEX terminée : ' + (p4Result.swapsApplied || 0) + ' swaps, score=' + p4Result.finalScore.toFixed(3));
      }

    } else if (typeof Phase4_balanceScoresSwaps_LEGACY === 'function') {
      // ⚙️ FALLBACK MODE LEGACY : Variance classique
      logLine('INFO', '⚙️ Fallback Phase 4 LEGACY (mode classique)');
      p4Result = Phase4_balanceScoresSwaps_LEGACY(ctx);
      logLine('INFO', '✅ Phase 4 terminée : ' + (p4Result.swapsApplied || 0) + ' swaps appliqués');

    } else {
      throw new Error('❌ Aucune implémentation Phase 4 disponible ! Vérifier LEGACY_Phase4_*.gs');
    }

    // ========== ÉTAPE 7 : FINALISATION ==========
    const duration = ((new Date() - startTime) / 1000).toFixed(1);

    // Compter les onglets TEST créés
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const testSheets = ss.getSheets().filter(function(s) {
      return s.getName().endsWith('TEST');
    });

    logLine('INFO', '');
    logLine('INFO', '='.repeat(80));
    logLine('INFO', '✅ PRIME LEGACY - PIPELINE COMPLET RÉUSSI');
    logLine('INFO', '='.repeat(80));
    logLine('INFO', '  • Durée : ' + duration + 's');
    logLine('INFO', '  • Onglets TEST créés : ' + testSheets.length);
    logLine('INFO', '  • Onglets : ' + testSheets.map(function(s) { return s.getName(); }).join(', '));
    logLine('INFO', '='.repeat(80));

    ui.alert(
      '✅ PRIME LEGACY - Pipeline Terminé',
      'Pipeline complet réussi en ' + duration + 's\n\n' +
      testSheets.length + ' onglet(s) TEST créé(s) :\n' +
      testSheets.map(function(s) { return '• ' + s.getName(); }).join('\n') + '\n\n' +
      'Vous pouvez maintenant :\n' +
      '• Vérifier les résultats dans les onglets TEST\n' +
      '• Utiliser COMPTER pour analyser la répartition\n' +
      '• Copier vers FIN si satisfait',
      ui.ButtonSet.OK
    );

    return {
      ok: true,
      message: 'Pipeline LEGACY réussi',
      duration: duration,
      testSheets: testSheets.length
    };

  } catch (e) {
    logLine('ERROR', '❌ Erreur PRIME LEGACY : ' + e.toString());
    logLine('ERROR', 'Stack : ' + (e.stack || 'N/A'));

    ui.alert(
      '❌ Erreur PRIME LEGACY',
      'Une erreur est survenue :\n\n' + e.toString() + '\n\n' +
      'Consultez les logs pour plus de détails.',
      ui.ButtonSet.OK
    );

    return { ok: false, message: e.toString() };

  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

// ===================================================================
// PHASES INDIVIDUELLES LEGACY
// ===================================================================

/**
 * Lance Phase 1 LEGACY - Options & LV2
 */
function legacy_runPhase1_PRIME() {
  const ui = SpreadsheetApp.getUi();

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('🎯 Phase 1 LEGACY en cours...', 'Options & LV2', -1);

    logLine('INFO', '🎯 PHASE 1 LEGACY - Options & LV2');

    // Construire le contexte LEGACY
    const ctx = typeof makeCtxFromSourceSheets_LEGACY === 'function'
      ? makeCtxFromSourceSheets_LEGACY()
      : null;

    if (!ctx) throw new Error('makeCtxFromSourceSheets_LEGACY() non trouvée');

    // Lancer Phase 1 LEGACY
    if (typeof Phase1I_dispatchOptionsLV2_LEGACY === 'function') {
      const result = Phase1I_dispatchOptionsLV2_LEGACY(ctx);

      ui.alert(
        '✅ Phase 1 LEGACY Terminée',
        'Options & LV2 répartis avec succès\n\n' +
        'Élèves placés :\n' +
        Object.keys(result.counts || {}).map(function(opt) {
          return '• ' + opt + ' : ' + result.counts[opt];
        }).join('\n'),
        ui.ButtonSet.OK
      );

      return result;
    } else {
      throw new Error('Phase1I_dispatchOptionsLV2_LEGACY() non trouvée');
    }

  } catch (e) {
    logLine('ERROR', '❌ Erreur Phase 1 LEGACY : ' + e.toString());
    ui.alert('❌ Erreur Phase 1 LEGACY', e.toString(), ui.ButtonSet.OK);
    return { ok: false, message: e.toString() };

  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 2 LEGACY - ASSO/DISSO
 */
function legacy_runPhase2_PRIME() {
  const ui = SpreadsheetApp.getUi();

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('🔗 Phase 2 LEGACY en cours...', 'ASSO/DISSO', -1);

    logLine('INFO', '🔗 PHASE 2 LEGACY - ASSO/DISSO');

    const ctx = typeof makeCtxFromSourceSheets_LEGACY === 'function'
      ? makeCtxFromSourceSheets_LEGACY()
      : null;

    if (!ctx) throw new Error('makeCtxFromSourceSheets_LEGACY() non trouvée');

    if (typeof Phase2I_applyDissoAsso_LEGACY === 'function') {
      const result = Phase2I_applyDissoAsso_LEGACY(ctx);

      ui.alert(
        '✅ Phase 2 LEGACY Terminée',
        'ASSO/DISSO appliqués avec succès\n\n' +
        '• ASSO : ' + (result.asso || 0) + ' élèves\n' +
        '• DISSO : ' + (result.disso || 0) + ' codes',
        ui.ButtonSet.OK
      );

      return result;
    } else {
      throw new Error('Phase2I_applyDissoAsso_LEGACY() non trouvée');
    }

  } catch (e) {
    logLine('ERROR', '❌ Erreur Phase 2 LEGACY : ' + e.toString());
    ui.alert('❌ Erreur Phase 2 LEGACY', e.toString(), ui.ButtonSet.OK);
    return { ok: false, message: e.toString() };

  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 3 LEGACY - Effectifs & Parité
 */
function legacy_runPhase3_PRIME() {
  const ui = SpreadsheetApp.getUi();

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('⚖️ Phase 3 LEGACY en cours...', 'Effectifs & Parité', -1);

    logLine('INFO', '⚖️ PHASE 3 LEGACY - Effectifs & Parité');

    const ctx = typeof makeCtxFromSourceSheets_LEGACY === 'function'
      ? makeCtxFromSourceSheets_LEGACY()
      : null;

    if (!ctx) throw new Error('makeCtxFromSourceSheets_LEGACY() non trouvée');

    if (typeof Phase3I_completeAndParity_LEGACY === 'function') {
      const result = Phase3I_completeAndParity_LEGACY(ctx);

      ui.alert(
        '✅ Phase 3 LEGACY Terminée',
        'Effectifs & Parité équilibrés avec succès\n\n' +
        (result.message || 'Tous les élèves ont été placés'),
        ui.ButtonSet.OK
      );

      return result;
    } else {
      throw new Error('Phase3I_completeAndParity_LEGACY() non trouvée');
    }

  } catch (e) {
    logLine('ERROR', '❌ Erreur Phase 3 LEGACY : ' + e.toString());
    ui.alert('❌ Erreur Phase 3 LEGACY', e.toString(), ui.ButtonSet.OK);
    return { ok: false, message: e.toString() };

  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 4 LEGACY - Équilibrage Scores (OPTIMUM PRIME)
 */
function legacy_runPhase4_PRIME() {
  const ui = SpreadsheetApp.getUi();

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('🔄 Phase 4 LEGACY en cours...', 'Équilibrage Scores (OPTIMUM PRIME)', -1);

    logLine('INFO', '🔄 PHASE 4 LEGACY - Équilibrage Scores (OPTIMUM PRIME)');

    const ctx = typeof makeCtxFromSourceSheets_LEGACY === 'function'
      ? makeCtxFromSourceSheets_LEGACY()
      : null;

    if (!ctx) throw new Error('makeCtxFromSourceSheets_LEGACY() non trouvée');

    if (typeof Phase4_balanceScoresSwaps_LEGACY === 'function') {
      const result = Phase4_balanceScoresSwaps_LEGACY(ctx);

      ui.alert(
        '✅ Phase 4 LEGACY Terminée (OPTIMUM PRIME)',
        'Équilibrage scores terminé avec succès\n\n' +
        '• Swaps appliqués : ' + (result.swapsApplied || 0) + '\n' +
        '• Algorithme : OPTIMUM PRIME (0 bugs)',
        ui.ButtonSet.OK
      );

      return result;
    } else {
      throw new Error('Phase4_balanceScoresSwaps_LEGACY() non trouvée');
    }

  } catch (e) {
    logLine('ERROR', '❌ Erreur Phase 4 LEGACY : ' + e.toString());
    ui.alert('❌ Erreur Phase 4 LEGACY', e.toString(), ui.ButtonSet.OK);
    return { ok: false, message: e.toString() };

  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

// ===================================================================
// UTILITAIRES PIPELINE
// ===================================================================

/**
 * Affiche le statut actuel du pipeline LEGACY dans une sidebar HTML
 */
function legacy_showPipelineStatus() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // ========== COLLECTER LES DONNÉES ==========
    const allSheets = ss.getSheets();

    // Détecter onglets sources (formats multiples supportés)
    const sourceSheets = allSheets.filter(function(s) {
      // Support: 6°1, ECOLE1, GAMARRA°4, etc.
      return /^(ECOLE\d+|[A-Za-z0-9_-]+°\d+)$/.test(s.getName());
    });

    // Détecter onglets TEST
    const testSheets = allSheets.filter(function(s) {
      return s.getName().endsWith('TEST');
    });

    // Compter les élèves
    const sources = sourceSheets.map(function(s) {
      return {
        name: s.getName(),
        count: Math.max(0, s.getLastRow() - 1)
      };
    });

    const tests = testSheets.map(function(s) {
      return {
        name: s.getName(),
        count: Math.max(0, s.getLastRow() - 1)
      };
    });

    const totalSourceEleves = sources.reduce(function(sum, s) { return sum + s.count; }, 0);
    const totalTestEleves = tests.reduce(function(sum, s) { return sum + s.count; }, 0);

    // Récupérer les stats de logs
    const logsStats = typeof getLegacyLogsStats === 'function'
      ? getLegacyLogsStats()
      : { total: 0, INFO: 0, WARN: 0, ERROR: 0, SUCCESS: 0 };

    // ========== PRÉPARER LES DONNÉES POUR LA SIDEBAR ==========
    const data = {
      sources: sources,
      tests: tests,
      totalSourceEleves: totalSourceEleves,
      totalTestEleves: totalTestEleves,
      logsStats: logsStats
    };

    // ========== CRÉER LA SIDEBAR ==========
    const template = HtmlService.createTemplateFromFile('LEGACY_StatusSidebar');
    template.data = data;

    const html = template.evaluate()
      .setTitle('Statut PRIME LEGACY')
      .setWidth(320);

    SpreadsheetApp.getUi().showSidebar(html);

  } catch (e) {
    // Fallback : si erreur, afficher modale simple
    const ui = SpreadsheetApp.getUi();
    ui.alert('❌ Erreur Sidebar', e.toString(), ui.ButtonSet.OK);
    Logger.log('Erreur legacy_showPipelineStatus : ' + e.toString());
  }
}

/**
 * Active un onglet spécifique (appelé depuis la sidebar)
 * @param {string} sheetName - Nom de l'onglet à activer
 */
function legacy_activateSheet(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);

    if (sheet) {
      ss.setActiveSheet(sheet);
      return true;
    }

    return false;

  } catch (e) {
    Logger.log('Erreur legacy_activateSheet : ' + e.toString());
    return false;
  }
}
