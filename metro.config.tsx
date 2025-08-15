const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-maps') {
    return context.resolveRequest(context, path.resolve(__dirname, './web-mocks/MapView.js'), platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;