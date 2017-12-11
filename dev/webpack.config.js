var ejs = require('ejs')

module.exports = {
  entry: './dev/index.js',
  output: {
    filename: './tmp/main.bundle.js'
  },
  module: {
    rules: [{
      test: /\/index.ejs$/,
      use: {
        loader: './index.js',
        options: {
          engine: function (str, locals, options) {
            return ejs.render(str, locals, options)
          },
          engineOptions: {},
          locals: {
            title: 'Multi Template Loader'
          }
        }
      }
    },
    {
      test: /\/index.pug$/,
      use: {
        loader: './index.js',
        options: {
          engine: 'pug',
          engineOptions: {},
          locals: {
            title: 'Multi Template Loader'
          }
        }
      }
    },
    {
      test: /\/index.mustache$/,
      use: {
        loader: './index.js',
        options: {
          engine: 'mustache',
          engineOptions: {},
          locals: {
            title: 'Multi Template Loader'
          }
        }
      }
    },
    {
      test: /\/index.hbs$/,
      use: {
        loader: './index.js',
        options: {
          engine: 'handlebars',
          engineOptions: {},
          locals: {
            title: 'Multi Template Loader'
          }
        }
      }
    }]
  }
}
