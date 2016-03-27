import glob from 'glob'
import path from 'path'
import pathParse from 'path-parse'

export default glob.sync(
  path.join(__dirname, './*.js'),
  {ignore: __filename}
).map(filePathToConfigObj)

export function filePathToConfigObj(filepath) {
  let config = require(filepath)
  if (config.default) {
    config = config.default
  }
  return {
    config,
    filepath,
    name: pathParse(filepath).name,
  }
}
