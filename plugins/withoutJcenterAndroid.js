const {
  withPlugins,
  withProjectBuildGradle,
} = require('@expo/config-plugins');

const withoutJcenterAndroid = (config, props) => {
  return withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = config.modResults.contents.replace(/\s*\bjcenter\(\)/g, "");
    } else {
      throw new Error("Cannot remove Jcenter because build.gradle is not groovy");
    }
    return config;
  });
};

module.exports = (config, props) =>
  withPlugins(config, [
    [withoutJcenterAndroid, props],
  ]);
