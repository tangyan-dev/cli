const chalk = require('chalk');
const { Pm } = require('./packageManager');
const Generator = require('./generator');
const plugins = require('./plugins');

class Install {
    constructor(targetDir, pkg = {}, plugins, options) {
        this.plugins = plugins;
        this.pkg = pkg;
        this.targetDir = targetDir;
        this.pm = new Pm(targetDir, pkg, options);
        this.peerPlugins = [];
    }
    async install() {
        await this.pm.create();
        await plugins.call(this, this.plugins, Generator);
        console.log(chalk.green(`\ninstall plugin dependencies ...`));
        await this.pm.install();

        console.log(chalk.yellow(`\nremove ${this.plugins.concat(this.peerPlugins).map(item => item.name).join(' ')} ...`));
        await this.pm.remove(Array.from(new Set(this.plugins.concat(this.peerPlugins).map(item => item.name))));
    }
};

module.exports = Install;