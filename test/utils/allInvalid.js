import validate from '../../src/index'

export default (configs, schema) => {
  configs.forEach(({ input: invalidConfig, error: expectedError }, n) => {
    it(`invalid #${n} should be invalid`, () => {
      const result = validate(invalidConfig, schema)

      assert(result)
      if (expectedError) {
        if (expectedError.path) {
          assert(result.details[0].path === expectedError.path)
        }

        if (expectedError.type) {
          assert(result.details[0].type === expectedError.type)
        }

        if (expectedError.message) {
          assert(result.details[0].message === expectedError.message)
        }
      }
    })
  })
}

