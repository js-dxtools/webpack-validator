import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  { input: 'eval' },
  { input: '#@eval' },
  { input: '#cheap-module-eval-source-map' },
  { input: 'hidden-source-map' },
  { input: 'inline-source-map' },
  { input: 'eval-source-map' },
  { input: 'cheap-source-map' },
]

const invalidModuleConfigs = [
  { input: 'foo', error: { } },
  { input: 'eval-source-map-foo', error: { } },
  { input: 'foo-cheap-source-map', error: { } },
  { input: '#@eval-foo', error: { } },
]

describe('devtool', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

