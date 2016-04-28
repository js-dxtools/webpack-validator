import chalk from 'chalk'
import scheme, { Joi } from 'webpack-config-validationscheme'

// Easier consumability for require (default use case for non-transpiled webpack configs)
module.exports = function validate(config, schema_ = scheme) {
  Joi.assert(config, schema_)
  const validationResult = Joi.validate(config, schema_, { abortEarly: false })
  if (validationResult.error) {
    console.info(validationResult.error.annotate())
    process.exit(1)
  }
  console.info(chalk.green('[webpack-validator] Config is valid.'))
  return config
}
module.exports.schema = scheme
