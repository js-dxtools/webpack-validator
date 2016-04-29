import Joi from 'joi'

const MESSAGE = 'must not start with leading slash. ' +
  'You probably want to supply an absolute path here, but shouldn\'t.'

const notAbsolutePath = Joi
  .string()
  .regex(/^(?!\/).+$/)
  .options({ language: { string: { regex: { base: MESSAGE } } } })

notAbsolutePath.message = MESSAGE
export default notAbsolutePath
