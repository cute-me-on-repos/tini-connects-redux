export const isFunction = (value) => typeof value === 'function'
const _toString = Object.prototype.toString
export const isPlainObject = (value) => _toString.call(value) === '[object Object]'
export const getType = (value) => _toString.call(value)
export const getKeys = Object.keys
export const { hasOwnProperty } = Object.prototype
export const warn = (message) => {
  throw new Error(message)
}
export const setProperty = (obj, path, value) => {
  if (Object(obj) !== obj) return obj
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
  path
    .slice(0, -1)
    .reduce(
      (a, c, i) =>
        Object(a[c]) === a[c]
          ? a[c]
          : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {}),
      obj,
    )[path[path.length - 1]] = value
  return obj
}
