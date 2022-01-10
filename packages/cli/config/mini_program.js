const plugins = require('./plugins.config');
const types = {
    values: [
        { type: 'taro', desc: '' },
        { type: 'uniapp', desc: '' }
    ],
    message: '请选择构建小程序的类型'
};

module.exports = {
    types,
    uniapp: {
        message: '',
        plugins: [
            {
                name: '',
                version: '',
                desc: '',
                peer: [],
                disabled: true // 必须
            }
            , {
                name: '',
                version: '',
                desc: '',
                checked: true // 必须
            }
        ]
    },
    taro: {
        message: '',
    },
};