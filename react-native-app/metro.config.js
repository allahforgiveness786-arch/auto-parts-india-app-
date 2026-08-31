const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
    sourceExts: [...sourceExts, 'cjs', 'mjs'],
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
    unstable_enablePackageExports: false,
  },
  watchFolders: [
    path.resolve(__dirname, '../node_modules'),
  ],
};

module.exports = mergeConfig(defaultConfig, config);
