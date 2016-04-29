import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  '/home/jwerner/foo/entry.js', // Absolute
]

const invalidModuleConfigs = [
  // #0
  // Relative
  { input: './entry.js', error: { message: '"value" must be an absolute path' } },

  // #1
  { input: 1, error: { message: '"value" must be a string' } },
]

describe('context', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

