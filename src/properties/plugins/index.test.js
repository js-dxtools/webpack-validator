import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  {
    input: [
      () => {},
      {},
    ],
  },
]

const invalidModuleConfigs = [
  { input: 1, error: { } },
]

describe('plugins', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

