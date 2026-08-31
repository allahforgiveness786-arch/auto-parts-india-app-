import 'react-native-gesture-handler';
import * as RNScreens from 'react-native-screens';

// Polyfill compatibilityFlags for react-navigation 7 compatibility with react-native-screens
if (RNScreens) {
  if (!RNScreens.compatibilityFlags || typeof RNScreens.compatibilityFlags !== 'object') {
    const flags = {
      usesNewAndroidHeaderHeightImplementation: false,
      isNewBackTitleImplementation: true,
      usesHeaderFlexboxImplementation: true,
      usesStableTabsApi: true,
    };
    try {
      RNScreens.compatibilityFlags = flags;
    } catch (_) {}
    try {
      global.compatibilityFlags = flags;
    } catch (_) {}
  }
  if (typeof RNScreens.enableScreens === 'function') {
    RNScreens.enableScreens(true);
  }
}

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './package.json';

// Ignore non-fatal development logs in release build
LogBox.ignoreAllLogs(true);

// Safely register FCM background message handler if native module is ready
try {
  const firebaseModule = require('@react-native-firebase/app');
  const firebase = firebaseModule?.default || firebaseModule;
  if (firebase && Array.isArray(firebase.apps) && firebase.apps.length > 0) {
    const messagingModule = require('@react-native-firebase/messaging');
    const messaging = typeof messagingModule === 'function' ? messagingModule : messagingModule?.default;
    if (typeof messaging === 'function') {
      try {
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
          console.log('[FCM] Background message received:', remoteMessage?.messageId);
          try {
            const notifee = require('@notifee/react-native').default;
            const AndroidImportance = require('@notifee/react-native').AndroidImportance;
            const title = remoteMessage.notification?.title || remoteMessage.data?.title || 'Auto Parts India';
            const body = remoteMessage.notification?.body || remoteMessage.data?.body || 'New background notification';
            
            await notifee.displayNotification({
              title,
              body,
              data: remoteMessage.data,
              android: {
                channelId: 'default',
                importance: AndroidImportance.HIGH,
                pressAction: { id: 'default' },
              },
            });
          } catch (e) {
             console.warn('[FCM] notifee background error', e);
          }
        });
        
        try {
          const notifee = require('@notifee/react-native').default;
          notifee.onBackgroundEvent(async ({ type, detail }) => {
            // Background press is handled when the app opens natively, 
            // but we must register the handler so it doesn't crash
            console.log('[Notifee] Background event', type);
          });
        } catch (e) {}
      } catch (_) {}
    }
  }
} catch (_) {
  // Graceful fallback
}

// Register with all possible identifiers to guarantee match with Android Native MainActivity
AppRegistry.registerComponent('AutoPartsIndia', () => App);
AppRegistry.registerComponent('auto-parts-india', () => App);
if (appName && appName !== 'AutoPartsIndia' && appName !== 'auto-parts-india') {
  AppRegistry.registerComponent(appName, () => App);
}
