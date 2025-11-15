/**************************** MENU GOOGLE SHEETS *********************************/

/**
 * Crée le menu personnalisé lors de l'ouverture du fichier
 */
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();

    Logger.log('onOpen() démarré');

    // ========== NOUVEAU MENU CONSOLE ==========
    ui.createMenu('🎯 CONSOLE')
      .addItem('🚀 Console de Pilotage V3 (EXPERT)', 'ouvrirConsolePilotageV3')
      .addItem('📊 Console de Pilotage V2', 'showPilotageConsole')
      .addSeparator()
      .addItem('🏗️ Initialiser Système', 'ouvrirInitialisation')
      .addItem('🆔 Générer NOM_PRENOM & ID', 'genererNomPrenomEtID')
      .addItem('📋 Listes Déroulantes', 'ajouterListesDeroulantes')
      .addSeparator()
      .addItem('📊 COMPTER Sources', 'compterEffectifsOptionsEtLangues')
      .addItem('📊 COMPTER Test', 'compterEffectifsOptionsEtLanguesTest')
      .addSeparator()
      .addItem('🔗 Consolider Sources', 'consoliderDonnees')
      .addItem('✅ Vérifier Données', 'verifierDonnees')
      .addSeparator()
      .addItem('⚙️ Configuration Structure', 'ouvrirConfigurationStructure')
      .addItem('⚙️ Configuration Complète', 'ouvrirConfigurationComplete')
      .addSeparator()
      .addItem('🔓 Déverrouiller _STRUCTURE', 'deverrouillerStructure')
      .addToUi();

    Logger.log('Menu CONSOLE créé');

    // Menu LEGACY (Pipeline complet : Sources → TEST)
    ui.createMenu('⚙️ LEGACY')
      .addItem('📋 Voir Classes Sources (6°1, 6°2...)', 'legacy_viewSourceClasses')
      .addItem('⚙️ Configurer _STRUCTURE', 'legacy_openStructure')
      .addSeparator()
      .addItem('▶️ Créer Onglets TEST (Pipeline Complet)', 'legacy_runFullPipeline')
      .addSeparator()
      .addSubMenu(ui.createMenu('🔧 Phases Individuelles')
        .addItem('🎯 Phase 1 - Options & LV2', 'legacy_runPhase1')
        .addItem('🔗 Phase 2 - ASSO/DISSO', 'legacy_runPhase2')
        .addItem('⚖️ Phase 3 - Effectifs & Parité', 'legacy_runPhase3')
        .addItem('🔄 Phase 4 - Équilibrage Scores', 'legacy_runPhase4'))
      .addSeparator()
      .addItem('📊 Voir Résultats TEST', 'legacy_viewTestResults')
      .addToUi();

    Logger.log('Menu LEGACY créé');
    Logger.log('onOpen() terminé avec succès');

  } catch (error) {
    Logger.log('ERREUR dans onOpen(): ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    // Ne pas afficher d'alert ici car ça peut bloquer le chargement
  }
}

/**
 * Affiche le dashboard principal
 */
function showDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('Dashboard')
    .setWidth(1400)
    .setHeight(800)
    .setTitle('📊 Dashboard - Répartition Classes');
  SpreadsheetApp.getUi().showModalDialog(html, 'Dashboard');
}

/**
 * Affiche le panneau de configuration de l'optimisation
 */
function showOptimizationPanel() {
  const html = HtmlService.createHtmlOutputFromFile('OptimizationPanel')
    .setWidth(1400)
    .setHeight(900)
    .setTitle('⚙️ Configuration & Optimisation');
  SpreadsheetApp.getUi().showModalDialog(html, 'Optimisation');
}

/**
 * Affiche l'interface de répartition V2
 */
function showInterfaceV2() {
  const html = HtmlService.createHtmlOutputFromFile('InterfaceV2')
    .setWidth(1600)
    .setHeight(900)
    .setTitle('👥 Interface Répartition V2');
  SpreadsheetApp.getUi().showModalDialog(html, 'Répartition V2');
}

/**
 * Affiche le module Analytics
 */
function showAnalytics() {
  const html = HtmlService.createHtmlOutputFromFile('Analytics')
    .setWidth(1400)
    .setHeight(800)
    .setTitle('📈 Analytics & Statistiques');
  SpreadsheetApp.getUi().showModalDialog(html, 'Analytics');
}

/**
 * Affiche le module Groupes de Besoin
 */
function showGroupsModule() {
  const html = HtmlService.createHtmlOutputFromFile('groupsModuleComplete')
    .setWidth(1400)
    .setHeight(800)
    .setTitle('👥 Groupes de Besoin');
  SpreadsheetApp.getUi().showModalDialog(html, 'Groupes');
}

/**
 * Affiche l'interface de finalisation
 */
function showFinalisationUI() {
  const html = HtmlService.createHtmlOutputFromFile('FinalisationUI')
    .setWidth(1200)
    .setHeight(700)
    .setTitle('📄 Finalisation & Export');
  SpreadsheetApp.getUi().showModalDialog(html, 'Finalisation');
}

/**
 * Affiche les paramètres avancés
 */
function showAdvancedSettings() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Paramètres Avancés',
    'Cette fonctionnalité sera disponible dans BASE 5 HUB.\n\n' +
    'Pour l\'instant, utilisez les autres modules disponibles.',
    ui.ButtonSet.OK
  );
}

/**
 * Affiche les logs système
 */
function showSystemLogs() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Logs Système',
    'Consultez les logs dans :\n' +
    '• Exécutions > Journaux (Apps Script)\n' +
    '• Console Cloud (si configuré)\n\n' +
    'Un visualiseur de logs sera disponible dans BASE 5 HUB.',
    ui.ButtonSet.OK
  );
}

/**
 * Affiche le Panneau de Contrôle unifié
 * Interface complète : Initialisation + LEGACY + Outils
 */
function showPanneauControle() {
  try {
    Logger.log('showPanneauControle() appelée');
    const html = HtmlService.createHtmlOutputFromFile('PanneauControle')
      .setWidth(450)
      .setTitle('🎯 Panneau de Contrôle');
    Logger.log('HTML créé, affichage sidebar...');
    SpreadsheetApp.getUi().showSidebar(html);
    Logger.log('Sidebar affichée avec succès');
  } catch (error) {
    Logger.log('ERREUR dans showPanneauControle: ' + error.toString());
    SpreadsheetApp.getUi().alert('Erreur: ' + error.toString());
  }
}

/**
 * Ouvre l'interface de configuration complète
 */
function ouvrirConfigurationComplete() {
  try {
    Logger.log('ouvrirConfigurationComplete() appelée');
    const html = HtmlService.createHtmlOutputFromFile('ConfigurationComplete')
      .setWidth(1200)
      .setHeight(800)
      .setTitle('⚙️ Configuration Complète');
    Logger.log('HTML créé, affichage modal...');
    SpreadsheetApp.getUi().showModalDialog(html, 'Configuration');
    Logger.log('Modal affiché avec succès');
  } catch (error) {
    Logger.log('ERREUR dans ouvrirConfigurationComplete: ' + error.toString());
    SpreadsheetApp.getUi().alert('Erreur: ' + error.toString());
  }
}

/**
 * FONCTION DE TEST - Vérifie que les menus fonctionnent
 */
function testMenus() {
  Logger.log('=== TEST MENUS ===');

  // Test 1: onOpen
  try {
    Logger.log('Test 1: Exécution onOpen()...');
    onOpen();
    Logger.log('✅ onOpen() réussi');
  } catch (error) {
    Logger.log('❌ onOpen() échoué: ' + error.toString());
  }

  // Test 2: showPanneauControle
  try {
    Logger.log('Test 2: Test showPanneauControle()...');
    Logger.log('Vérification fonction existe: ' + (typeof showPanneauControle));
    Logger.log('✅ showPanneauControle existe');
  } catch (error) {
    Logger.log('❌ showPanneauControle problème: ' + error.toString());
  }

  // Test 3: Vérifier fichier HTML
  try {
    Logger.log('Test 3: Vérification PanneauControle.html...');
    const html = HtmlService.createHtmlOutputFromFile('PanneauControle');
    Logger.log('✅ PanneauControle.html existe et peut être chargé');
  } catch (error) {
    Logger.log('❌ PanneauControle.html problème: ' + error.toString());
  }

  Logger.log('=== FIN TEST MENUS ===');
  SpreadsheetApp.getUi().alert('Tests terminés ! Consultez les logs (View > Logs)');
}

/**************************** FONCTIONS LEGACY PIPELINE *********************************/

/**
 * Affiche les classes sources (6°1, 6°2, etc.)
 */
