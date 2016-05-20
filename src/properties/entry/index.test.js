import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  { input: './entry.js' },
  { input: ['./entry.js'] },
  { input: { foo: './entry.js', bar: ['./bar.js'] } },
]

const invalidModuleConfigs = [
  { input: 1, error: { message: '"value" must be a string' } },
  { input: [1], error: { message: '"0" must be a string' } },
  { input: [1, 'foo'], error: { message: '"0" must be a string' } },
  { input: { foo: 1, bar: ['./bar.js'] }, error: { message: '"value" must be a string' } },
]

describe('entry', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})
