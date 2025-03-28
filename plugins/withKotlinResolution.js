const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withKotlinResolution(config) {
    return withAppBuildGradle(config, (config) => {
        config.modResults.contents += `
buildscript {
    configurations.all {
        resolutionStrategy {
            force 'org.jetbrains.kotlin:kotlin-stdlib:1.9.25'
            force 'org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.9.25'
            force 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.25'
        }
    }
}
        `;
        return config;
    });
};