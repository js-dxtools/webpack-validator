import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validConfigs = [
  // #0
  'web',
]

const invalidConfigs = [
  // #0
  {
    input: 'foo',
    error: {
      message: '"value" must be one of [web, webworker, node, async-node, node-webkit, electron]',
    },
  },
]

describe('target', () => {
  allValid(validConfigs, schema)
  allInvalid(invalidConfigs, schema)
})

