module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            dependencies: {
                "@tangyansoft/toolkit-common": "^0.1.0",
                "winston": "^3.3.3",
                "winston-daily-rotate-file": "^4.5.5"
            },
            devDependencies: {}
        }
    });
    api.copy('./template');
};