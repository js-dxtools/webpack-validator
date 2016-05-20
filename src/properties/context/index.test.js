import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  { input: 'exists' }, // Absolute
]

const invalidModuleConfigs = [
  { input: './entry.js', error: { type: 'path.absolute' } }, // Relative
  { input: 1, error: { message: '"value" must be a string' } },
]

describe('context', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

