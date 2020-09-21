const { expect } = require('../Common');
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

    it('should return a string with the exact same characters if allowed, by default', function() {
      expect(encodeURIComponentString(az)).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(digits)).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowed.replace('%', ''))).to.be.a('string').and.to.equals(allowed.replace('%', ''));

      expect(encodeURIComponentString(az, { lowercase: false })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(AZ, { lowercase: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(digits, { lowercase: false })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowed.replace('%', ''), { lowercase: false })).to.be.a('string').and.to.equals(allowed.replace('%', ''));

      expect(encodeURIComponentString(az, { sitemap: false })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(digits, { sitemap: false })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(allowed.replace('%', ''), { sitemap: false })).to.be.a('string').and.to.equals(allowed.replace('%', ''));
    });

    it('should return a string with the exact same characters if allowed and to not be escaped when sitemap is true', function() {
      const unescaped = allowed.replace(/[%&'"]/g, '');

      expect(encodeURIComponentString(az, { sitemap: true })).to.be.a('string').and.to.equals(az);
      expect(encodeURIComponentString(digits, { sitemap: true })).to.be.a('string').and.to.equals(digits);
      expect(encodeURIComponentString(unescaped, { sitemap: true })).to.be.a('string').and.to.equals(unescaped);
      expect(encodeURIComponentString('<>', { sitemap: true })).to.be.a('string').and.to.equals('&lt;&gt;');
    });

    it('should return a string with percent encoded characters if not allowed, by default', function() {
      expect(encodeURIComponentString(AZ)).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(disallowed)).to.be.a('string').and.to.equals('%5C%5E%60%7B%7C%7D');
      expect(encodeURIComponentString('<>')).to.be.a('string').and.to.equals('%3C%3E');
      expect(encodeURIComponentString(disallowedOtherChars)).to.be.a('string').and.to.equals('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIComponentString(AZ, { sitemap: false })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(disallowed, { sitemap: false })).to.be.a('string').and.to.equals('%5C%5E%60%7B%7C%7D');
      expect(encodeURIComponentString('<>', { sitemap: false })).to.be.a('string').and.to.equals('%3C%3E');
      expect(encodeURIComponentString(disallowedOtherChars, { sitemap: false })).to.be.a('string').and.to.equals('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with percent encoded characters if not allowed when sitemap is true', function() {
      expect(encodeURIComponentString(AZ, { sitemap: true })).to.be.a('string').and.to.equals(AZ);
      expect(encodeURIComponentString(disallowed, { sitemap: true })).to.be.a('string').and.to.equals('%5C%5E%60%7B%7C%7D');
      expect(encodeURIComponentString('<>', { sitemap: true })).to.be.a('string').and.to.equals('&lt;&gt;');
      expect(encodeURIComponentString(disallowedOtherChars, { sitemap: true })).to.be.a('string').and.to.equals('%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with escaped characters when sitemap is true', function() {
      expect(encodeURIComponentString('&\'"<>', { sitemap: true })).to.be.a('string').and.to.equals('&amp;&apos;&quot;&lt;&gt;');
      expect(encodeURIComponentString('&\'"', { sitemap: false })).to.be.a('string').and.to.equals('&\'"');
      expect(encodeURIComponentString('<>', { sitemap: false })).to.be.a('string').and.to.equals('%3C%3E');
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

    it('should not throw an uri error if uri to encode has letters in uppercase for scheme when lowercase is false', function() {
      expect(() => encodeURIString('FTP://example.com/OVER/there', { lowercase: false })).to.not.throw();
      expect(() => encodeURIString('FTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { lowercase: false })).to.not.throw();
      expect(() => encodeURIString('FTP://user:pass@example.com', { lowercase: false })).to.not.throw();

      expect(() => encodeURIString('HTTP://example.com/OVER/there', { web: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { web: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://user:pass@example.com', { web: true, lowercase: false })).to.not.throw();

      expect(() => encodeURIString('HTTP://example.com/OVER/there', { sitemap: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://USER:PASS@EXAMPLE.COM/OVER/THERE', { sitemap: true, lowercase: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://user:pass@example.com', { sitemap: true, lowercase: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has special sitemap characters', function() {
      expect(() => encodeURIString('http://example.com/OVER/<there>')).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/<there')).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there>')).to.not.throw();

      expect(() => encodeURIString('http://example.com/OVER/<there>', { web: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/<there', { web: false })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there>', { web: false })).to.not.throw();

      expect(() => encodeURIString('http://example.com/OVER/<there>', { web: false })).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/<there', { web: false })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there>', { web: false })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has special sitemap characters when sitemap is true', function() {
      expect(() => encodeURIString('http://example.com/OVER/<there>', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('HTTP://example.com/OVER/<there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/there>', { sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has no special sitemap characters', function() {
      expect(() => encodeURIString('ftp://EXAMPLE.com/OVER/th"ere')).to.not.throw();
      expect(() => encodeURIString('ftp://EXAMPLE.com/OVER/\'there')).to.not.throw();
      expect(() => encodeURIString('ftp://EXAMPLE.com/OVER/th"ere?q=11')).to.not.throw();
      expect(() => encodeURIString('ftp://EXAMPLE.com/OVER/t[here&')).to.not.throw();

      expect(() => encodeURIString('http://EXAMPLE.com/OVER/th"ere', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/\'there', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/th"ere?q=11', { web: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/th[ere&', { web: true })).to.not.throw();

      expect(() => encodeURIString('http://EXAMPLE.com/OVER/th"ere', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/\'there', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/th"ere?q=11', { sitemap: true })).to.not.throw();
      expect(() => encodeURIString('http://EXAMPLE.com/OVER/th[ere&', { sitemap: true })).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has invalid characters that should be percent encoded whether web or sitemap is true or not', function() {
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
    });

    it('should return an uri with uppercase letters if lowercase is false except scheme and host automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(encodeURIString('ftp://WWW.EXAMPLE.COM./Path')).to.be.a('string').and.to.equals('ftp://www.example.com./Path');
      expect(encodeURIString('ftp://WWW.EXAMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('ftp://www.example.com.');
      expect(encodeURIString('http://WWW.EXAmPLE.COM.', { web: true, lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com.');
      expect(encodeURIString('https://WWW.EXaMPLE.COM.', { sitemap: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com.');

      expect(encodeURIString('ftp://WWW.EXAMPLE.COM./Over/There', { lowercase: false })).to.be.a('string').and.to.equals('ftp://www.example.com./Over/There');
      expect(encodeURIString('http://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
      expect(encodeURIString('https://WWW.EXaMPLE.COM./Over/There?a=B&b=c#Anchor', { sitemap: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./Over/There?a=B&amp;b=c#Anchor');

      expect(encodeURIString('https://WWW.中文.COM./Over/There?a=B&b=c#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.xn--fiq228c.com./Over/There?a=B&b=c#Anchor');
      expect(encodeURIString('https://WWW.xn--fiq228c.COM./Over/There?a=B&b=c#Anchor', { web: true, lowercase: false })).to.be.a('string').and.to.equals('https://www.xn--fiq228c.com./Over/There?a=B&b=c#Anchor');
    });

    it('should return a string with the exact same characters if allowed, by default', function() {
      expect(encodeURIString(`urn:isbn:0-486-27557-4/${az}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${az}`);
      expect(encodeURIString(`urn:isbn:0-486-27557-4/${digits}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${digits}`);
      expect(encodeURIString(`urn:isbn:0-486-27557-4/${allowed.replace('%', '')}`)).to.be.a('string').and.to.equals(`urn:isbn:0-486-27557-4/${allowed.replace('%', '')}`);

      expect(encodeURIString(`http://example.com/${az}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(encodeURIString(`http://example.com/${digits}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(encodeURIString(`http://example.com/${allowed.replace('%', '')}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);

      expect(encodeURIString(`http://example.com/${az}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(encodeURIString(`http://example.com/${digits}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(encodeURIString(`http://example.com/${allowed.replace('%', '')}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);
    });

    it('should return a string with the exact same characters if allowed and to not be escaped when sitemap is true', function() {
      const unescaped = allowed.replace(/[%&'"]/g, '');

      expect(encodeURIString(`http://example.com/${az}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(encodeURIString(`http://example.com/${digits}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(encodeURIString(`http://example.com/${unescaped}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${unescaped}`);
      expect(encodeURIString('http://example.com/<>', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/&lt;&gt;');
    });

    it('should return a string with percent encoded characters if not allowed, by default', function() {
      expect(encodeURIString(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(encodeURIString(`http://example.com/${disallowed}`)).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D');
      expect(encodeURIString('http://example.com/<>')).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`)).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIString(`http://example.com/${AZ}`, { web: false })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(encodeURIString(`http://example.com/${disallowed}`, { web: false })).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D');
      expect(encodeURIString('http://example.com/<>', { web: false })).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`, { web: false })).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');

      expect(encodeURIString(`http://example.com/${AZ}`, { sitemap: false })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(encodeURIString(`http://example.com/${disallowed}`, { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D');
      expect(encodeURIString('http://example.com/<>', { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`, { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with percent encoded characters if not allowed when sitemap is true', function() {
      expect(encodeURIString(`http://example.com/${AZ}`, { sitemap: true })).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(encodeURIString(`http://example.com/${disallowed}`, { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D');
      expect(encodeURIString('http://example.com/<>', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/&lt;&gt;');
      expect(encodeURIString(`http://example.com/${disallowedOtherChars}`, { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with escaped characters when sitemap is true', function() {
      expect(encodeURIString('http://example.com/&\'"<>', { sitemap: true })).to.be.a('string').and.to.equals('http://example.com/&amp;&apos;&quot;&lt;&gt;');
      expect(encodeURIString('http://example.com/&\'"', { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/&\'"');
      expect(encodeURIString('http://example.com/<>', { sitemap: false })).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
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

    it('should return the expected uri encoded string with the userinfo encoded', function() {
      expect(encodeURIString('ftp://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('ftp://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeURIString('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeURIString('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
    });

    it('should return the expected uri encoded string with userinfo encoded and escaped chars when sitemap is true', function() {
      expect(encodeURIString('http://us<e>r:pâss@exèmple.com:8080/pâth<>', { sitemap: true })).to.be.a('string').and.to.equals('http://us&lt;e&gt;r:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th&lt;&gt;');
      expect(encodeURIString('http://us<e>r:pâss@exèmple.com:8080/pâth', { sitemap: true })).to.be.a('string').and.to.equals('http://us&lt;e&gt;r:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeURIString('http://us\'r:pa"ss@example.com/', { sitemap: true })).to.be.a('string').and.to.equals('http://us&apos;r:pa&quot;ss@example.com/');
    });

    it('should not return an uri with scheme or authority having invalid or escaped characters', function() {
      expect(encodeURIString('http://exèmple.com')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com');
      expect(() => encodeURIString('htèp://exèmple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
      expect(() => encodeURIString('http://ex%20mple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => encodeURIString('ht%tp://exèmple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME_CHAR');
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
      expect(() => encodeWebURL('http://example.com/OVER/<there>')).to.not.throw();
      expect(() => encodeWebURL('HTTP://example.com/OVER/<there')).to.not.throw();
      expect(() => encodeWebURL('http://EXAMPLE.com/OVER/there>')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has no special sitemap characters', function() {
      expect(() => encodeWebURL('http://EXAMPLE.com/OVER/th"ere')).to.not.throw();
      expect(() => encodeWebURL('http://EXAMPLE.com/OVER/\'there')).to.not.throw();
      expect(() => encodeWebURL('http://EXAMPLE.com/OVER/th"ere?q=11')).to.not.throw();
      expect(() => encodeWebURL('http://EXAMPLE.com/OVER/t[here&')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has invalid characters that should be percent encoded', function() {
      expect(() => encodeWebURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeWebURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/t}ere')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over|there')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/there')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/thère')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/over/there€')).to.not.throw();
      expect(() => encodeWebURL('http://example.com/oveùr/there')).to.not.throw();
    });

    it('should return a lowercased url by default', function() {
      expect(encodeWebURL('HTTP://WWW.EXAMPLE.COM.')).to.be.a('string').and.to.equals('http://www.example.com.');
    });

    it('should return an uri with uppercase letters if lowercase is false except host automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(encodeWebURL('http://WWW.EXAmPLE.COM.')).to.be.a('string').and.to.equals('http://www.example.com.');
      expect(encodeWebURL('https://WWW.EXaMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com.');
      expect(encodeWebURL('http://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
    });

    it('should return a string with the exact same characters if allowed', function() {
      expect(encodeWebURL(`http://example.com/${az}`)).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(encodeWebURL(`http://example.com/${digits}`)).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(encodeWebURL(`http://example.com/${allowed.replace('%', '')}`)).to.be.a('string').and.to.equals(`http://example.com/${allowed.replace('%', '')}`);
    });

    it('should return a string with percent encoded characters if not allowed', function() {
      expect(encodeWebURL(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(encodeWebURL(`http://example.com/${disallowed}`)).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D');
      expect(encodeWebURL('http://example.com/<>')).to.be.a('string').and.to.equals('http://example.com/%3C%3E');
      expect(encodeWebURL(`http://example.com/${disallowedOtherChars}`)).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
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

    it('should not return an url with scheme or authority having invalid or escaped characters', function() {
      expect(encodeWebURL('http://exèmple.com')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com');
      expect(() => encodeWebURL('htèp://exèmple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeWebURL('http://ex%20mple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => encodeWebURL('ht%tp://exèmple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should return the expected url encoded string', function() {
      expect(encodeWebURL('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeWebURL('http://user:pa$$@example.com/')).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(encodeWebURL('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
      expect(encodeWebURL('http://example.com/pâth')).to.be.a('string').and.to.equals('http://example.com/p%C3%A2th');
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
      expect(() => encodeSitemapURL('http://example.com/OVER/<there>')).to.not.throw();
      expect(() => encodeSitemapURL('HTTP://example.com/OVER/<there')).to.not.throw();
      expect(() => encodeSitemapURL('http://EXAMPLE.com/OVER/there>')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has no special sitemap characters', function() {
      expect(() => encodeSitemapURL('http://EXAMPLE.com/OVER/th"ere')).to.not.throw();
      expect(() => encodeSitemapURL('http://EXAMPLE.com/OVER/\'there')).to.not.throw();
      expect(() => encodeSitemapURL('http://EXAMPLE.com/OVER/th"ere?q=11')).to.not.throw();
      expect(() => encodeSitemapURL('http://EXAMPLE.com/OVER/t[here&')).to.not.throw();
    });

    it('should not throw an uri error if uri to encode has invalid characters that should be percent encoded', function() {
      expect(() => encodeSitemapURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeSitemapURL('http://user:pass@example.com/path{')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/t}ere')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over|there')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/there')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/thère')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/over/there€')).to.not.throw();
      expect(() => encodeSitemapURL('http://example.com/oveùr/there')).to.not.throw();
    });

    it('should return a lowercased url by default', function() {
      expect(encodeSitemapURL('HTTP://WWW.EXAMPLE.COM.')).to.be.a('string').and.to.equals('http://www.example.com.');
    });

    it('should return an uri with uppercase letters if lowercase is false except host automatically put in lowercase to be RFC-3986 compliant', function() {
      expect(encodeSitemapURL('https://WWW.EXaMPLE.COM.', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com.');
      expect(encodeSitemapURL('http://WWW.EXAmPLE.COM./Over/There?a=B#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('http://www.example.com./Over/There?a=B#Anchor');
      expect(encodeSitemapURL('https://WWW.EXaMPLE.COM./Over/There?a=B&b=c#Anchor', { lowercase: false })).to.be.a('string').and.to.equals('https://www.example.com./Over/There?a=B&amp;b=c#Anchor');
    });

    it('should return a string with the exact same characters if allowed and to not be escaped', function() {
      const unescaped = allowed.replace(/[%&'"]/g, '');

      expect(encodeSitemapURL(`http://example.com/${az}`)).to.be.a('string').and.to.equals(`http://example.com/${az}`);
      expect(encodeSitemapURL(`http://example.com/${digits}`)).to.be.a('string').and.to.equals(`http://example.com/${digits}`);
      expect(encodeSitemapURL(`http://example.com/${unescaped}`)).to.be.a('string').and.to.equals(`http://example.com/${unescaped}`);
      expect(encodeSitemapURL('http://example.com/<>')).to.be.a('string').and.to.equals('http://example.com/&lt;&gt;');
    });

    it('should return a string with percent encoded characters if not allowed', function() {
      expect(encodeSitemapURL(`http://example.com/${AZ}`)).to.be.a('string').and.to.equals(`http://example.com/${AZ}`);
      expect(encodeSitemapURL(`http://example.com/${disallowed}`)).to.be.a('string').and.to.equals('http://example.com/%5C%5E%60%7B%7C%7D');
      expect(encodeSitemapURL('http://example.com/<>')).to.be.a('string').and.to.equals('http://example.com/&lt;&gt;');
      expect(encodeSitemapURL(`http://example.com/${disallowedOtherChars}`)).to.be.a('string').and.to.equals('http://example.com/%E2%82%AC%C2%B0%C3%A9%C3%B9%C3%A8%C3%A0%C3%A7%20%C2%A7%C2%A3');
    });

    it('should return a string with escaped characters', function() {
      expect(encodeSitemapURL('http://example.com/&\'"<>')).to.be.a('string').and.to.equals('http://example.com/&amp;&apos;&quot;&lt;&gt;');
    });

    it('should return the expected url encoded string with the punycoded host', function() {
      expect(encodeSitemapURL('http://exèmple.com:8080')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com:8080');
      expect(encodeSitemapURL('http://exèmple.com/pâth')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com/p%C3%A2th');
      expect(encodeSitemapURL('http://中文.com.')).to.be.a('string').and.to.equals('http://xn--fiq228c.com.');
    });

    it('should return the expected url encoded string with the userinfo encoded', function() {
      expect(encodeSitemapURL('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeSitemapURL('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
    });

    it('should return the expected url encoded string with userinfo encoded and escaped chars', function() {
      expect(encodeSitemapURL('http://us<e>r:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://us&lt;e&gt;r:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeSitemapURL('http://us\'r:pa"ss@example.com/')).to.be.a('string').and.to.equals('http://us&apos;r:pa&quot;ss@example.com/');
    });

    it('should not return an url with scheme or authority having invalid or escaped characters', function() {
      expect(encodeSitemapURL('http://exèmple.com')).to.be.a('string').and.to.equals('http://xn--exmple-4ua.com');
      expect(() => encodeSitemapURL('htèp://exèmple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
      expect(() => encodeSitemapURL('http://ex%20mple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_HOST');
      expect(() => encodeSitemapURL('ht%tp://exèmple.com')).to.throw(URIError).with.property('code', 'URI_INVALID_SCHEME');
    });

    it('should return the expected url encoded string', function() {
      expect(encodeSitemapURL('http://user:pâss@exèmple.com:8080/pâth')).to.be.a('string').and.to.equals('http://user:p%C3%A2ss@xn--exmple-4ua.com:8080/p%C3%A2th');
      expect(encodeSitemapURL('http://user:pa$$@example.com/')).to.be.a('string').and.to.equals('http://user:pa$$@example.com/');
      expect(encodeSitemapURL('http://usèr:pass@example.com/')).to.be.a('string').and.to.equals('http://us%C3%A8r:pass@example.com/');
      expect(encodeSitemapURL('http://example.com/pâth')).to.be.a('string').and.to.equals('http://example.com/p%C3%A2th');
      expect(encodeSitemapURL('http://example.com/there?a=5&b=11')).to.be.a('string').and.to.equals('http://example.com/there?a=5&amp;b=11');
    });
  });
});