function legacy_viewSourceClasses() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const sourceSheets = sheets.filter(s => /^\d+°\d+$/.test(s.getName()));
  
  if (sourceSheets.length === 0) {
    SpreadsheetApp.getUi().alert(
      '⚠️ Aucune Classe Source',
      'Aucun onglet source trouvé (format : 6°1, 6°2, etc.).\n\n' +
      'Créez d\'abord les onglets sources avec vos élèves.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  const classList = sourceSheets.map(s => s.getName()).join(', ');
  ss.setActiveSheet(sourceSheets[0]);
  SpreadsheetApp.getUi().alert(
    '📋 Classes Sources',
    `${sourceSheets.length} classe(s) source(s) trouvée(s) :\n\n${classList}\n\n` +
    'Premier onglet activé : ' + sourceSheets[0].getName(),
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Ouvre l'onglet _STRUCTURE pour configuration manuelle
 */
function legacy_openStructure() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('_STRUCTURE');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert(
      '⚠️ Onglet Manquant',
      '_STRUCTURE n\'existe pas.\n\n' +
      'Créez-le manuellement avec les colonnes :\n' +
      '• CLASSE\n' +
      '• CAPACITY\n' +
      '• ITA, ESP, CHAV, etc. (quotas)',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  ss.setActiveSheet(sheet);
  SpreadsheetApp.getUi().alert(
    '⚙️ Configuration _STRUCTURE',
    'Onglet _STRUCTURE activé.\n\n' +
    'Configurez manuellement :\n' +
    '• Capacités des classes\n' +
    '• Quotas ITA, ESP, CHAV, etc.\n\n' +
    'Puis lancez le pipeline LEGACY.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Lance le pipeline LEGACY complet
 * Sources (6°1, 6°2...) → TEST (6°1TEST, 6°2TEST...)
 */
function legacy_runFullPipeline() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Créer Onglets TEST (Pipeline LEGACY)',
    'Cette action va :\n\n' +
    '1. Lire les classes sources (6°1, 6°2, etc.)\n' +
    '2. Lancer les 4 phases LEGACY\n' +
    '3. Créer les onglets TEST (6°1TEST, 6°2TEST, etc.)\n\n' +
    'Durée estimée : 2-5 minutes\n\n' +
    'Continuer ?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) return;
  
  try {
    const startTime = new Date();
    SpreadsheetApp.getActiveSpreadsheet().toast('Lancement pipeline LEGACY...', 'En cours', -1);

    // Construire le contexte LEGACY
    // ✅ FIX: Détection automatique des onglets sources (ECOLE1, ECOLE2, etc.)
    const ctx = typeof makeCtxFromSourceSheets_ === 'function'
      ? makeCtxFromSourceSheets_()
      : null;
    if (!ctx) throw new Error('makeCtxFromSourceSheets_() non trouvée');

    // ✅ FIX: Créer les onglets TEST avant de lancer les phases
    SpreadsheetApp.getActiveSpreadsheet().toast('Création onglets TEST...', 'Initialisation', -1);
    if (typeof initEmptyCacheTabs_ === 'function') {
      initEmptyCacheTabs_(ctx);
    } else {
      throw new Error('initEmptyCacheTabs_() non trouvée');
    }

    // Phase 1
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 1/4...', 'Options & LV2', -1);
    if (typeof Phase1I_dispatchOptionsLV2_ === 'function') {
      Phase1I_dispatchOptionsLV2_(ctx);
    } else {
      throw new Error('Phase1I_dispatchOptionsLV2_() non trouvée');
    }
    
    // Phase 2
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 2/4...', 'ASSO/DISSO', -1);
    if (typeof Phase2I_applyDissoAsso_ === 'function') {
      Phase2I_applyDissoAsso_(ctx);
    } else {
      throw new Error('Phase2I_applyDissoAsso_() non trouvée');
    }
    
    // Phase 3
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 3/4...', 'Effectifs & Parité', -1);
    if (typeof Phase3I_completeAndParity_ === 'function') {
      Phase3I_completeAndParity_(ctx);
    } else {
      throw new Error('Phase3I_completeAndParity_() non trouvée');
    }
    
    // Phase 4
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 4/4...', 'Équilibrage Scores', -1);
    if (typeof Phase4_balanceScoresSwaps_ === 'function') {
      Phase4_balanceScoresSwaps_(ctx);
    } else {
      throw new Error('Phase4_balanceScoresSwaps_() non trouvée');
    }

    // ✅ FINALISATION : Mise en forme complète des onglets TEST
    SpreadsheetApp.getActiveSpreadsheet().toast('Finalisation...', 'Mise en forme TEST', -1);
    if (typeof finalizeTestSheets_ === 'function') {
      try {
        finalizeTestSheets_(ctx);
      } catch (e) {
        Logger.log('⚠️ Erreur finalisation TEST : ' + e.message);
      }
    } else {
      Logger.log('⚠️ finalizeTestSheets_() non trouvée');
    }

    const duration = ((new Date() - startTime) / 1000).toFixed(1);
    
    // Compter les onglets TEST créés
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const testSheets = ss.getSheets().filter(s => s.getName().endsWith('TEST'));
    
    ui.alert(
      '✅ Pipeline LEGACY Terminé',
      `Pipeline complet réussi en ${duration}s\n\n` +
      `${testSheets.length} onglet(s) TEST créé(s)\n\n` +
      'Vous pouvez maintenant utiliser InterfaceV2\n' +
      'pour lire depuis TEST.',
      ui.ButtonSet.OK
    );
  } catch (e) {
    ui.alert('❌ Erreur', e.toString(), ui.ButtonSet.OK);
  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 1 LEGACY - Options & LV2
 */
function legacy_runPhase1() {
  const ui = SpreadsheetApp.getUi();
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 1 LEGACY en cours...', 'Options & LV2', -1);

    // Construire le contexte LEGACY
    // ✅ FIX: Détection automatique des onglets sources (ECOLE1, ECOLE2, etc.)
    const ctx = typeof makeCtxFromSourceSheets_ === 'function'
      ? makeCtxFromSourceSheets_()
      : null;
    if (!ctx) throw new Error('makeCtxFromSourceSheets_() non trouvée');

    // Lancer Phase 1 LEGACY
    if (typeof Phase1I_dispatchOptionsLV2_ === 'function') {
      const result = Phase1I_dispatchOptionsLV2_(ctx);
      ui.alert('✅ Phase 1 Terminée', result.message || 'Options & LV2 répartis dans CACHE', ui.ButtonSet.OK);
    } else {
      throw new Error('Phase1I_dispatchOptionsLV2_() non trouvée');
    }
  } catch (e) {
    ui.alert('❌ Erreur Phase 1', e.toString(), ui.ButtonSet.OK);
  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 2 LEGACY - ASSO/DISSO
 */
function legacy_runPhase2() {
  const ui = SpreadsheetApp.getUi();
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 2 LEGACY en cours...', 'ASSO/DISSO', -1);

    // ✅ FIX: Lire depuis sources originales (sourceFamily: '') et écrire vers TEST (targetFamily: 'TEST')
    const ctx = typeof makeCtxFromUI_ === 'function'
      ? makeCtxFromUI_({ sourceFamily: '', targetFamily: 'TEST' })
      : null;
    if (!ctx) throw new Error('makeCtxFromUI_() non trouvée');

    if (typeof Phase2I_applyDissoAsso_ === 'function') {
      const result = Phase2I_applyDissoAsso_(ctx);
      ui.alert('✅ Phase 2 Terminée', result.message || 'ASSO/DISSO appliqués dans CACHE', ui.ButtonSet.OK);
    } else {
      throw new Error('Phase2I_applyDissoAsso_() non trouvée');
    }
  } catch (e) {
    ui.alert('❌ Erreur Phase 2', e.toString(), ui.ButtonSet.OK);
  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 3 LEGACY - Effectifs & Parité
 */
function legacy_runPhase3() {
  const ui = SpreadsheetApp.getUi();
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 3 LEGACY en cours...', 'Effectifs & Parité', -1);

    // ✅ FIX: Lire depuis sources originales (sourceFamily: '') et écrire vers TEST (targetFamily: 'TEST')
    const ctx = typeof makeCtxFromUI_ === 'function'
      ? makeCtxFromUI_({ sourceFamily: '', targetFamily: 'TEST' })
      : null;
    if (!ctx) throw new Error('makeCtxFromUI_() non trouvée');

    if (typeof Phase3I_completeAndParity_ === 'function') {
      const result = Phase3I_completeAndParity_(ctx);
      ui.alert('✅ Phase 3 Terminée', result.message || 'Effectifs & Parité équilibrés dans CACHE', ui.ButtonSet.OK);
    } else {
      throw new Error('Phase3I_completeAndParity_() non trouvée');
    }
  } catch (e) {
    ui.alert('❌ Erreur Phase 3', e.toString(), ui.ButtonSet.OK);
  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Lance Phase 4 LEGACY - Équilibrage Scores
 */
function legacy_runPhase4() {
  const ui = SpreadsheetApp.getUi();
  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('Phase 4 LEGACY en cours...', 'Équilibrage Scores', -1);

    // ✅ FIX: Lire depuis sources originales (sourceFamily: '') et écrire vers TEST (targetFamily: 'TEST')
    const ctx = typeof makeCtxFromUI_ === 'function'
      ? makeCtxFromUI_({ sourceFamily: '', targetFamily: 'TEST' })
      : null;
    if (!ctx) throw new Error('makeCtxFromUI_() non trouvée');

    if (typeof Phase4_balanceScoresSwaps_ === 'function') {
      const result = Phase4_balanceScoresSwaps_(ctx);
      ui.alert('✅ Phase 4 Terminée', result.message || 'Équilibrage scores terminé dans CACHE', ui.ButtonSet.OK);
    } else {
      throw new Error('Phase4_balanceScoresSwaps_() non trouvée');
    }
  } catch (e) {
    ui.alert('❌ Erreur Phase 4', e.toString(), ui.ButtonSet.OK);
  } finally {
    SpreadsheetApp.getActiveSpreadsheet().toast('', '', 1);
  }
}

/**
 * Affiche les résultats dans les onglets TEST
 */
function legacy_viewTestResults() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const testSheets = ss.getSheets().filter(s => s.getName().endsWith('TEST'));
  
  if (testSheets.length === 0) {
    SpreadsheetApp.getUi().alert(
      '⚠️ Aucun Résultat',
      'Aucun onglet TEST trouvé.\n\n' +
      'Lancez d\'abord le pipeline LEGACY\n' +
      'pour créer les onglets TEST.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  const testList = testSheets.map(s => s.getName()).join(', ');
  ss.setActiveSheet(testSheets[0]);
  SpreadsheetApp.getUi().alert(
    '📊 Résultats TEST',
    `${testSheets.length} onglet(s) TEST trouvé(s) :\n\n${testList}\n\n` +
    'Premier onglet activé : ' + testSheets[0].getName() + '\n\n' +
    'Vous pouvez maintenant utiliser InterfaceV2\n' +
    'pour lire depuis TEST.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Déverrouille complètement l'onglet _STRUCTURE
 * Retire toutes les protections pour permettre suppression/modification
 */
function deverrouillerStructure() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    // Trouver l'onglet _STRUCTURE
    const structureSheet = ss.getSheetByName('_STRUCTURE');

    if (!structureSheet) {
      ui.alert(
        '⚠️ Onglet introuvable',
        'L\'onglet _STRUCTURE n\'existe pas dans ce classeur.',
        ui.ButtonSet.OK
      );
      return;
    }

    // Confirmer l'action
    const response = ui.alert(
      '🔓 Déverrouiller _STRUCTURE',
      'Cette action va retirer TOUTES les protections de l\'onglet _STRUCTURE.\n\n' +
      'Vous pourrez ensuite le modifier ou le supprimer librement.\n\n' +
      'Continuer ?',
      ui.ButtonSet.YES_NO
    );

    if (response !== ui.Button.YES) {
      ui.alert('❌ Opération annulée');
      return;
    }

    // Retirer toutes les protections
    const protections = structureSheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    let removedCount = 0;

    for (const protection of protections) {
      protection.remove();
      removedCount++;
    }

    // Message de confirmation
    ui.alert(
      '✅ _STRUCTURE Déverrouillé',
      `${removedCount} protection(s) retirée(s).\n\n` +
      'L\'onglet _STRUCTURE est maintenant complètement déverrouillé.\n\n' +
      'Vous pouvez le modifier ou le supprimer.',
      ui.ButtonSet.OK
    );

    Logger.log(`_STRUCTURE déverrouillé: ${removedCount} protections retirées`);

  } catch (e) {
    ui.alert(
      '❌ Erreur',
      'Erreur lors du déverrouillage :\n\n' + e.toString(),
      ui.ButtonSet.OK
    );
    Logger.log('Erreur deverrouillerStructure: ' + e);
  }
}

/**************************** CONFIGURATION LOCALE *********************************/
const ELEVES_MODULE_CONFIG = {
  TEST_SUFFIX: 'TEST',
  CACHE_SUFFIX: 'CACHE',
  SNAPSHOT_SUFFIX: 'INT',
  STRUCTURE_SHEET: '_STRUCTURE',
  DEFAULT_CAPACITY: null, // ✅ PLUS DE VALEUR EN DUR - Calculé dynamiquement
  DEFAULT_MOBILITY: 'LIBRE',
  SHEET_EXCLUSION_PATTERN: /^(?:level|grp|groupe|group|niv(?:eau)?)\b/i
};

/**************************** ALIAS DES COLONNES *********************************/
const ELEVES_ALIAS = {
  id      : ['ID_ELEVE','ID','UID','IDENTIFIANT','NUM ELÈVE'],
  nom     : ['NOM'],
  prenom  : ['PRENOM','PRÉNOM'],
  sexe    : ['SEXE','S'],
  lv2     : ['LV2','LANGUE2','L2'],
  opt     : ['OPT','OPTION'],
  disso   : ['DISSO','DISSOCIÉ','DISSOCIE'],
  asso    : ['ASSO','ASSOCIÉ','ASSOCIE'],
  com     : ['COM'],
  tra     : ['TRA'],
  part    : ['PART'],
  abs     : ['ABS'],
  scoreF  : ['SCORE F','SCORE_F','SCOREF','BESOINS F','BESOINSF'],
  scoreM  : ['SCORE M','SCORE_M','SCOREM','BESOINS M','BESOINSM'],
  source  : ['SOURCE','ORIGINE','CLASSE_ORIGINE'],
  dispo   : ['DISPO','PAI','PPRE','PAP','GEVASCO'],
  mobilite: ['MOBILITE','MOB']
};

/**************************** FONCTIONS UTILITAIRES *********************************/
const _eleves_s   = v => String(v || '').trim();
const _eleves_up  = v => _eleves_s(v).toUpperCase();
const _eleves_num = v => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};
function _eleves_idx(head, aliases){
  for(let i=0;i<head.length;i++)
    if(aliases.some(a => head[i] === a)) return i;
  return -1;
}
function _eleves_sanitizeForSerialization(obj) {
  if (obj === undefined) return undefined;
  return JSON.parse(JSON.stringify(obj));
}
const ElevesBackend = (function(global) {
  const baseLogger = global.console || { log: () => {}, warn: () => {}, error: () => {} };

  function escapeRegExp(str) { return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function toStringValue(value) { return _eleves_s(value); }
  function toUpperValue(value) { return _eleves_up(value); }
  function toNumberValue(value) { return _eleves_num(value); }
  function sanitize(data) { return _eleves_sanitizeForSerialization(data); }
  function stripSuffix(name, suffix) {
    if (!suffix) return toStringValue(name);
    const regex = new RegExp(`${escapeRegExp(suffix)}$`, 'i');
    return toStringValue(name).replace(regex, '').trim();
  }

  const baseConfig = {
    sheetSuffixes: {
      test: ELEVES_MODULE_CONFIG.TEST_SUFFIX,     // 'TEST'
      cache: ELEVES_MODULE_CONFIG.CACHE_SUFFIX,   // 'CACHE'
      snapshot: ELEVES_MODULE_CONFIG.SNAPSHOT_SUFFIX // 'INT'
    },
    structureSheet: ELEVES_MODULE_CONFIG.STRUCTURE_SHEET,
    defaultCapacity: ELEVES_MODULE_CONFIG.DEFAULT_CAPACITY || 28,
    defaultMobility: ELEVES_MODULE_CONFIG.DEFAULT_MOBILITY || 'LIBRE',
    columnAliases: ELEVES_ALIAS,
    sheetExclusionPattern: ELEVES_MODULE_CONFIG.SHEET_EXCLUSION_PATTERN || null
  };

  /* ----------------------- Domaine ----------------------- */
  function createDomain({ config = baseConfig, logger = baseLogger } = {}) {
    const aliasMap = config.columnAliases;
    const defaultMobility = config.defaultMobility;

    function buildColumnIndex(headerRow) {
      const normalizedHead = Array.isArray(headerRow) ? headerRow.map(toUpperValue) : [];
      const indexes = {};
      Object.keys(aliasMap).forEach(key => {
        const aliases = (aliasMap[key] || []).map(toUpperValue);
        indexes[key] = _eleves_idx(normalizedHead, aliases);
      });
      return indexes;
    }

    function createStudent(row, columns) {
      const idIndex = columns.id;
      if (idIndex === undefined || idIndex === -1) return null;
      const id = toStringValue(row[idIndex]);
      if (!id) return null;

      const valueAt = (field, formatter = toStringValue) => {
        const idx = columns[field];
        if (idx === undefined || idx === -1) return formatter === toNumberValue ? 0 : '';
        return formatter(row[idx]);
      };

      let directMobilite = columns.mobilite !== -1 && columns.mobilite !== undefined
        ? toUpperValue(row[columns.mobilite]) : '';
      const fallbackMobilite = columns.dispo !== -1 && columns.dispo !== undefined
        ? toUpperValue(row[columns.dispo]) : '';

      // ✅ CORRECTION CRITIQUE : Normaliser les formats GROUPE_FIXE/GROUPE_PERMUT/CONDI
      // Mobility_System écrit des formats descriptifs, mais InterfaceV2 attend des mots-clés simples
      let mobilite = directMobilite || fallbackMobilite || defaultMobility;
      if (mobilite.startsWith('GROUPE_FIXE')) {
        mobilite = 'FIXE';
      } else if (mobilite.startsWith('CONDI')) {
        mobilite = 'CONDI';
      } else if (mobilite.startsWith('GROUPE_PERMUT')) {
        mobilite = 'PERMUT';
      } else if (mobilite.startsWith('PERMUT(')) {
        mobilite = 'PERMUT';
      }

      const scoreF = valueAt('scoreF', toNumberValue);
      const scoreM = valueAt('scoreM', toNumberValue);

      return {
        id,
        nom: valueAt('nom'),
        prenom: valueAt('prenom'),
        sexe: valueAt('sexe', toUpperValue),
        lv2: valueAt('lv2', toUpperValue),
        opt: valueAt('opt', toUpperValue),
        disso: valueAt('disso', toUpperValue),
        asso: valueAt('asso', toUpperValue),
        scores: {
          F: scoreF,      // Score Français (1-4)
          M: scoreM,      // Score Mathématiques (1-4)
          COM: valueAt('com', toNumberValue),
          TRA: valueAt('tra', toNumberValue),
          PART: valueAt('part', toNumberValue),
          ABS: valueAt('abs', toNumberValue)
        },
        scoreF: scoreF,   // Duplicate top-level pour compatibilité
        scoreM: scoreM,   // Duplicate top-level pour compatibilité
        source: valueAt('source'),
        dispo: valueAt('dispo', toUpperValue),
        mobilite: mobilite
      };
    }

    function createClassFromSheet(sheet, { suffix, logger: localLogger = logger } = {}) {
      if (!sheet || !Array.isArray(sheet.values) || sheet.values.length < 2) return null;
      const header = sheet.values[0];
      const columns = buildColumnIndex(header);
      if (columns.id === -1) {
        localLogger?.warn?.(`Feuille ${sheet.name} ignorée: aucune colonne ID reconnue.`);
        return null;
      }
      const students = [];
      for (let r = 1; r < sheet.values.length; r++) {
        const student = createStudent(sheet.values[r], columns);
        if (student) students.push(student);
      }
      if (!students.length) return null;
      return { classe: stripSuffix(sheet.name, suffix), eleves: students };
    }

    function buildClassesData(sheets, { suffix, logger: localLogger = logger } = {}) {
      const classes = [];
      (sheets || []).forEach(sheet => {
        const classe = createClassFromSheet(sheet, { suffix, logger: localLogger });
        if (classe) classes.push(classe);
      });
      return classes;
    }

    function parseStructureRules(values) {
      if (!Array.isArray(values) || values.length < 2) return {};
      const head = values[0].map(toUpperValue);
      const colDest = head.findIndex(h => h.includes('DEST'));
      if (colDest === -1) {
        logger?.warn?.('❌ Pas de colonne CLASSE_DEST dans _STRUCTURE');
        return {};
      }
      const colEff = head.findIndex(h => h.includes('EFFECTIF'));
      const colOptions = head.findIndex(h => h.includes('OPTION'));
      const rules = {};
      for (let r = 1; r < values.length; r++) {
        const dest = toStringValue(values[r][colDest]);
        if (!dest) continue;

        let capacity = config.defaultCapacity;
        if (colEff !== -1 && values[r][colEff] !== '' && values[r][colEff] != null) {
          const parsed = parseInt(values[r][colEff], 10);
          if (!Number.isNaN(parsed)) capacity = parsed;
        }
        const quotas = {};
        if (colOptions !== -1 && values[r][colOptions] !== '' && values[r][colOptions] != null) {
          String(values[r][colOptions]).replace(/^'/, '')
            .split(',').map(s => s.trim()).filter(Boolean)
            .forEach(pair => {
              const [opt, val = '0'] = pair.split('=').map(x => toUpperValue(x));
              if (opt) {
                const parsed = parseInt(val, 10);
                quotas[opt] = Number.isNaN(parsed) ? 0 : parsed;
              }
            });
        }
        rules[dest] = { capacity, quotas };
      }
      return rules;
    }

    return {
      buildColumnIndex,
      createStudent,
      createClassFromSheet,
      buildClassesData,
      parseStructureRules,
      sanitize,
      stripSuffix
    };
  }

  /* ----------------------- Accès données ----------------------- */
  function createDataAccess({ SpreadsheetApp, logger = baseLogger, config = baseConfig } = {}) {
    const hasSpreadsheet = SpreadsheetApp && typeof SpreadsheetApp.getActiveSpreadsheet === 'function';
    function getSpreadsheet() {
      if (!hasSpreadsheet) return null;
      try { return SpreadsheetApp.getActiveSpreadsheet(); }
      catch (err) { logger?.error?.('Erreur lors de la récupération du classeur actif', err); return null; }
    }

    function getClassSheetsForSuffix(suffix, { includeValues = true, includeHidden = false } = {}) {
      const spreadsheet = getSpreadsheet();
      if (!spreadsheet || typeof spreadsheet.getSheets !== 'function') return [];
      const suffixUpper = _eleves_up(suffix);
      const exclusionPattern = config.sheetExclusionPattern;
      const structureName = config.structureSheet;

      return spreadsheet.getSheets().reduce((acc, sh) => {
        const name = sh?.getName?.() || '';
        if (name === structureName) return acc;                    // exclure _STRUCTURE
        if (!_eleves_up(name).endsWith(suffixUpper)) return acc;   // filtrer le suffixe
        if (exclusionPattern && exclusionPattern.test(name)) return acc;
        if (!includeHidden && sh.isSheetHidden()) return acc;

        const entry = { name };
        if (includeValues) {
          try {
            const dataRange = sh.getDataRange?.();
            entry.values = dataRange?.getValues?.() || [];
          } catch (err) {
            logger?.error?.(`Erreur lors de la lecture de la feuille ${name}`, err);
            entry.values = [];
          }
        }
        acc.push(entry);
        return acc;
      }, []);
    }

    function getStructureSheetValues() {
      const spreadsheet = getSpreadsheet();
      if (!spreadsheet || typeof spreadsheet.getSheetByName !== 'function') return null;
      try {
        const sheet = spreadsheet.getSheetByName(config.structureSheet);
        if (!sheet) return null;
        const range = sheet.getDataRange?.();
        if (!range || typeof range.getValues !== 'function') return [];
        return range.getValues();
      } catch (err) {
        logger?.error?.('Erreur lors de la lecture de _STRUCTURE', err);
        return null;
      }
    }

    return { getClassSheetsForSuffix, getStructureSheetValues };
  }

  /* ----------------------- Service ----------------------- */
  function createService({
    config = baseConfig,
    domain = createDomain({ config }),
    dataAccess = createDataAccess(),
    logger = baseLogger
  } = {}) {

    // <<< SUFFIX MAP MISE À JOUR >>>
    const suffixMap = new Map([
      ['TEST', 'TEST'],
      ['CACHE', 'CACHE'],
      ['INT', 'INT'],
      ['SNAPSHOT', 'INT'],
      ['WIP', 'WIP'],      // conservé
      ['PREVIOUS', null],  // cas particulier
      ['FIN', 'FIN'],      // nouveau mode finalisées
      ['FINAL', 'FIN']     // alias vers FIN
    ]);

    function resolveSuffix(mode) {
      const normalized = _eleves_up(mode || '');
      if (suffixMap.has(normalized)) return suffixMap.get(normalized);
      if (normalized) logger?.warn?.(`Mode inconnu: ${mode}, utilisation de ${config.sheetSuffixes.test} par défaut`);
      return config.sheetSuffixes.test;
    }

    function getElevesData() { return getElevesDataForMode('TEST'); }

    function getElevesDataForMode(mode) {
      const norm = _eleves_up(mode || 'TEST');

      // <<< MODE PREVIOUS : Base admin (°1, 5°1, PREVERT°2, etc.) - SANS suffixe >>>
      if (norm === 'PREVIOUS') {
        const previousClassPattern = /^.*°\d+$/; // accepte TOUT ce qui finit par °+chiffre (°1, 5°1, PREVERT°1, etc.)
        try {
          const ss = SpreadsheetApp.getActiveSpreadsheet();
          const sheets = ss.getSheets();
          const previous = [];
          const exclusionPattern = config.sheetExclusionPattern;
          const structureName = config.structureSheet;

          // 🔍 AUDIT : Lister TOUS les onglets
          const allSheetNames = sheets.map(sh => sh.getName());
          logger?.log?.(`🔍 AUDIT PREVIOUS - Total onglets : ${sheets.length}`);
          logger?.log?.(`🔍 Tous les onglets : ${JSON.stringify(allSheetNames)}`);
          logger?.log?.(`🔍 Pattern recherché : /^.*°\\d+$/ (accepte TOUT ce qui finit par °+chiffre)`);
          logger?.log?.(`🔍 Pattern exclusion : ${exclusionPattern}`);
          logger?.log?.(`🔍 Structure sheet : ${structureName}`);

          sheets.forEach(sh => {
            const name = sh.getName();
            
            // 🔍 AUDIT : Tester chaque condition
            const isStructure = (name === structureName);
            const isExcluded = exclusionPattern && exclusionPattern.test(name);
            const matchesPattern = previousClassPattern.test(String(name).trim());
            
            logger?.log?.(`🔍 Onglet "${name}" : structure=${isStructure}, excluded=${isExcluded}, matches=${matchesPattern}`);
            
            if (isStructure) {
              logger?.log?.(`  ❌ Ignoré (structure)`);
              return;
            }
            if (isExcluded) {
              logger?.log?.(`  ❌ Ignoré (exclusion pattern)`);
              return;
            }
            if (!matchesPattern) {
              logger?.log?.(`  ❌ Ignoré (ne match pas le pattern)`);
              return;
            }
            
            try {
              const values = sh.getDataRange().getValues();
              if (values && values.length > 1) {
                previous.push({ name, values });
                logger?.log?.(`  ✅ Ajouté (${values.length} lignes)`);
              } else {
                logger?.log?.(`  ❌ Ignoré (pas assez de données : ${values?.length || 0} lignes)`);
              }
            } catch (err) {
              logger?.log?.(`  ❌ Erreur lecture : ${err.message}`);
            }
          });

          logger?.log?.(`🔍 Total onglets retenus : ${previous.length}`);

          const classes = domain.buildClassesData(
            previous.map(p => ({ name: p.name, values: p.values })),
            { suffix: '', logger }
          );
          const serialized = domain.sanitize(classes) || [];
          logger?.log?.(`✅ ${serialized.length} classes trouvées pour PREVIOUS`);
          return serialized;
        } catch (error) {
          logger?.error?.('💥 Erreur PREVIOUS', error);
          return [];
        }
      }

      // autres modes via suffix
      const suffix = resolveSuffix(norm);
      logger?.log?.(`📊 Chargement données: mode=${norm} (suffixe: ${suffix})`);

      try {
        const sheets = dataAccess.getClassSheetsForSuffix(suffix, {
          includeValues: true,
          // <<< inclure les onglets cachés pour TEST, WIP, CACHE et FIN >>>
          includeHidden: (norm === 'TEST' || norm === 'WIP' || norm === 'CACHE' || norm === 'FIN')
        });
        const classes = domain.buildClassesData(sheets, { suffix, logger });
        const serialized = domain.sanitize(classes) || [];
        logger?.log?.(`✅ ${serialized.length} classes trouvées pour mode ${norm}`);
        return serialized;
      } catch (error) {
        logger?.error?.('Erreur dans getElevesDataForMode', error);
        return [];
      }
    }

    function getStructureRules() {
      try {
        const values = dataAccess.getStructureSheetValues();
        if (!values) { logger?.warn?.('❌ Onglet _STRUCTURE absent'); return {}; }
        const rules = domain.parseStructureRules(values);
        const serialized = domain.sanitize(rules) || {};
        logger?.log?.('✅ rules (DEST-only) :', JSON.stringify(serialized, null, 2));
        return serialized;
      } catch (error) {
        logger?.error?.('💥 Erreur getStructureRules', error);
        return {};
      }
    }

    return {
      getElevesData,
      getElevesDataForMode,
      getStructureRules,
      resolveSuffix
    };
  }

  const api = {
    config: baseConfig,
    utils: { escapeRegExp, toStringValue, toUpperValue, toNumberValue, sanitize, stripSuffix },
    createDomain,
    createDataAccess,
    createService
  };

  global.ElevesBackend = api;
  return api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
const __elevesBackendLogger = (typeof console !== 'undefined' ? console : { log: () => {}, warn: () => {}, error: () => {} });
const __elevesBackendDomain = ElevesBackend.createDomain({ config: ElevesBackend.config, logger: __elevesBackendLogger });
const __elevesBackendDataAccess = ElevesBackend.createDataAccess({
  SpreadsheetApp: typeof SpreadsheetApp !== 'undefined' ? SpreadsheetApp : null,
  logger: __elevesBackendLogger,
  config: ElevesBackend.config
});
const __elevesBackendService = ElevesBackend.createService({
  config: ElevesBackend.config,
  domain: __elevesBackendDomain,
  dataAccess: __elevesBackendDataAccess,
  logger: __elevesBackendLogger
});
/************************ API Lecture simple *********************************/
function getElevesData(){ return __elevesBackendService.getElevesData(); }
function getElevesDataForMode(mode) { return __elevesBackendService.getElevesDataForMode(mode); }
function getStructureRules() { return __elevesBackendService.getStructureRules(); }

/******************** updateStructureRules ***********************/
function updateStructureRules(newRules) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(ELEVES_MODULE_CONFIG.STRUCTURE_SHEET);
    if (!sh) {
      sh = ss.insertSheet(ELEVES_MODULE_CONFIG.STRUCTURE_SHEET);
      sh.getRange(1, 1, 1, 4).setValues([["", "CLASSE_DEST", "EFFECTIF", "OPTIONS"]]);
      sh.getRange(1, 1, 1, 4).setBackground('#5b21b6').setFontColor('#ffffff').setFontWeight('bold');
    }
    const data = sh.getDataRange().getValues();
    const header = data[0].map(h => _eleves_up(h));
    let colClasse=-1, colEffectif=-1, colOptions=-1;
    for (let i = 0; i < header.length; i++) {
      if (header[i].includes('CLASSE') && header[i].includes('DEST')) colClasse = i;
      if (header[i].includes('EFFECTIF')) colEffectif = i;
      if (header[i].includes('OPTIONS')) colOptions = i;
    }
    if (colClasse === -1 || colEffectif === -1 || colOptions === -1) {
      return {success: false, error: "Colonnes requises non trouvées dans _STRUCTURE"};
    }
    const classMap = {};
    for (let i = 1; i < data.length; i++) {
      const classe = _eleves_s(data[i][colClasse]);
      if (classe) classMap[classe] = i;
    }
    Object.keys(newRules).forEach(classe => {
      const rule = newRules[classe];
      const quotasStr = Object.entries(rule.quotas || {}).map(([k, v]) => `${k}=${v}`).join(', ');
      if (classMap[classe]) {
        const row = classMap[classe];
        sh.getRange(row + 1, colEffectif + 1).setValue(rule.capacity);
        sh.getRange(row + 1, colOptions + 1).setValue(quotasStr);
      } else {
        const newRow = sh.getLastRow() + 1;
        sh.getRange(newRow, colClasse + 1).setValue(classe);
        sh.getRange(newRow, colEffectif + 1).setValue(rule.capacity);
        sh.getRange(newRow, colOptions + 1).setValue(quotasStr);
      }
    });
    try {
      const timestamp = new Date();
      const user = Session.getActiveUser().getEmail();
      console.log(`Règles _STRUCTURE mises à jour par ${user} à ${timestamp}`);
    } catch(_) {}
    return {success: true, message: "Règles mises à jour avec succès"};
  } catch (e) {
    console.error('Erreur dans updateStructureRules:', e);
    return {success: false, error: e.toString()};
  }
}

/******************** Utilitaires d'indexage *************************/
function buildStudentIndex_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const domain = __elevesBackendDomain;
  const index = {};
  let header = null;

  sheets.forEach(sh => {
    const name = sh.getName();
    // ✅ Optimisation : ne lire que les onglets TEST, CACHE, ou FIN (ignorer backups, INT, etc.)
    if (!/TEST$|CACHE$|FIN$/i.test(name)) return;
    if (/INT$/i.test(name)) return; // on ignore les *INT
    const data = sh.getDataRange().getValues();
    if (data.length < 2) return;
    const columns = domain.buildColumnIndex(data[0]);
    const colId = columns.id;
    if (colId === -1) return;
    if (!header) header = data[0];
    for (let r = 1; r < data.length; r++) {
      const id = _eleves_s(data[r][colId]);
      if (id) {
        // ✅ CORRECTION CRITIQUE : Garder la version la plus complète (avec FIXE/MOBILITE)
        // Ne pas écraser si la nouvelle ligne est plus courte (perte de colonnes P/T)
        if (!index[id] || data[r].length > index[id].length) {
          index[id] = data[r];
        }
      }
    }
  });
  return { header, rows:index };
}

/******************** Sauvegardes DRY (générique) *************************/
/**
 * Sauvegarde générique des classes dans des onglets <classe><suffix>
 * options: { suffix, backup, hideSheet, lightFormat, withLock, meta:{version} }
 */
function saveElevesGeneric(classMap, options = {}) {
  // 🔍 AUDIT CRITIQUE : Logs de débogage
  console.log('🔍 saveElevesGeneric appelée');
  console.log('  📊 classMap:', classMap ? 'OUI' : 'NULL/UNDEFINED');
  console.log('  📊 options:', JSON.stringify(options));
  
  const {
    suffix,
    backup = false,
    hideSheet = false,
    lightFormat = false,
    withLock = true,
    meta = { version: '2.0' }
  } = options;

  console.log('  📌 suffix:', suffix);
  console.log('  📌 withLock:', withLock);

  if (!classMap || typeof classMap !== 'object') {
    console.error('❌ classMap invalide ou manquant');
    return { success: false, message: '❌ classMap invalide ou manquant' };
  }
  
  const classCount = Object.keys(classMap).length;
  console.log('  📋 Nombre de classes à sauvegarder:', classCount);
  
  if (classCount === 0) {
    console.error('⚠️ Aucune classe à sauvegarder');
    return { success: false, message: '⚠️ Aucune classe à sauvegarder' };
  }

  const LOCK_KEY = `SAVE_${suffix}_LOCK`;
  const LOCK_TIMEOUT = 300000;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const acquire = () => {
    if (!withLock) return () => {};
    const lock = LockService.getScriptLock();
    try { lock.waitLock(30000); } catch(_) { return () => {}; }
    PropertiesService.getDocumentProperties().setProperty(
      LOCK_KEY, JSON.stringify({ user: Session.getActiveUser().getEmail(), timestamp: Date.now() })
    );
    return () => {
      try {
        PropertiesService.getDocumentProperties().deleteProperty(LOCK_KEY);
        LockService.getScriptLock().releaseLock();
      } catch(_) {}
    };
  };

  const release = acquire();
  const releaseSafely = () => { try { release(); } catch(_){} };

  let header, rows;
  try {
    const idx = buildStudentIndex_();
    header = idx.header; rows = idx.rows;
    if (!header) throw new Error('Aucune feuille avec colonne ID trouvée.');
  } catch (err) {
    releaseSafely();
    return { success: false, message: `❌ Indexation impossible: ${err.message}` };
  }

  const currentSheetCount = ss.getSheets().length;
  const maxSheets = 200;
  const sheetsNeeded = Object.keys(classMap).length;
  if (currentSheetCount + sheetsNeeded > maxSheets) {
    releaseSafely();
    return { success: false, message: `❌ Trop d'onglets (${currentSheetCount}/${maxSheets}).` };
  }

  const savedSheets = [];
  const errors = [];

  Object.keys(classMap).forEach(classe => {
    try {
      const ids = classMap[classe] || [];
      if (!Array.isArray(ids)) { errors.push(`⚠️ ${classe}: IDs non valides`); return; }

      let rowData = ids.map(id => rows[id] || [id]);
      const maxCols = Math.max(header.length, ...rowData.map(r => r.length));
      rowData = rowData.map(r => (r.length < maxCols) ? r.concat(Array(maxCols - r.length).fill('')) : r.slice(0, maxCols));
      const hdr = (header.length < maxCols) ? header.concat(Array(maxCols - header.length).fill('')) : header.slice(0, maxCols);

      const sheetName = classe + suffix;
      let sh = ss.getSheetByName(sheetName);
      if (sh) {
        if (backup) {
          const BACKUP_SUFFIX = `${suffix}_BACKUP`;
          const backupName = classe + BACKUP_SUFFIX;
          const old = ss.getSheetByName(backupName);
          if (old) ss.deleteSheet(old);
          const b = sh.copyTo(ss);
          b.setName(backupName);
          b.hideSheet();
        }
        sh.clear();
      } else {
        sh = ss.insertSheet(sheetName);
      }

      sh.getRange(1, 1, 1, maxCols).setValues([hdr]);
      if (rowData.length) sh.getRange(2, 1, rowData.length, maxCols).setValues(rowData);

      const metadata = {
        timestamp: new Date().toISOString(),
        version: meta.version || '2.0',
        eleveCount: ids.length,
        checksum: generateChecksum(ids)
      };
      sh.getRange(1, maxCols + 1).setValue(metadata.timestamp);
      sh.getRange(1, maxCols + 2).setValue(metadata.version);
      sh.getRange(1, maxCols + 3).setValue(metadata.eleveCount);
      sh.getRange(1, maxCols + 4).setValue(metadata.checksum);

      if (hideSheet) sh.hideSheet();
      if (!lightFormat) {
        const headerRange = sh.getRange(1, 1, 1, maxCols);
        headerRange.setBackground('#5b21b6').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
        if (rowData.length) {
          const range = sh.getRange(2, 1, rowData.length, maxCols);
          sh.setRowHeights(2, rowData.length, 25);
          range.setBorder(true, true, true, true, true, true, '#e0e0e0', SpreadsheetApp.BorderStyle.SOLID);
        }
        sh.setFrozenRows(1);
      }

      savedSheets.push(classe);
    } catch (err) {
      errors.push(`❌ ${classe}: ${err.message}`);
    }
  });

  const successCount = savedSheets.length;
  const total = Object.keys(classMap).length;
  const result = (successCount === 0)
    ? { success: false, message: '❌ Aucune classe sauvegardée', errors }
    : (successCount < total)
      ? { success: true, partial: true, message: `⚠️ ${successCount}/${total} classes sauvegardées`, savedSheets, errors }
      : { success: true, message: `✅ ${successCount} onglet(s) ${suffix} mis à jour`, savedSheets };

  logSaveOperation(`saveElevesGeneric(${suffix})`, result);
  releaseSafely();
  return result;
}

function saveElevesCache(classMap) {
  // 🔍 AUDIT CRITIQUE : Logs de débogage
  console.log('🔍 saveElevesCache appelée');
  console.log('  📊 classMap reçu:', classMap ? 'OUI' : 'NULL/UNDEFINED');
  
  if (classMap) {
    const classes = Object.keys(classMap);
    console.log('  📋 Nombre de classes:', classes.length);
    console.log('  📋 Classes:', classes.join(', '));
    
    classes.forEach(function(classe) {
      const ids = classMap[classe];
      console.log('  📌 ' + classe + ':', Array.isArray(ids) ? ids.length + ' élèves' : 'INVALIDE');
    });
  } else {
    console.error('❌ ERREUR CRITIQUE: classMap est null ou undefined !');
    return { success: false, message: '❌ classMap est null ou undefined' };
  }
  
  console.log('  ⚙️ Appel saveElevesGeneric avec suffix=CACHE...');
  const result = saveElevesGeneric(classMap, {
    suffix: 'CACHE', backup: false, hideSheet: false, lightFormat: true, withLock: true, meta: { version: '2.0' }
  });
  
  console.log('  ✅ Résultat saveElevesGeneric:', result);
  return result;
}
function saveElevesSnapshot(classMap) {
  return saveElevesGeneric(classMap, {
    suffix: ELEVES_MODULE_CONFIG.SNAPSHOT_SUFFIX || 'INT', backup: false, hideSheet: true, lightFormat: false, withLock: false, meta: { version: '2.0' }
  });
}
function saveElevesWIP(disposition) {
  return saveElevesGeneric(disposition, {
    suffix: 'WIP', backup: false, hideSheet: true, lightFormat: true, withLock: false, meta: { version: 'WIP' }
  });
}

/******************** Restauration / Infos *************************/
function restoreBySuffix(suffix) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets().filter(sh => sh.getName().endsWith(suffix));
  const result = [];
  sheets.forEach(sh => {
    const name = sh.getName();
    const classe = name.replace(new RegExp(suffix + '$', 'i'), '');
    const data = sh.getDataRange().getValues();
    if (data.length < 2) return;
    const head = data[0].map(c => String(c));
    const eleves = [];
    for (let r = 1; r < data.length; r++) {
      const row = data[r];
      if (!row[0]) continue;
      const eleve = {};
      head.forEach((col, i) => { eleve[col] = row[i]; });
      eleves.push(eleve);
    }
    result.push({ classe, eleves });
  });
  return result;
}
function restoreElevesCache(){ return restoreBySuffix('CACHE'); }

function getSuffixInfo(suffix) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets().filter(sh => sh.getName().endsWith(suffix));
  let lastDate = null;
  sheets.forEach(sh => {
    const data = sh.getDataRange().getValues();
    if (data.length && data[0].length > 0) {
      const dateCell = data[0][data[0].length - 1];
      if (dateCell) {
        const d = new Date(dateCell);
        if (!isNaN(d) && (!lastDate || d > lastDate)) lastDate = d;
      }
    }
  });
  return lastDate ? { exists:true, date: lastDate.toISOString() } : { exists:false };
}
function getCacheInfo(){ return getSuffixInfo('CACHE'); }
function getWIPInfo(){ return getSuffixInfo('WIP'); }

/******************** Autres utilitaires *************************/
function getEleveById_(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const idStr  = _eleves_s(id);
  if (!idStr) return null;
  const domain = __elevesBackendDomain;

  for (const sh of ss.getSheets()) {
    const name = sh.getName();
    if (/INT$/i.test(name)) continue;
    const data = sh.getDataRange().getValues();
    if (!data.length) continue;
    const columns = domain.buildColumnIndex(data[0]);
    const colId = columns.id;
    if (colId === -1) continue;
    for (let r = 1; r < data.length; r++) {
      if (_eleves_s(data[r][colId]) === idStr) {
        const student = domain.createStudent(data[r], columns);
        if (student) return domain.sanitize(student);
      }
    }
  }
  return null;
}

function getElevesStats(){
  try {
    const groups = getElevesData();
    if(!groups || groups.length === 0) return { global: {COM: 0, TRA: 0, PART: 0}, parClasse: [] };

    const realClasses = groups.filter(grp => {
      const className = String(grp.classe || '').trim();
      return !className.match(/^(?:level[\s_-]?|niv(?:eau)?[\s_-]?|grp(?:oupe)?[\s_-]?|groupe[\s_-]?|group[\s_-]?|niveau[\s_-]?)/i) &&
             className.length > 0;
    });

    const g = {COM: 0, TRA: 0, PART: 0, count: 0};
    const list = [];
    realClasses.forEach(grp => {
      if (!grp.eleves || grp.eleves.length === 0) return;
      const s = {COM: 0, TRA: 0, PART: 0};
      grp.eleves.forEach(e => {
        if (e.scores) { s.COM += e.scores.COM || 0; s.TRA += e.scores.TRA || 0; s.PART += e.scores.PART || 0; }
      });
      const n = grp.eleves.length;
      list.push({ classe: grp.classe, COM: Math.round(s.COM / n * 100) / 100, TRA: Math.round(s.TRA / n * 100) / 100, PART: Math.round(s.PART / n * 100) / 100 });
      g.COM += s.COM; g.TRA += s.TRA; g.PART += s.PART; g.count += n;
    });

    const globalStats = g.count > 0 ? {
      COM: Math.round(g.COM / g.count * 100) / 100,
      TRA: Math.round(g.TRA / g.count * 100) / 100,
      PART: Math.round(g.PART / g.count * 100) / 100
    } : {COM: 0, TRA: 0, PART: 0};

    return _eleves_sanitizeForSerialization({ global: globalStats, parClasse: list });
  } catch (e) {
    console.error('Erreur dans getElevesStats:', e);
    return {global: {COM: 0, TRA: 0, PART: 0}, parClasse: []};
  }
}

function getINTScores() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const intSheets = sheets.filter(sheet => /INT$/i.test(sheet.getName()));
    if (intSheets.length === 0) return { success: false, error: 'Aucun fichier INT trouvé' };

    const scores = [];
    intSheets.forEach(sheet => {
      const data = sheet.getDataRange().getValues();
      if (data.length < 2) return;
      const headers = data[0].map(h => String(h || '').toUpperCase());
      const idCol = headers.findIndex(h => h === 'ID' || h === 'ID_ELEVE');
      const mathCol = headers.findIndex(h => h === 'MATH' || h === 'MATHEMATIQUES');
      const frCol = headers.findIndex(h => h === 'FR' || h === 'FRANCAIS' || h === 'FRANÇAIS');
      if (idCol === -1) return;

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const id = String(row[idCol] || '').trim();
        if (!id) continue;
        const score = { id, MATH: null, FR: null, source: sheet.getName() };

        if (mathCol !== -1 && row[mathCol] !== undefined && row[mathCol] !== '') {
          const mathScore = parseFloat(row[mathCol]);
          if (!isNaN(mathScore) && mathScore >= 0 && mathScore <= 20) score.MATH = mathScore > 4 ? (mathScore / 5) : mathScore;
        }
        if (frCol !== -1 && row[frCol] !== undefined && row[frCol] !== '') {
          const frScore = parseFloat(row[frCol]);
          if (!isNaN(frScore) && frScore >= 0 && frScore <= 20) score.FR = frScore > 4 ? (frScore / 5) : frScore;
        }
        if (score.MATH !== null || score.FR !== null) scores.push(score);
      }
    });

    return { success: true, scores, count: scores.length, sources: intSheets.map(s => s.getName()) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/******************** Optimisation (inchangé, version courte) *************************/
/**
 * Affiche la nouvelle Console de Pilotage V2
 */
function showPilotageConsole() {
  try {
    Logger.log('showPilotageConsole() appelée');
    const html = HtmlService.createHtmlOutputFromFile('ConsolePilotage')
      .setWidth(500)
      .setTitle('🚀 Console de Pilotage V2');
    SpreadsheetApp.getUi().showSidebar(html);
    Logger.log('Sidebar de la Console de Pilotage affichée avec succès');
  } catch (error)
    {
    Logger.log('ERREUR dans showPilotageConsole: ' + error.toString());
    SpreadsheetApp.getUi().alert('Erreur lors de l\'ouverture de la console: ' + error.toString());
  }
}

/*************************** include() pour templates *******************************/
// Fonction include pour inclure d'autres fichiers HTML dans les templates
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (error) {
    console.error('Erreur include:', error);
    return '';
  }
}

/*************************** doGet *******************************/
function doGet(e) {
  // ✅ CORRECTION : Utiliser createTemplateFromFile pour évaluer les <?!= include() ?>
  const template = HtmlService.createTemplateFromFile('InterfaceV2');
  return template.evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Répartition Classes - Interface Compacte avec Swaps');
}

/************************* Fonctions de test **************************/
function testGetStructureRules() { const rules = getStructureRules(); console.log('Règles depuis _STRUCTURE:', JSON.stringify(rules, null, 2)); return rules; }
function testGetElevesDataV2() {
  const result = getElevesData(); console.log('Résultat getElevesData:', JSON.stringify(result, null, 2));
  if (result.length > 0) { console.log('\nRésumé:'); result.forEach(group => { console.log(`- ${group.classe}: ${group.eleves.length} élèves`); }); }
  return result;
}

/**
 * Lit les règles depuis _OPTI_CONFIG
 * Retourne format compatible avec _STRUCTURE pour InterfaceV2
 * @returns {Object|null} Règles ou null si erreur/absent
 */
function getOptiConfigRules_() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const optiSheet = ss.getSheetByName('_OPTI_CONFIG');

    if (!optiSheet) {
      console.log('📊 _OPTI_CONFIG non trouvé');
      return null;
    }

    const data = optiSheet.getDataRange().getValues();
    const rules = {};

    // Parser _OPTI_CONFIG pour extraire targets.byClass et offers.byClass
    for (let i = 1; i < data.length; i++) {
      const key = String(data[i][0] || '').trim();
      const value = String(data[i][1] || '').trim();

      // targets.byClass = {"6°1":25,"6°2":24,...}
      if (key === 'targets.byClass') {
        try {
          const targets = JSON.parse(value);
          Object.keys(targets).forEach(function(classe) {
            if (!rules[classe]) rules[classe] = { capacity: 0, quotas: {} };
            rules[classe].capacity = targets[classe];
          });
        } catch (e) {
          console.log('⚠️ Erreur parsing targets.byClass : ' + e.message);
        }
      }

      // offers.byClass = {"6°1":{"ITA":6,"CHAV":10},...}
      if (key === 'offers.byClass') {
        try {
          const offers = JSON.parse(value);
          Object.keys(offers).forEach(function(classe) {
            if (!rules[classe]) rules[classe] = { capacity: 0, quotas: {} };
            rules[classe].quotas = offers[classe];
          });
        } catch (e) {
          console.log('⚠️ Erreur parsing offers.byClass : ' + e.message);
        }
      }
    }

    const count = Object.keys(rules).length;
    if (count > 0) {
      console.log('✅ Règles chargées depuis _OPTI_CONFIG : ' + count + ' classes');
      return rules;
    } else {
      console.log('⚠️ _OPTI_CONFIG existe mais aucune règle trouvée');
      return null;
    }

  } catch (e) {
    console.log('⚠️ Erreur lecture _OPTI_CONFIG : ' + e.message);
    return null;
  }
}

/**
 * Détection intelligente : quelle source de règles utiliser ?
 * PRIORITÉ :
 * 1. Si _BASEOPTI existe ET date récente (< 24h) → _OPTI_CONFIG
 * 2. Sinon → _STRUCTURE (défaut)
 * @returns {Object} Règles actives
 */
function getActiveRules_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const baseopti = ss.getSheetByName('_BASEOPTI');

  // Vérifier si OPTI a tourné récemment
  if (baseopti) {
    try {
      // Vérifier timestamp de _BASEOPTI
      const lastModified = baseopti.getLastUpdated();
      const now = new Date();
      const hoursSince = (now - lastModified) / (1000 * 60 * 60);

      console.log('📊 _BASEOPTI détecté, dernière modification : ' + hoursSince.toFixed(1) + 'h');

      // Si _BASEOPTI modifié il y a moins de 24h → utiliser _OPTI_CONFIG
      if (hoursSince < 24) {
        console.log('📊 Détection : OPTI utilisé récemment (< 24h) → tentative lecture _OPTI_CONFIG');
        const optiRules = getOptiConfigRules_();
        if (optiRules && Object.keys(optiRules).length > 0) {
          console.log('✅ Utilisation des règles depuis _OPTI_CONFIG');
          return optiRules;
        } else {
          console.log('⚠️ _OPTI_CONFIG invalide ou vide → fallback _STRUCTURE');
        }
      } else {
        console.log('📊 _BASEOPTI trop ancien (> 24h) → utilisation _STRUCTURE');
      }
    } catch (e) {
      console.log('⚠️ Erreur détection _BASEOPTI : ' + e.message + ' → fallback _STRUCTURE');
    }
  } else {
    console.log('📊 _BASEOPTI absent → utilisation _STRUCTURE (défaut)');
  }

  // Fallback : _STRUCTURE (toujours disponible)
  console.log('✅ Utilisation des règles depuis _STRUCTURE');
  return getStructureRules();
}

/**
 * Fonction attendue par l'interface V2 pour charger les classes et règles
 * Détection automatique : _OPTI_CONFIG (si récent) ou _STRUCTURE (défaut)
 * @param {string} mode - 'TEST', 'CACHE', 'INT', 'FIN', 'PREVIOUS'
 */
function getClassesData(mode) {
  try {
    const data = getElevesDataForMode(mode);

    // ✅ DÉTECTION INTELLIGENTE : Utiliser _OPTI_CONFIG si disponible, sinon _STRUCTURE
    const rules = getActiveRules_();

    return { success: true, data, rules };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}

/******************** FINALISATION – créer onglets <classe>FIN ********************/

/**
 * Formate un onglet FIN avec mise en forme professionnelle et moyennes
 * @param {Sheet} sheet - L'onglet à formater
 * @param {Array} rowData - Les données des élèves
 * @param {Array} header - L'en-tête des colonnes
 */
function formatFinSheet(sheet, rowData, header) {
  try {
    const numRows = rowData.length;
    if (numRows === 0) return;

    // ========== 1. LARGEURS DES COLONNES ==========
    sheet.setColumnWidth(4, 240);   // D: NOM & PRENOM
    sheet.setColumnWidth(5, 70);    // E: SEXE
    sheet.setColumnWidth(6, 90);    // F: LV2
    sheet.setColumnWidth(7, 110);   // G: OPT
    sheet.setColumnWidth(8, 75);    // H: COM
    sheet.setColumnWidth(9, 75);    // I: TRA
    sheet.setColumnWidth(10, 75);   // J: PART
    sheet.setColumnWidth(11, 75);   // K: ABS
    sheet.setColumnWidth(12, 90);   // L: DISPO
    sheet.setColumnWidth(13, 80);   // M: ASSO
    sheet.setColumnWidth(14, 80);   // N: DISSO
    sheet.setColumnWidth(15, 130);  // O: SOURCE

    // ========== 2. EN-TÊTE (ligne 1) - Violet foncé + Blanc gras + Capitales ==========
    const headerRange = sheet.getRange(1, 1, 1, header.length);
    headerRange
      .setBackground('#5b21b6')
      .setFontColor('#ffffff')
      .setFontWeight('bold')
      .setFontSize(11)
      .setHorizontalAlignment('center')
      .setVerticalAlignment('middle');

    // Mettre en capitales
    const headerValues = header.map(h => String(h).toUpperCase());
    sheet.getRange(1, 1, 1, header.length).setValues([headerValues]);

    // ========== 3. FORMATAGE COLONNE D (NOM & PRENOM) - Gras 14pt ==========
    if (numRows > 0) {
      const namesRange = sheet.getRange(2, 4, numRows, 1);
      namesRange.setFontWeight('bold').setFontSize(14);
    }

    // ========== 4. FORMATAGE COLONNE E (SEXE) - F=rose, M=bleu ==========
    if (numRows > 0) {
      for (let r = 0; r < numRows; r++) {
        const sexeValue = String(rowData[r][4] || '').toUpperCase().trim(); // colonne 5 = index 4
        const sexeCell = sheet.getRange(r + 2, 5);

        sexeCell.setFontWeight('bold').setFontColor('#000000');

        if (sexeValue === 'F') {
          // F = Fond rose
          sexeCell.setBackground('#fce7f3');
        } else if (sexeValue === 'M') {
          // M = Fond bleu
          sexeCell.setBackground('#dbeafe');
        }
      }
    }

    // ========== 5. FORMATAGE COLONNE F (LV2) - ITA=vert, ESP=orange, autres=noir+blanc ==========
    if (numRows > 0) {
      for (let r = 0; r < numRows; r++) {
        const lv2Value = String(rowData[r][5] || '').toUpperCase().trim(); // colonne 6 = index 5
        const lv2Cell = sheet.getRange(r + 2, 6);

        if (lv2Value === 'ITA' || lv2Value === 'ITALIEN') {
          // ITA = Vert
          lv2Cell.setBackground('#86efac').setFontWeight('bold').setFontColor('#000000');
        } else if (lv2Value === 'ESP' || lv2Value === 'ESPAGNOL') {
          // ESP = Orange
          lv2Cell.setBackground('#fb923c').setFontWeight('bold').setFontColor('#000000');
        } else if (lv2Value) {
          // Autres langues = Fond noir + texte blanc
          lv2Cell.setBackground('#000000').setFontWeight('bold').setFontColor('#ffffff');
        }
      }
    }

    // ========== 6. FORMATAGE COLONNE G (OPT) - CHAV=violet, autres=gris ==========
    if (numRows > 0) {
      for (let r = 0; r < numRows; r++) {
        const optValue = String(rowData[r][6] || '').toUpperCase().trim(); // colonne 7 = index 6
        const optCell = sheet.getRange(r + 2, 7);

        if (optValue === 'CHAV') {
          // CHAV = Fond violet + texte blanc
          optCell.setBackground('#5b21b6').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
        } else if (optValue) {
          // Autres options = Fond gris + texte noir
          optCell.setBackground('#d1d5db').setFontColor('#000000').setFontWeight('bold').setHorizontalAlignment('center');
        }
      }
    }

    // ========== 7. FORMATAGE COLONNE M (ASSO) - Gras noir + Fond bleu SI REMPLI ==========
    if (numRows > 0) {
      for (let r = 0; r < numRows; r++) {
        const assoValue = String(rowData[r][12] || '').trim(); // colonne 13 = index 12
        const assoCell = sheet.getRange(r + 2, 13);

        // Toujours mettre en gras noir
        assoCell.setFontWeight('bold').setFontColor('#000000');

        if (assoValue) {
          // Fond bleu uniquement si rempli
          assoCell.setBackground('#3b82f6').setFontColor('#ffffff');
        }
      }
    }

    // ========== 8. FORMATAGE COLONNE N (DISSO) - Blanc gras sur bleu UNIQUEMENT SI REMPLI ==========
    if (numRows > 0) {
      for (let r = 0; r < numRows; r++) {
        const dissoValue = String(rowData[r][13] || '').trim(); // colonne 14 = index 13
        const dissoCell = sheet.getRange(r + 2, 14);

        if (dissoValue) {
          // Uniquement colorier si la cellule est remplie
          dissoCell.setBackground('#3b82f6').setFontColor('#ffffff').setFontWeight('bold').setHorizontalAlignment('center');
        }
      }
    }

    // ========== 9. FORMATAGE CONDITIONNEL DES SCORES (colonnes H, I, J, K) ==========
    if (numRows > 0) {
      const scoreColumns = [8, 9, 10, 11]; // H, I, J, K

      for (let col of scoreColumns) {
        for (let r = 0; r < numRows; r++) {
          const scoreValue = rowData[r][col - 1]; // index = col - 1
          const scoreCell = sheet.getRange(r + 2, col);
          scoreCell.setHorizontalAlignment('center').setFontWeight('bold');

          if (scoreValue === 1 || scoreValue === '1') {
            // Score 1 = Rouge + Blanc gras
            scoreCell.setBackground('#dc2626').setFontColor('#ffffff');
          } else if (scoreValue === 2 || scoreValue === '2') {
            // Score 2 = Jaune CLAIR + Noir gras
            scoreCell.setBackground('#fde047').setFontColor('#000000');
          } else if (scoreValue === 3 || scoreValue === '3') {
            // Score 3 = Vert clair + Noir gras
            scoreCell.setBackground('#86efac').setFontColor('#000000');
          } else if (scoreValue === 4 || scoreValue === '4') {
            // Score 4 = Vert foncé + Blanc gras
            scoreCell.setBackground('#16a34a').setFontColor('#ffffff');
          }
        }
      }
    }

    // ========== 10. CENTRAGE DES COLONNES E à O (sauf D) ==========
    if (numRows > 0) {
      const centerCols = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // E à N
      centerCols.forEach(col => {
        sheet.getRange(2, col, numRows, 1).setHorizontalAlignment('center');
      });
    }

    // ========== 11. BORDURES POUR TOUTES LES DONNÉES ==========
    if (numRows > 0) {
      const dataRange = sheet.getRange(2, 1, numRows, header.length);
      dataRange.setBorder(true, true, true, true, true, true, '#d1d5db', SpreadsheetApp.BorderStyle.SOLID);
    }

    // ========== 12. MOYENNES DYNAMIQUES AVEC FORMULES ==========
    // Position : 2 lignes après le dernier élève
    const avgRow = numRows + 4; // +2 pour l'en-tête, +2 lignes vides

    // Écrire "MOYENNE" dans la colonne D
    sheet.getRange(avgRow, 4).setValue('MOYENNE').setFontWeight('bold').setFontSize(12).setHorizontalAlignment('right');

    // Créer des formules AVERAGE pour les colonnes H, I, J, K
    const firstDataRow = 2;
    const lastDataRow = numRows + 1;

    // Formule pour COM (colonne H)
    sheet.getRange(avgRow, 8).setFormula(`=AVERAGE(H${firstDataRow}:H${lastDataRow})`);
    // Formule pour TRA (colonne I)
    sheet.getRange(avgRow, 9).setFormula(`=AVERAGE(I${firstDataRow}:I${lastDataRow})`);
    // Formule pour PART (colonne J)
    sheet.getRange(avgRow, 10).setFormula(`=AVERAGE(J${firstDataRow}:J${lastDataRow})`);
    // Formule pour ABS (colonne K)
    sheet.getRange(avgRow, 11).setFormula(`=AVERAGE(K${firstDataRow}:K${lastDataRow})`);

    // Formater la ligne des moyennes (fond gris clair + gras + centré)
    const avgRange = sheet.getRange(avgRow, 4, 1, 8); // D à K
    avgRange
      .setBackground('#f3f4f6')
      .setFontWeight('bold')
      .setHorizontalAlignment('center')
      .setFontSize(11)
      .setNumberFormat('0.00')
      .setBorder(true, true, true, true, false, false, '#9ca3af', SpreadsheetApp.BorderStyle.SOLID);

    // ========== 13. FIGER L'EN-TÊTE ==========
    sheet.setFrozenRows(1);

    console.log(`✅ Formatage FIN appliqué : ${numRows} élèves, moyennes DYNAMIQUES ligne ${avgRow}`);

  } catch (error) {
    console.error('❌ Erreur dans formatFinSheet:', error);
  }
}

/**
 * Construit un index des classes d'origine à partir de l'onglet CONSOLIDATION.
 * @returns {Object} Un objet mappant ID_ELEVE -> SOURCE.
 */
function buildSourceIndexFromConsolidation() {
  const sourceIndex = {};
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const consolidationSheet = ss.getSheetByName('CONSOLIDATION');
    if (!consolidationSheet) {
      console.warn('Onglet CONSOLIDATION introuvable. La source ne sera pas corrigée.');
      return sourceIndex;
    }

    const data = consolidationSheet.getDataRange().getValues();
    const header = data[0].map(h => h.toString().toUpperCase().trim());
    
    const idCol = header.indexOf('ID_ELEVE');
    const sourceCol = header.indexOf('SOURCE');

    if (idCol === -1 || sourceCol === -1) {
      console.warn('Colonnes ID_ELEVE ou SOURCE introuvables dans CONSOLIDATION.');
      return sourceIndex;
    }

    for (let i = 1; i < data.length; i++) {
      const id = data[i][idCol] ? data[i][idCol].toString().trim() : null;
      const source = data[i][sourceCol] ? data[i][sourceCol].toString().trim() : null;
      if (id && source) {
        sourceIndex[id] = source;
      }
    }
    console.log('Index de source créé depuis CONSOLIDATION pour ' + Object.keys(sourceIndex).length + ' élèves.');
  } catch (e) {
    console.error('Erreur lors de la création de l\'index de source depuis CONSOLIDATION:', e);
  }
  return sourceIndex;
}

/**
 * Finalise les classes en créant les onglets définitifs visibles <classe>FIN
 * @param {Object} disposition - mapping {classe: [id1, id2, ...]}
 * @param {string} mode - source ('TEST','CACHE','WIP','INT','FIN' ...)
 */
function finalizeClasses(disposition, mode) {
  try {
    if (!disposition || typeof disposition !== 'object') return { success: false, error: 'Disposition invalide' };

    const sourceIndex = buildSourceIndexFromConsolidation();
    const targetMode = (mode || 'TEST').toUpperCase();
    console.log('💾 Finalisation depuis le mode: ' + targetMode);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const header = [
      'ID_ELEVE','NOM','PRENOM','NOM & PRENOM','SEXE','LV2','OPT','COM','TRA','PART','ABS',
      'DISPO','ASSO','DISSO','SOURCE','FIXE','CLASSE_FINALE','CLASSE DEF','','MOBILITE','SCORE F','SCORE M','GROUP'
    ];

    const elevesData = getElevesDataForMode(targetMode);
    const elevesIndex = {};
    elevesData.forEach(grp => { grp.eleves.forEach(e => { elevesIndex[e.id] = e; }); });

    Object.keys(disposition).forEach(classe => {
      const eleveIds = disposition[classe] || [];
      const rowData = eleveIds.map(id => {
        const e = elevesIndex[id];
        if (!e) {
          return [ id,'','',id,'','','', '', '', '', '', '', '', '', sourceIndex[id] || '', '', classe, classe, '', 'LIBRE', '', '', '' ];
        }
        let lv2 = (e.lv2 || '').toString().trim().toUpperCase();
        const finalSource = sourceIndex[id] || e.source || '';
        return [
          e.id, e.nom || '', e.prenom || '', (e.nom || '') + ' ' + (e.prenom || ''),
          e.sexe || '', lv2, e.opt || '', e.scores?.COM ?? '', e.scores?.TRA ?? '', e.scores?.PART ?? '', e.scores?.ABS ?? '',
          e.dispo || '', e.asso || '', e.disso || '', finalSource, '',
          classe, classe, '', e.mobilite || 'LIBRE', '', '', ''
        ];
      });
      if (rowData.length === 0) rowData.push(Array(header.length).fill(''));

      const sheetName = classe + 'FIN';
      let sh = ss.getSheetByName(sheetName);
      if (sh) sh.clear(); else sh = ss.insertSheet(sheetName);

      sh.getRange(1, 1, 1, header.length).setValues([header]);
      if (rowData.length > 0) {
        sh.getRange(2, 1, rowData.length, header.length).setValues(rowData);
      }

      // ✅ FORMATAGE PROFESSIONNEL AVEC MOYENNES
      formatFinSheet(sh, rowData, header);

      // Cacher les colonnes non utilisées (A, B, C, P+)
      const hiddenCols = [1, 2, 3, 16, 17, 18, 19, 20, 21, 22, 23];
      hiddenCols.forEach(idx => {
        try {
          if (idx <= header.length) sh.hideColumns(idx, 1);
        } catch(e) {}
      });
    });

    console.log('✅ Classes finalisées en <classe>FIN');
    return { success: true, message: '✅ ' + Object.keys(disposition).length + ' classe(s) finalisée(s)' };
  } catch (e) {
    console.error('❌ Erreur dans finalizeClasses:', e);
    return { success: false, error: e.toString() };
  }
}

/**
 * 🔑 FONCTION CRITIQUE POUR LE MODULE GROUPES
 * Charge les onglets FIN COMPLETS avec toutes les colonnes (y compris SCORE F et SCORE M)
 * Appelée depuis groupsModuleComplete.html pour alimenter le module de répartition en groupes
 */
function loadFINSheetsWithScores() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = spreadsheet.getSheets().filter(sh => {
      const name = sh.getName();
      return name.endsWith('FIN') && name !== '_STRUCTURE';
    });

    console.log('📋 Chargement des onglets FIN avec scores... Trouvés: ' + sheets.length);

    const result = {};

    sheets.forEach(sh => {
      const name = sh.getName();
      const className = name.replace('FIN', '').trim(); // "6°1FIN" → "6°1"

      const values = sh.getDataRange().getValues();
      if (values.length < 2) {
        console.warn('⚠️ Onglet ' + name + ' vide ou incomplet');
        return;
      }

      const eleves = [];
      const data = values.slice(1); // Sauter la ligne d'en-tête

      data.forEach((row, idx) => {
        if (!row[0]) return; // Sauter les lignes vides (colonne A vide)

        // Parser selon le mapping établi :
        // A(0): ID_ELEVE
        // B(1): NOM
        // C(2): PRENOM
        // D(3): NOM & PRENOM (ignoré, on recalcule)
        // E(4): SEXE
        // F(5): LV2
        // G(6): OPT
        // H(7): COM
        // I(8): TRA
        // J(9): PART
        // K(10): ABS
        // O(14): SOURCE (classe d'origine)
        // U(20): SCORE F ← CRITIQUE
        // V(21): SCORE M ← CRITIQUE

        const scoreF = parseFloat(row[20]) || 0;
        const scoreM = parseFloat(row[21]) || 0;
        const sourceClass = (row[14] || '').toString().trim(); // Colonne O : classe d'origine

        // ⚠️ Vérification : si SCORE F et SCORE M sont tous les deux à 0, c'est peut-être un problème
        if (scoreF === 0 && scoreM === 0) {
          console.warn('⚠️ ' + className + ' - Élève ' + row[0] + ': SCORE F et SCORE M à 0');
        }

        const rawOptions = (row[6] || '').toString().trim();
        const options = rawOptions
          ? rawOptions
              .split(/[;,/]/)
              .map(opt => opt.trim())
              .filter(Boolean)
          : [];

        const lv2 = (row[5] || '').toString().trim().toUpperCase();
        const eleve = {
          id: (row[0] || '').toString().trim(),
          nom: (row[1] || '').toString().trim(),
          lastName: (row[1] || '').toString().trim(),
          prenom: (row[2] || '').toString().trim(),
          firstName: (row[2] || '').toString().trim(),
          sexe: (row[4] || '').toString().trim().toUpperCase(),
          lv2: lv2,
          LV2: lv2,
          opt: rawOptions,
          options: options,
          optionsList: options,
          class: className,
          classe: className,
          className: className,
          SOURCE: sourceClass,
          source: sourceClass,
          _SOURCE_CLASS: sourceClass || className,
          scores: {
            // 🔑 SCORES ACADÉMIQUES (CRITIQUES POUR L'ALGORITHME DE GROUPES)
            F: scoreF,    // Colonne U : Score Français
            M: scoreM,    // Colonne V : Score Mathématiques
            // 🔹 SCORES COMPORTEMENTAUX
            COM: parseFloat(row[7]) || 0,
            TRA: parseFloat(row[8]) || 0,
            PART: parseFloat(row[9]) || 0,
            ABS: parseFloat(row[10]) || 0
          },
          // 🔑 COLONNES CRITIQUES POUR L'ALGORITHME DE GROUPES (duplicata top-level)
          scoreF: scoreF,  // Colonne U : Score Français
          scoreM: scoreM   // Colonne V : Score Mathématiques
        };

        eleves.push(eleve);
      });

      result[className] = { eleves };
      console.log('✅ ' + className + ': ' + eleves.length + ' élève(s) chargés');
    });

    console.log('✅ loadFINSheetsWithScores terminé - ' + Object.keys(result).length + ' classe(s)');
    return { success: true, data: result };
  } catch (e) {
    console.error('❌ Erreur dans loadFINSheetsWithScores:', e.toString());
    return { success: false, error: e.toString() };
  }
}

/******************** Logging + checksum *************************/
function generateChecksum(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return '';
  const concatenated = ids.slice().sort().join('|');
  let hash = 0;
  for (let i = 0; i < concatenated.length; i++) {
    const char = concatenated.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}
function logSaveOperation(operation, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let logSheet = ss.getSheetByName('_SAVE_LOG');
    if (!logSheet) {
      logSheet = ss.insertSheet('_SAVE_LOG');
      logSheet.appendRow(['Timestamp', 'User', 'Operation', 'Status', 'Details']);
      logSheet.hideSheet();
    }
    const timestamp = new Date().toISOString();
    const user = Session.getActiveUser().getEmail();
    logSheet.appendRow([
      timestamp,
      user,
      operation,
      details.success ? 'SUCCESS' : 'FAILURE',
      JSON.stringify(details)
    ]);
  } catch (err) { /* on n'empêche pas l'opération si le log échoue */ }
}

/******************** Sécurité admin – stub ********************/
/** 
 * Vérifie un mot de passe admin
 * Accepte : 
 * 1. Le mot de passe configuré dans PropertiesService (ADMIN_PASSWORD)
 * 2. Le mot de passe par défaut 'admin123'
 */
function verifierMotDePasseAdmin(password) {
  // Nettoyer le mot de passe entré
  const inputPassword = String(password || '').trim();
  
  // Récupérer le mot de passe configuré (si existe)
  const configuredPassword = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  
  // Mots de passe acceptés
  const validPasswords = ['admin123'];
  if (configuredPassword) {
    validPasswords.push(configuredPassword);
  }
  
  // Vérifier si le mot de passe entré correspond à l'un des mots de passe valides
  const ok = validPasswords.includes(inputPassword);
  
  // Logger pour debug (à retirer en production)
  if (!ok) {
    console.log('Tentative de connexion admin échouée avec mot de passe:', inputPassword);
  }
  
  return { success: ok };
}

/******************** MODULE GROUPES ********************/
/**
 * Compte le nombre de groupes (onglets A1, B2, etc.)
 */
function getGroupsCount() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const groupSheets = sheets.filter(sh => {
      const name = sh.getName();
      return /^[A-Z]\d+$/i.test(name); // A1, B2, C3, etc.
    });
    return { success: true, count: groupSheets.length };
  } catch (e) {
    console.error('Erreur getGroupsCount:', e);
    return { success: false, error: e.toString(), count: 0 };
  }
}

