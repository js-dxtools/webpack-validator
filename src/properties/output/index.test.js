import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  // 'entry.js',
]

const invalidModuleConfigs = [
  // #0
  // { input: 1, error: { message: '"value" must be a string' } },
]

describe('output', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

