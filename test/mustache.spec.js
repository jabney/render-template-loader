import compiler from './compiler.js'
import helpers from './helpers'

test('Renders a Mustache template', async () => {
  const options = {
    engine: 'mustache',
    locals: {
      title: 'Mustache Template',
      desc: 'A template rendered by Mustache'
    }
  }

  const stats = await compiler('data/source.mustache', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Mustache Template</h1>')
  expect(source).toContain('<h2>A template rendered by Mustache</h2>')
})
