declare module '@capacitor/cli' {
  export interface CapacitorConfig {
    appId: string;
    appName: string;
    webDir: string;
    bundledWebRuntime?: boolean;
    server?: {
      url?: string;
      cleartext?: boolean;
      androidScheme?: string;
    };
    plugins?: {
      [key: string]: any;
    };
    android?: {
      path?: string;
    };
    ios?: {
      path?: string;
    };
  }
}