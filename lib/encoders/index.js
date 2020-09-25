/**
 * encoders
 *
 * - encodeURIComponentString(uri, { sitemap, lowercase } = {}) -> String
 * - encodeURIString(uri, { web, sitemap, lowercase } = {}) -> String throws URIError
 * - encodeWebURL(uri, { lowercase } = {}) -> String
 * - encodeSitemapURL(uri, { lowercase } = {}) -> String
 */
const { maxLengthURL } = require('../config');
const { checkURISyntax } = require('../checkers');
const {
  isSchemeChar,
  isUserinfoChar,
  isPathChar,
  isQueryOrFragmentChar,
  isSitemapUserinfoChar,
  isSitemapPathChar,
  isSitemapQueryOrFragmentChar,
} = require('../checkers/chars');
const { recomposeURI } = require('../parser');
const { entities } = require('../sitemap');
const { isDomain } = require('../domain');
const { isIP } = require('../ip');
const { cast: { int }, object: { exists, is } } = require('../helpers');

/**
 * @func encodeURIComponentString
 *
 * Encode an URI component according to RFC-3986 with Sitemap entities support.
 *
 * Note:
 * - only userinfo, path, query and fragment components can be encoded;
 * - scheme and authority host+port can never have percent encoded characters;
 * - the empty string is returned if unable to encode;
 * - sitemap characters '& must be entity-escaped for XML sitemap.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} component
 * @param  {String} type
 * @param  {Boolean} sitemap
 * @param  {Boolean} lowercase
 * @return {String}
 */
const encodeURIComponentString = function encodeURIComponentString(
  component,
  { type, sitemap, lowercase } = {},
) {
  if (!is(String, component)) {
    return '';
  }

  const componentToEncode = lowercase === true || sitemap === true
    ? component.toLowerCase()
    : component;
  const componentToEncodeLen = componentToEncode.length;
  let uricomponent = '';

  for (let i = 0; i < componentToEncodeLen; i += 1) {
    // escape entity if any
    if (sitemap === true && exists(entities[componentToEncode[i]])) {
      uricomponent += entities[componentToEncode[i]];
      i += 1;
    }

    if (i < componentToEncodeLen) {
      let isChar;

      switch (type) {
        case 'userinfo':
          isChar = (sitemap && isSitemapUserinfoChar(componentToEncode[i], true))
            || isUserinfoChar(componentToEncode[i], true);
          break;
        case 'path':
          isChar = (sitemap && isSitemapPathChar(componentToEncode[i], true))
            || isPathChar(componentToEncode[i], true);
          break;
        case 'query':
        case 'fragment':
          isChar = (sitemap && isSitemapQueryOrFragmentChar(componentToEncode[i], true))
            || isQueryOrFragmentChar(componentToEncode[i], true);
          break;
        default:
          isChar = false;
      }

      uricomponent += !isChar
        ? encodeURIComponent(componentToEncode[i])
        : componentToEncode[i];
    }
  }

  return uricomponent;
};

/**
 * @func encodeURIString
 *
 * Encode an URI string according to RFC-3986 with basic checking.
 *
 * Checked:
 * - scheme is required;
 * - path is required, can be empty;
 * - port, if any, must be a number;
 * - host must be a valid ip or domain name;
 * - maximum size once encoded for URLs.
 *
 * Support:
 * - IDNs: returns URI with its Punycode host, if any;
 * - lower and upper case.
 *
 * Note:
 * - only userinfo, path, query and fragment can be percent encoded;
 * - native function encodeURI encodes string according to RFC-2396 which is outdated;
 * - native function encodes also scheme and host that cannot have percend encoded characters;
 * - characters that should not be percent-encoded in RFC-3986 are [] to represent IPv6 host;
 * - to stay fully RFC-3986 compliant, scheme and host are put in lowercase.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} uri
 * @param  {Boolean} web
 * @param  {Boolean} sitemap
 * @param  {Boolean} lowercase
 * @return {String}
 * @throws {URIError}
 */
