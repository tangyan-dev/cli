module.exports = {
    plugins: [],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {},
                useBuiltIns: 'usage',
                corejs: '3',
            },
        ],
    ],
};