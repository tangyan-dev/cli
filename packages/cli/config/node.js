const plugins = require('./plugins.config');
const types = {
    values: [
        { type: 'express', desc: '' },
        { type: 'koa', desc: '' },
        { type: 'native', desc: '' }
    ],
    message: '请选择 node 应用的类型'
};

module.exports = {
    types,
    express: {
        message: '',
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , { ...plugins['node-express'], disabled: true }
            , { ...plugins['node-logger'], checked: true }
            , { ...plugins['node-connection-pool'] }
            , { ...plugins['node-mongodb'] }
            , { ...plugins['node-redis'] }
        ]
    },
    loa: {
        message: '',
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , { ...plugins['node-koa'], disabled: true }
            , { ...plugins['node-logger'], checked: true }
            , { ...plugins['node-connection-pool'] }
            , { ...plugins['node-mongodb'] }
            , { ...plugins['node-redis'] }
        ]
    },
    native: {
        message: '',
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , { ...plugins['node-native-service'], disabled: true }
        ]
    }
};