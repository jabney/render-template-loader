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
          // engine: function (str, locals, options) {
          //   return ejs.render(str, locals, options)
          // },
          engine: 'ejs',
          // engineOptions: {
          //   views: [ path.resolve(__dirname, '.') ]
          // },
          engineOptions: function (info) {
            return { filename: info.filename }
          },
          locals: {
            title: 'Render Template Loader (ejs)'
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
          // engineOptions: {
          //   filename: path.resolve(__dirname, 'index.pug')
          // },
          engineOptions: function (info) {
            return { filename: info.filename }
          },
          locals: {
            title: 'Render Template Loader (pug)'
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
            title: 'Render Template Loader (mustache)'
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
          init: function (engine, info) {
            engine.registerPartial('thePartial', '{{title}}')
          },
          engineOptions: {},
          locals: {
            title: 'Render Template Loader (handlebars)'
          }
        }
      }
    }]
  }
}