/**
 * Récupère tous les groupes avec leurs élèves
 */
function getGroups() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const groups = [];
    
    sheets.forEach(sh => {
      const name = sh.getName();
      if (!/^[A-Z]\d+$/i.test(name)) return; // Seulement A1, B2, etc.
      
      const data = sh.getDataRange().getValues();
      if (data.length < 2) return;
      
      const header = data[0].map(h => String(h).toUpperCase().trim());
      const idCol = header.indexOf('ID_ELEVE') !== -1 ? header.indexOf('ID_ELEVE') : header.indexOf('ID');
      
      if (idCol === -1) return;
      
      const eleves = [];
      for (let i = 1; i < data.length; i++) {
        const id = String(data[i][idCol] || '').trim();
        if (id) eleves.push(id);
      }
      
      if (eleves.length > 0) {
        groups.push({
          nom: name,
          eleves: eleves,
          count: eleves.length
        });
      }
    });
    
    return { success: true, groups: groups, count: groups.length };
  } catch (e) {
    console.error('Erreur getGroups:', e);
    return { success: false, error: e.toString(), groups: [] };
  }
}

/**
 * Sauvegarde un groupe dans un onglet
 *
 * CORRECTION V2 : Accepte soit un tableau d'IDs (legacy),
 * soit un tableau d'objets élèves complets (si options.isFullData = true).
 *
 * @param {string} groupName - Nom de l'onglet à créer (ex: "grBe1TEMP")
 * @param {Array} data - Tableau (soit des IDs, soit des objets élèves)
 * @param {Object} options - { isFullData: boolean }
 */
