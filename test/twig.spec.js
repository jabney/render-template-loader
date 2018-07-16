import compiler from './compiler.js'
import helpers from './helpers'

test('Renders a Twig template', async () => {
  const options = {
    engine: 'twig',
    locals: {
      title: 'Twig Template',
      desc: 'A template rendered by Twig'
    }
  }

  const stats = await compiler('data/source.twig', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Twig Template</h1>')
  expect(source).toContain('<h2>A template rendered by Twig</h2>')
})

test('Renders a Twig template with partial', async () => {
  const options = {
    engine: 'twig',
    locals: {
      title: 'Twig Template',
      desc: 'A template rendered by Twig'
    },
    engineOptions: function (info) {
      return { path: info.filename }
    }
  }

  const stats = await compiler('data/source-with-partials.twig', options)
  const output = stats.toJson().modules[0].source
  const source = helpers.value(output)

  expect(source).toContain('<h1>Twig Template</h1>')
  expect(source).toContain('<h2>A template rendered by Twig</h2>')
})
