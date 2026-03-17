#!/bin/bash

# Mindwave Feature Audit Script
# Checks all HTML variants for required feature IDs

ERROR_COUNT=0

check_id() {
    FILE=$1
    ID=$2
    if ! grep -q "id=\"$ID\"" "$FILE"; then
        echo "❌ MISSING: ID '$ID' not found in $FILE"
        ERROR_COUNT=$((ERROR_COUNT + 1))
    else
        echo "✅ FOUND: ID '$ID' in $FILE"
    fi
}

FILES="public/mindwave.html public/mindwave-beta.html public/mindwave-official.html"
REQUIRED_IDS="galaxySettingsPanel cyberModeInterstellar aiGenerateBtn dragonBtn galaxyBtn cubeBtn mandalaBtn"

for FILE in $FILES; do
    echo "Auditing $FILE..."
    for ID in $REQUIRED_IDS; do
        check_id "$FILE" "$ID"
    done
    echo "---------------------------"
done

if [ $ERROR_COUNT -eq 0 ]; then
    echo "✨ AUDIT PASSED: All core features are present."
    exit 0
else
    echo "⚠️ AUDIT FAILED: $ERROR_COUNT missing features detected!"
    exit 1
fi
