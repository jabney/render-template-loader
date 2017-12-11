// import compiler from './compiler.js'
// import helpers from './helpers'

// test('Throws when options.regex isn\'t a RegExp or string', async () => {
//   const options = {
//     regex: null
//   }

//   const stats = await compiler('data/return.txt', options)
//   const output = stats.toJson().modules[0].source
//   expect(output).toContain('throw new Error')
//   expect(output).toContain('Regex Replace Loader')
//   expect(output).toContain(
//     'option \\"regex\\" must be a string or a RegExp object')
// })

// test('Throws when options.value isn\'t a string or function', async () => {
//   const options = {
//     regex: /#\{(.+?)\}/g,
//     value: null
//   }

//   const stats = await compiler('data/return.txt', options)
//   const output = stats.toJson().modules[0].source
//   expect(output).toContain('throw new Error')
//   expect(output).toContain('Regex Replace Loader')
//   expect(output).toContain(
//     'option \\"value\\" must be a string or a function')
// })
