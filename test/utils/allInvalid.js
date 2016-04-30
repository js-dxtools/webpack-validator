import validate from '../../src/index'

/**
 * For all supplied configs (array of objects), check that they are invalid given a schema.
 */
export default (configs, schema) => {
  // Set throw to true for debugging reasons
  configs.forEach(({ input: invalidConfig, error: expectedError, throwError = false }, n) => {
    it(`invalid #${n} should be invalid`, () => {
      if (!invalidConfig) {
        throw new Error('Pass data as `input` property')
      }

      const result = validate(invalidConfig, schema, { returnValidation: true })
      assert(result.error)
      const { error } = result

      if (throwError) {
        throw error
      }

      assert(error)
      if (expectedError) {
        if (expectedError.path) {
          assert(error.details[0].path === expectedError.path)
        }

        if (expectedError.type) {
          assert(error.details[0].type === expectedError.type)
        }

        if (expectedError.message) {
          assert(error.details[0].message === expectedError.message)
        }
      }
    })
  })
}

