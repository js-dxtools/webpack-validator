import path from 'path'
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
import performanceSchema from './properties/performance'
import { looksLikeAbsolutePath } from './types'
import _merge from 'lodash/merge'
import sh from 'shelljs'
import semver from 'semver'

sh.config.silent = true

const defaultSchemaOptions = {
  rules: {
    'no-root-files-node-modules-nameclash': true,
    'loader-enforce-include-or-exclude': false,
    'loader-prefer-include': false,
  },
}

function makeSchema(schemaOptions, schemaExtension) {
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
    progress: Joi.boolean(),
    recordsInputPath: looksLikeAbsolutePath,
    recordsOutputPath: looksLikeAbsolutePath,
    recordsPath: looksLikeAbsolutePath,
    resolve: resolveSchema,
    resolveLoader: resolveSchema.concat(Joi.object({
      moduleTemplates: Joi.array().items(Joi.string()),
    })),
    watch: Joi.boolean(),
    watchOptions: watchOptionsSchema,
    performance: performanceSchema,
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

function throwForWebpack2() {
  const cwd = process.cwd()
  let satisifies = true
  try {
    const webpackPackagePath = path.join(cwd, 'node_modules', 'webpack', 'package.json')
    const { version } = require(webpackPackagePath)
    satisifies = semver.satisfies(version, '^1.x')
  } catch (error) {
    // ignore...
  }
  if (!satisifies) {
    throw new Error(
      'It looks like you\'re using version 2 or greater of webpack. ' +
      'The official release of 2 of webpack was released with built-in validation. ' +
      'So webpack-validator does not support that version. ' +
      'Please uninstall webpack-validator and remove it from your project!'
    )
  }
}

function validate(config, options = {}) {
  const {
    // Don't return the config object and throw on error, but just return the validation result
    returnValidation, // bool
    schema: overrideSchema, // Don't take internal schema, but override with this one
    schemaExtension, // Internal schema will be `Joi.concat`-ted with this schema if supplied
    rules,
  } = options
  throwForWebpack2()

  const schemaOptions = _merge(defaultSchemaOptions, { rules })

  const schema = overrideSchema || makeSchema(schemaOptions, schemaExtension)

  const validationResult = Joi.validate(config, schema, { abortEarly: false })
  validationResult.schemaOptions = schemaOptions // Mainly for having sth to assert on right now

  if (returnValidation) return validationResult

  if (validationResult.error) {
    console.error(validationResult.error.annotate())
    process.exit(1)
  }

  return config
}

module.exports = validate

// Easier consumability for require (default use case for non-transpiled webpack configs)
function validateRoot(config, options = {}) {
  const {
    quiet,
  } = options

  let validationResult,
    multiValidationResults

  if (Array.isArray(config)) {
    multiValidationResults = []
    config.forEach((cfg) => {
      multiValidationResults.push(
        validate(cfg, options)
      )
    })
  } else {
    validationResult = validate(config, options)
  }

  if (!quiet) {
    console.info(chalk.green('[webpack-validator] Config is valid.'))
  }

  return validationResult || multiValidationResults
}

module.exports.validateRoot = validateRoot
module.exports.Joi = Joi
