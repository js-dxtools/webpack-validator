import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'
import { urlPart } from '../../types'

const validModuleConfigs = [
  // #0
  { input: { lazy: true } },
  // #1
  { input: { inline: true } },
  // #2
  { input: { stdin: true } },
  // #2
  { input: { open: true } },
  // #4
  { input: { info: true } },
  // #5
  { input: { quiet: true } },
  // #6
  { input: { https: true } },
  // #7
  { input: { key: '/path/to/key' } },
  // #8
  { input: { cert: 'path/to/cert' } },
  // #9
  { input: { cacert: 'path/to/cacert' } },
  // #10
  { input: { contentBase: '/content/base' } },
  // #11
  { input: { contentBase: { target: '/content/base/' } } },
  // #12
  { input: { contentBase: ['/content/base/'] } },
  // #13
  { input: { historyApiFallback: true } },
  // #14
  { input: { historyApiFallback: { index: '/foo-app/' } } },
  // #15
  { input: { compress: true } },
  // #16
  { input: { port: 3000 } },
  // #17
  { input: { public: 'localhost' } },
  // #18
  { input: { host: '0.0.0.0' } },
  // #19
  { input: { publicPath: '/public/path/' } },
  // #20
  { input: { publicPath: 'public/path/' } },
  // #21
  { input: { outputPath: '/' } },
  // #22
  { input: { filename: 'bundle.js' } },
  // #23
  { input: { watchOptions: {} } },
  // #24
  { input: { hot: true } },
  // #25
  { input: { stats: {} } },
  // #26
  { input: { stats: 'none' } },
  // #27
  { input: { stats: 'errors-only' } },
  // #28
  { input: { input: { stats: 'minimal' } } },
  // #29
  { input: { stats: 'normal' } },
  // #30
  { input: { stats: 'verbose' } },
  // #31
  { input: { noInfo: true } },
  // #32
  { input: { proxy: {} } },
  // #33
  { input: { proxy: 'http://proxy.url/' } },
  // #34
  { input: { proxy: [] } },
  // #35
  { input: { staticOptions: {} } },
  // #36
  { input: { headers: {} } },
]

const invalidModuleConfigs = [
  // #0
  { input: { publicPath: 'public/path' }, error: { message: `"publicPath" ${urlPart.message}` } },
  // #1
  { input: { outputPath: './output/path' }, error: { message: `"outputPath" ${urlPart.message}` } },
  // #2
  { input: { watchOptions: true } },
  // #3
  { input: { stats: true } },
  // #4
  { input: { stats: 'foobar' } },
  // #5
  { input: { proxy: true } },
]

describe('output', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

