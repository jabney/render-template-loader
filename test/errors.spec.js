import compiler from './compiler.js'
import helpers from './helpers'

test('Throws when engine can\'t be loaded', async () => {
  const options = {
    engine: 'not_installed',
    locals: { }
  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source

  expect(output).toContain('throw new Error')
  expect(output).toContain('Multi Template Loader')
  expect(output).toContain('unable to load engine \\"not_installed\\"')
})

test('Throws when render function isn\'t found', async () => {
  const options = {
    engine: 'hjs',
    locals: { }
  }

  const stats = await compiler('data/source.ejs', options)
  const output = stats.toJson().modules[0].source

  expect(output).toContain('throw new Error')
  expect(output).toContain('Multi Template Loader')
  expect(output).toContain('no renderer found for \\"hjs\\"')
})

test('Throws when a render error occurs', async () => {
  const options = {
    engine: 'ejs',
    locals: { }
  }

  const stats = await compiler('data/error.ejs', options)
  const output = stats.toJson().modules[0].source

  expect(output).toContain('throw new Error')
  expect(output).toContain('Multi Template Loader')
  expect(output).toContain('there was a problem rendering the template')
})
