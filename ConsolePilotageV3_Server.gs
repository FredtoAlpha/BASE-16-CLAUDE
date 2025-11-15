/**
 * ===================================================================
 * 🔌 Console de Pilotage V3 - Backend Adapters
 * ===================================================================
 *
 * Ce fichier contient les wrappers et adaptateurs pour connecter
 * la Console de Pilotage V3 (frontend) avec les fonctions backend
 * existantes. Il assure que toutes les fonctions retournent des
 * objets de succès/erreur cohérents.
 *
 * @version 1.0.0
 * @date 2025-11-15
 * ===================================================================
 */

/**
 * ===================================================================
 * PHASE 1 : INITIALISATION
 * ===================================================================
 */

/**
 * Wrapper pour ouvrirInitialisation() qui retourne un objet de succès
 * La fonction originale affiche des dialogs UI et ne retourne rien.
 *
 * ⚠️ DEPRECATED : Utilisez v3_runInitializationWithForm() à la place
 *
 * @returns {Object} {success: boolean, message?: string, error?: string}
 */
function v3_runInitialisation() {
  try {
    // Appeler la fonction d'initialisation originale
    ouvrirInitialisation();

    // Si aucune exception n'est levée, on considère que c'est un succès
    return {
      success: true,
      message: "Initialisation lancée avec succès. Veuillez suivre les étapes dans les boîtes de dialogue."
    };
  } catch (e) {
    Logger.log(`Erreur dans v3_runInitialisation: ${e.message}`);
    return {
      success: false,
      error: e.message || "Erreur lors de l'initialisation"
    };
  }
}

/**
 * Initialise le système avec les données du formulaire INTÉGRÉ
 * ZÉRO POPUP - Tout est géré via le formulaire de la console
 *
 * @param {Object} formData - Les données du formulaire
 * @param {string} formData.adminPassword - Mot de passe admin
 * @param {string} formData.niveau - Niveau scolaire (6°, 5°, 4°, 3°)
 * @param {number} formData.nbSources - Nombre de sources
 * @param {number} formData.nbDest - Nombre de destinations
 * @param {string} formData.lv2 - LV2 (séparées par virgules)
 * @param {string} formData.opt - Options (séparées par virgules)
 * @returns {Object} {success: boolean, message?: string, error?: string}
 */
function v3_runInitializationWithForm(formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const config = getConfig();

    // 1. Vérifier le mot de passe (avec fallback sur ADMIN_PASSWORD_DEFAULT)
    const adminPassword = config.ADMIN_PASSWORD || config.ADMIN_PASSWORD_DEFAULT || "admin123";
    const enteredPassword = (formData.adminPassword || "").trim();

    Logger.log(`V3 Init - Mot de passe entré: "${enteredPassword}"`);
    Logger.log(`V3 Init - Mot de passe attendu: "${adminPassword}"`);

    if (enteredPassword !== adminPassword) {
      return {
        success: false,
        error: `Mot de passe administrateur incorrect. Attendu: "${adminPassword}"`
      };
    }

    // 2. Valider les données
    const niveauxValides = ["6°", "5°", "4°", "3°"];
    if (!niveauxValides.includes(formData.niveau)) {
      return {
        success: false,
        error: "Niveau invalide. Valeurs acceptées: 6°, 5°, 4°, 3°"
      };
    }

    if (formData.nbSources < 1 || formData.nbSources > 20) {
      return {
        success: false,
        error: "Nombre de sources invalide (1-20)"
      };
    }

    if (formData.nbDest < 1 || formData.nbDest > 15) {
      return {
        success: false,
        error: "Nombre de destinations invalide (1-15)"
      };
    }

    // 3. Nettoyer les LV2 et Options
    const lv2Array = nettoyerListeInput(formData.lv2);
    const optArray = nettoyerListeInput(formData.opt);

    Logger.log(`V3 Init - Niveau: ${formData.niveau}`);
    Logger.log(`V3 Init - Sources: ${formData.nbSources}`);
    Logger.log(`V3 Init - Destinations: ${formData.nbDest}`);
    Logger.log(`V3 Init - LV2: ${lv2Array.join(', ')}`);
    Logger.log(`V3 Init - Options: ${optArray.join(', ')}`);

    // 4. Vérifier si déjà initialisé (silencieux, pas de popup)
    const structureSheet = ss.getSheetByName(config.SHEETS.STRUCTURE);
    if (structureSheet) {
      Logger.log("ATTENTION: Le système est déjà initialisé. Réinitialisation en cours...");
    }

    // 5. Appeler la fonction d'initialisation principale SANS POPUPS
    // On appelle directement initialiserSysteme() au lieu de ouvrirInitialisation()
    initialiserSysteme(formData.niveau, formData.nbSources, formData.nbDest, lv2Array, optArray);

    return {
      success: true,
      message: `Système initialisé avec succès pour ${formData.niveau} (${formData.nbSources} sources → ${formData.nbDest} destinations)`
    };

  } catch (e) {
    Logger.log(`Erreur dans v3_runInitializationWithForm: ${e.message}`);
    Logger.log(e.stack);
    return {
      success: false,
      error: e.message || "Erreur lors de l'initialisation"
    };
  }
}

