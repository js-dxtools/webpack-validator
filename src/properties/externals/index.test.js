import schema, { EXTERNALS_MESSAGE } from './index'
import { allValid, allInvalid } from '../../../test/utils'

const validModuleConfigs = [
  { input: 'dependency' },
  { input: ['dependency'] },
  {
    // from https://webpack.github.io/docs/configuration.html#externals )
    input: {
      a: false,
      b: true,
      './c': 'c',
      './d': 'var d',
    },
  },
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
  { input: /dependency/ },
  { input: (a, b, c) => { } }, // eslint-disable-line
]

const invalidModuleConfigs = [
  {
    input: {
      a: ['foo'],
      b: true,
      './c': 'c',
      './d': 'var d',
    },
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },
  {
    input: [{
      a: ['foo'],
      b: true,
      './c': 'c',
      './d': 'var d',
    }],
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },
  {
    input: 1,
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },
  {
    // Only 3-arity allowed
    input: (a, b, c, d) => { }, // eslint-disable-line
    error: { message: `"value" ${EXTERNALS_MESSAGE}` },
  },
]

describe('externals', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

