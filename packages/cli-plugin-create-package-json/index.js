module.exports = async (api, pkgName, pkgAuthor) => {
    let { name, description, author, private } = await api.prompts([
        {
            name: 'name',
            type: 'input',
            message: '项目名称',
            validate(answer) {
                return !!answer
            },
            default: pkgName,
        },
        {
            name: 'author',
            type: 'input',
            message: '项目作者',
            default: pkgAuthor,
        },
        {
            name: 'description',
            type: 'input',
            message: '项目描述',
        },
        {
            name: 'private',
            type: 'confirm',
            message: '是私有项目吗?',
        }
    ]);
    api.extendPackageJson((pkg) => {
        if (!private) {
            delete pkg.private;
        }
        return {
            name,
            author,
            description
        }
    });
};