/**
 * ===================================================================
 * PHASE 1.5 : CONSOLIDATION
 * ===================================================================
 */

/**
 * Consolide les données sources vers CONSOLIDATION SANS POPUPS
 * @returns {Object} {success: boolean, message?: string, error?: string, stats?: Object}
 */
function v3_runConsolidation() {
  try {
    Logger.log('V3 Consolidation - Début...');

    // Appeler la fonction de consolidation existante
    const result = consoliderDonnees();

    // Si la fonction retourne une erreur (string), c'est un échec
    if (typeof result === 'string' && (result.includes('problème') || result.includes('Aucun'))) {
      return {
        success: false,
        error: result
      };
    }

    // Compter les élèves consolidés
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const consolidationSheet = ss.getSheetByName('CONSOLIDATION');
    const nbEleves = consolidationSheet ? consolidationSheet.getLastRow() - 1 : 0;

    Logger.log(`V3 Consolidation - ${nbEleves} élèves consolidés`);

    return {
      success: true,
      message: `✅ Consolidation réussie : ${nbEleves} élèves consolidés dans l'onglet CONSOLIDATION`,
      stats: {
        nbEleves: nbEleves
      }
    };

  } catch (e) {
    Logger.log(`Erreur dans v3_runConsolidation: ${e.message}`);
    Logger.log(e.stack);
    return {
      success: false,
      error: e.message || "Erreur lors de la consolidation"
    };
  }
}

/**
 * ===================================================================
 * PHASE 2 : DIAGNOSTIC
 * ===================================================================
 */

/**
 * Wrapper pour runGlobalDiagnostics()
 * La fonction originale retourne déjà un array d'objets, donc on l'utilise directement.
 * On l'expose sous un nom V3 pour cohérence.
 *
 * @returns {Array<Object>} Array d'objets diagnostic
 */
function v3_runDiagnostics() {
  try {
    return runGlobalDiagnostics();
  } catch (e) {
    Logger.log(`Erreur dans v3_runDiagnostics: ${e.message}`);
    return [{
      id: 'fatal_error',
      status: 'error',
      icon: 'error',
      message: 'Erreur critique: ' + e.message
    }];
  }
}

/**
 * ===================================================================
 * PHASE 3 : GÉNÉRATION
 * ===================================================================
 */

/**
 * Wrapper pour legacy_runFullPipeline() qui retourne un objet de succès
 * La fonction originale affiche des alerts et lance le pipeline sans retourner de valeur.
 *
 * @returns {Object} {success: boolean, message?: string, error?: string}
 */
function v3_runGeneration() {
  try {
    // La fonction originale gère sa propre confirmation via UI.alert
    // et affiche des toasts pour le feedback
    legacy_runFullPipeline();

    // Si aucune exception n'est levée, on considère que c'est un succès
    return {
      success: true,
      message: "Génération des classes lancée. Le processus peut prendre 2-5 minutes."
    };
  } catch (e) {
    Logger.log(`Erreur dans v3_runGeneration: ${e.message}`);
    return {
      success: false,
      error: e.message || "Erreur lors de la génération des classes"
    };
  }
}

/**
 * ===================================================================
 * PHASE 4 : OPTIMISATION
 * ===================================================================
 */

/**
 * Wrapper pour showOptimizationPanel() qui retourne un objet de succès
 * La fonction originale affiche un modal et ne retourne rien.
 *
 * @returns {Object} {success: boolean, message?: string, error?: string}
 */
function v3_runOptimization() {
  try {
    // Afficher le panneau d'optimisation
    showOptimizationPanel();

    return {
      success: true,
      message: "Panneau d'optimisation ouvert. Utilisez-le pour affiner la répartition."
    };
  } catch (e) {
    Logger.log(`Erreur dans v3_runOptimization: ${e.message}`);
    return {
      success: false,
      error: e.message || "Erreur lors de l'ouverture du panneau d'optimisation"
    };
  }
}

/**
 * ===================================================================
 * PHASE 5 : SWAPS MANUELS
 * ===================================================================
 */

