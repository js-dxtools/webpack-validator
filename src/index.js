import Joi from 'joi'
import moduleSchema from './properties/module'

export const schema = Joi.object({
  amd: Joi.any(),
  bail: Joi.any(),
  cache: Joi.any(),
  context: Joi.any(),
  debug: Joi.any(),
  devServer: Joi.any(),
  devtool: Joi.any(),
  entry: Joi.any(),
  externals: Joi.any(),
  loader: Joi.any(),
  module: moduleSchema,
  node: Joi.any(),
  output: Joi.any(),
  plugins: Joi.any(),
  profile: Joi.any(),
  recordsInputPath: Joi.any(),
  recordsOutputPath: Joi.any(),
  recordsPath: Joi.any(),
  resolve: Joi.any(),
  resolveLoader: Joi.any(),
  stats: Joi.any(),
  target: Joi.any(),

  // Plugins
  postcss: Joi.any(),
  eslint: Joi.any(),
  tslint: Joi.any(),
  metadata: Joi.any(),
})//.unknown()

export default function validate(config, schema_ = schema) {
  const options = {
    abortEarly: false,
  }
  try {
    Joi.assert(config, schema_, options)
  } catch (err) {
    return err
  }

  return null
}
