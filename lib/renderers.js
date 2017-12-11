var merge = require('./merge')

function ejs(engine, str, locals, engineOptions) {
  return engine.render(str, locals, engineOptions)
}

function pug(engine, str, locals, engineOptions) {
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

module.exports = {
  ejs: ejs,
  handlebars: handlebars,
  jade: pug,
  'jade-legacy': pug,
  mustache: mustache,
  pug: pug
}
