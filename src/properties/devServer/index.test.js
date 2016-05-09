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
  { historyApiFallback: { index: '/foo-app/' } },
  // #15
  { compress: true },
  // #16
  { port: 3000 },
  // #17
  { public: 'localhost' },
  // #18
  { host: '0.0.0.0' },
  // #19
  { publicPath: '/public/path/' },
  // #20
  { publicPath: 'public/path/' },
  // #21
  { outputPath: '/' },
  // #22
  { filename: 'bundle.js' },
  // #23
  { watchOptions: {} },
  // #24
  { hot: true },
  // #25
  { stats: {} },
  // #26
  { stats: 'none' },
  // #27
  { stats: 'errors-only' },
  // #28
  { stats: 'minimal' },
  // #29
  { stats: 'normal' },
  // #30
  { stats: 'verbose' },
  // #31
  { noInfo: true },
  // #32
  { proxy: {} },
  // #33
  { proxy: 'http://proxy.url/' },
  // #34
  { proxy: [] },
  // #35
  { staticOptions: {} },
  // #36
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