function saveGroup(groupName, data, options = {}) {
  try {
    const isFullData = options.isFullData || false;

    if (!groupName || !Array.isArray(data)) {
      return { success: false, error: 'Paramètres invalides' };
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(groupName);
    if (sh) sh.clear();
    else sh = ss.insertSheet(groupName);

    let header;
    let rowData;

    if (isFullData) {
      // NOUVELLE LOGIQUE : 'data' est un tableau d'objets student
      console.log(`saveGroup [isFullData=true] pour ${groupName} avec ${data.length} élèves.`);

      // Définir un en-tête standardisé pour les groupes
      header = [
        'ID_ELEVE', 'NOM', 'PRENOM', 'SEXE', 'CLASSE',
        'SCORE_F', 'SCORE_M',
        'COM', 'TRA', 'PART', 'ABS',
        'LV2', 'OPT', 'SOURCE'
      ];

      rowData = data.map(s => [
        s.id || '',
        s.nom || '',
        s.prenom || '',
        s.sexe || '',
        s.classe || '',
        s.scores?.F ?? (s.scoreF ?? ''), // Gérer les deux formats
        s.scores?.M ?? (s.scoreM ?? ''), // Gérer les deux formats
        s.scores?.COM ?? (s.com ?? ''),
        s.scores?.TRA ?? (s.tra ?? ''),
        s.scores?.PART ?? (s.part ?? ''),
        s.scores?.ABS ?? (s.abs ?? ''),
        s.lv2 || '',
        s.opt || '',
        s.source || ''
      ]);

      if (data.length > 0 && (rowData[0][5] === '' || rowData[0][5] === undefined) && (rowData[0][6] === '' || rowData[0][6] === undefined)) {
         console.warn(`⚠️ Données de score F/M manquantes ou vides pour ${groupName}. Vérifiez l'objet élève: ${JSON.stringify(data[0])}`);
      }

    } else {
      // ANCIENNE LOGIQUE : 'data' est un tableau d'IDs
      console.log(`saveGroup [isFullData=false] pour ${groupName} avec ${data.length} IDs.`);
      const eleveIds = data;
      const idx = buildStudentIndex_();
      header = idx.header;
      const rows = idx.rows;

      if (!header) {
        return { success: false, error: 'Impossible de construire l\'index des élèves (legacy)' };
      }

      rowData = eleveIds.map(id => rows[id] || [id]);
    }

    if (!header || header.length === 0) {
       return { success: false, error: 'En-tête (header) non défini' };
    }

    // --- Suite de la fonction (écriture) ---

    // Écrire l'en-tête
    sh.getRange(1, 1, 1, header.length).setValues([header]);

    // Écrire les données des élèves
    if (rowData.length > 0) {
      const maxCols = header.length; // Forcer la largeur sur l'en-tête
      const normalizedRows = rowData.map(r => {
        if (r.length < maxCols) {
          return r.concat(Array(maxCols - r.length).fill(''));
        }
        return r.slice(0, maxCols); // Trancher si plus long
      });

      sh.getRange(2, 1, normalizedRows.length, maxCols).setValues(normalizedRows);
    }

    // Formatage
    const headerRange = sh.getRange(1, 1, 1, header.length);
    headerRange.setBackground('#5b21b6').setFontColor('#ffffff').setFontWeight('bold');
    sh.setFrozenRows(1);

    console.log(`✅ Groupe ${groupName} sauvegardé avec ${data.length} lignes.`);
    return { success: true, message: `Groupe ${groupName} sauvegardé`, count: data.length };

  } catch (e) {
    console.error('Erreur saveGroup:', e);
    return { success: false, error: e.toString() };
  }
}

/**
 * Supprime un groupe
 */
function deleteGroup(groupName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(groupName);
    
    if (!sh) {
      return { success: false, error: 'Groupe introuvable' };
    }
    
    ss.deleteSheet(sh);
    console.log(`✅ Groupe ${groupName} supprimé`);
    return { success: true, message: `Groupe ${groupName} supprimé` };
  } catch (e) {
    console.error('Erreur deleteGroup:', e);
    return { success: false, error: e.toString() };
  }
}

