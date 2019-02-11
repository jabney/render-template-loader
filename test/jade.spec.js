import compiler from './compiler.js'
import helpers from './helpers'

// Disabled (jade is deprecated and has a vulnerability).
xtest('Renders a Jade template', async () => {
  const options = {
    engine: 'jade',
    locals: {
      title: 'Jade Template',
      desc: 'A template rendered by Jade'
    }
  }

  const stats = await compiler('data/source.jade', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Jade Template</h1>')
  expect(source).toContain('<h2>A template rendered by Jade</h2>')
})

// Disabled (jade is deprecated and has a vulnerability).
xtest('Renders a Jade template with partial', async () => {
  const options = {
    engine: 'jade',
    locals: {
      title: 'Jade Template',
      desc: 'A template rendered by Jade'
    },
    engineOptions: function (info) {
      return { filename: info.filename }
    }
  }

  const stats = await compiler('data/source-with-partial.jade', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Jade Template</h1>')
  expect(source).toContain('<h2>A template rendered by Jade</h2>')
})
