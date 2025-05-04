import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bricklogic.app',
  appName: 'Bricklogic',
  webDir: 'out',
  server: {
    androidScheme: 'https'
    // hostname property removed as it's not supported in this version
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: true,
      spinnerColor: '#FFD700',
    },
  },
  // Removed cordova property as it's not supported in this version
};

export default config;