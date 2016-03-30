import validate from '../../src/index'

export default (configs, schema) => {
  // Set throw to true for debugging reasons
  configs.forEach(({ input: invalidConfig, error: expectedError, throwError = false }, n) => {
    it(`invalid #${n} should be invalid`, () => {
      if (!invalidConfig) {
        throw new Error('Pass data as `input` property')
      }

      let result
      try {
        validate(invalidConfig, schema)
      } catch (e) {
        result = e
      }
      if (throwError) {
        throw result
      }

      assert(result)
      if (expectedError) {
        if (expectedError.path) {
          assert(result.details[0].path === expectedError.path)
        }

        if (expectedError.type) {
          assert(result.details[0].type === expectedError.type)
        }

        if (expectedError.message) {
          // console.log(result.details[0].message)
          // console.log(expectedError.message)
          assert(result.details[0].message === expectedError.message)
        }
      }
    })
  })
}

