import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'
import { urlPart } from '../../types'

const validModuleConfigs = [
  // #0
  { lazy: true },
  // #1
  { inline: true },
  // #2
  { stdin: true },
  // #2
  { open: true },
  // #4
  { info: true },
  // #5
  { quiet: true },
  // #6
  { https: true },
  // #7
  { key: '/path/to/key' },
  // #8
  { cert: 'path/to/cert' },
  // #9
  { cacert: 'path/to/cacert' },
  // #10
  { contentBase: '/content/base' },
  // #11
  { contentBase: { target: '/content/base/' } },
  // #12
  { contentBase: ['/content/base/'] },
  // #13
  { historyApiFallback: true },
  // #14
  { compress: true },
  // #15
  { port: 3000 },
  // #16
  { public: 'localhost' },
  // #17
  { host: '0.0.0.0' },
  // #18
  { publicPath: '/public/path/' },
  // #19
  { publicPath: 'public/path/' },
  // #20
  { outputPath: '/' },
  // #21
  { filename: 'bundle.js' },
  // #22
  { watchOptions: {} },
  // #23
  { hot: true },
  // #24
  { stats: {} },
  // #25
  { stats: 'none' },
  // #26
  { stats: 'errors-only' },
  // #27
  { stats: 'minimal' },
  // #28
  { stats: 'normal' },
  // #29
  { stats: 'verbose' },
  // #30
  { noInfo: true },
  // #31
  { proxy: {} },
  // #32
  { proxy: 'http://proxy.url/' },
  // #33
  { proxy: [] },
  // #34
  { staticOptions: {} },
  // #35
  { headers: {} },
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

