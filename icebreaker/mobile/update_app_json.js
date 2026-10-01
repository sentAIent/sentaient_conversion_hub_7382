const fs = require('fs');
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));

appJson.expo.name = "Icebreaker";
appJson.expo.ios.infoPlist = {
  "NSLocationWhenInUseUsageDescription": "Icebreaker needs your location to find Geo-Swarms and local venue bounties near you.",
  "NSLocationAlwaysAndWhenInUseUsageDescription": "Icebreaker needs location access to alert you when a Geo-Swarm happens nearby.",
  "NSCameraUsageDescription": "Icebreaker requires camera access so you can capture and submit videos to claim bounties.",
  "NSMicrophoneUsageDescription": "Icebreaker requires microphone access to record audio with your bounty videos.",
  "NSPhotoLibraryUsageDescription": "Icebreaker needs access to your photos so you can upload saved videos for bounties.",
  "NSFaceIDUsageDescription": "Icebreaker uses Face ID to securely authenticate your account and payments."
};
appJson.expo.android.permissions = [
  "ACCESS_COARSE_LOCATION",
  "ACCESS_FINE_LOCATION",
  "CAMERA",
  "RECORD_AUDIO",
  "READ_EXTERNAL_STORAGE",
  "WRITE_EXTERNAL_STORAGE",
  "USE_BIOMETRIC"
];

// App Version
appJson.expo.version = "1.0.0";
if (!appJson.expo.ios.buildNumber) appJson.expo.ios.buildNumber = "1";
if (!appJson.expo.android.versionCode) appJson.expo.android.versionCode = 1;

fs.writeFileSync('app.json', JSON.stringify(appJson, null, 2));
