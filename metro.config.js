const { getDefaultConfig } = require('@expo/metro-config');

// eslint-disable-next-line no-undef
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
