import Joi from 'joi'
import watchOptionsSchema from '../watchOptions'
import { notAbsolutePath, urlPart } from '../../types'

export default Joi.object({
  lazy: Joi.boolean(),
  inline: Joi.boolean(),
  stdin: Joi.boolean(),
  open: Joi.boolean(),
  info: Joi.boolean(),
  quiet: Joi.boolean(),
  https: Joi.boolean(),
  key: Joi.binary(),
  cert: Joi.binary(),
  ca: [
    Joi.binary(),
    Joi.array().items(Joi.binary()),
  ],
  contentBase: [
    Joi.object(),
    Joi.array(),
    Joi.string(),
  ],
  historyApiFallback: Joi.alternatives().try([
    Joi.object(),
    Joi.boolean(),
  ]),
  compress: Joi.boolean(),
  port: Joi.number(),
  public: Joi.string(),
  host: Joi.string(),
  publicPath: urlPart,
  outputPath: urlPart,
  filename: notAbsolutePath,
  watchOptions: watchOptionsSchema,
  hot: Joi.boolean(),
  stats: Joi.alternatives().try([
    Joi.object(),
    Joi.string().valid(['none', 'errors-only', 'minimal', 'normal', 'verbose']),
  ]),
  logLevel: Joi.string().valid(['debug', 'info', 'warn', 'error', 'silent']),
  localAddress: Joi.string().regex(/.*:[0-9]+/),
  noInfo: Joi.boolean(),
  proxy: [
    Joi.object(),
    Joi.array(),
    Joi.string(),
  ],
  setup: Joi.func().arity(1),
  staticOptions: Joi.object(),
  headers: Joi.object(),
})
