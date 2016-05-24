import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'
import { notAbsolutePath, urlPart } from '../../types'

const validModuleConfigs = [
  { input: { filename: 'foo' } },
  { input: { chunkFilename: 'foo' } },
  { input: { path: 'exists' } },
  // Does not start with ./ or ../ so it "looks like an absolute path"
  { input: { path: 'doesnt_actually' } },
  { input: { publicPath: '/assets/' } },
  { input: { devtoolModuleFilenameTemplate: () => {} } },
  { input: { hotUpdateChunkFilename: '[id].[hash].hot-update.js' } },
  { input: { hotUpdateMainFilename: '[hash].hot-update.json' } },
  { input: { jsonpFunction: 'webpackJsonp' } },
  { input: { hotUpdateFunction: 'webpackHotUpdate' } },
  { input: { pathinfo: false } },
  { input: { library: 'redux' } },
  { input: { library: ['redux', '[name]'] } },
  { input: { libraryTarget: 'commonjs' } },
  { input: { crossOriginLoading: false } },
  { input: { crossOriginLoading: 'anonymous' } },
  { input: { crossOriginLoading: 'anonymous' } },
  { input: { publicPath: '' } },
]

const invalidModuleConfigs = [
  {
    input: { filename: '/foo/bar' },
    error: { message: `"filename" ${notAbsolutePath.message}` },
  },
  {
    input: { chunkFilename: '/foo/bar' },
    error: { message: `"chunkFilename" ${notAbsolutePath.message}` },
  },
  {
    input: { path: './foo/bar' },
    error: { type: 'path.absolute' },
  },
  {
    input: { publicPath: './foo' },
    error: { message: `"publicPath" ${urlPart.message}` },
  },
  {
    input: { publicPath: '/foo' },
    error: { message: `"publicPath" ${urlPart.message}` },
  },
  {
    input: { devtoolModuleFilenameTemplate: '/foo' },
    error: { message: `"devtoolModuleFilenameTemplate" ${notAbsolutePath.message}` },
  },
  {
    input: { libraryTarget: 'comonjs' },
    error: { message: '"libraryTarget" must be one of [var, this, commonjs, commonjs2, amd, umd]' },
  },
  {
    input: { crossOriginLoading: 'annonymous' },
    error: { message: '"crossOriginLoading" should be `false`, "anonymous" or "use-credentials"' },
  },
  {
    input: { fileName: 'foo' },
    error: { message: '"fileName" is not allowed' },
  },
  {
    input: { fileName: 'foo' },
    error: { message: '"fileName" is not allowed' },
  },
  { input: { library: ['redux', 1] } },

]

describe('output', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

