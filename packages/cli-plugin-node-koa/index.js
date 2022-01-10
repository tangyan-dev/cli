module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        return {
            scripts: {},
            dependencies: {
                "@tangyansoft/toolkit-common": "^0.1.0",
                "@koa/router": "^10.1.1",
                "koa": "^2.13.4",
                "koa-bodyparser": "^4.3.0",
            },
            devDependencies: {}
        }
    });
    api.copy('./template');
};