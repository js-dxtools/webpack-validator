const path = require('path')
const validate = require('../')

module.exports = function validateConfig(webpackConfigFile, quiet) {
  if (!quiet) console.log(`Reading: ${webpackConfigFile}`)
  const webpackConfigPath = path.join(process.cwd(), webpackConfigFile)

  delete require.cache[
    require.resolve(webpackConfigPath)
  ]

  const config = require(webpackConfigPath)
  return validate(config, validate.schema, {
    returnValidation: true,
    quiet,
  })
}
