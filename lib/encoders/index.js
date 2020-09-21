/**
 * encoders
 *
 * - encodeURIComponentString(uri, { sitemap, lowercase } = {}) -> String
 * - encodeURIString(uri, { web, sitemap, lowercase } = {}) -> String throws URIError
 * - encodeWebURL(uri, { lowercase } = {}) -> String
 * - encodeSitemapURL(uri, { lowercase } = {}) -> String
 */
const { checkURISyntax } = require('../checkers');
const { isSitemapToEncodeChar, isURIToEncodeChar, isSchemeChar } = require('../checkers/chars');
const { entities } = require('../sitemap');
const { cast: { int }, object: { exists, is } } = require('../helpers');

/**
 * @func encodeURIComponentString
 *
 * Encode an URI component according to RFC-3986 with Sitemap entities support.
 *
 * Note:
 * - native function encodeURIComponent encodes string according to RFC-2396 which is outdated;
 * - characters that should not be percent-encoded in RFC-3986 are: "[]
 * - sitemap characters that should not be percent-encoded are: "[]<>
 * - the empty string is returned if unable to encode.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986;
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * @param  {String} component
 * @param  {Boolean} sitemap
 * @param  {Boolean} lowercase
 * @return {String}
 */
const encodeURIComponentString = function encodeURIComponentString(
  component,
  { sitemap, lowercase } = {},
) {
  if (!is(String, component)) {
    return '';
  }

  const len = component.length;
  const componentToEncode = lowercase === true ? component.toLowerCase() : component;
  let uriencoded = '';

  for (let i = 0; i < len; i += 1) {
    if (sitemap === true) {
      // escape entity if any
      if (exists(entities[componentToEncode[i]])) {
        uriencoded += entities[componentToEncode[i]];
      } else if (!isSitemapToEncodeChar(componentToEncode[i])) {
        uriencoded += encodeURIComponent(componentToEncode[i]);
      } else {
        uriencoded += componentToEncode[i];
      }
    } else {
      uriencoded += !isURIToEncodeChar(componentToEncode[i])
        ? encodeURIComponent(componentToEncode[i])
        : componentToEncode[i];
    }
  }

  return uriencoded;
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
 * - parseURI prechecked host, will be null if invalid and so does authority.
 *
 * Support:
 * - IDNs: returns URI with its Punycode host, if any;
 * - lower and upper case.
 *
 * Note:
 * - native function encodeURI encodes string according to RFC-2396 which is outdated;
 * - characters that should not be percent-encoded in RFC-3986 are: "[]
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
  if (web === true || sitemap === true) {
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
  if ((web === true || sitemap === true) && !is(String, authority)) {
    const error = new URIError('authority is required');
    error.code = 'URI_MISSING_AUTHORITY';
    throw error;
  }

  // check port is a number if any
  if (exists(port) && int(port) === undefined) {
    const error = new URIError(`port must be a number, got '${port}'`);
    error.code = 'URI_INVALID_PORT';
    throw error;
  }

  let uriencoded = scheme;

  // if authority, encode non ASCII characters for userinfo and following authority, and:
  // - use punycoded host
  if (exists(authority)) {
    // pass lowercase to false option since whole uri has been lowercased if true
    const userinfoEncoded = encodeURIComponentString(userinfo, { sitemap, lowercase: false });
    let followingAuthority = path;

    if (is(String, query)) {
      followingAuthority += `?${query}`;
    }

    if (is(String, fragment)) {
      followingAuthority += `#${fragment}`;
    }

    followingAuthority = encodeURIComponentString(
      followingAuthority,
      { sitemap, lowercase: false },
    );

    uriencoded += '://';

    if (userinfoEncoded !== '') {
      uriencoded += `${userinfoEncoded}@`;
    }

    uriencoded += host;

    if (exists(port)) {
      uriencoded += `:${port}`;
    }

    uriencoded += followingAuthority;
  } else {
    uriencoded += ':';
    uriencoded += encodeURIComponentString(
      uriToEncode.substring(schemeLen + 1),
      { sitemap, lowercase: false },
    );
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
 * - parseURI prechecked host, will be null if invalid and so does authority.
 *
 * Support:
 * - IDNs: returns URL with its Punycode host, if any;
 * - lower and upper case.
 *
 * Note:
 * - native function encodeURI encodes string according to RFC-2396 which is outdated;
 * - characters that should not be percent-encoded in RFC-3986 are: "[]
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
 * - parseURI prechecked host, will be null if invalid and so does authority.
 *
 * Support:
 * - Sitemap's special characters;
 * - IDNs: returns URI with its Punycode host, if any;
 * - lower and upper case.
 *
 * Note:
 * - native function encodeURI encodes string according to*RFC-2396 which is outdated;
 * - characters that should not be percent-encoded in RFC-3986 are: "[]
 * - sitemap characters that should not be percent-encoded are: "[]<>
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
const encodeSitemapURL = function encodeSitemapURL(uri, { lowercase } = {}) {
  return encodeURIString(uri, { lowercase, sitemap: true });
};

module.exports = Object.freeze({
  encodeURIComponentString,
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
});
