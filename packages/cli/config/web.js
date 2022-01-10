const plugins = require('./plugins.config');
const types = {
    values: [
        { type: 'react', desc: '' }, 
        { type: 'vue', desc: '' }, 
        { type: 'native', desc: '' }
    ],
    message: '请选择 web 应用的类型'
};

module.exports = {
    types,
    react: {
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , 
        ]
    },
    vue: {
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , 
        ]
    },
    native: {
        plugins: [
            { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
            , 
        ]
    }
};