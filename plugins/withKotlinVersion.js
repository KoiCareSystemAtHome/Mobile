const { withGradleProperties } = require('@expo/config-plugins');

module.exports = function withKotlinVersion(config) {
    return withGradleProperties(config, (config) => {
        // Check if the property already exists
        const existingKotlinVersion = config.modResults.find(
            (item) => item.type === 'property' && item.key === 'org.jetbrains.kotlin.version'
        );

        if (existingKotlinVersion) {
            console.log(`Existing Kotlin version found: ${existingKotlinVersion.value}`);
        } else {
            console.log('No existing Kotlin version found, setting to 1.9.25');
        }

        // Set the Kotlin version
        config.modResults.push({
            type: 'property',
            key: 'org.jetbrains.kotlin.version',
            value: '1.9.25',
        });

        return config;
    });
};