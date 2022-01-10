const path = require('path');
const debug = require('debug')('ty:packageManager');
const { file, shell, mkdir } = require('@tangyansoft/toolkit-node');
const { isObject } = require('@tangyansoft/toolkit-common');
const constants = require('../config/constants');
const { removeVersion } = require('./module');

const createPackageName = (name, scope) => {
    scope = scope || constants.SCOPE;
    return /^@/.test(name) ? name : (scope !== 'off' ? `${scope}/` : '') + name;
};

class Pm {
    /**
     * Creates an instance of Pm.
     * @param {string} targetDir 
     * @param {object} pkg
     * @param {*} options
     * @memberof Pm
     */
    constructor(targetDir, pkg, options) {
        this.pkg = Object.assign({
            name: '',
            version: '0.1.0',
            private: true,
            description: '',
            author: 'The TangYan soft Team (https://tangyan.dev)',
            bugs: '',
            homepage: '',
            scripts: {},
            main: 'index.js',
            keywords: [],
            license: 'MIT',
            dependencies: {},
            devDependencies: {}
        }, pkg || {});
        this.scope = options.scope;
        this.registry = /^https?:\/\//.test(options.registry) ? options.registry : null;
        this.targetDir = targetDir;
        !this.pkg.name && (this.pkg.name = path.basename(targetDir));
    }
    async getPkgContent(target = this.targetDir) {
        let pakContent = await file.read(path.join(this.targetDir, 'package.json'));
        return JSON.parse(pakContent);
    }
    getPackageName(name) {
        return createPackageName(name, this.scope);
    }
    async create(pkg = this.pkg) {
        await mkdir(this.targetDir);
        return file.write(`${this.targetDir}/package.json`, JSON.stringify(pkg, null, 4));
    }
    async install(arg = []) {
        if (this.registry) {
            arg = arg.concat([`--registry=${this.registry}`]);
        }
        debug(`install ${arg.join(' ')}`);
        await shell('npm', ['install', ...arg], { cwd: this.targetDir });
        let pkg = await this.getPkgContent();
        this.pkg = pkg;
        return pkg;
    }
    async remove(arg = []) {
        debug(`remove ${arg.join(' ')}`);
        let modules = arg.map(item => removeVersion(item));
        await shell('npm', ['uninstall', ...modules], { cwd: this.targetDir });
        let pkg = await this.getPkgContent();
        this.pkg = pkg;
        return pkg;
    }
};

module.exports = {
    Pm,
    createPackageName
};