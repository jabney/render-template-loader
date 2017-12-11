import compiler from './compiler.js'
import helpers from './helpers'

test('Renders a custom template', async () => {
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
