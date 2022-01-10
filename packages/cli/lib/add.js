const path = require('path');
const { file } = require('@tangyansoft/toolkit-node');
const { to } = require('@tangyansoft/toolkit-common');
const prompts = require('../utils/prompts');
const { createPackageName } = require('../utils/packageManager');
const Install = require('../utils/install');

module.exports = async (name, options) => {
    const targetDir = process.cwd();
    let packageName = null;
    let scope = null;
    let plugins = [];
    let localDir = null;
    name && (packageName = createPackageName(name, options.scope));

    if (options.local) {
        await Promise.all([options.local].concat(name ? [path.join(options.local, name)] : []).map(async dir => {
            try {
                let pkg = await file.read(path.join(dir, 'package.json'));
                packageName = JSON.parse(pkg).name;
                localDir = dir;
            } catch (err) { }
            return null;
        }));
    }

    packageName && plugins.push({
        name: packageName,
        local: localDir
    });

    if (!plugins.length) {
        let answer = await prompts.preset({ action: 'add' });
        plugins = answer.plugins;
    }
    let [, pkg] = await to(file.read(path.join(targetDir, 'package.json')));
    await new Install(targetDir, JSON.parse(pkg), plugins, options).install();
};