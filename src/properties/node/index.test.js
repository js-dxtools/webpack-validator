import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { input: { console: true } },

  // #1
  { input: { global: true } },

  // #2
  { input: { Buffer: true } },

  // #3
  { input: { process: 'mock' } },

  // #4
  { input: { __filename: true } },

  // #5
  { input: { __dirname: false } },

  // #6
  { input: { foo: 'mock' } },
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

