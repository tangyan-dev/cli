const chalk = require('chalk');
const { loadModule } = require('./module');
const Blocker = require('./blocker');
module.exports = async function (plugins, Generator) {
    for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const pluginName = this.pm.getPackageName(plugin.name);
        console.log(chalk.green(`\ninstall ${pluginName} ...`));
        await this.pm.install([plugin.local ? plugin.local : `${pluginName + (plugin.version ? `@${plugin.version}` : '')}`, '-D']);
        const generator = new Generator(this.pm, pluginName);
        await loadModule(pluginName, this.pm.targetDir)(generator, this.pm.pkg.name, this.pm.pkg.author);
        await new Blocker().detector(generator.isDone);
        generator.emit('complete');
        await new Blocker().detector(() => generator.isDone.call(this));
        this.peerPlugins = this.peerPlugins.concat(generator.peerPlugins);
    }
};