/**
 * Wrapper pour setBridgeContext() - déjà OK, on l'expose pour cohérence
 *
 * @param {string} mode - Le mode à charger (ex: 'TEST')
 * @param {string} sourceSheetName - Nom de la feuille source
 * @returns {Object} {success: boolean, error?: string}
 */
function v3_setBridgeContext(mode, sourceSheetName) {
  return setBridgeContext(mode, sourceSheetName);
}

/**
 * ===================================================================
 * PHASE 6 : FINALISATION
 * ===================================================================
 */

/**
 * Wrapper pour finalizeProcess() - déjà OK, on l'expose pour cohérence
 *
 * @returns {Object} {success: boolean, message?: string, error?: string}
 */
function v3_finalizeProcess() {
  return finalizeProcess();
}

/**
 * Wrapper pour runGlobalDiagnostics() utilisé avant la finalisation
 * C'est la même fonction que v3_runDiagnostics() mais on la garde
 * pour cohérence avec le code existant.
 */
function v3_runPreFinalizeDiagnostics() {
  return v3_runDiagnostics();
}

/**
 * ===================================================================
 * FONCTIONS UTILITAIRES
 * ===================================================================
 */

/**
 * Fonction pour ouvrir la Console de Pilotage V3
 * À ajouter au menu Google Sheets
 */
function ouvrirConsolePilotageV3() {
  const html = HtmlService.createHtmlOutputFromFile('ConsolePilotageV3')
    .setWidth(1200)  // Réduit à 1200px (au lieu de 1600) pour laisser plus d'espace à Google Sheets
    .setHeight(800)  // Réduit à 800px (au lieu de 900)
    .setTitle('Console de Pilotage V3 - Non-Bloquante');

  // UTILISE showModelessDialog au lieu de showModalDialog
  // Cela permet de ne PAS bloquer l'accès à Google Sheets !
  // L'utilisateur peut déplacer et redimensionner cette fenêtre avec les contrôles du navigateur
  SpreadsheetApp.getUi().showModelessDialog(html, '🚀 Console de Pilotage V3 - Accès complet à Google Sheets');
}

/**
 * Fonction pour mettre à jour les métriques en temps réel
 * Cette fonction peut être appelée périodiquement par le frontend
 *
 * @returns {Object} {students, classes, sources, destinations}
 */
function v3_getMetrics() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Compter les élèves depuis CONSOLIDATION
    const consolidationSheet = ss.getSheetByName('CONSOLIDATION');
    const studentCount = consolidationSheet && consolidationSheet.getLastRow() > 1
      ? consolidationSheet.getLastRow() - 1
      : 0;

    // Compter les classes depuis _STRUCTURE
    const structureSheet = ss.getSheetByName('_STRUCTURE');
    const classCount = structureSheet && structureSheet.getLastRow() > 1
      ? structureSheet.getLastRow() - 1
      : 0;

    // Compter les onglets sources (qui ne se terminent pas par TEST ou DEF)
    const allSheets = ss.getSheets();
    const sourceSheets = allSheets.filter(s => {
      const name = s.getName();
      return !name.endsWith('TEST') && !name.endsWith('DEF') &&
             !name.startsWith('_') && name !== 'CONSOLIDATION';
    });

    // Compter les onglets de destination (TEST ou DEF)
    const destSheets = allSheets.filter(s => {
      const name = s.getName();
      return name.endsWith('TEST') || name.endsWith('DEF');
    });

    return {
      students: studentCount,
      classes: classCount,
      sources: sourceSheets.length,
      destinations: destSheets.length
    };
  } catch (e) {
    Logger.log(`Erreur dans v3_getMetrics: ${e.message}`);
    return {
      students: 0,
      classes: 0,
      sources: 0,
      destinations: 0
    };
  }
}

/**
 * ===================================================================
 * CRÉATION DU MENU
 * ===================================================================
 *
 * Ajouter cette fonction au fichier principal pour créer le menu
 */
function createConsolePilotageV3Menu() {
  SpreadsheetApp.getUi()
    .createMenu('🚀 Console de Pilotage V3')
    .addItem('📊 Ouvrir la Console V3', 'ouvrirConsolePilotageV3')
    .addSeparator()
    .addItem('📈 Voir les Métriques', 'showV3Metrics')
    .addToUi();
}

function showV3Metrics() {
  const metrics = v3_getMetrics();
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Métriques du Système',
    `👥 Élèves: ${metrics.students}\n` +
    `🏫 Classes: ${metrics.classes}\n` +
    `📁 Sources: ${metrics.sources}\n` +
    `🎯 Destinations: ${metrics.destinations}`,
    ui.ButtonSet.OK
  );
}
