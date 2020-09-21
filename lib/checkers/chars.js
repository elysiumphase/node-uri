/**
 * chars checkers
 *
 * - isDomainChar(char, { start, end } = {}) -> Boolean
 * - isSitemapToEncodeChar(char) -> Boolean
 * - isURIChar(char) -> Boolean
 * - isURIToEncodeChar(char) -> Boolean
 * - isSchemeChar(char, { start } = {}) -> Boolean
 * - isPercentEncodingChar(char) -> Boolean
 * - isUserinfoChar(char) -> Boolean
 */
const { object: { is } } = require('../helpers');

/**
 * @func isDomainChar
 *
 * Check domain legal codes according to
 * - RFC-1034 https://www.ietf.org/rfc/rfc1034.txt.
 *
 * 45             -
 * 48 to 57       0-9
 * 97 to 122      a-z
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isDomainChar = function isDomainChar(char, { start, end } = {}) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  if ((start === true || end === true) && code === 45) {
    return false;
  }

  return (code >= 48 && code <= 57)
    || (code >= 97 && code <= 122)
    || code === 45;
};

/**
 * @func isSitemapToEncodeChar
 *
 * Check sitemap legal ascii codes according to
 * - RFC-3986 https://tools.ietf.org/html/rfc3986#section-2
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * NOTE:
 * - only to be used when encoding an uri not for checking;
 * - % char must only be used for percent encodings or should be encoded, it is then
 * not a valid char before being encoded
 *
 * 33 to 36       !"#$
 * 38 to 90       &'()*+,-./0-9:;<=>?@A-Z
 * 97 to 122      a-z
 * 91             [
 * 93             ]
 * 95             _
 * 126            ~
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isSitemapToEncodeChar = function isSitemapToEncodeChar(char) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  return (code >= 33 && code <= 36)
    || (code >= 38 && code <= 90)
    || (code >= 97 && code <= 122)
    || code === 91
    || code === 93
    || code === 95
    || code === 126;
};

/**
 * @func isURIChar
 *
 * Check uri legal ascii codes according to
 * - RFC-3986 https://tools.ietf.org/html/rfc3986#section-2
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * 33 to 59       !"#$%&'()*+,-./0-9:;
 * 61             =
 * 63 to 90       ?@A-Z
 * 91             [
 * 93             ]
 * 95             _
 * 97 to 122      a-z
 * 126            ~
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isURIChar = function isURIChar(char) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  return (code >= 33 && code <= 59)
    || (code >= 63 && code <= 90)
    || (code >= 97 && code <= 122)
    || code === 61
    || code === 91
    || code === 93
    || code === 95
    || code === 126;
};

/**
 * @func isURIToEncodeChar
 *
 * Check uri legal ascii codes according to
 * - RFC-3986 https://tools.ietf.org/html/rfc3986#section-2
 * - https://support.google.com/webmasters/answer/183668?hl=en&ref_topic=4581190.
 *
 * NOTE:
 * - only to be used when encoding an uri not for checking;
 * - % char must only be used for percent encodings or should be encoded, it is then
 * not a valid char before being encoded
 *
 * 33 to 36       !"#$
 * 38 to 59       &'()*+,-./0-9:;
 * 61             =
 * 63 to 91       ?@A-Z[
 * 93             ]
 * 95             _
 * 97 to 122      a-z
 * 126            ~
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isURIToEncodeChar = function isURIToEncodeChar(char) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  return (code >= 33 && code <= 36)
    || (code >= 38 && code <= 59)
    || (code >= 63 && code <= 91)
    || (code >= 97 && code <= 122)
    || code === 61
    || code === 93
    || code === 95
    || code === 126;
};

/**
 * @func isSchemeChar
 *
 * Check scheme legal ascii codes according to RFC-3986 https://tools.ietf.org/html/rfc3986#section-3.1.
 *
 * Scheme must start with a letter and be followed by any combination of
 * letters, digits, plus ("+"), period ("."), or hyphen ("-").
 *
 * Letters must be in lowercase.
 *
 * 43             +
 * 45             -
 * 46             .
 * 48 to 57       0-9
 * 97 to 122      a-z
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isSchemeChar = function isSchemeChar(char, { start } = {}) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  if (start) {
    return code >= 97 && code <= 122;
  }

  return (code >= 48 && code <= 57)
    || (code >= 97 && code <= 122)
    || code === 43
    || code === 45
    || code === 46;
};

/**
 * @func isPercentEncodingChar
 *
 * Check percent encoding legal ascii codes according to RFC-3986 https://tools.ietf.org/html/rfc3986#section-2.1.
 *
 * 48 to 57       0-9
 * 65 to 70       A-F
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isPercentEncodingChar = function isPercentEncodingChar(char) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  return (code >= 48 && code <= 57)
    || (code >= 65 && code <= 70);
};

/**
 * @func isUserinfoChar
 *
 * Check userinfo legal ascii codes according to RFC-3986 https://tools.ietf.org/html/rfc3986#section-3.2.1.
 *
 * 33             !
 * 34             "
 * 36             $
 * 37             %
 * 38 to 46       &'()*+,-.
 * 48 to 57       0-9
 * 58             :
 * 59             ;
 * 61             =
 * 95             _
 * 97 to 122      a-z
 * 126            ~
 *
 * @param  {String} char
 * @return {Boolean}
 */
const isUserinfoChar = function isUserinfoChar(char) {
  if (!is(String, char)) {
    return false;
  }

  const code = char.charCodeAt();

  return (code >= 38 && code <= 46)
    || (code >= 48 && code <= 57)
    || (code >= 97 && code <= 122)
    || code === 33
    || code === 34
    || code === 36
    || code === 37
    || code === 58
    || code === 59
    || code === 61
    || code === 95
    || code === 126;
};

module.exports = Object.freeze({
  isDomainChar,
  isSitemapToEncodeChar,
  isURIChar,
  isURIToEncodeChar,
  isSchemeChar,
  isPercentEncodingChar,
  isUserinfoChar,
});
