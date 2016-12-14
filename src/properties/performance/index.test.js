import schema from './index'
import { allValid } from '../../../test/Utils'

const validPerformanceConfigs = [
  { input: { hints: true } },
  { input: { hints: false } },
]

describe('performance', () => {
  allValid(validPerformanceConfigs, schema)
})
