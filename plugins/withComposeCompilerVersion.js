const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withComposeCompilerVersion(config) {
    return withAppBuildGradle(config, (config) => {
        // Add or override the Compose Compiler dependency
        const composeCompilerDependency = 'implementation "androidx.compose.compiler:compiler:1.5.14"';
        const buildGradle = config.modResults.contents;

        if (!buildGradle.includes('androidx.compose.compiler:compiler')) {
            // If the dependency isn't present, add it
            config.modResults.contents = buildGradle.replace(
                /dependencies\s*{/,
                `dependencies {\n    ${composeCompilerDependency}`
            );
        } else {
            // If the dependency exists, replace the version
            config.modResults.contents = buildGradle.replace(
                /implementation "androidx.compose.compiler:compiler:[^"]*"/,
                composeCompilerDependency
            );
        }
        return config;
    });
};