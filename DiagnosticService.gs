/**
 * ===================================================================
 * 🧠 Diagnostic Service - Moteur de Validation Centralisé
 * ===================================================================
 *
 * Ce service fournit des fonctions pour valider l'état du projet à
 * différentes étapes du workflow. Il est conçu pour retourner des
 * objets structurés (erreurs, avertissements, informations) qui
 * peuvent être facilement consommés par l'interface utilisateur.
 *
 * @version 1.0
 * @date 2025-11-15
 * ===================================================================
 */

/**
 * Exécute une série complète de diagnostics sur le projet.
 * @returns {Array<object>} Un tableau d'objets de diagnostic.
 * Chaque objet a la forme : { id: string, status: 'ok'|'warning'|'error', icon: string, message: string, ...data }
 */
function runGlobalDiagnostics() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const results = [];

    // --- Vérifications de base (fichiers de configuration) ---
    const consolidationSheet = ss.getSheetByName('CONSOLIDATION');
    const structureSheet = ss.getSheetByName('_STRUCTURE');
    if (!consolidationSheet || !structureSheet) {
      results.push({ id: 'config_sheets', status: 'error', icon: 'error', message: "Onglets CONSOLIDATION ou _STRUCTURE manquants." });
      return results; // Arrêt prématuré si la config de base est absente
    }

    // --- Diagnostics sur les données (depuis CONSOLIDATION) ---
    const studentCount = consolidationSheet.getLastRow() > 1 ? consolidationSheet.getLastRow() - 1 : 0;
    results.push({ id: 'student_count', status: 'ok', icon: 'check_circle', message: `${studentCount} élèves trouvés.`, count: studentCount });

    // Diagnostic de doublons d'ID
    if (studentCount > 0) {
      const idColumn = consolidationSheet.getRange(2, 1, studentCount, 1).getValues();
      const idSet = new Set();
      const duplicates = idColumn.reduce((acc, row) => {
        const id = row[0];
        if (id) {
          if (idSet.has(id)) acc.push(id);
          else idSet.add(id);
        }
        return acc;
      }, []);

      if (duplicates.length > 0) {
        results.push({ id: 'id_duplicates', status: 'error', icon: 'error', message: `${duplicates.length} doublons d'ID trouvés (ex: ${duplicates[0]}).` });
      } else {
        results.push({ id: 'id_duplicates', status: 'ok', icon: 'check_circle', message: `Aucun doublon d'ID détecté.` });
      }
    }

    // --- Diagnostics sur la configuration (depuis _STRUCTURE) ---
    const structureData = structureSheet.getLastRow() > 1 ? structureSheet.getRange(2, 2, structureSheet.getLastRow() - 1, 1).getValues() : [];
    const totalPlaces = structureData.reduce((sum, row) => sum + (parseInt(row[0], 10) || 0), 0);
    results.push({ id: 'place_count', status: 'ok', icon: 'check_circle', message: `${totalPlaces} places configurées.` });

    // --- Diagnostics croisés (Données vs Configuration) ---
    if (studentCount > totalPlaces) {
      const deficit = studentCount - totalPlaces;
      results.push({
        id: 'student_vs_places',
        status: 'error',
        icon: 'error',
        message: `⚠️ ERREUR CRITIQUE: ${studentCount} élèves pour seulement ${totalPlaces} places configurées (déficit de ${deficit} places). Vous DEVEZ augmenter les effectifs dans l'onglet _STRUCTURE ou utiliser l'interface "Configurer Structure (OPT/LV2)" en Phase 1.`
      });
    } else if (totalPlaces > studentCount) {
      const surplus = totalPlaces - studentCount;
      results.push({
        id: 'student_vs_places',
        status: 'info',
        icon: 'info',
        message: `ℹ️ ${studentCount} élèves pour ${totalPlaces} places configurées (${surplus} places disponibles). C'est normal si vous prévoyez d'ajouter des élèves.`
      });
    } else {
      results.push({
        id: 'student_vs_places',
        status: 'ok',
        icon: 'check_circle',
        message: `✅ Nombre d'élèves (${studentCount}) = Nombre de places (${totalPlaces}). Configuration parfaite !`
      });
    }

    // On ajoutera ici les diagnostics de contraintes ASSO/DISSO, etc.

    return results;
  } catch(e) {
    // En cas d'erreur majeure, retourner une seule erreur critique
    return [{ id: 'fatal_error', status: 'error', icon: 'error', message: 'Erreur critique du service de diagnostic: ' + e.message }];
  }
}
