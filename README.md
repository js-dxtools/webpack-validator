# webpack-joi-schema
[![travis build](https://img.shields.io/travis/jonathanewerner/webpack-joi-schema.svg?style=flat-square)](https://travis-ci.org/jonathanewerner/webpack-joi-schema)
[![codecov.io](https://codecov.io/github/jonathanewerner/webpack-joi-schema/coverage.svg?branch=master)](https://codecov.io/github/jonathanewerner/webpack-joi-schema?branch=master)

Writing webpack configs is a brittle and error-prone. [joi](https://github.com/hapijs/joi) is a brilliant schema validation library. With the joi schema definition that this package provides, you get a) static type safety and b) "semantic" validations such as "`module.loaders.loader` and `module.loaders.loaders` can not be used simultaneously" or "`module.loaders.query` can only be used with `module.loaders.loader`, not with `module.loaders.loaders`".

**Note**: This is a work in progress. If you like it, you're welcome to give feedback & PR's.

### Usage
In your `webpack.config.js`:
```js
const validate = require('webpack-joi-schema')

const config = { /* ... your webpack config */ }
validate(config) // Will throw errors when config is not valid

module.exports = config
```

#### License
MIT