/**
 * Sauvegarde TOUS les groupes générés depuis le module de répartition
 * Appelée depuis groupsModuleComplete.html lors de la finalisation
 */
function saveGroupsToSheets(payload) {
  try {
    if (!payload || !Array.isArray(payload.groups)) {
      return { success: false, error: 'Payload invalide ou groups manquants' };
    }

    console.log('📋 saveGroupsToSheets - Début de sauvegarde');
    console.log('   Type: ' + payload.type);
    console.log('   Nombre de groupes: ' + payload.groups.length);
    console.log('   Config:', JSON.stringify(payload.config));

    const results = [];
    let totalEleves = 0;

    // 1. Supprimer les groupes existants (optionnel : garder ou remplacer)
    // Pour l'instant, on écrase les groupes avec le même nom

    // 2. Sauvegarder chaque groupe
    payload.groups.forEach((group, idx) => {
      if (!group || !Array.isArray(group.students)) {
        console.warn('   ⚠️ Groupe ' + idx + ' invalide');
        return;
      }

      const groupName = group.name || ('Groupe ' + (idx + 1));
      const eleveIds = group.students.map(s => s.id);

      console.log('   👥 ' + groupName + ': ' + eleveIds.length + ' élèves');

      const result = saveGroup(groupName, eleveIds);
      results.push({
        groupName: groupName,
        ...result
      });

      if (result.success) {
        totalEleves += eleveIds.length;
      }
    });

    console.log('✅ saveGroupsToSheets terminé - ' + totalEleves + ' élèves au total');

    return {
      success: true,
      message: 'Groupes sauvegardés avec succès',
      totalGroups: payload.groups.length,
      totalEleves: totalEleves,
      results: results,
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    console.error('❌ Erreur saveGroupsToSheets:', e.toString());
    return { success: false, error: e.toString() };
  }
}

function getGroupTypePrefix_(type) {
  if (type === 'needs') return 'grBe';
  if (type === 'language') return 'grLv';
  return 'grOp';
}

function getContinuationStore_() {
  return PropertiesService.getDocumentProperties();
}

function getContinuationKey_(prefix) {
  return `GROUPS_CONTINUATION_${prefix}`;
}

function loadContinuationMetadata_(prefix) {
  try {
    const key = getContinuationKey_(prefix);
    const raw = getContinuationStore_().getProperty(key);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.warn('⚠️ loadContinuationMetadata_ error:', error);
    return null;
  }
}

function saveContinuationMetadata_(prefix, metadata) {
  try {
    const key = getContinuationKey_(prefix);
    if (!metadata) {
      getContinuationStore_().deleteProperty(key);
      return;
    }
    getContinuationStore_().setProperty(key, JSON.stringify(metadata));
  } catch (error) {
    console.warn('⚠️ saveContinuationMetadata_ error:', error);
  }
}

function computeSuggestedOffset_(metadata, fallback) {
  const lastTemp = metadata?.lastTempIndex || 0;
  const lastFinal = metadata?.lastFinalIndex || 0;
  const highest = Math.max(lastTemp, lastFinal, 0);
  if (highest > 0) {
    return highest + 1;
  }
  return fallback || 1;
}

function extractGroupIndex_(sheetName, prefix) {
  const regex = new RegExp('^' + prefix + '(\\d+)(TEMP)?$');
  const match = sheetName.match(regex);
  if (!match) {
    return null;
  }
  return parseInt(match[1], 10);
}

/**
 * Sauvegarde les groupes générés dans des onglets TEMPORAIRES (cachés)
 * Préfixes : grBe (Besoin), grLv (Langue), grOp (Options)
 * Exemple : grBe1TEMP, grBe2TEMP, grBe3TEMP, grBe4TEMP
 *
 * CORRECTION V2 : Passe les objets élèves complets à saveGroup au lieu des IDs.
 */
function saveTempGroups(payload) {
  try {
    if (!payload || !Array.isArray(payload.groups)) {
      return { success: false, error: 'Payload invalide ou groups manquants' };
    }

    const typePrefix = getGroupTypePrefix_(payload.type);

    console.log('📋 saveTempGroups - Début de sauvegarde temporaire');
    console.log('   Type: ' + payload.type);
    console.log('   Prefix: ' + typePrefix);
    console.log('   Nombre de groupes: ' + payload.groups.length);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const results = [];
    let totalEleves = 0;

    const persistMode = payload.persistMode === 'continue' ? 'continue' : 'replace';
    const metadataBefore = loadContinuationMetadata_(typePrefix) || {};
    const requestedOffset = Number(payload.offsetStart);
    let offsetStart = Number.isFinite(requestedOffset) && requestedOffset > 0
      ? requestedOffset
      : (persistMode === 'continue'
          ? computeSuggestedOffset_(metadataBefore)
          : 1);

    const sheets = ss.getSheets();
    const tempSheets = sheets.filter(sh => sh.getName().startsWith(typePrefix) && sh.getName().endsWith('TEMP'));

    if (persistMode === 'replace') {
      tempSheets.forEach(sh => ss.deleteSheet(sh));
      offsetStart = Math.max(1, offsetStart);
    } else {
      const finalSheets = sheets.filter(sh => sh.getName().startsWith(typePrefix) && !sh.getName().endsWith('TEMP'));
      const maxTemp = tempSheets.reduce((max, sh) => {
        const idx = extractGroupIndex_(sh.getName(), typePrefix);
        return typeof idx === 'number' ? Math.max(max, idx) : max;
      }, 0);
      const maxFinal = finalSheets.reduce((max, sh) => {
        const idx = extractGroupIndex_(sh.getName(), typePrefix);
        return typeof idx === 'number' ? Math.max(max, idx) : max;
      }, 0);
      const highestExisting = Math.max(
        maxTemp,
        maxFinal,
        metadataBefore.lastTempIndex || 0,
        metadataBefore.lastFinalIndex || 0
      );

      tempSheets.forEach(sh => {
        const idx = extractGroupIndex_(sh.getName(), typePrefix);
        if (typeof idx === 'number' && idx >= offsetStart) {
          ss.deleteSheet(sh);
        }
      });

      if (offsetStart <= highestExisting) {
        offsetStart = highestExisting + 1;
      }
    }

    for (let idx = 0; idx < payload.groups.length; idx++) {
      const group = payload.groups[idx];

      if (!group || !Array.isArray(group.students)) {
        console.warn('   ⚠️ Groupe ' + idx + ' invalide');
        return { success: false, error: 'Groupe ' + idx + ' invalide' };
      }

      const currentIndex = offsetStart + idx;
      const tempGroupName = typePrefix + currentIndex + 'TEMP';
      const studentsData = group.students;

      console.log('   👥 ' + tempGroupName + ': ' + studentsData.length + ' élèves');
      if (studentsData.length > 0) {
        console.log('      🔍 Premier élève du groupe (vérification scores):', {
          id: studentsData[0].id,
          nom: studentsData[0].nom,
          scoreF: studentsData[0].scoreF,
          scoreM: studentsData[0].scoreM,
          scores: studentsData[0].scores
        });
      }

      const existing = ss.getSheetByName(tempGroupName);
      if (existing) {
        console.log('   ♻️ Suppression feuille TEMP existante avant écriture: ' + tempGroupName);
        ss.deleteSheet(existing);
      }

      const result = saveGroup(tempGroupName, studentsData, { isFullData: true, index: currentIndex });
      console.log('      📊 Résultat saveGroup:', result);

      if (!result.success) {
        console.error('❌ ERREUR CRITIQUE : saveGroup a échoué pour ' + tempGroupName);
        console.error('   Raison:', result.error);
        return {
          success: false,
          error: 'Impossible de créer ' + tempGroupName + ': ' + result.error
        };
      }

      results.push({
        tempGroupName: tempGroupName,
        index: currentIndex,
        ...result
      });

      totalEleves += studentsData.length;
    }

    results.forEach(res => {
      const sh = ss.getSheetByName(res.tempGroupName);
      if (sh) {
        sh.hideSheet();
      }
    });

    console.log('✅ saveTempGroups terminé - ' + totalEleves + ' élèves au total');

    const createdIndexes = results.map(res => res.index).filter(idx => typeof idx === 'number');
    const offsetEnd = createdIndexes.length > 0 ? Math.max.apply(null, createdIndexes) : offsetStart + payload.groups.length - 1;
    const createdRange = createdIndexes.length > 0
      ? { start: Math.min.apply(null, createdIndexes), end: offsetEnd }
      : null;

    const nowIso = new Date().toISOString();
    const updatedMetadata = {
      ...metadataBefore,
      lastTempIndex: Math.max(metadataBefore.lastTempIndex || 0, offsetEnd || 0),
      lastTempRange: createdRange,
      lastPersistMode: persistMode,
      lastUpdated: nowIso,
      lastTempUpdated: nowIso,
      lastConfig: payload.config || {},
      lastRegroupementId: payload?.regroupement?.id || metadataBefore.lastRegroupementId || '',
      lastRegroupementLabel: payload?.regroupement?.label || metadataBefore.lastRegroupementLabel || ''
    };

    saveContinuationMetadata_(typePrefix, updatedMetadata);

    return {
      success: true,
      message: 'Groupes sauvegardés temporairement',
      typePrefix: typePrefix,
      totalGroups: payload.groups.length,
      totalEleves: totalEleves,
      results: results,
      timestamp: nowIso,
      offsetStart: offsetStart,
      offsetEnd: offsetEnd,
      persistMode: persistMode,
      createdRange: createdRange,
      nextOffset: computeSuggestedOffset_(updatedMetadata)
    };
  } catch (e) {
    console.error('❌ Erreur saveTempGroups:', e.toString());
    return { success: false, error: e.toString() };
  }
}

/**
 * Récupère les informations sur les groupes temporaires disponibles
 * Retourne { grBe: {count, date}, grLv: {count, date}, grOp: {count, date} }
 */
function getTempGroupsInfo() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();

    const tempInfo = {
      grBe: null,
      grLv: null,
      grOp: null
    };

    // Chercher les onglets TEMP pour chaque prefix
    ['grBe', 'grLv', 'grOp'].forEach(prefix => {
      const tempSheets = sheets.filter(sh => sh.getName().startsWith(prefix) && sh.getName().endsWith('TEMP'));

      if (tempSheets.length > 0) {
        let totalEleves = 0;
        let maxDate = null;

        tempSheets.forEach(sh => {
          const data = sh.getDataRange().getValues();
          if (data.length > 1) {
            totalEleves += data.length - 1; // -1 pour la ligne d'en-tête
          }

          // Récupérer la date du dernier onglet modifié
          const meta = sh.getSheetValues(1, 1, 1, sh.getMaxColumns());
          // On peut stocker une date custom dans les propriétés...
        });

        tempInfo[prefix] = {
          count: tempSheets.length,
          totalEleves: totalEleves,
          date: new Date().toISOString() // À améliorer avec metadata
        };
      }
    });

    console.log('📊 getTempGroupsInfo:', JSON.stringify(tempInfo));
    return { success: true, tempInfo: tempInfo };
  } catch (e) {
    console.error('❌ Erreur getTempGroupsInfo:', e.toString());
    return { success: false, error: e.toString() };
  }
}

