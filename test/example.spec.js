// import compiler from './compiler.js'
// import helpers from './helpers'

// test('Example 1: simple staged replace', async () => {
//   const options = {
//     stages: [{
//       regex: 'THE_DATE',
//       flags: '',
//       value: new Date().toDateString(),
//     },
//     {
//       regex: 'THE_TIME',
//       flags: '',
//       value: new Date().toTimeString(),
//     }]
//   }

//   const stats = await compiler('data/example1.txt', options)
//   const output = stats.toJson().modules[0].source
//   const source = helpers.value(output)

//   expect(source).toMatch(/Today\'s date is \w{3} \w{3} \d{2} \d{4}/)
//   expect(source).toMatch(/The time is \d{2}:\d{2}:\d{2} GMT(?:\+|-)\d{4} \(\w{3}\)/)
// })

// test('Example 2: replace equation with summary', async () => {
//   const options = {
//     regex: /(\w) = (\d+)(\w) \+ (\d+)/,
//     flags: '',
//     value: 'variables: $1, $3\nconstants: $2, $4',
//   }

//   const stats = await compiler('data/example2.txt', options)
//   const output = stats.toJson().modules[0].source
//   const source = helpers.value(output)

//   expect(source).toEqual('variables: y, x\nconstants: 2, 3')
// })

// test('Example 3: render variables to template', async () => {
//   const options = {
//     regex: /#\{(.+?)\}/g,
//     value: (match) => {
//       const context = {
//         date: new Date().toDateString(),
//         time: new Date().toTimeString()
//       }
//       return context[match[1]]
//     }
//   }

//   const stats = await compiler('data/template.txt', options)
//   const output = stats.toJson().modules[0].source
//   const source = helpers.value(output)

//   expect(source).toMatch(/Today\'s date is \w{3} \w{3} \d{2} \d{4}/)
//   expect(source).toMatch(/The time is \d{2}:\d{2}:\d{2} GMT(?:\+|-)\d{4} \(\w{3}\)/)
// })
