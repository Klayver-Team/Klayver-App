// // Learn more https://docs.expo.io/guides/customizing-metro
  const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname, {
//   // [Web-only]: Enables CSS support in Metro.
//   isCSSEnabled: true,
// //   {
// //     babelTransformerPath: require.resolve("react-native-svg-transformer"),
// //   },
// //  {
// //   assetExts: resolver.assetExts.filter(ext => ext !== "svg"),
// //   sourceExts: [...sourceExts, "svg"]    
// // }

// });

//  module.exports = config;
module.exports = (() => {
  const config = getDefaultConfig(__dirname)

  const {transformer, resolver} = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext != "svg"),
    sourceExts: [...resolver.sourceExts,"svg"]
  };

  config.isCSSEnabled = true;


  return config
})();