const encodeURIString = function encodeURIString(uri, { web, sitemap, lowercase } = {}) {
  const uriToEncode = is(String, uri) && lowercase === true ? uri.toLowerCase() : uri;
  const webURL = web === true || sitemap === true;

  // check uri type and syntax
  const {
    scheme,
    authority,
    userinfo,
    host,
    port,
    path,
    query,
    fragment,
    schemeLen,
  } = checkURISyntax(uriToEncode);

  // scheme must be http or https for web/sitemap or with valid chars, always in lowercase
  if (webURL) {
    if (scheme !== 'http' && scheme !== 'https') {
      const error = new URIError(`scheme must be http or https, got '${scheme}'`);
      error.code = 'URI_INVALID_SCHEME';
      throw error;
    }
  } else {
    // check scheme characters, it is not intended to encode a scheme
    for (let i = 0; i < schemeLen; i += 1) {
      if (!isSchemeChar(scheme[i], { start: (i === 0) })) {
        const error = new URIError(`invalid scheme char '${scheme[i]}'`);
        error.code = 'URI_INVALID_SCHEME_CHAR';
        throw error;
      }
    }
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
  const userinfoEncoded = encodeURIComponentString(userinfo, {
    sitemap,
    type: 'userinfo',
    lowercase: false,
  });

  // path
  const pathEncoded = encodeURIComponentString(path, {
    sitemap,
    type: 'path',
    lowercase: false,
  });

  // query
  const queryEncoded = encodeURIComponentString(query, {
    sitemap,
    type: 'query',
    lowercase: false,
  });

  // fragment
  const fragmentEncoded = encodeURIComponentString(fragment, {
    sitemap,
    type: 'fragment',
    lowercase: false,
  });

  const uriencoded = recomposeURI({
    scheme,
    host,
    port,
    userinfo: userinfoEncoded,
    path: pathEncoded,
    query: queryEncoded,
    fragment: fragmentEncoded,
  });

  if (webURL && uriencoded.length > maxLengthURL) {
    const error = new URIError(`max URL length of ${maxLengthURL} reached: ${uriencoded.length}`);
    error.code = 'URI_MAX_LENGTH_URL';
    throw error;
  }

  return uriencoded;
};

/**
 * @func encodeWebURL
 *
 * Encode an URI string with basic checking based on RFC-3986 standard applied
 * to HTTP and HTTPS URLs.
 *
 * Uses a fixed encodeURI function to be RFC-3986 compliant.
 *
 * Checked:
 * - scheme must be http/HTTP or https/HTTPS;
 * - path is required, can be empty;
 * - authority is required;
 * - port, if any, must be a number;
 * - host must be a valid IP or domain name;
 * - maximum size once encoded.
 *
 * Support:
 * - IDNs: returns URL with its Punycode host, if any;
 * - lower and upper case.
 *
 * Note:
 * - only userinfo, path, query and fragment can be percent encoded;
 * - native function encodeURI encodes string according to RFC-2396 which is outdated;
 * - native function encodes also scheme and host that cannot have percend encoded characters;
 * - characters that should not be percent-encoded in RFC-3986 are [] to represent IPv6 host;
 * - to stay fully RFC-3986 compliant, scheme and host are put in lowercase.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986.
 *
 *
 * @param {String} uri
 * @param  {Boolean} lowercase
 * @return {String}
 * @throws {URIError}
 */
const encodeWebURL = function encodeWebURL(uri, { lowercase } = {}) {
  return encodeURIString(uri, { lowercase, web: true });
};

/**
 * @func encodeSitemapURL
 *
 * Encode an URI string with basic checking based on RFC-3986 standard applied
 * to HTTP and HTTPS URLs and sitemap requirements regarding special entities to escape.
 *
 * Checked:
 * - scheme must be http/HTTP or https/HTTPS;
 * - path is required, can be empty;
 * - authority is required;
 * - port, if any, must be a number;
 * - host must be a valid IP or domain name;
 * - maximum size once encoded.
 *
 * Support:
 * - Sitemap's entities and unallowed characters;
 * - IDNs: returns URI with its Punycode host, if any;
 * - lower case only.
 *
 * Note:
 * - only userinfo, path, query and fragment can be percent encoded;
 * - native function encodeURI encodes string according to RFC-2396 which is outdated;
 * - native function encodes also scheme and host that cannot have percend encoded characters;
 * - characters that should not be percent-encoded in RFC-3986 are [] to represent IPv6 host;
 * - to stay fully RFC-3986 compliant, scheme and host are put in lowercase.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} uri
 * @return {String}
 * @throws {URIError}
 */
const encodeSitemapURL = function encodeSitemapURL(uri) {
  return encodeURIString(uri, { lowercase: true, sitemap: true });
};

module.exports = Object.freeze({
  encodeURIComponentString,
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
});
