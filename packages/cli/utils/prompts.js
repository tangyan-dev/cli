const inquirer = require('inquirer');
const preset = require('../config');

module.exports = {
    preset: ({ action }) => new Promise(async resolve => {

        let { type } = await inquirer.prompt({
            name: 'type',
            message: preset.types.message,
            type: 'list',
            choices: preset.types.values.map(({ type, desc }) => {
                let { types } = preset[type]
                let name = types.values.map(({ type }) => type).join(', ');
                return {
                    name: `${desc} ${name ? `(${name})` : ''}`,
                    value: type
                }
            })
        });

        let subType = '';
        if (preset[type].types.values.filter(item => item.type).length) {
            let answer = await inquirer.prompt({
                name: 'subType',
                message: preset[type].types.message,
                type: 'list',
                choices: preset[type].types.values.map(({ type, desc }) => {
                    return {
                        name: `${type}${desc ? ` (${desc})` : ''}`,
                        value: type
                    }
                })
            });
            subType = answer.subType;
        }
        let plugins = subType ? preset[type][subType].plugins : preset[type].plugins;
        let message = subType ? preset[type][subType].message : preset[type].message;
        let answer = await inquirer.prompt({
            name: 'plugins',
            message: message || '请选择需要安装的插件',
            type: 'checkbox',
            choices: plugins.map(item => {
                let _item = {
                    ...item,
                    value: JSON.stringify(item)
                };
                if (action !== 'create') {
                    delete _item.disabled;
                    delete _item.checked;
                }
                return _item;
            })
        });
        if (action === 'create') {
            plugins = plugins.filter(item => !!item.disabled).concat(answer.plugins.map(item => JSON.parse(item)));
        } else {
            plugins = answer.plugins;
        }

        resolve({ type, subType, plugins });
    }),

    list: (choices, msg) => inquirer.prompt({
        name: 'list',
        message: msg,
        type: 'list',
        choices: choices.map(item => {
            let _item = item;
            _item.value = JSON.stringify(item);
            return _item;
        })
    }).then(res => {
        return JSON.parse(res.list);
    }),
    prompts: arr => inquirer.prompt(arr)
};