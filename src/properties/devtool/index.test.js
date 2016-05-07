import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { input: 'eval' },
  // #1
  { input: '#@eval' },
  // #2
  { input: '#cheap-module-eval-source-map' },
  // #3
  { input: 'hidden-source-map' },
  // #4
  { input: 'inline-source-map' },
  // #5
  { input: 'eval-source-map' },
  // #6
  { input: 'cheap-source-map' },
]

const invalidModuleConfigs = [
  // #0
  { input: 'foo', error: { } },
  // #1
  { input: 'eval-source-map-foo', error: { } },
  // #2
  { input: 'foo-cheap-source-map', error: { } },
  // #3
  { input: '#@eval-foo', error: { } },
]

describe('devtool', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

