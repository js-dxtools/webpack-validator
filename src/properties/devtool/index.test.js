import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  'eval',
  '#@eval',
  '#cheap-module-eval-source-map',
]

const invalidModuleConfigs = [
  // #0
  { input: 'foo', error: { } },
]

describe('devtool', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

