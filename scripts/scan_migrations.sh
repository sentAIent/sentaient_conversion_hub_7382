#!/bin/bash
# Simple static analysis to detect potential SQL injections in migration files.
# It flags dynamic SQL construction that uses string concatenation (||) instead of format() or parameterization.

set -e

MIGRATIONS_DIR="supabase/migrations"

if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "Migrations directory $MIGRATIONS_DIR does not exist. Skipping."
  exit 0
fi

echo "🔍 Scanning migrations in $MIGRATIONS_DIR for SQL injection anti-patterns..."

# Look for dynamic EXECUTE with concatenation
# Example: EXECUTE 'SELECT * FROM ' || user_input;
INJECTIONS=$(grep -n -iE "EXECUTE.*\|\||EXECUTE IMMEDIATE.*\|\||\\bEXEC\\(" "$MIGRATIONS_DIR"/*.sql 2>/dev/null || true)

if [ -n "$INJECTIONS" ]; then
  echo "❌ WARNING: Potential SQL injection detected in migration files:"
  echo "$INJECTIONS"
  echo ""
  echo "Recommendation: Use the format() function with %I (identifiers) and %L (literals) instead of string concatenation (||)."
  exit 1
else
  echo "✅ No obvious SQL injection anti-patterns detected in migrations."
fi

# Look for usage of unsafe PL/pgSQL function construction without security definer awareness
UNSAFE_DEFINER=$(grep -n -iE "SECURITY DEFINER" "$MIGRATIONS_DIR"/*.sql 2>/dev/null | grep -iv "search_path" || true)

if [ -n "$UNSAFE_DEFINER" ]; then
  echo "⚠️ WARNING: SECURITY DEFINER function(s) missing 'set search_path' clause. This can lead to privilege escalation."
  echo "$UNSAFE_DEFINER"
  echo ""
  echo "Recommendation: Always append 'SET search_path = public' (or restricted schema) to SECURITY DEFINER functions."
  # Non-blocking warning for now
fi

exit 0
