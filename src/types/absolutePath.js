import Joi from 'joi'
import shell from 'shelljs'

const MESSAGE = '"{{path}}" should be an existing absolute path, ' +
                'but I found the following problems: {{msg1}}{{msg2}}'

export const JoiWithPath = Joi.extend({
  base: Joi.string(),
  name: 'path',
  language: {
    absolute: MESSAGE,
  },
  rules: [
    {
      name: 'absolute',

      params: {
        checkForExistence: Joi.bool(),
      },

      validate(params, value, state, options) {
        const looksLikeAbsolutePath = /^(?!\.?\.\/).+$/.test(value)
        const directoryExists = params.checkForExistence === false ? true : shell.test('-d', value)
        if (!looksLikeAbsolutePath || !directoryExists) {
          return this.createError('path.absolute', {
            path: value,
            msg1: !looksLikeAbsolutePath
              ? 'The supplied string does not look like an absolute path ' +
                '(it does not match the regex /^(?!\.?\.\/).+$/). ' : '',
            msg2: !directoryExists
              ? 'The supplied path does not exist on the file system.' : '',
          }, state, options)
        }
        return null // Everything is OK
      },
    },
  ],
})

const absolutePath = JoiWithPath.path().absolute(true)
absolutePath.message = MESSAGE
export default absolutePath
export const looksLikeAbsolutePath = JoiWithPath.path().absolute(false)
