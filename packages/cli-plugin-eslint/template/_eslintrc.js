module.exports = {
    {
        'root': true,
        'env': {
          'node': true,
          'browser': true,
          'es6': true
        },
        'parserOptions': {
          'ecmaVersion': 12,
          'sourceType': 'module'
        },
        'plugins': [],
        'extends': [
          'eslint:recommended',
          'plugin:prettier/recommended',
        ],
        'globals': {},
        'rules': {
          'prettier/prettier': 'error'
        },
        'overrides': [{
          'files': ['*-test.js'],
          'excludedFiles': '',
          'rules': {}
        }]
      }
};

/*
https://cn.eslint.org

https://github.com/prettier/eslint-plugin-prettier

 eslint-plugin-prettier 插件会调用prettier对你的代码风格进行检查，先使用prettier对代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被prettier进行标记。
 在rules中添加，"prettier/prettier": "error"，表示被prettier标记的地方抛出错误信息。
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}

借助ESLint的autofix功能，在保存代码的时候，自动将抛出error的地方进行fix。
修改webpack的配置，在启动webpack-dev-server的时候，每次保存代码同时自动对代码进行格式化。
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
          fix: true
        }
      }
    ]
}

npm i -D eslint-config-prettier
https://github.com/prettier/eslint-config-prettier#special-rules
通过使用eslint-config-prettier配置，能够关闭一些不必要的或者是与prettier冲突的lint选项。这样我们就不会看到一些error同时出现两次。使用的时候需要确保这个配置在extends的最后一项。

//.eslintrc.js
{
  extends: [
    'standard', //使用standard做代码规范
    "prettier",
  ],
}
同时使用了上述的两种配置，可以简化成如下配置:
//.eslintrc.js
{
  "extends": ["plugin:prettier/recommended"]
}
*/