/**
 * node-uri
 */
const { punycode, punydecode } = require('./punycode');
const { parseURI, recomposeURI } = require('./parser');
const { isDomainLabel, isDomain } = require('./domain');
const { isIP, isIPv4, isIPv6 } = require('./ip');
const {
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
