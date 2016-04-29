import sinon from 'sinon'
import configs from '../../../test/passing-configs'
import validate from './'
import schema from 'webpack-joi-schema'

before(() => {
  !console.info.reset && sinon.stub(console, 'info')
})

describe('webpack-validator', () => {
  const someValidConfig = configs[0].config
  it('validates a config and returns it, ' +
     'taking the default schema when not supplied as 2nd arg', () => {
    const result = validate(someValidConfig)
    assert(result === someValidConfig)
  })

  it('validates a config and returns it, ' +
     'taking 2nd arg as schema', () => {
    const result = validate(someValidConfig, schema)
    assert(result === someValidConfig)
  })
})
