const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withDependencyTree(config) {
    return withAppBuildGradle(config, (config) => {
        config.modResults.contents += `
task printDependencies {
    doLast {
        configurations.each { config ->
            println "Configuration: \${config.name}"
            config.resolvedConfiguration.resolvedArtifacts.each { artifact ->
                println "  \${artifact.moduleVersion.id} (\${artifact.file})"
            }
        }
    }
}
        `;
        return config;
    });
};