function getGroupContinuationStatus(type) {
  try {
    if (!type || !['needs', 'language', 'options'].includes(type)) {
      return { success: false, error: 'Type invalide' };
    }

    const typePrefix = getGroupTypePrefix_(type);
    const metadata = loadContinuationMetadata_(typePrefix) || {};
    const suggestedNextIndex = computeSuggestedOffset_(metadata);

    return {
      success: true,
      type: type,
      prefix: typePrefix,
      metadata: {
        ...metadata,
        suggestedNextIndex: suggestedNextIndex,
        hasTempRange: !!metadata.lastTempRange,
        hasFinalRange: !!metadata.lastFinalRange
      }
    };
  } catch (e) {
    console.error('❌ Erreur getGroupContinuationStatus:', e.toString());
    return { success: false, error: e.toString() };
  }
}

/**
 * Charge les groupes temporaires et les retourne pour recharger dans l'interface
 * Retourne les élèves de grBe1TEMP, grBe2TEMP, etc.
 */
function loadTempGroups(type) {
  try {
    if (!type || !['needs', 'language', 'options'].includes(type)) {
      return { success: false, error: 'Type invalide' };
    }

    const typePrefix = getGroupTypePrefix_(type);
    console.log('📥 loadTempGroups pour type: ' + type + ' (prefix: ' + typePrefix + ')');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tempSheets = ss.getSheets().filter(sh => sh.getName().startsWith(typePrefix) && sh.getName().endsWith('TEMP'));

    tempSheets.sort((a, b) => {
      const idxA = extractGroupIndex_(a.getName(), typePrefix) || 0;
      const idxB = extractGroupIndex_(b.getName(), typePrefix) || 0;
      return idxA - idxB;
    });

    const groups = [];

    tempSheets.forEach(sh => {
      const data = sh.getDataRange().getValues();
      if (data.length < 2) return;

      const header = data[0].map(h => String(h).toUpperCase().trim());
      const students = [];
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row.some(cell => cell !== '' && cell !== null)) continue;

        const student = {};
        header.forEach((col, colIdx) => {
          student[col] = row[colIdx] || '';
        });

        if (!student.id && student.ID_ELEVE) student.id = student.ID_ELEVE;
        if (!student.nom && student.NOM) student.nom = student.NOM;
        if (!student.prenom && student.PRENOM) student.prenom = student.PRENOM;
        if (!student.sexe && student.SEXE) student.sexe = student.SEXE;
        if (!student.classe && student.CLASSE) student.classe = student.CLASSE;

        students.push(student);
      }

      if (students.length > 0) {
        const index = extractGroupIndex_(sh.getName(), typePrefix) || groups.length + 1;
        groups.push({
          name: 'Groupe ' + index,
          index: index,
          students: students,
          count: students.length
        });

        console.log('   ✅ ' + sh.getName() + ': ' + students.length + ' élèves');
      }
    });

    const indexes = groups.map(g => g.index).filter(idx => typeof idx === 'number');
    const offsetStart = indexes.length > 0 ? Math.min.apply(null, indexes) : null;
    const offsetEnd = indexes.length > 0 ? Math.max.apply(null, indexes) : null;

    console.log('✅ loadTempGroups - ' + groups.length + ' groupes chargés');

    return {
      success: true,
      groups: groups,
      totalGroups: groups.length,
      type: type,
      offsetStart: offsetStart,
      offsetEnd: offsetEnd,
      range: indexes.length > 0 ? { start: offsetStart, end: offsetEnd } : null
    };
  } catch (e) {
    console.error('❌ Erreur loadTempGroups:', e.toString());
    return { success: false, error: e.toString() };
  }
}

