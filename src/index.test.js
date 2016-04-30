import sinon from 'sinon'
import configs from '../test/passing-configs'
import validate from './'

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

  it('for an invalid config the joi validation result is printed to console.error and ' +
     'the process exits with exit code 1', () => {
    const invalidConfig = { resolvee: 'bar' }
    validate(invalidConfig)

    // The error message should have been printed
    assert(consoleErrorStub.callCount === 1)

    // process.exit should have been called
    assert(processExitStub.callCount === 1)
  })
})
