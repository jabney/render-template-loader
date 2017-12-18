import compiler from './compiler.js'
import helpers from './helpers'
import path from 'path'

test('Renders a Pug template', async () => {
  const options = {
    engine: 'pug',
    locals: {
      title: 'Pug Template',
      desc: 'A template rendered by Pug'
    }
  }

  const stats = await compiler('data/source.pug', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Pug Template</h1>')
  expect(source).toContain('<h2>A template rendered by Pug</h2>')
})

test('Renders a Pug template with partial', async () => {
  const options = {
    engine: 'pug',
    locals: {
      title: 'Pug Template',
      desc: 'A template rendered by Pug'
    },
    engineOptions: function (info) {
      return { filename: info.filename }
    },
    // engineOptions: {
    //   filename: path.resolve(__dirname, 'data/source-partial.pug')
    // }
  }

  const stats = await compiler('data/source-with-partial.pug', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Pug Template</h1>')
  expect(source).toContain('<h2>A template rendered by Pug</h2>')
})
