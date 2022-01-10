const removeVersion = src => (src || '').replace(/@[^~]?(\d\.?)+/, '');
module.exports = {
    removeVersion,
    loadModule: (name, dir) => require(removeVersion(`${dir}/node_modules/${name}`))
};