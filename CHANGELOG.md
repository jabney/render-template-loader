All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2019-02-11
- Replace 'const' with 'var' for es5 compatibility.

## [1.1.1] - 2019-02-10
- Disable jade specs (jade is deprecated and has a vulnerability).

## [1.1.0] - 2019-02-10
- Allow options.locals to be a function that returns an object.
- Npm audit fix

## [1.0.4] - 2018-10-08
Npm audit fix

## [1.0.3] - 2018-07-16
Update readme to indicate twig partials support.

## [1.0.2] - 2018-07-16
Update dependencies with 'npm audit fix' to address security issues.

## [1.0.1] - 2018-07-16
Fix Twig template options handling by merging engine options with twig options.

## [1.0.0] - 2017-12-16
Update readme with demo project link

## [0.1.4] - 2017-12-16
Update readme with demo project link

## [0.1.3] - 2017-12-13
Add options.info function support for initialization.
Add unit test for handlebars partials.

## [0.1.2] - 2017-12-12
Fix missing lib files

## [0.1.1] - 2017-12-12
engineOpitons can be a function which receives an info object containing the source filename (for partials support in some engines)

## [0.0.1-dev.2] - 2017-12-11
Pass options to all engines

## [0.0.1-dev.1] - 2017-12-11
Rename app to render-template-loader

## [0.0.1-dev.0] - 2017-12-10
Initial version
