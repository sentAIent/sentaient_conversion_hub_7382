#!/bin/bash

# Use Node 22 for Capacitor
source ~/.nvm/nvm.sh
nvm use 22

echo "Installing Capacitor dependencies..."
npm install @capacitor/cli @capacitor/core @capacitor/ios @capacitor/android

echo "Building the web app..."
npm run build

echo "Initializing Capacitor (if not already done)..."
npx cap init "Legal Eagle" "com.sentaient.legaleagle" --web-dir dist

echo "Adding iOS platform..."
npx cap add ios

echo "Adding Android platform..."
npx cap add android

echo "Syncing web assets to native platforms..."
npx cap sync

echo "================================================================"
echo "Mobile Projects Generated Successfully!"
echo "================================================================"
echo ""
echo "Next Steps for App Store Publishing (iOS):"
echo "1. Run: npx cap open ios"
echo "2. In Xcode, select your development team."
echo "3. Go to Product > Archive to generate the final binary."
echo "4. Use the contents of 'store_listing.md' for App Store Connect."
echo ""
echo "Next Steps for Google Play Publishing (Android):"
echo "1. Run: npx cap open android"
echo "2. In Android Studio, go to Build > Generate Signed Bundle / APK."
echo "3. Create or select your keystore."
echo "4. Use the contents of 'store_listing.md' for Google Play Console."
echo "================================================================"