/**
 * Finalise les groupes temporaires en les renommant et les rendant visibles
 * Renomme grBe1TEMP → grBe1, supprime les TEMP
 */
function finalizeTempGroups(request) {
  try {
    let type = request;
    let metadata = {};
    let persistMode = 'replace';
    let regroupementInfo = {};

    if (typeof request === 'object' && request !== null) {
      type = request.type;
      metadata = request.metadata || request.config || {};
      persistMode = request.persistMode === 'continue' ? 'continue' : 'replace';
      regroupementInfo = request.regroupement || {};
    }

    if (!type || !['needs', 'language', 'options'].includes(type)) {
      return { success: false, error: 'Type invalide' };
    }

    const typePrefix = getGroupTypePrefix_(type);
    console.log('✅ finalizeTempGroups pour type: ' + type + ' (prefix: ' + typePrefix + ') - mode ' + persistMode);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheets = ss.getSheets();
    const tempSheets = sheets.filter(sh => sh.getName().startsWith(typePrefix) && sh.getName().endsWith('TEMP'));

    if (tempSheets.length === 0) {
      return { success: false, error: 'Aucun groupe temporaire trouvé pour ' + typePrefix };
    }

    tempSheets.sort((a, b) => {
      const idxA = extractGroupIndex_(a.getName(), typePrefix) || 0;
      const idxB = extractGroupIndex_(b.getName(), typePrefix) || 0;
      return idxA - idxB;
    });

    const metadataBefore = loadContinuationMetadata_(typePrefix) || {};

    if (persistMode === 'replace') {
      // En mode replace, supprimer SEULEMENT les onglets du regroupement actuel
      // basé sur sa lastFinalRange précédente, pas TOUS les finalized du prefix
      const lastFinalRange = metadataBefore.lastFinalRange || null;

      if (lastFinalRange) {
        const finalSheets = sheets.filter(sh => sh.getName().startsWith(typePrefix) && !sh.getName().endsWith('TEMP'));
        finalSheets.forEach(sh => {
          const idx = extractGroupIndex_(sh.getName(), typePrefix);
          if (typeof idx === 'number' && idx >= lastFinalRange.start && idx <= lastFinalRange.end) {
            console.log('   🗑️ Suppression du groupe de ce regroupement: ' + sh.getName());
            ss.deleteSheet(sh);
          }
        });
      }
      // Si pas de lastFinalRange, c'est la première finalisation, rien à supprimer
    }

    const renamedIndexes = [];

    tempSheets.forEach(sh => {
      const tempName = sh.getName();
      const finalName = tempName.replace('TEMP', '');
      const index = extractGroupIndex_(tempName, typePrefix);

      if (persistMode === 'continue') {
        const existing = ss.getSheetByName(finalName);
        if (existing) {
          console.log('   ♻️ Remplacement du groupe existant: ' + finalName);
          ss.deleteSheet(existing);
        }
      }

      console.log('   📝 Renommage: ' + tempName + ' → ' + finalName);
      sh.setName(finalName);
      sh.showSheet();

      if (typeof index === 'number') {
        renamedIndexes.push(index);
      }
    });

    console.log('✅ finalizeTempGroups terminé - Groupes rendus visibles');

    const nowIso = new Date().toISOString();
    const updatedMetadata = {
      ...metadataBefore,
      lastFinalIndex: renamedIndexes.length > 0
        ? Math.max.apply(null, renamedIndexes)
        : (metadataBefore.lastFinalIndex || 0),
      lastFinalRange: renamedIndexes.length > 0
        ? { start: Math.min.apply(null, renamedIndexes), end: Math.max.apply(null, renamedIndexes) }
        : (metadataBefore.lastFinalRange || null),
      lastPersistMode: persistMode,
      lastUpdated: nowIso,
      lastFinalUpdated: nowIso,
      lastRegroupementId: regroupementInfo.id || metadataBefore.lastRegroupementId || '',
      lastRegroupementLabel: regroupementInfo.label || metadataBefore.lastRegroupementLabel || ''
    };

    saveContinuationMetadata_(typePrefix, updatedMetadata);

    return {
      success: true,
      message: 'Groupes finalisés et rendus visibles',
      type: type,
      prefix: typePrefix,
      count: tempSheets.length,
      persistMode: persistMode,
      lastFinalRange: updatedMetadata.lastFinalRange || null,
      finalizedAt: nowIso
    };
  } catch (e) {
    console.error('❌ Erreur finalizeTempGroups:', e.toString());
    return { success: false, error: e.toString() };
  }
}

/*************************** FONCTIONS DE CACHE AUTOMATIQUE *******************************/
/**
 * Récupère les informations sur la dernière sauvegarde automatique
 */
function getLastCacheInfo() {
  try {
    const props = PropertiesService.getUserProperties();
    const cacheDate = props.getProperty('lastCacheDate');
    const cacheSize = props.getProperty('lastCacheSize');
    
    if (cacheDate) {
      console.log(`📦 Cache trouvé: ${cacheDate} (${cacheSize} octets)`);
      return { 
        exists: true, 
        date: cacheDate,
        size: parseInt(cacheSize) || 0
      };
    }
    
    return { exists: false };
  } catch (e) {
    console.error('Erreur getLastCacheInfo:', e);
    return { exists: false, error: e.toString() };
  }
}

/**
 * ⚠️ OBSOLÈTE : Cette fonction n'est plus utilisée pour l'auto-save
 * L'auto-save appelle maintenant directement saveElevesCache()
 * 
 * Sauvegarde les métadonnées du cache dans PropertiesService (limité à 9KB)
 */
function saveCacheData(cacheData) {
  try {
    const props = PropertiesService.getUserProperties();
    const jsonData = JSON.stringify(cacheData);
    const dataSize = jsonData.length;
    
    // Limite de PropertiesService: 9KB par propriété, 500KB total
    if (dataSize > 9000) {
      console.warn(`⚠️ Cache trop volumineux (${dataSize} octets), sauvegarde métadonnées uniquement`);
      const lightData = {
        timestamp: cacheData.timestamp || new Date().toISOString(),
        classCount: cacheData.classes ? Object.keys(cacheData.classes).length : 0
      };
      props.setProperty('autoSaveCache', JSON.stringify(lightData));
    } else {
      props.setProperty('autoSaveCache', jsonData);
    }
    
    // Sauvegarder les métadonnées
    props.setProperty('lastCacheDate', new Date().toISOString());
    props.setProperty('lastCacheSize', dataSize.toString());
    
    console.log(`💾 Métadonnées cache sauvegardées: ${dataSize} octets`);
    return { success: true, message: 'Métadonnées cache sauvegardées' };
  } catch (e) {
    console.error('💥 Erreur saveCacheData:', e);
    return { success: false, error: e.toString() };
  }
}

