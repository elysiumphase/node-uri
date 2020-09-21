/**
 * chars allowed or not
 */

// generic
const az = 'abcdefghijklmnopqrstuvwxyz';
const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const GZ = 'GHIJKLMNOPQRSTUVWXYZ';
const hexdig = 'ABCDEF';
const digits = '0123456789';

// allowed
const allowed = '!"#$%&\'()*+,-./:;=?@[]_~';
const allowedURIChars = `${az}${AZ}${digits}${allowed}`;
const allowedURIToEncodeChars = allowedURIChars.replace('%', '');
const allowedSitemapToEncodeChars = `${allowedURIToEncodeChars}<>`;
const domainAllowedChars = `${az}${digits}-`;
const allowedSchemeChars = `${az}${digits}+-.`;
const allowedPercentEncodingChars = `${digits}${hexdig}`;
const allowedUserinfoChars = `${az}${digits}!"$%&'()*+,-.:;=_~`;

// disallowed
const disallowed = '\\^`{|}';
const disallowedURIChars = `${disallowed}<>`;
const disallowedURIToEncodeChars = `${disallowed}<>`;
const disallowedSitemapToEncodeChars = `${disallowed}`;
const disallowedDomainChars = `${AZ}${allowed.replace('-', '')}`;
const disallowedSchemeChars = `${disallowedURIChars}${allowed.replace(/[-+.]/g, '')}`;
const disallowedPercentEncodingChars = `${az}${GZ}${allowed}${disallowed}<>`;
const disallowedUserinfoChars = '#/?@[]';
const disallowedOtherChars = '€°éùèàç §£';

module.exports = Object.freeze({
  az,
  AZ,
  GZ,
  hexdig,
  digits,
  allowed,
  allowedURIChars,
  allowedURIToEncodeChars,
  allowedSitemapToEncodeChars,
  domainAllowedChars,
  allowedSchemeChars,
  allowedPercentEncodingChars,
  allowedUserinfoChars,
  disallowed,
  disallowedURIChars,
  disallowedURIToEncodeChars,
  disallowedSitemapToEncodeChars,
  disallowedDomainChars,
  disallowedSchemeChars,
  disallowedPercentEncodingChars,
  disallowedUserinfoChars,
  disallowedOtherChars,
});
