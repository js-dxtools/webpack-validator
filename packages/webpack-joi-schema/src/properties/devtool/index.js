import Joi from 'joi'

const options = [
  'eval',
  'cheap-eval-source-map',
  'cheap-source-map',
  'cheap-module-eval-source-map',
  'cheap-module-source-map',
  'eval-source-map',
  'source-map',
  'hidden-source-map',
  'inline-source-map',
]

const DEVTOOL_REGEX = new RegExp(
  '^' +               // start of string
  '(#@|@|#)?' +       // maybe one of the pragmas
  `(${options.join('|')})` // one of the options
)

export default Joi
  .string()
  .regex(DEVTOOL_REGEX)
