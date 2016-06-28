export function webpackConfig(script) {
  const callsWebpackCli = script.split(' ').includes('webpack')
  if (!callsWebpackCli) return undefined

  // Try to parse webpack config name. Not fool proof. Maybe
  // there's a neater way.
  const parts = script.split('--config')

  if (parts.length > 1) {
    // Pick the last part, trim and split to extract
    return parts[parts.length - 1].trim().split(' ')[0]
  }

  return 'webpack.config.js'
}

export function nodeEnv(script) {
  const parsedScript = script.indexOf('SET ') === 0 ?
    script.split('SET ')[1] :
    script

  const parts = parsedScript.split('NODE_ENV=')

  if (parts.length < 2) {
    return ''
  }

  const ret = parts[1]

  if (ret.indexOf('&&') >= 0) {
    return ret.split('&&')[0].trim()
  }

  return ret.split(' ')[0].trim()
}
