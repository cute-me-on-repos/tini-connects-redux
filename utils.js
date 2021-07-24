export const isFunction = (value) => typeof value === 'function';
const _toString = Object.prototype.toString;
export const isPlainObject = (value) => _toString.call(value) === '[object Object]';
export const getType = (value) => _toString.call(value);
export const getKeys = Object.keys;
export const { hasOwnProperty } = Object.prototype;
export const warn = (message) => {
    throw new Error(message);
};
