import validate from '../../src/index'

export default (configs, schema) => {
  configs.forEach((validConfig, n) => {
    it(`valid #${n} should be valid`, () => {
      validate(validConfig, schema)
    })
  })
}
