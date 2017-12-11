import compiler from './compiler.js'
import helpers from './helpers'
import ejs from 'ejs'

test('Renders a custom template (regex)', async () => {
  const options = {
    engine: function (str, locals) {
      return str.replace(/#\{(.+?)\}/g, function (match, p1) {
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
    engine: function (str, locals, options) {
      return ejs.render(str, locals, options)
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
