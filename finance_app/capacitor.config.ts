import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sentaient.financeapp',
  appName: 'Finance App',
  webDir: 'public',
  server: {
    url: 'https://finance.sentaient.com',
    cleartext: true
  }
};

export default config;
