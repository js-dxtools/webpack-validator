import Joi from 'joi'

export default Joi.array().items([Joi.func(), Joi.object()])
