import Joi from 'joi'
import { ls } from 'shelljs'
import _memoize from 'lodash/memoize'
import basename from 'basename'
import findNodeModules from 'find-node-modules'

// It's not super clean to mock this here, but i'm ok with this for now
const getNodeModulesContents = _memoize((dir) => { // eslint-disable-line arrow-body-style
  /* istanbul ignore next */
  return process.env.NODE_ENV === 'test'
    ? ['codecov', 'babel-cli']
    : new Set(ls(dir))
})

/**
 * Helpers
 */
const calculateIntersection = (set1, set2) => new Set([...set1].filter(x => set2.has(x)))

const basenameCached = _memoize(basename)

const cachedBasenameLs = _memoize((dir) => {
  // TODO: Refactor this to use webpacks `modulesDirectories` somehow
  const files = ls(`${dir}/*{.json,.js,.jsx,.ts}`)
  const folders = ls('-d', `${dir}/*/`)
  const both = [...files, ...folders]
  return new Set(both.map(basenameCached))
})

const customJoi = Joi.extend({
  base: Joi.string(),
  name: 'path',
  language: {
    noRootFilesNodeModulesNameClash:
      '\n\nWhen looking at files/folders in the root path "{{path}}",\n' +
      'I found out that there are files/folders that name clash with ' +
      'dependencies in your node_modules ({{nodeModuleFolder}}).\n' +
      'The clashing files/folders (extensions removed) are: {{conflictingFiles}}.\n' +
      'This can lead to hard to debug errors, where you for example have ' +
      'a folder "$rootDir/redux", then `require("redux")` and, instead of resolving ' +
      'the npm package "redux", *the folder "$rootDir/redux" is resolved.*\n' +
      'SOLUTION: rename the clashing files/folders.\n\n',
  },
  rules: [
    {
      name: 'noRootFilesNodeModulesNameClash',

      validate(params, path_, state, options) {
        // If the supplied resolve.root path *is* a node_module folder, we'll continue
        // The check doesn't make sense in that case
        if (/node_modules$/.test(path_)) {
          return null
        }
        // For an initial iteration this node_module resolving is quite simplistic;
        // it just takes the first node_module folder found looking upwards from the given root
        const nodeModuleFolder = findNodeModules({ cwd: path_, relative: false })[0]
        if (!nodeModuleFolder) {
          return null
        }
        const nodeModules = getNodeModulesContents(nodeModuleFolder)
        const basenames = cachedBasenameLs(path_)
        const intersection = calculateIntersection(nodeModules, basenames)
        if (intersection.size > 0) {
          return this.createError('path.noRootFilesNodeModulesNameClash', {
            path: path_,
            conflictingFiles: JSON.stringify([...intersection]),
            nodeModuleFolder,
          }, state, options)
        }
        return null // Everything is OK
      },
    },
  ],
})

export default customJoi.path().noRootFilesNodeModulesNameClash()
