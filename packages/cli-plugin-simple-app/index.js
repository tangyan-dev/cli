module.exports = (api) => {
    api.extendPackageJson((pkg) => {
        delete pkg.private;
        return {
            scripts: {
                'dev': 'webpack serve',
                'build': 'rm -rf dist && webpack -c webpack.prod.js'
            },
            dependencies: {},
            devDependencies: {
                '@babel/cli': '^7.15.7',
                '@babel/core': '^7.15.8',
                '@babel/preset-env': '^7.15.8',
                'babel-loader': '^8.2.3',
                'core-js': '^3.20.0',
                'css-loader': '^6.4.0',
                'html-webpack-plugin': '^5.4.0',
                'node-sass': '^6.0.1',
                'sass': '^1.43.3',
                'sass-loader': '^12.2.0',
                'style-loader': '^3.3.1',
                'terser-webpack-plugin': '^5.2.4',
                'webpack': '^5.59.1',
                'webpack-cli': '^4.9.1',
                'webpack-dev-server': '^3.11.2'
            }
        }
    });
    api.copy('./template');
};