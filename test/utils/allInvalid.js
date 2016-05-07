import validate from '../../src/index'

/**
 * For all supplied configs (array of objects), check that they are invalid given a schema.
 */
export default (configs, schema) => {
  configs.forEach(({
    // The config object to be tested
    input: invalidConfig,
    // The expected error
    // Checks are possible on joi error `path`, `type` and `message` properties
    error: expectedError,
    // For debugging reasons: throw the error to inspect its toString output
    throwError = false,
    // Override the schema in order to test for non-default rule configurations
    schema: schemaOverride,
  }, n) => {
    it(`invalid #${n} should be invalid`, () => {
      if (!invalidConfig) {
        throw new Error('Pass data as `input` property')
      }

      const result = validate(invalidConfig, {
        schema: schemaOverride || schema,
        returnValidation: true,
      })

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

