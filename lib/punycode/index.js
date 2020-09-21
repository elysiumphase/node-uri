/**
 * punycode and punydecode
 *
 * - punycode(domain) -> String
 * - punydecode(domain) -> String
 */
const { domainToASCII, domainToUnicode } = require('url');
const { object: { is } } = require('../helpers');

/**
 * @func punycode
 *
 * Returns the Punycode ASCII serialization of the domain.
 * If domain is an invalid domain, the empty string is returned.
 *
 * Native function throws if no domain is provided
 * or returns 'null', 'undefined', 'nan' for null, undefined or NaN values
 * which is totally not what to be expected.
 *
 * @param  {String} domain
 * @return {String}
 */
const punycode = function punycode(domain) {
  return is(String, domain) ? domainToASCII(domain) : '';
};

/**
 * @func punydecode
 *
 * Returns the Unicode serialization of the domain.
 * If domain is an invalid domain, the empty string is returned.
 *
 * Native function throws if no domain is provided
 * or returns 'null', 'undefined', 'nan' for null, undefined or NaN values
 * which is totally not what to be expected.
 *
 * @param  {String} domain
 * @return {String}
 */
const punydecode = function punydecode(domain) {
  return is(String, domain) ? domainToUnicode(domain) : '';
};

module.exports = Object.freeze({
  punycode,
  punydecode,
});
