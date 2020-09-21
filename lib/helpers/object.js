/**
 * Object helper from consis (https://github.com/adrienv1520/consis).
 *
 *    - exists(thing) -> Boolean
 *    - is(Type, thing) -> Boolean
 */

/**
 * @func exists
 *
 * whether the specified value is not null, undefined or NaN
 * @param  {Any} thing
 * @return {Boolean}
 */
const exists = function exists(thing) {
  return !(thing === undefined || thing === null || Number.isNaN(thing));
};

/**
 * @func is
 *
 * whether the specified value is from the specified type regarding its whole prototype
 * @param  {Function} Type a type function
 * @param  {Any} thing
 * @return {Boolean}
 */
const is = function is(Type, thing) {
  return exists(Type)
  && exists(thing)
  && (thing.constructor === Type
  || thing instanceof Type);
};

module.exports = Object.freeze({
  exists,
  is,
});
