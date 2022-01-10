module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            dependencies: {
                'generic-pool': '^3.8.2'
            },
            devDependencies: {}
        }
    });
    api.copy('./template');
};