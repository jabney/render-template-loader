import path from 'path'
import webpack from 'webpack'
import memoryfs from 'memory-fs'

export default (fixture, options) => {
  const extension = fixture.split('.').reverse()[0]
  const test = new RegExp(`\\.${extension}$`)

  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: test,
        use: {
          loader: path.resolve(__dirname, '../index.js'),
          options: options
        }
      }]
    }
  })

  compiler.outputFileSystem = new memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      // if (err) reject(err)
      resolve(stats)
    })
  })
}
