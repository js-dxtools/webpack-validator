import moduleSchema, { CONDITION_MESSAGE, LOADERS_QUERY_MESSAGE } from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  {
    loaders: [
      { test: 'foo', include: /src/, loader: 'babel' },
    ],
  },
  {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
    ],
  },
  {
    loaders: [
      { test: /\.(?:eot|ttf|woff2?)$/, loaders: ['file-loader'] },
    ],
  },
  {
    loaders: [
      { test: (absPath) => absPath && true, loaders: ['file-loader'] },
    ],
  },
]

const invalidModuleConfigs = [
  // #0
  {
    input: {
      loaders: [
        { include: /bar/, loader: 'babel' },
      ],
    },
    error: { message: '"test" is required' },
  },
  // #1
  {
    input: {
      loaders: [
        { test: 'foo', include: 1, loader: 'babel' },
      ],
    },
    error: { message: `"include" ${CONDITION_MESSAGE}` },
  },
  // #2
  {
    input: {
      loaders: [
        { test: /\.less$/, loaders: 'style-loader!css-loader!autoprefixer-loader!less-loader' },
      ],
    },
    error: { message: '"loaders" must be an array' },
  },
  // #3
  {
    input: {
      loaders: [{ test: /\.(?:eot|ttf|woff2?)$/, loader: ['file-loader'] }],
    },
    error: { message: '"loader" must be a string' },
  },
  // #4
  {
    input: {
      loaders: [{ test: /\.(?:eot|ttf|woff2?)$/, loaders: ['file-loader'], loader: 'style' }],
    },
    error: { message: '"value" contains a conflict between exclusive peers [loaders, loader]' },
  },
  // #5
  {
    input: {
      loaders: [{ test: (foo, bar) => `${foo}-${bar}`, loaders: ['file-loader'] }],
    },
    // One 1-arity functions are allowed
    error: { message: `"test" ${CONDITION_MESSAGE}` },
  },
  // #6
  {
    input: {
      loaders: [{ query: { foo: 'bar' }, loaders: ['file-loader'], test: /foo/ }],
    },
    // query can only be supplied when `loader` property is supplied
    error: { message: `"value" ${LOADERS_QUERY_MESSAGE}` },
  },
]

describe('module', () => {
  allValid(validModuleConfigs, moduleSchema)
  allInvalid(invalidModuleConfigs, moduleSchema)
})
