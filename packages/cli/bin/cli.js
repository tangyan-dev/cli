#!/usr/bin/env node

const program = require('commander');
const minimist = require('minimist');
const chalk = require('chalk');

program
    .version(`@tangyansoft/cli ${require('../package').version}`)
    .usage('<command> [options]');

program
    .command('create <app-name>')
    .description('创建一个项目~')
    .option('--registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    .option('--scope <scope>', 'Use specified npm scope when npm publish (Default @tangyansoft)')
    .option('--git [message]', 'Force git initialization with initial commit message')
    .option('--force', 'Overwrite target directory if it exists')
    .option('--merge', 'Merge target directory if it exists')
    .action((name, options) => {
        require('../lib/create')(name, options);
    });
    
    program
    .command('add [plugin-name]')
    .description('添加插件')
    .option('--scope <scope>', 'Use specified npm scope when npm publish (Default @tangyansoft)')
    .option('--registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    .option('--local <folder>', 'Install plugin from local folder.')
    .action((name, options) => {
        require('../lib/add')(name, options);
    });

program
    .command('upgrade [plugin-name]')
    .description('更新插件')
    .option('--version <version>', 'Skip probing installed plugin, assuming it is upgraded from the designated version')
    .option('--registry <url>', 'Use specified npm registry when installing dependencies')
    .action((name, options) => {
        require('../lib/upgrade')(name, options);
    })

program.on('--help', () => {
    console.log();
    console.log(`  Run ${chalk.cyan(`ty-cli <command> --help`)} for detailed usage of given command.`);
    console.log();
})


program.parse(process.argv);
