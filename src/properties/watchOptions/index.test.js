import schema from './index'
import { allValid } from '../../../test/utils'

const validModuleConfigs = [
  { input: { aggregateTimeout: 300 } },
  { input: { poll: true } },
  { input: { poll: false } },
  { input: { poll: 1000 } },
]

describe('watchOptions', () => {
  allValid(validModuleConfigs, schema)
})

