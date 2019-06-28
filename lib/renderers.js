const merge = require('./merge')

function ejs(engine, str, locals, options) {
  return engine.render(str, locals, options)
}

function jade(engine, str, locals, options) {
  const opt = merge({}, options, locals)
  return engine.render(str, opt)
}

function handlebars(engine, str, locals, options) {
  const template = engine.compile(str, options)
  return template(locals)
}

function mustache(engine, str, locals, options) {
  return engine.render(str, locals, options)
}

function twig(engine, str, locals, options) {
  const opt = merge({ data: str }, options)

  // This part add all twig files dependencies
  // to make webpack able to watch them
  const registry = [];
  engine.extend((Twig) => {
    const defaultSave = Object.assign(Twig.Templates.save);
    Twig.Templates.save = function customSave(template) {
      registry.push(template.path);
      return defaultSave.call(this, template);
    };
  });
  const template = engine.twig(opt)
  registry.forEach(this.addDependency);

  return template.render(locals)
}

function twing(engine, str, locals, options) {
  const templates = {};
  templates[this.resourcePath] = str;

  const loaderResource = new engine.TwingLoaderArray(templates);
  const loaderRelative = new engine.TwingLoaderRelativeFilesystem();
  const loaderChain = new engine.TwingLoaderChain([loaderResource, loaderRelative]);
  const tw = new engine.TwingEnvironment(loaderChain, options);

  tw.on('template', (tplName, from) => {
    from = from ? from : {path: ''};
    this.addDependency(path.join(path.dirname(from.path), tplName));
  });

  return tw.render(this.resourcePath, locals)
}

function vash(engine, str, locals, options) {
  const template = engine.compile(str, options)
  return template(locals)
}

module.exports = {
  ejs: ejs,
  handlebars: handlebars,
  jade: jade,
  mustache: mustache,
  pug: jade,
  twig: twig,
  twing: twing,
  vash: vash
}
