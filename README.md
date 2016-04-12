# webpack-validator

 > Validate your webpack configs with joi

[![travis build](https://img.shields.io/travis/jonathanewerner/webpack-validator.svg?style=flat-square)](https://travis-ci.org/jonathanewerner/webpack-validator)
[![codecov.io](https://img.shields.io/codecov/c/github/jonathanewerner/webpack-validator.svg?style=flat-square)](https://codecov.io/github/jonathanewerner/webpack-validator?branch=master)
![dependencies](https://img.shields.io/david/jonathanewerner/webpack-validator.svg?style=flat-square)
![devDependencies](https://img.shields.io/david/dev/jonathanewerner/webpack-validator.svg?style=flat-square)
[![version](https://img.shields.io/npm/v/webpack-validator.svg?style=flat-square)](http://npm.im/webpack-validator)
[![downloads](https://img.shields.io/npm/dm/webpack-validator.svg?style=flat-square)](http://npm-stat.com/charts.html?package=webpack-validator&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/webpack-validator.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Writing webpack configs is brittle and error-prone. This package provides a [joi](https://github.com/hapijs/joi) object schema for webpack configs. This gets you a) static type safety, b) property spell checking and c) semantic validations such as "`loader` and `loaders` can not be used simultaneously" or "`query` can only be used with `loader`, not with `loaders`".

You're very welcome to give [feedback](https://github.com/jonathanewerner/webpack-validator/issues) & [PR's](https://github.com/jonathanewerner/webpack-validator).

### Example
Take this simple webpack config. It has a tiny, hard to spot error. Can you find it?
```js
var config = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'Redux',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};
```

webpack-validator makes it easy:

![validation-example](https://cloud.githubusercontent.com/assets/3755413/14134087/b3279738-f654-11e5-9752-367b01ac123d.png)

### Usage
In your `webpack.config.js`:
```js
const validate = require('webpack-validator')

module.exports = validate({ /* ... your webpack config */ })
```
Now run webpack. Either everything is green and the build continues or `joi` will let you know what's wrong and the build won't continue.

Alternatively just run `node webpack.config.js` to only validate your config and not run webpack.

#### Customizing
If you need to extend the schema, for example for custom top level properties or properties added by third party plugins like `eslint-loader` (which adds a toplevel `eslint` property), do it like this:

```js
const validate = require('webpack-validator')
const schema = require('webpack-validator').schema

// joi is installed as dependency of this package and will be available in node_modules
// if you use npm 3. Otherwise install it explicitly.
const Joi = require('joi')

const yourSchema = schema.concat(Joi.object({
  // this would just allow the property and doesn't perform any additional validation
  eslint: Joi.any()
}))

const config = { /* ... your webpack config */ }

// Override default config by supplying your config as second parameter.
module.exports = validate(config, yourSchema)
```

#### Support
Because this module uses the amazing `Joi` validation library, this module only supports Node >=4.0.0.

#### License
MIT
