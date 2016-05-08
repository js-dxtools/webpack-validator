import schemaFn from './index'
import { allValid, allInvalid } from '../../../test/utils'
import path from 'path'

const problematicRootPaths = [
  // These root paths have items in them that nameclash with node_module packages
  // The `ls` results for these paths have been stubbed in test/setup.js
  // The node_module contents have been stubbed out in rules/no-root-files-node-modules-nameclash
  path.join(__dirname, './exists-with-babel-cli-js'), // contains "babel-cli.js"
  path.join(__dirname, './exists-with-codecov-folder'), // contains "codecov/index.js"
  // contains "node_modules", will be skipped
  path.join(__dirname, './exists-with-node-modules/node_modules'),
]
const validModuleConfigs = [
  // #0
  { input: { alias: { foo: 'bar' } } },

  // #1
  { input: { alias: { foo: 'bar' } } },

  // #2
  { input: { root: 'exists' } },

  // #3
  { input: { root: ['exists', 'exists'] } },

  // #4
  { input: { modulesDirectories: ['node_modules', 'bower_foo'] } },

  // #5
  { input: { fallback: ['exists', 'exists'] } },

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
      // These won't throw however because we disabled the rule
      root: problematicRootPaths,
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
    // It exists but is not absolute
    // file existence stubbed out in test/setup.js
    input: { root: './exists' },
    schema: schemaFn({ rules: { 'no-root-files-node-modules-nameclash': false } }),
  },

  // #3
  {
    input: { root: '/does-not-exist' }, // must exist
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
      root: problematicRootPaths,
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

