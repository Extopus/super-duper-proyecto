import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'coolApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: 'ic_launcher', // Icono pequeño para las notificaciones
      iconColor: '#488AFF',    // Color del icono en formato HEX
    },
  },
};

export default config;
