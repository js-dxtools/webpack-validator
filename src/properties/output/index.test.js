import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'
import { notAbsolutePath, absolutePath, urlPart } from '../../types'

const validModuleConfigs = [
  // #0
  { filename: 'foo' },
  // #1
  { chunkFilename: 'foo' },
  // #2
  { path: 'foo/bar' },
  // #3
  { path: '/foo/bar' },
  // #4
  { publicPath: '/assets/' },
  // #5
  { publicPath: 'http://cdn.example.com/assets/[hash]/' },
  // #6
  { devtoolModuleFilenameTemplate: 'webpack:///[resourcePath]?[hash]' },
  // #7
  { devtoolModuleFilenameTemplate: () => {} },
  // #8
  { hotUpdateChunkFilename: '[id].[hash].hot-update.js' },
  // #9
  { hotUpdateMainFilename: '[hash].hot-update.json' },
  // #10
  { jsonpFunction: 'webpackJsonp' },
  // #11
  { hotUpdateFunction: 'webpackHotUpdate' },
  // #12
  { pathinfo: false },
  // #13
  { library: 'redux' },
  // #14
  { libraryTarget: 'commonjs' },
  // #15
  { crossOriginLoading: false },
  // #16
  { crossOriginLoading: 'anonymous' },
  // #17
  { hashDigestLength: 6 }, // undocumented

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
    error: { message: `"path" ${absolutePath.message}` },
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

