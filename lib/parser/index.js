/**
 * parser
 *
 * - recomposeURI({ scheme, userinfo, host port, path, query, fragment } = {}) -> String
 * - parseURI(uri) -> Object
 */
const { punycode, punydecode } = require('../punycode');
const { isIPv6 } = require('../ip');
const { cast: { int }, object: { exists, is } } = require('../helpers');

// regexp parsing uri from RFC-3986 https://tools.ietf.org/html/rfc3986#appendix-B
// adding ?: to disable capturing some groups
const uriRegexp = /^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;

// detect IPv6 (regex based on RFC-3986 one): [ipv6]:port
const ipv6Regexp = /^(?:\[([^\]]+)\]:?)([0-9]+)?$/;

/**
 * @func hostToURI
 *
 * Format host with special [] for IPv6. The empty string is returned if host
 * is not a string.
 *
 * @param  {String} host
 * @return {String}
 */
const hostToURI = function hostToURI(host) {
  if (!is(String, host)) {
    return '';
  }

  return isIPv6(host) ? `[${host}]` : host;
};

/**
 * @func recomposeURI
 *
 * Recompose an URI from its components with basic URI checking.
 *
 * The empty string is returned if unable to recompose the URI.
 *
 * Rules:
 * 1. scheme is required and must be at least 1 character;
 * 2. path is required and can be empty;
 * 3. if host is present path must be empty or start with /;
 * 4. if host is not present path must not start with //;
 * 5. host, if any, must be at least 3 characters;
 * 6. userinfo will be ignored if empty;
 * 7. port will be ignored if empty or not an integer;
 * 8. query will be ignored if empty;
 * 9. fragment will be ignored if empty.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986.
 *
 * @param {Object} options:
 * @param {String} scheme
 * @param {String} userinfo
 * @param {String} host
 * @param {Integer} port
 * @param {String} path
 * @param {String} query
 * @param {String} fragment
 * @return {String}
 */
const recomposeURI = function recomposeURI(options) {
  const opts = options || {};
  const defaultReturnValue = '';
  if (!(is(String, opts.scheme) && opts.scheme.length > 0) || !is(String, opts.path)) {
    return '';
  }

  let uri = opts.scheme;

  if (is(String, opts.host)) {
    if (!(opts.path === '' || opts.path.startsWith('/'))) {
      return defaultReturnValue;
    }

    if (opts.host.length <= 2) {
      return defaultReturnValue;
    }

    uri += '://';

    if (is(String, opts.userinfo) && opts.userinfo.length > 0) {
      uri += `${opts.userinfo}@`;
    }

    uri += hostToURI(opts.host);

    if (exists(opts.port) && int(opts.port) !== undefined) {
      uri += `:${opts.port}`;
    }
  } else {
    if (opts.path.startsWith('//')) {
      return defaultReturnValue;
    }

    uri += ':';
  }

  uri += opts.path;

  if (is(String, opts.query) && opts.query.length > 0) {
    uri += `?${opts.query}`;
  }

  if (is(String, opts.fragment) && opts.fragment.length > 0) {
    uri += `#${opts.fragment}`;
  }

  return uri;
};

/**
 * @func parseURI
 *
 * Parse a string to get URI components with Internationalized Domain Name (IDN) support.
 *
 * Note:
 * - RegExp from RFC-3986 https://tools.ietf.org/html/rfc3986#appendix-B;
 * - scheme and host strings will always be put in lowercase once parsed,
 *   as specified in RFC-3986;
 * - authority and its components will be put at null values if authority
 *   parsed is missing or empty.
 *
 * Based on:
 * - RFC-3986 https://tools.ietf.org/html/rfc3986.
 *
 * @param  {String} uri
 * @return {Object}
 */
