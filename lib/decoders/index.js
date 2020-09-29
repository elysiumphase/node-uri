/**
 * decoders
 *
 * - decodeURIComponentString(component, { sitemap, lowercase } = {}) -> String
 * - decodeURIString(uri, { sitemap, lowercase } = {}) -> String throws URIError
 * - decodeWebURL(uri, { lowercase } = {}) -> String
 * - decodeSitemapURL(uri, { lowercase } = {}) -> String
 */
const { maxLengthURL } = require('../config');
const { checkURISyntax, checkSchemeChars } = require('../checkers');
const { cast: { int }, object: { exists, is } } = require('../helpers');
const { recomposeURI } = require('../parser');
const { isDomain } = require('../domain');
const { isIP } = require('../ip');
const {
  escapeCodes,
  escapeCodesKeys,
  pencodings,
  pencodingsKeys,
} = require('../sitemap');

/**
 * @func decodeURIComponentString
 *
 * Decode an URI component string with Sitemap's escape codes support.
 *
 * Native function decodeURIComponent could throw and to be consistent with
 * encodeURIComponentString the empty string is returned if unable to decode.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} uri
 * @param  {Boolean} sitemap
 * @param  {Boolean} lowercase
 * @return {String}
 */
const decodeURIComponentString = function decodeURIComponentString(
  component,
  { sitemap, lowercase } = {},
) {
  if (!is(String, component)) {
    return '';
  }

  const componentToDecode = lowercase === true ? component.toLowerCase() : component;

  if (sitemap === true) {
    const regexp = new RegExp(escapeCodesKeys.concat(pencodingsKeys).join('|'), 'g');
    const uriToDecode = componentToDecode.replace(
      regexp,
      (match) => escapeCodes[match] || pencodings[match],
    );

    try {
      return decodeURIComponent(uriToDecode);
    } catch (e) {
      return '';
    }
  }

  try {
    return decodeURIComponent(componentToDecode);
  } catch (e) {
    return '';
  }
};

/**
 * @func decodeURIString
 *
 * Decode an URI string according to RFC-3986 with basic checking.
 *
 * Checked:
 * - scheme is required;
 * - path is required, can be empty;
 * - port, if any, must be a number;
 * - host must be a valid ip or domain name;
 * - maximum size once encoded for URLs.
 *
 * Support:
 * - IDNs: returns URI with its Punydecoded host (Unicode serialization of the domain), if any;
 * - lower and upper case.
 *
 * Note:
 * - if one of userinfo, path, query or fragment component cannot be decoded, it will be ignored;
 * - native function decodeURI does not support IDNs and cannot properly work
 *   with encodeURI since the function is based on an outdated standard;
 * - to stay fully RFC-3986 compliant, scheme and host are put in lowercase;
 * - to only use with encodeURIString.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} uri
 * @param  {Boolean} sitemap
 * @param  {Boolean} lowercase
 * @return {String}
 * @throws {URIError}
 */
