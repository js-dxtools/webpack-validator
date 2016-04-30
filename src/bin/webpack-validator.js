#!/usr/bin/env node

'use strict'
const fs = require('fs')
const path = require('path')
const program = require('commander')
const log = require('npmlog')
const validate = require('../')
const schema = require('../').schema
let configFile

program
  .arguments('<configFileName>')
  .action((configFileName) => {
    configFile = configFileName
  })
program.parse(process.argv)

function errorHandler(err) {
  if (err.isJoi && err.name === 'ValidationError' && err.annotate) {
    log.error(err.annotate())
  } else {
    log.error(err.message)
  }
  process.exit(1)
}

function validateConfig(webpackConfigFile) {
  console.log(`Reading: ${webpackConfigFile}`)
  const config = require(path.join(process.cwd(), webpackConfigFile))
  const validationResult = validate(config, schema, { returnValidation: true })
  if (validationResult.error) {
    console.info(validationResult.error.annotate())
    process.exit(1)
  } else {
    console.info(`${webpackConfigFile} is valid`)
    process.exit(0)
  }
}

if (! configFile) {
  const error = new Error(['No configuration file given',
    'Usage: webpack-validator-cli <configFileName>'].join('\n'))
  error.type = 'EUSAGE'
  errorHandler(error)
}

fs.stat(configFile, (err, stats) => {
  if (err) {
    err.message = `Could not find file "${configFile}"` // eslint-disable-line no-param-reassign
    errorHandler(err)
  } else {
    if (stats.isFile()) {
      validateConfig(configFile)
    } else {
      const error = new Error(`Could not find file "${configFile}"`)
      error.type = 'EISDIR'
      errorHandler(error)
    }
  }
})
