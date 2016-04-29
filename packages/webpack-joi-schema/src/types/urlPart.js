import Joi from 'joi'

const MESSAGE = 'should end with a slash (example: "/assets/" or "http://cdn.example.com/assets/[hash]/")'
const urlPart = Joi
  .string()
  .regex(/\/$/)
  .options({ language: { string: { regex: { base: MESSAGE } } } })

urlPart.message = MESSAGE

export default urlPart

