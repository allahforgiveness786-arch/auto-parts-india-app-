const plugin = require('@react-native/community-cli-plugin');

module.exports = {
  commands: [plugin.bundleCommand, plugin.startCommand],
  project: {
    ios: {},
    android: {
      packageName: 'com.autopartsindia',
      sourceDir: './android',
      appName: 'app',
    },
  },
};
