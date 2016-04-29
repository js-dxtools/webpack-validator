import Joi from 'joi'

export const CONDITION_MESSAGE =
  'may be a RegExp (tested against absolute path), ' +
  'a string containing the absolute path, a function(absPath): bool, ' +
  'or an array of one of these combined with “and”.'

export const LOADERS_QUERY_MESSAGE =
  'You can only pass the \`query\` property when you specify your ' +
  'loader with the singular \`loader\` property'

const conditionSchema = Joi.array().items([
  Joi.string(),
  Joi.object().type(RegExp),
  Joi.func().arity(1),
]).single().options({ language: { array: { includesSingle: CONDITION_MESSAGE } } })

const loaderSchema = Joi.object({
  test: conditionSchema.required(),
  exclude: conditionSchema,
  include: conditionSchema,
  loader: Joi.string(),
  query: Joi.object(),
  loaders: Joi.array().items(Joi.string()),
})
  .xor('loaders', 'loader')
  .nand('loaders', 'query').options({ language: { object: { nand: LOADERS_QUERY_MESSAGE } } })

const loadersSchema = Joi.array().items(loaderSchema)

export default Joi.object({
  loaders: loadersSchema.required(),
  preLoaders: loadersSchema,
  postLoaders: loadersSchema,
  noParse: Joi.array(Joi.object().type(RegExp)).single(),
})
