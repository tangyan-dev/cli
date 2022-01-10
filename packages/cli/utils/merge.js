const { isPlainObject, isArray } = require('@tangyansoft/toolkit-node');

const copy = data => {
    let result = null;
    if (isPlainObject(data)) {
        result = {};
        Object.keys(data).forEach(key => {
            result[key] = copy(data[key]);
        });
    } else if (isArray(data)) {
        result = [];
        data.forEach(item => {
            result.push(copy(item));
        });
    } else {
        result = data;
    }
    return result;
};

module.exports = (a, b) => {
    let result = copy(a);
    let conflict = {};
    const merge = (a, b) => {
        let result = a;
        if (isPlainObject(a) && isPlainObject(b)) {
            Object.keys(b).forEach(key => {

            });
        }
        return result;
    };
    merge(a, b, conflict);
};

export const extend = function extend(t, b) {
    let a = null;
    if (isObject(t) && isObject(b)) {
        a = t;
        Object.keys(b).forEach((key) => {
            if (isObject(a[key]) && isObject(b[key])) {
                extend(a[key], b[key]);
            } else if (Array.isArray(b[key])) {
                a[key] = copy(b[key]);
            } else {
                if (isObject(b[key])) {
                    a[key] = extend({}, b[key]);
                } else {
                    a[key] = b[key];
                }
            }
        });
    } else if (isArray(b)) {
        a = copy(b);
    } else {
        a = b;
    }
    return a;
};