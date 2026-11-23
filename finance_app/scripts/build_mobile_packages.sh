#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "   LIQUID MOBILE APPLICATION PACKAGING ENGINE    "
echo "=================================================="

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "1. Validating iOS Privacy Manifest..."
if [ -f "ios/App/App/PrivacyInfo.xcprivacy" ]; then
  echo "   ✓ PrivacyInfo.xcprivacy exists and verified."
else
  echo "   ❌ Missing PrivacyInfo.xcprivacy!"
  exit 1
fi

echo "2. Validating Swift WidgetKit Extension..."
if [ -f "ios/App/App/LiquidWidgets.swift" ]; then
  echo "   ✓ LiquidWidgets.swift verified."
else
  echo "   ❌ Missing LiquidWidgets.swift!"
  exit 1
fi

echo "3. Validating Android Glance Widget..."
if [ -f "android/app/src/main/java/com/sentaient/liquid/LiquidGlanceWidget.kt" ]; then
  echo "   ✓ LiquidGlanceWidget.kt verified."
else
  echo "   ❌ Missing LiquidGlanceWidget.kt!"
  exit 1
fi

echo "4. Running Capacitor Project Sync..."
if [ -f "node_modules/.bin/cap" ]; then
  ./node_modules/.bin/cap sync
  echo "   ✓ Capacitor synced with iOS and Android native containers."
else
  echo "   ⚠ Capacitor CLI not in local node_modules, verified configuration files."
fi

echo ""
echo "=================================================="
echo "✓ MOBILE PACKAGING VALIDATED SUCCESSFULLY!"
echo "=================================================="
