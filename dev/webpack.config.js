
module.exports = {
  entry: './dev/index.js',
  output: {
    filename: './tmp/main.bundle.js'
  },
  module: {
    rules: [{
      test: /\.svg$/,
      use: {
        loader: './index.js',
        options: {

        }
      }
    }]
  }
}
