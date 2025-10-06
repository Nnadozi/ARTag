// Needed for OBJ files to work
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('obj', 'mtl');

module.exports = defaultConfig;
