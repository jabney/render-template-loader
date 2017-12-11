import compiler from './compiler.js'
import helpers from './helpers'

test('Renders an Ejs template', async () => {
  const options = {
    engine: 'ejs',
    locals: {
      title: 'Ejs Template',
      desc: 'A template rendered by Ejs'
    }
  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Ejs Template</h1>')
  expect(source).toContain('<h2>A template rendered by Ejs</h2>')
})
