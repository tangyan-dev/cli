const web = require('./web');
const node = require('./node');
const lib = require('./lib');
const mini_program = require('./mini_program');
const plugin = require('./plugin');

const types = {
    values: [
        { type: 'web', desc: 'web应用' },
        { type: 'node', desc: 'node应用' },
        { type: 'lib', desc: '组件库' },
        { type: 'mini_program', desc: '小程序' },
        { type: 'plugin', desc: '脚手架插件' }
    ],
    message: '请选择应用类型'
};


module.exports = {
    types,
    web, node, lib, mini_program, plugin
};