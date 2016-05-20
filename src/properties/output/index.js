import Joi from 'joi'
import { notAbsolutePath, absolutePath, urlPart } from '../../types'

export default Joi.object({
  filename: notAbsolutePath,
  path: absolutePath,
  publicPath: urlPart,
  chunkFilename: notAbsolutePath,
  sourceMapFilename: notAbsolutePath,
  devtoolModuleFilenameTemplate: [notAbsolutePath, Joi.func()],
  devtoolFallbackModuleFilenameTemplate: [notAbsolutePath, Joi.func()],
  devtoolLineToLine: Joi.any(),
  hashDigestLength: Joi.number(),
  hotUpdateChunkFilename: notAbsolutePath,
  hotUpdateMainFilename: notAbsolutePath,
  jsonpFunction: Joi.string(),
  hotUpdateFunction: Joi.string(),
  pathinfo: Joi.bool(),
  library: notAbsolutePath,
  libraryTarget: Joi.string().valid(['var', 'this', 'commonjs', 'commonjs2', 'amd', 'umd']),
  umdNamedDefine: Joi.bool(),
  sourcePrefix: Joi.string(),
  crossOriginLoading: Joi.alternatives().try([
    Joi.bool().valid(false),
    Joi.string().valid(['anonymous', 'use-credentials']),
  ]).options({ language: { boolean: {
    base: 'should be `false`, "anonymous" or "use-credentials"' } } }),
})

