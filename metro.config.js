// Needed for OBJ files to work. Add extra extensions later
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push( "obj",
    "mtl",
    "mp3",
    "JPG",
    "vrx",
    "hdr",
    "gltf",
    "glb",
    "bin",
    "arobject",
    "gif",);

module.exports = defaultConfig;
