import validate from '../../src/index'

/**
 * For all supplied configs (array of objects), check that they are valid given a schema.
 */
export default (configs, schema) => {
  configs.forEach((input, n) => {
    const { input: validConfig, schema: schemaOverride } = input
    if (!validConfig) {
      throw new Error(
        'Please supply the valid config object like `{ input: <valid-config-object> }`.' +
        `You passed ${JSON.stringify(input)}`
      )
    }

    it(`valid #${n} should be valid`, () => {
      const result = validate(validConfig, {
        schema: schemaOverride || schema,
        returnValidation: true,
      })
      if (result.error) {
        throw new Error(result.error.annotate())
      }
    })
  })
}
