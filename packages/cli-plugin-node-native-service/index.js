module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            dependencies: {},
            devDependencies: {}
        }
    });
    api.copy('./template');
};