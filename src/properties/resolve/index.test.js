import schemaFn from './index'
import { allValid, allInvalid } from '../../../test/utils'
import path from 'path'

const validModuleConfigs = [
  // #0
  { input: { alias: { foo: 'bar' } } },

  // #1
  { input: { alias: { foo: 'bar' } } },

  // #2
  { input: { root: __dirname } },

  // #3
  { input: { root: [__dirname, __dirname] } },

  // #4
  { input: { modulesDirectories: ['node_modules', 'bower_foo'] } },

  // #5
  { input: { fallback: [__dirname, __dirname] } },

  // #6
  { input: { extensions: ['', '.foo'] } },

  // #7
  { input: { packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'] } },

  // #8
  { input: { packageAlias: 'browser' } },

  // #9
  { input: { unsafeCache: [/foo/] } },

  // #10
  { input: { unsafeCache: /foo/ } },

  // #11
  { input: { unsafeCache: true } },

  // #12 (Ok when rule disabled)
  {
    input: {
      root: [
        // These roots have items in them that nameclash with node_module packages
        path.join(__dirname, './test-dir-for-resolve-root'), // contains "babel-cli.js"
        path.join(__dirname, './test-dir-for-resolve-root-2'), // contains "codecov/index.js"
      ],
    },
    schema: schemaFn({ rules: { 'no-root-files-node-modules-nameclash': false } }),
  },
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
  // #7
  {
    input: {
      root: [
        // These roots have items in them that nameclash with node_module packages
        path.join(__dirname, './test-dir-for-resolve-root'), // contains "babel-cli.js"
        path.join(__dirname, './test-dir-for-resolve-root-2'), // contains "codecov/index.js"
      ],
    },
    error: { type: 'path.noRootFilesNodeModulesNameClash' },
  },
]

const schema = schemaFn({
  rules: {
    'no-root-files-node-modules-nameclash': true,
  },
})

describe('resolve', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

