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
  { input: { alias: { foo: 'bar' } } },
  { input: { alias: { foo: 'bar' } } },
  { input: { root: 'exists' } },
  { input: { root: ['exists', 'exists'] } },
  { input: { modulesDirectories: ['node_modules', 'bower_foo'] } },
  { input: { fallback: ['exists', 'exists'] } },
  { input: { extensions: ['', '.foo'] } },
  { input: { packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'] } },
  { input: { packageAlias: 'browser' } },
  { input: { unsafeCache: [/foo/] } },
  { input: { unsafeCache: /foo/ } },
  { input: { unsafeCache: true } },
  {
    input: {
      // These won't throw however because we disabled the rule
      root: problematicRootPaths,
    },
    schema: schemaFn({ rules: { 'no-root-files-node-modules-nameclash': false } }),
  },
]

const invalidModuleConfigs = [
  { input: { alias: { foo: 1 } } },
  { input: { alias: ['foo'] } },
  {
    // It exists but is not absolute
    // file existence stubbed out in test/setup.js
    input: { root: './exists' },
    schema: schemaFn({ rules: { 'no-root-files-node-modules-nameclash': false } }),
  },
  { input: { root: '/does-not-exist' } }, // must exist
  { input: { modulesDirectories: 'node_modules' } },
  { input: { extensions: ['', 'bar'] } }, // must have leading dot
  { input: { unsafeCache: false } }, // must have true
  {
    input: { root: problematicRootPaths },
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

