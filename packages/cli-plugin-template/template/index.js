module.exports = async (api) => {
    /*
      inquirer prompt Question (https://www.npmjs.com/package/inquirer)
      A question object is a hash containing question related values
    */

    // let { description } = await api.prompts([
    //     {
    //         name: 'description',
    //         type: 'input',
    //         message: '项目描述',
    //     }
    // ]);

    // 配置 package.json 文件
    api.extendPackageJson((pkg) => {
        return {
            // description,
            dependencies: {},
            devDependencies: {}
        }
    });

    // 添加依赖插件
    // api.addPeerPlugins(['cli-plugin-example1', 'cli-plugin-example2@0.1.0']);

    // 拷贝模版
    api.copy('./template');

    // 完成(拷贝模版、更新package.json等)之后还想做点什么~, 记得执行回调
    // api.onComplete((callback) => {
    //     api.render('./index.js', (content, cb) => {
    //         cb(content);
    //         callback();
    //     });
    // });
};