import Joi from 'joi'
import shell from 'shelljs'

const MESSAGE = 'Expected an absolute path that exists on the file system, but got "{{path}}".'

export const JoiWithPath = Joi.extend({
  base: Joi.string(),
  name: 'path',
  language: {
    absolute: MESSAGE,
  },
  rules: [
    {
      name: 'absolute',

      validate(params, value, state, options) {
        const looksLikeAbsolutePath = /^(?!\.?\.\/).+$/.test(value)
        const directoryExists = shell.test('-d', value)
        if (!looksLikeAbsolutePath || !directoryExists) {
          return this.createError('path.absolute', { path: value }, state, options)
        }
        return null // Everything is OK
      },
    },
  ],
})

const absolutePath = JoiWithPath.path().absolute()
absolutePath.message = MESSAGE
export default absolutePath
