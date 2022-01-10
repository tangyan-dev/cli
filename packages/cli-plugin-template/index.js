module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            scripts: {},
            dependencies: {},
            devDependencies: {}
        }
    });
    api.copy('./template');
};