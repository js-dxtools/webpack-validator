import schema from '../../src/properties/plugins'
import { allValid, allInvalid } from '../utils'

const validModuleConfigs = [
  // #0
  [
    () => {},
    {},
  ],
]

const invalidModuleConfigs = [
  // #0
  { input: 1, error: { } },
]

describe('plugins', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

