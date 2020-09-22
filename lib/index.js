/**
 * node-uri
 *
 * An RFC-3986 compliant and zero-dependencies Node.js module to parse URIs,
 * punycode, punydecode, test URIs, URLs, Sitemap URLS, domain, IPs but also
 * encode and decode URIs, URLs and Sitemap URLs.
 *
 * Author: Adrien Valcke <adrienvalcke@icloud.com>
 *
 * Based on
 *  - RFC-3986 https://tools.ietf.org/html/rfc3986#appendix-B;
 *  - RFC-1034 https://www.ietf.org/rfc/rfc1034.txt.
 *
 * 3 RegExps:
 * - URI RegExp from RFC-3986;
 * - IP regexps, credited.
 *
 * - punycode(domain) -> String
 * - punydecode(domain) -> String
 * - parseURI(uri) -> Object
 * - recomposeURI({ scheme, userinfo, host port, path, query, fragment } = {}) -> String
 * - isDomainLabel(label) -> Boolean
 * - isDomain(name) -> Boolean
 * - isIP(ip) -> Boolean
 * - isIPv4(ip) -> Boolean
 * - isIPv6(ip) -> Boolean
 * - checkURISyntax(uri) -> Object throws URIError
 * - checkURI(uri, { sitemap } = {}) -> Object throws URIError
 * - checkHttpURL(uri, { https, web, sitemap } = {}) -> Object throws URIError
 * - checkHttpsURL(uri) -> Object throws URIError
 * - checkHttpSitemapURL(uri) -> Object throws URIError
 * - checkHttpsSitemapURL(uri) -> Object throws URIError
 * - checkWebURL(uri) -> Object throws URIError
 * - checkSitemapURL(uri) -> Object throws URIError
 * - encodeURIComponentString(uri, { sitemap, lowercase } = {}) -> String
 * - encodeURIString(uri, { web, sitemap, lowercase } = {}) -> String throws URIError
 * - encodeWebURL(uri, { lowercase } = {}) -> String
 * - encodeSitemapURL(uri, { lowercase } = {}) -> String
 * - decodeURIComponentString(component, { sitemap, lowercase } = {}) -> String
 * - decodeURIString(uri, { sitemap, lowercase } = {}) -> String throws URIError
 * - decodeWebURL(uri, { lowercase } = {}) -> String
 * - decodeSitemapURL(uri, { lowercase } = {}) -> String
 */
const { punycode, punydecode } = require('./punycode');
const { parseURI, recomposeURI } = require('./parser');
const { isDomainLabel, isDomain } = require('./domain');
const { isIP, isIPv4, isIPv6 } = require('./ip');
const {
  checkURISyntax,
  checkURI,
  checkHttpURL,
  checkHttpsURL,
  checkHttpSitemapURL,
  checkHttpsSitemapURL,
  checkWebURL,
  checkSitemapURL,
} = require('./checkers');
const {
  encodeURIComponentString,
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
} = require('./encoders');
const {
  decodeURIComponentString,
  decodeURIString,
  decodeWebURL,
  decodeSitemapURL,
} = require('./decoders');

module.exports = Object.freeze({
  punycode,
  punydecode,
  parseURI,
  recomposeURI,
  isDomainLabel,
  isDomain,
  isIP,
  isIPv4,
  isIPv6,
  checkURISyntax,
  checkURI,
  checkHttpURL,
  checkHttpsURL,
  checkHttpSitemapURL,
  checkHttpsSitemapURL,
  checkWebURL,
  checkSitemapURL,
  encodeURIComponentString,
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
  decodeURIComponentString,
  decodeURIString,
  decodeWebURL,
  decodeSitemapURL,
});
