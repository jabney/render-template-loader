
/**
 * Merge any number of objects with the 'dest' object.
 *
 * @param {Object} dest
 * @param {...args}
 * @returns {Object}
 */
function merge(dest) {
  if (dest) {
    Array.prototype.slice.call(arguments, 1).forEach(function(arg) {
      Object.keys(arg).forEach(function(key) {
        dest[key] = arg[key]
      })
    })
  }

  return dest
}

module.exports = merge
