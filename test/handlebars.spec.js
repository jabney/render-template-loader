import compiler from './compiler.js'
import helpers from './helpers'

test('Renders a Handlebars template', async () => {
  const options = {
    engine: 'handlebars',
    locals: {
      title: 'Handlebars Template',
      desc: 'A template rendered by Handlebars'
    }
  }

  const stats = await compiler('data/source.hbs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Handlebars Template</h1>')
  expect(source).toContain('<h2>A template rendered by Handlebars</h2>')
})
