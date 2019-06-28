import compiler from './compiler.js'
import helpers from './helpers'

test('Renders a Twi(n)g template', async () => {
  debugger;
  const options = {
    engine: 'twing',
    locals: {
      title: 'Twig Template',
      desc: 'A template rendered by Twing'
    }
  }

  const stats = await compiler('data/source.twig', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Twig Template</h1>')
  expect(source).toContain('<h2>A template rendered by Twing</h2>')
})

test('Renders a Twi(n)g template with partial', async () => {
  debugger;
  const options = {
    engine: 'twing',
    locals: {
      title: 'Twig Template',
      desc: 'A template rendered by Twing'
    },
    engineOptions: function (info) {
      return { path: info.filename }
    }
  }

  const stats = await compiler('data/source-with-partials.twig', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Twig Template</h1>')
  expect(source).toContain('<h2>A template rendered by Twing</h2>')
})
