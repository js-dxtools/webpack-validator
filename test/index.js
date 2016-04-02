import sinon from 'sinon'
import configs from './passing-configs'
import validate from '../src'

before(() => {
  !console.info.reset && sinon.stub(console, 'info')
})

describe('.', () => {
  configs.forEach(({ config, name }) => {
    it(`validates ${name}`, () => {
      validate(config)
    })
  })
})
