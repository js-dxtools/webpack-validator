import Joi from 'joi'
import chalk from 'chalk'
import moduleSchema from './properties/module'
import entrySchema from './properties/entry'
import contextSchema from './properties/context'
import devtoolSchema from './properties/devtool'
import externalsSchema from './properties/externals'
import nodeSchema from './properties/node'
import pluginsSchema from './properties/plugins'
import resolveSchema from './properties/resolve'
import { absolutePath } from './types'

const schema = Joi.object({
  amd: Joi.object(),
  bail: Joi.boolean(),
  cache: Joi.boolean(),
  context: contextSchema,
  debug: Joi.boolean(),
  devServer: Joi.object(),
  devtool: devtoolSchema,
  entry: entrySchema,
  externals: externalsSchema,
  loader: Joi.any(), // ?
  module: moduleSchema,
  node: nodeSchema,
  output: Joi.any(),
  plugins: pluginsSchema,
  profile: Joi.boolean(),
  recordsInputPath: absolutePath,
  recordsOutputPath: absolutePath,
  recordsPath: absolutePath,
  resolve: resolveSchema,
  resolveLoader: resolveSchema.concat(Joi.object({
    moduleTemplates: Joi.array().items(Joi.string()),
  })),
  stats: Joi.any(),
  target: Joi.any(),

  // Plugins
  postcss: Joi.any(),
  eslint: Joi.any(),
  tslint: Joi.any(),
  metadata: Joi.any(),
})//.unknown()


// Easier consumability for require (default use case for non-transpiled webpack configs)
module.exports = function validate(config, schema_ = schema) {
  Joi.assert(config, schema_)
  console.info(chalk.green('[webpack-joi-schema] Config is valid.'))
  return config
}
module.exports.schema = schema
