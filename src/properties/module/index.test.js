import schemaFn, {
  CONDITION_MESSAGE,
  LOADERS_QUERY_MESSAGE,
  LOADER_IN_LOADERS_MESSAGE,
} from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  {
    input: {
      loaders: [
        { test: 'foo', include: /src/, loader: 'babel' },
      ],
    },
  },
  {
    input: {
      loaders: [
        { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
      ],
    },
  },
  {
    input: {
      loaders: [
        { test: /\.(?:eot|ttf|woff2?)$/, loaders: ['file-loader'] },
      ],
    },
  },
  {
    input: {
      loaders: [
        { test: (absPath) => absPath && true, loaders: ['file-loader'] },
      ],
    },
  },
  {
    input: {
      loaders: [
        { test: /foo/, loaders: ['file-loader'] },
      ],
    },
  },
  {
    // should allow both `include` and `exclude with the rule 'loader-enforce-include-or-exclude'
    input: {
      loaders: [{ test: /foo/, loader: 'foo', include: 'foo', exclude: 'bar' }],
    },
    schema: schemaFn({ rules: { 'loader-enforce-include-or-exclude': true } }),
  },
  {
    // should be fine with `include` with rule 'loader-enforce-include-or-exclude'
    input: {
      loaders: [{ test: /foo/, loader: 'foo', include: 'foo' }],
    },
    schema: schemaFn({ rules: { 'loader-prefer-include': true } }),
  },
  {
    // should allow mix of objects and strings in `loaders` array
    input: {
      loaders: [
        {
          test: /foo/,
          loaders: ['style-loader', { loader: 'file-loader' }],
        },
      ],
    },
  },
  {
    input: {
      rules: [
        { test: 'foo', include: /src/, loader: 'babel' },
      ],
    },
  },
  {
    input: {
      rules: [
        { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
      ],
    },
  },
  {
    input: {
      rules: [
        { test: /\.(?:eot|ttf|woff2?)$/, use: ['file-loader'] },
      ],
    },
  },
  {
    // should allow both `include` and `exclude with the rule 'loader-enforce-include-or-exclude'
    input: {
      rules: [{ test: /foo/, loader: 'foo', include: 'foo', exclude: 'bar' }],
    },
    schema: schemaFn({ rules: { 'loader-enforce-include-or-exclude': true } }),
  },
  {
    // should be fine with `include` with rule 'loader-enforce-include-or-exclude'
    input: {
      rules: [{ test: /foo/, loader: 'foo', include: 'foo' }],
    },
    schema: schemaFn({ rules: { 'loader-prefer-include': true } }),
  },
  {
    // should allow mix of objects and strings in `loaders` array
    input: {
      rules: [
        {
          test: /foo/,
          use: ['style-loader', { loader: 'file-loader' }],
        },
      ],
    },
  },
  {
    input: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules: true } },
          ],
        },
      ],
    },
  },
]

const invalidModuleConfigs = [
  {
    input: {},
    error: { message: '"value" must contain at least one of [loaders, rules]' },
  },
  {
    input: {
      loaders: [
        { include: /bar/, loader: 'babel' },
      ],
    },
    error: { message: '"test" is required' },
  },
  {
    input: {
      loaders: [
        { test: 'foo', include: 1, loader: 'babel' },
      ],
    },
    error: { message: `"include" ${CONDITION_MESSAGE}` },
  },
  {
    input: {
      loaders: [
        { test: /\.less$/, loaders: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
      ],
    },
    error: { message: '"loaders" must be an array' },
  },
  {
    input: {
      loaders: [
        { test: /\.less$/, use: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
      ],
    },
    error: { message: '"use" must be an array' },
  },
  {
    input: {
      loaders: [
        { test: /\.less$/, loaders: [1, 2] },
      ],
    },
    error: {
      message: LOADER_IN_LOADERS_MESSAGE,
      path: 'loaders.0.loaders.0',
    },
  },
  {
    input: {
      loaders: [{ test: /\.(?:eot|ttf|woff2?)$/, loader: ['file-loader'] }],
    },
    error: { message: '"loader" must be a string' },
  },
  {
    input: {
      loaders: [{ test: /\.(?:eot|ttf|woff2?)$/, loaders: ['file-loader'], loader: 'style' }],
    },
    error: {
      message: '"value" contains a conflict between exclusive peers [loaders, loader, use]',
    },
  },
  {
    input: {
      loaders: [{ test: (foo, bar) => `${foo}-${bar}`, loaders: ['file-loader'] }],
    },
    // Only 1-arity functions are allowed
    error: { message: `"test" ${CONDITION_MESSAGE}` },
  },
  {
    input: {
      loaders: [{ query: { foo: 'bar' }, loaders: ['file-loader'], test: /foo/ }],
    },
    // query can only be supplied when `loader` property is supplied
    error: { message: `"value" ${LOADERS_QUERY_MESSAGE}` },
  },
  {
    input: {
      loaders: [{ test: /foo/ }],
    },
    error: { message: '"value" must contain at least one of [loaders, loader, use]' },
  },
  {
    input: {
      loaders: [{ test: /foo/, loader: 'foo', query: 'query' }],
    },
    error: { message: '"query" must be an object' },
  },
  {
    // doesn't include `include`
    input: {
      loaders: [{ test: /foo/, loader: 'foo' }],
    },
    schema: schemaFn({ rules: { 'loader-prefer-include': true } }),
  },
  {
    // includes `exclude` and `include`, should only use `include`
    input: {
      loaders: [{ test: /foo/, loader: 'foo', include: 'foo', exclude: 'bar' }],
    },
    schema: schemaFn({ rules: { 'loader-prefer-include': true } }),
  },
  {
    // includes `exclude`, should prefer `include`
    input: {
      loaders: [{ test: /foo/, loader: 'foo', exclude: 'bar' }],
    },
    schema: schemaFn({ rules: { 'loader-prefer-include': true } }),
  },
  {
    // should use either `include` or `exclude
    input: {
      loaders: [{ test: /foo/, loader: 'foo' }],
    },
    schema: schemaFn({ rules: { 'loader-enforce-include-or-exclude': true } }),
  },
  {
    // should enforce `loader` property, if object is found in `loaders` array
    input: {
      loaders: [{
        test: /foo/,
        loaders: [
          { query: { foo: 'bar' } },
        ],
      }],
    },
    error: {
      message: LOADER_IN_LOADERS_MESSAGE,
      path: 'loaders.0.loaders.0',
    },
  },
  {
    // should disallow properties, other than `loader` and `query`
    // in objects inside the `loaders` array
    input: {
      loaders: [{
        test: /foo/,
        loaders: [
          { loader: 'foo', query: { foo: 'bar' }, include: /foo/ },
        ],
      }],
    },
    error: {
      message: LOADER_IN_LOADERS_MESSAGE,
      path: 'loaders.0.loaders.0',
    },
  },
]

const moduleSchema = schemaFn({
  rules: {
  },
})

describe('module', () => {
  allValid(validModuleConfigs, moduleSchema)
  allInvalid(invalidModuleConfigs, moduleSchema)
})
