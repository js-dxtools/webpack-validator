import configs from '../test/passing-configs'
import validate from './'

describe('.', () => {
  configs.forEach(({ config, name }) => {
    it(`validates ${name}`, () => {
      const result = validate(config)
      try {
        assert(!result)
      } catch (e) {
        throw result
      }
    })
  })
})
