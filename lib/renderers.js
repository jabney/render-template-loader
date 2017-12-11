var merge = require('./merge')

function ejs(engine, str, locals, engineOptions) {
  return engine.render(str, locals, engineOptions)
}

function jade(engine, str, locals, engineOptions) {
  var options = merge({}, engineOptions, locals)
  return engine.render(str, options)
}

function handlebars(engine, str, locals) {
  var template = engine.compile(str)
  return template(locals)
}

function mustache(engine, str, locals) {
  return engine.render(str, locals)
}

function twig(engine, str, locals) {
  var template = engine.twig({ data: str })
  return template.render(locals)
}

function vash(engine, str, locals) {
  var template = engine.compile(str)
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
