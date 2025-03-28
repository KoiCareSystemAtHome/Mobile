const { withDangerousMod } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

module.exports = function withAndroidPackageName(config) {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      // Modify the React Native config to include the package name
      config.project = config.project || {};
      config.project.android = config.project.android || {};
      config.project.android.packageName = 'com.KoiGuardian.KoiGuardian';
      return config;
    },
  ]);
};