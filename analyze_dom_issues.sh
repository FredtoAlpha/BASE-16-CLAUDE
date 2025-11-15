#!/bin/bash

# Script d'analyse des références DOM dangereuses dans le code
# Identifie les usages de document/window qui pourraient s'exécuter côté serveur

echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║     ANALYSE DES RÉFÉRENCES DOM DANGEREUSES                        ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""

# Couleurs
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

TOTAL_ISSUES=0

# Fonction pour compter et afficher les occurrences
check_pattern() {
    local pattern="$1"
    local description="$2"
    local color="$3"

    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
    echo -e "${color}🔍 Recherche: $description${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
    echo ""

    local file_count=0
    local total_count=0

    for file in *.html; do
        if [ -f "$file" ]; then
            count=$(grep -c "$pattern" "$file" 2>/dev/null || echo "0")
            if [ "$count" -gt "0" ]; then
                file_count=$((file_count + 1))
                total_count=$((total_count + count))
                echo -e "${color}  ❌ ./$file: $count occurrence(s)${NC}"

                # Afficher les premières lignes avec numéros
                grep -n "$pattern" "$file" 2>/dev/null | head -5 | while read line; do
                    echo "     $line"
                done

                if [ "$count" -gt "5" ]; then
                    echo "     ... et $((count - 5)) autres occurrences"
                fi
                echo ""
            fi
        fi
    done

    TOTAL_ISSUES=$((TOTAL_ISSUES + total_count))

    echo -e "${color}📊 Total pour '$description': $total_count occurrences dans $file_count fichiers${NC}"
}

# Vérifications principales
check_pattern "document\." "Accès direct à 'document'" "$RED"
check_pattern "window\." "Accès direct à 'window'" "$YELLOW"
check_pattern "addEventListener" "Event listeners" "$YELLOW"
check_pattern "getElementById" "getElementById" "$RED"
check_pattern "querySelector" "querySelector/querySelectorAll" "$RED"
check_pattern "localStorage" "localStorage" "$YELLOW"
check_pattern "sessionStorage" "sessionStorage" "$YELLOW"

# Résumé final
echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                         RÉSUMÉ FINAL                              ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${RED}🚨 TOTAL DES PROBLÈMES DÉTECTÉS: $TOTAL_ISSUES${NC}"
echo ""

# Recommandations par priorité
echo "📋 FICHIERS PAR PRIORITÉ:"
echo ""
echo -e "${RED}🔴 PHASE 1 - CRITIQUE (> 50 occurrences):${NC}"
for file in *.html; do
    if [ -f "$file" ]; then
        count=$(grep -c "document\." "$file" 2>/dev/null || echo "0")
        if [ "$count" -gt "50" ]; then
            echo "   • $file: $count occurrences"
        fi
    fi
done

echo ""
echo -e "${YELLOW}🟡 PHASE 2 - IMPORTANT (20-50 occurrences):${NC}"
for file in *.html; do
    if [ -f "$file" ]; then
        count=$(grep -c "document\." "$file" 2>/dev/null || echo "0")
        if [ "$count" -ge "20" ] && [ "$count" -le "50" ]; then
            echo "   • $file: $count occurrences"
        fi
    fi
done

echo ""
echo -e "${GREEN}🟢 PHASE 3 - MOYEN (< 20 occurrences):${NC}"
for file in *.html; do
    if [ -f "$file" ]; then
        count=$(grep -c "document\." "$file" 2>/dev/null || echo "0")
        if [ "$count" -gt "0" ] && [ "$count" -lt "20" ]; then
            echo "   • $file: $count occurrences"
        fi
    fi
done

echo ""
echo "╔═══════════════════════════════════════════════════════════════════╗"
echo "║                         PROCHAINES ÉTAPES                         ║"
echo "╚═══════════════════════════════════════════════════════════════════╝"
echo ""
echo "1. Appliquer les guards aux fichiers PHASE 1 (critique)"
echo "2. Tester les includes serveur (Apps Script)"
echo "3. Valider fonctionnement client (navigateur)"
echo "4. Appliquer aux PHASE 2 et 3"
echo ""
echo "📖 Voir: DOM_ENVIRONMENT_GUARD_PATTERN.md"
echo "🔧 Utiliser: client_environment_guards.js"
echo ""
