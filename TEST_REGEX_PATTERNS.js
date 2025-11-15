// Test des patterns de détection des onglets sources

// Pattern actuel dans le code
const currentPattern = /^(ECOLE\d+|[A-Za-z0-9_-]+°\d+)$/;

// Pattern simplifié (tout avec °)
const simplifiedPattern = /^[A-Za-z0-9_-]+°\d+$/;

// Cas de test fournis par l'utilisateur
const testCases = [
  '6°1',        // Niveau 6, classe 1
  '5°3',        // Niveau 5, classe 3
  '3°4',        // Niveau 4, classe 4
  'GAMARRA°7',  // Nom personnalisé, classe 7
  // Autres cas à tester
  '4°2',        // Niveau 4, classe 2
  'ECOLE°1',    // ECOLE avec °
  'ECOLE1',     // ECOLE sans ° (ancien format ?)
  'COLBERT°5',  // Autre nom personnalisé
  '6°1TEST',    // Avec TEST (doit être rejeté)
  '6°1DEF',     // Avec DEF (doit être rejeté)
  'TEST',       // Juste TEST (doit être rejeté)
  '_CONFIG',    // Config sheet (doit être rejeté)
];

console.log('╔═══════════════════════════════════════════════════════════╗');
console.log('║ TEST DES PATTERNS DE DÉTECTION DES ONGLETS SOURCES       ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

console.log('Pattern actuel : /^(ECOLE\\d+|[A-Za-z0-9_-]+°\\d+)$/');
console.log('Pattern simplifié: /^[A-Za-z0-9_-]+°\\d+$/\n');

console.log('─────────────────────────────────────────────────────────────');
console.log('CAS DE TEST                 | ACTUEL | SIMPLIFIÉ');
console.log('─────────────────────────────────────────────────────────────');

testCases.forEach(testCase => {
  const matchCurrent = currentPattern.test(testCase);
  const matchSimplified = simplifiedPattern.test(testCase);

  const pad = 27 - testCase.length;
  const padding = ' '.repeat(Math.max(0, pad));

  const current = matchCurrent ? '  ✅   ' : '  ❌   ';
  const simplified = matchSimplified ? '  ✅' : '  ❌';

  console.log(`${testCase}${padding} |${current}|${simplified}`);
});

console.log('─────────────────────────────────────────────────────────────\n');

console.log('ANALYSE :');
console.log('• Pattern actuel supporte ECOLE1 (sans °)');
console.log('• Pattern simplifié requiert TOUJOURS le symbole °');
console.log('• Les deux rejettent correctement TEST/DEF\n');

console.log('RECOMMANDATION :');
console.log('Si TOUS les onglets sources ont TOUJOURS le °,');
console.log('alors le pattern simplifié est plus cohérent.');
