import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  'eval',
  '#@eval',
  '#cheap-module-eval-source-map',
  'hidden-source-map',
  'inline-source-map',
  'eval-source-map',
  'cheap-source-map',
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

