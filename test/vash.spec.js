import compiler from './compiler.js'
import helpers from './helpers'

test('Renders an Vash template', async () => {
  const options = {
    engine: 'vash',
    locals: {
      title: 'Vash Template',
      desc: 'A template rendered by Vash'
    }
  }

  const stats = await compiler('data/source.vash', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Vash Template</h1>')
  expect(source).toContain('<h2>A template rendered by Vash</h2>')
})
