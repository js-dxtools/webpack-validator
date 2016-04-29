import Joi from 'joi'
import configs from '../../../test/passing-configs'
import schema from './'

describe('webpack-joi-schema', () => {
  configs.forEach(({ config, name }) => {
    it(`passes for config ${name}`, () => {
      Joi.assert(config, schema)
    })
  })
})
