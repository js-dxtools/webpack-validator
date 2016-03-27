import Joi from 'joi'

const webpackConfigSchema = Joi.object({
  module: Joi.any(),
  resolve: Joi.any(),
  output: Joi.any(),
  entry: Joi.any(),
  plugins: Joi.any(),
  devtool: Joi.any(),
  postcss: Joi.any(),
})//.unknown()

export default function validate(config, schema = webpackConfigSchema) {
  const options = {
    abortEarly: false,
  }
  try {
    Joi.assert(config, schema, options)
  } catch (err) {
    return err
  }

  return null
}
