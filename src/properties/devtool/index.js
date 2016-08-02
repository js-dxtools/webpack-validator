import Joi from 'joi'

const options = [
  'cheap-source-map',
  'cheap-eval-source-map',
  'cheap-hidden-source-map',
  'cheap-inline-source-map',
  'cheap-module-source-map',
  'cheap-module-eval-source-map',
  'cheap-module-hidden-source-map',
  'cheap-module-inline-source-map',
  'eval',
  'eval-source-map',
  'source-map',
  'hidden-source-map',
  'inline-source-map',
]

const DEVTOOL_REGEX = new RegExp(
  '^' +               // start of string
  '(#@|@|#)?' +       // maybe one of the pragmas
  `(${options.join('$|')})` // one of the options
)

export default [
  Joi.string().regex(DEVTOOL_REGEX),
  Joi.any().valid(false),
]