const parseURI = function parseURI(uri) {
  const parsed = {
    scheme: null,
    authority: null,
    authorityPunydecoded: null,
    userinfo: null,
    host: null,
    hostPunydecoded: null,
    port: null,
    path: null,
    pathqf: null,
    query: null,
    fragment: null,
  };

  // return an object with null attributes if uri is not a string or an empty string
  if (!(is(String, uri) && uri.length > 0)) {
    return parsed;
  }

  // extract uri components from RegExp
  const [,
    scheme,
    authorityParsed,
    path,
    queryParsed,
    fragmentParsed,
  ] = uri.match(uriRegexp);

  // scheme is required and must be a not empty string or this is not an uri
  if (!(is(String, scheme) && scheme.length > 0)) {
    return parsed;
  }

  let authority = null;
  let authorityPunydecoded = null;
  let userinfo = null;
  let host = null;
  let hostPunydecoded = null;
  let port = null;

  // parse authority components, if any
  if (is(String, authorityParsed)) {
    let hostAndPort = null;

    [userinfo = null, hostAndPort = null] = authorityParsed.split('@');

    // authority had no '@' and no userinfo can be extracted
    if (!exists(hostAndPort) && exists(userinfo)) {
      hostAndPort = userinfo;
      userinfo = null;
    }

    // try to extract host and port only if any
    if (is(String, hostAndPort)) {
      // detect IPv6 here first
      const ipv6Match = hostAndPort.match(ipv6Regexp);
      let hostParsed;
      let portToCast;

      // if an array then it's constructed as an ipv6
      if (is(Array, ipv6Match)) {
        [, hostParsed = null, portToCast = null] = ipv6Match;
      } else {
        // not an ipv6
        [hostParsed = null, portToCast = null] = hostAndPort.split(':');
      }

      // hostPunydecoded should be the host in Unicode, host its Punycode value
      const hostLowerCase = is(String, hostParsed) ? hostParsed.toLowerCase() : null;
      const toASCII = punycode(hostLowerCase);
      const toUnicode = punydecode(hostLowerCase);

      // host parsed was in Unicode
      if (hostLowerCase !== toASCII) {
        host = toASCII;
        hostPunydecoded = hostLowerCase;
      } else if (hostLowerCase !== toUnicode) {
        // host parsed was punycoded
        host = hostLowerCase;
        hostPunydecoded = toUnicode;
      } else {
        host = hostLowerCase;
        hostPunydecoded = hostLowerCase;
      }

      // we only keep original authority/host parsed so using parseURI allows to
      // see issues with provided host
      if (host === '' || hostPunydecoded === '') {
        host = null;
      }

      // necessary to handle possible port errors when checking uri
      // port is a valid integer or we keep its initial value to be aware of the error
      port = int(portToCast) || portToCast;

      // recompose authority with punycode ASCII and Unicode serialization of the host
      // userinfo@host:port
      // we still want to know the original host and authority provided
      // to check possible uri errors: a null host with a hostPunydecoded filled
      // means uri parsed had an invalid host name
      if (exists(hostPunydecoded)) {
        authorityPunydecoded = '';

        // recompose authorityPunydecoded, order matters
        if (exists(userinfo)) {
          authorityPunydecoded += `${userinfo}@`;
        }

        authorityPunydecoded += hostToURI(hostPunydecoded);

        if (exists(port)) {
          authorityPunydecoded += `:${port}`;
        }
      }

      // as punycode returns '' for invalid host, we already know if the host is basically valid
      // and there cannot be userinfo or a port with a null host parsed
      if (exists(host)) {
        authority = '';

        // recompose authority, order matters
        if (exists(userinfo)) {
          authority += `${userinfo}@`;
        }

        authority += hostToURI(host);

        if (exists(port)) {
          authority += `:${port}`;
        }
      } else {
        userinfo = null;
        port = null;
      }
    }
  }

  // format query and fragment
  const query = is(String, queryParsed) && queryParsed.length > 0 ? queryParsed : null;
  const fragment = is(String, fragmentParsed) && fragmentParsed.length > 0 ? fragmentParsed : null;

  // pathqf: recompose path + query + fragment if any
  // using valueOf to avoid potential String objects mutation with parsed.path
  parsed.pathqf = is(String, path) ? path.valueOf() : null;

  if (is(String, parsed.pathqf)) {
    if (is(String, query)) {
      parsed.pathqf += `?${query}`;
    }

    if (is(String, fragment)) {
      parsed.pathqf += `#${fragment}`;
    }
  }

  // we checked scheme is a string
  parsed.scheme = scheme.toLowerCase();
  parsed.authority = authority;
  parsed.authorityPunydecoded = authorityPunydecoded;
  parsed.userinfo = userinfo;
  parsed.host = host;
  parsed.hostPunydecoded = hostPunydecoded;
  parsed.port = port;
  parsed.path = path;
  parsed.query = query;
  parsed.fragment = fragment;
  parsed.href = recomposeURI({
    scheme: parsed.scheme,
    userinfo: parsed.userinfo,
    host: parsed.host,
    port: parsed.port,
    path: parsed.path,
    query: parsed.query,
    fragment: parsed.fragment,
  });

  return parsed;
};

module.exports = Object.freeze({
  recomposeURI,
  parseURI,
});
