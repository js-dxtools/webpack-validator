import Joi from 'joi'

export default Joi.string().valid([
  'web',
  'webworker',
  'node',
  'async-node',
  'node-webkit',
  'electron',
])
