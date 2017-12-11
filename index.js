'use strict'

var loaderUtils = require('loader-utils')

var NAME = 'Multi Template Loader'

/**
 * @typedef {Object} LoaderOptions
 */

/**
 * The Regex Replace Loader.
 *
 * Replace values from the source via a regular expression.
 *
 * @param {string} source
 * @returns {string}
 */
function multiTemplateLoader(source) {
  var options = getOptions(this)

  var result = source

  return 'module.exports = ' + JSON.stringify(result)
}

/**
 * Return the options object.
 *
 * @param {LoaderContext} context
 * @returns {LoaderOptions}
 */
function getOptions(context) {
  return loaderUtils.getOptions(context)
}

/**
 * Return the type of an object as a string.
 *
 * @param {any} object
 * @returns {string}
 */
function typeOf(object) {
  return Object.prototype.toString.call(object).slice(8, -1)
}

module.exports = multiTemplateLoader
