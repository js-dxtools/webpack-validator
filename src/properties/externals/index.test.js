import schema, { EXTERNALS_MESSAGE } from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  // #0
  { input: 'dependency' },

  // #1
  { input: ['dependency'] },

  // #2 ( from https://webpack.github.io/docs/configuration.html#externals )
  {
    input: {
      a: false,
      b: true,
      './c': 'c',
      './d': 'var d',
    },
  },

  // #3 ( from real life )
  {
    input: [
      {
        angular: 'angular',
        'api-check': {
          root: 'apiCheck',
          amd: 'api-check',
          commonjs2: 'api-check',
          commonjs: 'api-check',
        },
      },
    ],
  },

  // #4
  { input: /dependency/ },

  // #5
  { input: (a, b, c) => { } }, // eslint-disable-line
]

const invalidModuleConfigs = [
  // #0
  {
    input: {
      a: ['foo'],
      b: true,
      './c': 'c',
      './d': 'var d',
    },
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },

  // #1
  {
    input: [{
      a: ['foo'],
      b: true,
      './c': 'c',
      './d': 'var d',
    }],
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },

  // #2
  {
    input: 1,
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },

  // #3
  // Only 3-arity allowed
  {
    input: (a, b, c, d) => { }, // eslint-disable-line
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },
]

describe('externals', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

