/* eslint-disable */

require('babel-register')({
  plugins: ['babel-plugin-espower']
});

const assert = require('power-assert');
global.assert = assert;

const sinon = require('sinon')
const shell = require('shelljs')

// Its to expensive to run filesystem io-bound tests,
// also the behaviour on travis is a bit weird
sinon.stub(shell, 'test', function(_, value) {
  const foo =  /exists/.test(value)
  return foo
})

sinon.stub(shell, 'ls', function(path_, couldBePath) {
  const path = path_ === '-d' ? couldBePath : path_ // hack around the funny interface -.- :)
  if (/does-not-exist/.test(path)) {
    return []
  } else if (/exists-with-babel-cli-js/.test(path)) {
    return ['babel-cli.js']
  } else if (/exists-with-codecov-folder/.test(path)) {
    // When we want the folders (via "-d"), return the folder "codecov"
    if (path_ === '-d') {
      return ['codecov']
    } else {
      return []
    }
  } else if (/exists-with-node-modules\/node_modules/.test(path)) {
    return ['babel-cli.js'] // should not be a problem
  } else if (/exists/.test(path)) {
    return ['stuff']
  } else {
    throw new Error(
      `You should handle the path "${path}" in the shell.ls stub. ` +
      'It its a path that should not exist, include the string "does-not-exist", ' +
      'It it should exist, include the string "exists", '
    )
  }
})
