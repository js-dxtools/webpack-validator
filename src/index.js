import Joi from 'joi'
import moduleSchema from './properties/module'

export const schema = Joi.object({
  module: moduleSchema,
  resolve: Joi.any(),
  output: Joi.any(),
  entry: Joi.any(),
  plugins: Joi.any(),
  devtool: Joi.any(),
  externals: Joi.any(),
  node: Joi.any(),
  stats: Joi.any(),
  context: Joi.any(),
  debug: Joi.any(),
  devServer: Joi.any(),

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
