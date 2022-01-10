const plugins = require('./plugins.config');
const types = {
    values: [
        { type: 'node', desc: '' }, 
        { type: 'web', desc: '' }, 
        { type: 'common', desc: '' }
    ],
    message: '请选择 library 的类型'
};
module.exports = {
    types,
    node: {
        message: '',
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , 
        ]
    },
    web: {
        message: '',
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , 
        ]
    },
    common: {
        message: '',
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , 
        ]
    }
};