import chalk from 'chalk'
import Joi from 'joi'
import schema from 'webpack-joi-schema'

export default function validate(config, schema_ = schema) {
  Joi.assert(config, schema_)
  console.info(chalk.green('[webpack-validator] Config is valid.'))
  return config
}

module.exports.schema = schema
