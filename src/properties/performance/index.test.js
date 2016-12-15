import schema from './index'
import { allValid } from '../../../test/utils'

const validPerformanceConfigs = [
  { input: { hints: true } },
  { input: { hints: false } },
]

describe('performance', () => {
  allValid(validPerformanceConfigs, schema)
})
