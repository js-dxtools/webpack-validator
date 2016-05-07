import schema from './index'
import { allValid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { input: { aggregateTimeout: 300 } },
  // #1
  { input: { poll: true } },
  // #2
  { input: { poll: false } },
  // #3
  { input: { poll: 1000 } },
]

describe('watchOptions', () => {
  allValid(validModuleConfigs, schema)
})

