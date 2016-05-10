const parse = require('./script-parsers')
const validateConfig = require('./validate-config')

module.exports = function validateAllScripts(scripts, quiet) {
  Object.keys(scripts).forEach(name => {
    const script = scripts[name]
    const webpackConfigFile = parse.webpackConfig(script)

    if (script.indexOf('SET NODE_ENV=') === 0 || script.indexOf('NODE_ENV=') === 0) {
      process.env.node_env = parse.nodeEnv(script)
    } else {
      process.env.npm_lifecycle_event = name
    }

    if (!quiet) console.info('\nValidating', name)
    const validationResult = validateConfig(webpackConfigFile, quiet)

    if (validationResult.error) {
      console.info(validationResult.error.annotate())
      process.exit(1)
    } else {
      if (!quiet) console.info(`${name} is valid`)
    }
  })
}
