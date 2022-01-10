module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            dependencies: {
                "body-parser": "^1.19.0",
                "cookie-parser": "^1.4.5",
                "express": "^4.17.1"
            },
            devDependencies: {}
        }
    });
    api.copy('./template');
};