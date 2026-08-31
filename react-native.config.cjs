const plugin = require('@react-native/community-cli-plugin');
const androidPlatform = require('@react-native-community/cli-platform-android');

module.exports = {
  commands: [plugin.bundleCommand, plugin.startCommand, ...androidPlatform.commands],
  platforms: {
    android: {
      linkConfig: androidPlatform.dependencyConfig,
      projectConfig: androidPlatform.projectConfig,
    },
  },
  project: {
    ios: {},
    android: {
      packageName: 'com.autopartsindia',
      sourceDir: './react-native-app/android',
      appName: 'app',
    },
  },
  assets: ['./react-native-app/src/assets/fonts/'],
};
