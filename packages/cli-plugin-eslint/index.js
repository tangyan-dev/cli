module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            scripts: {
                format: "onchange 'src/**/*.js' -- prettier --write {{changed}}"
            },
            dependencies: {},
            devDependencies: {
                'eslint': '^8.3.0',
                'eslint-config-prettier': '^8.3.0',
                'eslint-plugin-prettier': '^4.0.0',
                'prettier': '^2.4.1',
            }
        }
    });
    api.copy('./template');
};