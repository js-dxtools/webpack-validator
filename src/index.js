import Joi from 'joi'
import chalk from 'chalk'
import moduleSchemaFn from './properties/module'
import entrySchema from './properties/entry'
import contextSchema from './properties/context'
import devtoolSchema from './properties/devtool'
import externalsSchema from './properties/externals'
import nodeSchema from './properties/node'
import pluginsSchema from './properties/plugins'
import resolveSchemaFn from './properties/resolve'
import outputSchema from './properties/output'
import watchOptionsSchema from './properties/watchOptions'
import devServerSchema from './properties/devServer'
import { looksLikeAbsolutePath } from './types'
import _merge from 'lodash/merge'
import sh from 'shelljs'

sh.config.silent = true

const makeSchema = (schemaOptions, schemaExtension) => {
  const resolveSchema = resolveSchemaFn(schemaOptions)
  const moduleSchema = moduleSchemaFn(schemaOptions)

  const schema = Joi.object({
    amd: Joi.object(),
    bail: Joi.boolean(),
    cache: Joi.boolean(),
    context: contextSchema,
    debug: Joi.boolean(),
    devServer: devServerSchema,
    devtool: devtoolSchema,
    entry: entrySchema,
    externals: externalsSchema,
    loader: Joi.any(), // ?
    module: moduleSchema,
    node: nodeSchema,
    output: outputSchema,
    plugins: pluginsSchema,
    profile: Joi.boolean(),
    recordsInputPath: looksLikeAbsolutePath,
    recordsOutputPath: looksLikeAbsolutePath,
    recordsPath: looksLikeAbsolutePath,
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
  })
  return schemaExtension ? schema.concat(schemaExtension) : schema
}

const defaultSchemaOptions = {
  rules: {
    'no-root-files-node-modules-nameclash': true,
    'loader-enforce-include-or-exclude': false,
    'loader-prefer-include': false,
  },
}

// Easier consumability for require (default use case for non-transpiled webpack configs)
module.exports = function validate(config, options = {}) {
  const {
    // Don't return the config object and throw on error, but just return the validation result
    returnValidation, // bool
    quiet, // bool
    schema: overrideSchema, // Don't take internal schema, but override with this one
    schemaExtension, // Internal schema will be `Joi.concat`-ted with this schema if supplied
    rules,
  } = options

  const schemaOptions = _merge(defaultSchemaOptions, { rules })

  const schema = overrideSchema || makeSchema(schemaOptions, schemaExtension)

  const validationResult = Joi.validate(config, schema, { abortEarly: false })
  validationResult.schemaOptions = schemaOptions // Mainly for having sth to assert on right now

  if (returnValidation) return validationResult

  if (validationResult.error) {
    console.error(validationResult.error.annotate())
    process.exit(1)
  }

  if (!quiet) {
    console.info(chalk.green('[webpack-validator] Config is valid.'))
  }

  return config
}

module.exports.Joi = Joi
