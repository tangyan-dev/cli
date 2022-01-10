const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { del, mkdir, shell, file } = require('@tangyansoft/toolkit-node');
const { isString } = require('@tangyansoft/toolkit-common');
const prompts = require('../utils/prompts');
const { createPackageName } = require('../utils/packageManager');
const Install = require('../utils/install');

module.exports = async (name, options) => {
    const cwd = process.cwd();
    const isCurrent = name === '.';
    const projectName = isCurrent ? path.basename(cwd) : name;
    const targetDir = path.resolve(cwd, name);

    if (fs.existsSync(targetDir)) {
        if (options.force) {
            await del(targetDir);
        } else if (!options.merge) {
            if (isCurrent) {
                const { ok } = await inquirer.prompt([
                    {
                        name: 'ok',
                        type: 'confirm',
                        message: '确定在当前目录创建吗?'
                    }
                ]);
                if (!ok) {
                    return;
                }
            } else {
                const { action } = await inquirer.prompt([
                    {
                        name: 'action',
                        type: 'list',
                        message: `目录 ${chalk.yellow(targetDir)} 已经存在. 请选择操作项:`,
                        choices: [
                            { name: '重写(会删除目录)', value: 'overwrite' },
                            { name: '合并(会覆盖同名文件)', value: 'merge' },
                            { name: '取消', value: false }
                        ]
                    }
                ]);
                if (action === 'overwrite') {
                    console.log(`\n正在删除 ${chalk.yellow(targetDir)}...`)
                    await del(targetDir).catch(e => {
                        console.error(e);
                        process.exit(1);
                    });
                }
            }
        }
    }

    let { plugins } = await prompts.preset({ action: 'create' });
    let packageName = createPackageName(name, options.scope);
    const pkg = { name: packageName };
    await new Install(targetDir, pkg, plugins, options).install();

    const { git } = options;
    if (git) {
        await shell('git', ['init'], { cwd: targetDir });
        await shell('git', ['add .'], { cwd: targetDir });
        isString(git) && await shell('git', ['commit -m', git], { cwd: targetDir });
        await file.write(path.join(targetDir, '.gitignore'), '.history\nnode_modules\n');
    }
};