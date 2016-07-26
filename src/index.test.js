import sinon from 'sinon'
import configs from '../test/passing-configs'
import failingConfigs from '../test/failing-configs'
import { validateRoot as validate, Joi } from './'
const validatecjs = require('./')

describe('.', () => {
  let sandbox
  let processExitStub
  let consoleInfoStub
  let consoleErrorStub
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    consoleInfoStub = sandbox.stub(console, 'info')
    consoleErrorStub = sandbox.stub(console, 'error')
    processExitStub = sandbox.stub(process, 'exit')
  })
  afterEach(() => {
    sandbox.restore()
  })

  configs.forEach(({ config, name }) => {
    it(`validates ${name}`, () => {
      validate(config)

      // The success message should have been printed
      assert(consoleInfoStub.callCount === 1)

      // The error message should not have been printed
      if (consoleErrorStub.callCount !== 0) {
        throw new Error(consoleErrorStub.args[0])
      }
      // process.exit should not have been called
      assert(processExitStub.callCount === 0)
    })
  })

  configs.forEach(({ config, name }) => {
    // This is not the multi-compiler, so we explictly pull that configuration out
    if (name === 'webpack-multi-compiler') return

    it(`validates ${name} using CJS`, () => {
      validatecjs(config)

      // The success message should have been printed
      assert(consoleInfoStub.callCount === 0)

      // The error message should not have been printed
      if (consoleErrorStub.callCount !== 0) {
        throw new Error(consoleErrorStub.args[0])
      }
      // process.exit should not have been called
      assert(processExitStub.callCount === 0)
    })
  })

  failingConfigs.forEach(({ config, name }) => {
    it(`throws for ${name}`, () => {
      validate(config)
      // The error message should have been printed
      assert(consoleErrorStub.callCount === 1)

      // process.exit should have been called
      assert(processExitStub.callCount === 1)
    })
  })

  it('should allow console output to be muted', () => {
    validate({}, { quiet: true })

    // The success message should not have been printed
    assert(consoleInfoStub.callCount === 0)

    // The error message should not have been printed
    if (consoleErrorStub.callCount !== 0) {
      throw new Error(consoleErrorStub.args[0])
    }
    // process.exit should not have been called
    assert(processExitStub.callCount === 0)
  })

  const fooSchema = Joi.object({ foo: Joi.string() })

  it('should allow the schema to be extended', () => {
    const result1 = validate({ foo: 'bar' }, { returnValidation: true })
    const result2 = validate({ foo: 'bar' }, {
      returnValidation: true,
      schemaExtension: fooSchema,
    })
    assert(result1.error)
    assert(!result2.error)
  })

  it('should allow the schema to be overridden', () => {
    const result = validate({ foo: 'bar' }, {
      schema: fooSchema,
      returnValidation: true,
    })
    assert(!result.error)
  })

  it('should allow overriding rules', () => {
    const result = validate({ foo: 'bar' }, {
      rules: {
        foo: true,
        'no-root-files-node-modules-nameclash': false,
      },
      returnValidation: true,
    })
    assert(result.schemaOptions.rules.foo)
    assert(result.schemaOptions.rules['no-root-files-node-modules-nameclash'] === false)
    // Will be merged with default rules, so length def greater then 1
    assert(Object.keys(result.schemaOptions.rules).length > 1)
  })
})
