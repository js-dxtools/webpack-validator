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

  it('should return undefined when script does not call the webpack cli', () => {
    const sciptsThatDoNotCallWebpackCli = [
      'karma start',
      'istanbul check-coverage --statements 23 --branches 5 --functions 9 --lines 24',
      'npm test -- --auto-watch --no-single-run',
      'npm-run-all --parallel validate-webpack:* lint test --serial check-coverage',
      'webpack-validator webpack.config.js --env.dev',
      'webpack-validator webpack.config.js --env.prod',
      'rimraf dist',
      'cpy src/index.html src/favicon.ico dist',
      'npm run clean-dist && npm run copy-files',
      'npm run clean-and-copy',
      'webpack-dev-server --env.dev --content-base dist',
      'npm run clean-and-copy',
      'eslint .',
      'npm install && npm run validate',
    ]

    sciptsThatDoNotCallWebpackCli.forEach(script => {
      assert(
        webpackConfig(script) === undefined
      )
    })
  })

  it('should not return undefined when script calls the webpack cli', () => {
    const scriptsThatCallWebpacCli = [
      'webpack --env.dev',
      'webpack --env.prod -p',
      'NODE_ENV=development webpack --config demo.js',
      'webpack --profile --json > stats.json',
    ]

    scriptsThatCallWebpacCli.forEach(script => {
      assert(
        webpackConfig(script) !== undefined
      )
    })
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
