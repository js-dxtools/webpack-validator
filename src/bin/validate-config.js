const path = require('path')
const validate = require('../index').validateRoot
const argv = require('yargs').argv

module.exports = function validateConfig(webpackConfigFile, quiet) {
  if (!quiet) console.log(`Reading: ${webpackConfigFile}`)
  const webpackConfigPath = path.join(process.cwd(), webpackConfigFile)

  delete require.cache[
    require.resolve(webpackConfigPath)
  ]

  const config = require(webpackConfigPath)
  const configToValidate = typeof config === 'function' ? config(argv.env, argv) : config
  return validate(configToValidate, validate.schema, {
    returnValidation: true,
    quiet,
  })
}
