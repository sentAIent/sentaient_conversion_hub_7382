import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
// Dynamic native plugin checks for jailbreak and secure storage

export function useSecurityCheck() {
  useEffect(() => {
    const performChecks = async () => {
      if (!Capacitor.isNativePlatform()) return;

      try {
        // 1. Check for Root / Jailbreak
        let JailbreakRootDetection: any = null;
        let SecureStoragePlugin: any = null;
        try {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          JailbreakRootDetection = require('capacitor-jailbreak-root-detection')?.JailbreakRootDetection;
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          SecureStoragePlugin = require('capacitor-secure-storage-plugin')?.SecureStoragePlugin;
        } catch {
          // Native plugins not loaded in web or missing
        }

        if (JailbreakRootDetection) {
          const result = await JailbreakRootDetection.isJailbrokenOrRooted();
          if (result?.isJailbrokenOrRooted) {
            console.error("CRITICAL: Device is rooted or jailbroken. App is locking down.");
            alert("Security Violation: This app cannot run on rooted/jailbroken devices.");
            throw new Error("Security Violation: Rooted Device");
          }
        }

        // 2. Setup Secure Storage
        if (SecureStoragePlugin) {
          await SecureStoragePlugin.set({ key: 'security_audit', value: 'passed' });
          const audit = await SecureStoragePlugin.get({ key: 'security_audit' });
          if (audit?.value !== 'passed') {
            throw new Error("Secure Storage unavailable");
          }
        }
      } catch (err) {
        console.error("Security checks failed", err);
      }
    };

    performChecks();
  }, []);
}
