import Joi from 'joi'
/* eslint-disable max-len */
export const EXTERNALS_MESSAGE = `There was something wrong with how you specified the externals.
Webpack documentation excerpt:

As value an object, a string, a function, a RegExp and an array is accepted.

- string: An exact matched dependency becomes external. The same string is used as external dependency.
- object: If an dependency matches exactly a property of the object, the property value is used as dependency. The property value may contain a dependency type prefixed and separated with a space. If the property value is true the property name is used instead. If the property value is false the externals test is aborted and the dependency is not external. See example below.
- function: function(context, request, callback(err, result)) The function is called on each dependency. If a result is passed to the callback function this value is handled like a property value of an object (above bullet point).
- RegExp: Every matched dependency becomes external. The matched text is used as the request for the external dependency. Because the request is the exact code used to generate the external code hook, if you are matching a commonjs package (e.g. ‘../some/package.js’), instead use the function external strategy. You can import the package via callback(null, "require('" + request + "')", which generates a module.exports = require('../some/package.js');, using require outside of webpack context.
- array: Multiple values of the scheme (recursive).

(see https://webpack.github.io/docs/configuration.html#externals )`
/* eslint-enable max-len */

const externalObjectSchema = Joi.object().pattern(/.+/, [
  Joi.string(),
  Joi.boolean(),
  Joi.object().pattern(/.+/, [Joi.string(), Joi.boolean()]),
])

const externalSchema = [
  externalObjectSchema,
  Joi.string(),
  Joi.func().arity(3),
  Joi.object().type(RegExp),
]

export default Joi.array()
  .items(externalSchema)
  .single()
  .options({ language: { array: {
    includesSingle: EXTERNALS_MESSAGE,
    includes: EXTERNALS_MESSAGE,
  } } })
