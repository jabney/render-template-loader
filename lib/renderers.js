var merge = require('./merge')

function ejs(engine, str, locals, options) {
  return engine.render(str, locals, options)
}

function jade(engine, str, locals, options) {
  var opt = merge({}, options, locals)
  return engine.render(str, opt)
}

function handlebars(engine, str, locals, options) {
  var template = engine.compile(str, options)
  return template(locals)
}

function mustache(engine, str, locals, options) {
  return engine.render(str, locals, options)
}

function twig(engine, str, locals, options) {
  var template = engine.twig({ data: str }, options)
  return template.render(locals)
}

function vash(engine, str, locals, options) {
  var template = engine.compile(str, options)
  return template(locals)
}

module.exports = {
  ejs: ejs,
  handlebars: handlebars,
  jade: jade,
  mustache: mustache,
  pug: jade,
  twig: twig,
  vash: vash
}
