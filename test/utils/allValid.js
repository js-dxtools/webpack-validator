import chalk from 'chalk'
import util from 'util'

const validate = require('../../src/index').validate

/**
 * For all supplied configs (array of objects), check that they are valid given a schema.
 */
export default (configs, schema) => {
  configs.forEach((input) => {
    const { input: validConfig, schema: schemaOverride } = input
    if (!validConfig) {
      throw new Error(
        'Please supply the valid config object like `{ input: <valid-config-object> }`.' +
        `You passed ${JSON.stringify(input)}`
      )
    }

    it(`: ${chalk.gray(util.inspect(validConfig, false, null))} should be valid`, () => {
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
