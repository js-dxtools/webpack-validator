import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { input: 'exists' }, // Absolute
]

const invalidModuleConfigs = [
  // #0
  // Relative
  { input: './entry.js', error: { type: 'path.absolute' } },

  // #1
  { input: 1, error: { message: '"value" must be a string' } },
]

describe('context', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