/**
 * Écrit les options/LV2 configurées depuis l'UI dans la feuille _STRUCTURE
 * @param {Object} optionsByClass - { "6°1": { LV2: ["ITA", "ESP"], OPT: ["LATIN"] }, ... }
 */
function setStructureOptionsFromUI(optionsByClass) {
  try {
    console.log('📝 setStructureOptionsFromUI appelé avec:', JSON.stringify(optionsByClass));

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const structureSheet = ss.getSheetByName(ELEVES_MODULE_CONFIG.STRUCTURE_SHEET);

    if (!structureSheet) {
      console.error('⚠️ Feuille _STRUCTURE introuvable');
      return { success: false, error: 'Feuille _STRUCTURE introuvable' };
    }

    // Lire la feuille _STRUCTURE
    const data = structureSheet.getDataRange().getValues();
    let headerRow = -1;

    // Trouver l'en-tête
    for (let i = 0; i < Math.min(10, data.length); i++) {
      if (data[i][0] === "CLASSE_ORIGINE" && data[i][1] === "CLASSE_DEST") {
        headerRow = i;
        break;
      }
    }

    if (headerRow === -1) {
      console.error('⚠️ En-têtes non trouvés dans _STRUCTURE');
      return { success: false, error: 'En-têtes non trouvés dans _STRUCTURE' };
    }

    const headers = data[headerRow];
    const colDest = headers.indexOf("CLASSE_DEST");
    const colOptions = headers.indexOf("OPTIONS");

    if (colDest === -1 || colOptions === -1) {
      console.error('⚠️ Colonnes CLASSE_DEST ou OPTIONS non trouvées');
      return { success: false, error: 'Colonnes manquantes dans _STRUCTURE' };
    }

    // Compter les élèves par option depuis les onglets TEST
    const sourceMode = ELEVES_MODULE_CONFIG.TEST_SUFFIX;
    const optionCounts = countStudentsByOption(ss, sourceMode);
    console.log('📊 Comptage élèves par option:', JSON.stringify(optionCounts));

    // Écrire les options pour chaque classe
    let updatedCount = 0;
    for (let i = headerRow + 1; i < data.length; i++) {
      const classeDest = String(data[i][colDest] || '').trim();
      if (!classeDest) continue;

      const classConfig = optionsByClass[classeDest];
      if (!classConfig) continue;

      // Construire la chaîne OPTIONS (format: "ITA=5,LATIN=3,CHAV=2")
      const optionPairs = [];

      // Ajouter les LV2
      if (Array.isArray(classConfig.LV2)) {
        classConfig.LV2.forEach(lv2 => {
          const count = optionCounts[lv2] || 999; // Si pas de comptage, mettre un quota élevé
          optionPairs.push(`${lv2}=${count}`);
        });
      }

      // Ajouter les OPT
      if (Array.isArray(classConfig.OPT)) {
        classConfig.OPT.forEach(opt => {
          const count = optionCounts[opt] || 999;
          optionPairs.push(`${opt}=${count}`);
        });
      }

      const optionsStr = optionPairs.join(',');
      console.log(`✍️ Classe ${classeDest}: OPTIONS="${optionsStr}"`);

      // Écrire dans la cellule
      structureSheet.getRange(i + 1, colOptions + 1).setValue(optionsStr);
      updatedCount++;
    }

    SpreadsheetApp.flush();
    console.log(`✅ ${updatedCount} classes mises à jour dans _STRUCTURE`);

    return { success: true, message: `${updatedCount} classes configurées` };
  } catch (e) {
    console.error('❌ Erreur setStructureOptionsFromUI:', e);
    return { success: false, error: e.toString() };
  }
}

/**
 * Compte les élèves par option/LV2 depuis les onglets d'un mode
 * @param {Spreadsheet} ss - Le spreadsheet
 * @param {string} suffix - Le suffixe des onglets (TEST, CACHE, FIN)
 * @returns {Object} - { "ITA": 15, "LATIN": 8, "CHAV": 5, ... }
 */
function countStudentsByOption(ss, suffix) {
  const counts = {};

  try {
    const sheets = ss.getSheets();
    const escapedSuffix = String(suffix).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escapedSuffix + '$', 'i');

    sheets.forEach(sheet => {
      const name = sheet.getName();
      if (!pattern.test(name)) return;
      if (ELEVES_MODULE_CONFIG.SHEET_EXCLUSION_PATTERN.test(name)) return;

      const data = sheet.getDataRange().getValues();
      if (data.length < 2) return;

      // Trouver les colonnes LV2 et OPT
      const headers = data[0].map(h => _eleves_up(h));
      const colLV2 = _eleves_idx(headers, ['LV2', 'LANGUE2', 'L2']);
      const colOPT = _eleves_idx(headers, ['OPT', 'OPTION']);

      // Compter les élèves
      for (let i = 1; i < data.length; i++) {
        const row = data[i];

        // Compter LV2
        if (colLV2 !== -1) {
          const lv2 = _eleves_up(row[colLV2]);
          if (lv2) {
            counts[lv2] = (counts[lv2] || 0) + 1;
          }
        }

        // Compter OPT
        if (colOPT !== -1) {
          const opt = _eleves_up(row[colOPT]);
          if (opt) {
            counts[opt] = (counts[opt] || 0) + 1;
          }
        }
      }
    });
  } catch (e) {
    console.error('Erreur countStudentsByOption:', e);
  }

  return counts;
}

/**
 * Récupère les paramètres UI globaux (persistés)
 * Retourne un objet, ex: { SHOW_GROUPS_BUTTON: false }
 */
function getUiSettings() {
  try {
    const props = PropertiesService.getScriptProperties();
    const raw = props.getProperty('UI_SETTINGS');
    const parsed = raw ? JSON.parse(raw) : {};
    if (typeof parsed.SHOW_GROUPS_BUTTON === 'undefined') {
      parsed.SHOW_GROUPS_BUTTON = false; // caché par défaut
    }
    return parsed;
  } catch (e) {
    console.error('❌ Erreur getUiSettings:', e);
    return { SHOW_GROUPS_BUTTON: false };
  }
}

/**
 * Met à jour les paramètres UI globaux (réservé admin)
 * @param {Object} settings - ex: { SHOW_GROUPS_BUTTON: true }
 */
function setUiSettings(settings) {
  try {
    const current = getUiSettings();
    const next = Object.assign({}, current, settings || {});
    PropertiesService.getScriptProperties().setProperty('UI_SETTINGS', JSON.stringify(next));
    return { success: true, settings: next };
  } catch (e) {
    console.error('❌ Erreur setUiSettings:', e);
    return { success: false, error: String(e) };
  }
}

/**
 * GROUPS MODULE V4 - FONCTIONS SERVEUR
 * Fonctions Apps Script pour sauvegarder et charger les groupes dans Google Sheets
 */

/**
 * Sauvegarde les groupes dans des onglets Google Sheets (VERSION V4)
 * @param {Array} groupsData - Tableau d'objets {sheetName, students, metadata}
 * @param {boolean} isTemp - Si true, créer onglets TEMP, sinon définitifs
 * @returns {Object} Résultat {success, created, updated, deleted, sheetNames, error}
 */
function saveGroupsToSheetsV4(groupsData, isTemp) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const result = {
      success: true,
      created: 0,
      updated: 0,
      deleted: 0,
      sheetNames: []
    };

    // Si finalisation (isTemp = false), supprimer d'abord tous les onglets TEMP
    if (!isTemp) {
      const allSheets = ss.getSheets();
      allSheets.forEach(sheet => {
        const name = sheet.getName();
        if (name.includes('TEMP') && name.match(/^6°Grp(B|LV|Op)\d+TEMP$/)) {
          ss.deleteSheet(sheet);
          result.deleted++;
          Logger.log('🗑️ Onglet TEMP supprimé: ' + name);
        }
      });
    }

    // Créer ou mettre à jour chaque onglet de groupe
    groupsData.forEach(groupData => {
      const sheetName = groupData.sheetName;
      let sheet = ss.getSheetByName(sheetName);

      if (sheet) {
        // Onglet existe → mise à jour
        sheet.clear();
        result.updated++;
        Logger.log('🔄 Mise à jour onglet: ' + sheetName);
      } else {
        // Créer nouvel onglet
        sheet = ss.insertSheet(sheetName);
        result.created++;
        Logger.log('✅ Création onglet: ' + sheetName);
      }

      // Écrire les en-têtes (SOURCE en colonne O = index 14)
      const headers = ['ID', 'NOM', 'PRENOM', 'SEXE', 'CLASSE', 'SCORE F', 'SCORE M', 'COM', 'TRA', 'PART', 'ABS', 'LV2', 'OPTIONS', '', 'SOURCE'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      // Formater les en-têtes
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#4a90e2')
        .setFontColor('#ffffff')
        .setFontWeight('bold')
        .setHorizontalAlignment('center');

      // Écrire les données des élèves (SOURCE en colonne O)
      if (groupData.students.length > 0) {
        const rows = groupData.students.map(student => [
          student.id,
          student.nom,
          student.prenom,
          student.sexe,
          student.classe,
          student.scoreF,
          student.scoreM,
          student.com,
          student.tra,
          student.part,
          student.abs,
          student.lv2,
          Array.isArray(student.options) ? student.options.join(';') : (student.options || ''),
          '',
          student.source || student.SOURCE || student.classe || ''
        ]);

        sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
      }

      // Ajouter métadonnées en bas de l'onglet (lignes cachées)
      const metaRow = groupData.students.length + 3;
      sheet.getRange(metaRow, 1, 1, 2).setValues([['METADATA', JSON.stringify(groupData.metadata)]]);
      sheet.getRange(metaRow, 1, 1, 2).setBackground('#f3f4f6').setFontSize(8);

      // Formater les colonnes
      sheet.autoResizeColumns(1, headers.length);
      sheet.setFrozenRows(1);

      // Alterner les couleurs des lignes
      if (groupData.students.length > 0) {
        for (let i = 2; i <= groupData.students.length + 1; i++) {
          const color = i % 2 === 0 ? '#f9fafb' : '#ffffff';
          sheet.getRange(i, 1, 1, headers.length).setBackground(color);
        }
      }

      result.sheetNames.push(sheetName);
    });

    Logger.log('✅ Sauvegarde réussie: ' + JSON.stringify(result));
    return result;

  } catch (error) {
    Logger.log('❌ Erreur saveGroupsToSheetsV4: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Pont intelligent : récupère le contexte depuis PropertiesService et le supprime.
 * Appelé par InterfaceV2 au chargement pour s'initialiser avec le bon mode.
 */
function getBridgeContextAndClear() {
  try {
    const userProperties = PropertiesService.getUserProperties();
    const contextString = userProperties.getProperty('JULES_CONTEXT');

    if (contextString) {
      // Supprimer la propriété pour qu'elle ne soit utilisée qu'une seule fois
      userProperties.deleteProperty('JULES_CONTEXT');

      const context = JSON.parse(contextString);
      console.log('🌉 Contexte de pont récupéré et supprimé:', context);

      return { success: true, context: context };
    } else {
      console.log('🌉 Aucun contexte de pont trouvé.');
      return { success: false, context: null };
    }
  } catch (error) {
    console.error('Erreur dans getBridgeContextAndClear:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * Récupère le mot de passe admin depuis la feuille de configuration _CONFIG.
 * @returns {string|null} Le mot de passe ou null si non trouvé.
 */

/**
 * Charge les groupes depuis les onglets Google Sheets (VERSION V4)
 * Recherche tous les onglets commençant par "6°Grp" (B/LV/Op) avec ou sans TEMP
 * @returns {Object} Résultat {success, groups, sheetNames, error}
 */
function loadGroupsFromSheetsV4() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const allSheets = ss.getSheets();
    const result = {
      success: true,
      groups: [],
      sheetNames: []
    };

    // Pattern pour identifier les onglets de groupes
    const pattern = /^6°Grp(B|LV|Op)(\d+)(TEMP)?$/;

    allSheets.forEach(sheet => {
      const name = sheet.getName();
      const match = name.match(pattern);

      if (match) {
        Logger.log('📂 Chargement onglet: ' + name);

        // Lire les données
        const dataRange = sheet.getDataRange();
        const values = dataRange.getValues();

        if (values.length < 2) {
          Logger.log('⚠️ Onglet vide: ' + name);
          return;
        }

        // Extraire les élèves (lignes 2 à n)
        const students = [];
        for (let i = 1; i < values.length; i++) {
          const row = values[i];

          // Si ligne de métadonnées, arrêter
          if (row[0] === 'METADATA') break;

          // Si ligne vide, continuer
          if (!row[0]) continue;

          const classe = (row[4] || '').toString().trim();
          const sourceClass = (row[14] || row[4] || '').toString().trim() || classe;
          const rawOptions = row[12];

          let options = [];
          let optionsString = '';
          if (Array.isArray(rawOptions)) {
            options = rawOptions.filter(Boolean).map(opt => opt.toString().trim()).filter(Boolean);
            optionsString = options.join(';');
          } else if (typeof rawOptions === 'string' && rawOptions.trim() !== '') {
            options = rawOptions.split(/[;,]/).map(opt => opt.trim()).filter(Boolean);
            optionsString = rawOptions.trim();
          }

          const lv2 = (row[11] || '').toString().trim().toUpperCase() || 'ESP';
          const scoreF = parseFloat(row[5]) || 0;
          const scoreM = parseFloat(row[6]) || 0;
          const com = parseFloat(row[7]) || 0;
          const tra = parseFloat(row[8]) || 0;
          const part = parseFloat(row[9]) || 0;
          const abs = parseFloat(row[10]) || 0;

          students.push({
            id: (row[0] || '').toString().trim(),
            nom: (row[1] || '').toString().trim(),
            lastName: (row[1] || '').toString().trim(),
            prenom: (row[2] || '').toString().trim(),
            firstName: (row[2] || '').toString().trim(),
            sexe: (row[3] || '').toString().trim().toUpperCase(),
            class: classe,
            classe: classe,
            className: classe,
            scoreF: scoreF,
            scoreM: scoreM,
            com: com,
            tra: tra,
            part: part,
            abs: abs,
            scores: {
              F: scoreF,
              M: scoreM,
              COM: com,
              TRA: tra,
              PART: part,
              ABS: abs
            },
            lv2: lv2,
            LV2: lv2,
            opt: optionsString,
            options: options,
            optionsList: options,
            source: sourceClass,
            SOURCE: sourceClass,
            _SOURCE_CLASS: sourceClass
          });
        }

        // Chercher les métadonnées
        let metadata = null;
        for (let i = values.length - 1; i >= 0; i--) {
          if (values[i][0] === 'METADATA') {
            try {
              metadata = JSON.parse(values[i][1]);
            } catch (e) {
              Logger.log('⚠️ Métadonnées invalides dans ' + name);
            }
            break;
          }
        }

        // Si pas de métadonnées, en créer des basiques
        if (!metadata) {
          const prefix = match[1];
          const scenarioMap = { 'B': 'besoins', 'LV': 'lv2', 'Op': 'options' };
          metadata = {
            groupId: parseInt(match[2]),
            groupName: 'Groupe ' + match[2],
            regroupementName: 'Regroupement',
            scenario: scenarioMap[prefix] || 'besoins',
            mode: 'heterogeneous',
            isTemp: !!match[3],
            timestamp: new Date().toISOString()
          };
        }

        result.groups.push({
          students: students,
          metadata: metadata
        });

        result.sheetNames.push(name);
      }
    });

    // Trier les groupes par groupId
    result.groups.sort((a, b) => a.metadata.groupId - b.metadata.groupId);

    Logger.log('✅ Chargement réussi: ' + result.groups.length + ' groupe(s)');
    return result;

  } catch (error) {
    Logger.log('❌ Erreur loadGroupsFromSheetsV4: ' + error.toString());
    return {
      success: false,
      error: error.toString(),
      groups: [],
      sheetNames: []
    };
  }
}
