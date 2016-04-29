import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { console: true },

  // #1
  { global: true },

  // #2
  { Buffer: true },

  // #3
  { process: 'mock' },

  // #4
  { __filename: true },

  // #5
  { __dirname: false },

  // #6
  { foo: 'mock' },
]

const invalidModuleConfigs = [
  // #0
  // { input: { foo: 'mocka' }, error: { } },

  // #0
  { input: [1], error: { } },
]

describe('node', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

