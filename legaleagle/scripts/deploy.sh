#!/bin/bash
set -e

echo "🚀 Initiating Legal Eagle Production Build Sequence..."

# 1. Clean previous builds
echo "🧹 Cleaning dist directory..."
rm -rf dist/

# 2. Build Web App
echo "🏗️ Building Vite React App for Production..."
npm run build

# 3. Sync to Mobile
echo "📱 Syncing assets to iOS and Android Capacitor projects..."
npx cap sync

echo "✅ Web build and mobile sync complete!"
echo ""
echo "NEXT STEPS:"
echo "1. Web: Deploy the 'dist' folder to your host (e.g., vercel deploy --prod)"
echo "2. iOS: Open XCode with 'npx cap open ios' and archive for App Store Connect"
echo "3. Android: Open Android Studio with 'npx cap open android' and generate a signed App Bundle (.aab)"
