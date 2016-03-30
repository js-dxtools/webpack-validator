import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { alias: { foo: 'bar' } },

  // #1
  { alias: { foo: 'bar' } },

  // #2
  { root: 'foo' },

  // #3
  { root: ['foo', 'bar'] },

  // #4
  { modulesDirectories: ['node_modules', 'bower_foo'] },

  // #5
  { fallback: ['foo', 'bar'] },

  // #6
  { extensions: ['', '.foo'] },

  // #7
  { packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'] },

  // #8
  { packageAlias: 'browser' },

  // #9
  { unsafeCache: [/foo/] },

  // #10
  { unsafeCache: /foo/ },

  // #11
  { unsafeCache: true },
]

const invalidModuleConfigs = [
  // #0
  {
    input: { alias: { foo: 1 } },
  },

  // #1
  {
    input: { alias: ['foo'] },
  },

  // #2
  {
    input: { root: './foo' }, // must be absolute
  },

  // #4
  {
    input: { modulesDirectories: 'node_modules' },
  },

  // #5
  {
    input: { extensions: ['', 'bar'] }, // must have leading dot
  },

  // #6
  {
    input: { unsafeCache: false }, // must have true
  },
]

describe('resolve', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