const decodeURIString = function decodeURIString(uri, { web, sitemap, lowercase } = {}) {
  const uriToDecode = is(String, uri) && lowercase === true ? uri.toLowerCase() : uri;
  const webURL = web === true || sitemap === true;

  // check uri type and syntax
  const {
    scheme,
    authority,
    userinfo,
    host,
    hostPunydecoded,
    port,
    path,
    query,
    fragment,
    schemeLen,
  } = checkURISyntax(uriToDecode);

  // scheme must be http or https for web/sitemap or with valid chars, always in lowercase
  if (webURL) {
    if (scheme !== 'http' && scheme !== 'https') {
      const error = new URIError(`scheme must be http or https, got '${scheme}'`);
      error.code = 'URI_INVALID_SCHEME';
      throw error;
    }
  } else {
    // check scheme characters, it is not intended to decode a scheme
    checkSchemeChars(scheme, schemeLen);
  }

  // authority is required and must be a valid host for web/sitemap
  if (webURL && !is(String, authority)) {
    const error = new URIError('authority is required');
    error.code = 'URI_MISSING_AUTHORITY';
    throw error;
  }

  // check host is a valid ip first (RFC-3986) or a domain name
  if (exists(host) && !isIP(host) && !isDomain(host)) {
    const error = new URIError(`host must be a valid ip or domain name, got '${host}'`);
    error.code = 'URI_INVALID_HOST';
    throw error;
  }

  // check port is a number if any
  if (exists(port) && int(port) === undefined) {
    const error = new URIError(`port must be a number, got '${port}'`);
    error.code = 'URI_INVALID_PORT';
    throw error;
  }

  // userinfo
  // pass lowercase to false option since whole uri has been lowercased if true
  const userinfoDecoded = decodeURIComponentString(
    userinfo,
    { sitemap, lowercase: false },
  );

  // path
  const pathDecoded = decodeURIComponentString(
    path,
    { sitemap, lowercase: false },
  );

  // query
  const queryDecoded = decodeURIComponentString(
    query,
    { sitemap, lowercase: false },
  );

  // fragment
  const fragmentDecoded = decodeURIComponentString(
    fragment,
    { sitemap, lowercase: false },
  );

  const uridecoded = recomposeURI({
    scheme,
    port,
    host: hostPunydecoded,
    userinfo: userinfoDecoded,
    path: pathDecoded,
    query: queryDecoded,
    fragment: fragmentDecoded,
  });

  if (webURL && uridecoded.length > maxLengthURL) {
    const error = new URIError(`max URL length of ${maxLengthURL} reached: ${uridecoded.length}`);
    error.code = 'URI_MAX_LENGTH_URL';
    throw error;
  }

  return uridecoded;
};

/**
 * @func decodeWebURL
 *
 * Decode an URI string with basic checking based on RFC-3986 standard applied
 * to HTTP and HTTPS URLs.
 *
 * Uses a fixed decodeURI function to be RFC-3986 compliant.
 *
 * Checked:
 * - scheme must be http/HTTP or https/HTTPS;
 * - path is required, can be empty;
 * - authority is required;
 * - port, if any, must be a number;
 * - parseURI prechecked host, will be null if invalid and so does authority.
 *
 * Support:
 * - IDNs: returns URI with its Punydecoded host
 *   (Unicode serialization of the domain), if any;
 * - lower and upper case.
 *
 * Note:
 * - native function decodeURI does not support IDNs and cannot properly work
 *   with encodeURI since the function is based on an outdated standard;
 * - to stay fully RFC-3986 compliant, scheme and host are put in lowercase.
 *
 * @param  {String} uri
 * @param  {Boolean} lowercase
 * @return {String}
 * @throws {URIError}
 */
const decodeWebURL = function decodeWebURL(uri, { lowercase } = {}) {
  return decodeURIString(uri, { lowercase, web: true });
};

/**
 * @func decodeSitemapURL
 *
 * Decode an URI string with basic checking based on RFC-3986 standard applied
 * to HTTP and HTTPS URLs and sitemap requirements regarding escape codes to decode.
 *
 * Checked:
 * - scheme must be http/HTTP or https/HTTPS;
 * - path is required, can be empty;
 * - authority is required;
 * - port, if any, must be a number;
 * - parseURI prechecked host, will be null if invalid and so does authority.
 *
 * Support:
 * - Sitemap's escape codes;
 * - IDNs: returns URI with its Punydecoded host
 *   (Unicode serialization of the domain), if any;
 * - lower and upper case.
 *
 * Note:
 * - native function decodeURI does not support IDNs and cannot properly work
 *   with encodeURI since the function is based on an outdated standard;
 * - to stay fully RFC-3986 compliant, scheme and host are put in lowercase.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} uri
 * @param  {Boolean} lowercase
 * @return {String}
 * @throws {URIError}
 */
const decodeSitemapURL = function decodeSitemapURL(uri, { lowercase } = {}) {
  return decodeURIString(uri, { lowercase, sitemap: true });
};

module.exports = Object.freeze({
  decodeURIComponentString,
  decodeURIString,
  decodeWebURL,
  decodeSitemapURL,
});
