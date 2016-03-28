import validate from '../../src/index'

export default (configs, schema) => {
  configs.forEach((validConfig, n) => {
    it(`valid #${n} should be valid`, () => {
      let result
      try {
        validate(validConfig, schema)
      } catch (e) {
        result = e
      }

      try {
        assert(!result)
      } catch (e) {
        console.info('[allValid.js] result: ', result)
        throw e
      }
    })
  })
}
