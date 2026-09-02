const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  watchFolders: [
    path.resolve(__dirname, '..'),
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../node_modules'),
    ],
    assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'],
    sourceExts: [...sourceExts, 'cjs', 'mjs'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

