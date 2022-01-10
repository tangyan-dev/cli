module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            dependencies: {
                'mongodb': '^4.2.0'
            },
            devDependencies: {}
        }
    });
    api.copy('./template');
};