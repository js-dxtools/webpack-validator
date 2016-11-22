import schema from './index'
import { allValid, allInvalid } from '../../../test/utils'
import { urlPart } from '../../types'

const validModuleConfigs = [
  { input: { lazy: true } },
  { input: { inline: true } },
  { input: { stdin: true } },
  { input: { open: true } },
  { input: { info: true } },
  { input: { quiet: true } },
  { input: { https: true } },
  { input: { key: 'key contents' } },
  { input: { key: new Buffer('key contents') } },
  { input: { cert: 'cert contents' } },
  { input: { cert: new Buffer('cert contents') } },
  { input: { ca: 'ca contents' } },
  { input: { ca: ['ca contents 1', new Buffer('ca contents 2')] } },
  { input: { contentBase: '/content/base' } },
  { input: { contentBase: { target: '/content/base/' } } },
  { input: { contentBase: ['/content/base/'] } },
  { input: { historyApiFallback: true } },
  { input: { historyApiFallback: { index: '/foo-app/' } } },
  { input: { compress: true } },
  { input: { port: 3000 } },
  { input: { public: 'localhost' } },
  { input: { host: '0.0.0.0' } },
  { input: { publicPath: '/public/path/' } },
  { input: { publicPath: 'public/path/' } },
  { input: { outputPath: '/' } },
  { input: { filename: 'bundle.js' } },
  { input: { watchOptions: {} } },
  { input: { hot: true } },
  { input: { stats: {} } },
  { input: { stats: 'none' } },
  { input: { stats: 'errors-only' } },
  { input: { stats: 'minimal' } },
  { input: { stats: 'normal' } },
  { input: { stats: 'verbose' } },
  { input: { noInfo: true } },
  { input: { proxy: {} } },
  { input: { proxy: [] } },
  { input: { staticOptions: {} } },
  { input: { headers: {} } },
  { input: { localAddress: "1.2.3.4:30"} },
  { input: { logLevel: "debug"} },
]

const invalidModuleConfigs = [
  { input: { publicPath: 'public/path' }, error: { message: `"publicPath" ${urlPart.message}` } },
  { input: { outputPath: './output/path' }, error: { message: `"outputPath" ${urlPart.message}` } },
  { input: { watchOptions: true } },
  { input: { stats: true } },
  { input: { stats: 'foobar' } },
  { input: { proxy: true } },
  { input: { localAddress: '1.2.3.4'} },
  { input: { logLevel: 'insane'} },
]

describe('devServer', () => {
  allValid(validModuleConfigs, schema)
  allInvalid(invalidModuleConfigs, schema)
})

