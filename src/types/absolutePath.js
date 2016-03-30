import Joi from 'joi'

export default Joi
  .string()
  .regex(/^(?!\.?\.\/).+$/)
  .options({ language: { string: { regex: { base: 'must be an absolute path' } } } })

