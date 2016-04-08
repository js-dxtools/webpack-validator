import Joi from 'joi'

const MESSAGE = 'must be an absolute path'
const absolutePath = Joi
  .string()
  .regex(/^(?!\.?\.\/).+$/)
  .options({ language: { string: { regex: { base: MESSAGE } } } })

absolutePath.message = MESSAGE

export default absolutePath
