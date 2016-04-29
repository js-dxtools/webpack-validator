import schema from './index'
import { allValid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { aggregateTimeout: 300 },
  // #1
  { poll: true },
  // #2
  { poll: false },
  // #3
  { poll: 1000 },
]

describe('watchOptions', () => {
  allValid(validModuleConfigs, schema)
})

