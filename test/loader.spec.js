import fs from 'fs'
import path from 'path'
import compiler from './compiler.js'
import helpers from './helpers'
import ejs from 'ejs'

test('Renders a custom template (regex)', async () => {
  const options = {
    engine: function (template, locals) {
      return template.replace(/#\{(.+?)\}/g, function (match, p1) {
        return locals[p1]
      })
    },
    locals: {
      title: 'Custom Template',
      desc: 'A template rendered by a custom function'
    }
  }

  const stats = await compiler('data/custom.txt', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Custom Template</h1>')
  expect(source).toContain('<h2>A template rendered by a custom function</h2>')
})

test('Renders a custom template (ejs)', async () => {
  const options = {
    engine: function (template, locals, options) {
      return ejs.render(template, locals, options)
    },
    locals: {
      title: 'Custom Template',
      desc: 'A template rendered by a custom function'
    }
  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Custom Template</h1>')
  expect(source).toContain('<h2>A template rendered by a custom function</h2>')
})

test('Allows options.locals to be a function', async () => {
  const options = {
    engine: function (template, locals, options) {
      return ejs.render(template, locals, options)
    },
    locals: function () {
      return {
        title: 'Locals as a Function',
        desc: 'The locals option can be an object or function'
      }
    }

  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Locals as a Function</h1>')
  expect(source).toContain('<h2>The locals option can be an object or function</h2>')
})

test('options.locals can access the loader context', async () => {
  const options = {
    engine: function (template, locals, options) {
      return ejs.render(template, locals, options)
    },
    locals: function () {
      const file = path.join(__dirname, './data/loader.json')
      this.addDependency(file)
      const buffer = fs.readFileSync(file)
      return JSON.parse(buffer.toString())
    }
  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Locals as a Function with addDependency</h1>')
  expect(source).toContain('<h2>The locals function can use the loader context</h2>')
})
