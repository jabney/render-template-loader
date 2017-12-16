Render templates with Webpack using one of any number of templating engines.

Under development. See [unit tests](https://github.com/jabney/render-template-loader/tree/master/test) and [webpack.config.js](https://github.com/jabney/render-template-loader/blob/master/dev/webpack.config.js) for usage examples.

See [The Demo Project](https://github.com/jabney/render-template-loader-demo) for an example webpack project setup that uses `render-template-loader` with `ejs` to render `index.html`, and in the same config renders `pug` and `handlebars` templates as well.

Built-in support for and tested with: `ejs`, `handlebars`, `jade`, `mustache`, `pug`, `twig`, and `vash`.

Partials support tested with `ejs`, `handlebars`, `jade`, and `pug`.

Custom engine support included; see [loader.spec.js](https://github.com/jabney/render-template-loader/blob/master/test/loader.spec.js)
