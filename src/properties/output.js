import Joi from 'joi'

// Not an absolute path (not starting with / and not containing /
const notAPath = Joi.string().regex(/^(?!\/)[^\/]+$/)

export default Joi.object({
  filename: notAPath,
  chunkFilename: notAPath,
})

