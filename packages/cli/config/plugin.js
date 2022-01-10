const plugins = require('./plugins.config');
const types = {
    values: [{
        type: '',
        desc: ''
    }],
    message: '选择脚手架插件模版'
};

module.exports = {
    types,
    plugins: [
        { ...plugins['create-package-json'], disabled: '创建package.json相关信息' }
        , { ...plugins['plugin-template'], disabled: '模版基础插件' }
        , { ...plugins['readme'], checked: true }
    ]
};