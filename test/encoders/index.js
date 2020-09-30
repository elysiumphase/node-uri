const { expect } = require('../Common');
const { maxLengthURL } = require('../../lib/config');
const {
  encodeURIComponentString,
  encodeURIString,
  encodeWebURL,
  encodeSitemapURL,
} = require('../../lib/encoders');
const {
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
} = require('../chars');

describe('#encoders', function(){
  context('when using encodeURIComponentString', function() {
    it('should return an empty string when uri is not a string', function() {
      expect(encodeURIComponentString()).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(undefined)).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(null)).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(NaN)).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString([])).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(new Error('error'))).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(5)).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(true)).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString(false)).to.be.a('string').and.to.equals('');
      expect(encodeURIComponentString({})).to.be.a('string').and.to.equals('');
    });

    it('should return a lowercased string only if lowercase is true', function() {
      expect(encodeURIComponentString(az)).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString('ABCDEF')).to.be.a('string').and.to.equals('ABCDEF');
      expect(encodeURIComponentString('ABcDEF')).to.be.a('string').and.to.equals('ABcDEF');
      expect(encodeURIComponentString('aBcDEF')).to.be.a('string').and.to.equals('aBcDEF');
      expect(encodeURIComponentString('aBcDEf')).to.be.a('string').and.to.equals('aBcDEf');
      expect(encodeURIComponentString('abcdef')).to.be.a('string').and.to.equals('abcdef');

      expect(encodeURIComponentString(AZ, { lowercase: true })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString('ABCDEF', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(encodeURIComponentString('ABcDEF', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(encodeURIComponentString('aBcDEF', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(encodeURIComponentString('aBcDEf', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
      expect(encodeURIComponentString('abcdef', { lowercase: true })).to.be.a('string').and.to.equals('abcdef');
    });

    it('should return the exact same uppercased characters if lowercase is false', function() {
      expect(encodeURIComponentString(AZ, { lowercase: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString('ABCDEF', { lowercase: false })).to.be.a('string').and.to.equals('ABCDEF');
      expect(encodeURIComponentString('ABcDEF', { lowercase: false })).to.be.a('string').and.to.equals('ABcDEF');
      expect(encodeURIComponentString('aBcDEF', { lowercase: false })).to.be.a('string').and.to.equals('aBcDEF');
      expect(encodeURIComponentString('aBcDEf', { lowercase: false })).to.be.a('string').and.to.equals('aBcDEf');
      expect(encodeURIComponentString('abcdef', { lowercase: false })).to.be.a('string').and.to.equals('abcdef');
    });

    it('should return a string with percent-encoded characters if no type but based on an outdated standard', function() {
      expect(encodeURIComponentString('A#/?@[]&\'*')).to.be.a('string').and.to.equals('A%23%2F%3F%40%5B%5D%26\'*');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'userinfo' })).to.be.a('string').and.to.equals('A%23%2F%3F%40%5B%5D&\'*');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'path' })).to.be.a('string').and.to.equals('A%23/%3F@%5B%5D&\'*');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'query' })).to.be.a('string').and.to.equals('A%23/?@%5B%5D&\'*');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'fragment' })).to.be.a('string').and.to.equals('A%23/?@%5B%5D&\'*');
    });

    it('should return a string with the exact same characters if allowed in userinfo', function() {
      expect(encodeURIComponentString(az, { type: 'userinfo' })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'userinfo' })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'userinfo' })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedUserinfoCharsToEncode, { type: 'userinfo' })).to.be.a('string').and.to.equals(allowedUserinfoCharsToEncode);

      expect(encodeURIComponentString(az, { type: 'userinfo', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'userinfo', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'userinfo', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedUserinfoCharsToEncode, { type: 'userinfo', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(allowedUserinfoCharsToEncode);
    });

    it('should return a string with the exact same characters if allowed in path', function() {
      expect(encodeURIComponentString(az, { type: 'path' })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'path' })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'path' })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedPathCharsToEncode, { type: 'path' })).to.be.a('string').and.to.equals(allowedPathCharsToEncode);

      expect(encodeURIComponentString(az, { type: 'path', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'path', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'path', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedPathCharsToEncode, { type: 'path', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(allowedPathCharsToEncode);
    });

    it('should return a string with the exact same characters if allowed in query', function() {
      expect(encodeURIComponentString(az, { type: 'query' })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'query' })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'query' })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedQueryOrFragmentCharsToEncode, { type: 'query' })).to.be.a('string').and.to.equals(allowedQueryOrFragmentCharsToEncode);

      expect(encodeURIComponentString(az, { type: 'query', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'query', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'query', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedQueryOrFragmentCharsToEncode, { type: 'query', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(allowedQueryOrFragmentCharsToEncode);
    });

    it('should return a string with the exact same characters if allowed in fragment', function() {
      expect(encodeURIComponentString(az, { type: 'fragment' })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'fragment' })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'fragment' })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedQueryOrFragmentCharsToEncode, { type: 'query' })).to.be.a('string').and.to.equals(allowedQueryOrFragmentCharsToEncode);

      expect(encodeURIComponentString(az, { type: 'fragment', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { type: 'fragment', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { type: 'fragment', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowedQueryOrFragmentCharsToEncode, { type: 'fragment', lowercase: false, sitemap: false })).to.be.a('string').and.to.equals(allowedQueryOrFragmentCharsToEncode);
    });

    it('should return a string with the exact same characters if allowed in userinfo and sitemap', function() {
      expect(encodeURIComponentString(allowedSitemapUserinfoCharsToEncode.replace('&', ''), { type: 'userinfo', sitemap: true })).to.be.a('string').and.to.equals(allowedSitemapUserinfoCharsToEncode.replace('&', ''));
    });

    it('should return a string with the exact same characters if allowed in path and sitemap', function() {
      expect(encodeURIComponentString(allowedSitemapPathCharsToEncode.replace('&', ''), { type: 'path', sitemap: true })).to.be.a('string').and.to.equals(allowedSitemapPathCharsToEncode.replace('&', ''));
    });

    it('should return a string with the exact same characters if allowed in query and sitemap', function() {
      expect(encodeURIComponentString(allowedSitemapQueryOrFragmentCharsToEncode.replace('&', ''), { type: 'query', sitemap: true })).to.be.a('string').and.to.equals(allowedSitemapQueryOrFragmentCharsToEncode.replace('&', ''));
    });

    it('should return a string with the exact same characters if allowed in fragment and sitemap', function() {
      expect(encodeURIComponentString(allowedSitemapQueryOrFragmentCharsToEncode.replace('&', ''), { type: 'fragment', sitemap: true })).to.be.a('string').and.to.equals(allowedSitemapQueryOrFragmentCharsToEncode.replace('&', ''));
    });

    it('should return a string with percent-encoded characters if not allowed, by default', function() {
      expect(encodeURIComponentString(disallowed)).to.be.a('string').and.to.equals('%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeURIComponentString('<>')).to.be.a('string').and.to.equals('%3C%3E');
      expect(encodeURIComponentString(disallowedOtherChars)).to.be.a('string').and.to.equals('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIComponentString(disallowed, { sitemap: false })).to.be.a('string').and.to.equals('%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeURIComponentString('<>', { sitemap: false })).to.be.a('string').and.to.equals('%3C%3E');
      expect(encodeURIComponentString(disallowedOtherChars, { sitemap: false })).to.be.a('string').and.to.equals('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with specific escaped and percent-encoded characters when sitemap is true', function() {
      expect(encodeURIComponentString(AZ, { sitemap: true })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(disallowed, { sitemap: true })).to.be.a('string').and.to.equals('%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeURIComponentString('&\'*', { sitemap: true })).to.be.a('string').and.to.equals('&amp;&apos;%2A');
      expect(encodeURIComponentString(disallowedOtherChars, { sitemap: true })).to.be.a('string').and.to.equals('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIComponentString('A#/?@[]&\'*', { sitemap: true })).to.be.a('string').and.to.equals('a%23%2F%3F%40%5B%5D&amp;&apos;%2A');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'userinfo', sitemap: true })).to.be.a('string').and.to.equals('a%23%2F%3F%40%5B%5D&amp;&apos;%2A');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'path', sitemap: true })).to.be.a('string').and.to.equals('a%23/%3F@%5B%5D&amp;&apos;%2A');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'query', sitemap: true })).to.be.a('string').and.to.equals('a%23/?@%5B%5D&amp;&apos;%2A');
      expect(encodeURIComponentString('A#/?@[]&\'*', { type: 'fragment', sitemap: true })).to.be.a('string').and.to.equals('a%23/?@%5B%5D&amp;&apos;%2A');
    });
  });

  context('when using encodeURIString that uses checkURISyntax and encodeURIComponentString', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => encodeURIString()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeURIString({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
    });

    it('should throw an uri error when uri has no scheme', function() {
      // scheme cannot be an empty string following parseURI behavior
      expect(() => encodeURIString('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => encodeURIString('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => encodeURIString(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
    });

    it('should throw an uri error when scheme has invalid chars', function() {
      expect(() => encodeURIString('htép://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
      expect(() => encodeURIString('ht°p://example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
    });

    it('should throw an uri error if scheme is not http or https when option is web or sitemap', function() {
      expect(() => encodeURIString('httpp://www.example.com', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeURIString('httpp://www.example.com', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeURIString('httpp://www.example.com', { web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeURIString('httpp://www.example.com', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');

      expect(() => encodeURIString('htp://www.example.com', { web: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeURIString('htp://www.example.com', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeURIString('htp://www.example.com', { web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeURIString('htp://www.example.com', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should not throw an uri error if scheme is not http or https when option is not web or sitemap', function() {
      expect(() => encodeURIString('httpp://www.example.com')).to.not.throw();
      expect(() => encodeURIString('httpp://www.example.com', { web: false })).to.not.throw();
      expect(() => encodeURIString('httpp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('httpp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('httpp://www.example.com', { sitemap: false })).to.not.throw();

      expect(() => encodeURIString('htp://www.example.com')).to.not.throw();
      expect(() => encodeURIString('htp://www.example.com', { web: false })).to.not.throw();
      expect(() => encodeURIString('htp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('htp://www.example.com', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('htp://www.example.com', { sitemap: false })).to.not.throw();
    });

    it('should throw an uri error if host to encode is not valid', function() {
      expect(() => encodeURIString('http://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => encodeURIString('http://com.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to encode is not valid', function() {
      expect(() => encodeURIString('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should throw an uri error if authority is null and option is web or sitemap', function() {
      expect(() => encodeURIString('http:isbn:0-486-27557-4', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeURIString('https:isbn:0-486-27557-4', { web: false, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeURIString('http:isbn:0-486-27557-4', { web: true, sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeURIString('https:isbn:0-486-27557-4', { web: true, sitemap: false })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeURIString('http:isbn:0-486-27557-4', { web: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeURIString('https:isbn:0-486-27557-4', { sitemap: true })).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
    });

    it('should not throw an uri error if authority is null and option is not web or sitemap', function() {
      expect(() => encodeURIString('https:isbn:0-486-27557-4')).to.not.throw();
      expect(() => encodeURIString('http:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('https:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('http:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('https:isbn:0-486-27557-4', { web: false, sitemap: false })).to.not.throw();
      expect(() => encodeURIString('http:isbn:0-486-27557-4', { web: false })).to.not.throw();
      expect(() => encodeURIString('https:isbn:0-486-27557-4', { sitemap: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase by default', function() {
      expect(() => encodeURIString('http://example.com/OVER/there')).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/there')).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there')).to.not.throw();
      expect(() => encodeURIString('http://USER:PASS@example.com/OVER/there')).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE')).to.not.throw();

      expect(() => encodeURIString('http://example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://USER:PASS@example.com/OVER/there', { web: true })).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { web: true })).to.not.throw();

      expect(() => encodeURIString('http://example.com/OVER/there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://USER:PASS@example.com/OVER/there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme', function() {
      expect(() => encodeURIString('FTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => encodeURIString('FTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: true })).to.not.throw();
      expect(() => encodeURIString('FTP://user:pass@example.com', { lowercase: false })).to.not.throw();

      expect(() => encodeURIString('HTTP://example.com/OVER/there', { web: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { web: true, lowercase: true })).to.not.throw();
      expect(() => encodeURIString('HTTP://user:pass@example.com', { web: true, lowercase: true })).to.not.throw();

      expect(() => encodeURIString('HTTP://example.com/OVER/there', { sitemap: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { sitemap: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://user:pass@example.com', { sitemap: true, lowercase: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has special sitemap characters', function() {
      expect(() => encodeURIString('http://example.com/OVER/&\'*there')).to.not.throw();
      expect(() => encodeURIString('http://example.com/OVER/&\'*there', { web: false })).to.not.throw();
      expect(() => encodeURIString('http://example.com/OVER/&\'*there', { sitemap: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has special sitemap characters when sitemap is true', function() {
      expect(() => encodeURIString('http://example.com/OVER/&\'*there', { sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has invalid characters that should be percent-encoded whether web or sitemap is true or not', function() {
      expect(() => encodeURIString('ftp://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeURIString('ftp://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeURIString('ftp://example.com/over/t}ere')).to.not.throw();
      expect(() => encodeURIString('ftp://example.com/over|there')).to.not.throw();
      expect(() => encodeURIString('ftp://example.com/over/there')).to.not.throw();
      expect(() => encodeURIString('ftp://example.com/over/thère')).to.not.throw();
      expect(() => encodeURIString('ftp://example.com/over/there€')).to.not.throw();
      expect(() => encodeURIString('ftp://example.com/oveùr/there')).to.not.throw();

      expect(() => encodeURIString('http://user:pass@example.com/path{', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://user:pass@example.com/path{', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/t}ere', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over|there', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/there', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/thère', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/there€', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/oveùr/there', { web: true })).to.not.throw();

      expect(() => encodeURIString('http://user:pass@example.com/path{', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://user:pass@example.com/path{', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/t}ere', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over|there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/thère', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/over/there€', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://example.com/oveùr/there', { sitemap: true })).to.not.throw();
    });

    it('should return a lowercased uri only for scheme and host by default', function() {
      expect(encodeURIString('FTP://WWW.EXAMPLE.COM./Path')).to.be.a('string').and.to.equals('ftp://www.example.com./Path');
      expect(encodeURIString('HTTP://WWW.EXAMPLE.COM.', { web: true })).to.be.a('string').and.to.equals('http://www.example.com.');
      expect(encodeURIString('HTTP://WWW.EXAMPLE.COM.', { sitemap: true })).to.be.a('string').and.to.equals('http://www.example.com.');
    });

    it('should return a lowercased uri if lowercase is true', function() {
      expect(encodeURIString('urn:Over:There')).to.be.a('string').and.to.equals('urn:Over:There');
      expect(encodeURIString('urn:Over:There', { lowercase: true })).to.be.a('string').and.to.equals('urn:over:there');
      expect(encodeURIString('urn:Over:There', { lowercase: false })).to.be.a('string').and.to.equals('urn:Over:There');
      expect(encodeURIString('HTTPS://WWW.中文.COM./Over/There?a=B&b=c#Anchor', { lowercase: true })).to.be.a('string').and.to.equals('https://www.xn--fiq228c.com./over/there?a=b&b=c#anchor');
      expect(encodeURIString(`HTTP://${AZ}@www.EXAMPLE.com./${AZ}?${AZ}#${AZ}`, { lowercase: true })).to.be.a('string').and.to.equals(`http://${az}@www.example.com./${az}?${az}#${az}`);
    });

    it('should return an uri with uppercase letters if lowercase is false except scheme and host automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(encodeURIString('ftp://WWW.EXAMPLE.COM./Path')).to.be.a('string').and.to.equals('ftp://www.example.com./Path');
      expect(encodeURIString('ftp://WWW.EXAMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('ftp://www.example.com.');
      expect(encodeURIString('http://WWW.EXAmPLE.COM.', { web: true, lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com.');
      expect(encodeURIString('https://WWW.EXaMPLE.COM.', { sitemap: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com.');
      expect(encodeURIString(`HTTP://${AZ}@www.EXAMPLE.com./${AZ}?${AZ}#${AZ}`, { lowercase: false })).to.be.a('string').and.to.equals(`http://${AZ}@www.example.com./${AZ}?${AZ}#${AZ}`);

      expect(encodeURIString('ftp://WWW.EXAMPLE.COM./Over/There', { lowercase: false })).to.be.a('string').and.to.equals('ftp://www.example.com./Over/There');
      expect(encodeURIString('http://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
      expect(encodeURIString('https://WWW.EXaMPLE.COM./Over/There?a=B&b=c#Anchor', { sitemap: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./over/there?a=b&amp;b=c#anchor');

      expect(encodeURIString('https://WWW.中文.COM./Over/There?a=B&b=c#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.xn--fiq228c.com./Over/There?a=B&b=c#Anchor');
      expect(encodeURIString('https://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.xn--fiq228c.com./Over/There?a=B&b=c#Anchor');
    });

    it('should return a string with the exact same characters if allowed in userinfo', function() {
      expect(encodeURIString(`http://${allowedUserinfoCharsToEncode}@host.com`)).to.be.a('string').and.to.equals(`http://${allowedUserinfoCharsToEncode}@host.com`);
    });

    it('should return a string with the exact same characters if allowed in path', function() {
      expect(encodeURIString(`urn:isbn:0-486-27557-4/${allowedPathCharsToEncode}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${allowedPathCharsToEncode}`);
    });

    it('should return a string with the exact same characters if allowed in query', function() {
      expect(encodeURIString(`http://host.com/path?${allowedQueryOrFragmentCharsToEncode}`)).to.be.a('string').and.to.equals(`http://host.com/path?${allowedQueryOrFragmentCharsToEncode}`);
    });

    it('should return a string with the exact same characters if allowed in fragment', function() {
      expect(encodeURIString(`http://host.com/path?a=b#${allowedQueryOrFragmentCharsToEncode}`)).to.be.a('string').and.to.equals(`http://host.com/path?a=b#${allowedQueryOrFragmentCharsToEncode}`);
    });

    it('should return a string with the exact same characters if allowed in userinfo and sitemap', function() {
      expect(encodeURIString(`http://${allowedSitemapUserinfoCharsToEncode.replace('&', '')}@host.com`, { sitemap: true })).to.be.a('string').and.to.equals(`http://${allowedSitemapUserinfoCharsToEncode.replace('&', '')}@host.com`);
    });

    it('should return a string with the exact same characters if allowed in path and sitemap', function() {
      expect(encodeURIString(`http://example.com/${allowedSitemapPathCharsToEncode.replace('&', '')}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${allowedSitemapPathCharsToEncode.replace('&', '')}`);
    });

    it('should return a string with the exact same characters if allowed in query and sitemap', function() {
      expect(encodeURIString(`http://host.com/path?${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://host.com/path?${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`);
    });

    it('should return a string with the exact same characters if allowed in fragment and sitemap', function() {
      expect(encodeURIString(`http://host.com/path?a=b#${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://host.com/path?a=b#${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`);
    });

    it('should return a string with percent-encoded characters if not allowed, by default', function() {
      expect(encodeURIString(`http://example.com/${disallowed}`)).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeURIString('http://example.com/<>')).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`)).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIString(`http://example.com/${disallowed}`, { web: false })).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeURIString('http://example.com/<>', { web: false })).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`, { web: false })).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIString(`http://example.com/${disallowed}`, { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeURIString('http://example.com/<>', { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`, { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with percent-encoded characters if not allowed in userinfo', function() {
      expect(encodeURIString(`http://é&\'*@host.com/`)).to.be.a('string').and.to.equals('http://%C3%A9&\'*@host.com/');
    });

    it('should return a string with percent-encoded characters if not allowed in path', function() {
      expect(encodeURIString(`http://host.com/A@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/A@%5B%5D&\'*');
    });

    it('should return a string with percent-encoded characters if not allowed in query', function() {
      expect(encodeURIString(`http://host.com/path?A@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/path?A@%5B%5D&\'*');
    });

    it('should return a string with percent-encoded characters if not allowed in fragment', function() {
      expect(encodeURIString(`http://host.com/path?a=b#A#/?@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/path?a=b#A%23/?@%5B%5D&\'*');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in userinfo and sitemap', function() {
      expect(encodeURIString(`http://é&\'*@host.com/`, { sitemap: true })).to.be.a('string').and.to.equals('http://%C3%A9&amp;&apos;%2A@host.com/');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in path and sitemap', function() {
      expect(encodeURIString(`http://host.com/A@[]&\'*`, { sitemap: true })).to.be.a('string').and.to.equals('http://host.com/a@%5B%5D&amp;&apos;%2A');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in query and sitemap', function() {
      expect(encodeURIString(`http://host.com/path?A@[]&\'*`, { sitemap: true })).to.be.a('string').and.to.equals('http://host.com/path?a@%5B%5D&amp;&apos;%2A');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in fragment and sitemap', function() {
      expect(encodeURIString(`http://host.com/path?a=b#A#/?@[]&\'*`, { sitemap: true })).to.be.a('string').and.to.equals('http://host.com/path?a=b#a%23/?@%5B%5D&amp;&apos;%2A');
    });

    it('should return the expected uri encoded string with the punycoded host', function() {
      expect(encodeURIString('ftp://exèmple.com:8080')).to.be.a('string').and.to.equals('ftp://xn--exmple-4ua.com:8080');
      expect(encodeURIString('ftp://exèmple.com/pâth')).to.be.a('string').and.to.equals('ftp://xn--exmple-4ua.com/p%C3%A2th');
      expect(encodeURIString('ftp://中文.com.')).to.be.a('string').and.to.equals('ftp://xn--fiq228c.com.');

      expect(encodeURIString('http://exèmple.com:8080', { web: true })).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com:8080');
      expect(encodeURIString('http://exèmple.com/pâth', { web: true })).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com/p%C3%A2th');
      expect(encodeURIString('http://中文.com.', { web: true })).to.be.a('string').and.to.equals('http://xn--fiq228c.com.');

      expect(encodeURIString('http://exèmple.com:8080', { sitemap: true })).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com:8080');
      expect(encodeURIString('http://exèmple.com/pâth', { sitemap: true })).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com/p%C3%A2th');
      expect(encodeURIString('http://中文.com.', { sitemap: true })).to.be.a('string').and.to.equals('http://xn--fiq228c.com.');
    });

    it('should return the expected uri encoded string', function() {
      expect(encodeURIString('foo://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('foo://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeURIString('foo://user:pa$$@example.com/')).to.be.a('string').and.to.equals('foo://user:pa$$@example.com/');
      expect(encodeURIString('foo://usèr:pass@example.com/')).to.be.a('string').and.to.equals('foo://us%C3%A8r:pass@example.com/');
      expect(encodeURIString('foo://example.com/pâth')).to.be.a('string').and.to.equals('foo://example.com/p%C3%A2th');

      expect(encodeURIString('http://user:pâss@exèmple.com:8080/pâth', { sitemap: true })).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeURIString('http://user:pa$$@example.com/', { sitemap: true })).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(encodeURIString('http://usèr:pass@example.com/', { sitemap: true })).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
      expect(encodeURIString('http://example.com/pâth', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/p%C3%A2th');

      expect(encodeURIString('http://example.com/there?a=5&b=11', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/there?a=5&amp;b=11');
    });

    it('should throw an uri error if url is more than the maximal allowed length when web or sitemap is true only', function() {
      expect(() => encodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`, { sitemap: true })).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
      expect(() => encodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`, { web: true })).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
      expect(() => encodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`, { sitemap: true, web: true })).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
      expect(() => encodeURIString(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`)).to.not.throw();
    });
  });

  context('when using encodeWebURL that uses encodeURIString with web option to true', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => encodeWebURL()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeWebURL({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
    });

    it('should throw an uri error when uri has no scheme', function() {
      // scheme cannot be an empty string following parseURI behavior
      expect(() => encodeWebURL('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => encodeWebURL('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => encodeWebURL(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
    });

    it('should throw an uri error if scheme is not http or https', function() {
      expect(() => encodeWebURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeWebURL('htp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should throw an uri error if host to encode is not valid', function() {
      expect(() => encodeWebURL('http://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => encodeWebURL('http://com.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to encode is not valid', function() {
      expect(() => encodeWebURL('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should throw an uri error if authority is null', function() {
      expect(() => encodeWebURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeWebURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
    });

    it('should not throw an uri error if uri to encode has letters in uppercase by default', function() {
      expect(() => encodeWebURL('http://example.com/OVER/there')).to.not.throw();
      expect(() => encodeWebURL('HTTP://example.com/OVER/there')).to.not.throw();
      expect(() => encodeWebURL('http://EXAMPLE.com/OVER/there')).to.not.throw();
      expect(() => encodeWebURL('http://USER:PASS@example.com/OVER/there')).to.not.throw();
      expect(() => encodeWebURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme when lowercase is false', function() {
      expect(() => encodeWebURL('HTTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => encodeWebURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: false })).to.not.throw();
      expect(() => encodeWebURL('HTTP://user:pass@example.com', { lowercase: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has special sitemap characters', function() {
      expect(() => encodeWebURL('http://example.com/OVER/&\'*')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has invalid characters that should be percent-encoded', function() {
      expect(() => encodeWebURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeWebURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/t}ere')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over|there')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/there')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/thère')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/there€')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/oveùr/there')).to.not.throw();
    });

    it('should return an uri with uppercase letters if lowercase is false except host automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(encodeWebURL('http://WWW.EXAmPLE.COM.')).to.be.a('string').and.to.equals('http://www.example.com.');
      expect(encodeWebURL('https://WWW.EXaMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com.');
      expect(encodeWebURL('http://USER:pass@WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('http://USER:pass@www.example.com./Over/There?a=B#Anchor');
    });

    it('should return an uri with lowercase letters if lowercase is true', function() {
      expect(encodeWebURL(`http://${AZ}@WWW.EXAmPLE.COM./${AZ}?${AZ}#${AZ}`, { lowercase: true })).to.be.a('string').and.to.equals(`http://${az}@www.example.com./${az}?${az}#${az}`);
    });

    it('should return a string with the exact same characters if allowed in userinfo', function() {
      expect(encodeWebURL(`http://${allowedUserinfoCharsToEncode}@host.com`)).to.be.a('string').and.to.equals(`http://${allowedUserinfoCharsToEncode}@host.com`);
    });

    it('should return a string with the exact same characters if allowed in path', function() {
      expect(encodeWebURL(`http://example.com/${allowedPathCharsToEncode}`)).to.be.a('string').and.to.equals(`http://example.com/${allowedPathCharsToEncode}`);
    });

    it('should return a string with the exact same characters if allowed in query', function() {
      expect(encodeWebURL(`http://host.com/path?${allowedQueryOrFragmentCharsToEncode}`)).to.be.a('string').and.to.equals(`http://host.com/path?${allowedQueryOrFragmentCharsToEncode}`);
    });

    it('should return a string with the exact same characters if allowed in fragment', function() {
      expect(encodeWebURL(`http://host.com/path?a=b#${allowedQueryOrFragmentCharsToEncode}`)).to.be.a('string').and.to.equals(`http://host.com/path?a=b#${allowedQueryOrFragmentCharsToEncode}`);
    });

    it('should return a string with percent-encoded characters if not allowed in userinfo', function() {
      expect(encodeWebURL(`http://é&\'*@host.com/`)).to.be.a('string').and.to.equals('http://%C3%A9&\'*@host.com/');
    });

    it('should return a string with percent-encoded characters if not allowed in path', function() {
      expect(encodeWebURL(`http://host.com/A@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/A@%5B%5D&\'*');
    });

    it('should return a string with percent-encoded characters if not allowed in query', function() {
      expect(encodeWebURL(`http://host.com/path?A@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/path?A@%5B%5D&\'*');
    });

    it('should return a string with percent-encoded characters if not allowed in fragment', function() {
      expect(encodeWebURL(`http://host.com/path?a=b#A#/?@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/path?a=b#A%23/?@%5B%5D&\'*');
    });

    it('should return the expected url encoded string with the punycoded host', function() {
      expect(encodeWebURL('http://exèmple.com:8080')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com:8080');
      expect(encodeWebURL('http://exèmple.com/pâth')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com/p%C3%A2th');
      expect(encodeWebURL('http://中文.com.')).to.be.a('string').and.to.equals('http://xn--fiq228c.com.');
    });

    it('should return the expected url encoded string with the userinfo encoded', function() {
      expect(encodeWebURL('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeWebURL('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
    });

    it('should return the expected url encoded string', function() {
      expect(encodeWebURL('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeWebURL('http://user:pa$$@example.com/')).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(encodeWebURL('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
      expect(encodeWebURL('http://example.com/pâth')).to.be.a('string').and.to.equals('http://example.com/p%C3%A2th');
    });

    it('should throw an uri error if url is more than the maximal allowed length when web or sitemap is true only', function() {
      expect(() => encodeWebURL(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`)).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
    });

  });

  context('when using encodeSitemapURL that uses encodeURIString with sitemap option to true', function() {
    it('should throw an uri error when uri is not a string', function() {
      expect(() => encodeSitemapURL()).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(undefined)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(null)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(NaN)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL([])).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(new Error('error'))).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(5)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(true)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL(false)).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
      expect(() => encodeSitemapURL({})).to.throw(URIError).with.property('code', 'URI_INVALID_TYPE');
    });

    it('should throw an uri error when uri has no scheme', function() {
      // scheme cannot be an empty string following parseURI behavior
      expect(() => encodeSitemapURL('/Users/dir/file.js')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => encodeSitemapURL('://example.com')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
      expect(() => encodeSitemapURL(':')).to.throw(URIError).with.property('code', 'URI_MISSING_SCHEME');
    });

    it('should throw an uri error if scheme is not http or https', function() {
      expect(() => encodeSitemapURL('httpp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeSitemapURL('htp://www.example.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should throw an uri error if host to encode is not valid', function() {
      expect(() => encodeSitemapURL('http://xn--iñvalid.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => encodeSitemapURL('http://com.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
    });

    it('should throw an uri error if port to encode is not valid', function() {
      expect(() => encodeSitemapURL('http://example.com:80g80')).to.throw(URIError).with.property('code', 'URI_INVALID_PORT');
    });

    it('should throw an uri error if authority is null', function() {
      expect(() => encodeSitemapURL('http:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
      expect(() => encodeSitemapURL('https:isbn:0-486-27557-4')).to.throw(URIError).with.property('code', 'URI_MISSING_AUTHORITY');
    });

    it('should not throw an uri error if uri to encode has letters in uppercase by default', function() {
      expect(() => encodeSitemapURL('http://example.com/OVER/there')).to.not.throw();
      expect(() => encodeSitemapURL('HTTP://example.com/OVER/there')).to.not.throw();
      expect(() => encodeSitemapURL('http://EXAMPLE.com/OVER/there')).to.not.throw();
      expect(() => encodeSitemapURL('http://USER:PASS@example.com/OVER/there')).to.not.throw();
      expect(() => encodeSitemapURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme when lowercase is false', function() {
      expect(() => encodeSitemapURL('HTTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => encodeSitemapURL('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: false })).to.not.throw();
      expect(() => encodeSitemapURL('HTTP://user:pass@example.com', { lowercase: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has special sitemap characters', function() {
      expect(() => encodeSitemapURL('http://example.com/OVER/&\'*')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has invalid characters that should be percent-encoded', function() {
      expect(() => encodeSitemapURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeSitemapURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/t}ere')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over|there')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/there')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/thère')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/there€')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/oveùr/there')).to.not.throw();
    });

    it('should always return an uri with lowercase letters', function() {
      expect(encodeSitemapURL('https://WWW.EXaMPLE.COM.')).to.be.a('string').and.to.equals('https://www.example.com.');
      expect(encodeSitemapURL('http://USER:pass@WWW.EXAmPLE.COM./Over/There?a=B#Anchor')).to.be.a('string').and.to.equals('http://user:pass@www.example.com./over/there?a=b#anchor');
    });

    it('should return a string with the exact same characters if allowed in userinfo and sitemap', function() {
      expect(encodeSitemapURL(`http://${allowedSitemapUserinfoCharsToEncode.replace('&', '')}@host.com`)).to.be.a('string').and.to.equals(`http://${allowedSitemapUserinfoCharsToEncode.replace('&', '')}@host.com`);
    });

    it('should return a string with the exact same characters if allowed in path and sitemap', function() {
      expect(encodeSitemapURL(`http://example.com/${allowedSitemapPathCharsToEncode.replace('&', '')}`)).to.be.a('string').and.to.equals(`http://example.com/${allowedSitemapPathCharsToEncode.replace('&', '')}`);
    });

    it('should return a string with the exact same characters if allowed in query and sitemap', function() {
      expect(encodeSitemapURL(`http://host.com/path?${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`)).to.be.a('string').and.to.equals(`http://host.com/path?${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`);
    });

    it('should return a string with the exact same characters if allowed in fragment and sitemap', function() {
      expect(encodeSitemapURL(`http://host.com/path?a=b#${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`)).to.be.a('string').and.to.equals(`http://host.com/path?a=b#${allowedSitemapQueryOrFragmentCharsToEncode.replace('&', '')}`);
    });

    it('should return a string with percent-encoded characters if not allowed, by default', function() {
      expect(encodeSitemapURL(`http://example.com/${disallowed}`)).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D%3C%3E');
      expect(encodeSitemapURL('http://example.com/<>')).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeSitemapURL(`http://example.com/${disallowedOtherChars}`)).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in userinfo and sitemap', function() {
      expect(encodeSitemapURL(`http://é&\'*@host.com/`)).to.be.a('string').and.to.equals('http://%C3%A9&amp;&apos;%2A@host.com/');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in path and sitemap', function() {
      expect(encodeSitemapURL(`http://host.com/A@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/a@%5B%5D&amp;&apos;%2A');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in query and sitemap', function() {
      expect(encodeSitemapURL(`http://host.com/path?A@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/path?a@%5B%5D&amp;&apos;%2A');
    });

    it('should return a string with escaped and percent-encoded characters if not allowed in fragment and sitemap', function() {
      expect(encodeSitemapURL(`http://host.com/path?a=b#A#/?@[]&\'*`)).to.be.a('string').and.to.equals('http://host.com/path?a=b#a%23/?@%5B%5D&amp;&apos;%2A');
    });

    it('should return the expected url encoded string with the punycoded host', function() {
      expect(encodeSitemapURL('http://exèmple.com:8080')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com:8080');
      expect(encodeSitemapURL('http://exèmple.com/pâth')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com/p%C3%A2th');
      expect(encodeSitemapURL('http://中文.com.')).to.be.a('string').and.to.equals('http://xn--fiq228c.com.');
    });

    it('should return the expected url encoded string', function() {
      expect(encodeSitemapURL('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeSitemapURL('http://user:pa$$@example.com/')).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(encodeSitemapURL('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
      expect(encodeSitemapURL('http://example.com/pâth')).to.be.a('string').and.to.equals('http://example.com/p%C3%A2th');
      expect(encodeSitemapURL('http://example.com/there?a=5&b=11')).to.be.a('string').and.to.equals('http://example.com/there?a=5&amp;b=11');
    });

    it('should throw an uri error if url is more than the maximal allowed length when web or sitemap is true only', function() {
      expect(() => encodeSitemapURL(`http://example.com:8042/${'path'.repeat(maxLengthURL + 1)}?name=ferret#nose`)).to.throw(URIError).with.property('code', 'URI_MAX_LENGTH_URL');
    });
  });
});
