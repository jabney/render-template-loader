'use strict'

var webpack = require('webpack')
var loaderUtils = require('loader-utils')
var renderers = require('./lib/renderers')

var NAME = 'Render Template Loader'

/**
 * @typedef {Object} LoaderOptions
 * @property {string} engine
 * @property {Object} [engineOptions]
 * @property {Object} [locals]
 * @property {(engine: any, info: Info) => void} [init]
 *
 * @typedef {Object} Info
 * @property {string} filename
 */

/**
 * Return the locals object.
 *
 * @this {webpack.loader.LoaderContext}
 * @param {LoaderOptions} options
 */
function getLocals(options) {
  const locals = options.locals

  if (typeof locals === 'function') {
    return locals.call(this) || {}
  }

  return locals || {}
}

/**
 * The Render Template Loader
 *
 * Render via supported template engines or a custom template renderer.
 *
 * @this {webpack.loader.LoaderContext}
 * @param {string} source
 * @returns {string}
 */
function renderTemplateLoader(source) {
  // Get the loader options object.
  const options = getOptions(this)
  // Get the template locals.
  const locals = getLocals.call(this, options)
  // Create info object of the filename of the resource being loaded.
  const info = { filename: this.resourcePath }
  // Get the engine options to be passed to the engine.
  const engineOptions = getEngineOptions.call(this, options.engineOptions, info)
  // Get the template renderer
  const renderer = getRenderer.call(this, options.engine)

  // Call options.init.
  init.call(this, renderer.engine, info, options)
  // Render the template
  const result = render.call(this, renderer, source, locals, engineOptions)
  // Assign the tempate to module.exports.
  return 'module.exports = ' + JSON.stringify(result)
}

/**
 * @this {webpack.loader.LoaderContext}
 * @param {any} engine
 * @param {Info} info
 * @param {LoaderOptions} options
 */
function init(engine, info, options) {
  if (typeof options.init === 'function') {
    options.init.call(this, engine, info)
  }
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
 *
 * @this {webpack.loader.LoaderContext}
 * @param {Object|((info: any) => Object)} engineOptions
 * @param {any} info
 */
function getEngineOptions(engineOptions, info) {
  if (typeof engineOptions === 'function') {
    return engineOptions.call(this, info)
  }
  return engineOptions || {}
}

/**
 * @typedef {Object} Renderer
 * @property {any} engine
 * @property {(e: any, s: string, l: any, o: any) => string} render
 *
 * @this {webpack.loader.LoaderContext}
 * @param {string|((s: string, l: any, o: any) => string)} eng
 * @returns {Renderer}
 */
function getRenderer(eng) {
  let engine = null;

  if (!eng) {
    throw new Error(
      NAME + ': option "engine" must be a non-zero-length string or a function')
  }

  if (typeof eng === 'function') {
    return {
      engine: engine,
      render: customRenderFn.call(this, eng)
    }
  }

  try {
    engine = require(eng)
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
 * @this {webpack.loader.LoaderContext}
 * @param {(s: string, l: any, o: any) => string} renderFn
 * @returns {(e: any, t: string, l: any, o: any) => string}
 */
function customRenderFn(renderFn) {
  // The loader context.
  const _this = this

  return function (engine, template, locals, options) {
    return renderFn.call(_this, template, locals, options)
  }
}

/**
 * Render a string using a template engine
 *
 * @this {webpack.loader.LoaderContext}
 * @param {any} engine
 * @param {string} str
 * @param {Object} locals
 * @returns {string}
 */
function render(engine, str, locals, engineOptions) {
  let output = null;
  try {
    output = engine.render.call(this, engine.engine, str, locals, engineOptions)
  } catch(e) {
    throw new Error(
      NAME + ': there was a problem rendering the template:\n' + e)
  }
  return output
}

module.exports = renderTemplateLoader
