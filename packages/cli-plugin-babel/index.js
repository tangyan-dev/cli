module.exports = async (api, pkgName, pkgAuthor) => {
    api.extendPackageJson((pkg) => {
        return {
            dependencies: {},
            devDependencies: {
                '@babel/cli': '^7.15.7',
                '@babel/core': '^7.15.8',
                '@babel/preset-env': '^7.15.8',
                'core-js': '^3.20.0'
            }
        }
    });
    api.copy('./template');
};