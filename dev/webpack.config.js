var ejs = require('ejs')
var path = require('path')

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
          engineOptions: {
            // root: path.resolve(__dirname)
            views: [
              path.resolve(__dirname, '.')
            ]
            // filename: path.resolve(__dirname, 'index.ejs')
          },
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
          engineOptions: {
            filename: path.resolve(__dirname, 'index.pug')
          },
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
