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
import outputSchema from './properties/output'
import watchOptionsSchema from './properties/watchOptions'
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
  output: outputSchema,
  plugins: pluginsSchema,
  profile: Joi.boolean(),
  recordsInputPath: absolutePath,
  recordsOutputPath: absolutePath,
  recordsPath: absolutePath,
  resolve: resolveSchema,
  resolveLoader: resolveSchema.concat(Joi.object({
    moduleTemplates: Joi.array().items(Joi.string()),
  })),
  watchOptions: watchOptionsSchema,
  stats: Joi.any(), // TODO
  target: Joi.any(), // TODO

  // Plugins
  postcss: Joi.any(),
  eslint: Joi.any(),
  tslint: Joi.any(),
  metadata: Joi.any(),
})//.unknown()


// Easier consumability for require (default use case for non-transpiled webpack configs)
module.exports = function validate(config, schema_ = schema) {
  Joi.assert(config, schema_)
  console.info(chalk.green('[webpack-validator] Config is valid.'))
  return config
}
module.exports.schema = schema
