// import compiler from './compiler.js'
// import helpers from './helpers'

// test('Replaces template strings with values', async () => {
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

// test('Replaces template strings with values in stages', async () => {
//   const options = {
//     stages: [{
//       regex: /#\{(.+?)\}/g,
//       value: (match) => {
//         const vars = ['', 'glitter', 'lost', 'wither', 'frost']
//         return vars[match[1]] || match[0]
//       }
//     },
//     {
//       regex: /#\{(.+?)\}/g,
//       value: (match) => {
//         const vars = ['', '', '', '', '', 'woken', 'spring', 'broken', 'king']
//         return vars[match[1]] || match[0]
//       }
//     }]
//   }

//   const stats = await compiler('data/return.txt', options)
//   const output = stats.toJson().modules[0].source
//   const source = helpers.value(output)

//   expect(source).toContain('All that is gold does not glitter,')
//   expect(source).toContain('Not all those who wander are lost;')
//   expect(source).toContain('The old that is strong does not wither,')
//   expect(source).toContain('Deep roots are not reached by the frost.')
//   expect(source).toContain('From the ashes a fire shall be woken,')
//   expect(source).toContain('A light from the shadows shall spring;')
//   expect(source).toContain('Renewed shall be blade that was broken,')
//   expect(source).toContain('The crownless again shall be king.')
//   expect(source).not.toMatch(/#\{.+?\}/)
// })
