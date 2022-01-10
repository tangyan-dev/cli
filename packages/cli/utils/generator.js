const path = require('path');
const chalk = require('chalk');
const { file } = require('@tangyansoft/toolkit-node');
const { isObject, isArray, isFunction, Observer } = require('@tangyansoft/toolkit-common');
const prompts = require('./prompts');
const { removeVersion } = require('./module');
const plugins = require('./plugins');
const debug = require('debug')('ty:generator');

class Generator extends Observer {
    constructor(pm, packageName) {
        super({});
        this.actionStatus = {};
        this.pm = pm;
        this.packageName = this.pm.getPackageName(packageName);
        this.peerPlugins = [];
        this.cwd = this.pm.targetDir;
    }
    isDone = (action) => {
        const actions = Object.keys(this.actionStatus);
        return action ? (this.actionStatus[action] === 'end' || !this.actionStatus[action]) : actions.every(action => this.actionStatus[action] === 'end');
    }

    async addPeerPlugins(arr) {
        this.actionStatus.addPeerPlugins = 'start';
        if (isArray(arr)) {
            let _plugins = arr.map(name => {
                return { name: this.pm.getPackageName(name) };
            });
            this.peerPlugins = _plugins;
            await plugins.call(this, _plugins, Generator);
        } else {
            console.error('addPeerPlugins 必须是数组!');
        }
        this.actionStatus.addPeerPlugins = 'end';
    }

    async prompts(arr, callback) {
        let answers = await prompts.prompts(arr);
        return isFunction(callback) ? callback(answers) : answers;
    }

    async extendPackageJson(fn) {
        this.actionStatus.extendPackageJson = 'start';
        let pkg = fn(this.pm.pkg);
        const types = ['dependencies', 'devDependencies'];
        const list = { [types[0]]: [], [types[1]]: [] };
        const hasDependencies = (name, type = [types[0]]) => {
            let version = (this.pm.pkg[types[0]] || {})[name] || (this.pm.pkg[types[1]] || {})[name];
            if (version) {
                if (version !== pkg[type][name]) {
                    (this.pm.pkg[types[0]] || {})[name] && (type = [types[0]]);
                    list[type].push({ name, versions: [{ name: version, version }, { name: pkg[type][name], version: pkg[type][name] }] });
                    delete (this.pm.pkg[types[0]] || {})[name];
                    delete (this.pm.pkg[types[1]] || {})[name];
                }
                delete pkg[type][name];
            }
        };
        types.forEach(type => {
            Object.keys(pkg[type] || {}).forEach(key => {
                hasDependencies(key, type);
            });
        });
        for (let i = 0; i < types.length; i++) {
            let type = types[i];
            let dependencies = list[type];
            for (let idx = 0; idx < dependencies.length; idx++) {
                let { version } = await prompts.list(dependencies[idx].versions, `${dependencies[idx].name} 有两个版本, 请选择`);
                pkg[type][dependencies[idx].name] = version;
            }
        }
        if (isObject(pkg)) {
            Object.keys(pkg).forEach(key => {
                if (isObject(pkg[key])) {
                    this.pm.pkg[key] = Object.assign(this.pm.pkg[key] || {}, pkg[key]);
                } else {
                    this.pm.pkg[key] = pkg[key];
                }
            });
        }
        this.pm.create(this.pm.pkg);
        this.actionStatus.extendPackageJson = 'end';
    }

    async render(src, callback = (content, callback) => { }) {
        this.actionStatus.render = 'start';
        const filePath = path.resolve(this.pm.targetDir, src);
        const content = await file.read(filePath);
        await callback(content, async result => {
            await file.write(filePath, result);
            this.actionStatus.render = 'end';
        });
    }

    async copy(src = './template', callback = (cb) => { cb(); }) {
        try {
            this.actionStatus.copy = 'start';
            const templateDir = removeVersion(path.join(this.pm.targetDir, 'node_modules', this.packageName, src));
            let hiddenFiles = [];
            let files = file.getFiles(templateDir).filter(file => {
                if (/(\/|\\)_/.test(file)) {
                    hiddenFiles.push(file);
                    return false;
                }
                return true;
            });
            for (let i = 0; i < files.length; i++) {
                let _path = files[i];
                let content = await file.read(_path);
                await file.write(_path.replace(templateDir, this.pm.targetDir), content);
            }
            for (let i = 0; i < hiddenFiles.length; i++) {
                let _path = hiddenFiles[i];
                let content = await file.read(_path);
                await file.write(_path.replace(templateDir, this.pm.targetDir).replace(/(\/|\\)_/, (_, $1) => `${$1}.`), content);
            }
            if (isFunction(callback)) {
                callback(() => {
                    this.actionStatus.copy = 'end';
                });
                return;
            }
            this.actionStatus.copy = 'end';
        } catch (e) {
            console.log(e)
        }
    }

    async onComplete(callback = (cb) => { cb() }) {
        this.on('complete', () => {
            this.actionStatus.complete = 'start';
            callback(() => {
                this.actionStatus.complete = 'end';
            });
        });
    }
}

module.exports = Generator;