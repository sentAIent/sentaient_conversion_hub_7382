import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentaient.liquid',
  appName: 'Liquid',
  webDir: 'public',
  server: {
    url: 'https://sentaient.com/liquid',
    cleartext: false,
    allowNavigation: [
      'sentaient.com',
      '*.sentaient.com',
      '*.supabase.co',
      '*.plaid.com',
      '*.stripe.com'
    ]
  },
  plugins: {
    BiometricAuth: {
      androidBiometrics: {
        title: 'Liquid Biometric Authentication',
        subtitle: 'Authenticate using fingerprint or facial recognition',
        description: 'Verify identity to access enterprise financial ledger and crypto vaults',
        negativeButtonText: 'Cancel'
      },
      iosBiometrics: {
        faceIdUsageDescription: 'Liquid uses Face ID to protect financial records and authorize token minting operations.'
      }
    }
  }
};

export default config;
