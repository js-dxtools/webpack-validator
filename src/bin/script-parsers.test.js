import { webpackConfig, nodeEnv } from './script-parsers'

describe('webpack config name parser', () => {
  it('should parse --config', () => {
    assert(
      webpackConfig('NODE_ENV=development webpack --config demo.js') === 'demo.js'
    )
  })

  it('should default to webpack.config.js', () => {
    assert(
      webpackConfig('webpack --profile --json > stats.json') === 'webpack.config.js'
    )
  })
})

describe('node env parser', () => {
  it('should parse SET NODE_ENV', () => {
    assert(nodeEnv('SET NODE_ENV=development&& webpack') === 'development')
  })

  it('should parse NODE_ENV', () => {
    assert(nodeEnv('NODE_ENV=development webpack') === 'development')
  })

  it('should not parse invalid input', () => {
    assert(nodeEnv('foobar') === '') // throw error instead?
  })
})
