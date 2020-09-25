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

const unreserved = `${az}${AZ}${digits}-._~`;
const genDelims = ':/?#[]@';
const subDelims = '!$&\'()*+,;=';
const reserved = `${genDelims}${subDelims}`;
const sitemapSubDelims = subDelims.replace('*', '');

const allowedSchemeChars = `${az}${digits}+-.`;
const allowedDomainChars = `${az}${digits}-`;
const allowedPercentEncodingChars = `${digits}${hexdig}`;

const allowedUserinfoChars = `${unreserved}%${subDelims}:`;
const allowedPathChars = `${unreserved}%${subDelims}:@/`;
const allowedQueryOrFragmentChars = `${allowedPathChars}?`;

const allowedSitemapUserinfoChars = `${az}${digits}-._~%${sitemapSubDelims}:`;
const allowedSitemapPathChars = `${az}${digits}-._~%${sitemapSubDelims}:@/`;
const allowedSitemapQueryOrFragmentChars = `${allowedSitemapPathChars}?`;

const allowedUserinfoCharsToEncode = `${unreserved}${subDelims}:`;
const allowedPathCharsToEncode = `${unreserved}${subDelims}:@/`;
const allowedQueryOrFragmentCharsToEncode = `${allowedPathCharsToEncode}?`;

const allowedSitemapUserinfoCharsToEncode = `${az}${digits}-._~${sitemapSubDelims}:`;
const allowedSitemapPathCharsToEncode = `${az}${digits}-._~${sitemapSubDelims}:@/`;
const allowedSitemapQueryOrFragmentCharsToEncode = `${allowedSitemapPathCharsToEncode}?`;

// disallowed
const disallowed = '\\^`{|}<>';
const disallowedSchemeChars = `${AZ}${disallowed}${allowed.replace(/[-+.]/g, '')}`;
const disallowedDomainChars = `${AZ}${disallowed}${allowed.replace('-', '')}`;
const disallowedPercentEncodingChars = `${az}${GZ}${allowed}${disallowed}`;

const disallowedUserinfoChars = '#/?@[]';
const disallowedPathChars = '?#[]';
const disallowedQueryOrFragmentChars = '#[]';

const disallowedSitemapUserinfoChars = `${disallowedUserinfoChars}${AZ}*`;
const disallowedSitemapPathChars = `${disallowedPathChars}${AZ}*`;
const disallowedSitemapQueryOrFragmentChars = `${disallowedQueryOrFragmentChars}${AZ}*`;

const disallowedUserinfoCharsToEncode = `${disallowedUserinfoChars}%`;
const disallowedPathCharsToEncode = `${disallowedPathChars}%`;
const disallowedQueryOrFragmentCharsToEncode = `${disallowedQueryOrFragmentChars}%`;

const disallowedSitemapUserinfoCharsToEncode = `${disallowedSitemapUserinfoChars}%`;
const disallowedSitemapPathCharsToEncode = `${disallowedSitemapPathChars}%`;
const disallowedSitemapQueryOrFragmentCharsToEncode = `${disallowedSitemapQueryOrFragmentChars}%`;

const disallowedOtherChars = '€°éùèàç §£';

module.exports = Object.freeze({
  az,
  AZ,
  GZ,
  hexdig,
  digits,
  allowed,
  unreserved,
  genDelims,
  subDelims,
  reserved,
  sitemapSubDelims,
  allowedSchemeChars,
  allowedDomainChars,
  allowedPercentEncodingChars,
  allowedUserinfoChars,
  allowedPathChars,
  allowedQueryOrFragmentChars,
  allowedSitemapUserinfoChars,
  allowedSitemapPathChars,
  allowedSitemapQueryOrFragmentChars,
  allowedUserinfoCharsToEncode,
  allowedPathCharsToEncode,
  allowedQueryOrFragmentCharsToEncode,
  allowedSitemapUserinfoCharsToEncode,
  allowedSitemapPathCharsToEncode,
  allowedSitemapQueryOrFragmentCharsToEncode,
  disallowed,
  disallowedSchemeChars,
  disallowedDomainChars,
  disallowedPercentEncodingChars,
  disallowedUserinfoChars,
  disallowedPathChars,
  disallowedQueryOrFragmentChars,
  disallowedSitemapUserinfoChars,
  disallowedSitemapPathChars,
  disallowedSitemapQueryOrFragmentChars,
  disallowedUserinfoCharsToEncode,
  disallowedPathCharsToEncode,
  disallowedQueryOrFragmentCharsToEncode,
  disallowedSitemapUserinfoCharsToEncode,
  disallowedSitemapPathCharsToEncode,
  disallowedSitemapQueryOrFragmentCharsToEncode,
  disallowedOtherChars,
});
