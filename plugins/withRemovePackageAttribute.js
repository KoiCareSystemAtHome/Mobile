const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withRemovePackageAttribute(config) {
    return withAndroidManifest(config, (config) => {
        // Access the AndroidManifest.xml
        const manifest = config.modResults.manifest;

        // Remove the package attribute from the <manifest> tag
        if (manifest.$ && manifest.$['package']) {
            delete manifest.$['package'];
        }

        return config;
    });
};