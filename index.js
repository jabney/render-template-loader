'use strict'

var loaderUtils = require('loader-utils')

var renderers = require('./lib/renderers')

var NAME = 'Multi Template Loader'

/**
 * @typedef {Object} LoaderOptions
 * @property {string} engine
 * @property {Object} [engineOptions]
 * @property {Object} [locals]
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
  var locals = options.locals || {}
  var engineOptions = options.engineOptions || {}
  var renderer = getRenderer(options.engine)
  var result = render(renderer, source, locals, engineOptions)
  return 'module.exports = ' + JSON.stringify(result)
}

/**
 * Return the options object.
 *
 * @param {any} context
 * @returns {LoaderOptions}
 */
function getOptions(context) {
  // @ts-ignore
  return loaderUtils.getOptions(context)
}

/**
 * @typedef {Object} Renderer
 * @property {any} engine
 * @property {(e: any, s: string, l: any, o: any) => string} render
 * Return a template engine
 *
 * @param {string|((s: string, l: any, o: any) => string)} eng
 * @returns {Renderer}
 */
function getRenderer(eng) {
  if (!eng) {
    throw new Error(
      NAME + ': option "engine" must be a non-zero-length string or a function')
  }

  if (typeof eng === 'function') {
    return {
      engine: null,
      render: customRenderFn(eng)
    }
  }

  try {
    var engine = require(eng)
  } catch (e) {
    throw new Error(NAME + ': unable to load engine "' + eng + '".'
      + ' Make sure the engine is installed, e.g., "npm install ' + eng + '"')
  }

  if (!renderers[eng]) {
    throw new Error(NAME + ': no renderer found for "' + eng + '".'
      + ' You may need to create a custom engine definition')
  }

  return {
    engine: engine,
    render: renderers[eng]
  }
}

/**
 * Create a custom renderer from a custom render function.
 *
 * @param {(s: string, l: any, o: any) => string} renderFn
 * @returns {(e: any, s: string, l: any, o: any) => string}
 */
function customRenderFn(renderFn) {
  return function (engine, str, locals, options) {
    return renderFn(str, locals, options)
  }
}

/**
 * Render a string using a template engine
 *
 * @param {any} engine
 * @param {string} str
 * @param {Object} locals
 * @returns {string}
 */
function render(engine, str, locals, engineOptions) {
  try {
    var output = engine.render(engine.engine, str, locals, engineOptions)
  } catch(e) {
    throw new Error(
      NAME + ': there was a problem rendering the template:\n' + e)
  }
  return output
}

module.exports = multiTemplateLoader
