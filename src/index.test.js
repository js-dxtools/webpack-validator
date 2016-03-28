import sinon from 'sinon'
import configs from '../test/passing-configs'
import validate from './'

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
