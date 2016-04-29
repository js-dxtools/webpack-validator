import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  './entry.js',

  // #1
  ['./entry.js'],

  // #2
  { foo: './entry.js', bar: ['./bar.js'] },

]

const invalidModuleConfigs = [
  // #0
  { input: 1, error: { message: '"value" must be a string' } },

  // #1
  { input: [1], error: { message: '"0" must be a string' } },

  // #2
  { input: [1, 'foo'], error: { message: '"0" must be a string' } },

  // #3
  { input: { foo: 1, bar: ['./bar.js'] }, error: { message: '"value" must be a string' } },
]

describe('entry', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})
