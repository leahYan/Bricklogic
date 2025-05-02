import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bricklogic.app',
  appName: 'Bricklogic',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'localhost'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: true,
      spinnerColor: '#FFD700',
    },
  },
  // Ensure proper handling of paths in the app
  cordova: {}
};

export default config;