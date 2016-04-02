import Joi from 'joi'

const entrySchema = Joi.array().items(Joi.string()).single()

export default [
  entrySchema,
  Joi.object().pattern(/.+/, entrySchema),
]
