import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Application from 'expo-application';

/**
 * Jailbreak and Root Detection Utility
 * 
 * Verifies the integrity of the device environment. If compromised, 
 * the application should halt execution or restrict sensitive operations.
 */

// Common paths used by jailbreak/root tools
const SUSPICIOUS_PATHS_IOS = [
  '/Applications/Cydia.app',
  '/Applications/FakeCarrier.app',
  '/Applications/Icy.app',
  '/Applications/IntelliScreen.app',
  '/Applications/MxTube.app',
  '/Applications/RockApp.app',
  '/Applications/SBSettings.app',
  '/Applications/WinterBoard.app',
  '/Applications/blackra1n.app',
  '/Library/MobileSubstrate/MobileSubstrate.dylib',
  '/bin/bash',
  '/usr/sbin/sshd',
  '/etc/apt'
];

const SUSPICIOUS_PATHS_ANDROID = [
  '/system/app/Superuser.apk',
  '/sbin/su',
  '/system/bin/su',
  '/system/xbin/su',
  '/data/local/xbin/su',
  '/data/local/bin/su',
  '/system/sd/xbin/su',
  '/system/bin/failsafe/su',
  '/data/local/su',
  '/su/bin/su'
];

export async function isJailbroken(): Promise<boolean> {
  // Simulator/Emulator checks
  if (!Platform.isTV && !Platform.isTesting) {
    // We cannot easily distinguish emulator in standard JS, but often `Application.getInstallReferrerAsync()` helps in Android.
    // For iOS, check paths.
  }

  const pathsToCheck = Platform.OS === 'ios' ? SUSPICIOUS_PATHS_IOS : SUSPICIOUS_PATHS_ANDROID;

  for (const path of pathsToCheck) {
    try {
      const info = await FileSystem.getInfoAsync(path);
      if (info.exists) {
        return true;
      }
    } catch (e) {
      // Ignore errors related to read permissions
    }
  }

  // Fallback for Android: Check if application is debuggable (often true on rooted if repackaged)
  if (Platform.OS === 'android') {
    // Further native checks would be needed for a robust solution.
    // e.g. checking build tags: android.os.Build.TAGS
  }

  return false;
}

/**
 * Middleware wrapper to lock out rooted users from sensitive screens
 */
export async function enforceDeviceIntegrity(): Promise<void> {
  const compromised = await isJailbroken();
  if (compromised) {
    console.warn('SECURITY ALERT: Compromised device detected.');
    // Throwing an error to be caught by an ErrorBoundary or App entry point
    throw new Error('Device Integrity Compromised. The application cannot run on rooted or jailbroken devices.');
  }
}
