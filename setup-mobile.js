const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log("🚀 Sentaient Mobile Setup Initialization");
console.log("=========================================");

try {
  // 1. Install Dependencies
  console.log("📦 Installing Capacitor core and plugins...");
  execSync('npm install @capacitor/core @capacitor/ios @capacitor/android @capacitor-community/media-session @capacitor-community/background-mode', { stdio: 'inherit' });
  execSync('npm install -D @capacitor/cli', { stdio: 'inherit' });

  // 2. Add Platforms
  console.log("\n📱 Adding iOS and Android platforms...");
  // Run build first so 'dist' exists for cap add
  execSync('npm run build', { stdio: 'inherit' });
  execSync('npx cap add ios', { stdio: 'inherit' });
  execSync('npx cap add android', { stdio: 'inherit' });

  // 3. Patch iOS Info.plist for Background Audio
  console.log("\n🍎 Patching iOS Info.plist for Background Audio...");
  const plistPath = path.join(__dirname, 'ios/App/App/Info.plist');
  if (fs.existsSync(plistPath)) {
    let plistContent = fs.readFileSync(plistPath, 'utf8');
    if (!plistContent.includes('<string>audio</string>')) {
      const dictEnd = plistContent.lastIndexOf('</dict>');
      const audioConfig = `
    <key>UIBackgroundModes</key>
    <array>
        <string>audio</string>
    </array>
`;
      plistContent = plistContent.slice(0, dictEnd) + audioConfig + plistContent.slice(dictEnd);
      fs.writeFileSync(plistPath, plistContent);
      console.log("✅ iOS Info.plist patched successfully.");
    } else {
      console.log("ℹ️ iOS Info.plist already contains audio background mode.");
    }
  }

  // 4. Patch AndroidManifest.xml for Foreground Service
  console.log("\n🤖 Patching AndroidManifest.xml for Background Audio...");
  const manifestPath = path.join(__dirname, 'android/app/src/main/AndroidManifest.xml');
  if (fs.existsSync(manifestPath)) {
    let manifestContent = fs.readFileSync(manifestPath, 'utf8');
    if (!manifestContent.includes('FOREGROUND_SERVICE')) {
      const manifestEnd = manifestContent.indexOf('<application');
      const permissions = `
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
`;
      manifestContent = manifestContent.slice(0, manifestEnd) + permissions + manifestContent.slice(manifestEnd);
      fs.writeFileSync(manifestPath, manifestContent);
      console.log("✅ AndroidManifest.xml patched successfully.");
    } else {
      console.log("ℹ️ AndroidManifest.xml already contains foreground service permissions.");
    }
  }

  // 5. Final Sync
  console.log("\n🔄 Syncing Capacitor plugins...");
  execSync('npx cap sync', { stdio: 'inherit' });

  console.log("\n🎉 Mobile Phase 2 Setup Complete!");
  console.log("You can now open the projects using:");
  console.log("  npx cap open ios");
  console.log("  npx cap open android");
} catch (error) {
  console.error("\n❌ Error during mobile setup:", error.message);
  console.log("If this was an NPM 403 Forbidden error, please temporarily disconnect from your corporate proxy/VPN and run `node setup-mobile.js` again.");
}
