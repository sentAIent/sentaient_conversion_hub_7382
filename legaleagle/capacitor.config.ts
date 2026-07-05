import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.legaleagle.app',
  appName: 'LegalEagle',
  webDir: 'dist',
  plugins: {
    Purchases: {
      // Configuration for RevenueCat if needed
    }
  }
};

export default config;
