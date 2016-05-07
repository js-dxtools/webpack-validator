import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'
import { notAbsolutePath, urlPart } from '../../types'

const validModuleConfigs = [
  // #0
  { input: { filename: 'foo' } },
  // #1
  { input: { chunkFilename: 'foo' } },
  // #2
  { input: { path: __dirname } },
  // #3
  { input: { publicPath: '/assets/' } },
  // #4
  { input: { publicPath: 'http://cdn.example.com/assets/[hash]/' } },
  // #5
  { input: { devtoolModuleFilenameTemplate: 'webpack:///[resourcePath]?[hash]' } },
  // #6
  { input: { devtoolModuleFilenameTemplate: () => {} } },
  // #7
  { input: { hotUpdateChunkFilename: '[id].[hash].hot-update.js' } },
  // #8
  { input: { hotUpdateMainFilename: '[hash].hot-update.json' } },
  // #9
  { input: { jsonpFunction: 'webpackJsonp' } },
  // #10
  { input: { hotUpdateFunction: 'webpackHotUpdate' } },
  // #11
  { input: { pathinfo: false } },
  // #12
  { input: { library: 'redux' } },
  // #13
  { input: { libraryTarget: 'commonjs' } },
  // #14
  { input: { crossOriginLoading: false } },
  // #15
  { input: { crossOriginLoading: 'anonymous' } },
  // #16
  { input: { crossOriginLoading: 'anonymous' } },
  // #17
  { input: { hashDigestLength: 6 } }, // undocumented
  // #18
  { input: { publicPath: '' } },
]

const invalidModuleConfigs = [
  // #0
  {
    input: {
      filename: '/foo/bar',
    },
    error: { message: `"filename" ${notAbsolutePath.message}` },
  },
  // #1
  {
    input: {
      chunkFilename: '/foo/bar',
    },
    error: { message: `"chunkFilename" ${notAbsolutePath.message}` },
  },
  // #2
  {
    input: {
      path: './foo/bar',
    },
    error: { type: 'path.absolute' },
  },
  // #3
  {
    input: {
      publicPath: './foo',
    },
    error: { message: `"publicPath" ${urlPart.message}` },
  },
  // #4
  {
    input: {
      publicPath: '/foo',
    },
    error: { message: `"publicPath" ${urlPart.message}` },
  },
  // #5
  {
    input: {
      devtoolModuleFilenameTemplate: '/foo',
    },
    error: { message: `"devtoolModuleFilenameTemplate" ${notAbsolutePath.message}` },
  },
  // #6
  {
    input: {
      libraryTarget: 'comonjs',
    },
    error: { message: '"libraryTarget" must be one of [var, this, commonjs, commonjs2, amd, umd]' },
  },
  // #6
  {
    input: {
      crossOriginLoading: 'annonymous',
    },
    error: { message: '"crossOriginLoading" should be `false`, "anonymous" or "use-credentials"' },
  },
  // #7
  {
    input: {
      fileName: 'foo',
    },
    error: { message: '"fileName" is not allowed' },
  },

]

describe('output', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

